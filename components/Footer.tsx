import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#333333] py-16 font-['Poppins'] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
        <div>
          <h2 className="font-['Poppins'] text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            Interested? Let’s Talk!
          </h2>
          <p className="mt-6 max-w-full font-['Poppins'] text-sm font-normal sm:text-base">
            {siteMetadata.description ||
              'Your company is a top-notch deep tech development firm converging technologies like Blockchain, AI, AR/VR solutions for enterprises.'}
          </p>
        </div>
        <div>
          <h3 className="font-['Poppins'] text-base font-medium sm:text-lg">Company</h3>
          <div className="mt-4 flex flex-col gap-2">
            {headerNavLinks.map((link) => (
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
        <div>
          <h3 className="font-['Poppins'] text-base font-semibold sm:text-lg">
            Subscribe to Newsletter
          </h3>
          <form className="mt-4 flex h-20 w-full items-center justify-between rounded-lg border border-white/20 px-4 sm:max-w-[318px]">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-transparent font-['Poppins'] text-sm font-normal text-white outline-none"
            />
            <button type="submit" className="h-6 w-6">
              <Image
                width={100}
                height={100}
                src="/static/images/send.png"
                alt="Send"
                className="h-full w-full object-contain"
              />
            </button>
          </form>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div>
              <Image
                width={80}
                height={40}
                src="/static/images/usa.png"
                alt="USA Flag"
                className="mb-3 h-10 w-20"
              />
              <h3 className="font-['Poppins'] text-base font-normal sm:text-lg">USA Office</h3>
              <p className="mt-4 max-w-full font-['Poppins'] text-sm font-normal sm:text-base">
                599 Fairchild Dr, Mountain View, CA 94043
              </p>
              <p className="mt-4 font-['Poppins'] text-sm font-normal sm:text-base">
                <a href="mailto:prasanna@gamasome.com" className="font-['Poppins']">
                  prasanna@gamasome.com
                </a>
                <br />
                +1 (530) 364-8775
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div>
              <Image
                width={100}
                height={100}
                src="/static/images/india.png"
                alt="India Flag"
                className="mb-3 h-10 w-20"
              />
              <h3 className="font-['Poppins'] text-base font-normal sm:text-lg">India Office</h3>
              <p className="mt-4 max-w-full font-['Poppins'] text-sm font-normal sm:text-base">
                No.1794, 36/3, 27th Main Rd, near Power Station, 2nd Sector, ITI Layout, 7th Sector,
                HSR Layout, Bengaluru, Karnataka 560102, India
              </p>
              <p className="mt-4 font-['Poppins'] text-sm font-normal sm:text-base">
                <a href="mailto:prasanna@gamasome.com" className="font-['Poppins']">
                  prasanna@gamasome.com
                </a>
                <br />
                +91 8012223541
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center font-['Poppins'] text-sm font-normal text-white underline">
          <Link href="/terms" className="font-['Poppins']">
            Terms & Conditions
          </Link>{' '}
          |{' '}
          <Link href="/privacy" className="font-['Poppins']">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/refunds" className="font-['Poppins']">
            Refunds & Cancellations
          </Link>{' '}
          | © {siteMetadata.author || 'Your Company'} | {new Date().getFullYear()}. All Rights
          Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="font-['Poppins'] text-sm font-medium capitalize sm:text-base">
            Follow us:
          </span>
          <div className="flex gap-2">
            <SocialIcon kind="twitter" href={siteMetadata.twitter || '#'} size={5} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin || '#'} size={5} />
            <SocialIcon kind="facebook" href={siteMetadata.facebook || '#'} size={5} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube || '#'} size={5} />
          </div>
        </div>
      </div>
    </footer>
  )
}
