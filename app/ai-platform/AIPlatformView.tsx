'use client'
import { useState, useEffect } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Link from '@/components/Link'
import Image from 'next/image'
import HeroCanvas from '@/components/HeroCanvas'
import SectionMotion from '@/components/SectionMotion'
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
    capabilitiesLabel, capabilitiesTitle, capabilitiesMotion, capabilities,
    useCasesLabel, useCasesTitle, useCasesMotion, useCases,
    howItWorksLabel, howItWorksTitle, howItWorksMotion, howItWorks,
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
                {hdr?.navLinks?.map((link: any, i: number) => (
                  <Link key={i} href={link.href} onClick={() => setMenuOpen(false)}
                    className="text-xl font-semibold text-white sm:text-2xl md:text-3xl"
                    data-tina-field={tinaField(link, 'title')}
                    style={{ '--index': i } as React.CSSProperties}>
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ── PAGE SECTIONS ─────────────────────────────────────────────── */}
      <div className="w-full">

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <SectionMotion motion={hero?.motion} as="section" className="relative flex min-h-screen items-center">
          <div className="pointer-events-none absolute inset-0 z-0" style={{ background: `radial-gradient(ellipse 80% 55% at 60% 40%, ${primaryColor}24 0%, transparent 65%)` }} />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

          <div
            className="absolute inset-y-0 right-0 z-0 w-full lg:w-1/2"
            data-tina-field={tinaField(hero, 'animation')}
          >
            {hero?.animation?.enabled !== false && (
              <HeroCanvas
                primaryColor={hero?.animation?.primaryColor || primaryColor}
                accentColor={hero?.animation?.accentColor || accentColor}
              />
            )}
          </div>

          <div className="container relative z-10 mx-auto px-6 pb-20 pt-40 md:px-16 lg:w-1/2">
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
                  <Link href={hero?.secondaryCta?.href ?? '#how-it-works'} data-tina-field={tinaField(hero?.secondaryCta, 'text')} className="inline-flex h-[52px] items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition hover:border-white/40 md:text-base">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px]">▶</span>
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
        </SectionMotion>

        {/* ── STATS ──────────────────────────────────────────────────── */}
        {/* data-tina-field here → clicking the stats bar opens the ✏️ Typography & Colors panel */}
        <section className="border-y border-white/[0.06]" style={{ background: bgStats }} data-tina-field={tinaField(page, 'typography')}>
          <div className="container mx-auto px-6 py-14 md:px-16">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {stats?.map((stat: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div data-tina-field={tinaField(stat, 'value')}>
                    <div className="text-4xl font-bold md:text-5xl" style={gradientText}>{stat.value}</div>
                    <div className="mt-1 text-base font-semibold text-white">{stat.label}</div>
                    <div className="mt-0.5 text-sm text-white/35">{stat.sublabel}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES ───────────────────────────────────────────── */}
        <SectionMotion motion={capabilitiesMotion} as="section" className="py-28">
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn>
              <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'capabilitiesLabel')}>{capabilitiesLabel}</p>
              <h2 className="max-w-xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'capabilitiesTitle')}>{capabilitiesTitle}</h2>
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

        {/* ── USE CASES ──────────────────────────────────────────────── */}
        <SectionMotion motion={useCasesMotion} as="section" className="py-28" style={{ background: bgSecondary }}>
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn>
              <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'useCasesLabel')}>{useCasesLabel}</p>
              <h2 className="max-w-xl text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'useCasesTitle')}>{useCasesTitle}</h2>
            </FadeIn>
            <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
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

        {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
        <SectionMotion motion={howItWorksMotion} as="section" id="how-it-works" className="py-28">
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn className="text-center">
              <p className="gama-label mb-3 text-xs font-bold tracking-[0.2em] uppercase" data-tina-field={tinaField(page, 'howItWorksLabel')}>{howItWorksLabel}</p>
              <h2 className="text-4xl font-bold md:text-5xl" data-tina-field={tinaField(page, 'howItWorksTitle')}>{howItWorksTitle}</h2>
            </FadeIn>
            <div className="relative mt-20">
              <div className="absolute top-8 left-[18%] right-[18%] hidden h-px md:block"
                style={{ background: `linear-gradient(to right, transparent, ${primaryColor}4D, transparent)` }} />
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {howItWorks?.map((step: any, i: number) => (
                  <SlideFromBottom key={i} delay={i * 0.15}>
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
          </div>
        </SectionMotion>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <SectionMotion motion={cta?.motion} as="section" className="py-28" style={{ background: bgSecondary }}>
          <div className="container mx-auto px-6 md:px-16">
            <FadeIn>
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
                    <Link href={cta?.secondaryBtn?.href ?? '/contact'} data-tina-field={tinaField(cta?.secondaryBtn, 'text')} className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-10 font-semibold text-white transition hover:border-white/40">
                      {cta?.secondaryBtn?.text}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </SectionMotion>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="relative w-full py-16 text-white" style={{ background: bgFooter, fontFamily: `'${fontFamily}', sans-serif` }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
          <div>
            <h2 className="text-2xl leading-tight font-bold sm:text-3xl md:text-4xl" data-tina-field={tinaField(ftr, 'ctaHeadline')}>{ftr?.ctaHeadline}</h2>
            <p className="mt-6 text-sm font-normal sm:text-base" data-tina-field={tinaField(ftr, 'ctaDescription')}>{ftr?.ctaDescription}</p>
          </div>
          <div>
            <h3 className="text-base font-medium sm:text-lg">Company</h3>
            <div className="mt-4 flex flex-col gap-2">
              {ftr?.navLinks?.map((link: any, i: number) => (
                <Link key={i} href={link.href} className="text-sm font-normal hover:underline sm:text-base" data-tina-field={tinaField(link, 'title')}>{link.title}</Link>
              ))}
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
            {ftr?.legalLinks?.map((link: any, i: number) => (
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
