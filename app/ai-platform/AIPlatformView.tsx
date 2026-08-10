'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Link from '@/components/Link'
import Image from 'next/image'
import HeroCanvas from '@/components/HeroCanvas'
import SectionMotion from '@/components/SectionMotion'
import SectionSnap from '@/components/SectionSnap'
import SocialIcon from '@/components/social-icons'
import Logo from '@/data/logo.svg'
import MenuIcon from '@/data/menu-icon.svg'
import {
  FadeIn,
  SlideFromLeft,
  SlideFromBottom,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

type Props = {
  pageData: any;   pageQuery: string;   pageVars: object
  headerData: any; headerQuery: string; headerVars: object
  footerData: any; footerQuery: string; footerVars: object
}

export default function AIPlatformView(props: Props) {
  const { data: rawPageD }   = useTina({ data: props.pageData,   query: props.pageQuery,   variables: props.pageVars })
  const { data: rawHeaderD } = useTina({ data: props.headerData, query: props.headerQuery, variables: props.headerVars })
  const { data: rawFooterD } = useTina({ data: props.footerData, query: props.footerQuery, variables: props.footerVars })
  const pageD   = normalizeTinaImages(rawPageD)
  const headerD = normalizeTinaImages(rawHeaderD)
  const footerD = normalizeTinaImages(rawFooterD)

  const page = pageD.servicePage ?? pageD.aiPlatform
  const hdr  = headerD.header
  const ftr  = footerD.footer

  const {
    hero, stats,
    directAnswerLabel, directAnswerTitle, directAnswerBody, directAnswerChecklistTitle, directAnswerChecklist,
    problemsLabel, problemsTitle, problemsDescription, problems,
    methodsLabel, methodsTitle, methodsDescription, methodsTable, methodsFootnote,
    capabilitiesLabel, capabilitiesTitle, capabilitiesDescription, capabilitiesMotion, capabilities,
    useCasesLabel, useCasesTitle, useCasesMotion, useCases, useCasesAfterComparison,
    multimodalLabel, multimodalTitle, multimodalDescription, multimodal,
    securityLabel, securityTitle, securityDescription, security,
    qualityLabel, qualityTitle, qualityDescription, qualityList, qualityCardTitle, qualityCardHtml,
    pitfallsLabel, pitfallsTitle, pitfallsDescription, pitfalls,
    examplesLabel, examplesTitle, examplesDescription, examples,
    costsLabel, costsTitle, costsIntro, costs, costsOutro, costsMultimodalTwoCol,
    comparisonLabel, comparisonTitle, comparisonDescription, comparison, comparisonAfterExamples,
    howItWorksLabel, howItWorksTitle, howItWorksDescription, howItWorksMotion, howItWorks, howItWorksPipeline,
    faqLabel, faqTitle, faqs,
    cta,
  } = page

  // ── Typography ────────────────────────────────────────────────────
  const typo         = page.typography || {}
  const fontFamily   = typo.fontFamily   || 'Poppins'
  const headingColor = typo.headingColor || '#ffffff'
  const bodyColor    = typo.bodyColor    || 'rgba(255,255,255,0.55)'
  const labelColor   = typo.labelColor   || '#00FCE2'
  const primaryColor = typo.primaryColor || '#2D9CDB'
  const accentColor  = typo.accentColor  || '#00FCE2'
  const bgPrimary    = typo.bgPrimary    || '#07091B'
  const bgSecondary  = typo.bgSecondary  || '#0A0E24'
  const bgStats      = typo.bgStats      || '#0D1127'
  const bgFooter     = typo.bgFooter     || '#333333'

  // Footer CTA column only renders when it has content, so the grid width adapts
  // to however many columns are actually visible (CTA + Company + Newsletter + Offices).
  const hasFooterCta = Boolean(ftr?.ctaHeadline || ftr?.ctaDescription)
  const footerCols = 2 + (hasFooterCta ? 1 : 0) + (ftr?.newsletterEnabled ? 1 : 0)
  const footerGridClass =
    ({ 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as const)[footerCols] ??
    'md:grid-cols-4'

  // Reusable gradient text style
  const gradientText: React.CSSProperties = {
    background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  }

  // Load Google Font dynamically if changed from default
  const fontUrl = fontFamily !== 'Poppins'
    ? `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:ital,wght@0,400;0,500;0,600;0,700&display=swap`
    : null

  // ── Header state ──────────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  // Active-page matching: normalize trailing slashes so "/about/" === "/about".
  const pathname = usePathname() ?? '/'
  const normPath = (p: string) => (p || '/').replace(/\/+$/, '') || '/'
  const currentPath = normPath(pathname)
  const isActive = (href?: string) => Boolean(href) && normPath(href as string) === currentPath
  // Footer sub-link dropdown defaults to the first item that has sub-links (starts open).
  const visibleFooterNav = ((ftr?.navLinks ?? []) as any[]).filter((l) => !l?.hidden)
  const defaultOpenFooterNav = visibleFooterNav.findIndex((l) =>
    (l?.subLinks ?? []).some((s: any) => s?.title && s?.href),
  )
  const [openFooterNav, setOpenFooterNav] = useState<number | null>(
    defaultOpenFooterNav >= 0 ? defaultOpenFooterNav : null,
  )
  useEffect(() => {
    if (!menuOpen) setOpenDropdown(null)
  }, [menuOpen])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Use Cases renders in one of two slots: its default home after Multimodal, or —
  // when `useCasesAfterComparison` is set — directly below the comparison table.
  // Defined once here so both slots stay in sync.
  const useCasesSection = (
    <SectionMotion motion={useCasesMotion} as="section" className="py-16" style={{ background: bgSecondary }}>
      <div className="container mx-auto px-6 md:px-16">
        <FadeIn>
          <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'useCasesLabel')}>{useCasesLabel}</p>
          <h2 className="max-w-xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'useCasesTitle')}>{useCasesTitle}</h2>
        </FadeIn>
        <StaggerContainer className={`mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 ${useCases?.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`} staggerDelay={0.08}>
          {useCases?.map((uc: any, i: number) => (
            <StaggerItem key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
              <div className="absolute right-0 bottom-0 left-0 h-0.5 opacity-50 group-hover:opacity-100" style={{ background: uc.accentColor }} />
              <span className="mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                style={{ color: uc.accentColor, backgroundColor: `${uc.accentColor}18`, border: `1px solid ${uc.accentColor}30` }}
                data-tina-field={tinaField(uc, 'tag')}>{uc.tag}</span>
              <h3 className="mb-3 text-lg font-bold" data-tina-field={tinaField(uc, 'title')}>{uc.title}</h3>
              <p className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(uc, 'description')}>
                {typeof uc.description === 'string' ? uc.description : uc.description?.children?.[0]?.children?.[0]?.text ?? ''}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionMotion>
  )

  // Comparison renders in one of two slots: its default home after Use Cases, or —
  // when `comparisonAfterExamples` is set — directly below the Real-World Examples
  // section. Defined once here so both slots stay in sync.
  const comparisonSection = comparison && comparison.rows && comparison.rows.length > 0 ? (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-16">
        <FadeIn>
          {comparisonLabel && (
            <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'comparisonLabel')}>{comparisonLabel}</p>
          )}
          <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'comparisonTitle')}>{comparisonTitle}</h2>
          {comparisonDescription && (
            <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'comparisonDescription')}>{comparisonDescription}</p>
          )}
        </FadeIn>
        <FadeIn className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-white/[0.08]">
            <thead>
              <tr style={{ background: bgSecondary }}>
                {comparison.headers?.map((h: string, i: number) => (
                  <th key={i} className={`px-6 py-5 text-left text-sm font-bold tracking-wide uppercase ${i === 1 ? '' : 'text-white/70'}`} style={i === 1 ? { color: accentColor } : undefined}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                  <td className="border-t border-white/[0.06] px-6 py-5 text-sm font-semibold text-white">{row.activity}</td>
                  <td className="border-t border-white/[0.06] px-6 py-5 text-sm font-semibold" style={{ color: accentColor }}>{row.gamasome}</td>
                  <td className="border-t border-white/[0.06] px-6 py-5 text-sm text-white/55">{row.vendors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
      </div>
    </section>
  ) : null

  return (
    <div
      className="w-full"
      data-ai-platform="true"
      style={{ fontFamily: `'${fontFamily}', sans-serif`, background: bgPrimary }}
    >
      {/* Dynamic font loader */}
      {fontUrl && <link rel="stylesheet" href={fontUrl} />}

      {/* Scoped typography overrides — update live as CMS values change */}
      <style>{`
        [data-ai-platform="true"] h1,
        [data-ai-platform="true"] h2,
        [data-ai-platform="true"] h3 { color: ${headingColor} !important; }
        [data-ai-platform="true"] .gama-body  { color: ${bodyColor}  !important; }
        [data-ai-platform="true"] .gama-label { color: ${labelColor} !important; }
      `}</style>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between w-full max-w-none px-4 sm:px-10 md:px-24 bg-transparent py-10 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <Link href="/" aria-label="Gamasome">
          <div
            className={`ml-0 flex items-center transition-all duration-300 hover:scale-105 ${scrolled ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}
            data-tina-field={tinaField(hdr, 'logoImage')}
          >
            <div className="h-[56px] w-full max-w-[268px]">
              {hdr?.logoImage
                ? <Image src={hdr.logoImage} alt="Gamasome" width={268} height={56} className="h-full w-auto object-contain" />
                : <Logo />}
            </div>
          </div>
        </Link>
        <div className={`mr-0 flex cursor-pointer items-center space-x-4 transition-all duration-300 ${scrolled ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <button className="flex cursor-pointer items-center transition-transform duration-300 hover:scale-110" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
        </div>
        {menuOpen && (
          <div className="menu-fade-in fixed inset-0 z-50 h-full w-full bg-[#07091B]">
            <div className="absolute inset-0 bg-black/90" />
            <div className="relative flex h-full flex-col items-center justify-center">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 sm:top-10 sm:right-10" aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <nav className="flex flex-col space-y-6">
                {hdr?.navLinks?.filter((l: any) => !l?.hidden).map((link: any, i: number) => {
                  const subLinks = (link?.subLinks ?? []).filter((s: any) => s?.title && s?.href)
                  const isOpen = openDropdown === i
                  const active = isActive(link?.href)

                  if (subLinks.length === 0) {
                    return (
                      <Link key={i} href={link.href} onClick={() => setMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`text-xl font-semibold underline-offset-8 transition-colors sm:text-2xl md:text-3xl ${active ? 'text-[#00FCE2] underline decoration-2' : 'text-white'}`}
                        data-tina-field={tinaField(link, 'title')}
                        style={{ '--index': i } as React.CSSProperties}>
                        {link.title}
                      </Link>
                    )
                  }

                  return (
                    <div key={i} className="flex flex-col items-start" style={{ '--index': i } as React.CSSProperties}>
                      <div className="flex items-center gap-2">
                        <Link href={link.href} onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`text-xl font-semibold underline-offset-8 transition-colors sm:text-2xl md:text-3xl ${active ? 'text-[#00FCE2] underline decoration-2' : 'text-white'}`}
                          data-tina-field={tinaField(link, 'title')}>
                          {link.title}
                        </Link>
                        <button type="button" onClick={() => setOpenDropdown(isOpen ? null : i)}
                          aria-expanded={isOpen} aria-label={`Toggle ${link.title} submenu`}
                          className="text-white/80 transition-colors hover:text-white">
                          <svg className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </div>
                      {isOpen && (
                        <div className="mt-4 flex flex-col items-start gap-3 pl-4">
                          {subLinks.map((sub: any, j: number) => (
                            <Link key={j} href={sub.href} onClick={() => setMenuOpen(false)}
                              aria-current={isActive(sub?.href) ? 'page' : undefined}
                              className={`text-lg font-normal underline-offset-4 transition-colors sm:text-xl md:text-2xl ${isActive(sub?.href) ? 'text-[#00FCE2] underline' : 'text-white/70 hover:text-white'}`}
                              data-tina-field={tinaField(sub, 'title')}>
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ── PAGE SECTIONS ─────────────────────────────────────────────── */}
      <SectionSnap />
      <div className="w-full">

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <SectionMotion motion={hero?.motion} as="section" className="relative flex min-h-screen items-center">
          <div className="pointer-events-none absolute inset-0 z-0" style={{ background: `radial-gradient(ellipse 80% 55% at 60% 40%, ${primaryColor}24 0%, transparent 65%)` }} />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

          {/* Single fluid 3D thumbnail — scales continuously with viewport at every width.
              clamp(min, preferred, max):
                - 140px floor on tiny phones (<= ~440px viewport)
                - 32vw fluid scaling across phones, tablets, and desktops
                - 600px ceiling so it doesn't become huge on 4K monitors
              Positioned top-right; vertically centered on lg+ for desktop balance. */}
          <div
            className="pointer-events-none absolute right-4 top-28 z-0 overflow-hidden sm:right-6 sm:top-32 lg:right-10 lg:top-1/2 lg:-translate-y-1/2"
            style={{
              width: 'clamp(140px, 32vw, 600px)',
              height: 'clamp(140px, 32vw, 600px)',
            }}
            data-tina-field={tinaField(hero, hero?.image ? 'image' : 'animation')}
          >
            {hero?.image ? (
              <img
                src={hero.image}
                alt={hero?.imageAlt || hero?.badge || ''}
                className="h-full w-full object-contain"
              />
            ) : hero?.animation?.enabled !== false ? (
              <HeroCanvas
                primaryColor={hero?.animation?.primaryColor || primaryColor}
                accentColor={hero?.animation?.accentColor || accentColor}
              />
            ) : null}
          </div>

          <div className="container relative z-10 mx-auto px-6 pb-20 pt-40 md:px-16 lg:w-[80%]">
            <SlideFromLeft>
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5" style={{ borderColor: `${accentColor}59` }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accentColor }} />
                <span className="gama-label text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(hero, 'badge')}>{hero?.badge}</span>
              </div>
              <h1 className="max-w-2xl text-5xl leading-[1.1] font-bold md:text-6xl lg:text-7xl">
                <span data-tina-field={tinaField(hero, 'headline')}>{hero?.headline}</span>
                <br />
                <span style={gradientText} data-tina-field={tinaField(hero, 'headlineAccent')}>{hero?.headlineAccent}</span>
              </h1>
              <p className="gama-body mt-7 max-w-xl text-base leading-relaxed md:text-lg" data-tina-field={tinaField(hero, 'subheadline')}>{hero?.subheadline}</p>
              <SlideFromBottom delay={0.35} distance={30}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href={hero?.primaryCta?.href ?? '/contact'} data-tina-field={tinaField(hero?.primaryCta, 'text')}
                    className="inline-flex h-[52px] items-center rounded-full px-8 text-sm font-semibold text-white transition md:text-base"
                    style={{ background: primaryColor }}>
                    {hero?.primaryCta?.text}
                  </Link>
                  {hero?.secondaryCta?.text && (
                    <Link href={hero?.secondaryCta?.href ?? '#how-it-works'} data-tina-field={tinaField(hero?.secondaryCta, 'text')} className="inline-flex h-[52px] items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition hover:border-white/40 md:text-base">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px]">▶</span>
                      {hero?.secondaryCta?.text}
                    </Link>
                  )}
                </div>
              </SlideFromBottom>
              {hero?.trustBadges && hero.trustBadges.length > 0 && (
                <SlideFromBottom delay={0.45} distance={30}>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {hero.trustBadges.map((badge: any, i: number) => (
                      <span
                        key={i}
                        className="gama-body rounded-md border border-white/[0.12] px-3 py-1.5 text-xs font-medium"
                        data-tina-field={tinaField(badge, 'text')}
                      >
                        {badge?.text}
                      </span>
                    ))}
                  </div>
                </SlideFromBottom>
              )}
            </SlideFromLeft>
          </div>

          {/* <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
            <span className="text-[10px] tracking-widest text-white/25 uppercase">Scroll</span>
          </div> */}
        </SectionMotion>

        {/* ── STATS ──────────────────────────────────────────────────── */}
        {/* data-tina-field here → clicking the stats bar opens the ✏️ Typography & Colors panel */}
        {stats && stats.length > 0 && (
          <section className="border-y border-white/[0.06]" style={{ background: bgStats }} data-tina-field={tinaField(page, 'typography')}>
            <div className="container mx-auto px-6 py-14 md:px-16">
              <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                {stats.map((stat: any, i: number) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex h-full flex-col" data-tina-field={tinaField(stat, 'value')}>
                      <div className="flex min-h-[2.5em] items-start text-4xl leading-tight font-bold md:text-5xl" style={gradientText}>{stat.value}</div>
                      {stat.descHtml ? (
                        <p className="mt-3 text-sm leading-relaxed text-white/45 [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(stat, 'descHtml')} dangerouslySetInnerHTML={{ __html: stat.descHtml }} />
                      ) : (
                        <>
                          <div className="mt-3 min-h-[2.5em] text-base font-semibold text-white">{stat.label}</div>
                          <div className="mt-0.5 text-sm text-white/35">{stat.sublabel}</div>
                        </>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── DIRECT ANSWER (two-column: text left, card right/centered) ── */}
        {directAnswerTitle && (
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                {/* Left column — eyebrow + heading + paragraphs */}
                <FadeIn>
                  <div>
                    {directAnswerLabel && (
                      <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'directAnswerLabel')}>{directAnswerLabel}</p>
                    )}
                    <h2 className="text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'directAnswerTitle')}>{directAnswerTitle}</h2>
                    <div className="mt-7">
                      {directAnswerBody?.map((para: any, i: number) => (
                        <p key={i} className="gama-body mb-4 text-base leading-relaxed">{typeof para === 'string' ? para : para?.text}</p>
                      ))}
                    </div>
                  </div>
                </FadeIn>
                {/* Right column — checklist card, vertically centered */}
                {directAnswerChecklist && directAnswerChecklist.length > 0 && (
                  <FadeIn delay={0.1}>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                      {directAnswerChecklistTitle && (
                        <h3 className="mb-5 text-xl font-bold">{directAnswerChecklistTitle}</h3>
                      )}
                      <ul className="flex flex-col gap-3">
                        {directAnswerChecklist.map((item: any, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 shrink-0 font-bold" style={{ color: accentColor }}>✓</span>
                            <span className="gama-body text-[15px] leading-relaxed">{typeof item === 'string' ? item : item?.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── PROBLEMS ───────────────────────────────────────────────── */}
        {problems && problems.length > 0 && (
          <section className="py-16" style={{ background: bgSecondary }}>
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {problemsLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'problemsLabel')}>{problemsLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'problemsTitle')}>{problemsTitle}</h2>
                {problemsDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'problemsDescription')}>{problemsDescription}</p>
                )}
              </FadeIn>
              <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {problems.map((p: any, i: number) => (
                  <StaggerItem key={i} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    {p.icon && <div className="mb-4 text-3xl" data-tina-field={tinaField(p, 'icon')}>{p.icon}</div>}
                    <h3 className="mb-2 text-lg font-bold" data-tina-field={tinaField(p, 'title')}>{p.title}</h3>
                    <p className="gama-body text-sm leading-relaxed [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(p, 'description')} dangerouslySetInnerHTML={{ __html: p.description }} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── METHODS TABLE ──────────────────────────────────────────── */}
        {methodsTable && methodsTable.rows && methodsTable.rows.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {methodsLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'methodsLabel')}>{methodsLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'methodsTitle')}>{methodsTitle}</h2>
                {methodsDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'methodsDescription')}>{methodsDescription}</p>
                )}
              </FadeIn>
              <FadeIn className="mt-12 overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-white/[0.08]">
                  <thead>
                    <tr style={{ background: bgSecondary }}>
                      {methodsTable.headers?.map((h: string, i: number) => (
                        <th key={i} className="px-6 py-5 text-left text-sm font-bold tracking-wide uppercase" style={{ color: accentColor }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {methodsTable.rows.map((row: any, i: number) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                        <td className="border-t border-white/[0.06] px-6 py-5 align-top text-sm">
                          <span className="font-semibold text-white">{row.method}</span>
                          {row.methodSub && <span className="mt-1 block text-[13px] text-white/45">{row.methodSub}</span>}
                        </td>
                        <td className="border-t border-white/[0.06] px-6 py-5 align-top text-sm text-white/70">{row.bestFor}</td>
                        <td className="border-t border-white/[0.06] px-6 py-5 align-top text-sm text-white/70">{row.fidelity}</td>
                        <td className="border-t border-white/[0.06] px-6 py-5 align-top text-sm text-white/70">{row.scalability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FadeIn>
              {methodsFootnote && (
                <p className="gama-body mt-6 text-[13.5px] [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(page, 'methodsFootnote')} dangerouslySetInnerHTML={{ __html: methodsFootnote }} />
              )}
            </div>
          </section>
        )}

        {/* ── HOW IT WORKS (process — directly below Collection Methods) ── */}
        <SectionMotion motion={howItWorksMotion} as="section" id="how-it-works" className="py-16" style={{ background: bgSecondary }}>
          <div className="container mx-auto px-6 md:px-16">
            {howItWorksPipeline ? (
              <>
                {/* Left-aligned STAGE pipeline (matches the source HTML) */}
                <FadeIn>
                  {howItWorksLabel && (
                    <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'howItWorksLabel')}>{howItWorksLabel}</p>
                  )}
                  <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'howItWorksTitle')}>{howItWorksTitle}</h2>
                  {howItWorksDescription && (
                    <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'howItWorksDescription')}>{howItWorksDescription}</p>
                  )}
                </FadeIn>
                <StaggerContainer className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" staggerDelay={0.06}>
                  {howItWorks?.map((step: any, i: number) => (
                    <StaggerItem key={i} className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-5">
                      <span className="mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: primaryColor }} data-tina-field={tinaField(step, 'number')}>STAGE {i + 1}</span>
                      <h4 className="mb-1.5 text-[15px] font-bold text-white" data-tina-field={tinaField(step, 'title')}>{step.title}</h4>
                      <p className="gama-body text-[13.5px] leading-relaxed" data-tina-field={tinaField(step, 'description')}>
                        {typeof step.description === 'string' ? step.description : step.description?.children?.[0]?.children?.[0]?.text ?? ''}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </>
            ) : (
              <>
                <FadeIn className="text-center">
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'howItWorksLabel')}>{howItWorksLabel}</p>
                  <h2 className="text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'howItWorksTitle')}>{howItWorksTitle}</h2>
                  {howItWorksDescription && (
                    <p className="gama-body mx-auto mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'howItWorksDescription')}>{howItWorksDescription}</p>
                  )}
                </FadeIn>
                <div className="relative mt-20">
                  <div className="absolute top-8 left-[18%] right-[18%] hidden h-px md:block"
                    style={{ background: `linear-gradient(to right, transparent, ${primaryColor}4D, transparent)` }} />
                  <div className={`grid grid-cols-1 gap-12 ${howItWorks && howItWorks.length > 3 ? 'md:grid-cols-3 lg:grid-cols-3' : 'md:grid-cols-3'}`}>
                    {howItWorks?.map((step: any, i: number) => (
                      <SlideFromBottom key={i} delay={i * 0.1}>
                        <div className="text-center">
                          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
                            style={{ border: `1px solid ${primaryColor}66`, background: `${primaryColor}1A`, color: primaryColor }}
                            data-tina-field={tinaField(step, 'number')}>{step.number}</div>
                          <h3 className="mb-3 text-xl font-bold" data-tina-field={tinaField(step, 'title')}>{step.title}</h3>
                          <p className="gama-body mx-auto max-w-xs text-sm leading-relaxed" data-tina-field={tinaField(step, 'description')}>
                            {typeof step.description === 'string' ? step.description : step.description?.children?.[0]?.children?.[0]?.text ?? ''}
                          </p>
                        </div>
                      </SlideFromBottom>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </SectionMotion>

        {/* ── CAPABILITIES ───────────────────────────────────────────── */}
        {capabilities && capabilities.length > 0 && (
        <SectionMotion motion={capabilitiesMotion} as="section" className="py-16">
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn>
              <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'capabilitiesLabel')}>{capabilitiesLabel}</p>
              <h2 className="max-w-xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'capabilitiesTitle')}>{capabilitiesTitle}</h2>
              {capabilitiesDescription && (
                <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'capabilitiesDescription')}>{capabilitiesDescription}</p>
              )}
            </FadeIn>
            <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.1}>
              {capabilities?.map((cap: any, i: number) => (
                <StaggerItem key={i} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="absolute top-8 bottom-8 left-0 w-0.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to bottom, ${primaryColor}, ${accentColor})` }} />
                  <div className="mb-4 text-3xl" data-tina-field={tinaField(cap, 'icon')}>{cap.icon}</div>
                  <h3 className="mb-3 text-xl font-bold" data-tina-field={tinaField(cap, 'title')}>{cap.title}</h3>
                  <p className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(cap, 'description')}>
                    {typeof cap.description === 'string' ? cap.description : cap.description?.children?.[0]?.children?.[0]?.text ?? ''}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SectionMotion>
        )}

        {/* ── QUALITY FRAMEWORK (Episode Integrity Score — two-column) ── */}
        {qualityList && qualityList.length > 0 && (
          <section className="py-16" style={{ background: bgSecondary }}>
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {qualityLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'qualityLabel')}>{qualityLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'qualityTitle')}>{qualityTitle}</h2>
                {qualityDescription && (
                  <p className="gama-body mt-4 max-w-2xl text-lg" data-tina-field={tinaField(page, 'qualityDescription')}>{qualityDescription}</p>
                )}
              </FadeIn>
              <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
                <FadeIn>
                  <div>
                    {qualityList.map((q: any, i: number) => (
                      <div key={i} className={`grid grid-cols-[auto_1fr] gap-5 py-4 ${i > 0 ? 'border-t border-white/[0.08]' : ''}`}>
                        <span className="pt-0.5 font-mono text-[13px] font-semibold tracking-wider whitespace-nowrap" style={{ color: accentColor }} data-tina-field={tinaField(q, 'score')}>{q.score}</span>
                        <div>
                          <h4 className="mb-1 text-base font-bold text-white" data-tina-field={tinaField(q, 'title')}>{q.title}</h4>
                          <p className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(q, 'description')}>{q.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
                {qualityCardHtml && (
                  <FadeIn delay={0.1}>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                      {qualityCardTitle && (
                        <h3 className="mb-4 text-xl font-bold" data-tina-field={tinaField(page, 'qualityCardTitle')}>{qualityCardTitle}</h3>
                      )}
                      <div
                        className="gama-body text-sm leading-relaxed [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                        data-tina-field={tinaField(page, 'qualityCardHtml')}
                        dangerouslySetInnerHTML={{ __html: qualityCardHtml }}
                      />
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── SECURITY ───────────────────────────────────────────────── */}
        {security && security.length > 0 && (
          <section className="py-16" style={{ background: bgSecondary }}>
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {securityLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'securityLabel')}>{securityLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'securityTitle')}>{securityTitle}</h2>
                {securityDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'securityDescription')}>{securityDescription}</p>
                )}
              </FadeIn>
              <StaggerContainer className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" staggerDelay={0.06}>
                {security.map((s: any, i: number) => (
                  <StaggerItem key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm" style={{ background: `${accentColor}22`, color: accentColor }}>✓</span>
                    <span className="text-base font-medium text-white" data-tina-field={tinaField(s, 'title')}>{s.title}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── PITFALLS (what teams get wrong) ────────────────────────── */}
        {pitfalls && pitfalls.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {pitfallsLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'pitfallsLabel')}>{pitfallsLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'pitfallsTitle')}>{pitfallsTitle}</h2>
                {pitfallsDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'pitfallsDescription')}>{pitfallsDescription}</p>
                )}
              </FadeIn>
              <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.08}>
                {pitfalls.map((p: any, i: number) => (
                  <StaggerItem key={i} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <h3 className="mb-3 text-lg font-bold" data-tina-field={tinaField(p, 'title')}>{p.title}</h3>
                    <p className="gama-body text-sm leading-relaxed [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(p, 'description')} dangerouslySetInnerHTML={{ __html: p.description }} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── EXAMPLES (real-world program vignettes) ────────────────── */}
        {/* Sits directly after Pitfalls. Uses bgStats so it separates cleanly
            from Pitfalls (bgPrimary) above and Costs (bgSecondary) below. */}
        {examples && examples.length > 0 && (
          <section className="py-16" style={{ background: bgStats }}>
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {examplesLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'examplesLabel')}>{examplesLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'examplesTitle')}>{examplesTitle}</h2>
                {examplesDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'examplesDescription')}>{examplesDescription}</p>
                )}
              </FadeIn>
              <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.08}>
                {examples.map((ex: any, i: number) => (
                  <StaggerItem key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <h3 className="mb-6 text-lg font-bold" data-tina-field={tinaField(ex, 'title')}>{ex.title}</h3>
                    <dl className="flex flex-col gap-4">
                      {(ex.steps ?? []).map((s: any, j: number) => (
                        <div key={j}>
                          <dt className="mb-1 text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: accentColor }} data-tina-field={tinaField(s, 'label')}>{s.label}</dt>
                          <dd className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(s, 'text')}>{s.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── COMPARISON (early slot — directly after Real-World Examples) ── */}
        {comparisonAfterExamples && comparisonSection}

        {/* ── USE CASES (early slot — directly after the comparison table) ── */}
        {useCasesAfterComparison && useCasesSection}

        {/* ── COSTS + DELIVERY FORMATS (single two-column section) ───── */}
        {/* Opt-in via `costsMultimodalTwoCol`: pairs Costs (left) and Delivery
            Formats (right) inside one section, replacing the two stacked ones. */}
        {costsMultimodalTwoCol && (costs?.length > 0 || multimodal?.length > 0) && (
          <section className="py-16" style={{ background: bgSecondary }}>
            <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:px-16 lg:grid-cols-2 lg:gap-16">
              {/* Left column — cost considerations */}
              {costs && costs.length > 0 && (
                <FadeIn>
                  <div>
                    {costsLabel && (
                      <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'costsLabel')}>{costsLabel}</p>
                    )}
                    <h2 className="text-3xl font-bold md:text-4xl" data-tina-field={tinaField(page, 'costsTitle')}>{costsTitle}</h2>
                    {costsIntro && (
                      <p className="gama-body mt-4 text-base [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(page, 'costsIntro')} dangerouslySetInnerHTML={{ __html: costsIntro }} />
                    )}
                    <div className="mt-8 flex flex-col gap-3">
                      {costs.map((c: any, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 font-bold" style={{ color: accentColor }}>✓</span>
                          <span className="gama-body text-[15px] leading-relaxed">{typeof c === 'string' ? c : c?.text}</span>
                        </div>
                      ))}
                    </div>
                    {costsOutro && (
                      <p className="gama-body mt-8 text-base [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(page, 'costsOutro')} dangerouslySetInnerHTML={{ __html: costsOutro }} />
                    )}
                  </div>
                </FadeIn>
              )}
              {/* Right column — delivery formats. Description sits below the
                  cards here, matching the source layout. */}
              {multimodal && multimodal.length > 0 && (
                <FadeIn delay={0.1}>
                  <div>
                    {multimodalLabel && (
                      <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'multimodalLabel')}>{multimodalLabel}</p>
                    )}
                    <h2 className="text-3xl font-bold md:text-4xl" data-tina-field={tinaField(page, 'multimodalTitle')}>{multimodalTitle}</h2>
                    <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2" staggerDelay={0.08}>
                      {multimodal.map((m: any, i: number) => (
                        <StaggerItem key={i} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                          {m.icon && <div className="mb-3 text-2xl" data-tina-field={tinaField(m, 'icon')}>{m.icon}</div>}
                          <h3 className="mb-2 text-lg font-bold" data-tina-field={tinaField(m, 'title')}>{m.title}</h3>
                          <p className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(m, 'description')}>{m.description}</p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    {multimodalDescription && (
                      <p className="gama-body mt-6 text-base" data-tina-field={tinaField(page, 'multimodalDescription')}>{multimodalDescription}</p>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
          </section>
        )}

        {/* ── COSTS (standalone, full-width) ─────────────────────────── */}
        {!costsMultimodalTwoCol && costs && costs.length > 0 && (
          <section className="py-16" style={{ background: bgSecondary }}>
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {costsLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'costsLabel')}>{costsLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'costsTitle')}>{costsTitle}</h2>
                {costsIntro && (
                  <p className="gama-body mt-4 max-w-3xl text-base [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(page, 'costsIntro')} dangerouslySetInnerHTML={{ __html: costsIntro }} />
                )}
              </FadeIn>
              <StaggerContainer className="mt-10 flex max-w-3xl flex-col gap-3" staggerDelay={0.06}>
                {costs.map((c: any, i: number) => (
                  <StaggerItem key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: accentColor }}>✓</span>
                    <span className="gama-body text-[15px] leading-relaxed">{typeof c === 'string' ? c : c?.text}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              {costsOutro && (
                <FadeIn>
                  <p className="gama-body mt-8 max-w-3xl text-base [&_a]:font-medium [&_a]:text-[#4c8dff] [&_a]:underline" data-tina-field={tinaField(page, 'costsOutro')} dangerouslySetInnerHTML={{ __html: costsOutro }} />
                </FadeIn>
              )}
            </div>
          </section>
        )}

        {/* ── MULTIMODAL (delivery formats — standalone, full-width) ─── */}
        {!costsMultimodalTwoCol && multimodal && multimodal.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn>
                {multimodalLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'multimodalLabel')}>{multimodalLabel}</p>
                )}
                <h2 className="max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'multimodalTitle')}>{multimodalTitle}</h2>
                {multimodalDescription && (
                  <p className="gama-body mt-4 max-w-3xl text-base" data-tina-field={tinaField(page, 'multimodalDescription')}>{multimodalDescription}</p>
                )}
              </FadeIn>
              <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.1}>
                {multimodal.map((m: any, i: number) => (
                  <StaggerItem key={i} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <div className="mb-4 text-3xl" data-tina-field={tinaField(m, 'icon')}>{m.icon}</div>
                    <h3 className="mb-3 text-xl font-bold" data-tina-field={tinaField(m, 'title')}>{m.title}</h3>
                    <p className="gama-body text-sm leading-relaxed" data-tina-field={tinaField(m, 'description')}>{m.description}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── USE CASES (default slot — after Multimodal) ─────────────── */}
        {!useCasesAfterComparison && useCasesSection}

        {/* ── COMPARISON (default slot — after Use Cases) ─────────────── */}
        {!comparisonAfterExamples && comparisonSection}

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        {faqs && faqs.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-16">
              <FadeIn className="text-center">
                {faqLabel && (
                  <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'faqLabel')}>{faqLabel}</p>
                )}
                <h2 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'faqTitle')}>{faqTitle}</h2>
              </FadeIn>
              <FadeIn className="mx-auto mt-12 max-w-3xl">
                {faqs.map((f: any, i: number) => (
                  <details key={i} className="group border-b border-white/[0.1] py-5" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                      <span data-tina-field={tinaField(f, 'question')}>{f.question}</span>
                      <span className="shrink-0 text-2xl transition-transform duration-300 group-open:rotate-45" style={{ color: accentColor }}>+</span>
                    </summary>
                    <p className="gama-body mt-4 text-base leading-relaxed" data-tina-field={tinaField(f, 'answer')}>{f.answer}</p>
                  </details>
                ))}
              </FadeIn>
            </div>
          </section>
        )}

        {/* ── CTA (rendered only when `cta` is present) ──────────────── */}
        {cta && (
        <SectionMotion motion={cta?.motion} as="section" className="py-16" style={{ background: bgSecondary }}>
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn>
              {cta?.badges && cta.badges.length > 0 ? (
                /* HTML-style final CTA: centered, eyebrow, amber primary, badge links */
                <div className="relative overflow-hidden py-8 text-center">
                  <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,176,32,0.10), transparent 60%)' }} />
                  <div className="relative">
                    {cta?.label && (
                      <p className="gama-label mb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(cta, 'label')}>
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
                        {cta.label}
                      </p>
                    )}
                    <h2 className="mx-auto max-w-2xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(cta, 'headline')}>{cta?.headline}</h2>
                    <p className="gama-body mx-auto mt-6 max-w-xl text-base" data-tina-field={tinaField(cta, 'subtext')}>{cta?.subtext}</p>
                    <div className="mt-10 flex flex-wrap justify-center gap-3.5">
                      <Link href={cta?.primaryBtn?.href ?? '/contact'} data-tina-field={tinaField(cta?.primaryBtn, 'text')}
                        className="inline-flex h-[50px] items-center rounded-lg px-6 font-mono text-sm font-medium text-[#191203] transition hover:brightness-110"
                        style={{ background: '#ffb020' }}>
                        {cta?.primaryBtn?.text}
                      </Link>
                      {cta?.secondaryBtn?.text && (
                        <Link href={cta?.secondaryBtn?.href ?? '/contact'} data-tina-field={tinaField(cta?.secondaryBtn, 'text')} className="inline-flex h-[50px] items-center rounded-lg border border-white/15 px-6 font-mono text-sm font-medium text-white transition hover:border-white/35">
                          {cta.secondaryBtn.text}
                        </Link>
                      )}
                    </div>
                    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                      {cta.badges.map((b: any, i: number) => (
                        <Link key={i} href={b?.href ?? '#'} data-tina-field={tinaField(b, 'text')}
                          className="rounded-md border border-white/[0.12] px-3 py-1.5 font-mono text-xs text-white/60 transition hover:border-white/25 hover:text-white">
                          {b?.text} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-12 text-center md:p-20">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}1A, transparent, ${accentColor}0F)` }} />
                  <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${primaryColor}21 0%, transparent 70%)` }} />
                  <div className="relative">
                    <h2 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl" data-tina-field={tinaField(cta, 'headline')}>{cta?.headline}</h2>
                    <p className="gama-body mx-auto mt-6 max-w-xl text-lg" data-tina-field={tinaField(cta, 'subtext')}>{cta?.subtext}</p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                      <Link href={cta?.primaryBtn?.href ?? '/contact'} data-tina-field={tinaField(cta?.primaryBtn, 'text')}
                        className="inline-flex h-[52px] items-center rounded-full px-10 font-semibold text-white transition"
                        style={{ background: primaryColor }}>
                        {cta?.primaryBtn?.text}
                      </Link>
                      {cta?.secondaryBtn?.text && (
                        <Link href={cta?.secondaryBtn?.href ?? '/contact'} data-tina-field={tinaField(cta?.secondaryBtn, 'text')} className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-10 font-semibold text-white transition hover:border-white/40">
                          {cta.secondaryBtn.text}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </SectionMotion>
        )}
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="relative w-full py-16 text-white" style={{ background: bgFooter, fontFamily: `'${fontFamily}', sans-serif` }}>
        <div className={`mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 ${footerGridClass}`}>
          {hasFooterCta && (
            <div>
              <h2 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl" data-tina-field={tinaField(ftr, 'ctaHeadline')}>{ftr?.ctaHeadline}</h2>
              <p className="mt-6 text-sm font-normal sm:text-base" data-tina-field={tinaField(ftr, 'ctaDescription')}>{ftr?.ctaDescription}</p>
            </div>
          )}
          <div>
            <h3 className="text-base font-medium sm:text-lg">Company</h3>
            <div className="mt-4 flex flex-col gap-2">
              {ftr?.navLinks?.filter((l: any) => !l?.hidden).map((link: any, i: number) => {
                const subLinks = (link?.subLinks ?? []).filter((s: any) => s?.title && s?.href)
                const isOpen = openFooterNav === i
                const active = isActive(link?.href)

                if (subLinks.length === 0) {
                  return (
                    <Link key={i} href={link.href} aria-current={active ? 'page' : undefined} className={`text-sm hover:underline sm:text-base ${active ? 'font-semibold text-[#00FCE2] underline' : 'font-normal'}`} data-tina-field={tinaField(link, 'title')}>{link.title}</Link>
                  )
                }

                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link href={link.href} aria-current={active ? 'page' : undefined} className={`text-sm hover:underline sm:text-base ${active ? 'font-semibold text-[#00FCE2] underline' : 'font-normal'}`} data-tina-field={tinaField(link, 'title')}>{link.title}</Link>
                      <button type="button" onClick={() => setOpenFooterNav(isOpen ? null : i)} aria-expanded={isOpen} aria-label={`Toggle ${link.title} links`} className="text-white/60 transition-colors hover:text-white">
                        <svg className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    {/* Sub-links stay in the DOM (crawlable) but collapse visually when closed. */}
                    <div className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-2 border-l border-white/20 pl-3`}>
                      {subLinks.map((sub: any, j: number) => (
                        <Link key={j} href={sub.href} aria-current={isActive(sub?.href) ? 'page' : undefined} className={`text-sm hover:underline sm:text-base ${isActive(sub?.href) ? 'font-semibold text-[#00FCE2]' : 'font-normal text-white/70 hover:text-white'}`} data-tina-field={tinaField(sub, 'title')}>{sub.title}</Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {ftr?.newsletterEnabled && (
            <div>
              <h3 className="text-base font-semibold sm:text-lg">Subscribe to Newsletter</h3>
              <form className="mt-4 flex h-20 w-full items-center justify-between rounded-lg border border-white/20 px-4 sm:max-w-[318px]">
                <input type="email" placeholder="Email Address" className="flex-1 bg-transparent text-sm font-normal text-white outline-none" />
                <button type="submit" className="h-6 w-6">
                  <Image width={100} height={100} src="/static/images/send.png" alt="Send" className="h-full w-full object-contain" />
                </button>
              </form>
            </div>
          )}
          <div>
            {ftr?.offices?.map((office: any, i: number) => (
              <div key={i} className={i > 0 ? 'mt-8' : ''}>
                <div data-tina-field={tinaField(office, 'flagImage')} className="mb-3">
                  {office.flagImage
                    ? <Image width={80} height={40} src={office.flagImage} alt={office.country} className="h-10 w-20 object-contain" />
                    : <div className="flex h-10 w-20 items-center justify-center rounded border border-dashed border-white/20 text-xs text-white/30">+ Flag</div>
                  }
                </div>
                <h3 className="text-base font-normal sm:text-lg" data-tina-field={tinaField(office, 'city')}>{office.city}</h3>
                <p className="mt-4 text-sm font-normal sm:text-base" data-tina-field={tinaField(office, 'address')}>{office.address}</p>
                <p className="mt-4 text-sm font-normal sm:text-base">
                  <a href={`mailto:${office.email}`} data-tina-field={tinaField(office, 'email')}>{office.email}</a><br />
                  <span data-tina-field={tinaField(office, 'phone')}>{office.phone}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-center text-sm font-normal text-white underline">
            {ftr?.legalLinks?.filter((l: any) => !l?.hidden).map((link: any, i: number) => (
              <span key={link.href}>{i > 0 && ' | '}<Link href={link.href} data-tina-field={tinaField(link, 'title')}>{link.title}</Link></span>
            ))}{' '}| © <span data-tina-field={tinaField(ftr, 'copyrightName')}>{ftr?.copyrightName}</span> | {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium capitalize sm:text-base">Follow us:</span>
            <div className="flex gap-2">
              {ftr?.social?.twitter   && <SocialIcon kind="x"        href={ftr.social.twitter}   size={5} />}
              {ftr?.social?.linkedin  && <SocialIcon kind="linkedin"  href={ftr.social.linkedin}  size={5} />}
              {ftr?.social?.facebook  && <SocialIcon kind="facebook"  href={ftr.social.facebook}  size={5} />}
              {ftr?.social?.youtube   && <SocialIcon kind="youtube"   href={ftr.social.youtube}   size={5} />}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
