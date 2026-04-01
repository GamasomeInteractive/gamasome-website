'use client'
import { useState, useEffect } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/data/logo.svg'
import MenuIcon from '@/data/menu-icon.svg'

type Props = {
  headerData: any
  headerQuery: string
  headerVars: object
}

export default function TinaHeader({ headerData, headerQuery, headerVars }: Props) {
  const { data } = useTina({ data: headerData, query: headerQuery, variables: headerVars })
  const hdr = data.header

  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
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
        <button
          className="flex cursor-pointer items-center transition-transform duration-300 hover:scale-110"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>

      {menuOpen && (
        <div className="menu-fade-in fixed inset-0 z-50 h-full w-full bg-[#07091B] font-['Poppins']">
          <div className="absolute inset-0 bg-black/90" />
          <div className="relative flex h-full flex-col items-center justify-center">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 sm:top-10 sm:right-10"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-6">
              {hdr?.navLinks?.map((link: any, i: number) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="menu-nav-item font-['Poppins'] text-xl font-semibold text-white sm:text-2xl md:text-3xl"
                  data-tina-field={tinaField(link, 'title')}
                  style={{ '--index': i } as React.CSSProperties}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes menuFadeIn { from { opacity: 0 } to { opacity: 1 } }
        .menu-fade-in { animation: menuFadeIn 0.3s ease-in-out; }
        @keyframes menuSlideIn { from { transform: translateY(-20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .menu-nav-item { animation: menuSlideIn 0.4s ease-out forwards; animation-delay: calc(0.1s * var(--index)); opacity: 0; }
      `}</style>
    </header>
  )
}
