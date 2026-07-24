import type { Metadata } from 'next'
import SchedulePageView from './SchedulePageView'
import { ContactDocument } from '../../tina/__generated__/types'
import fallbackPage from '../../content/pages/contact.json'

// Prasanna's public Google Calendar Appointment Schedule (the `/u/0/` segment is
// omitted so the booking page works for any visitor, not just the account owner).
const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ11h2id_uYILCwvKKc-i7SMPChaQwq2NvQ7mZD9uT_Q-8AgvWTsiUPxCD74RbMPJyqigBH4Gfzk'

export const metadata: Metadata = {
  title: 'Schedule a Meeting | Gamasome',
  description:
    'Book a 30-minute meeting with Gamasome. Pick an available time and get a Google Meet invite automatically.',
  alternates: { canonical: 'https://www.gamasome.com/prasanna' },
  openGraph: {
    title: 'Schedule a Meeting | Gamasome',
    description:
      'Book a 30-minute meeting with Gamasome. Pick an available time and get a Google Meet invite automatically.',
    url: 'https://www.gamasome.com/prasanna',
    type: 'website',
  },
}

export default async function SchedulePage() {
  return (
    <SchedulePageView
      pageData={{ contact: fallbackPage as any }}
      pageQuery={ContactDocument}
      pageVars={{ relativePath: 'contact.json' }}
      bookingUrl={BOOKING_URL}
      bookingHeading="Book a Meeting with Prasanna"
      bookingDescription="Pick a 30-minute slot that works for you — a Google Meet link is added to the invite automatically."
    />
  )
}
