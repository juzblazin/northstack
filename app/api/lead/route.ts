import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: { email?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const source = (body.source ?? 'unknown').slice(0, 120)

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  // TODO: wire to ESP/CRM (Mailchimp, ConvertKit, HubSpot) via env-configured webhook.
  // e.g. process.env.LEAD_WEBHOOK_URL — post { email, source, ts } and check the response.
  console.log(`[lead] ${email} via ${source}`)

  return NextResponse.json({ ok: true })
}
