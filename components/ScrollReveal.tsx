'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { ease } from '@/lib/motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

// ── Layer 2: scroll-linked transforms ─────────────────────────────────────
// Progress-driven opacity/translate/scale values that respond to scroll
// position in real time — distinct from the one-shot viewport triggers
// in AnimatedSection.

export const ScrollFadeOut = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay, ease: ease.smooth }}
    >
      {children}
    </motion.div>
  )
}

export const ScrollFadeIn = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      transition={{ duration: 1.2, delay, ease: ease.inOut }}
    >
      {children}
    </motion.div>
  )
}

export const ScrollScale = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
      transition={{ duration: 1.2, delay, ease: ease.inOut }}
    >
      {children}
    </motion.div>
  )
}

export const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5,
  delay = 0,
}: ScrollRevealProps & { speed?: number }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: ease.smooth }}
    >
      {children}
    </motion.div>
  )
}

export const StickyReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.92])

  if (reduced) {
    return (
      <div className="relative h-[200vh]">
        <div className={`sticky top-0 flex h-screen items-center justify-center ${className}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.div
        style={{ opacity, scale }}
        className={`sticky top-0 flex h-screen items-center justify-center ${className}`}
        transition={{ duration: 1.2, delay, ease: ease.inOut }}
      >
        {children}
      </motion.div>
    </div>
  )
}
