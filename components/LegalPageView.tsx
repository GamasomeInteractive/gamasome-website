import Image from 'next/image'

type Section = { heading: string; body: string }

export type LegalPage = {
  hero?: { breadcrumb?: string; title?: string; bannerImage?: string }
  lastUpdated?: string
  intro?: string
  sections?: Section[]
}

/**
 * Shared layout for the three legal pages (/privacy, /terms, /refunds).
 * Follows the same hero-banner + white-body structure the About and Contact pages use,
 * so these read as part of the site rather than as bolted-on documents.
 */
export default function LegalPageView({ page }: { page: LegalPage }) {
  const hero = page.hero ?? {}
  const sections = page.sections ?? []

  return (
    <div className="min-h-screen font-['Poppins']">
      {/* Hero banner — same construction as the Contact page */}
      <section className="relative h-[444px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        {hero.bannerImage && (
          <div className="absolute inset-0 z-10">
            <Image src={hero.bannerImage} alt="" className="h-full w-full object-cover" fill />
          </div>
        )}
        <div className="absolute inset-0 z-20 bg-black/36" />
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          <div className="absolute top-[137px] left-4 sm:left-8 md:left-16 lg:left-40">
            <p className="text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              {hero.breadcrumb}
            </p>
          </div>
          <div className="text-center">
            <h1 className="max-w-[766.5px] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              {hero.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {page.lastUpdated && (
              <p className="text-sm font-normal text-[#767E7E]">Last updated: {page.lastUpdated}</p>
            )}
            {page.intro && (
              <p className="mt-4 text-base leading-[190%] font-normal tracking-[0.02em] text-[#333333]">
                {page.intro}
              </p>
            )}

            {sections.map((s, i) => (
              <div key={i} className="mt-10">
                <h2 className="text-xl font-semibold tracking-[0.02em] text-[#333333] sm:text-2xl">
                  {s.heading}
                </h2>
                <div className="mx-auto my-3 ml-0 h-[1px] w-[61px] bg-[#767E7E]" />
                <p className="text-base leading-[190%] font-normal tracking-[0.02em] text-[#333333]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
