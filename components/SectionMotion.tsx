'use client'

import { ReactNode } from 'react'
import { MotionProvider } from '@/components/MotionProvider'
import { cssEase } from '@/lib/motion'
import type { MotionSettings } from '@/components/MotionProvider'

interface SectionMotionData {
  easePreset?: string
  durationScale?: number
}

interface Props {
  motion?: SectionMotionData | null
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  as?: keyof React.JSX.IntrinsicElements
}

// Cast to a permissive element type so TypeScript allows className/style/children
// on any HTML element string (section, div, article, etc.)
type AnyTag = React.ElementType<{ id?: string; className?: string; style?: React.CSSProperties; children?: ReactNode }>

/**
 * Wraps a page section with scoped motion overrides.
 *
 * - CSS custom properties  →  Layer 1 (CSS animations / transition-ui classes)
 * - Nested MotionProvider  →  Layer 2 (Framer Motion AnimatedSection components)
 *
 * If no motion data is set, renders a plain wrapper with no overhead.
 */
export default function SectionMotion({
  motion,
  children,
  className,
  style,
  id,
  as: Tag = 'section',
}: Props) {
  const hasEase  = !!motion?.easePreset && motion.easePreset !== '' && motion.easePreset !== 'inherit'
  const hasScale = !!motion?.durationScale && motion.durationScale !== 1

  const T = Tag as AnyTag

  // No override — skip both the MotionProvider and inline styles
  if (!hasEase && !hasScale) {
    return <T id={id} className={className} style={style}>{children}</T>
  }

  const scale = motion?.durationScale ?? 1
  const cssVars: React.CSSProperties = {}

  if (hasEase) {
    const preset = motion!.easePreset as keyof typeof cssEase
    ;(cssVars as Record<string, string>)['--motion-ease'] = cssEase[preset] ?? cssEase.cinematic
  }
  if (hasScale) {
    ;(cssVars as Record<string, string>)['--motion-instant']   = `${Math.round(100  * scale)}ms`
    ;(cssVars as Record<string, string>)['--motion-fast']      = `${Math.round(250  * scale)}ms`
    ;(cssVars as Record<string, string>)['--motion-normal']    = `${Math.round(500  * scale)}ms`
    ;(cssVars as Record<string, string>)['--motion-slow']      = `${Math.round(900  * scale)}ms`
    ;(cssVars as Record<string, string>)['--motion-cinematic'] = `${Math.round(2400 * scale)}ms`
  }

  const settings: Partial<MotionSettings> = {}
  if (hasEase)  settings.easePreset    = motion!.easePreset as MotionSettings['easePreset']
  if (hasScale) settings.durationScale = scale

  return (
    <MotionProvider settings={settings}>
      <T id={id} className={className} style={{ ...style, ...cssVars }}>
        {children}
      </T>
    </MotionProvider>
  )
}
