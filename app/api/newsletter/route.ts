import { NextRequest, NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

// Newsletter signup. Two things were broken here before:
//   1. `export const dynamic = 'force-static'` on a route exporting a POST handler — a
//      statically-evaluated route cannot process submissions.
//   2. The footer form had no submit handler at all, so an address typed into it was
//      discarded on submit.
//
// As with the contact route, an unconfigured or failing provider must surface as a real
// error rather than a silent success — a subscribe box that always says "thanks" while
// dropping the address is worse than no box.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Provider keys, read at request time so the route reflects the current environment. */
function getProviderConfig(): { provider: string; apiKey: string | undefined } {
  const provider =
    (siteMetadata as { newsletter?: { provider?: string } }).newsletter?.provider ?? ''
  const keyByProvider: Record<string, string | undefined> = {
    buttondown: process.env.BUTTONDOWN_API_KEY,
    mailchimp: process.env.MAILCHIMP_API_KEY,
    convertkit: process.env.CONVERTKIT_API_KEY,
    klaviyo: process.env.KLAVIYO_API_KEY,
    emailoctopus: process.env.EMAILOCTOPUS_API_KEY,
    beehiiv: process.env.BEEHIIV_API_KEY,
  }
  return { provider, apiKey: keyByProvider[provider] }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const email =
    typeof (body as { email?: unknown })?.email === 'string'
      ? (body as { email: string }).email.trim()
      : ''

  if (!email) {
    return NextResponse.json(
      { ok: false, error: 'Please enter your email address.' },
      { status: 400 }
    )
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  const { provider, apiKey } = getProviderConfig()

  if (!provider || !apiKey) {
    // No credentials configured. Say so plainly instead of pretending it worked.
    console.error(
      `[newsletter] No API key configured for provider "${provider || '(unset)'}". ` +
        `Signup from ${email} was NOT stored.`
    )
    return NextResponse.json(
      {
        ok: false,
        error: 'Newsletter signup is not available right now. Please email us instead.',
      },
      { status: 503 }
    )
  }

  try {
    // pliny ships one subscribe helper per provider and reads the key from the
    // environment itself; we only reach here once that key is present.
    const { NewsletterAPI } = await import('pliny/newsletter')
    const handler = NewsletterAPI({ provider: provider as never })
    const upstream = (await handler(
      new Request(req.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }) as never,
      undefined as never
    )) as Response

    if (upstream && typeof upstream.status === 'number' && upstream.status >= 400) {
      console.error(`[newsletter] Provider rejected ${email} with ${upstream.status}`)
      return NextResponse.json(
        { ok: false, error: 'We could not complete your signup. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(
      `[newsletter] Signup failed for ${email}: ${err instanceof Error ? err.message : String(err)}`
    )
    return NextResponse.json(
      { ok: false, error: 'We could not complete your signup. Please try again later.' },
      { status: 502 }
    )
  }
}
