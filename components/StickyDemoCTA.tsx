'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const calendarIcon = (
  <svg
    className="h-4 w-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

/**
 * Fixed "Book a demo" tab pinned to the right edge of the viewport, mid-height —
 * ManageEngine-style. Rendered globally by SiteShell on every page except blogs.
 * Reveals on scroll (like the scroll-to-top button) and slides back out at the top
 * of the page. Sits mid-viewport so it never collides with the bottom-right
 * scroll-to-top button.
 */
export default function StickyDemoCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-end gap-2 transition-transform duration-300 ease-out print:hidden ${
        show ? 'translate-x-0' : 'translate-x-[calc(100%+8px)]'
      }`}
    >
      <Link
        href="/contact"
        aria-label="Book a demo"
        className="flex items-center gap-2 rounded-l-lg border border-[#000B71] bg-white py-3 pr-4 pl-3.5 font-['Poppins'] text-[13px] font-semibold tracking-[0.01em] whitespace-nowrap text-[#000B71] shadow-lg transition-colors duration-200 hover:bg-[#000B71] hover:text-white"
      >
        {calendarIcon}
        Book a demo
      </Link>
    </div>
  )
}
