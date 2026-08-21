import type { Metadata } from 'next'
import LegalPageView, { type LegalPage } from '@/components/LegalPageView'
import content from '../../content/pages/legal/refunds.json'

export const metadata: Metadata = {
  title: 'Refunds & Cancellations',
  description:
    'How Gamasome engagements are contracted, and where cancellation and refund terms for your project are defined.',
  alternates: { canonical: 'https://www.gamasome.com/refunds/' },
  openGraph: {
    title: 'Refunds & Cancellations | Gamasome',
    description:
      'How Gamasome engagements are contracted, and where cancellation and refund terms for your project are defined.',
    url: 'https://www.gamasome.com/refunds/',
    type: 'website',
  },
}

export default function Page() {
  return <LegalPageView page={content as LegalPage} />
}
