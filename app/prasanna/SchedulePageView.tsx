'use client'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Image from 'next/image'
import { SlideFromRight } from '@/components/AnimatedSection'

type Props = {
  pageData: any
  pageQuery: string
  pageVars: object
  /** Public Google Appointment Schedule booking URL (embedded as an iframe). */
  bookingUrl: string
  /** Heading shown above the embedded scheduler. */
  bookingHeading?: string
  bookingDescription?: string
}

export default function SchedulePageView({
  pageData,
  pageQuery,
  pageVars,
  bookingUrl,
  bookingHeading = 'Book a meeting',
  bookingDescription = 'Pick a time that works for you and we’ll send a Google Meet invite automatically.',
}: Props) {
  const { data: rawData } = useTina({ data: pageData, query: pageQuery, variables: pageVars })
  const data = normalizeTinaImages(rawData)
  const page = data.contact

  if (!page) return null

  const { hero } = page
  // `?gv=true` renders Google's embeddable booking view.
  const embedSrc = bookingUrl.includes('?') ? `${bookingUrl}&gv=true` : `${bookingUrl}?gv=true`

  return (
    <div className="min-h-screen font-['Poppins']">
      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative h-[444px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        {hero?.bannerImage && (
          <div className="absolute inset-0 z-10" data-tina-field={tinaField(hero, 'bannerImage')}>
            <Image
              src={hero.bannerImage}
              alt="Schedule Banner"
              className="h-full w-full object-cover"
              fill
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="absolute inset-0 z-20 bg-black/36" />
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          <div className="absolute top-[137px] left-4 sm:left-8 md:left-16 lg:left-40">
            <p className="font-['Poppins'] text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              HOME &gt; Schedule
            </p>
          </div>
          <div className="text-center">
            <h1 className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              Schedule
            </h1>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE SECTION ─────────────────────────────────────────── */}
      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          {/* Embedded Google Appointment Schedule */}
          <SlideFromRight className="mx-auto w-full max-w-[90%]">
            <h2 className="text-center font-['Poppins'] text-2xl leading-[54px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
              {bookingHeading}
            </h2>
            <div className="mx-auto my-3 h-[1px] w-[61px] bg-[#767E7E]" />
            <p className="mb-6 text-center font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
              {bookingDescription}
            </p>
            <div className="h-[80vh] min-h-[640px] overflow-hidden rounded-[10px] border border-[#E3E3E3] shadow-sm">
              <iframe
                src={embedSrc}
                title="Book a meeting"
                style={{ border: 0 }}
                loading="lazy"
                className="block h-full w-full"
              />
            </div>
          </SlideFromRight>
        </div>
      </section>
    </div>
  )
}
