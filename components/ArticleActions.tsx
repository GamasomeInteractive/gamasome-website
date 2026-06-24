'use client'

import { useState } from 'react'

/**
 * Share / Print / Download action buttons for the article header.
 * - Share: native share sheet, falls back to copy-link.
 * - Print & Download: opens the browser print dialog (Save as PDF for download).
 */
export default function ArticleActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user dismissed */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  const btn =
    "flex flex-col items-center gap-1 text-[11px] font-medium tracking-wide text-white/60 transition-colors hover:text-white font-['Poppins']"

  return (
    <div className="flex items-center gap-7 print:hidden">
      <button type="button" onClick={handleShare} className={btn} aria-label="Share">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm14-7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0 14a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM7.5 12l9-5.5m-9 5.5 9 5.5" />
        </svg>
        {copied ? 'Copied' : 'Share'}
      </button>

      <button type="button" onClick={handlePrint} className={btn} aria-label="Print">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3.75A.75.75 0 0 1 6.75 3h10.5a.75.75 0 0 1 .75.75V9m-12 0h12m-12 0a3 3 0 0 0-3 3v3.75a.75.75 0 0 0 .75.75H6m12-7.5a3 3 0 0 1 3 3v3.75a.75.75 0 0 1-.75.75H18M6 14.25h12v6H6v-6Z" />
        </svg>
        Print
      </button>

      <button type="button" onClick={handlePrint} className={btn} aria-label="Download">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V3m0 12.75-3.75-3.75M12 15.75l3.75-3.75M4.5 17.25v1.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-1.5" />
        </svg>
        Download
      </button>
    </div>
  )
}
