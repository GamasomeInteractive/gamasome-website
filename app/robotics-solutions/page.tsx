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

export default function RoboticsSolutions() {
  const pageTitle = `${siteMetadata.title} - Robotics Solutions`
  const pageDescription =
    'Expert robotics development services including AMR navigation, simulation, fleet management, and vision AI. End-to-end solutions for enterprise robotics.'

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
              src="/static/images/ai-banner.png"
              alt="Robotics Solutions Banner"
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
              Intelligent Robotics Solutions for Modern Enterprises
            </h1>
            <p className="mt-4 font-['Poppins'] text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl">
              End-to-end robotics development, simulation, and deployment services
            </p>
            <SlideFromBottom delay={0.4} distance={40}>
              <Link
                href="#robotics-services"
                className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[400px] sm:text-2xl"
              >
                Explore Our Robotics Services
              </Link>
            </SlideFromBottom>
          </SlideFromLeft>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* Robotics Services Section */}
        <section id="robotics-services" className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl">
                Our Robotics Solutions
              </h2>
            </FadeIn>
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
              {[
                {
                  title: 'Autonomous Mobile Robot Navigation',
                  description:
                    'Build advanced vision-based navigation stacks for Autonomous Mobile Robots (AMR). We develop complete perception, mapping, planning, and control systems that enable robots to navigate complex environments safely and efficiently. Our solutions integrate computer vision, SLAM, and path planning algorithms optimized for industrial and commercial applications.',
                  imgSrc: '/static/images/robotics-amr.jpg',
                  bg: '#FFFCFA',
                  direction: 'left' as const,
                },
                {
                  title: 'Physics-Based Simulation & Digital Twins',
                  description:
                    'Create photo-realistic simulation environments in Isaac Sim and Unreal Engine for robot testing and validation. We develop physics-optimized digital twins that accurately replicate real-world scenarios, enabling comprehensive testing before deployment. Generate high-quality synthetic data for model training and reduce physical testing costs significantly.',
                  imgSrc: '/static/images/robotics-simulation.jpg',
                  bg: '#F5FEFF',
                  direction: 'right' as const,
                },
                {
                  title: 'Fleet Management & Mission Control',
                  description:
                    'Develop integrated mission control systems to monitor, control, and manage your robot fleet in real-time. Our solutions provide centralized dashboards, remote teleoperation capabilities, fleet coordination, and performance analytics. Built with WebRTC for low-latency communication and designed for scalability across multiple deployment sites.',
                  imgSrc: '/static/images/robotics-fleet.jpg',
                  bg: '#FFFCFA',
                  direction: 'left' as const,
                },
                {
                  title: 'AI-Powered Object Recognition & Volume Estimation',
                  description:
                    'Build custom Vision Language Models (VLMs) that enable robots to identify, classify, and estimate volumes of objects in dynamic environments. Perfect for applications in agriculture, warehousing, and logistics where real-time object understanding is critical for autonomous decision-making.',
                  imgSrc: '/static/images/robotics-vision.jpg',
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
                        href="/contact"
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
                        href="/contact"
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

        {/* Engagement Models Section */}
        <section id="engagement" className="relative w-full bg-[#F1FAFF] py-16">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="mb-12 text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl">
                How We Work
              </h2>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Retainer-Based',
                  description:
                    'Dedicated teams on a monthly retainer for ongoing robotics projects.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#2D9CDB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Managed Service',
                  description: 'End-to-end project ownership with defined SLAs and deliverables.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#2D9CDB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Time & Material',
                  description: 'Flexible engagement based on effort and resources utilized.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#2D9CDB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Fixed Project',
                  description: 'Well-scoped projects with defined timelines and fixed pricing.',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#2D9CDB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  ),
                },
              ].map((model, index) => (
                <SlideFromBottom key={model.title} delay={index * 0.15} distance={60}>
                  <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                    <div className="mb-4">{model.icon}</div>
                    <h3 className="mb-3 font-['Poppins'] text-xl font-semibold text-[#001930]">
                      {model.title}
                    </h3>
                    <p className="font-['Poppins'] text-base text-[#767E7E]">{model.description}</p>
                  </div>
                </SlideFromBottom>
              ))}
            </div>
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
              '/static/images/python-techstack-1.png',
              '/static/images/conda-techstack.png',
              '/static/images/mediapipe-techstack-1.png',
              '/static/images/unity.png',
              '/static/images/unreal-engine.png',
              '/static/images/node-t-white.png',
              '/static/images/android-white.png',
              '/static/images/mongo-white.png',
              '/static/images/mysql-white.png',
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
              Ready to Build Intelligent Robotics Solutions?
            </h3>
            <p className="mt-2 font-['Poppins'] text-base font-normal text-white/60">
              Let us help you develop, simulate, and deploy your robotics systems.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block h-[50px] w-full rounded-full border border-white text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-white hover:text-[#2D9CDB] sm:w-[192px] sm:text-lg"
            >
              Talk to our expert
            </Link>
          </SlideFromBottom>
        </section>
      </div>
    </>
  )
}
