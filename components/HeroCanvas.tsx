'use client'

import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'

interface HeroCanvasProps {
  primaryColor?: string
  accentColor?: string
}

// Three.js/WebGL cannot run during SSR — must be client-only
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
})

// ── Layer 3: WebGL rendering layer ─────────────────────────────────────────
// Skipped entirely when the user prefers reduced motion — the hero section
// remains fully functional without the 3D scene.
export default function HeroCanvas({ primaryColor, accentColor }: HeroCanvasProps) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <HeroScene primaryColor={primaryColor} accentColor={accentColor} />
    </div>
  )
}
