'use client'
import { useState } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Link from './Link'
import Image from 'next/image'
import SocialIcon from '@/components/social-icons'

type Props = {
  footerData: any
  footerQuery: string
  footerVars: object
}

export default function TinaFooter({ footerData, footerQuery, footerVars }: Props) {
  const { data: rawData } = useTina({ data: footerData, query: footerQuery, variables: footerVars })
  const data = normalizeTinaImages(rawData)
  const ftr = data.footer

  // Which footer nav item has its sub-link dropdown expanded. Defaults to the first
  // item that has sub-links, so the dropdown starts open.
  const visibleNav = (ftr?.navLinks ?? []).filter((l: any) => !l?.hidden)
  const defaultOpenNav = visibleNav.findIndex((l: any) =>
    (l?.subLinks ?? []).some((s: any) => s?.title && s?.href),
  )
  const [openNav, setOpenNav] = useState<number | null>(
    defaultOpenNav >= 0 ? defaultOpenNav : null,
  )

  // The CTA column only renders when it has content, so the grid width adapts to
  // however many columns are actually visible (CTA + Company + Newsletter + Offices).
  const hasCta = Boolean(ftr?.ctaHeadline || ftr?.ctaDescription)
  const visibleCols = 2 + (hasCta ? 1 : 0) + (ftr?.newsletterEnabled ? 1 : 0)
  const gridColsClass =
    ({ 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as const)[visibleCols] ??
    'md:grid-cols-4'

  return (
    <footer className="relative w-full bg-[#333333] py-16 font-['Poppins'] text-white">
      <div className={`mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 ${gridColsClass}`}>
        {/* CTA column */}
        {hasCta && (
          <div>
            <h2 className="font-['Poppins'] text-2xl leading-tight font-bold sm:text-3xl md:text-4xl" data-tina-field={tinaField(ftr, 'ctaHeadline')}>
              {ftr?.ctaHeadline}
            </h2>
            <p className="mt-6 max-w-full font-['Poppins'] text-sm font-normal sm:text-base" data-tina-field={tinaField(ftr, 'ctaDescription')}>
              {ftr?.ctaDescription}
            </p>
          </div>
        )}

        {/* Nav links column */}
        <div>
          <h3 className="font-['Poppins'] text-base font-medium sm:text-lg">Company</h3>
          <div className="mt-4 flex flex-col gap-2">
            {ftr?.navLinks?.filter((l: any) => !l?.hidden).map((link: any, i: number) => {
              const subLinks = (link?.subLinks ?? []).filter((s: any) => s?.title && s?.href)
              const isOpen = openNav === i

              if (subLinks.length === 0) {
                return (
                  <Link key={i} href={link.href} className="font-['Poppins'] text-sm font-normal hover:underline sm:text-base" data-tina-field={tinaField(link, 'title')}>
                    {link.title}
                  </Link>
                )
              }

              return (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Link href={link.href} className="font-['Poppins'] text-sm font-normal hover:underline sm:text-base" data-tina-field={tinaField(link, 'title')}>
                      {link.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenNav(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${link.title} links`}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      <svg className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  {/* Sub-links stay in the DOM (crawlable) but collapse visually when closed. */}
                  <div className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-2 border-l border-white/20 pl-3`}>
                    {subLinks.map((sub: any, j: number) => (
                      <Link key={j} href={sub.href} className="font-['Poppins'] text-sm font-normal text-white/70 hover:text-white hover:underline sm:text-base" data-tina-field={tinaField(sub, 'title')}>
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Newsletter column */}
        {ftr?.newsletterEnabled && (
          <div>
            <h3 className="font-['Poppins'] text-base font-semibold sm:text-lg">Subscribe to Newsletter</h3>
            <form className="mt-4 flex h-20 w-full items-center justify-between rounded-lg border border-white/20 px-4 sm:max-w-[318px]">
              <input type="email" placeholder="Email Address" className="flex-1 bg-transparent font-['Poppins'] text-sm font-normal text-white outline-none" />
              <button type="submit" className="h-6 w-6">
                <Image width={100} height={100} src="/static/images/send.png" alt="Send" className="h-full w-full object-contain" />
              </button>
            </form>
          </div>
        )}

        {/* Offices column */}
        <div>
          {ftr?.offices?.map((office: any, i: number) => (
            <div key={i} className={i > 0 ? 'mt-8' : ''}>
              <div data-tina-field={tinaField(office, 'flagImage')} className="mb-3">
                {office.flagImage
                  ? <Image width={80} height={40} src={office.flagImage} alt={office.country || ''} className="h-10 w-20 object-contain" />
                  : <div className="flex h-10 w-20 items-center justify-center rounded border border-dashed border-white/20 text-xs text-white/30">+ Flag</div>
                }
              </div>
              <h3 className="font-['Poppins'] text-base font-normal sm:text-lg" data-tina-field={tinaField(office, 'city')}>{office.city}</h3>
              <p className="mt-4 max-w-full font-['Poppins'] text-sm font-normal sm:text-base" data-tina-field={tinaField(office, 'address')}>{office.address}</p>
              <p className="mt-4 font-['Poppins'] text-sm font-normal sm:text-base">
                <a href={`mailto:${office.email}`} data-tina-field={tinaField(office, 'email')}>{office.email}</a>
                <br />
                <span data-tina-field={tinaField(office, 'phone')}>{office.phone}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center font-['Poppins'] text-sm font-normal text-white underline">
          {ftr?.legalLinks?.filter((l: any) => !l?.hidden).map((link: any, i: number) => (
            <span key={link.href}>
              {i > 0 && ' | '}
              <Link href={link.href} className="font-['Poppins']" data-tina-field={tinaField(link, 'title')}>{link.title}</Link>
            </span>
          ))}{' '}
          | © <span data-tina-field={tinaField(ftr, 'copyrightName')}>{ftr?.copyrightName}</span> | {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="font-['Poppins'] text-sm font-medium capitalize sm:text-base">Follow us:</span>
          <div className="flex gap-2">
            {ftr?.social?.twitter  && <SocialIcon kind="x"        href={ftr.social.twitter}  size={5} />}
            {ftr?.social?.linkedin && <SocialIcon kind="linkedin"  href={ftr.social.linkedin} size={5} />}
            {ftr?.social?.facebook && <SocialIcon kind="facebook"  href={ftr.social.facebook} size={5} />}
            {ftr?.social?.youtube  && <SocialIcon kind="youtube"   href={ftr.social.youtube}  size={5} />}
          </div>
        </div>
      </div>
    </footer>
  )
}
