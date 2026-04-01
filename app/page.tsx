import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ServicePageView from '@/components/ServicePageView'
import AIPlatformView from './ai-platform/AIPlatformView'
import { HeaderDocument, FooterDocument, ServicePageDocument } from '../tina/__generated__/types'
import fallbackHeader from '../content/navigation/header.json'
import fallbackFooter from '../content/navigation/footer.json'

const SERVICES_DIR = path.join(process.cwd(), 'content/pages/services')
const SETTINGS_FILE = path.join(process.cwd(), 'content/settings/index.json')

async function getHomeSlug(): Promise<string> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(raw)
    return settings.homePage || 'simulation-digital-twins'
  } catch {
    return 'simulation-digital-twins'
  }
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

  if (parsed._template === 'aiPlatform') {
    const header = { data: { header: fallbackHeader as any }, query: HeaderDocument, variables: { relativePath: 'header.json' } }
    const footer = { data: { footer: fallbackFooter as any }, query: FooterDocument, variables: { relativePath: 'footer.json' } }
    return (
      <AIPlatformView
        pageData={pageProps.data}   pageQuery={pageProps.query}   pageVars={pageProps.variables}
        headerData={header.data}    headerQuery={header.query}    headerVars={header.variables}
        footerData={footer.data}    footerQuery={footer.query}    footerVars={footer.variables}
      />
    )
  }

  return (
    <ServicePageView
      pageData={pageProps.data}
      pageQuery={pageProps.query}
      pageVars={pageProps.variables}
      collectionKey="servicePage"
      template={parsed.template || 'classic'}
    />
  )
}
