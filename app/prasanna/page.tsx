import type { Metadata } from 'next'
import SchedulePageView from './SchedulePageView'
import scheduleData from '../../content/pages/schedule.json'

export const metadata: Metadata = {
  // absolute: this title already carries the brand, so bypass the
  // `%s | Gamasome` template in app/layout.tsx rather than doubling it.
  title: { absolute: 'Schedule a Meeting | Gamasome' },
  description:
    'Book a 30-minute meeting with Gamasome. Pick an available time and get a Google Meet invite automatically.',
  alternates: { canonical: 'https://www.gamasome.com/prasanna/' },
  openGraph: {
    title: 'Schedule a Meeting | Gamasome',
    description:
      'Book a 30-minute meeting with Gamasome. Pick an available time and get a Google Meet invite automatically.',
    url: 'https://www.gamasome.com/prasanna/',
    type: 'website',
  },
}

export default async function SchedulePage() {
  return <SchedulePageView page={scheduleData} />
}
