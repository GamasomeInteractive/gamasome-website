'use client'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Image from 'next/image'
import Link from '@/components/Link'
import {
  FadeIn,
  SlideFromLeft,
  SlideFromRight,
  SlideFromBottom,
} from '@/components/AnimatedSection'

type Props = {
  pageData: any
  pageQuery: string
  pageVars: object
}

export default function AboutPageView({ pageData, pageQuery, pageVars }: Props) {
  const { data: rawData } = useTina({ data: pageData, query: pageQuery, variables: pageVars })
  const data = normalizeTinaImages(rawData)
  const page = data.about

  if (!page) return null

  const { hero, business, founders, cta } = page

  return (
    <div className="relative w-full font-['Poppins']">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen overflow-hidden bg-[#2D9CDB]">
        <div className="relative z-10 container mx-auto flex min-h-screen items-center px-4 lg:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <SlideFromLeft className="space-y-6 text-white">
              {hero?.breadcrumb && (
                <nav
                  className="font-['Poppins'] text-xs font-normal opacity-80 sm:text-sm"
                  data-tina-field={tinaField(hero, 'breadcrumb')}
                >
                  {hero.breadcrumb}
                </nav>
              )}
              <h1
                className="font-['Poppins'] text-3xl leading-tight font-semibold uppercase sm:text-4xl lg:text-5xl"
                data-tina-field={tinaField(hero, 'title')}
              >
                {hero?.title}
              </h1>
              <div
                className="space-y-6 text-base leading-relaxed sm:text-lg"
                data-tina-field={tinaField(hero, 'body')}
              >
                {/* body is a plain string with \n\n separating paragraphs */}
                {hero?.body?.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="font-['Poppins']">
                    {para}
                  </p>
                ))}
              </div>
            </SlideFromLeft>

            {/* Right — image */}
            {hero?.image && (
              <SlideFromRight className="flex justify-center lg:justify-end">
                <div
                  className="relative w-full max-w-md lg:max-w-lg"
                  data-tina-field={tinaField(hero, 'image')}
                >
                  <div className="absolute inset-0 z-10 rounded-lg bg-[#0C0E21] opacity-40" />
                  <Image
                    src={hero.image}
                    alt="About Gamasome"
                    width={600}
                    height={700}
                    className="relative z-20 h-auto w-full rounded-lg"
                    priority
                  />
                </div>
              </SlideFromRight>
            )}
          </div>
        </div>
      </div>

      {/* ── BUSINESS / VIDEO ─────────────────────────────────────────── */}
      {business && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {business.heading && (
              <FadeIn>
                <h2
                  className="mb-8 text-center font-['Poppins'] text-2xl font-bold text-black sm:text-3xl lg:mb-12 lg:text-4xl xl:text-5xl"
                  data-tina-field={tinaField(business, 'heading')}
                >
                  {business.heading}
                </h2>
              </FadeIn>
            )}
            {business.videoUrl && (
              <SlideFromBottom className="flex justify-center">
                <div
                  className="aspect-video w-full max-w-4xl"
                  data-tina-field={tinaField(business, 'videoUrl')}
                >
                  <iframe
                    className="h-full w-full rounded-lg shadow-lg"
                    src={business.videoUrl}
                    title="Gamasome Showreel"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </SlideFromBottom>
            )}
            {business.description && (
              <FadeIn>
                <p
                  className="mx-auto mt-8 max-w-3xl text-center font-['Poppins'] text-base text-gray-700 sm:text-lg"
                  data-tina-field={tinaField(business, 'description')}
                >
                  {business.description}
                </p>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* ── FOUNDERS ─────────────────────────────────────────────────── */}
      {founders && (
        <section className="w-full bg-[#F6F6F6] py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn className="mb-12 text-center lg:mb-16">
              {founders.heading && (
                <h2
                  className="mb-4 font-['Poppins'] text-3xl font-semibold text-black sm:text-4xl lg:mb-6 lg:text-5xl"
                  data-tina-field={tinaField(founders, 'heading')}
                >
                  {founders.heading}
                </h2>
              )}
              {founders.description && (
                <p
                  className="mx-auto max-w-4xl font-['Poppins'] text-lg leading-relaxed text-black sm:text-xl"
                  data-tina-field={tinaField(founders, 'description')}
                >
                  {founders.description}
                </p>
              )}
            </FadeIn>

            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16 xl:gap-20">
              {founders.members?.map((member: any, i: number) => {
                const Slide = i % 2 === 0 ? SlideFromLeft : SlideFromRight
                return (
                  <Slide
                    key={i}
                    className="flex w-full flex-col items-center text-center sm:max-w-sm"
                  >
                    {member.image && (
                      <div className="mb-6 lg:mb-8" data-tina-field={tinaField(member, 'image')}>
                        <Image
                          src={member.image}
                          alt={member.name || ''}
                          width={280}
                          height={350}
                          className="h-80 w-64 rounded-3xl object-cover shadow-lg sm:h-[360px] sm:w-72 lg:h-96 lg:w-80"
                        />
                      </div>
                    )}
                    <div className="mb-2 flex flex-col items-center gap-3 sm:flex-row">
                      <h3
                        className="text-center font-['Poppins'] text-xl font-bold text-[#333333] sm:text-2xl lg:text-3xl"
                        data-tina-field={tinaField(member, 'name')}
                      >
                        {member.name}
                      </h3>
                      <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-600 transition-colors hover:bg-blue-700">
                        <span className="font-['Poppins'] text-xs font-bold text-white">in</span>
                      </div>
                    </div>
                    <p
                      className="font-['Poppins'] text-base font-medium text-[#666666] sm:text-lg"
                      data-tina-field={tinaField(member, 'role')}
                    >
                      {member.role}
                    </p>
                  </Slide>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BOX ──────────────────────────────────────────────────── */}
      {cta && (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <SlideFromBottom className="mx-auto max-w-4xl rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center lg:p-8">
              {cta.heading && (
                <h3
                  className="mb-4 font-['Poppins'] text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                  data-tina-field={tinaField(cta, 'heading')}
                >
                  {cta.heading}
                </h3>
              )}
              {cta.ctaText && (
                <Link
                  href={cta.ctaHref || '/contact'}
                  className="inline-block h-[50px] rounded-full border border-white px-8 text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-white hover:text-[#2D9CDB]"
                  data-tina-field={tinaField(cta, 'ctaText')}
                >
                  {cta.ctaText}
                </Link>
              )}
            </SlideFromBottom>
          </div>
        </section>
      )}
    </div>
  )
}
