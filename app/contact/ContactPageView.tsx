'use client'
import { useTina, tinaField } from 'tinacms/dist/react'
import { normalizeTinaImages } from '@/lib/normalizeTinaImages'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { SlideFromLeft, SlideFromRight } from '@/components/AnimatedSection'

type Props = {
  pageData: any
  pageQuery: string
  pageVars: object
}

export default function ContactPageView({ pageData, pageQuery, pageVars }: Props) {
  const { data: rawData } = useTina({ data: pageData, query: pageQuery, variables: pageVars })
  const data = normalizeTinaImages(rawData)
  const page = data.contact

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (submitStatus !== 'idle') {
      setShowToast(true)
      const t = setTimeout(() => {
        setShowToast(false)
        setTimeout(() => setSubmitStatus('idle'), 300)
      }, 4000)
      return () => clearTimeout(t)
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
    if (!formData.name) { newErrors.name = 'Name is required'; hasError = true }
    if (!formData.email) { newErrors.email = 'Email is required'; hasError = true }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Invalid email format'; hasError = true }
    if (!formData.message) { newErrors.message = 'Message is required'; hasError = true }
    if (hasError) { setErrors(newErrors); return }

    setIsSubmitting(true)
    const endpoint = page?.form?.formEndpoint || ''
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!page) return null

  const { hero, offices, form } = page

  return (
    <div className="min-h-screen font-['Poppins']">

      {/* Toast */}
      {submitStatus !== 'idle' && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-lg px-5 py-4 shadow-lg transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <span className="font-['Poppins'] text-sm font-medium text-white">
            {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
          </span>
          <button onClick={() => { setShowToast(false); setTimeout(() => setSubmitStatus('idle'), 300) }} className="ml-2 text-white/70 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative h-[444px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        {hero?.bannerImage && (
          <div className="absolute inset-0 z-10" data-tina-field={tinaField(hero, 'bannerImage')}>
            <Image
              src={hero.bannerImage}
              alt="Contact Banner"
              className="h-full w-full object-cover"
              fill
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="absolute inset-0 z-20 bg-black/36" />
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          {hero?.breadcrumb && (
            <div className="absolute top-[137px] left-4 sm:left-8 md:left-16 lg:left-40">
              <p
                className="font-['Poppins'] text-sm leading-[180%] font-normal tracking-[0.02em] text-white"
                data-tina-field={tinaField(hero, 'breadcrumb')}
              >
                {hero.breadcrumb}
              </p>
            </div>
          )}
          <div className="text-center">
            <h1
              className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]"
              data-tina-field={tinaField(hero, 'title')}
            >
              {hero?.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ──────────────────────────────────────────── */}
      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-[1516px] flex-col justify-center gap-12 md:flex-row md:gap-24">

            {/* Left — offices */}
            <SlideFromLeft className="w-full md:w-[630px]">
              {offices?.map((office: any, i: number) => (
                <div key={i} className={i > 0 ? 'mt-12' : ''}>
                  <h2
                    className="font-['Poppins'] text-2xl leading-[48px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl"
                    data-tina-field={tinaField(office, 'name')}
                  >
                    {office.name}
                  </h2>
                  <div className="my-3 h-[1px] w-[61px] bg-[#333333]" />
                  <p
                    className="font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base"
                    data-tina-field={tinaField(office, 'address')}
                  >
                    {office.address}
                  </p>
                  <p className="mt-4 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base">
                    <a href={`mailto:${office.email}`} data-tina-field={tinaField(office, 'email')}>{office.email}</a>
                    <br />
                    <span data-tina-field={tinaField(office, 'phone')}>{office.phone}</span>
                  </p>
                  {office.mapsUrl && (
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block h-[45px] w-full rounded-[4px] bg-[#2D9CDB] text-center font-['Poppins'] text-sm leading-[45px] font-normal text-white transition hover:bg-[#1e7ba8] sm:text-base md:w-[119px]"
                    >
                      View Map
                    </a>
                  )}
                </div>
              ))}
            </SlideFromLeft>

            {/* Right — form */}
            <SlideFromRight className="w-full md:w-[485px]">
              {form?.heading && (
                <h2
                  className="font-['Poppins'] text-2xl leading-[54px] font-semibold tracking-[0.02em] text-[#333333] sm:text-3xl md:text-4xl"
                  data-tina-field={tinaField(form, 'heading')}
                >
                  {form.heading}
                </h2>
              )}
              <div className="my-3 h-[1px] w-[61px] bg-[#767E7E]" />
              {form?.description && (
                <p
                  className="mb-6 font-['Poppins'] text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333] sm:text-base"
                  data-tina-field={tinaField(form, 'description')}
                >
                  {form.description}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">YOUR NAME *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.name && <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">YOUR EMAIL *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.email && <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.email}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">YOUR PHONE</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="border-opacity-40 w-full border-t-0 border-r-0 border-b border-l-0 border-[#463F56] bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm"
                  />
                </div>
                {/* Message */}
                <div>
                  <label className="block font-['Poppins'] text-xs leading-[180%] font-normal tracking-[0.02em] text-[#333333] sm:text-sm">YOUR MESSAGE *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={3}
                    className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-[#463F56]'} border-opacity-40 min-h-[57px] resize-none border-t-0 border-r-0 border-l-0 bg-transparent py-3 font-['Poppins'] text-xs text-[#333333] shadow-none focus:border-[#2D9CDB] focus:outline-none sm:text-sm`}
                  />
                  {errors.message && <p className="mt-1 font-['Poppins'] text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[45px] w-full rounded-[4px] bg-[#2D9CDB] font-['Poppins'] text-sm leading-[105%] font-normal tracking-[-0.025em] text-white transition-colors hover:bg-[#1e7ba8] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base md:w-[166px]"
                  data-tina-field={tinaField(form, 'submitText')}
                >
                  {isSubmitting ? 'Sending...' : (form?.submitText || 'Start your project')}
                </button>
              </form>
            </SlideFromRight>
          </div>
        </div>
      </section>
    </div>
  )
}
