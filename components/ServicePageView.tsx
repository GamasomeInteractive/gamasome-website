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
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import SectionMotion from '@/components/SectionMotion'
import ServicePageGrid from '@/components/templates/ServicePageGrid'
import ServicePageDark from '@/components/templates/ServicePageDark'

type Props = {
  pageData: any
  pageQuery: string
  pageVars: object
  /** TinaCMS collection key, e.g. "roboticsSolutions", "gameDevelopment" */
  collectionKey: string
  /** Layout template: 'classic' | 'grid' | 'dark' (default: 'classic') */
  template?: string
}

const ENGAGEMENT_ICONS = [
  <svg
    key="calendar"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[#2D9CDB]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  <svg
    key="shield"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[#2D9CDB]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  <svg
    key="clock"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[#2D9CDB]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  <svg
    key="clip"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[#2D9CDB]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
]

export default function ServicePageView({
  pageData,
  pageQuery,
  pageVars,
  collectionKey,
  template = 'classic',
}: Props) {
  const { data: rawData } = useTina({ data: pageData, query: pageQuery, variables: pageVars })
  const data = normalizeTinaImages(rawData)
  const page = data[collectionKey]

  if (!page) return null

  if (template === 'grid') return <ServicePageGrid page={page} />
  if (template === 'dark') return <ServicePageDark page={page} />

  const {
    hero,
    servicesHeading,
    services,
    servicesMotion,
    showEngagement,
    engagementHeading,
    engagementModels,
    engagementMotion,
    showreelVideoUrl,
    spotlight,
    showUseCases,
    useCasesHeading,
    useCases,
    useCasesMotion,
    showPortfolio,
    portfolioHeading,
    portfolio,
    portfolioMotion,
    techHeading,
    technologies,
    techMotion,
    ctaBox,
  } = page

  return (
    <div className="relative w-full bg-white font-['Poppins']">
      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <SectionMotion
        motion={hero?.motion}
        as="section"
        className="relative h-screen w-full bg-[#07091B]"
      >
        <div className="absolute inset-0 z-0 bg-[#000B71]" />
        {hero?.bannerImage && (
          <div className="absolute inset-0 z-10" data-tina-field={tinaField(hero, 'bannerImage')}>
            <Image
              src={hero.bannerImage}
              alt={hero.title || ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 z-20 bg-black/36" />
        <div
          className="absolute inset-0 z-30"
          style={{ background: 'linear-gradient(90deg, #000000 -13.44%, rgba(0,0,0,0) 60.53%)' }}
        />
        <SlideFromLeft
          className="absolute top-1/2 left-4 z-40 max-w-[936px] -translate-y-1/2 p-0 sm:left-8 md:left-16 lg:left-40"
          distance={100}
        >
          <h1
            className="font-['Poppins'] text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl"
            data-tina-field={tinaField(hero, 'title')}
          >
            {hero?.title}
          </h1>
          <p
            className="mt-4 font-['Poppins'] text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl"
            data-tina-field={tinaField(hero, 'subtitle')}
          >
            {hero?.subtitle}
          </p>
          {hero?.ctaText && (
            <SlideFromBottom delay={0.4} distance={40}>
              <Link
                href={hero.ctaHref || '/contact'}
                className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[400px] sm:text-2xl"
                data-tina-field={tinaField(hero, 'ctaText')}
              >
                {hero.ctaText}
              </Link>
            </SlideFromBottom>
          )}
        </SlideFromLeft>
        <div className="absolute bottom-8 left-1/2 z-40 flex h-[60px] w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
        </div>
      </SectionMotion>

      {/* ── SERVICES SECTION ─────────────────────────────────────────── */}
      {services && services.length > 0 && (
        <SectionMotion
          motion={servicesMotion}
          as="section"
          className="relative w-full bg-white py-16"
        >
          <div className="container mx-auto px-4">
            {servicesHeading && (
              <FadeIn>
                <h2
                  className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'servicesHeading')}
                >
                  {servicesHeading}
                </h2>
              </FadeIn>
            )}
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
              {services.map((service: any, i: number) => {
                const Slide = i % 2 === 0 ? SlideFromLeft : SlideFromRight
                return (
                  <Slide
                    key={i}
                    className="flex flex-col gap-6 rounded-lg bg-[#F9FBFF] px-6 py-8 sm:flex-row"
                  >
                    {service.image && (
                      <div className="sm:w-1/2" data-tina-field={tinaField(service, 'image')}>
                        <Image
                          src={service.image}
                          alt={service.title || ''}
                          width={492}
                          height={282}
                          className="h-auto w-full rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div
                      className={`flex flex-col justify-center ${service.image ? 'sm:w-1/2' : 'w-full'}`}
                    >
                      <h3
                        className="mb-4 font-['Poppins'] text-2xl font-semibold text-gray-800"
                        data-tina-field={tinaField(service, 'title')}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="mb-6 font-['Poppins'] text-gray-600"
                        data-tina-field={tinaField(service, 'description')}
                      >
                        {service.description}
                      </p>
                      {service.ctaText && (
                        <Link
                          href={service.ctaHref || '/contact'}
                          className="h-[50px] w-full rounded-full border border-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB] hover:text-white sm:w-[192px] sm:text-lg"
                          data-tina-field={tinaField(service, 'ctaText')}
                        >
                          {service.ctaText}
                        </Link>
                      )}
                    </div>
                  </Slide>
                )
              })}
            </div>
          </div>
        </SectionMotion>
      )}

      {/* ── ENGAGEMENT MODELS (conditional) ─────────────────────────── */}
      {showEngagement && engagementModels && engagementModels.length > 0 && (
        <SectionMotion
          motion={engagementMotion}
          as="section"
          className="relative w-full bg-[#F1FAFF] py-16"
        >
          <div className="container mx-auto px-4">
            {engagementHeading && (
              <FadeIn>
                <h2
                  className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'engagementHeading')}
                >
                  {engagementHeading}
                </h2>
              </FadeIn>
            )}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {engagementModels.map((model: any, i: number) => (
                <SlideFromBottom key={i} delay={i * 0.15} distance={60}>
                  <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                    <div className="mb-4">{ENGAGEMENT_ICONS[i % ENGAGEMENT_ICONS.length]}</div>
                    <h3
                      className="mb-3 font-['Poppins'] text-xl font-semibold text-[#001930]"
                      data-tina-field={tinaField(model, 'title')}
                    >
                      {model.title}
                    </h3>
                    <p
                      className="font-['Poppins'] text-base text-[#767E7E]"
                      data-tina-field={tinaField(model, 'description')}
                    >
                      {model.description}
                    </p>
                  </div>
                </SlideFromBottom>
              ))}
            </div>
          </div>
        </SectionMotion>
      )}

      {/* ── SHOWREEL VIDEO (optional) ─────────────────────────────────── */}
      {showreelVideoUrl && (
        <section className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <div
              className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg shadow-lg"
              data-tina-field={tinaField(page, 'showreelVideoUrl')}
            >
              <iframe
                className="h-full w-full"
                src={showreelVideoUrl}
                title="Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ── SPOTLIGHT (conditional) ──────────────────────────────────── */}
      {spotlight?.enabled && (
        <SectionMotion
          motion={spotlight?.motion}
          as="section"
          className="relative w-full bg-white bg-cover bg-center py-16"
          style={
            { backgroundImage: "url('/static/images/metaverse-bg.png')" } as React.CSSProperties
          }
        >
          <div className="relative z-10 mx-auto flex max-w-[1384px] flex-col gap-8 px-4 md:flex-row">
            {spotlight.videoUrl && (
              <SlideFromLeft className="relative aspect-video w-full md:w-[601px]">
                <iframe
                  className="h-full w-full"
                  src={spotlight.videoUrl}
                  title="Feature spotlight"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  data-tina-field={tinaField(spotlight, 'videoUrl')}
                />
              </SlideFromLeft>
            )}
            <SlideFromRight className="flex flex-1 flex-col">
              <h2
                className="font-['Poppins'] text-2xl leading-[54px] font-semibold text-black sm:text-3xl md:text-4xl"
                data-tina-field={tinaField(spotlight, 'heading')}
              >
                {spotlight.heading}
              </h2>
              <p
                className="mt-4 max-w-[723px] font-['Poppins'] text-base leading-[28px] font-normal text-black sm:text-lg"
                data-tina-field={tinaField(spotlight, 'description')}
              >
                {spotlight.description}
              </p>
              {spotlight.ctaText && (
                <Link
                  href={spotlight.ctaHref || '/contact'}
                  className="mt-8 flex h-[50px] w-[192px] items-center justify-center rounded-full bg-[#2D9CDB] font-['Poppins'] text-base font-normal text-white capitalize"
                  data-tina-field={tinaField(spotlight, 'ctaText')}
                >
                  {spotlight.ctaText}
                </Link>
              )}
            </SlideFromRight>
          </div>
        </SectionMotion>
      )}

      {/* ── USE CASES VIDEOS (conditional) ──────────────────────────── */}
      {showUseCases && useCases && useCases.length > 0 && (
        <SectionMotion
          motion={useCasesMotion}
          as="section"
          className="relative flex w-full flex-col items-center bg-[#F1FAFF] py-16"
        >
          <div className="container mx-auto px-4">
            {useCasesHeading && (
              <FadeIn>
                <h2
                  className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'useCasesHeading')}
                >
                  {useCasesHeading}
                </h2>
              </FadeIn>
            )}
            <StaggerContainer
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.1}
            >
              {useCases.map((uc: any, i: number) => (
                <StaggerItem key={i} className="flex flex-col overflow-hidden rounded-[4px]">
                  <div
                    className="relative aspect-video w-full"
                    data-tina-field={tinaField(uc, 'videoUrl')}
                  >
                    <iframe
                      className="h-full w-full"
                      src={uc.videoUrl}
                      title={uc.title || 'Use case video'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <h3
                    className="mt-4 text-center font-['Poppins'] text-xl font-semibold text-[#001930] sm:text-2xl"
                    data-tina-field={tinaField(uc, 'title')}
                  >
                    {uc.title}
                  </h3>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SectionMotion>
      )}

      {/* ── PORTFOLIO (conditional) ──────────────────────────────────── */}
      {showPortfolio && portfolio && portfolio.length > 0 && (
        <SectionMotion
          motion={portfolioMotion}
          as="section"
          className="relative flex w-full flex-col items-center bg-[#2D9CDB] py-16"
        >
          <div className="container mx-auto px-4">
            {portfolioHeading && (
              <FadeIn>
                <h2
                  className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'portfolioHeading')}
                >
                  {portfolioHeading}
                </h2>
              </FadeIn>
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item: any, i: number) => (
                <SlideFromBottom key={i} delay={i * 0.1} distance={40}>
                  <div
                    className="flex flex-col overflow-hidden rounded-[4px] bg-[#2589c0]"
                    data-tina-field={tinaField(item, 'title')}
                  >
                    {item.image && (
                      <div data-tina-field={tinaField(item, 'image')}>
                        {item.link ? (
                          <Link href={item.link}>
                            <Image
                              alt={item.title || ''}
                              src={item.image}
                              width={400}
                              height={300}
                              className="h-[300px] w-full rounded-t-[4px] object-cover"
                              loading="lazy"
                            />
                          </Link>
                        ) : (
                          <Image
                            alt={item.title || ''}
                            src={item.image}
                            width={400}
                            height={300}
                            className="h-[300px] w-full rounded-t-[4px] object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                    )}
                    <h3 className="py-4 text-center font-['Poppins'] text-xl text-white sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </SlideFromBottom>
              ))}
            </div>
          </div>
        </SectionMotion>
      )}

      {/* ── TECHNOLOGIES + CTA BOX ───────────────────────────────────── */}
      {technologies && technologies.length > 0 && (
        <SectionMotion
          motion={techMotion}
          as="section"
          className="relative w-full bg-[#2D9CDB] py-16"
        >
          {techHeading && (
            <FadeIn>
              <h2
                className="text-center font-['Poppins'] text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl"
                data-tina-field={tinaField(page, 'techHeading')}
              >
                {techHeading}
              </h2>
            </FadeIn>
          )}
          <StaggerContainer
            className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-5"
            staggerDelay={0.1}
          >
            {technologies.map((tech: any, i: number) => (
              <StaggerItem
                key={i}
                className="flex h-[133px] w-full items-center justify-center border border-[#00FCE2]"
              >
                <div
                  className="flex h-full w-full items-center justify-center"
                  data-tina-field={tinaField(tech, 'name')}
                >
                  {tech.image && (
                    <Image
                      src={tech.image}
                      alt={tech.name || `Technology ${i + 1}`}
                      width={132}
                      height={112}
                      className="object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {ctaBox && (
            <SectionMotion motion={ctaBox?.motion} as="div" className="mx-auto mt-12 max-w-[875px]">
              <SlideFromBottom className="rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center">
                {ctaBox.heading && (
                  <h3
                    className="font-['Poppins'] text-xl font-bold text-white sm:text-2xl"
                    data-tina-field={tinaField(ctaBox, 'heading')}
                  >
                    {ctaBox.heading}
                  </h3>
                )}
                {ctaBox.description && (
                  <p
                    className="mt-2 font-['Poppins'] text-base font-normal text-white/60"
                    data-tina-field={tinaField(ctaBox, 'description')}
                  >
                    {ctaBox.description}
                  </p>
                )}
                {ctaBox.primaryBtn?.text && (
                  <Link
                    href={ctaBox.primaryBtn.href || '/contact'}
                    className="mt-4 inline-block h-[50px] w-full rounded-full border border-white text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-white hover:text-[#2D9CDB] sm:w-[192px] sm:text-lg"
                    data-tina-field={tinaField(ctaBox.primaryBtn, 'text')}
                  >
                    {ctaBox.primaryBtn.text}
                  </Link>
                )}
              </SlideFromBottom>
            </SectionMotion>
          )}
        </SectionMotion>
      )}
    </div>
  )
}
