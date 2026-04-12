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
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-['Poppins'] text-gray-900"
            />
            <svg
              className="absolute top-3 right-3 h-5 w-5 text-gray-400"
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
              <div
                key={post.slug}
                className={`${animClass} flex h-full w-full max-w-[461px] flex-col bg-white opacity-0 shadow-lg`}
                data-animate
                style={{ animationDelay: delay }}
              >
                <div className="relative h-[300px] w-full overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
                      <div className="text-lg font-semibold text-gray-600">Blog Image</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
                  <h3 className="mb-4 font-['Poppins'] text-xl leading-[175%] font-semibold tracking-[0.02em] text-[#001930] capitalize sm:text-2xl">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mb-6 w-full max-w-[400px] flex-1 font-['Poppins'] text-sm leading-[160%] font-normal text-[#001930] sm:text-base">
                      {post.summary}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex h-[40px] w-[161.6px] items-center justify-center rounded-full border border-[#2D9CDB] bg-white shadow-[0px_4px_26px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0px_10px_50px_rgba(0,0,0,0.05)]"
                    >
                      <span className="text-center font-['Poppins'] text-sm leading-5 font-normal text-[#2D9CDB] sm:text-base">
                        Read More
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
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
