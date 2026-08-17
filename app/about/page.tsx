import type { Metadata } from 'next'
import AboutPageView from './AboutPageView'
import { AboutDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/about.json'

export const metadata: Metadata = {
  title: 'About Gamasome | AI, AR/VR & Simulation Studio Since 2014',
  description:
    'Gamasome is an innovation-driven studio incorporated in 2014. We build AI, AR/VR, simulation, digital twins, and metaverse solutions used by millions worldwide.',
  alternates: { canonical: 'https://www.gamasome.com/about/' },
  openGraph: {
    title: 'About Gamasome | AI, AR/VR & Simulation Studio Since 2014',
    description:
      'Gamasome is an innovation-driven studio incorporated in 2014. We build AI, AR/VR, simulation, digital twins, and metaverse solutions used by millions worldwide.',
    url: 'https://www.gamasome.com/about/',
    type: 'website',
  },
}

export default async function AboutPage() {
  return (
    <AboutPageView
      pageData={{ about: fallbackPage as any }}
      pageQuery={AboutDocument}
      pageVars={{ relativePath: 'about.json' }}
    />
  )
}
