import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AIPlatformView from '../../ai-platform/AIPlatformView'
import { HeaderDocument, FooterDocument, ServicePageDocument } from '../../../tina/__generated__/types'
import fallbackHeader from '../../../content/navigation/header.json'
import fallbackFooter from '../../../content/navigation/footer.json'

const INDUSTRIES_DIR = path.join(process.cwd(), 'content/pages/industries')

/** Strips a trailing brand so the root layout's title template supplies it exactly once. */
function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[-–—|]\s*Gamasome\s*$/i, '').trim() || title
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const raw = await fs.readFile(path.join(INDUSTRIES_DIR, `${slug}.json`), 'utf-8').catch(() => null)
  if (!raw) return {}

  const d = JSON.parse(raw)
  if (d?.hidden === true) return { robots: 'noindex, nofollow' }

  const seo = d.seo || {}
  const title: string = stripBrandSuffix(seo.metaTitle || d.pageTitle || slug.replace(/-/g, ' '))
  const description: string = seo.metaDescription || d.pageDescription || ''
  const pageUrl: string = seo.canonicalUrl || `https://www.gamasome.com/industries/${slug}/`
  const rawImage: string | undefined = seo.ogImage
  const image = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `https://www.gamasome.com${rawImage}`
    : undefined

  return {
    title,
    description: description.slice(0, 160),
    robots: seo.robots || 'index, follow',
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: pageUrl,
      type: 'website',
      ...(image && { images: [image] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 160),
      ...(image && { images: [image] }),
    },
  }
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(INDUSTRIES_DIR)
    const out: { slug: string }[] = []
    for (const f of files) {
      if (!f.endsWith('.json')) continue
      try {
        const parsed = JSON.parse(await fs.readFile(path.join(INDUSTRIES_DIR, f), 'utf-8'))
        if (parsed?.hidden === true) continue
      } catch {
        // Unparseable JSON still gets a route; the page itself will surface the problem.
      }
      out.push({ slug: f.replace('.json', '') })
    }
    return out
  } catch {
    return []
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

/**
 * Splits a raw-HTML page body into the blocks the template animates — see the
 * matching helper in app/services/[slug]/page.tsx.
 */
function splitRawBody(html: string): { hero: string; sections: string[] } {
  const hero = html.match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0] ?? ''
  const sections = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map((m) => m[0])
  return { hero, sections }
}

export default async function IndustrySlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const relativePath = `${slug}.json`
  const raw = await fs
    .readFile(path.join(INDUSTRIES_DIR, relativePath), 'utf-8')
    .catch(() => null)
  if (!raw) notFound()

  const parsed = JSON.parse(raw)
  if (parsed?.hidden === true) notFound()

  let jsonLd: unknown[] = []
  try {
    jsonLd = JSON.parse(parsed.jsonLdRaw || '[]')
  } catch {
    // Malformed JSON-LD shouldn't take the page down; it just ships without schema.
  }

  const { header, footer } = await getNavData()
  const { hero: rawHero, sections: rawSections } = splitRawBody(parsed.bodyHtml || '')

  return (
    <>
      {jsonLd.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      {parsed.cssHref && <link rel="stylesheet" href={parsed.cssHref} />}
      {/* Same template as the service pages: this page's own body markup inside
          AIPlatformView's header, footer, palette, typography and scroll animation. */}
      <AIPlatformView
        pageData={{ data: { servicePage: parsed }, query: ServicePageDocument, variables: { relativePath } }.data as any}
        pageQuery={ServicePageDocument}
        pageVars={{ relativePath }}
        headerData={header.data}
        headerQuery={header.query}
        headerVars={header.variables}
        footerData={footer.data}
        footerQuery={footer.query}
        footerVars={footer.variables}
        rawHero={rawHero}
        rawSections={rawSections}
      />
    </>
  )
}
