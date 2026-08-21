import type { Metadata } from 'next'
import AboutPageView from './AboutPageView'
import { AboutDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/about.json'

export const metadata: Metadata = {
  // absolute: this title already carries the brand, so bypass the
  // `%s | Gamasome` template in app/layout.tsx rather than doubling it.
  title: { absolute: 'About Gamasome | Physical AI & Robotics Data Company' },
  description:
    'Gamasome has built simulation, AR/VR and computer-vision software since 2014. We now focus on Physical AI: robotics data collection, annotation and engineering.',
  alternates: { canonical: 'https://www.gamasome.com/about/' },
  openGraph: {
    title: 'About Gamasome | Physical AI & Robotics Data Company',
    description:
      'Gamasome has built simulation, AR/VR and computer-vision software since 2014. We now focus on Physical AI: robotics data collection, annotation and engineering.',
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
