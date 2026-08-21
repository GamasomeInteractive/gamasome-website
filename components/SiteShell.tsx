'use client'
import { usePathname } from 'next/navigation'
import TinaHeader from './TinaHeader'
import TinaFooter from './TinaFooter'
import StickyDemoCTA from './StickyDemoCTA'

type Props = {
  children: React.ReactNode
  headerData: any
  headerQuery: string
  headerVars: object
  footerData: any
  footerQuery: string
  footerVars: object
  bareSlugs?: string[]
  homePageIsBare?: boolean
}

export default function SiteShell({
  children,
  headerData,
  headerQuery,
  headerVars,
  footerData,
  footerQuery,
  footerVars,
  bareSlugs = [],
  homePageIsBare = false,
}: Props) {
  const pathname = usePathname() ?? ''

  // Strip trailing slash for matching
  const normalized = pathname.replace(/\/$/, '') || '/'

  // Bare pages render their own header/footer (AIPlatformView template).
  // Skip the global SiteShell header/footer for them to avoid duplicates.
  const isBareSlug = bareSlugs.some((slug) => normalized === `/services/${slug}`)
  const isBareHome = homePageIsBare && normalized === '/'

  const isAdmin =
    normalized.startsWith('/studio') ||
    normalized.startsWith('/admin') ||
    normalized.startsWith('/tina') ||
    normalized.startsWith('/version-history') ||
    normalized.startsWith('/theme-picker') ||
    normalized.startsWith('/template-picker')

  // Sticky "Book a demo" tab shows on every visitor-facing page except blogs
  // (and the contact page itself, since the tab already links there).
  const isBlog = normalized === '/blog' || normalized.startsWith('/blog/')
  const isContact = normalized === '/contact'
  const showDemoCta = !isAdmin && !isBlog && !isContact

  if (isAdmin || isBareSlug || isBareHome) {
    return (
      <>
        {children}
        {showDemoCta && <StickyDemoCTA />}
      </>
    )
  }

  return (
    <>
      <TinaHeader headerData={headerData} headerQuery={headerQuery} headerVars={headerVars} />
      <main className="mb-auto">{children}</main>
      <TinaFooter footerData={footerData} footerQuery={footerQuery} footerVars={footerVars} />
      {showDemoCta && <StickyDemoCTA />}
    </>
  )
}
