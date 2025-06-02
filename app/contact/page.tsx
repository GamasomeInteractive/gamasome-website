/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false
    const newErrors = { name: '', email: '', message: '' }

    if (!formData.name) {
      newErrors.name = 'Name is required'
      hasError = true
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      hasError = true
    }
    if (!formData.message) {
      newErrors.message = 'Message is required'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

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
    <div className="min-h-screen font-['Poppins']">
      {/* Top Banner Section */}
      <section className="animate-fade-in relative h-[444px] w-full overflow-hidden" data-animate>
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        <div className="absolute inset-0 z-10">
          <Image
            src="/static/images/contact.png"
            alt="Contact Banner Background"
            className="h-full w-full object-cover"
            width={100}
            height={100}
            style={{ transform: 'scaleX(-1)' }}
            onError={(e) => {
              e.currentTarget.src = '/static/images/fallback.png'
            }}
          />
        </div>
        <div className="absolute inset-0 z-20 bg-black/36" />

        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          <div className="absolute top-[137px] left-4 sm:left-8 md:left-16 lg:left-40">
            <p className="font-['Poppins'] text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              HOME &gt; Contact us
            </p>
          </div>

          <div className="text-center">
            <h1 className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              Contact us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div
            className="animate-slide-up mx-auto flex max-w-[1516px] flex-col justify-center gap-12 md:flex-row md:gap-24"
            data-animate
          >
            <div className="w-full md:w-[630px]">
              <div className="mb-12">
                <h2 className="font-['Poppins'] text-2xl leading-[48px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
                  India Office
                </h2>
                <div className="my-3 h-[1px] w-[61px] bg-[#333333]" />
                <p className="font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  Gamasome Interactive, 4th floor, 7, Koramangala 80 Feet Rd, 7th Block,
                  Koramangala, Bengaluru, Karnataka 560030, India.
                </p>
                <p className="mt-4 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  contact@gamasome.com
                  <br />
                  mohan@gamasome.com
                  <br />
                  +91-9488 387561
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] sm:text-base md:w-[119px]">
                  Contact us
                </button>
              </div>
              <div className="mt-12 mb-12">
                <h2 className="font-['Poppins'] text-2xl leading-[48px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
                  USA Office
                </h2>
                <div className="my-3 h-[1px] w-[61px] bg-[#333333]" />
                <p className="font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  Gamasome Interactive, 1031, Blueberry Ct, Edison, NJ, 08817-USA.
                </p>
                <p className="mt-4 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  contact@gamasome.com
                  <br />
                  raghu@gamasome.com
                  <br />
                  +1 423-588-1956
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] sm:text-base md:w-[119px]">
                  Contact us
                </button>
              </div>
            </div>

            <div className="w-full md:w-[485px]">
              <h2 className="font-['Poppins'] text-2xl leading-[54px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
                Get in touch with us
              </h2>
              <div className="my-3 h-[1px] w-[61px] bg-[#767E7E]" />
              <p className="mb-6 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                For more info or inquiry about our products project, and pricing please feel free to
                get in touch with us.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.name && (
                    <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">
                    YOUR PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-opacity-40 w-full border-t-0 border-r-0 border-b border-l-0 border-[#463F56] bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 min-h-[57px] resize-none border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.message && (
                    <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] sm:text-base md:w-[166px]"
                >
                  Start your project
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
