import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import ServicePageView from '@/components/ServicePageView'
import AIPlatformView from '../ai-platform/AIPlatformView'
import client from '../../tina/__generated__/client'
import { normalizeTinaImages } from '../../lib/normalizeTinaImages'
import fallbackHeader from '../../content/navigation/header.json'
import fallbackFooter from '../../content/navigation/footer.json'
import { HeaderDocument, FooterDocument } from '../../tina/__generated__/types'

const SERVICES_DIR = path.join(process.cwd(), 'content/pages/services')

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(SERVICES_DIR)
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ slug: f.replace('.json', '') }))
  } catch {
    return []
  }
}

async function getData(slug: string) {
  const relativePath = `${slug}.json`
  try {
    const result = await (client.queries as any).servicePage({ relativePath })
    return { ...result, data: normalizeTinaImages(result.data) }
  } catch {
    // Fallback: read JSON directly (handles missing generated type or CMS offline)
    const raw = await fs.readFile(path.join(SERVICES_DIR, relativePath), 'utf-8').catch(() => null)
    if (!raw) return null
    return {
      data: { servicePage: JSON.parse(raw) },
      query: `query($relativePath: String!) { servicePage(relativePath: $relativePath) { id } }`,
      variables: { relativePath },
    }
  }
}

async function getNavData() {
  const [header, footer] = await Promise.all([
    client.queries.header({ relativePath: 'header.json' }).catch(() => ({
      data: { header: fallbackHeader as any },
      query: HeaderDocument,
      variables: { relativePath: 'header.json' },
    })),
    client.queries.footer({ relativePath: 'footer.json' }).catch(() => ({
      data: { footer: fallbackFooter as any },
      query: FooterDocument,
      variables: { relativePath: 'footer.json' },
    })),
  ])
  return { header, footer }
}

export default async function ServiceSlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params

  const [page, raw] = await Promise.all([
    getData(slug),
    fs.readFile(path.join(SERVICES_DIR, `${slug}.json`), 'utf-8').catch(() => null),
  ])

  if (!page || !raw) notFound()

  const parsed = JSON.parse(raw!)
  const tinaCmsTemplate = parsed._template as string | undefined
  const layoutTemplate  = (parsed.template || 'classic') as string

  // AI Platform uses its own full-page view with embedded header/footer
  if (tinaCmsTemplate === 'aiPlatform') {
    const { header, footer } = await getNavData()
    return (
      <AIPlatformView
        pageData={page.data}   pageQuery={page.query}   pageVars={page.variables}
        headerData={header.data} headerQuery={header.query} headerVars={header.variables}
        footerData={footer.data} footerQuery={footer.query} footerVars={footer.variables}
      />
    )
  }

  return (
    <ServicePageView
      pageData={page.data}
      pageQuery={page.query}
      pageVars={page.variables}
      collectionKey="servicePage"
      template={layoutTemplate}
    />
  )
}
