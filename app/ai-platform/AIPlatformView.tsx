'use client'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from 'tinacms/dist/react'
import Link from '@/components/Link'
import HeroCanvas from '@/components/HeroCanvas'
import {
  FadeIn,
  SlideFromLeft,
  SlideFromBottom,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

type Props = {
  data: any
  query: string
  variables: object
}

export default function AIPlatformView({ data, query, variables }: Props) {
  // useTina subscribes to live updates from TinaCMS admin when in visual editing mode.
  // In production / plain dev it just returns the static data unchanged.
  const { data: tinaData } = useTina({ data, query, variables })
  const page = tinaData.aiPlatform
  const {
    hero, stats,
    capabilitiesLabel, capabilitiesTitle, capabilities,
    useCasesLabel, useCasesTitle, useCases,
    howItWorksLabel, howItWorksTitle, howItWorks,
    cta,
  } = page

  return (
    <div className="w-full bg-[#07091B] font-['Poppins']">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 60% 40%, rgba(45,156,219,0.14) 0%, transparent 65%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block">
          <HeroCanvas />
        </div>
        <div className="absolute inset-0 z-0 opacity-40 lg:hidden">
          <HeroCanvas />
        </div>

        <div className="container relative z-10 mx-auto px-6 pb-20 pt-40 md:px-16 lg:w-1/2">
          <SlideFromLeft>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#00FCE2]/35 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00FCE2]" />
              <span
                className="text-xs font-bold tracking-[0.2em] text-[#00FCE2] uppercase"
                data-tina-field={tinaField(hero, 'badge')}
              >
                {hero?.badge}
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl leading-[1.1] font-bold text-white md:text-6xl lg:text-7xl">
              <span data-tina-field={tinaField(hero, 'headline')}>{hero?.headline}</span>
              <br />
              <span
                className="bg-gradient-to-r from-[#2D9CDB] to-[#00FCE2] bg-clip-text text-transparent"
                data-tina-field={tinaField(hero, 'headlineAccent')}
              >
                {hero?.headlineAccent}
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
              data-tina-field={tinaField(hero, 'subheadline')}
            >
              {hero?.subheadline}
            </p>

            <SlideFromBottom delay={0.35} distance={30}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={hero?.primaryCta?.href ?? '/contact'}
                  data-tina-field={tinaField(hero?.primaryCta, 'text')}
                  className="inline-flex h-[52px] items-center rounded-full bg-[#2D9CDB] px-8 text-sm font-semibold text-white transition hover:bg-[#1d8cbf] md:text-base"
                >
                  {hero?.primaryCta?.text}
                </Link>
                <Link
                  href={hero?.secondaryCta?.href ?? '#how-it-works'}
                  data-tina-field={tinaField(hero?.secondaryCta, 'text')}
                  className="inline-flex h-[52px] items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition hover:border-white/40 md:text-base"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px]">
                    ▶
                  </span>
                  {hero?.secondaryCta?.text}
                </Link>
              </div>
            </SlideFromBottom>
          </SlideFromLeft>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
          <span className="text-[10px] tracking-widest text-white/25 uppercase">Scroll</span>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-[#0D1127]">
        <div className="container mx-auto px-6 py-14 md:px-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats?.map((stat: any, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div data-tina-field={tinaField(stat, 'value')}>
                  <div className="bg-gradient-to-r from-[#2D9CDB] to-[#00FCE2] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-base font-semibold text-white">{stat.label}</div>
                  <div className="mt-0.5 text-sm text-white/35">{stat.sublabel}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="container mx-auto px-6 md:px-16">
          <FadeIn>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#00FCE2] uppercase" data-tina-field={tinaField(page, 'capabilitiesLabel')}>
              {capabilitiesLabel ?? 'What We Build'}
            </p>
            <h2 className="max-w-xl text-4xl font-bold text-white md:text-5xl" data-tina-field={tinaField(page, 'capabilitiesTitle')}>
              {capabilitiesTitle ?? 'Core AI Capabilities'}
            </h2>
          </FadeIn>
          <StaggerContainer
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2"
            staggerDelay={0.1}
          >
            {capabilities?.map((cap: any, i: number) => (
              <StaggerItem
                key={i}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#2D9CDB]/50 hover:bg-white/[0.06]"
              >
                <div className="absolute top-8 bottom-8 left-0 w-0.5 rounded-full bg-gradient-to-b from-[#2D9CDB] to-[#00FCE2] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 text-3xl" data-tina-field={tinaField(cap, 'icon')}>
                  {cap.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white" data-tina-field={tinaField(cap, 'title')}>
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50" data-tina-field={tinaField(cap, 'description')}>
                  {typeof cap.description === 'string'
                    ? cap.description
                    : cap.description?.children?.[0]?.children?.[0]?.text ?? ''}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0E24] py-28">
        <div className="container mx-auto px-6 md:px-16">
          <FadeIn>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#00FCE2] uppercase" data-tina-field={tinaField(page, 'useCasesLabel')}>
              {useCasesLabel ?? 'Real-World Impact'}
            </p>
            <h2 className="max-w-xl text-4xl font-bold text-white md:text-5xl" data-tina-field={tinaField(page, 'useCasesTitle')}>
              {useCasesTitle ?? 'Industries We Transform'}
            </h2>
          </FadeIn>
          <StaggerContainer
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {useCases?.map((uc: any, i: number) => (
              <StaggerItem
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div
                  className="absolute right-0 bottom-0 left-0 h-0.5 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: uc.accentColor }}
                />
                <span
                  className="mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    color: uc.accentColor,
                    backgroundColor: `${uc.accentColor}18`,
                    border: `1px solid ${uc.accentColor}30`,
                  }}
                  data-tina-field={tinaField(uc, 'tag')}
                >
                  {uc.tag}
                </span>
                <h3 className="mb-3 text-lg font-bold text-white" data-tina-field={tinaField(uc, 'title')}>
                  {uc.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50" data-tina-field={tinaField(uc, 'description')}>
                  {typeof uc.description === 'string'
                    ? uc.description
                    : uc.description?.children?.[0]?.children?.[0]?.text ?? ''}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28">
        <div className="container mx-auto px-6 md:px-16">
          <FadeIn className="text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#00FCE2] uppercase" data-tina-field={tinaField(page, 'howItWorksLabel')}>
              {howItWorksLabel ?? 'Process'}
            </p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" data-tina-field={tinaField(page, 'howItWorksTitle')}>
              {howItWorksTitle ?? 'How It Works'}
            </h2>
          </FadeIn>
          <div className="relative mt-20">
            <div className="absolute top-8 left-[18%] right-[18%] hidden h-px bg-gradient-to-r from-transparent via-[#2D9CDB]/30 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {howItWorks?.map((step: any, i: number) => (
                <SlideFromBottom key={i} delay={i * 0.15}>
                  <div className="text-center">
                    <div
                      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#2D9CDB]/40 bg-[#2D9CDB]/10 text-2xl font-bold text-[#2D9CDB]"
                      data-tina-field={tinaField(step, 'number')}
                    >
                      {step.number}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white" data-tina-field={tinaField(step, 'title')}>
                      {step.title}
                    </h3>
                    <p
                      className="mx-auto max-w-xs text-sm leading-relaxed text-white/50"
                      data-tina-field={tinaField(step, 'description')}
                    >
                      {typeof step.description === 'string'
                        ? step.description
                        : step.description?.children?.[0]?.children?.[0]?.text ?? ''}
                    </p>
                  </div>
                </SlideFromBottom>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0E24] py-28">
        <div className="container mx-auto px-6 md:px-16">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-12 text-center md:p-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D9CDB]/10 via-transparent to-[#00FCE2]/6" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(45,156,219,0.13) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <h2
                  className="mx-auto max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                  data-tina-field={tinaField(cta, 'headline')}
                >
                  {cta?.headline}
                </h2>
                <p
                  className="mx-auto mt-6 max-w-xl text-lg text-white/50"
                  data-tina-field={tinaField(cta, 'subtext')}
                >
                  {cta?.subtext}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href={cta?.primaryBtn?.href ?? '/contact'}
                    data-tina-field={tinaField(cta?.primaryBtn, 'text')}
                    className="inline-flex h-[52px] items-center rounded-full bg-[#2D9CDB] px-10 font-semibold text-white transition hover:bg-[#1d8cbf]"
                  >
                    {cta?.primaryBtn?.text}
                  </Link>
                  <Link
                    href={cta?.secondaryBtn?.href ?? '/contact'}
                    data-tina-field={tinaField(cta?.secondaryBtn, 'text')}
                    className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-10 font-semibold text-white transition hover:border-white/40"
                  >
                    {cta?.secondaryBtn?.text}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
