'use client'

import dynamic from 'next/dynamic'

// Three.js/WebGL cannot run during SSR — must be client-only
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <HeroScene />
    </div>
  )
}
