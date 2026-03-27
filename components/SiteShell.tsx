'use client'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin =
    pathname?.startsWith('/studio') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/tina')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </>
  )
}
