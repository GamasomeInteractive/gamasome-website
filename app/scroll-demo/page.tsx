'use client'

import {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import {
  ScrollFadeOut,
  ScrollFadeIn,
  ScrollScale,
  ParallaxSection,
  StickyReveal,
} from '@/components/ScrollReveal'

export default function ScrollDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Fades out on scroll */}
      <ScrollFadeOut className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-center">
          <FadeIn>
            <h1 className="mb-4 text-6xl font-bold text-white">Smooth Scroll Demo</h1>
            <p className="text-2xl text-white/80">Scroll down to see magic ✨</p>
          </FadeIn>
        </div>
      </ScrollFadeOut>

      {/* Fade In Section */}
      <ScrollFadeIn className="flex min-h-screen items-center justify-center bg-white py-20">
        <div className="max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-5xl font-bold text-black">Content Fades In</h2>
          <p className="text-xl text-gray-600">
            This section smoothly fades in and out as you scroll through it
          </p>
        </div>
      </ScrollFadeIn>

      {/* Scale Section */}
      <ScrollScale className="flex min-h-screen items-center justify-center bg-gray-100 py-20">
        <div className="max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-5xl font-bold text-black">Scale Animation</h2>
          <p className="text-xl text-gray-600">
            This content scales in and out based on scroll position
          </p>
        </div>
      </ScrollScale>

      {/* Parallax Section */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 to-pink-500 py-20">
        <ParallaxSection speed={0.5} className="flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="mb-6 text-5xl font-bold">Parallax Effect</h2>
            <p className="text-xl">This moves at a different speed than the scroll</p>
          </div>
        </ParallaxSection>
      </div>

      {/* Stagger Animation */}
      <div className="min-h-screen bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <h2 className="mb-12 text-center text-5xl font-bold text-black">Staggered Cards</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 p-8 text-white shadow-xl">
                  <h3 className="mb-4 text-2xl font-bold">Card {item}</h3>
                  <p>These cards appear one by one with smooth stagger effect</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Sticky Reveal Section */}
      <StickyReveal className="bg-gradient-to-br from-orange-500 to-red-500">
        <div className="text-center text-white">
          <h2 className="mb-6 text-6xl font-bold">Sticky Section</h2>
          <p className="text-2xl">This stays in place while you scroll</p>
        </div>
      </StickyReveal>

      {/* Final Section */}
      <ScrollFadeIn className="flex min-h-screen items-center justify-center bg-black py-20">
        <div className="text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">The End</h2>
          <p className="text-xl text-white/70">Smooth scrolling like Lucio ✨</p>
        </div>
      </ScrollFadeIn>
    </div>
  )
}
