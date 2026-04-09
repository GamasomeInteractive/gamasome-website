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
const HOME_SLUG = 'simulation-digital-twins'

async function getHomeSlug(): Promise<string> {
  return HOME_SLUG
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
  const title: string = hero.title || hero.headline || 'Gamasome'
  const description: string = (hero.subtitle || hero.subheadline || hero.description || '').slice(0, 160)
  const image: string | undefined = hero.bannerImage || hero.backgroundImage || undefined

  return {
    title,
    description,
    alternates: { canonical: 'https://gamasome.com' },
    openGraph: {
      title,
      description,
      url: 'https://gamasome.com',
      type: 'website',
      ...(image && { images: [image.startsWith('http') ? image : `https://gamasome.com${image}`] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image.startsWith('http') ? image : `https://gamasome.com${image}`] }),
    },
  }
}

function buildHomeSchema(slug: string, parsed: any) {
  const hero = parsed.hero || {}
  const name: string = hero.title || hero.headline || 'Gamasome'
  const description: string = hero.subtitle || hero.subheadline || hero.description || ''
  const image: string | undefined = hero.bannerImage
    ? hero.bannerImage.startsWith('http') ? hero.bannerImage : `https://gamasome.com${hero.bannerImage}`
    : undefined

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url: 'https://gamasome.com',
      provider: { '@type': 'Organization', name: 'Gamasome', url: 'https://gamasome.com' },
      ...(image && { image }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gamasome.com' },
      ],
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
    const header = { data: { header: fallbackHeader as any }, query: HeaderDocument, variables: { relativePath: 'header.json' } }
    const footer = { data: { footer: fallbackFooter as any }, query: FooterDocument, variables: { relativePath: 'footer.json' } }
    return (
      <>
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <AIPlatformView
          pageData={pageProps.data}   pageQuery={pageProps.query}   pageVars={pageProps.variables}
          headerData={header.data}    headerQuery={header.query}    headerVars={header.variables}
          footerData={footer.data}    footerQuery={footer.query}    footerVars={footer.variables}
        />
      </>
    )
  }

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
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
