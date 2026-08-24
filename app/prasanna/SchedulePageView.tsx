'use client'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Image from 'next/image'
import { SlideFromRight } from '@/components/AnimatedSection'

type SchedulePage = {
  hero?: { breadcrumb?: string; title?: string; bannerImage?: string }
  booking?: { heading?: string; description?: string; bookingUrl?: string }
}

type Props = {
  /** Contents of content/pages/schedule.json (CMS-managed). */
  page: SchedulePage
}

export default function SchedulePageView({ page }: Props) {
  // Rewrites any Tina-uploaded image URLs to local /static paths, same as other pages.
  const normalized = normalizeTinaImages({ schedule: page }) as { schedule: SchedulePage }
  const data = normalized.schedule ?? page
  const hero = data.hero ?? {}
  const booking = data.booking ?? {}

  const bookingUrl = booking.bookingUrl ?? ''
  const bookingHeading = booking.heading || 'Book a meeting'
  const bookingDescription =
    booking.description ||
    'Pick a time that works for you and we’ll send a Google Meet invite automatically.'
  const embedSrc = bookingUrl
    ? bookingUrl.includes('?')
      ? `${bookingUrl}&gv=true`
      : `${bookingUrl}?gv=true`
    : ''

  return (
    <div className="min-h-screen font-['Poppins']">
      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative h-[444px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        {hero.bannerImage && (
          <div className="absolute inset-0 z-10">
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
              {hero.breadcrumb || 'HOME > Schedule'}
            </p>
          </div>
          <div className="text-center">
            <h1 className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              {hero.title || 'Schedule'}
            </h1>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE SECTION ─────────────────────────────────────────── */}
      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          {/* Embedded Google Appointment Schedule */}
          <SlideFromRight className="mx-auto w-full">
            <div className="mx-auto max-w-full sm:max-w-[90%]">
              <h2 className="text-center font-['Poppins'] text-2xl leading-tight font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl sm:leading-[54px] md:text-4xl">
                {bookingHeading}
              </h2>
              <div className="mx-auto my-3 h-[1px] w-[61px] bg-[#767E7E]" />
              <p className="mb-6 text-center font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                {bookingDescription}
              </p>
            </div>
          </SlideFromRight>
        </div>

        {/* The embed is cross-origin, so no CSS of ours reaches inside it — the scrollbar is
            Google's own root document scrolling, and the only cure is giving the frame a size its
            layout is happy at. Widths and heights below were measured against the live embed
            (headless Chrome, reading scrollHeight inside the frame), not estimated:

              frame width   Google's layout    natural content height
              360–565px     stacked mobile     1281–1329px
              570–599px     stacked, 2-col      1809px   ← trap band, avoid entirely
              600–850px     compact desktop      869px   (887px at exactly 600)
              900px+        wide desktop        1382px

            Width is the lever, not just height: holding the frame in the 600–850px band asks
            ~500px less height than letting it run full width. Hence sm:max-w-[800px] — centred,
            not full-bleed. Below sm the frame is capped at 560px instead, to stay clear of the
            570–599px trap band: a 600px viewport minus a ~15px scrollbar lands at 585px, which
            costs 1809px of height.

            The block sits OUTSIDE the padded container on purpose. Nested inside it, a 640px
            viewport left the frame ~591px wide once container padding and the scrollbar came out
            — under the 600px floor, so the scrollbar came back.

            Heights carry 2 slot rows (2 × 48px, measured) of headroom, because the layout grows
            one 48px row per extra slot offered on the selected day. */}
        <div className="mx-auto h-[1430px] w-full max-w-[560px] sm:h-[990px] sm:max-w-[90%] sm:overflow-hidden sm:rounded-[10px] sm:border sm:border-[#E3E3E3] sm:shadow-sm">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title="Book a meeting"
              style={{ border: 0 }}
              loading="lazy"
              className="block h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#767E7E]">
              Add a Google Appointment Schedule URL in the CMS to show the booking calendar.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
