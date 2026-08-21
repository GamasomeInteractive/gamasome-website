'use client'
import { tinaField } from 'tinacms/dist/react'
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

const PRIMARY = '#2D9CDB'
const ACCENT = '#00FCE2'

const ENGAGEMENT_ICONS = [
  <svg
    key="cal"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke={PRIMARY}
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  <svg
    key="sh"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke={PRIMARY}
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  <svg
    key="cl"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke={PRIMARY}
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  <svg
    key="cb"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke={PRIMARY}
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
]

export default function ServicePageGrid({ page }: { page: any }) {
  const {
    hero,
    servicesHeading,
    services,
    showEngagement,
    engagementHeading,
    engagementModels,
    showreelVideoUrl,
    spotlight,
    showUseCases,
    useCasesHeading,
    useCases,
    showPortfolio,
    portfolioHeading,
    portfolio,
    techHeading,
    technologies,
    ctaBox,
  } = page

  return (
    <div className="relative w-full bg-[#F8FAFC] font-['Poppins']">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full bg-[#07091B]">
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
        <div className="absolute inset-0 z-20 bg-black/50" />
        {/* Center-aligned hero text (grid template style) */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
          <FadeIn>
            <div className="mb-3 inline-block h-1 w-16 rounded" style={{ background: ACCENT }} />
            <h1
              className="max-w-3xl font-['Poppins'] text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
              data-tina-field={tinaField(hero, 'title')}
            >
              {hero?.title}
            </h1>
            <p
              className="mx-auto mt-5 max-w-2xl font-['Poppins'] text-lg font-normal text-white/80 sm:text-xl"
              data-tina-field={tinaField(hero, 'subtitle')}
            >
              {hero?.subtitle}
            </p>
            {hero?.ctaText && (
              <SlideFromBottom delay={0.3} distance={30}>
                <Link
                  href={hero.ctaHref || '/contact'}
                  className="mt-8 inline-block rounded-full px-10 py-4 font-['Poppins'] text-base font-semibold text-white transition"
                  style={{ background: PRIMARY }}
                  data-tina-field={tinaField(hero, 'ctaText')}
                >
                  {hero.ctaText}
                </Link>
              </SlideFromBottom>
            )}
          </FadeIn>
        </div>
        <div className="absolute bottom-8 left-1/2 z-40 flex h-[60px] w-5 -translate-x-1/2 items-start justify-center rounded-full border border-white/30 pt-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-white/50" />
        </div>
      </section>

      {/* ── SERVICES CARD GRID ──────────────────────────────────────── */}
      {services && services.length > 0 && (
        <section className="relative w-full bg-white py-20">
          <div className="container mx-auto px-4">
            {servicesHeading && (
              <FadeIn className="mb-14 text-center">
                <div className="mx-auto mb-4 h-1 w-12 rounded" style={{ background: ACCENT }} />
                <h2
                  className="font-['Poppins'] text-3xl leading-tight font-bold text-gray-900 sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'servicesHeading')}
                >
                  {servicesHeading}
                </h2>
              </FadeIn>
            )}
            <StaggerContainer
              className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.1}
            >
              {services.map((service: any, i: number) => (
                <StaggerItem
                  key={i}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(to right, ${PRIMARY}, ${ACCENT})` }}
                  />
                  {service.image && (
                    <div className="overflow-hidden" data-tina-field={tinaField(service, 'image')}>
                      <Image
                        src={service.image}
                        alt={service.title || ''}
                        width={400}
                        height={220}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className="mb-3 font-['Poppins'] text-xl font-bold text-gray-800"
                      data-tina-field={tinaField(service, 'title')}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="flex-1 font-['Poppins'] text-sm leading-relaxed text-gray-600"
                      data-tina-field={tinaField(service, 'description')}
                    >
                      {service.description}
                    </p>
                    {service.ctaText && (
                      <Link
                        href={service.ctaHref || '/contact'}
                        className="mt-5 inline-flex h-10 items-center rounded-full px-6 text-sm font-semibold text-white transition"
                        style={{ background: PRIMARY }}
                        data-tina-field={tinaField(service, 'ctaText')}
                      >
                        {service.ctaText} →
                      </Link>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── ENGAGEMENT MODELS ────────────────────────────────────────── */}
      {showEngagement && engagementModels && engagementModels.length > 0 && (
        <section className="relative w-full bg-[#F1FAFF] py-16">
          <div className="container mx-auto px-4">
            {engagementHeading && (
              <FadeIn className="mb-12 text-center">
                <h2
                  className="font-['Poppins'] text-3xl font-bold text-[#001930] sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'engagementHeading')}
                >
                  {engagementHeading}
                </h2>
              </FadeIn>
            )}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {engagementModels.map((model: any, i: number) => (
                <SlideFromBottom key={i} delay={i * 0.15} distance={60}>
                  <div className="flex h-full flex-col items-center rounded-xl bg-white p-6 text-center shadow-md">
                    <div className="mb-4">{ENGAGEMENT_ICONS[i % ENGAGEMENT_ICONS.length]}</div>
                    <h3
                      className="mb-3 font-['Poppins'] text-xl font-semibold text-[#001930]"
                      data-tina-field={tinaField(model, 'title')}
                    >
                      {model.title}
                    </h3>
                    <p
                      className="font-['Poppins'] text-sm text-[#767E7E]"
                      data-tina-field={tinaField(model, 'description')}
                    >
                      {model.description}
                    </p>
                  </div>
                </SlideFromBottom>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SHOWREEL ─────────────────────────────────────────────────── */}
      {showreelVideoUrl && (
        <section className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <div
              className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-xl shadow-lg"
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

      {/* ── SPOTLIGHT ────────────────────────────────────────────────── */}
      {spotlight?.enabled && (
        <section className="relative w-full bg-[#F8FAFC] py-16">
          <div className="mx-auto flex max-w-[1384px] flex-col gap-8 px-4 md:flex-row">
            {spotlight.videoUrl && (
              <SlideFromLeft className="relative aspect-video w-full md:w-[601px]">
                <iframe
                  className="h-full w-full rounded-xl shadow-lg"
                  src={spotlight.videoUrl}
                  title="Spotlight"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  data-tina-field={tinaField(spotlight, 'videoUrl')}
                />
              </SlideFromLeft>
            )}
            <SlideFromRight className="flex flex-1 flex-col justify-center">
              <div className="mb-4 h-1 w-12 rounded" style={{ background: ACCENT }} />
              <h2
                className="font-['Poppins'] text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                data-tina-field={tinaField(spotlight, 'heading')}
              >
                {spotlight.heading}
              </h2>
              <p
                className="mt-4 font-['Poppins'] text-base leading-relaxed text-gray-600 sm:text-lg"
                data-tina-field={tinaField(spotlight, 'description')}
              >
                {spotlight.description}
              </p>
              {spotlight.ctaText && (
                <Link
                  href={spotlight.ctaHref || '/contact'}
                  className="mt-6 inline-flex h-12 w-max items-center rounded-full px-8 font-['Poppins'] text-sm font-semibold text-white transition"
                  style={{ background: PRIMARY }}
                  data-tina-field={tinaField(spotlight, 'ctaText')}
                >
                  {spotlight.ctaText}
                </Link>
              )}
            </SlideFromRight>
          </div>
        </section>
      )}

      {/* ── USE CASES ─────────────────────────────────────────────────  */}
      {showUseCases && useCases && useCases.length > 0 && (
        <section className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            {useCasesHeading && (
              <FadeIn className="mb-12 text-center">
                <h2
                  className="font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl"
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
                <StaggerItem key={i} className="flex flex-col overflow-hidden rounded-xl shadow-sm">
                  <div
                    className="relative aspect-video w-full"
                    data-tina-field={tinaField(uc, 'videoUrl')}
                  >
                    <iframe
                      className="h-full w-full"
                      src={uc.videoUrl}
                      title={uc.title || ''}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="bg-white px-4 py-3">
                    <h3
                      className="font-['Poppins'] text-base font-semibold text-gray-800"
                      data-tina-field={tinaField(uc, 'title')}
                    >
                      {uc.title}
                    </h3>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── PORTFOLIO ─────────────────────────────────────────────────── */}
      {showPortfolio && portfolio && portfolio.length > 0 && (
        <section className="relative w-full py-16" style={{ background: PRIMARY }}>
          <div className="container mx-auto px-4">
            {portfolioHeading && (
              <FadeIn className="mb-12 text-center">
                <h2
                  className="font-['Poppins'] text-3xl font-bold text-white sm:text-4xl md:text-5xl"
                  data-tina-field={tinaField(page, 'portfolioHeading')}
                >
                  {portfolioHeading}
                </h2>
              </FadeIn>
            )}
            <StaggerContainer
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.1}
            >
              {portfolio.map((item: any, i: number) => (
                <StaggerItem
                  key={i}
                  className="overflow-hidden rounded-xl bg-white/10 transition hover:bg-white/20"
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
                            height={240}
                            className="h-52 w-full object-cover"
                            loading="lazy"
                          />
                        </Link>
                      ) : (
                        <Image
                          alt={item.title || ''}
                          src={item.image}
                          width={400}
                          height={240}
                          className="h-52 w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                  <p className="py-3 text-center font-['Poppins'] text-lg font-semibold text-white">
                    {item.title}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── TECHNOLOGIES + CTA ───────────────────────────────────────── */}
      {technologies && technologies.length > 0 && (
        <section className="relative w-full py-16" style={{ background: PRIMARY }}>
          {techHeading && (
            <FadeIn className="mb-10 text-center">
              <h2
                className="font-['Poppins'] text-3xl font-bold text-white sm:text-4xl md:text-5xl"
                data-tina-field={tinaField(page, 'techHeading')}
              >
                {techHeading}
              </h2>
            </FadeIn>
          )}
          <StaggerContainer
            className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-5"
            staggerDelay={0.08}
          >
            {technologies.map((tech: any, i: number) => (
              <StaggerItem
                key={i}
                className="flex h-[120px] items-center justify-center rounded-lg border border-white/20 bg-white/10"
              >
                <div
                  className="flex h-full w-full items-center justify-center"
                  data-tina-field={tinaField(tech, 'name')}
                >
                  {tech.image && (
                    <Image
                      src={tech.image}
                      alt={tech.name || ''}
                      width={120}
                      height={100}
                      className="object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {ctaBox && (
            <SlideFromBottom className="mx-auto mt-14 max-w-[875px] overflow-hidden rounded-2xl border border-white/30 p-8 text-center">
              {ctaBox.heading && (
                <h3
                  className="font-['Poppins'] text-2xl font-bold text-white"
                  data-tina-field={tinaField(ctaBox, 'heading')}
                >
                  {ctaBox.heading}
                </h3>
              )}
              {ctaBox.description && (
                <p
                  className="mt-2 font-['Poppins'] text-base text-white/70"
                  data-tina-field={tinaField(ctaBox, 'description')}
                >
                  {ctaBox.description}
                </p>
              )}
              {ctaBox.primaryBtn?.text && (
                <Link
                  href={ctaBox.primaryBtn.href || '/contact'}
                  className="mt-5 inline-block rounded-full border border-white px-10 py-3 font-['Poppins'] text-sm font-semibold text-white transition hover:bg-white hover:text-[#2D9CDB]"
                  data-tina-field={tinaField(ctaBox.primaryBtn, 'text')}
                >
                  {ctaBox.primaryBtn.text}
                </Link>
              )}
            </SlideFromBottom>
          )}
        </section>
      )}
    </div>
  )
}
