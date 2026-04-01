import type { Metadata } from 'next'
import ContactPageView from './ContactPageView'
import { ContactDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/contact.json'

export const metadata: Metadata = {
  title: 'Contact Gamasome | AI, AR/VR & Simulation Experts',
  description:
    'Get in touch with Gamasome. Offices in Bengaluru, India and Mountain View, USA. Contact us for AI, AR/VR, simulation, and digital twin development projects.',
  alternates: { canonical: 'https://gamasome.com/contact' },
  openGraph: {
    title: 'Contact Gamasome | AI, AR/VR & Simulation Experts',
    description:
      'Get in touch with Gamasome. Offices in Bengaluru, India and Mountain View, USA. Contact us for AI, AR/VR, simulation, and digital twin development projects.',
    url: 'https://gamasome.com/contact',
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
