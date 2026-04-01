'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ease, dur, getEffectiveMotion } from '@/lib/motion'

// ── Motion config shape ────────────────────────────────────────────────────

export interface MotionSettings {
  easePreset: keyof typeof ease
  durationScale: number
  disableAnimations: boolean
}

interface ResolvedMotion {
  settings: MotionSettings
  /** Effective ease bezier — pass directly to Framer Motion transition.ease */
  ease: readonly [number, number, number, number]
  /** Effective durations in seconds — pass to Framer Motion transition.duration */
  dur: ReturnType<typeof getEffectiveMotion>['dur']
}

const defaults: MotionSettings = {
  easePreset: 'cinematic',
  durationScale: 1.0,
  disableAnimations: false,
}

const MotionContext = createContext<ResolvedMotion>({
  settings: defaults,
  ease: ease.cinematic,
  dur: getEffectiveMotion('cinematic', 1.0).dur,
})

// ── Hook ──────────────────────────────────────────────────────────────────

export function useMotionConfig(): ResolvedMotion {
  return useContext(MotionContext)
}

// ── Provider ──────────────────────────────────────────────────────────────

export function MotionProvider({
  children,
  settings,
}: {
  children: ReactNode
  settings?: Partial<MotionSettings>
}) {
  // Inherit from parent context so nested providers only override what they specify.
  // e.g. a section that sets easePreset still inherits disableAnimations from global.
  const parent = useContext(MotionContext)
  const merged: MotionSettings = { ...parent.settings, ...settings }
  const resolved = getEffectiveMotion(merged.easePreset, merged.durationScale)

  return (
    <MotionContext.Provider
      value={{ settings: merged, ease: resolved.ease, dur: resolved.dur }}
    >
      {children}
    </MotionContext.Provider>
  )
}
