'use client'
import { usePathname } from 'next/navigation'
import TinaHeader from './TinaHeader'
import TinaFooter from './TinaFooter'

type Props = {
  children: React.ReactNode
  headerData: any;  headerQuery: string;  headerVars: object
  footerData: any;  footerQuery: string;  footerVars: object
  bareSlugs?: string[]
  homePageIsBare?: boolean
}

export default function SiteShell({
  children,
  headerData, headerQuery, headerVars,
  footerData, footerQuery, footerVars,
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

  if (isAdmin || isBareSlug || isBareHome) {
    return <>{children}</>
  }

  return (
    <>
      <TinaHeader headerData={headerData} headerQuery={headerQuery} headerVars={headerVars} />
      <main className="mb-auto">{children}</main>
      <TinaFooter footerData={footerData} footerQuery={footerQuery} footerVars={footerVars} />
    </>
  )
}
