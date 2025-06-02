'use client'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import MenuIcon from '@/data/menu-icon.svg'
import Link from 'next/link'
// import Link from './Link'
// import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  let headerClass =
    'flex items-center justify-between w-full max-w-none px-4 sm:px-10 md:px-24 bg-transparent py-10 fixed top-0 left-0 right-0 z-50 transition-all duration-300'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky-nav'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="ml-0 flex items-center transition-transform duration-300 hover:scale-105">
          <div className="h-[56px] w-full max-w-[268px]">
            <Logo />
          </div>
        </div>
      </Link>
      <div className="mr-0 flex items-center space-x-4">
        {/* <ThemeSwitch /> */}
        <button
          className="flex items-center transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>
      {isMenuOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 h-full w-full bg-[#07091B] font-['Poppins']">
          <div className="absolute inset-0 bg-[#000B71]" />
          <div className="absolute inset-0 bg-black/36" />
          <div className="absolute inset-0 bg-[#000000]/90" />
          <div className="relative flex h-full flex-col items-center justify-center">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white transition-colors duration-300 hover:text-gray-300 sm:top-10 sm:right-10"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="flex flex-col space-y-6">
              {headerNavLinks.map((link, index) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="nav-item font-['Poppins'] text-xl font-semibold text-white sm:text-2xl md:text-3xl"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .nav-item {
          animation: slideIn 0.4s ease-out forwards;
          animation-delay: calc(0.1s * var(--index));
          opacity: 0;
        }
      `}</style>
    </header>
  )
}

export default Header
