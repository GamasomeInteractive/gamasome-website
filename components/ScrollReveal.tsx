'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const ScrollFadeOut = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  )
}

export const ScrollFadeIn = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export const ScrollScale = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay }}
    >
      {children}
    </motion.div>
  )
}

export const StickyReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.92])

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.div
        style={{ opacity, scale }}
        className={`sticky top-0 flex h-screen items-center justify-center ${className}`}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
