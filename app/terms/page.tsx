import type { Metadata } from 'next'
import LegalPageView, { type LegalPage } from '@/components/LegalPageView'
import content from '../../content/pages/legal/terms.json'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms covering use of gamasome.com, our content and links. Client work is governed by the signed agreement for each engagement.',
  alternates: { canonical: 'https://www.gamasome.com/terms/' },
  openGraph: {
    title: 'Terms & Conditions | Gamasome',
    description:
      'Terms covering use of gamasome.com, our content and links. Client work is governed by the signed agreement for each engagement.',
    url: 'https://www.gamasome.com/terms/',
    type: 'website',
  },
}

export default function Page() {
  return <LegalPageView page={content as LegalPage} />
}
