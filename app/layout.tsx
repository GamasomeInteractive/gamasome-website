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
    // Suffix, not the full default title: siteMetadata.title is now the descriptive
    // globalSeo.defaultTitle, so `%s | ${siteMetadata.title}` would render page titles
    // like 'About | Gamasome — Physical AI & Robotics Data Solutions'.
    template: `%s${siteMetadata.titleSuffix}`,
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
    // No `canonical` here on purpose: a canonical set in the root layout is inherited by
    // every route that does not override it, which had /blog/, /tags/ and six other pages
    // declaring themselves duplicates of the homepage. Routes now set their own; those
    // that set none self-canonicalise, which is the correct default.
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
    // No `title` here: a static one is inherited by every page that does not set its
    // own, which had About, Contact, Services, the legal pages and /prasanna/ all
    // sharing the site default on X. Omitting it lets Next fall back to the resolved
    // page title. Card, handles and image below are unchanged.
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    creator: siteMetadata.twitterHandle,
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
    const raw = await fs.readFile(path.join(process.cwd(), 'content/settings/index.json'), 'utf-8')
    return JSON.parse(raw) as Record<string, any>
  } catch {
    return {}
  }
}

// Pages with their own header/footer (rendered via AIPlatformView).
// SiteShell uses this list to suppress the global TinaHeader/TinaFooter
// to avoid double headers/footers.
async function getBareSlugs(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'content/pages/services')
    const files = await fs.readdir(dir)
    const slugs: string[] = []
    for (const f of files) {
      if (!f.endsWith('.json')) continue
      const raw = await fs.readFile(path.join(dir, f), 'utf-8')
      try {
        const json = JSON.parse(raw)
        if (json._template === 'aiPlatform') {
          slugs.push(f.replace('.json', ''))
        }
      } catch {
        // A malformed service JSON should not break the whole nav; skip that file.
      }
    }
    return slugs
  } catch {
    return []
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const [{ header, footer }, settings, bareSlugs] = await Promise.all([
    getNavData(),
    getSettings(),
    getBareSlugs(),
  ])
  const homePage = (settings.homePage as string) || ''

  const colorScheme = (settings.colorScheme as string) || 'light'
  const motionRaw = settings.motion ?? {}
  const analyticsSettings = settings.analytics ?? {}

  const motionSettings = {
    easePreset: ((motionRaw.easePreset as string) || 'cinematic') as
      | 'smooth'
      | 'cinematic'
      | 'inOut'
      | 'snap',
    durationScale: (motionRaw.durationScale as number) ?? 1.0,
    disableAnimations: (motionRaw.disableAnimations as boolean) ?? false,
  }
  const motionCss = buildMotionCss(
    motionSettings.easePreset as any,
    motionSettings.durationScale,
    motionSettings.disableAnimations
  )

  return (
    <html
      lang={siteMetadata.language}
      className={`${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
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
              // www host throughout: the bare domain permanently redirects, and mixed hosts
              // split the entity signal between two URLs.
              url: siteMetadata.siteUrl,
              logo: `${siteMetadata.siteUrl}/static/images/logo.png`,
              description: siteMetadata.description,
              email: siteMetadata.email,
              // Only capabilities the site actually documents on its own service pages.
              knowsAbout: [
                'Physical AI',
                'Robotics data collection',
                'Data annotation',
                'Teleoperation',
                'LiDAR annotation',
                'Multimodal sensor data',
                'Robotics engineering',
                'Simulation and digital twins',
              ],
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
          // Google expects the bare token; a pasted `google-site-verification=` prefix makes
          // the tag invalid and verification silently fails. Strip it defensively.
          <meta
            name="google-site-verification"
            content={String(analyticsSettings.gscVerification).replace(
              /^google-site-verification=/,
              ''
            )}
          />
        )}
        {/* Layer 1: inject CMS-controlled motion tokens as CSS custom properties */}
        <style
          href="motion-tokens"
          precedence="default"
          dangerouslySetInnerHTML={{ __html: motionCss }}
        />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        {analyticsSettings.ga4Id && <GoogleAnalytics measurementId={analyticsSettings.ga4Id} />}
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
                  headerData={header.data}
                  headerQuery={header.query}
                  headerVars={header.variables}
                  footerData={footer.data}
                  footerQuery={footer.query}
                  footerVars={footer.variables}
                  bareSlugs={bareSlugs}
                  homePageIsBare={bareSlugs.includes(homePage)}
                >
                  {children}
                </SiteShell>
              </SearchProvider>
              {/* </SectionContainer> */}
            </MotionProvider>
          </ThemeProviders>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
