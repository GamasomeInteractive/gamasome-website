'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { dur as defaultDur, triggerMargin } from '@/lib/motion'
import { useMotionConfig } from '@/components/MotionProvider'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

interface DirectionalAnimationProps extends AnimatedSectionProps {
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number
}

const getDirectionalOffset = (direction: string, distance: number) => {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 }
    case 'right':
      return { x: distance, y: 0 }
    case 'up':
      return { x: 0, y: -distance }
    default:
      return { x: 0, y: distance }
  }
}

// ── Layer 2: JavaScript-controlled motion ──────────────────────────────────
// Each component uses useReducedMotion() to bail out gracefully.

export const FadeIn = ({ children, className = '', delay = 0, duration }: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: triggerMargin })
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()

  const d = duration ?? motion_.dur.cinematic
  if (reduced || motion_.settings.disableAnimations)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: d, delay, ease: motion_.ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const SlideFrom = ({
  children,
  className = '',
  delay = 0,
  duration,
  direction = 'down',
  distance = 120,
}: DirectionalAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: triggerMargin })
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()
  const offset = getDirectionalOffset(direction, distance)

  const d = duration ?? motion_.dur.cinematic
  if (reduced || motion_.settings.disableAnimations)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: d, delay, ease: motion_.ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const SlideFromLeft = (props: Omit<DirectionalAnimationProps, 'direction'>) => (
  <SlideFrom {...props} direction="left" />
)
export const SlideFromRight = (props: Omit<DirectionalAnimationProps, 'direction'>) => (
  <SlideFrom {...props} direction="right" />
)
export const SlideFromBottom = (props: Omit<DirectionalAnimationProps, 'direction'>) => (
  <SlideFrom {...props} direction="down" />
)
export const SlideFromTop = (props: Omit<DirectionalAnimationProps, 'direction'>) => (
  <SlideFrom {...props} direction="up" />
)

export const SlideIn = ({
  children,
  className = '',
  delay = 0,
  duration,
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: triggerMargin })
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()

  const d = duration ?? motion_.dur.cinematic
  if (reduced || motion_.settings.disableAnimations)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -70 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
      transition={{ duration: d, delay, ease: motion_.ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const ScaleIn = ({
  children,
  className = '',
  delay = 0,
  duration,
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: triggerMargin })
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()

  const d = duration ?? motion_.dur.slow
  if (reduced || motion_.settings.disableAnimations)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: d, delay, ease: motion_.ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.25,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: triggerMargin })
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()

  if (reduced || motion_.settings.disableAnimations)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className = '' }: AnimatedSectionProps) => {
  const reduced = useReducedMotion()
  const motion_ = useMotionConfig()

  if (reduced || motion_.settings.disableAnimations)
    return <div className={className}>{children}</div>

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: motion_.dur.slow, ease: motion_.ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Keep for backwards compat — callers may import dur from here
export { defaultDur as dur }
