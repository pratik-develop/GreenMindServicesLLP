import 'server-only'
import { Resend } from 'resend'

// ─── HTML escape helper ───────────────────────────────────────────────────────
// Prevents XSS when user-supplied data is interpolated into email HTML.
// All five dangerous HTML characters are escaped; this covers tag injection,
// attribute injection, and JS-event-handler injection.
function esc(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Resend client ────────────────────────────────────────────────────────────
function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface EnquiryEmailData {
  name: string
  organisation: string | null
  email: string
  phone: string | null
  service: string | null
  message: string
  // attribution fields (optional — populated when UTM params are present)
  source?: string | null
  utmCampaign?: string | null
  utmMedium?: string | null
  utmSource?: string | null
}

// ─── Confirmation email (to enquirer) ────────────────────────────────────────
// Deliberately minimal — does NOT echo the full message back to the user.
// Reason: echoing user-submitted data in confirmation emails enables social
// engineering (attacker submits someone else's email, victim receives fabricated content).
export async function sendEnquiryConfirmation(data: EnquiryEmailData) {
  const resend = getResend()
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'GreenMind Services LLP <onboarding@resend.dev>',
    to: data.email,
    subject: 'We received your enquiry — GreenMind Services LLP',
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enquiry Received</title>
  </head>
  <body style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;background:#f5f5f0;margin:0;padding:0;">
    <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
      <div style="background:#152E1C;padding:28px 32px;">
        <p style="color:#d4c8b0;font-size:13px;margin:0 0 6px;">GreenMind Services LLP</p>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:600;">We've received your enquiry</h1>
      </div>
      <div style="padding:28px 32px;">
        <p style="margin:0 0 16px;">Dear ${esc(data.name)},</p>
        <p style="margin:0 0 16px;">Thank you for contacting GreenMind Services LLP. A consultant will review your enquiry and get back to you within <strong>24 business hours</strong>.</p>
        <p style="margin:0 0 16px;">For urgent matters — an NGT notice, an expiring CTO, or an imminent inspection — please call us directly:</p>
        <p style="margin:0 0 24px;">
          <a href="tel:+919181018810" style="color:#1E5C30;font-weight:600;">+91 91810 18810</a> &nbsp;/&nbsp;
          <a href="tel:+919181018811" style="color:#1E5C30;font-weight:600;">+91 91810 18811</a>
        </p>
        <hr style="border:none;border-top:1px solid #e8e4dc;margin:24px 0;" />
        <p style="color:#888;font-size:13px;margin:0;">
          Preserve · Protect · Prosper<br />
          GreenMind Services LLP · Guwahati, Assam
        </p>
      </div>
    </div>
  </body>
</html>`,
  })
}

// ─── Admin alert email ────────────────────────────────────────────────────────
// All user-supplied values are HTML-escaped before interpolation.
export async function sendEnquiryAlert(data: EnquiryEmailData) {
  const resend = getResend()
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'GreenMind Services LLP <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL || 'admin@greenmindservices.com',
    subject: `New Enquiry — ${esc(data.name)}${data.organisation ? ` (${esc(data.organisation)})` : ''}`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Enquiry Alert</title>
  </head>
  <body style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;background:#f5f5f0;margin:0;padding:0;">
    <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
      <div style="background:#152E1C;padding:28px 32px;">
        <p style="color:#d4c8b0;font-size:13px;margin:0 0 6px;">GreenMind Admin Alert</p>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:600;">New Enquiry Received</h1>
      </div>
      <div style="padding:28px 32px;">

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr style="border-bottom:1px solid #f0ece4;">
            <td style="padding:10px 0;color:#666;width:38%;vertical-align:top;">Name</td>
            <td style="padding:10px 0;font-weight:600;">${esc(data.name)}</td>
          </tr>
          ${data.organisation ? `<tr style="border-bottom:1px solid #f0ece4;">
            <td style="padding:10px 0;color:#666;vertical-align:top;">Organisation</td>
            <td style="padding:10px 0;">${esc(data.organisation)}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #f0ece4;">
            <td style="padding:10px 0;color:#666;vertical-align:top;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:${esc(data.email)}" style="color:#1E5C30;">${esc(data.email)}</a></td>
          </tr>
          ${data.phone ? `<tr style="border-bottom:1px solid #f0ece4;">
            <td style="padding:10px 0;color:#666;vertical-align:top;">Phone</td>
            <td style="padding:10px 0;"><a href="tel:${esc(data.phone)}" style="color:#1E5C30;">${esc(data.phone)}</a></td>
          </tr>` : ''}
          ${data.service ? `<tr style="border-bottom:1px solid #f0ece4;">
            <td style="padding:10px 0;color:#666;vertical-align:top;">Service Interest</td>
            <td style="padding:10px 0;">${esc(data.service)}</td>
          </tr>` : ''}
          ${data.utmSource || data.source ? `<tr>
            <td style="padding:10px 0;color:#666;vertical-align:top;">Source</td>
            <td style="padding:10px 0;font-size:12px;color:#888;">${esc(data.utmSource || data.source)}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top:20px;background:#f7f5f0;border-left:4px solid #1E5C30;padding:16px 20px;border-radius:0 8px 8px 0;">
          <p style="font-size:13px;color:#888;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Message</p>
          <p style="margin:0;white-space:pre-wrap;font-size:14px;">${esc(data.message)}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#1E5C30;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
            Reply to ${esc(data.name)}
          </a>
        </div>

      </div>
    </div>
  </body>
</html>`,
  })
}
