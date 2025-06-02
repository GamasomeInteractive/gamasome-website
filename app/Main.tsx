/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Card from '@/components/Card'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home({ posts }: { posts: any[] }) {
  const pageTitle = `${siteMetadata.title} - Metaverse Solutions`
  const pageDescription =
    siteMetadata.description ||
    'We help you teleport to the future of Reality with cutting-edge metaverse solutions.'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

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
        <section
          id="home"
          className="animate-fade-in animation-duration-300 relative h-screen w-full bg-[#07091B]"
          data-animate
        >
          <div className="absolute inset-0 z-0 bg-[#000B71]" />
          <div className="absolute inset-0 z-10">
            <Image
              src="/static/images/ai-banner.png"
              alt="Banner Background"
              fill
              className="object-cover"
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
          <div
            className="animate-slide-up animation-delay-200 absolute top-1/2 left-4 z-40 max-w-[936px] -translate-y-1/2 p-0 sm:left-8 md:left-16 lg:left-40"
            data-animate
          >
            <h1 className="font-['Poppins'] text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl">
              {siteMetadata.headerTitle || 'We help you teleport to the future of Reality'}
            </h1>
            <Link
              href="#metaverse"
              className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[332px] sm:text-2xl"
            >
              Enter Our Metaverse
            </Link>
          </div>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* Metaverse Section */}
        <section
          id="metaverse"
          className="relative flex w-full flex-col items-center bg-white py-16"
        >
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Want to capitalize in the Metaverse?
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'NFT Marketplace Development',
                imgSrc: '/static/images/nft-marketplace-development.png',
                href: '#nft-marketplace',
              },
              {
                title: 'Metaverse Development',
                imgSrc: '/static/images/metaverse-development.png',
                href: '#metaverse',
                bg: '#B1E6F9',
              },
              {
                title: 'NFT Assets Development',
                imgSrc: '/static/images/nft-assets-devlopment.png',
                href: '#nft-assets',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate-scale-in relative h-[429px] w-full max-w-[368px] overflow-hidden rounded-[4px] border border-[#ECEBEB] bg-[#FCFCFC] opacity-0"
                data-animate
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <Link href={item.href} aria-label={`Link to ${item.title}`}>
                  <Image
                    alt={item.title}
                    src={item.imgSrc}
                    className="h-full w-full rounded-[4px] object-cover object-center"
                    width={368}
                    height={429}
                    loading="lazy"
                  />
                </Link>
                <h3 className="absolute top-[-70px] left-1/2 w-[218px] -translate-x-1/2 text-center font-['Poppins'] text-xl font-semibold text-white sm:text-2xl">
                  <Link
                    href={item.href}
                    aria-label={`Link to ${item.title}`}
                    className="font-['Poppins']"
                  >
                    {item.title}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Who Are We Section */}
        <section id="about-us" className="relative w-full bg-white py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">
            <div className="animate-slide-up flex-1 opacity-0" data-animate>
              <h2 className="font-['Poppins'] text-3xl leading-tight font-semibold text-black uppercase sm:text-4xl md:text-5xl">
                Who are we?
              </h2>
              <p className="mt-8 font-['Poppins'] text-xl leading-relaxed font-normal text-black sm:text-2xl md:text-3xl">
                We are experts in converging AI, Blockchain, XR, and 3D modeling for a decade.
              </p>
              <p className="mt-6 max-w-[795px] font-['Poppins'] text-base font-normal text-[#767E7E] sm:text-lg">
                Whether you want to develop your own metaverse business or incorporate
                next-generation experiences like AI and VR in your current business, we got you
                covered. Started in 2014, our goal is to develop and provide solutions using
                breakthrough technologies to elevate your business and brand value.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="#about-us"
                  className="h-[50px] w-full rounded-full border border-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB] hover:text-white sm:w-[192px] sm:text-lg"
                >
                  Know More
                </Link>
                <Link
                  href="#metaverse"
                  className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
                >
                  Enter Our Metaverse
                </Link>
              </div>
            </div>
            <div
              className="animate-slide-in animation-delay-200 h-auto max-h-[646px] w-full opacity-0 md:w-[431px]"
              data-animate
            >
              <Image
                src="/static/images/who-we.png"
                alt="Who Are We"
                width={431}
                height={646}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative w-full bg-[#F1FAFF] py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Our Services
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Metaverse Development',
                description:
                  'Build your own metaverse using our cutting-edge solutions. By delivering you our pinnacle of tech service and support, you can expand your horizon and step into a new world.',
                imgSrc: '/static/images/metaverse.png',
                href: '#metaverse',
                bg: '#1EB287',
              },
              {
                title: 'AI Solutions',
                description:
                  'From developing chatbots to implementing process automation, our team got you covered with best-in-class AI solutions and support.',
                imgSrc: '/static/images/ai_solutions.png',
                href: '#ai-solutions',
                bg: '#FFC52E',
              },
              {
                title: 'AR / VR Development',
                description:
                  'With Gamasome, incorporate AR/VR into your business to provide your users with next-generation experience and effectively expanding your horizon of reach.',
                imgSrc: '/static/images/ar_vr.png',
                href: '#ar-vr',
                bg: '#CC139D',
              },
              {
                title: 'Game Development',
                description:
                  'We excel in all game development platforms such as AR/VR, mobile, and desktop. Get in touch with us to build your dream game idea and launch it for your players.',
                imgSrc: '/static/images/game.png',
                href: '#game-development',
                bg: '#1E88EA',
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="animate-scale-in relative h-[432.01px] w-full max-w-[344.17px] overflow-hidden rounded-[10px] bg-white opacity-0"
                style={{
                  filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.16))',
                  animationDelay: `${100 + index * 100}ms`,
                }}
                data-animate
              >
                <div className="absolute top-4 left-4 h-[55.79px] w-[55.79px] rounded-[10px]">
                  <Image
                    alt={`${service.title} icon`}
                    src={service.imgSrc}
                    className="h-full w-full rounded-[10px] object-cover"
                    width={55.79}
                    height={55.79}
                    loading="lazy"
                  />
                </div>
                <h3 className="absolute top-[120px] left-4 w-[234.87px] rounded-[4px] px-2 py-1 text-left font-['Poppins'] text-xl font-semibold text-black sm:text-2xl">
                  <Link
                    href={service.href}
                    aria-label={`Link to ${service.title}`}
                    className="font-['Poppins']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="absolute top-[223.48px] left-4 w-[288.22px] text-left font-['Poppins'] text-base text-[#333333] sm:text-lg">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div
            className="animate-slide-up animation-delay-200 mt-12 flex flex-col justify-center gap-4 opacity-0 sm:flex-row sm:gap-8"
            data-animate
          >
            <Link
              href="#services"
              className="h-[50px] w-full rounded-full border border-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-[#2D9CDB] transition hover:bg-[#2D9CDB] hover:text-white sm:w-[192px] sm:text-lg"
            >
              Know More
            </Link>
            <Link
              href="#metaverse"
              className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
            >
              Enter Our Metaverse
            </Link>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative w-full bg-[#FAFAFA] py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Our Products
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-[896px] grid-cols-1 gap-8 px-4 sm:grid-cols-2">
            {[
              {
                title: 'FLOKI Mo-Cap Suite',
                description:
                  'A state-of-the-art, advanced and scalable mo-cap System. We provide custom services like engine integration.',
                videoSrc: 'https://www.youtube.com/embed/V3nrkG6zo5o?rel=0',
                videoTitle: 'Full Body Motion Capture Showcase by Gamasome Interactive',
                href: '#floki-mo-cap',
              },
              {
                title: 'Dragon-IK Animal Inverse Kinematics',
                description:
                  'A plugin for creating IK for animals and humans purely through animation blueprints. A realistic and smooth IK solution for various types of animals.',
                videoSrc: 'https://www.youtube.com/embed/3EBvLRNMsFY?rel=0',
                videoTitle: 'Dragon-IK Animal Inverse Kinematics by Gamasome Interactive',
                href: '#dragon-ik',
              },
            ].map((product, index) => (
              <div
                key={product.title}
                className="animate-scale-in mx-auto flex w-full max-w-[400px] flex-col opacity-0"
                style={{ animationDelay: `${100 + index * 100}ms` }}
                data-animate
              >
                <Link href={product.href} aria-label={`Link to ${product.title}`}>
                  <div className="aspect-[16/9] w-full max-w-[400px] overflow-hidden rounded-lg">
                    <iframe
                      className="h-full w-full"
                      src={product.videoSrc}
                      title={product.videoTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </Link>
                <h3 className="mt-4 text-center font-['Poppins'] text-xl font-semibold text-black sm:text-2xl">
                  <Link
                    href={product.href}
                    aria-label={`Link to ${product.title}`}
                    className="font-['Poppins']"
                  >
                    {product.title}
                  </Link>
                </h3>
                <p className="mt-2 text-center font-['Poppins'] text-base text-[#333333] sm:text-lg">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="relative w-full bg-white py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Our Clients
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              '/static/images/disney-logo.png',
              '/static/images/blue_planet.jpg',
              '/static/images/poker-saint-gamasome.png',
              '/static/images/nid.png',
              '/static/images/bt.jpg',
              '/static/images/renal_team.jpg',
              '/static/images/quick_sand.jpg',
              '/static/images/cs-gamasome.png',
              '/static/images/Royal.win-gamasome.png',
              '/static/images/abrams-studio-gamasome.png',
              '/static/images/eros.jpg',
              '/static/images/strbot.jpg',
              '/static/images/ais-glass-gamasome.png',
              '/static/images/hero-motorcorp-gamasome.png',
              '/static/images/tj.jpg',
            ].map((imgSrc, index) => (
              <div
                key={index}
                className="animate-scale-in flex h-[133px] w-full items-center justify-center border border-[#E3E3E3] opacity-0"
                style={{ animationDelay: `${100 + index * 100}ms` }}
                data-animate
              >
                <Image
                  src={imgSrc}
                  alt={`Client ${index + 1}`}
                  width={132}
                  height={112}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="relative w-full bg-[#2D9CDB] py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-white opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Technologies We Work With
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
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
              <div
                key={index}
                className="animate-scale-in flex h-[133px] w-full items-center justify-center border border-[#00FCE2] opacity-0"
                style={{ animationDelay: `${100 + index * 100}ms` }}
                data-animate
              >
                <Image
                  src={imgSrc}
                  alt={`Technology ${index + 1}`}
                  width={132}
                  height={112}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            className="animate-slide-up animation-delay-200 mx-auto mt-12 max-w-[875px] rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center opacity-0"
            data-animate
          >
            <h3 className="font-['Poppins'] text-xl font-bold text-white sm:text-2xl">
              Do You Want to Build Your Own Legacy Metaverses?
            </h3>
            <p className="mt-2 font-['Poppins'] text-sm font-normal text-white/60 sm:text-base">
              Yes, we can help you build your own metaverse.
            </p>
            <h4 className="mt-4 font-['Poppins'] text-lg font-semibold text-white">
              Talk to our expert
            </h4>
          </div>
        </section>
      </div>

      <style jsx>{`
        [data-animate].animate {
          animation-play-state: running;
        }
        [data-animate] {
          animation-play-state: paused;
        }
      `}</style>
    </>
  )
}
