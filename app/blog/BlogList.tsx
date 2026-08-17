'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CorePost = {
  slug: string
  title: string
  date: string
  summary?: string
  images?: string[]
  tags?: string[]
}

export default function BlogList({ posts }: { posts: CorePost[] }) {
  const [searchValue, setSearchValue] = useState('')
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + (post.summary ?? '') + (post.tags ?? []).join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (gridRef.current) {
      gridRef.current.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [filteredPosts])

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Search */}
        <div className="animate-slide-from-bottom mb-12 opacity-0" data-animate>
          <div className="relative mx-auto max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-full border border-gray-200 bg-white px-5 py-3 font-['Poppins'] text-gray-900 shadow-sm transition focus:border-[#000B71] focus:ring-2 focus:ring-[#000B71]/20 focus:outline-none"
            />
            <svg
              className="absolute top-3.5 right-4 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid items-stretch justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.length === 0 && (
            <p className="col-span-3 py-12 text-center font-['Poppins'] text-gray-500">
              No articles found.
            </p>
          )}
          {filteredPosts.map((post, idx) => {
            const delay = `${(idx % 3) * 100 + 100}ms`
            const animClass =
              idx % 3 === 0
                ? 'animate-slide-from-left'
                : idx % 3 === 1
                  ? 'animate-slide-from-bottom'
                  : 'animate-slide-from-right'
            const image = post.images?.[0]

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className={`${animClass} group relative flex h-[420px] w-full max-w-[461px] flex-col justify-end overflow-hidden rounded-2xl opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}
                data-animate
                style={{ animationDelay: delay }}
              >
                {/* Cover */}
                {image ? (
                  <Image
                    src={image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#000B71] to-[#2D9CDB]" />
                )}

                {/* Dark gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />

                {/* Category pill */}
                {post.tags?.[0] && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase ring-1 ring-inset ring-white/25 backdrop-blur">
                    {post.tags[0]}
                  </span>
                )}

                {/* Overlaid content */}
                <div className="relative z-10 p-6">
                  <time className="font-['Poppins'] text-xs font-medium tracking-[0.06em] text-white/70 uppercase">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className="mt-2 line-clamp-3 font-['Poppins'] text-xl leading-snug font-semibold text-white sm:text-2xl">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 line-clamp-2 font-['Poppins'] text-sm leading-relaxed text-white/70">
                      {post.summary}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 font-['Poppins'] text-sm font-semibold text-white">
                    Read more
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        [data-animate].animate {
          animation-play-state: running;
        }
        [data-animate] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
