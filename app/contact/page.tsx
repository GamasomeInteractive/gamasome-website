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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
        setTimeout(() => setSubmitStatus('idle'), 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwD1GRUEx9yKwcnT-JFgx7dw_tRb5v6NDGmpUuXip97ALo1xcSNNZQ01sIGgokj-rmM/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
      {/* Toast Notification */}
      {submitStatus !== 'idle' && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-lg px-5 py-4 shadow-lg transition-all duration-300 ${
            showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } ${submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            {submitStatus === 'success' ? (
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <span className="font-['Poppins'] text-sm font-medium text-white">
            {submitStatus === 'success'
              ? 'Message sent successfully!'
              : 'Failed to send message. Please try again.'}
          </span>
          <button
            onClick={() => {
              setShowToast(false)
              setTimeout(() => setSubmitStatus('idle'), 300)
            }}
            className="ml-2 text-white/70 hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Top Banner Section */}
      <section
        className="animate-fade-in relative h-[444px] w-full overflow-hidden opacity-0"
        data-animate
      >
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
            className="animate-slide-from-left mx-auto flex max-w-[1516px] flex-col justify-center gap-12 opacity-0 md:flex-row md:gap-24"
            data-animate
          >
            <div className="w-full md:w-[630px]">
              <div className="mb-12">
                <h2 className="font-['Poppins'] text-2xl leading-[48px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
                  India Office
                </h2>
                <div className="my-3 h-[1px] w-[61px] bg-[#333333]" />
                <p className="font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  No.1794, 36/3, 27th Main Rd, near Power Station, 2nd Sector, ITI Layout, 7th
                  Sector, HSR Layout, Bengaluru, Karnataka 560102, India
                </p>
                <p className="mt-4 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  prasanna@gamasome.com
                  <br />
                  +91 8012223541
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
                  599 Fairchild Dr, Mountain View, CA 94043
                </p>
                <p className="mt-4 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                  prasanna@gamasome.com
                  <br />
                  +1 (530) 364-8775
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] sm:text-base md:w-[119px]">
                  Contact us
                </button>
              </div>

              <div className="mt-12">
                <h2 className="font-['Poppins'] text-2xl leading-[48px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl">
                  Follow Us
                </h2>
                <div className="my-3 h-[1px] w-[61px] bg-[#333333]" />
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/company/gamasome/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D9CDB] text-white transition-colors hover:bg-[#1e7ba8]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@gamasomeinteractive3967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D9CDB] text-white transition-colors hover:bg-[#1e7ba8]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/gamasome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D9CDB] text-white transition-colors hover:bg-[#1e7ba8]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div
              className="animate-slide-from-right w-full opacity-0 md:w-[485px]"
              data-animate
              style={{ animationDelay: '200ms' }}
            >
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
                  disabled={isSubmitting}
                  className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base md:w-[166px]"
                >
                  {isSubmitting ? 'Sending...' : 'Start your project'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        [data-animate].animate {
          animation-play-state: running;
        }
        [data-animate] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
