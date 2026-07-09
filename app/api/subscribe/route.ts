import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber, sendNewsletterWelcome } from '@/lib/email'

export const runtime = 'edge'

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_BODY_BYTES = 2_000   // 2 KB — more than enough for a subscription form
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Allowed origins — requests from other origins are rejected (CSRF protection).
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://greenmindservices.com')
  .split(',')
  .map((o) => o.trim().toLowerCase())

// ─── Validation ───────────────────────────────────────────────────────────────
function validateSubscribe(body: Record<string, unknown>): string | null {
  const { email, firstName } = body

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return 'A valid email address is required.'
  }
  if (typeof firstName === 'string' && firstName.trim().length > 100) {
    return 'First name is too long.'
  }

  return null
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── 1. CSRF — Origin check ────────────────────────────────────────────────
  const origin = (request.headers.get('origin') || '').toLowerCase()
  const isLocalhost = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')
  if (!isLocalhost && origin && !ALLOWED_ORIGINS.some((o) => origin === o || origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 2. Request body size guard ────────────────────────────────────────────
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
    return NextResponse.json({ success: true })
  }

  // ── 5. Field validation ───────────────────────────────────────────────────
  const validationError = validateSubscribe(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 })
  }

  const email = String(body.email).trim().toLowerCase()
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() || null : null

  // ── 6. Add to Resend audience ─────────────────────────────────────────────
  const subscription = await addSubscriber(email)
  if (!subscription.success) {
    // Surface configuration errors in production so the operator notices quickly.
    return NextResponse.json({ error: subscription.error || 'Subscription failed.' }, { status: 503 })
  }

  // ── 7. Send welcome email ─────────────────────────────────────────────────
  const welcome = await sendNewsletterWelcome({ email, firstName })
  if (welcome.error) {
    console.error('[subscribe] Welcome email failed:', welcome.error)
    // Don't fail the subscription just because the welcome email didn't send.
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
