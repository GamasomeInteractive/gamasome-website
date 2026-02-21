'use client'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'
import {
  FadeIn,
  SlideFromLeft,
  SlideFromRight,
  SlideFromBottom,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

export default function AISolutions() {
  const pageTitle = `${siteMetadata.title} - AI Solutions`
  const pageDescription =
    siteMetadata.description ||
    'We help you teleport to the future of Reality with cutting-edge metaverse solutions.'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteMetadata.title} />
        {siteMetadata.socialBanner && (
          <meta
            property="og:image"
            content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {siteMetadata.twitter && <meta name="twitter:site" content={siteMetadata.twitter} />}
        {siteMetadata.socialBanner && (
          <meta
            name="twitter:image"
            content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`}
          />
        )}
      </Head>
      <div className="relative w-full bg-white font-['Poppins']">
        {/* Banner Section */}
        <section id="home" className="relative h-screen w-full bg-[#07091B]">
          <div className="absolute inset-0 z-0 bg-[#000B71]" />
          <div className="absolute inset-0 z-10">
            <Image
              src="/static/images/home-banner.png"
              alt="Banner Background"
              fill
              className="object-cover"
              priority
              onError={() => console.error('Failed to load banner image')}
            />
          </div>
          <div className="absolute inset-0 z-20 bg-black/36" />
          <div
            className="absolute inset-0 z-30"
            style={{
              background: 'linear-gradient(90deg, #000000 -13.44%, rgba(0, 0, 0, 0) 60.53%)',
            }}
          />
          <SlideFromLeft
            className="absolute top-1/2 left-4 z-40 max-w-[936px] -translate-y-1/2 p-0 sm:left-8 md:left-16 lg:left-40"
            distance={100}
          >
            <h1 className="font-['Poppins'] text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl">
              Add intelligence to your Business
            </h1>
            <p className="mt-4 font-['Poppins'] text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl">
              The Best AI development company in India
            </p>
            <SlideFromBottom delay={0.4} distance={40}>
              <Link
                href="#ai-solutions"
                className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[332px] sm:text-2xl"
              >
                Explore our Services
              </Link>
            </SlideFromBottom>
          </SlideFromLeft>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* AI Solutions Section */}
        <section id="ai-solutions" className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl">
                Gamasome's AI Services
              </h2>
            </FadeIn>
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
              {[
                {
                  title: 'Computer Vision & Deep Learning',
                  description:
                    'Elevate your business by incorporating Deep learning and computer vision. Develop and run AI-powered apps and services using our platform.',
                  imgSrc: '/static/images/computer-vision.png',
                  bg: '#FFFCFA',
                  direction: 'left' as const,
                },
                {
                  title: 'Exploratory Analysis & Prediction Algo',
                  description:
                    'Get comprehensive insights into your business data and discover risks, dangers, and user habits, to manage your business effectively.',
                  imgSrc: '/static/images/prediction.png',
                  bg: '#F5FEFF',
                  direction: 'right' as const,
                },
                {
                  title: 'Natural Language Processing',
                  description:
                    'Reach out to customers and develop products and interfaces in multiple languages using our NLP services.',
                  imgSrc: '/static/images/natural-lang.png',
                  bg: '#FFFCFA',
                  direction: 'left' as const,
                },
                {
                  title: 'Data modelling',
                  description:
                    'Analyze your business data and gather requirements to better understand your business process. Create a database to securely store your business data using our platform.',
                  imgSrc: '/static/images/data-model.png',
                  bg: '#F5FEFF',
                  direction: 'right' as const,
                },
              ].map((service) =>
                service.direction === 'left' ? (
                  <SlideFromLeft
                    key={service.title}
                    className={`bg-[${service.bg}] flex flex-col gap-6 rounded-lg px-6 py-8 sm:flex-row`}
                  >
                    <div className="sm:w-1/2">
                      <Image
                        src={service.imgSrc}
                        alt={service.title}
                        width={492}
                        height={282}
                        className="h-auto w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-center sm:w-1/2">
                      <h3 className="mb-4 font-['Poppins'] text-2xl font-semibold text-gray-800">
                        {service.title}
                      </h3>
                      <p className="mb-6 font-['Poppins'] text-gray-600">{service.description}</p>
                      <Link
                        href="#services"
                        className="h-[50px] w-full rounded-full border border-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB] hover:text-white sm:w-[192px] sm:text-lg"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </SlideFromLeft>
                ) : (
                  <SlideFromRight
                    key={service.title}
                    className={`bg-[${service.bg}] flex flex-col gap-6 rounded-lg px-6 py-8 sm:flex-row`}
                  >
                    <div className="sm:w-1/2">
                      <Image
                        src={service.imgSrc}
                        alt={service.title}
                        width={492}
                        height={282}
                        className="h-auto w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-center sm:w-1/2">
                      <h3 className="mb-4 font-['Poppins'] text-2xl font-semibold text-gray-800">
                        {service.title}
                      </h3>
                      <p className="mb-6 font-['Poppins'] text-gray-600">{service.description}</p>
                      <Link
                        href="#services"
                        className="h-[50px] w-full rounded-full border border-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB] hover:text-white sm:w-[192px] sm:text-lg"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </SlideFromRight>
                )
              )}
            </div>
          </div>
        </section>

        {/* Recent Works Section */}
        <section
          id="recentworks"
          className="relative flex w-full flex-col items-center bg-[#F1FAFF] py-16"
        >
          <FadeIn>
            <h2 className="text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl">
              Our Recent Works
            </h2>
          </FadeIn>
          <StaggerContainer className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'CV converged with IoT for Renal',
                imgSrc: '/static/images/renal.png',
                href: '#renal',
              },
              {
                title: 'Recommendation Engine for MyAutoIQ',
                imgSrc: '/static/images/myauto.png',
                href: '#myauto',
              },
              {
                title: 'Auto customer profiling for SalesIQ',
                imgSrc: '/static/images/salesiq.png',
                href: '#salesiq',
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="relative mx-auto flex w-full max-w-[400px] flex-col overflow-hidden rounded-[4px] bg-[#FCFCFC]"
              >
                <Link href={item.href} aria-label={`Link to ${item.title}`}>
                  <Image
                    alt={item.title}
                    src={item.imgSrc}
                    className="h-[300px] w-full rounded-t-[4px] object-cover object-center"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </Link>
                <h3 className="py-4 text-center font-['Poppins'] text-xl text-black sm:text-2xl">
                  <Link
                    href={item.href}
                    aria-label={`Link to ${item.title}`}
                    className="font-['Poppins']"
                  >
                    {item.title}
                  </Link>
                </h3>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* G-Space Section */}
        <section id="g-space" className="relative w-full bg-white py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row">
            <SlideFromLeft className="flex-1" distance={80}>
              <h2 className="font-['Poppins'] text-3xl leading-tight font-semibold text-black uppercase sm:text-4xl md:text-5xl">
                Introducing our Mobile Phone based Spatial AI Technology G-Space
              </h2>
              <p className="mt-8 font-['Poppins'] text-xl leading-relaxed font-normal text-black sm:text-2xl md:text-3xl">
                With your cell phone, you can now scan and transform real-time things into 3D models
                for any platform, with no complicated processing power required.
              </p>
              <p className="mt-6 max-w-[795px] font-['Poppins'] text-base font-normal text-[#767E7E] sm:text-lg">
                With our G-Space Spatial AI, you can scan any realtime items around you with your
                smartphone and visualise them in a 3D simulator. You can scan a piece of furniture
                from a store to see how it would look in your room before purchasing it, or you can
                scan a design and try to incorporate it into your design plan while building a
                structure. The possibilities are endless, so dive into our platform to widen your
                company's horizons.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="#metaverse"
                  className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </SlideFromLeft>
            <SlideFromRight className="aspect-video w-full md:w-[601px]" delay={0.2} distance={80}>
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/YdX2GvanxeI"
                title="Gamasome XR Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </SlideFromRight>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="relative w-full bg-[#2D9CDB] py-16">
          <FadeIn>
            <h2 className="text-center font-['Poppins'] text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
              Technologies We Work With
            </h2>
          </FadeIn>
          <StaggerContainer
            className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-5"
            staggerDelay={0.1}
          >
            {[
              '/static/images/android-white.png',
              '/static/images/mysql-white.png',
              '/static/images/conda-techstack.png',
              '/static/images/node-t-white.png',
              '/static/images/ios-white.png',
              '/static/images/python-techstack-1.png',
              '/static/images/laravel-white.png',
              '/static/images/unity.png',
              '/static/images/mediapipe-techstack-1.png',
              '/static/images/unreal-engine.png',
              '/static/images/mongo-white.png',
              '/static/images/webgl.png',
            ].map((imgSrc, index) => (
              <StaggerItem
                key={index}
                className="flex h-[133px] w-full items-center justify-center border border-[#00FCE2]"
              >
                <Image
                  src={imgSrc}
                  alt={`Technology ${index + 1}`}
                  width={132}
                  height={112}
                  className="object-cover"
                  loading="lazy"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <SlideFromBottom className="mx-auto mt-12 max-w-[875px] rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center">
            <h3 className="font-['Poppins'] text-xl font-bold text-white sm:text-2xl">
              Do You Want to Build Your Own Legacy Metaverses?
            </h3>
            <p className="mt-2 font-['Poppins'] text-base font-normal text-white/60">
              Yes, we can help you build your own metaverse.
            </p>
            <h4 className="mt-4 font-['Poppins'] text-lg font-semibold text-white">
              Talk to our expert
            </h4>
          </SlideFromBottom>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="relative w-full bg-white py-16 font-['Poppins']">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <SlideFromLeft className="md:col-span-1">
                <h2 className="font-['Poppins'] text-3xl leading-[190%] font-semibold tracking-[0.02em] text-black uppercase sm:text-4xl">
                  Blogs
                </h2>
                <p className="mt-12 max-w-full font-['Poppins'] text-base leading-[27px] font-normal tracking-[0.02em] text-black sm:max-w-[440px] sm:text-lg">
                  Everyone has a story to tell. Here is ours. Learn more about metaverse development
                  company. Learn more about Gamasome.
                </p>
              </SlideFromLeft>

              <StaggerContainer className="flex flex-col gap-8 md:col-span-2" staggerDelay={0.15}>
                {[
                  {
                    title: 'The Metaverse is coming! What does it mean for your business?',
                    href: '#blog1',
                  },
                  { title: 'How AI is transforming business operations', href: '#blog2' },
                  { title: 'Spatial AI: The future of 3D modeling', href: '#blog3' },
                ].map((item) => (
                  <StaggerItem key={item.title} className="relative flex max-w-[741px] flex-col">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="inline-block rounded-full bg-[#2D9CDB] px-4 py-1">
                          <span className="font-['Poppins'] text-base font-normal tracking-[0.02em] text-white">
                            Latest
                          </span>
                        </div>
                        <h3 className="mt-4 max-w-[564px] font-['Poppins'] text-xl leading-[42px] font-medium tracking-[0.02em] text-black sm:text-2xl md:text-[28px]">
                          <Link href={item.href} className="font-['Poppins']">
                            {item.title}
                          </Link>
                        </h3>
                      </div>
                      <Link
                        href={item.href}
                        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2D9CDB]"
                      >
                        <svg
                          width="16"
                          height="23"
                          viewBox="0 0 16 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rotate-90"
                        >
                          <path
                            d="M2 20.5L13.5 11.5L2 2.5"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className="relative mt-4">
                      <div className="h-px w-full bg-[#767E7E]/40"></div>
                      <div className="absolute top-0 left-0 h-px w-[130.52px] bg-[#AEB1B1]"></div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
