'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { useEffect } from 'react'

// export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
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
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div
          className="animate-slide-from-left space-y-2 pt-6 pb-8 opacity-0 md:space-y-5"
          data-animate
        >
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d, index) => (
              <div
                key={d.title}
                className={`${index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'} opacity-0`}
                data-animate
                style={{ animationDelay: `${100 + index * 150}ms` }}
              >
                <Card
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc as string}
                  href={d.href as string}
                />
              </div>
            ))}
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
    </>
  )
}
