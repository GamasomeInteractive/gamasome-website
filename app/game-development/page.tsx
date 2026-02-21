'use client'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'
import { useEffect } from 'react'

export default function GameDev() {
  const pageTitle = `${siteMetadata.title} - Game Development`
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
              src="/static/images/game-development-banner.png"
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
            <h1 className="font-['Poppins'] text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl">
              Sculpt your Games with Gamasome
            </h1>
            <p className="mt-4 font-['Poppins'] text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl">
              Top Game development company in India
            </p>
            <div className="animate-slide-from-bottom animation-delay-400 opacity-0" data-animate>
              <Link
                href="#ai-solutions"
                className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[332px] sm:text-2xl"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* Expertise Section */}
        <section
          id="expertise"
          className="relative flex w-full flex-col items-center bg-[#FFFFFF] py-16"
        >
          <h2
            className="animate-fade-in text-center font-['Poppins'] text-3xl font-semibold text-[#000000] opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Our Expertise Platforms
          </h2>
          <p className="mx-auto mt-4 max-w-[1194.09px] px-4 text-center font-['Poppins'] text-base font-normal text-[#000000] sm:text-lg">
            We excel in all game development platforms such as AR/VR, mobile, and desktop. Get in
            touch with us to build your dream game idea and launch it for your players.
          </p>
          <div className="mx-auto mt-12 w-full max-w-[1273px] px-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'AR / VR Game Development',
                  description:
                    'Build or incorporate AR/VR elements in your game. With our qualified designers and engineers, we provide you with our best-in-class services and support to implement AR/VR features flawlessly.',
                  imgSrc: '/static/images/game1.png',
                  href: '#ar-vr-game-development',
                },
                {
                  title: 'Mobile Game Development',
                  description:
                    'Develop and launch your game in the Google Play Store or the App Store with the help of our pro designers and developers.',
                  imgSrc: '/static/images/game2.png',
                  href: '#mobile-game-development',
                },
                {
                  title: 'Desktop Game Development',
                  description:
                    'Whether you want to build a web-based or a desktop game, we’ve got your back. Using our next-gen game development services, create and launch your game across multiple desktop platforms.',
                  imgSrc: '/static/images/game3.png',
                  href: '#desktop-game-development',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`${index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'} relative flex w-full flex-col opacity-0`}
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
                  <div className="flex flex-col px-4 pt-4 pb-4">
                    <h3 className="text-center font-['Poppins'] text-xl leading-[42px] font-semibold text-[#001930] capitalize sm:text-2xl">
                      <Link
                        href={item.href}
                        aria-label={`Link to ${item.title}`}
                        className="font-['Poppins']"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-sm leading-[26px] font-normal text-[#001930] capitalize sm:text-base">
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Link
                        href={item.href}
                        className="flex h-[40px] w-[161.6px] items-center justify-center rounded-full border border-[#2D9CDB] font-['Poppins']"
                        style={{
                          filter: 'drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.05))',
                        }}
                      >
                        <span className="text-center font-['Poppins'] text-sm font-normal text-[#2D9CDB] sm:text-base">
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

        {/* Game Development Solutions Section */}
        <section
          id="game-development-solutions"
          className="relative flex w-full flex-col items-center bg-[#F1FAFF] py-16"
        >
          <h2
            className="animate-fade-in text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Our Game Development Solutions
          </h2>
          <div className="mx-auto mt-12 w-full max-w-[1273px] px-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'ARPG / RPG MMRPG',
                  description:
                    'Create, design, and launch an adventurous role-playing game with our technical artists and developers.',
                  imgSrc: 'https://www.youtube.com/embed/VXXBRvyIDZY?si=ab4wf6e7GmbMKrJI',
                  href: '#arpg-mmrpg',
                },
                {
                  title: 'Shooting Games',
                  description:
                    'Develop and launch FPS games across many platforms with Gamasome to top the charts.',
                  imgSrc: 'https://www.youtube.com/embed/2EJ9i3kCfpA?si=HeOC1lXObelFjf17',
                  href: '#shooting-games',
                },
                {
                  title: 'MOBA Games',
                  description:
                    'Immerse your audience in an incredible MOBA game with us and launching them in your preferred platform.',
                  imgSrc: 'https://www.youtube.com/embed/hN9GfrTuF4k?si=sQt38i1UcP7HxlWe',
                  href: '#moba-games',
                },
                {
                  title: 'Simulations / Sports',
                  description:
                    'Conquer sports enthusiasts with a jaw-dropping sports game, or let your audience live out their fantasies in it.',
                  imgSrc: 'https://www.youtube.com/embed/WWAVZCzkF78?si=rISDHqDcuSafzqfG',
                  href: '#simulations-sports',
                },
                {
                  title: 'Racing Games',
                  description:
                    'Give your thrill seeking customers a taste of adrenaline rushing moments behind the hot wheels.',
                  imgSrc: 'https://www.youtube.com/embed/yN4Sq3uqjCM?si=EDv5g6fO-3_AO1Cb',
                  href: '#racing-games',
                },
                {
                  title: 'Arcade & Adventure',
                  description:
                    'Create a fantastic story-driven adventure game to keep your players interested and thrilled.',
                  imgSrc: 'https://www.youtube.com/embed/lSrUbtoZbNE?si=1itxYRg9PRDmXcd2',
                  href: '#arcade-adventure',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`${index % 2 === 0 ? 'animate-slide-from-left' : 'animate-slide-from-right'} relative flex w-full flex-col overflow-hidden rounded-[4px] opacity-0`}
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                  data-animate
                >
                  <Link href={item.href} aria-label={`Link to ${item.title}`}>
                    <iframe
                      className="h-full w-full"
                      src={item.imgSrc}
                      title={'YouTube video player'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </Link>
                  <div className="flex flex-col px-4 pt-4 pb-4">
                    <h3 className="text-center font-['Poppins'] text-xl leading-[42px] font-semibold text-[#001930] capitalize sm:text-2xl">
                      <Link
                        href={item.href}
                        aria-label={`Link to ${item.title}`}
                        className="font-['Poppins']"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-sm leading-[26px] font-normal text-[#001930] capitalize sm:text-base">
                      {item.description}
                    </p>
                    <div
                      className="mt-4 flex justify-center"
                      style={{ position: 'relative', height: '40px' }}
                    >
                      <Link
                        href={item.href}
                        className="flex h-[40px] w-[161.6px] items-center justify-center rounded-full border border-[#2D9CDB] font-['Poppins']"
                        style={{
                          filter: 'drop-shadow(0px 10px 50px rgba(0, 0, 0, 0.05))',
                        }}
                      >
                        <span className="text-center font-['Poppins'] text-sm font-normal text-[#2D9CDB] sm:text-base">
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

        {/* DeepTech Section */}
        <section
          id="deep-tech"
          className="relative w-full bg-white bg-[url('/static/images/metaverse-bg.png')] bg-cover bg-center py-16"
        >
          <div
            className="absolute top-[259px] right-4 h-[562px] w-[562px] opacity-40 blur-[60px] md:right-auto md:left-[679px]"
            style={{
              background:
                'linear-gradient(92.33deg, rgba(255, 90, 67, 0.2) 30.83%, rgba(155, 81, 224, 0.2) 71.99%)',
            }}
          ></div>
          <div className="absolute top-[348.8px] left-1/2 z-1 h-[1px] w-[61px] translate-x-[303px] border border-[#767E7E] bg-white"></div>
          <div className="relative z-10 mx-auto flex max-w-[1384px] flex-col gap-8 px-4 md:flex-row">
            <div
              className="animate-slide-from-left relative aspect-video w-full opacity-0 md:w-[601px]"
              style={{ animationDelay: '200ms' }}
              data-animate
            >
              <iframe
                className="h-full w-full"
                src={'https://www.youtube.com/embed/f_YS2UxyzxA?si=zjgpitM6dXmSswNp'}
                title={'YouTube video player'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="animate-slide-from-right flex flex-1 flex-col opacity-0" data-animate>
              <h2 className="font-['Poppins'] text-2xl leading-[54px] font-semibold text-black sm:text-3xl md:text-4xl">
                How we converge Deep Tech in our Games ?
              </h2>
              <p className="mt-4 max-w-[723px] font-['Poppins'] text-base leading-[28px] font-normal text-black sm:text-lg">
                Using our cutting-edge game production platform, we’ve created some of the most
                engaging games that keep players hooked and entertained.
              </p>
              <p className="mt-4 max-w-[723px] font-['Poppins'] text-base leading-[28px] font-normal text-black sm:text-lg">
                With our AI-powered unified game development services, we support all possible types
                of game development for all available platforms. Get in touch with us to develop and
                launch your own game for your playerbase.
              </p>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="flex h-[50px] w-[192.78px] items-center justify-center rounded-full bg-[#2D9CDB] font-['Poppins'] text-base font-normal text-white capitalize sm:text-lg"
                  style={{
                    filter: 'drop-shadow(0px 4px 26px rgba(0, 0, 0, 0.06))',
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section
          id="works"
          className="relative flex w-full flex-col items-center bg-[#2D9CDB] py-16"
        >
          <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Sky Piper Arcade', imgSrc: '/static/images/game1.png', href: '#arcade' },
              { title: 'United Warfare', imgSrc: '/static/images/game2.png', href: '#warfare' },
              { title: 'The Sprout', imgSrc: '/static/images/game3.png', href: '#sprout' },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate-slide-from-bottom relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-[4px] bg-[#2D9CDB] opacity-0"
                style={{ animationDelay: `${100 + index * 100}ms` }}
                data-animate
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
                <h3 className="py-4 text-center font-['Poppins'] text-xl text-white sm:text-2xl">
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

        {/* Technologies Section */}
        <section id="technologies" className="relative w-full bg-[#FFFFFF] py-16">
          <h2
            className="animate-fade-in text-center font-['Poppins'] text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
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
