'use client'
import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then((m) => m.NextStudio), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#101112]">
      <div className="text-white/40">Loading Gamasome Studio…</div>
    </div>
  ),
})

export default function StudioPage() {
  return <NextStudio config={config} />
}

// Exclude from static export
export function generateStaticParams() {
  return []
}
