'use client'
import { usePathname } from 'next/navigation'
import TinaHeader from './TinaHeader'
import TinaFooter from './TinaFooter'

type Props = {
  children: React.ReactNode
  headerData: any;  headerQuery: string;  headerVars: object
  footerData: any;  footerQuery: string;  footerVars: object
}

export default function SiteShell({ children, headerData, headerQuery, headerVars, footerData, footerQuery, footerVars }: Props) {
  const pathname = usePathname()

  const isAdmin =
    pathname === '/ai-platform' || pathname === '/ai-platform/' ||
    pathname?.startsWith('/studio') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/tina') ||
    pathname?.startsWith('/version-history') ||
    pathname?.startsWith('/theme-picker') ||
    pathname?.startsWith('/template-picker')

  if (isAdmin) {
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
