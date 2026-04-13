import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import fs from 'fs/promises'
import path from 'path'
import { Space_Grotesk, Poppins } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import SiteShell from '@/components/SiteShell'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { MotionProvider } from '@/components/MotionProvider'
import siteMetadata from '@/data/siteMetadata'
import { HeaderDocument, FooterDocument } from '../tina/__generated__/types'
import fallbackHeader from '../content/navigation/header.json'
import fallbackFooter from '../content/navigation/footer.json'
import MicrosoftClarity from '@/components/MicrosoftClarity'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProviders } from './theme-providers'
import { buildMotionCss } from '@/lib/motion'
import { Metadata } from 'next'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

async function getNavData() {
  const header = {
    data: { header: fallbackHeader as any },
    query: HeaderDocument,
    variables: { relativePath: 'header.json' },
  }
  const footer = {
    data: { footer: fallbackFooter as any },
    query: FooterDocument,
    variables: { relativePath: 'footer.json' },
  }
  return { header, footer }
}

async function getSettings() {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), 'content/settings/index.json'),
      'utf-8',
    )
    return JSON.parse(raw) as Record<string, any>
  } catch {
    return {}
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const [{ header, footer }, settings] = await Promise.all([
    getNavData(),
    getSettings(),
  ])

  const colorScheme = (settings.colorScheme as string) || 'light'
  const motionRaw = settings.motion ?? {}
  const analyticsSettings = settings.analytics ?? {}

  const motionSettings = {
    easePreset:        ((motionRaw.easePreset as string) || 'cinematic') as 'smooth' | 'cinematic' | 'inOut' | 'snap',
    durationScale:     (motionRaw.durationScale     as number)  ?? 1.0,
    disableAnimations: (motionRaw.disableAnimations as boolean) ?? false,
  }
  const motionCss = buildMotionCss(
    motionSettings.easePreset as any,
    motionSettings.durationScale,
    motionSettings.disableAnimations,
  )

  return (
    <html
      lang={siteMetadata.language}
      className={`${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Gamasome',
            url: 'https://gamasome.com',
            logo: 'https://gamasome.com/static/images/logo.png',
            description: 'Gamasome offers AI, AR/VR, simulation, digital twins, game development, and metaverse solutions for enterprises worldwide.',
            email: 'prasanna@gamasome.com',
            sameAs: [
              'https://www.linkedin.com/company/gamasome/',
              'https://x.com/gamasome',
              'https://www.youtube.com/@gamasomeinteractive3967',
            ],
            address: [
              {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                addressLocality: 'Bengaluru',
                addressRegion: 'Karnataka',
              },
              {
                '@type': 'PostalAddress',
                addressCountry: 'US',
                addressLocality: 'Mountain View',
                addressRegion: 'CA',
              },
            ],
          }),
        }}
      />
      {analyticsSettings.gscVerification && (
        <meta name="google-site-verification" content={analyticsSettings.gscVerification} />
      )}
      {/* Layer 1: inject CMS-controlled motion tokens as CSS custom properties */}
      <style href="motion-tokens" precedence="default" dangerouslySetInnerHTML={{ __html: motionCss }} />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        {analyticsSettings.ga4Id && (
          <GoogleAnalytics measurementId={analyticsSettings.ga4Id} />
        )}
        {analyticsSettings.clarityId && (
          <MicrosoftClarity projectId={analyticsSettings.clarityId} />
        )}
        <SmoothScrollProvider>
          <ThemeProviders colorScheme={colorScheme}>
            {/* Layer 2: provide CMS motion settings to Framer Motion components */}
            <MotionProvider settings={motionSettings}>
              <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
              {/* <SectionContainer> */}
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <SiteShell
                  headerData={header.data}  headerQuery={header.query}  headerVars={header.variables}
                  footerData={footer.data}  footerQuery={footer.query}  footerVars={footer.variables}
                >{children}</SiteShell>
              </SearchProvider>
              {/* </SectionContainer> */}
            </MotionProvider>
          </ThemeProviders>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
