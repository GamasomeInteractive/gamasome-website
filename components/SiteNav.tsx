'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { tinaField } from 'tinacms/dist/react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/data/logo.svg'

type Props = {
  // Normalized `header` document from the Tina header query.
  hdr: any
}

const DEFAULT_CTA_LABEL = 'Book a Demo'
const DEFAULT_CTA_HREF = '/contact/'

// Dropdowns with many entries get a two-column panel.
const WIDE_PANEL_THRESHOLD = 9

function Chevron({ open, className = '' }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Horizontal site navigation: logo left, links with hover dropdowns in the
 * middle, CTA on the right. Collapses to a full-screen accordion below `lg`.
 * Shared by the global TinaHeader and the bare-page AIPlatformView header.
 */
export default function SiteNav({ hdr }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [openDesktop, setOpenDesktop] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobile, setOpenMobile] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Active-page matching: normalize trailing slashes so "/about/" === "/about".
  const pathname = usePathname() ?? '/'
  const normPath = (p: string) => (p || '/').replace(/\/+$/, '') || '/'
  const currentPath = normPath(pathname)
  const isActive = (href?: string) => Boolean(href) && normPath(href as string) === currentPath

  const links: any[] = (hdr?.navLinks ?? []).filter((l: any) => l?.title && !l?.hidden)
  const subLinksOf = (link: any): any[] =>
    (link?.subLinks ?? []).filter((s: any) => s?.title && s?.href)

  const ctaLabel = hdr?.ctaLabel || DEFAULT_CTA_LABEL
  const ctaHref = hdr?.ctaHref || DEFAULT_CTA_HREF

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setOpenDesktop(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) setOpenMobile(null)
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDesktop(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // A short delay lets the pointer cross the gap between trigger and panel.
  const openPanel = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDesktop(i)
  }
  const schedulePanelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenDesktop(null), 120)
  }

  const barBg =
    scrolled || mobileOpen
      ? 'bg-[#07091B]/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
      : 'bg-transparent border-b border-transparent'

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 w-full font-['Poppins'] transition-colors duration-300 ${barBg}`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" aria-label="Gamasome" className="shrink-0">
            <div
              className="flex h-10 w-[192px] items-center transition-transform duration-300 hover:scale-105"
              data-tina-field={tinaField(hdr, 'logoImage')}
            >
              {hdr?.logoImage ? (
                <Image
                  src={hdr.logoImage}
                  alt="Gamasome"
                  width={192}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              ) : (
                <Logo viewBox="0 0 269 56" className="h-full w-full" />
              )}
            </div>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1 xl:gap-3">
              {links.map((link, i) => {
                const subs = subLinksOf(link)
                const open = openDesktop === i
                const active = isActive(link.href) || subs.some((s) => isActive(s.href))
                const itemClass = `flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                  active ? 'text-[#00FCE2]' : 'text-white/85 hover:text-white'
                }`

                if (!subs.length) {
                  return (
                    <li key={i}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={itemClass}
                        data-tina-field={tinaField(link, 'title')}
                      >
                        {link.title}
                      </Link>
                    </li>
                  )
                }

                const wide = subs.length >= WIDE_PANEL_THRESHOLD
                return (
                  <li
                    key={i}
                    className="relative"
                    onMouseEnter={() => openPanel(i)}
                    onMouseLeave={schedulePanelClose}
                  >
                    <button
                      type="button"
                      className={itemClass}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenDesktop(open ? null : i)}
                      data-tina-field={tinaField(link, 'title')}
                    >
                      {link.title}
                      <Chevron open={open} />
                    </button>

                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                        open
                          ? 'visible translate-y-0 opacity-100'
                          : 'pointer-events-none invisible -translate-y-1 opacity-0'
                      }`}
                    >
                      <div
                        className={`rounded-2xl border border-white/10 bg-[#0B0F2A] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${
                          wide ? 'w-[580px]' : 'w-max max-w-[480px] min-w-[240px]'
                        }`}
                      >
                        <div
                          className={wide ? 'grid grid-cols-2 gap-x-2 gap-y-0.5' : 'flex flex-col gap-0.5'}
                        >
                          {subs.map((sub, j) => {
                            const subActive = isActive(sub.href)
                            return (
                              <Link
                                key={j}
                                href={sub.href}
                                onClick={() => setOpenDesktop(null)}
                                aria-current={subActive ? 'page' : undefined}
                                className={`rounded-lg px-3 py-2.5 text-sm leading-snug transition-colors ${
                                  subActive
                                    ? 'bg-white/5 text-[#00FCE2]'
                                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                                }`}
                                data-tina-field={tinaField(sub, 'title')}
                              >
                                {sub.title}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={ctaHref}
              className="hidden rounded-xl bg-[#00FCE2] px-5 py-2.5 text-[15px] font-semibold text-[#07091B] transition-all hover:bg-white hover:shadow-[0_0_24px_rgba(0,252,226,0.45)] sm:inline-flex"
              data-tina-field={tinaField(hdr, 'ctaLabel')}
            >
              {ctaLabel}
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <path d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="site-nav-fade fixed inset-x-0 top-20 bottom-0 z-[49] overflow-y-auto bg-[#07091B] px-4 pt-4 pb-10 font-['Poppins'] sm:px-8 lg:hidden">
          <nav aria-label="Main" className="flex flex-col">
            {links.map((link, i) => {
              const subs = subLinksOf(link)
              const open = openMobile === i
              const active = isActive(link.href) || subs.some((s) => isActive(s.href))
              const rowClass = `flex w-full items-center justify-between border-b border-white/10 py-4 text-lg font-semibold ${
                active ? 'text-[#00FCE2]' : 'text-white'
              }`

              if (!subs.length) {
                return (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={rowClass}
                    data-tina-field={tinaField(link, 'title')}
                  >
                    {link.title}
                  </Link>
                )
              }

              return (
                <div key={i}>
                  <button
                    type="button"
                    className={rowClass}
                    aria-expanded={open}
                    onClick={() => setOpenMobile(open ? null : i)}
                    data-tina-field={tinaField(link, 'title')}
                  >
                    {link.title}
                    <Chevron open={open} className="h-5 w-5 text-white/70" />
                  </button>
                  {open && (
                    <div className="flex flex-col gap-1 border-b border-white/10 py-3 pl-3">
                      {subs.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive(sub.href) ? 'page' : undefined}
                          className={`py-2 text-base ${isActive(sub.href) ? 'text-[#00FCE2]' : 'text-white/75'}`}
                          data-tina-field={tinaField(sub, 'title')}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#00FCE2] px-5 py-3.5 text-base font-semibold text-[#07091B]"
          >
            {ctaLabel}
          </Link>
        </div>
      )}

      <style jsx global>{`
        @keyframes siteNavFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .site-nav-fade {
          animation: siteNavFade 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
