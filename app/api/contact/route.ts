import { NextRequest, NextResponse } from 'next/server'
import contactContent from '../../../content/pages/contact.json'

// This route exists so the contact form can learn whether a lead actually arrived.
// The browser cannot read a cross-origin response from Google Apps Script without CORS
// headers, which is why the form previously used `mode: 'no-cors'` — that returns an
// opaque response, so the client could never tell success from failure and reported
// success unconditionally. Server-to-server there is no CORS restriction, so here we
// can read the real status and pass an honest result back to the form.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// The destination is read from CMS content on the server, never taken from the request.
// Accepting a client-supplied URL would turn this route into an open proxy (SSRF).
const FORM_ENDPOINT: string =
  (contactContent as { form?: { formEndpoint?: string } })?.form?.formEndpoint ?? ''

const MAX_FIELD = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Payload = { name: string; email: string; phone: string; message: string }

function validate(body: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null)
    return { ok: false, error: 'Invalid request body.' }
  const b = body as Record<string, unknown>

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const name = str(b.name)
  const email = str(b.email)
  const phone = str(b.phone)
  const message = str(b.message)

  if (!name) return { ok: false, error: 'Name is required.' }
  if (!email) return { ok: false, error: 'Email is required.' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (!message) return { ok: false, error: 'Message is required.' }
  if ([name, email, phone, message].some((v) => v.length > MAX_FIELD)) {
    return { ok: false, error: 'One of the fields is too long.' }
  }

  return { ok: true, data: { name, email, phone, message } }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const checked = validate(body)
  if (!checked.ok) {
    return NextResponse.json({ ok: false, error: checked.error }, { status: 400 })
  }

  if (!FORM_ENDPOINT) {
    // Misconfiguration must surface as a failure, not a silent success.
    console.error('[contact] No formEndpoint configured in content/pages/contact.json')
    return NextResponse.json(
      { ok: false, error: 'The contact form is not configured. Please email us directly.' },
      { status: 500 }
    )
  }

  try {
    const upstream = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checked.data),
      redirect: 'follow', // Apps Script /exec answers with a 302 to script.googleusercontent.com
      signal: AbortSignal.timeout(15000),
    })

    if (!upstream.ok) {
      // Log the payload so a lead is recoverable even when the upstream sink rejects it.
      console.error(
        `[contact] Upstream rejected with ${upstream.status}. Lead: ${JSON.stringify(checked.data)}`
      )
      return NextResponse.json(
        { ok: false, error: 'We could not deliver your message. Please email us directly.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(
      `[contact] Delivery failed: ${err instanceof Error ? err.message : String(err)}. Lead: ${JSON.stringify(checked.data)}`
    )
    return NextResponse.json(
      { ok: false, error: 'We could not deliver your message. Please email us directly.' },
      { status: 502 }
    )
  }
}
