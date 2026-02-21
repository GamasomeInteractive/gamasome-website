'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function BlogPage() {
  const [searchValue, setSearchValue] = useState('')

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

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Top Banner Section */}
      <section
        className="animate-fade-in relative h-[444px] w-full overflow-hidden opacity-0"
        data-animate
      >
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        <div className="absolute inset-0 z-10">
          <Image
            width={100}
            height={100}
            src="/static/images/blog.png"
            alt="Blog Banner Background"
            className="h-full w-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            onError={(e) => {
              // e.target.style.display = 'none';
              // e.target.parentElement.style.background = 'linear-gradient(90deg, #2D9CDB 0%, #1e7ba8 100%)';
            }}
          />
        </div>
        <div className="absolute inset-0 z-20 bg-black/36" />

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          {/* Breadcrumb */}
          <div className="absolute top-8 left-4 sm:top-[137px] sm:left-8 md:left-16 lg:left-[299px]">
            <p className="font-['Poppins'] text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              HOME &gt; Blog
            </p>
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              Blog
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Content Section - White Background */}
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Search Section */}
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

          {/* Blog Posts Grid */}
          <div className="grid items-stretch justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sample Blog Post Card */}
            <div
              className="animate-slide-from-left flex h-full w-full max-w-[461px] flex-col bg-white opacity-0 shadow-lg"
              data-animate
              style={{ animationDelay: '100ms' }}
            >
              <div className="relative h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#D9D9D9]" />
                <div className="absolute flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
                  <div className="text-lg font-semibold text-gray-600">Blog Image</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
                <h3 className="mb-4 font-['Poppins'] text-xl leading-[175%] font-semibold tracking-[0.02em] text-[#001930] capitalize sm:text-2xl">
                  The Metaverse is coming! What does it mean for your business?
                </h3>
                <p className="mb-6 w-full max-w-[400px] flex-1 font-['Poppins'] text-sm leading-[160%] font-normal text-[#001930] capitalize sm:text-base">
                  Rapid digitization of brands has led to major technological leaps...
                </p>
                <div className="flex justify-center">
                  <button className="h-[40px] w-[161.6px] rounded-full border border-[#2D9CDB] bg-white shadow-[0px_4px_26px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0px_10px_50px_rgba(0,0,0,0.05)]">
                    <span className="text-center font-['Poppins'] text-sm leading-5 font-normal text-[#2D9CDB] sm:text-base">
                      Read More
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional sample cards */}
            <div
              className="animate-slide-from-bottom flex h-full w-full max-w-[461px] flex-col bg-white opacity-0 shadow-lg"
              data-animate
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#D9D9D9]" />
                <div className="absolute flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
                  <div className="text-lg font-semibold text-gray-600">Blog Image</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
                <h3 className="mb-4 font-['Poppins'] text-xl leading-[175%] font-semibold tracking-[0.02em] text-[#001930] capitalize sm:text-2xl">
                  Another Blog Post Title Here
                </h3>
                <p className="mb-6 w-full max-w-[400px] flex-1 font-['Poppins'] text-sm leading-[160%] font-normal text-[#001930] capitalize sm:text-base">
                  Sample description for another blog post...
                </p>
                <div className="flex justify-center">
                  <button className="h-[40px] w-[161.6px] rounded-full border border-[#2D9CDB] bg-white shadow-[0px_4px_26px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0px_10px_50px_rgba(0,0,0,0.05)]">
                    <span className="text-center font-['Poppins'] text-sm leading-5 font-normal text-[#2D9CDB] sm:text-base">
                      Read More
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="animate-slide-from-right flex h-full w-full max-w-[461px] flex-col bg-white opacity-0 shadow-lg"
              data-animate
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#D9D9D9]" />
                <div className="absolute flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
                  <div className="text-lg font-semibold text-gray-600">Blog Image</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
                <h3 className="mb-4 font-['Poppins'] text-xl leading-[175%] font-semibold tracking-[0.02em] text-[#001930] capitalize sm:text-2xl">
                  Third Blog Post Example
                </h3>
                <p className="mb-6 w-full max-w-[400px] flex-1 font-['Poppins'] text-sm leading-[160%] font-normal text-[#001930] capitalize sm:text-base">
                  Description for the third blog post example...
                </p>
                <div className="flex justify-center">
                  <button className="h-[40px] w-[161.6px] rounded-full border border-[#2D9CDB] bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.05)] transition-shadow">
                    <span className="text-center font-['Poppins'] text-sm leading-5 font-normal text-[#2D9CDB] sm:text-base">
                      Read More
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
