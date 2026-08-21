'use client'

import Image from 'next/image'
import { useId, useState } from 'react'

type Props = {
  /**
   * The AI Platform footer renders without the Poppins utility class on the input;
   * every other footer sets it. Kept as a prop so all three keep the exact markup
   * they had before this form became functional.
   */
  inputFontClass?: string
}

/**
 * The footer newsletter form. Markup, classes and layout are unchanged from the three
 * places that previously inlined it — the only difference is that submitting now
 * actually sends the address somewhere and reports what happened.
 */
export default function NewsletterForm({ inputFontClass = "font-['Poppins']" }: Props) {
  const inputId = useId()
  const statusId = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

      if (res.ok && result.ok) {
        setState('ok')
        setMessage('Thanks — you are subscribed.')
        setEmail('')
      } else {
        setState('error')
        setMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setMessage('Network error — please check your connection and try again.')
    }
  }

  return (
    <>
      {/* Visually hidden: the input previously relied on its placeholder alone, which
          leaves screen reader users without a field name (WCAG 2.1 AA, 3.3.2). */}
      <label htmlFor={inputId} className="sr-only">
        Email address for newsletter
      </label>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex h-20 w-full items-center justify-between rounded-lg border border-white/20 px-4 sm:max-w-[318px]"
      >
        <input
          id={inputId}
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          aria-describedby={message ? statusId : undefined}
          className={`flex-1 bg-transparent ${inputFontClass} text-sm font-normal text-white outline-none`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          aria-label="Subscribe to newsletter"
          className="h-6 w-6 disabled:opacity-50"
        >
          <Image
            width={100}
            height={100}
            src="/static/images/send.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </button>
      </form>
      {message && (
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`mt-2 text-sm ${state === 'ok' ? 'text-green-400' : 'text-red-400'}`}
        >
          {message}
        </p>
      )}
    </>
  )
}
