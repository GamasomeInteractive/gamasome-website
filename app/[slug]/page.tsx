import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import ServicePageView from '@/components/ServicePageView'
import AIPlatformView from '../ai-platform/AIPlatformView'
import { HeaderDocument, FooterDocument, ServicePageDocument } from '../../tina/__generated__/types'
import fallbackHeader from '../../content/navigation/header.json'
import fallbackFooter from '../../content/navigation/footer.json'

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
  const raw = await fs.readFile(path.join(SERVICES_DIR, relativePath), 'utf-8').catch(() => null)
  if (!raw) return null
  return {
    data: { servicePage: JSON.parse(raw) },
    query: ServicePageDocument,
    variables: { relativePath },
  }
}

async function getNavData() {
  return {
    header: {
      data: { header: fallbackHeader as any },
      query: HeaderDocument,
      variables: { relativePath: 'header.json' },
    },
    footer: {
      data: { footer: fallbackFooter as any },
      query: FooterDocument,
      variables: { relativePath: 'footer.json' },
    },
  }
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
