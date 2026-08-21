import { ImageResponse } from 'next/og'
import siteMetadata from '@/data/siteMetadata'

// Shared Open Graph card. Route segments re-export this from their own opengraph-image.tsx —
// Next.js only applies the file convention to a segment that declares it, and any route
// setting its own `openGraph` object otherwise ships with no image at all.
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Gamasome — Physical AI & Robotics Data'

/** Renders the branded card. `heading` lets a segment label itself. */
export function renderOgCard(heading = 'Physical AI & Robotics Data') {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#07091B',
        padding: '72px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#00FCE2' }} />
        <div
          style={{
            color: '#00FCE2',
            fontSize: 26,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Gamasome
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#FFFFFF', fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          {heading}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.62)',
            fontSize: 30,
            marginTop: 24,
            lineHeight: 1.35,
          }}
        >
          Robotics data collection · Data annotation · Robotics engineering
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 24 }}>
          {siteMetadata.siteUrl.replace('https://', '')}
        </div>
        <div
          style={{
            width: 220,
            height: 6,
            background: 'linear-gradient(to right, #2D9CDB, #00FCE2)',
          }}
        />
      </div>
    </div>,
    size
  )
}
