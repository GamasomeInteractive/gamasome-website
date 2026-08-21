import Link from './Link'
import SocialIcon from '@/components/social-icons'
import Image from 'next/image'
import footerRaw from '../content/navigation/footer.json'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  // The JSON's inferred type only covers the keys currently present; ctaHeadline and
  // ctaDescription are declared in the Tina schema but not yet filled in.
  const footerData = footerRaw as typeof footerRaw & {
    ctaHeadline?: string
    ctaDescription?: string
  }
  const {
    ctaHeadline,
    ctaDescription,
    offices,
    social,
    legalLinks,
    copyrightName,
    newsletterEnabled,
  } = footerData

  return (
    <footer className="relative w-full bg-[#333333] py-16 font-['Poppins'] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* CTA column */}
        <div>
          {ctaHeadline && (
            <h2 className="font-['Poppins'] text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
              {ctaHeadline}
            </h2>
          )}
          {ctaDescription && (
            <p className="mt-6 max-w-full font-['Poppins'] text-sm font-normal sm:text-base">
              {ctaDescription}
            </p>
          )}
        </div>

        {/* Nav links column */}
        <div>
          <h3 className="font-['Poppins'] text-base font-medium sm:text-lg">Company</h3>
          <div className="mt-4 flex flex-col gap-2">
            {(footerData as any).navLinks?.map((link: { title: string; href: string }) => (
              <Link
                key={link.title}
                href={link.href}
                className="font-['Poppins'] text-sm font-normal hover:underline sm:text-base"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter column */}
        {newsletterEnabled && (
          <div>
            <h3 className="font-['Poppins'] text-base font-semibold sm:text-lg">
              Subscribe to Newsletter
            </h3>
            <NewsletterForm />
          </div>
        )}

        {/* Offices column */}
        <div>
          {offices.map((office, i) => (
            <div key={i} className={i > 0 ? 'mt-8' : ''}>
              {office.flagImage && (
                <Image
                  width={80}
                  height={40}
                  src={office.flagImage}
                  alt={`${office.country} Flag`}
                  className="mb-3 h-10 w-20"
                />
              )}
              <h3 className="font-['Poppins'] text-base font-normal sm:text-lg">{office.city}</h3>
              <p className="mt-4 max-w-full font-['Poppins'] text-sm font-normal sm:text-base">
                {office.address}
              </p>
              <p className="mt-4 font-['Poppins'] text-sm font-normal sm:text-base">
                <a href={`mailto:${office.email}`} className="font-['Poppins']">
                  {office.email}
                </a>
                <br />
                {office.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center font-['Poppins'] text-sm font-normal text-white underline">
          {legalLinks.map((link, i) => (
            <span key={link.href}>
              {i > 0 && ' | '}
              <Link href={link.href} className="font-['Poppins']">
                {link.title}
              </Link>
            </span>
          ))}{' '}
          | © {copyrightName} | {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="font-['Poppins'] text-sm font-medium capitalize sm:text-base">
            Follow us:
          </span>
          <div className="flex gap-2">
            {social.twitter && <SocialIcon kind="x" href={social.twitter} size={5} />}
            {social.linkedin && <SocialIcon kind="linkedin" href={social.linkedin} size={5} />}
            {social.facebook && <SocialIcon kind="facebook" href={social.facebook} size={5} />}
            {social.youtube && <SocialIcon kind="youtube" href={social.youtube} size={5} />}
          </div>
        </div>
      </div>
    </footer>
  )
}
