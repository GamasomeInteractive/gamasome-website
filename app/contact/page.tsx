import type { Metadata } from 'next'
import ContactPageView from './ContactPageView'
import { ContactDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/contact.json'

export const metadata: Metadata = {
  // absolute: this title already carries the brand, so bypass the
  // `%s | Gamasome` template in app/layout.tsx rather than doubling it.
  title: { absolute: 'Contact Gamasome | Physical AI, Robotics & Simulation' },
  description:
    'Get in touch with Gamasome. Offices in Bengaluru, India and Mountain View, USA. Talk to us about Physical AI data, robotics, simulation and AR/VR projects.',
  alternates: { canonical: 'https://www.gamasome.com/contact/' },
  openGraph: {
    title: 'Contact Gamasome | Physical AI, Robotics & Simulation',
    description:
      'Get in touch with Gamasome. Offices in Bengaluru, India and Mountain View, USA. Talk to us about Physical AI data, robotics, simulation and AR/VR projects.',
    url: 'https://www.gamasome.com/contact/',
    type: 'website',
  },
}

export default async function ContactPage() {
  return (
    <ContactPageView
      pageData={{ contact: fallbackPage as any }}
      pageQuery={ContactDocument}
      pageVars={{ relativePath: 'contact.json' }}
    />
  )
}
