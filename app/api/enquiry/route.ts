import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendEnquiryConfirmation, sendEnquiryAlert } from '@/lib/email'
import { enquiries } from '@/lib/schema'

export const runtime = 'edge'

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_BODY_BYTES   = 10_000   // 10 KB — prevents memory exhaustion on edge
const MAX_MESSAGE_LEN  = 5_000   // chars — enforced at app layer + DB CHECK
const RATE_LIMIT_MAX   = 5       // requests
const RATE_LIMIT_TTL   = 60      // seconds

// Allowed origins — requests from other origins are rejected (CSRF protection).
// Add staging/preview URLs as needed.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://greenmindservices.com')
  .split(',')
  .map((o) => o.trim().toLowerCase())

// ─── Cloudflare KV rate limiter ───────────────────────────────────────────────
// Reads/writes Cloudflare KV when the binding is available.
// Setup:
//   1. wrangler kv:namespace create RATE_LIMIT_KV
//   2. Bind it in Cloudflare Pages → Settings → Functions → KV namespace bindings
//      Binding name: RATE_LIMIT_KV
// Until the binding is wired, this falls through to the WAF (still effective
// because Cloudflare WAF rate-limiting rules should be configured in the dashboard).
async function checkRateLimit(ip: string, kvNamespace: KVNamespace | undefined): Promise<boolean> {
  if (!kvNamespace) return true  // fallback: defer to CF WAF

  const key = `rl:${ip}`
  const raw = await kvNamespace.get(key)
  const count = raw ? parseInt(raw, 10) : 0

  if (count >= RATE_LIMIT_MAX) return false

  // Increment — reset TTL on first write of the window
  await kvNamespace.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_TTL })
  return true
}

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d\s\-().]{7,30}$/

function validateEnquiry(body: Record<string, unknown>): string | null {
  const { name, email, message, phone } = body

  if (typeof name !== 'string'    || name.trim().length < 1)      return 'Name is required.'
  if (typeof name === 'string'    && name.trim().length > 150)     return 'Name is too long.'
  if (typeof email !== 'string'   || !EMAIL_RE.test(email))        return 'A valid email address is required.'
  if (typeof message !== 'string' || message.trim().length < 1)    return 'Message is required.'
  if (typeof message === 'string' && message.length > MAX_MESSAGE_LEN) {
    return `Message must be ${MAX_MESSAGE_LEN.toLocaleString()} characters or fewer.`
  }
  if (phone && typeof phone === 'string' && !PHONE_RE.test(phone)) return 'Phone number format is invalid.'

  return null
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── 1. CSRF — Origin check ────────────────────────────────────────────────
  // Reject requests whose Origin header doesn't match any allowed origin.
  // This prevents third-party pages from silently submitting the form on
  // behalf of a visitor (CSRF without cookies). Exempt localhost in dev.
  const origin = (request.headers.get('origin') || '').toLowerCase()
  const isLocalhost = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')
  if (!isLocalhost && origin && !ALLOWED_ORIGINS.some((o) => origin === o || origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 2. Request body size guard ────────────────────────────────────────────
  // Reject oversized payloads before buffering to prevent edge memory exhaustion.
  const contentLength = request.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request payload too large.' }, { status: 413 })
  }

  // ── 3. Parse body ─────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // ── 4. Honeypot ───────────────────────────────────────────────────────────
  const honeypot = body.gm_verify_check
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    // Silently return 200 — bots shouldn't know they were rejected
    return NextResponse.json({ success: true })
  }

  // ── 5. Field validation ───────────────────────────────────────────────────
  const validationError = validateEnquiry(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 })
  }

  // ── 6. Rate limiting (Cloudflare KV + WAF fallback) ───────────────────────
  // Use cf-connecting-ip ONLY — this is Cloudflare-injected and cannot be
  // spoofed by the client. x-forwarded-for is client-controlled and MUST NOT
  // be used for security decisions.
  const ip = request.headers.get('cf-connecting-ip') || 'unknown'
  const kvNamespace: KVNamespace | undefined = (request as Request & { env?: { RATE_LIMIT_KV?: KVNamespace } }).env?.RATE_LIMIT_KV
  const allowed = await checkRateLimit(ip, kvNamespace)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_TTL) } },
    )
  }

  // ── 7. Extract & sanitise fields ──────────────────────────────────────────
  const name         = String(body.name).trim()
  const email        = String(body.email).trim().toLowerCase()
  const message      = String(body.message).trim()
  const organisation = typeof body.organisation === 'string' ? body.organisation.trim() || null : null
  const phone        = typeof body.phone        === 'string' ? body.phone.trim()        || null : null
  const service      = typeof body.service      === 'string' ? body.service.trim()      || null : null
  const source       = typeof body.source       === 'string' ? body.source.trim()       || null : null
  const utmCampaign  = typeof body.utm_campaign === 'string' ? body.utm_campaign.trim() || null : null
  const utmMedium    = typeof body.utm_medium   === 'string' ? body.utm_medium.trim()   || null : null
  const utmSource    = typeof body.utm_source   === 'string' ? body.utm_source.trim()   || null : null

  // ── 8. Persist to database ────────────────────────────────────────────────
  let savedId: string | null = null
  try {
    const db = getDb()
    const [row] = await db
      .insert(enquiries)
      .values({
        fullName:     name,
        organisation,
        email,
        phone,
        serviceSlug:  service,
        message,
        source,
        utmCampaign,
        utmMedium,
        utmSource,
        // status defaults to 'new' via schema; createdAt/updatedAt default to NOW()
      })
      .returning({ id: enquiries.id })
    savedId = row?.id ?? null
  } catch (dbError) {
    // Log but do not fail the request — emails still go out.
    // The operator should monitor for DB errors separately (Cloudflare Logpush / Axiom).
    console.error('[enquiry] DB insert error:', dbError)
  }

  // ── 9. Send notification emails ───────────────────────────────────────────
  // Emails are sent in the same request for now.
  // TODO (scale): move to Cloudflare Queues so this doesn't block response time
  // and retries are automatic on Resend outage.
  try {
    await Promise.all([
      sendEnquiryConfirmation({ name, organisation, email, phone, service, message, source, utmCampaign, utmMedium, utmSource }),
      sendEnquiryAlert({        name, organisation, email, phone, service, message, source, utmCampaign, utmMedium, utmSource }),
    ])
  } catch (emailError) {
    console.error('[enquiry] Email send error (enquiry_id=' + savedId + '):', emailError)
    // Do not surface email errors to the user — the enquiry is saved.
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
