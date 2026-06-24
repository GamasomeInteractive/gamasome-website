'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  toc: TocItem[]
  /** Render the bordered card + "In this article" heading. Disable inside a <details>. */
  showHeading?: boolean
}

/**
 * Numbered table of contents with scroll-spy active-section highlighting.
 * Renders h2/h3 headings from the contentlayer `toc` field.
 */
export default function TableOfContents({ toc, showHeading = true }: TableOfContentsProps) {
  const items = (toc ?? []).filter((h) => h.depth >= 2 && h.depth <= 3)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const ids = items.map((i) => i.url.replace(/^#/, ''))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toc])

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={
        showHeading ? "rounded-lg border border-gray-200 bg-white p-5 font-['Poppins']" : "font-['Poppins']"
      }
    >
      {showHeading && (
        <p className="mb-5 border-b border-gray-200 pb-4 text-2xl font-bold text-gray-900">
          In this article
        </p>
      )}
      <ol className="space-y-4">
        {items.map((item, index) => {
          const id = item.url.replace(/^#/, '')
          const isActive = id === activeId
          return (
            <li
              key={item.url}
              className={`flex gap-3 ${item.depth === 3 ? 'pl-5' : ''}`}
            >
              <span
                className={`shrink-0 text-lg font-semibold tabular-nums ${
                  isActive ? 'text-[#000B71]' : 'text-gray-400'
                }`}
              >
                {index + 1}.
              </span>
              <a
                href={item.url}
                className={`text-lg leading-snug transition-colors ${
                  isActive
                    ? 'font-medium text-[#000B71]'
                    : 'text-gray-600 hover:text-[#000B71]'
                }`}
              >
                {item.value}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
