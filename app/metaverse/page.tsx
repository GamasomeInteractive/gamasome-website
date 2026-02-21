'use client'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Metaverse() {
  const pageTitle = `${siteMetadata.title} - Metaverse`
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
      <div className="font-poppins relative w-full bg-white">
        {/* Banner Section */}
        <section
          id="home"
          className="animate-fade-in animation-duration-300 relative h-screen w-full bg-[#07091B]"
          data-animate
        >
          <div className="absolute inset-0 z-0 bg-[#000B71]" />
          <div className="absolute inset-0 z-10">
            <Image
              src="/static/images/metaverse-banner.png"
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
          <div
            className="animate-slide-from-left animation-delay-200 absolute top-1/2 left-4 z-40 max-w-[936px] -translate-y-1/2 p-0 opacity-0 sm:left-8 md:left-16 lg:left-40"
            data-animate
          >
            <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl">
              Get your Business into the Metaverse
            </h1>
            <p className="font-poppins mt-4 text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl">
              with Gamasome - The meta verse development company
            </p>
            <div className="animate-slide-from-bottom animation-delay-400 opacity-0" data-animate>
              <Link
                href="#ai-solutions"
                className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[332px] sm:text-2xl"
              >
                Enter Our Metaverse
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* Metaverse Section */}
        <section id="metaverse" className="relative flex w-full flex-col items-center bg-[#FFFFFF]">
          <h2
            className="animate-fade-in text-center text-[46px] leading-[87px] font-semibold text-[#000000] opacity-0"
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.02em' }}
            data-animate
          >
            Wondering how to start with metaverse?
          </h2>
          <p
            className="mx-auto mt-4 max-w-[1194.09px] px-4 text-center text-[20px] leading-[38px] font-normal text-[#000000]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Whether you need to build your virtual offices, connect with new people, experience
            immersive gaming, or start trading, we got you. Check out our guided roadmap to identify
            your needs and begin your metaverse journey with us.
          </p>
          <div className="mx-auto mt-12 w-full max-w-[1273px] px-4">
            <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Sandbox development',
                  description:
                    'Sandbox is the most popular metaverse development platform, built with cutting-edge Blockchain technology. Dive into and expand your metaverse to provide a more engaging user experience and enhance your business.',
                  imgSrc: '/static/images/sand.png',
                  href: '#sandbox-development',
                },
                {
                  title: 'Roblox development',
                  description:
                    'Roblox is a metaverse platform that allows you to create, construct, and communicate with your users while immersing them in an exciting 3D environment. We offer you our unified multiplayer game creation platform to help your company reach out to potential clients.',
                  imgSrc: '/static/images/roblox.png',
                  href: '#roblox-development',
                },
                {
                  title: 'Decentraland Development',
                  description:
                    'Decentraland allows you to create, sell, and promote virtual lands in the form of NFTs. We assist in bringing consumers from across the planet together under a virtual area to establish a community to build and support your business.',
                  imgSrc: '/static/images/decent.png',
                  href: '#decentraland-development',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`${index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'} relative flex h-full w-full flex-col opacity-0`}
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                  data-animate
                >
                  <Link href={item.href} aria-label={`Link to ${item.title}`}>
                    <Image
                      alt={item.title}
                      src={item.imgSrc}
                      className="h-[300px] w-full object-cover object-center"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
                    <h3
                      className="text-center text-[24px] leading-[42px] font-semibold text-[#001930]"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.02em',
                        textTransform: 'capitalize',
                      }}
                    >
                      <Link href={item.href} aria-label={`Link to ${item.title}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p
                      className="mt-2 flex-1 text-[16px] leading-[26px] font-normal text-[#001930]"
                      style={{ fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize' }}
                    >
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Link
                        href={item.href}
                        className="flex h-[40px] w-[161.6px] items-center justify-center rounded-full border border-[#2D9CDB]"
                        style={{
                          filter: 'drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.05))',
                        }}
                      >
                        <span
                          className="text-center text-[16px] font-normal text-[#2D9CDB]"
                          style={{
                            fontFamily: 'Poppins, Source Sans Pro, sans-serif',
                            lineHeight: '20px',
                          }}
                        >
                          Know More
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support agent Section */}
        <section
          id="support-agent"
          className="relative w-full bg-white bg-[url('/static/images/metaverse-bg.png')] bg-cover bg-center py-16"
        >
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row">
            <div
              className="animate-slide-from-left animation-delay-200 aspect-video w-full opacity-0 md:w-[601px]"
              data-animate
            >
              <iframe
                className="h-full w-full"
                src={'https://www.youtube.com/embed/YdX2GvanxeI'}
                title={'Gamasome XR Showreel'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="animate-slide-from-right flex-1 opacity-0" data-animate>
              <h2
                className="font-semibol text-[36px] leading-[54px] text-black"
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.02em' }}
              >
                Create your digital support agent in the Metaverse
              </h2>
              <div
                className="h-[1px] w-[61px] border border-[#767E7E] bg-white"
                style={{ left: 'calc(50% + 350px)', top: '297.8px', zIndex: 1 }}
              ></div>
              <p
                className="mt-4 max-w-[723px] text-[20px] leading-[28px] font-normal text-black"
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.02em' }}
              >
                Reach out your warm support to your customers virtually through Metaverse. Try out
                our support agent creation platform.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="#metaverse"
                  className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
                >
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Metaverse Build Section */}
        <section
          id="metaverse-build"
          className="relative flex w-full flex-col items-center bg-[#FFFFFF] py-16"
        >
          <div className="mx-auto w-full max-w-[1273px]">
            <h2
              className="animate-fade-in mx-auto w-full max-w-[1153px] text-center text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
              data-animate
            >
              So, what can we build for you in the metaverse?
            </h2>
            <div className="mt-12 px-4">
              <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Virtual Experiences',
                    description:
                      'Hang out with people, go to new virtual places and experience the digital world. Check out how Gamasome can help you build your dream world and help you reach out to a new horizon.',
                    imgSrc: '/static/images/meta1.png',
                    href: '#virtual-experiences',
                  },
                  {
                    title: 'Real Estates / Offices',
                    description:
                      'Start virtual offices or buy and rule over virtual lands. Dive into our metaverse to start designing your reality.',
                    imgSrc: '/static/images/meta2.png',
                    href: '#real-estates-offices',
                  },
                  {
                    title: 'Gaming Experience',
                    description:
                      'Elevate your gaming experience by stepping into the metaverse. Get in touch with us to immerse into the world of gaming.',
                    imgSrc: '/static/images/meta3.png',
                    href: '#gaming-experience',
                  },
                  {
                    title: 'Virtual Parties / Trade Shows / Events',
                    description:
                      'Meet new people, check out your friends, see your favorite idol’s performance, and watch stage shows in the metaverse. Enter our metaverse to connect with people from all over the world virtually.',
                    imgSrc: '/static/images/meta4.png',
                    href: '#virtual-events',
                  },
                  {
                    title: '2D, 3D Assets As NFTs To Interact',
                    description:
                      'Bring your favorite real-world objects or people and interact with them in the metaverse. Check out how we can help you create and connect with your favorites in the metaverse.',
                    imgSrc: '/static/images/meta5.png',
                    href: '#nft-assets',
                  },
                  {
                    title: 'Assets As Tradable NFTs',
                    description:
                      'Convert your actual assets as NFTs to trade and invest in the metaverse. Contact us to know how we enhance your metaverse trading and investment game.',
                    imgSrc: '/static/images/meta6.png',
                    href: '#tradable-nfts',
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className={`${index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'} relative flex h-full w-full flex-col opacity-0`}
                    style={{ animationDelay: `${100 + index * 100}ms` }}
                    data-animate
                  >
                    <Link href={item.href} aria-label={`Link to ${item.title}`}>
                      <Image
                        alt={item.title}
                        src={item.imgSrc}
                        className="h-[300px] w-full object-cover object-center"
                        width={400}
                        height={300}
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
                      <h3
                        className="text-center text-[24px] leading-[36px] font-semibold text-[#001930]"
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          letterSpacing: '0.02em',
                          textTransform: 'capitalize',
                        }}
                      >
                        <Link href={item.href} aria-label={`Link to ${item.title}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p
                        className="mt-2 flex-1 text-[16px] leading-[26px] font-normal text-[#001930]"
                        style={{ fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize' }}
                      >
                        {item.description}
                      </p>
                      <div className="mt-4 flex justify-center">
                        <Link
                          href={item.href}
                          className="flex h-[40px] w-[161.6px] items-center justify-center rounded-full border border-[#2D9CDB]"
                          style={{
                            filter: 'drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.05))',
                          }}
                        >
                          <span
                            className="text-center text-[16px] font-normal text-[#2D9CDB]"
                            style={{
                              fontFamily: 'Poppins, Source Sans Pro, sans-serif',
                              lineHeight: '20px',
                            }}
                          >
                            Know More
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section
          id="journey"
          className="relative flex w-full flex-col items-center bg-[#2D9CDB] py-16"
          style={{ minHeight: '2550px' }}
        >
          <div className="mx-auto w-full max-w-[1000px] px-4 text-center">
            <h2
              className="animate-fade-in text-[46px] leading-[56px] font-semibold text-white opacity-0"
              style={{
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.02em',
              }}
              data-animate
            >
              Your Metaverse Development Journey with Gamasome
            </h2>
            <p
              className="mt-10 text-[26px] leading-[42px] font-semibold text-white"
              style={{
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.02em',
                textTransform: 'capitalize',
              }}
            >
              Journey
            </p>

            <div className="journey-timeline relative mt-4 w-full">
              {/* Vertical Timeline Line */}
              <div
                className="timeline-line absolute w-[4px] bg-white"
                style={{
                  height: '1825px',
                  left: '50%',
                  right: '50%',
                  transform: 'translateX(-50%)',
                  top: '18px',
                }}
              ></div>

              {/* Timeline Markers */}
              {[
                {
                  outerColor: '#FF9C00',
                  middleColor: '#FAAF38',
                  innerColor: '#FAAF38',
                  outerSize: '18px',
                  middleSize: '10.5px',
                  innerSize: '10.5px',
                  top: '0px',
                  left: 'calc(50% - 9px)',
                  topTablet: '0px',
                  topMobile: '0px',
                },
                {
                  outerColor: '#176694',
                  middleColor: '#2D9CDB',
                  innerColor: '#176694',
                  outerSize: '62.25px',
                  middleSize: '41.25px',
                  innerSize: '26.59px',
                  top: '99.67px',
                  left: 'calc(50% - 31.125px)',
                  topTablet: '80px',
                  topMobile: '100px',
                },
                {
                  outerColor: '#176694',
                  middleColor: '#2D9CDB',
                  innerColor: '#176694',
                  outerSize: '62.25px',
                  middleSize: '41.25px',
                  innerSize: '26.59px',
                  top: '676.34px',
                  left: 'calc(50% - 31.125px)',
                  topTablet: '400px',
                  topMobile: '650px',
                },
                {
                  outerColor: '#176694',
                  middleColor: '#2D9CDB',
                  innerColor: '#176694',
                  outerSize: '62.25px',
                  middleSize: '41.25px',
                  innerSize: '26.59px',
                  top: '1240.84px',
                  left: 'calc(50% - 31.125px)',
                  topTablet: '720px',
                  topMobile: '1200px',
                },
                {
                  outerColor: '#176694',
                  middleColor: '#2D9CDB',
                  innerColor: '#176694',
                  outerSize: '62.25px',
                  middleSize: '41.25px',
                  innerSize: '26.59px',
                  top: '1805.34px',
                  left: 'calc(50% - 31.125px)',
                  topTablet: '1040px',
                  topMobile: '1750px',
                },
              ].map((marker, index) => (
                <div
                  key={index}
                  className="animate-slide-from-bottom marker absolute flex items-center justify-center opacity-0"
                  style={{
                    top: marker.top,
                    left: marker.left,
                    width: marker.outerSize,
                    height: marker.outerSize,
                    animationDelay: `${100 + index * 100}ms`,
                  }}
                  data-animate
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: marker.outerSize,
                      height: marker.outerSize,
                      background: marker.outerColor,
                    }}
                  ></div>
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: marker.middleSize,
                      height: marker.middleSize,
                      background: marker.middleColor,
                    }}
                  ></div>
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: marker.innerSize,
                      height: marker.innerSize,
                      background: marker.innerColor,
                    }}
                  ></div>
                </div>
              ))}

              {/* Content Blocks */}
              {/* Explore & Buy New Lands */}
              <div
                className="content-block text-start"
                style={{
                  position: 'absolute',
                  width: '416px',
                  height: '99px',
                  right: '0px',
                  top: '120px',
                }}
              >
                <h3
                  style={{
                    position: 'absolute',
                    width: '338px',
                    height: '42px',
                    left: '0px',
                    top: '0px',
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '26px',
                    lineHeight: '160%',
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0',
                  }}
                >
                  Explore & Buy New Lands
                </h3>
                <p
                  style={{
                    position: 'absolute',
                    width: '416px',
                    height: '44px',
                    left: '0px',
                    top: '55px',
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0',
                  }}
                >
                  lorem ipsum ellora caves adnisme adanai quick brown fox jumps over a thick wall
                  lorem ipsum.
                </p>
              </div>

              {/* Image Box for Explore & Buy New Lands */}
              <div
                className="image-block"
                style={{
                  position: 'absolute',
                  width: '402px',
                  height: '494px',
                  left: '0px',
                  top: '60px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/static/images/tline1.png"
                  alt="Explore & Buy New Lands"
                  width={100}
                  height={100}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Create Assets and Environment */}
              <div
                className="content-block text-start"
                style={{
                  position: 'absolute',
                  width: '416px',
                  height: '119.02px',
                  left: '0px',
                  top: '650px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '600',
                    fontSize: '26px',
                    lineHeight: '30px',
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0 0 20px 0',
                    width: '402.38px',
                    height: '60px',
                  }}
                >
                  Create Assets and Environment
                </h3>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0',
                    width: '416px',
                    height: '44px',
                  }}
                >
                  lorem ipsum ellora caves adnisme adanai quick brown fox jumps over a thick wall
                  lorem ipsum.
                </p>
              </div>

              {/* Image Box for Create Assets and Environment */}
              <div
                className="image-block"
                style={{
                  position: 'absolute',
                  width: '402px',
                  height: '494px',
                  right: '0px',
                  top: '590px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  width={100}
                  height={100}
                  src="/static/images/tline2.png"
                  alt="Create Assets and Environment"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Establish Experiences */}
              <div
                className="content-block text-start"
                style={{
                  position: 'absolute',
                  width: '416px',
                  height: '99px',
                  right: '0px',
                  top: '1210px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '600',
                    fontSize: '26px',
                    lineHeight: '160%',
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0 0 13px 0',
                    width: '295px',
                    height: '42px',
                  }}
                >
                  Establish Experiences
                </h3>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0',
                    width: '416px',
                    height: '44px',
                  }}
                >
                  lorem ipsum ellora caves adnisme adnai quick brown fox jumps over a thick wall
                  lorem ipsum.
                </p>
              </div>

              {/* Image Box for Establish Experiences */}
              <div
                className="image-block"
                style={{
                  position: 'absolute',
                  width: '402px',
                  height: '494px',
                  left: '0px',
                  top: '1150px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/static/images/tline3.png"
                  alt="Establish Experiences"
                  width={100}
                  height={100}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Monetize your Metaverse */}
              <div
                className="content-block text-start"
                style={{
                  position: 'absolute',
                  width: '416px',
                  height: '97.02px',
                  left: '0px',
                  top: '1780px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '600',
                    fontSize: '26px',
                    lineHeight: '30px',
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0 0 23px 0',
                    width: '402.38px',
                    height: '30px',
                  }}
                >
                  Monetize your Metaverse
                </h3>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif, Source Sans Pro',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: '0',
                    width: '416px',
                    height: '44px',
                  }}
                >
                  lorem ipsum ellora caves adnisme adanai quick brown fox jumps over a thick wall
                  lorem ipsum.
                </p>
              </div>

              {/* Image Box for Monetize your Metaverse */}
              <div
                className="image-block"
                style={{
                  position: 'absolute',
                  width: '402px',
                  height: '494px',
                  right: '0px',
                  top: '1720px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/static/images/tline4.png"
                  alt="Monetize your Metaverse"
                  width={100}
                  height={100}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="relative w-full bg-[#FFFFFF] py-16">
          <h2
            className="animate-fade-in text-center text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Technologies We Work With
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-5">
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
                className="animate-slide-from-bottom flex h-[133px] w-full items-center justify-center border border-[#7F7F7F] opacity-0"
                style={{ animationDelay: `${100 + index * 80}ms` }}
                data-animate
              >
                <Image
                  src={imgSrc}
                  alt={`Technology ${index + 1}`}
                  width={132}
                  height={112}
                  className="object-cover brightness-0 saturate-100 filter"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(50%) contrast(100%)',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            className="animate-slide-from-bottom animation-delay-200 mx-auto mt-12 max-w-[875px] rounded-lg border border-[#00FCE2] bg-[#2D9CDB] p-6 text-center opacity-0"
            data-animate
          >
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Do You Want to Build Your Own Legacy Metaverses?
            </h3>
            <p className="mt-2 text-base font-normal text-white/60">
              Yes, we can help you build your own metaverse.
            </p>
            <h4 className="mt-4 text-lg font-semibold text-white">Talk to our expert</h4>
          </div>
        </section>
      </div>

      {/* Inline CSS for animation trigger and Journey responsiveness */}
      <style jsx>
        {`
          [data-animate].animate {
            animation-play-state: running;
          }
          [data-animate] {
            animation-play-state: paused;
          }
          @media (max-width: 1023px) {
            #journey {
              min-height: auto;
              height: auto;
              padding-bottom: 32px;
            }
            #journey .journey-timeline {
              width: 100%;
              max-width: 764px;
              margin: 0 auto;
            }
            #journey .timeline-line {
              height: 1095px; /* ~60% of 1825px */
              top: 18px;
            }
            #journey .marker:nth-child(1) {
              top: 0px;
            }
            #journey .marker:nth-child(2) {
              top: 60px;
            }
            #journey .marker:nth-child(3) {
              top: 406px;
            }
            #journey .marker:nth-child(4) {
              top: 744px;
            }
            #journey .marker:nth-child(5) {
              top: 1083px;
            }
            #journey .content-block:nth-child(6) {
              /* Explore & Buy New Lands */
              left: 300px;
              top: 120px;
              width: 416px;
            }
            #journey .image-block:nth-child(7) {
              left: 0px;
              top: 60px;
              width: 264px; /* ~65% of 402px */
              height: 322px; /* ~65% of 494px */
            }
            #journey .content-block:nth-child(8) {
              /* Create Assets and Environment */
              left: 0px;
              top: 406px;
              width: 416px;
            }
            #journey .image-block:nth-child(9) {
              left: 300px;
              top: 550px;
              width: 264px;
              height: 322px;
            }
            #journey .content-block:nth-child(10) {
              /* Establish Experiences */
              left: 300px;
              top: 744px;
              width: 416px;
            }
            #journey .image-block:nth-child(11) {
              left: 0px;
              top: 888px;
              width: 264px;
              height: 322px;
            }
            #journey .content-block:nth-child(12) {
              /* Monetize your Metaverse */
              left: 0px;
              top: 1083px;
              width: 416px;
            }
            #journey .image-block:nth-child(13) {
              left: 300px;
              top: 1227px;
              width: 264px;
              height: 322px;
            }
          }
          @media (max-width: 767px) {
            #journey .journey-timeline {
              max-width: 90%;
              padding: 0 16px;
            }
            #journey .timeline-line {
              height: 2000px; /* Adjusted for stacked content */
            }
            #journey .marker:nth-child(1) {
              top: 0px;
            }
            #journey .marker:nth-child(2) {
              top: 150px;
            }
            #journey .marker:nth-child(3) {
              top: 750px;
            }
            #journey .marker:nth-child(4) {
              top: 1350px;
            }
            #journey .marker:nth-child(5) {
              top: 1950px;
            }
            #journey .content-block,
            #journey .image-block {
              left: 50%;
              transform: translateX(-50%);
              width: 100%;
              max-width: 416px;
            }
            #journey .image-block {
              height: 300px; /* Reduced for mobile */
            }
            #journey .content-block:nth-child(6) {
              /* Explore & Buy New Lands */
              top: 100px;
            }
            #journey .image-block:nth-child(7) {
              top: 250px;
            }
            #journey .content-block:nth-child(8) {
              /* Create Assets and Environment */
              top: 600px;
            }
            #journey .image-block:nth-child(9) {
              top: 750px;
            }
            #journey .content-block:nth-child(10) {
              /* Establish Experiences */
              top: 1200px;
            }
            #journey .image-block:nth-child(11) {
              top: 1350px;
            }
            #journey .content-block:nth-child(12) {
              /* Monetize your Metaverse */
              top: 1800px;
            }
            #journey .image-block:nth-child(13) {
              top: 1950px;
            }
            #journey .content-block h3,
            #journey .content-block p {
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>
    </>
  )
}
