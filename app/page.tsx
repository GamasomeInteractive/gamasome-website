import fs from 'fs/promises'
import path from 'path'
// HOME_SLUG: to change the home page, update the HOME_SLUG constant in this file
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ServicePageView from '@/components/ServicePageView'
import AIPlatformView from './ai-platform/AIPlatformView'
import { HeaderDocument, FooterDocument, ServicePageDocument } from '../tina/__generated__/types'
import fallbackHeader from '../content/navigation/header.json'
import fallbackFooter from '../content/navigation/footer.json'

const SERVICES_DIR = path.join(process.cwd(), 'content/pages/services')
const SETTINGS_FILE = path.join(process.cwd(), 'content/settings/index.json')
const FALLBACK_SLUG = 'simulation-digital-twins'
const HOME_TITLE = 'Gamasome - Physical AI data collection company'
// Canonical must use the www host to match the live site (see lib/urlConsistency.ts)
const HOME_URL = 'https://www.gamasome.com'

async function getHomeSlug(): Promise<string> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(raw)
    if (settings.homePage) return settings.homePage
  } catch {
    // Settings missing or unreadable — fall through to FALLBACK_SLUG below.
  }
  return FALLBACK_SLUG
}

async function getPageData(slug: string) {
  const raw = await fs.readFile(path.join(SERVICES_DIR, `${slug}.json`), 'utf-8').catch(() => null)
  if (!raw) return null
  return { raw, parsed: JSON.parse(raw) }
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = await getHomeSlug()
  const page = await getPageData(slug)
  if (!page) return {}

  const hero = page.parsed.hero || {}
  const title = HOME_TITLE
  const description: string = (hero.subtitle || hero.subheadline || hero.description || '').slice(
    0,
    160
  )
  const image: string | undefined = hero.bannerImage || hero.backgroundImage || undefined
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `https://www.gamasome.com${image}`
    : undefined

  return {
    // absolute: bypass the `%s | GamaSome` template set in app/layout.tsx
    title: { absolute: title },
    description,
    alternates: { canonical: HOME_URL },
    openGraph: {
      title,
      description,
      url: HOME_URL,
      type: 'website',
      ...(imageUrl && { images: [imageUrl] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

function buildHomeSchema(slug: string, parsed: any) {
  const hero = parsed.hero || {}
  const name = HOME_TITLE
  const description: string = hero.subtitle || hero.subheadline || hero.description || ''
  const image: string | undefined = hero.bannerImage
    ? hero.bannerImage.startsWith('http')
      ? hero.bannerImage
      : `https://www.gamasome.com${hero.bannerImage}`
    : undefined

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url: HOME_URL,
      provider: { '@type': 'Organization', name: 'Gamasome', url: HOME_URL },
      ...(image && { image }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: HOME_URL }],
    },
  ]
}

export default async function HomePage() {
  const slug = await getHomeSlug()
  const page = await getPageData(slug)
  if (!page) notFound()

  const { raw, parsed } = page!
  const pageProps = {
    data: { servicePage: parsed },
    query: ServicePageDocument,
    variables: { relativePath: `${slug}.json` },
  }
  const schemas = buildHomeSchema(slug, parsed)

  if (parsed._template === 'aiPlatform') {
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
    return (
      <>
        {schemas.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
        <AIPlatformView
          pageData={pageProps.data}
          pageQuery={pageProps.query}
          pageVars={pageProps.variables}
          headerData={header.data}
          headerQuery={header.query}
          headerVars={header.variables}
          footerData={footer.data}
          footerQuery={footer.query}
          footerVars={footer.variables}
        />
      </>
    )
  }

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <ServicePageView
        pageData={pageProps.data}
        pageQuery={pageProps.query}
        pageVars={pageProps.variables}
        collectionKey="servicePage"
        template={parsed.template || 'classic'}
      />
    </>
  )
}
