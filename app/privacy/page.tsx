import type { Metadata } from 'next'
import LegalPageView, { type LegalPage } from '@/components/LegalPageView'
import content from '../../content/pages/legal/privacy.json'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How gamasome.com handles your data: what the contact form, newsletter and analytics collect, who it is shared with, and how to reach us about it.',
  alternates: { canonical: 'https://www.gamasome.com/privacy/' },
  openGraph: {
    title: 'Privacy Policy | Gamasome',
    description:
      'How gamasome.com handles your data: what the contact form, newsletter and analytics collect, who it is shared with, and how to reach us about it.',
    url: 'https://www.gamasome.com/privacy/',
    type: 'website',
  },
}

export default function Page() {
  return <LegalPageView page={content as LegalPage} />
}
