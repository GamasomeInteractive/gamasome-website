'use client'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import Head from 'next/head'
import { useEffect } from 'react'

export default function ArVrDev() {
  const pageTitle = `${siteMetadata.title} - AR VR Development`
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
              src="/static/images/vr-development-banner.png"
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
            className="animate-slide-up animation-delay-200 absolute top-1/2 left-4 z-40 max-w-[936px] -translate-y-1/2 p-0 sm:left-8 md:left-16 lg:left-40"
            data-animate
          >
            <h1 className="font-['Poppins'] text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-7xl">
              Turn an idea into experience with us
            </h1>
            <p className="mt-4 font-['Poppins'] text-xl font-normal tracking-[-0.025em] text-white sm:text-2xl md:text-3xl">
              Give Top notch AR / VR experience to your customers
            </p>
            <Link
              href="#ar-vr-solutions"
              className="mt-8 inline-block h-[78px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-lg leading-[78px] font-semibold text-white capitalize transition hover:bg-[#1d8cbf] sm:w-[332px] sm:text-2xl"
            >
              Contact Us
            </Link>
          </div>
          <div className="absolute bottom-8 left-1/2 z-40 flex h-15 w-5 -translate-x-1/2 items-start justify-center rounded-full border border-[#85868F] pt-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-[#D4D4DA]" />
          </div>
        </section>

        {/* Showreel Section */}
        <section id="showreel" className="relative w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg bg-gray-200 shadow-lg dark:bg-gray-800">
              <div className="flex h-full w-full items-center justify-center">
                <iframe
                  className="animate-fade-in h-full w-full rounded-lg"
                  src="https://www.youtube.com/embed/MGife5DIYaQ?si=EdqTdrTMUh63pXus"
                  title="Showreel Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-animate
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* AR / VR Solutions Section */}
        <section
          id="ar-vr-solutions"
          className="relative flex w-full flex-col items-center bg-[#F1FAFF] py-16"
        >
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl"
            data-animate
          >
            Our AR / VR Solutions
          </h2>
          <div className="mx-auto mt-12 w-full max-w-[1273px] px-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'VR Experiences',
                  description:
                    "Imagine living in a realm of your imagination. Gamasome's virtual reality development services will allow you to immerse yourself in a world of your imagination. Give life to your ideas using VR by contacting our experts today.",
                  imgSrc: '/static/images/vr1.png',
                  href: '#vr-experiences',
                },
                {
                  title: 'VR Games',
                  description:
                    'Create AR/VR components in your game or incorporate them into it. We provide our best-in-class services and support to help you integrate AR/VR features successfully, thanks to our expert designers and engineers.',
                  imgSrc: '/static/images/vr2.png',
                  href: '#vr-games',
                },
                {
                  title: 'Mixed Reality Experiences',
                  description:
                    'Indulge in your dream reality by diving into our Mixed Reality services. Our team of pro engineers are here to give life to your imagination.',
                  imgSrc: '/static/images/vr3.png',
                  href: '#mixed-reality',
                },
                {
                  title: 'Marker Based AR',
                  description:
                    'Turn your everyday objects into something interesting and make them come alive. Advertise your brand using our marker-based AR services to amaze your customers.',
                  imgSrc: '/static/images/vr4.png',
                  href: '#marker-based-ar',
                },
                {
                  title: 'Marker Less AR',
                  description:
                    'Indulge your customers into an exciting virtual world of your brand or connect with your people by implementing our markerless AR services.',
                  imgSrc: '/static/images/vr5.png',
                  href: '#marker-less-ar',
                },
                {
                  title: 'Location Based AR',
                  description:
                    'Increase your customer engagement and experience by adding location-based AR in your business. Make them identify your business locations across the globe and connect with your customers anywhere using our geo-based AR services.',
                  imgSrc: '/static/images/vr6.png',
                  href: '#location-based-ar',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="animate-scale-in relative flex w-full flex-col overflow-hidden rounded-[4px]"
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
                  <div className="flex flex-col px-4 pt-4 pb-4">
                    <h3 className="text-center font-['Poppins'] text-xl leading-[42px] font-semibold text-[#001930] sm:text-2xl">
                      <Link
                        href={item.href}
                        aria-label={`Link to ${item.title}`}
                        className="font-['Poppins']"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-base leading-[26px] font-normal text-[#001930] sm:text-lg">
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
                        <span className="text-center font-['Poppins'] text-base font-normal text-[#2D9CDB] sm:text-lg">
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

        {/* AR Experience Section */}
        <section id="ar-experience" className="relative w-full bg-white py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">
            <div className="animate-slide-up flex-1" data-animate>
              <h2 className="font-['Poppins'] text-3xl leading-tight font-semibold text-black uppercase sm:text-4xl md:text-5xl">
                Increase your e-commerce conversion rate with AR experiences
              </h2>
              <p className="mt-8 font-['Poppins'] text-xl leading-relaxed font-normal text-black sm:text-2xl md:text-3xl">
                The Augment Reality market size is expected to expand upto 40% by the year 2030.
                Step up your business by implementing AR experiences with Gamasome.
              </p>
              <p className="mt-6 max-w-[795px] font-['Poppins'] text-base font-normal text-[#767E7E] sm:text-lg">
                As one of the leading AR development services, we have prowess over building and
                launching both mobile as well as web-based AR apps. Kindle your customers' interest
                and boost your business by using AR services as your branding tool. With Gamasome,
                the possibilities are endless.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="#metaverse"
                  className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div
              className="animate-slide-in animation-delay-200 h-auto max-h-[393px] w-full md:w-[601px]"
              data-animate
            >
              <iframe
                className="h-full w-full"
                src={'https://www.youtube.com/embed/wyyox6pZ4K8?si=hmvdNnmSdBNcaNNu'}
                title={'YouTube video player'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Use Case Section */}
        <section id="usecase" className="relative w-full bg-[#FFF5F5] py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-black opacity-0 sm:text-4xl md:text-5xl"
            data-animate
          >
            Some of the Use cases, we’ve built
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-[1253px] grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Health Training',
                imgSrc: 'https://www.youtube.com/embed/bub_29SL4tU?si=jnLhy58iViN930VM',
                href: '#health-training',
              },
              {
                title: 'Manufacturing Simulation',
                imgSrc: 'https://www.youtube.com/embed/WXEHvnLJ5Ok?si=1kFKBZxNSf_azfMA',
                href: '#manufacturing-simulation',
              },
              {
                title: 'Auto Retail Experience',
                imgSrc: 'https://www.youtube.com/embed/3pTtgFwng5g?si=jV332s_iMp6gAJE7',
                href: '#auto-retail-experience',
              },
              {
                title: 'Furniture AR Experience',
                imgSrc: 'https://www.youtube.com/embed/_MFZfriwROs?si=IZkKN6FsNdDB-6-N',
                href: '#furniture-ar-experience',
              },
              {
                title: 'Product Visualisation',
                imgSrc: 'https://www.youtube.com/embed/oTY0XAloXjE?si=03L6uVRveNQJAJK1',
                href: '#product-visualisation',
              },
              {
                title: 'Real Estate Experience',
                imgSrc: 'https://www.youtube.com/embed/Df6coaULk9E?si=6AFwMtDngThkEMEi',
                href: '#real-estate-experience',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate-scale-in mx-auto flex w-full max-w-[400px] flex-col opacity-0"
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
                <h3 className="mt-4 text-center font-['Poppins'] text-xl leading-[42px] font-semibold text-[#001930] sm:text-2xl">
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

        {/* XR Section */}
        <section id="xr" className="relative flex w-full flex-col items-center bg-[#FFFFFF] py-16">
          <h2
            className="animate-slide-up text-center font-['Poppins'] text-3xl leading-tight font-semibold text-[#001930] sm:text-4xl md:text-5xl"
            data-animate
          >
            Where your business can leverage XR ?
          </h2>
          <div className="mx-auto mt-12 grid w-full max-w-[1721px] grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Operation',
                imgSrc: '/static/images/op.png',
                href: '#operation',
              },
              {
                title: 'Customer Experience',
                imgSrc: '/static/images/custexp.png',
                href: '#custexp',
              },
              {
                title: 'Trainings',
                imgSrc: '/static/images/training.png',
                href: '#training',
              },
              {
                title: 'Games',
                imgSrc: '/static/images/games.png',
                href: '#games',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate-scale-in mx-auto flex w-full max-w-[400px] flex-col"
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
                <h3 className="mt-4 text-center font-['Poppins'] text-xl leading-[42px] font-semibold text-[#001930] sm:text-2xl">
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

        {/* Vrook Section */}
        <section id="vrook" className="relative w-full bg-[#F6F6F6] py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">
            <div className="animate-slide-up flex-1" data-animate>
              <h2 className="font-['Poppins'] text-3xl leading-tight font-semibold text-black uppercase sm:text-4xl md:text-5xl">
                How Gamasome helped VROOK Learning to transform learning with VR / AR ?
              </h2>
              <p className="mt-8 font-['Poppins'] text-xl leading-relaxed font-normal text-black sm:text-2xl md:text-3xl">
                Are you planning for your organisation's digital transformation this FY ?
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="#metaverse"
                  className="h-[50px] w-full rounded-full bg-[#2D9CDB] text-center font-['Poppins'] text-base leading-[50px] font-semibold text-white transition hover:bg-[#1d8cbf] sm:w-[192px] sm:text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div
              className="animate-slide-in animation-delay-200 h-auto max-h-[393px] w-full md:w-[601px]"
              data-animate
            >
              <iframe
                className="h-full w-full"
                src={'https://www.youtube.com/embed/XHOmBV4js_E?si=TJl2hR6A0MjPQ2Tg'}
                title={'YouTube video player'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="relative w-full bg-white py-16 font-['Poppins']">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="animate-slide-up md:col-span-1" data-animate>
                <h2 className="font-['Poppins'] text-3xl leading-[190%] font-semibold tracking-[0.02em] text-black uppercase sm:text-4xl">
                  Blogs
                </h2>
                <p className="mt-12 max-w-full font-['Poppins'] text-base leading-[27px] font-normal tracking-[0.02em] text-black sm:max-w-[440px] sm:text-lg">
                  Everyone has a story to tell. Here is ours. Learn more about metaverse development
                  company. Learn more about Gamasome.
                </p>
              </div>
              <div className="flex flex-col gap-8 md:col-span-2">
                {[
                  {
                    title: 'The Metaverse is coming! What does it mean for your business?',
                    href: '#blog1',
                  },
                  { title: 'How AI is transforming business operations', href: '#blog2' },
                  { title: 'Spatial AI: The future of 3D modeling', href: '#blog3' },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="animate-slide-up relative flex max-w-[741px] flex-col"
                    style={{ animationDelay: `${100 + index * 100}ms` }}
                    data-animate
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="inline-block rounded-full bg-[#2D9CDB] px-4 py-1">
                          <span className="font-['Poppins'] text-base font-normal tracking-[0.02em] text-white sm:text-lg">
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
                        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2D9CDB] font-['Poppins']"
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
                  </div>
                ))}
              </div>
            </div>
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
                className="animate-scale-in flex h-[133px] w-full items-center justify-center border border-[#00FCE2]"
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
            <p className="mt-2 font-['Poppins'] text-base font-normal text-white/60 sm:text-lg">
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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
