import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import Image from 'next/image'

export const metadata: Metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative min-h-screen overflow-hidden bg-[#2D9CDB]">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full opacity-70"
          style={{
            // backgroundImage: 'url(/static/images/krakenimages-Y5bvRlcCx8k-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto flex min-h-screen items-center px-4 lg:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              {/* Breadcrumb Navigation */}
              <nav className="font-['Poppins'] text-xs font-normal opacity-80 sm:text-sm">
                HOME &gt; About
              </nav>

              {/* Main Title */}
              <h1 className="font-['Poppins'] text-3xl leading-tight font-semibold uppercase sm:text-4xl lg:text-5xl">
                A brief history
              </h1>

              {/* Main Content Text */}
              <div className="space-y-6 text-base leading-relaxed sm:text-lg">
                <p className="font-['Poppins']">
                  Incorporated in the Year 2014, Gamasome is driven by an appetite for apps and all
                  things innovation, we've assembled a team of design masters and development
                  whizzes. We produces next-generation digital/physical experiences for world-class
                  brands.
                </p>
                <p className="font-['Poppins']">
                  We use natural user interfaces, gesture and motion interactivity, innovative
                  display concepts, and breakthrough technology to create unforgettable moments of
                  connection between people and organisations. Our creative philosophy begins with a
                  deep respect for our clients brand and audience. Every idea, emotion, innovation,
                  and execution builds upon that foundation.
                </p>
                <p className="font-['Poppins']">
                  Our insistence on best-in-class creative and development processes and formalised
                  user testing ensures a 'no surprises' launch of projects and initiatives. We
                  believe the future belongs to those who create it.
                </p>
                <p className="font-['Poppins']">
                  The studio that has been developing VR/AR/XR simulations for businesses around the
                  world for over six years. We have created simulations for tech companies,
                  architects, and construction firms, gaining valuable experience in VR/AR/XR.
                </p>
              </div>
            </div>

            {/* Right Content - About Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Semi-transparent Overlay */}
                <div className="absolute inset-0 z-10 rounded-lg bg-[#0C0E21] opacity-40" />

                {/* About Image */}
                <Image
                  src="/static/images/about.png"
                  alt="About Gamasome"
                  width={600}
                  height={700}
                  className="relative z-20 h-auto w-full rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center font-['Poppins'] text-2xl font-bold text-black sm:text-3xl lg:mb-12 lg:text-4xl xl:text-5xl">
            Gamasome solutions for you business
          </h2>

          {/* Video Container */}
          <div className="flex justify-center">
            <div className="aspect-video w-full max-w-4xl">
              <iframe
                className="h-full w-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/ckrF37YZPVY?si=6pV3_JYR7a3EOPZp"
                title="Showreel Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cofounder Section */}
      <section className="w-full bg-[#F6F6F6] py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="mb-4 font-['Poppins'] text-3xl font-semibold text-black sm:text-4xl lg:mb-6 lg:text-5xl">
              Our Founders
            </h2>
            <p className="mx-auto max-w-4xl font-['Poppins'] text-lg leading-relaxed text-black sm:text-xl">
              We're a family born out of a passion to use new technology to turn dreams and ideas
              into reality.
            </p>
          </div>

          {/* Founders Container */}
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16 xl:gap-20">
            {/* Founder 1 - Mohan */}
            <div className="flex w-full flex-col items-center text-center sm:max-w-sm">
              {/* Mohan's Image */}
              <div className="mb-6 lg:mb-8">
                <Image
                  src="/static/images/mohan.png"
                  alt="Mohan Sivam"
                  width={280}
                  height={350}
                  className="h-80 w-64 rounded-3xl object-cover shadow-lg sm:h-90 sm:w-72 lg:h-96 lg:w-80"
                />
              </div>

              {/* Mohan's Name with LinkedIn */}
              <div className="mb-2 flex flex-col items-center gap-3 sm:flex-row">
                <h3 className="text-center font-['Poppins'] text-xl font-bold text-[#333333] sm:text-2xl lg:text-3xl">
                  MOHAN SIVAM
                </h3>

                {/* LinkedIn Icon */}
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-600 transition-colors hover:bg-blue-700">
                  <span className="font-['Poppins'] text-xs font-bold text-white">in</span>
                </div>
              </div>

              {/* Mohan's Title */}
              <p className="font-['Poppins'] text-base font-medium text-[#666666] sm:text-lg">
                FOUNDER & CEO
              </p>
            </div>

            {/* Founder 2 - Prasanna */}
            <div className="flex w-full flex-col items-center text-center sm:max-w-sm">
              {/* Prasanna's Image */}
              <div className="mb-6 lg:mb-8">
                <Image
                  src="/static/images/prasanna.png"
                  alt="Prasanna Venkatesan"
                  width={280}
                  height={350}
                  className="h-80 w-64 rounded-3xl object-cover shadow-lg sm:h-90 sm:w-72 lg:h-96 lg:w-80"
                />
              </div>

              {/* Prasanna's Name with LinkedIn */}
              <div className="mb-2 flex flex-col items-center gap-3 sm:flex-row">
                <h3 className="text-center font-['Poppins'] text-xl font-bold text-[#333333] sm:text-2xl lg:text-3xl">
                  PRASANNA VENKATESAN
                </h3>

                {/* LinkedIn Icon */}
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-600 transition-colors hover:bg-blue-700">
                  <span className="font-['Poppins'] text-xs font-bold text-white">in</span>
                </div>
              </div>

              {/* Prasanna's Title */}
              <p className="font-['Poppins'] text-base font-medium text-[#666666] sm:text-lg">
                CO-FOUNDER & COO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center lg:p-8">
            <h3 className="mb-2 font-['Poppins'] text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Ready to start a project?
            </h3>
            <p className="font-['Poppins'] text-base text-white/90 sm:text-lg">Get started</p>
          </div>
        </div>
      </section>
    </>
  )
}
