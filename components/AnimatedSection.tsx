'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

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

// Lucio-style easing curves - ultra smooth and elegant (very slow, cinematic)
const lucioEasingOut: [number, number, number, number] = [0.22, 1.3, 0.36, 1.3] // Very smooth ease out

// Get initial position based on direction
const getDirectionalOffset = (direction: string, distance: number) => {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 }
    case 'right':
      return { x: distance, y: 0 }
    case 'up':
      return { x: 0, y: -distance }
    case 'down':
    default:
      return { x: 0, y: distance }
  }
}

export const FadeIn = ({
  children,
  className = '',
  delay = 0,
  duration = 2.4,
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: lucioEasingOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Directional slide animation - content comes from different positions
export const SlideFrom = ({
  children,
  className = '',
  delay = 0,
  duration = 2.4,
  direction = 'down',
  distance = 120,
}: DirectionalAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const offset = getDirectionalOffset(direction, distance)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: duration,
        delay: delay,
        ease: lucioEasingOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Convenience components for each direction
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
  duration = 2.4,
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -70 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: lucioEasingOut,
      }}
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
  duration = 2.2,
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: lucioEasingOut,
      }}
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className = '' }: AnimatedSectionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 2.2,
            ease: lucioEasingOut,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
