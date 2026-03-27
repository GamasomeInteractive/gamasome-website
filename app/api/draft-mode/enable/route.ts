import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

// Called by the Sanity Presentation tool to enable Next.js Draft Mode
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const redirectTo = searchParams.get('redirect') || '/'

  const draft = await draftMode()
  draft.enable()

  redirect(redirectTo)
}
