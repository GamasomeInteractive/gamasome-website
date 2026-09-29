import fs from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import Link from '@/components/Link'

const INDUSTRIES_DIR = path.join(process.cwd(), 'content/pages/industries')

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Physical AI data collection by industry: healthcare, agriculture, warehouse, humanoid, construction, mining, manufacturing, automotive, defense, insurance, national security and trucking.',
  alternates: { canonical: 'https://www.gamasome.com/industries/' },
  openGraph: {
    title: 'Industries | Gamasome',
    description:
      'Physical AI data collection by industry: healthcare, agriculture, warehouse, humanoid, construction, mining, manufacturing, automotive, defense, insurance, national security and trucking.',
    url: 'https://www.gamasome.com/industries/',
    type: 'website',
  },
}

/**
 * Ordered so the industries with real delivered work (warehouse, humanoid) lead.
 * A slug missing from this list still renders — it is appended in file order —
 * so adding a page in the CMS can never silently drop it from the hub.
 */
const ORDER = [
  'warehouse',
  'humanoid',
  'manufacturing',
  'healthcare',
  'automobile',
  'agriculture',
  'construction',
  'mining',
  'trucking',
  'defense',
  'national-security',
  'insurance',
]

type IndustryCard = { slug: string; title: string; description: string }

async function getIndustries(): Promise<IndustryCard[]> {
  let files: string[] = []
  try {
    files = await fs.readdir(INDUSTRIES_DIR)
  } catch {
    return []
  }

  const cards: IndustryCard[] = []
  for (const file of files) {
    if (!file.endsWith('.json')) continue
    const slug = file.replace(/\.json$/, '')
    try {
      const parsed = JSON.parse(await fs.readFile(path.join(INDUSTRIES_DIR, file), 'utf-8'))
      // `hidden` pages 404 and are excluded from the sitemap, so they must not be linked here.
      if (parsed?.hidden === true) continue
      const seo = parsed.seo ?? {}
      cards.push({
        slug,
        title: (seo.metaTitle || parsed.pageTitle || slug.replace(/-/g, ' ')).replace(
          /\s*[-–—|]\s*Gamasome\s*$/i,
          ''
        ),
        description: seo.metaDescription || parsed.pageDescription || '',
      })
    } catch {
      // A malformed JSON file should not take the whole hub down.
      continue
    }
  }

  const rank = (slug: string) => {
    const i = ORDER.indexOf(slug)
    return i === -1 ? ORDER.length : i
  }
  return cards.sort((a, b) => rank(a.slug) - rank(b.slug))
}

export default async function IndustriesPage() {
  const industries = await getIndustries()

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 xl:px-0">
      <h1 className="text-3xl leading-tight font-bold tracking-[0.02em] text-[#333333] sm:text-4xl">
        Industries we collect data for
      </h1>
      <div className="my-4 h-[2px] w-[61px] bg-[#2D9CDB]" />
      <p className="max-w-3xl text-base leading-[190%] tracking-[0.02em] text-[#333333]">
        Every industry breaks robot data in its own way — a hospital corridor, a harvest window, a
        night shift at a dock door. These pages set out what each one demands of a dataset, and
        which of our collection services meet it.
      </p>

      <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
        {industries.map((s) => (
          <li key={s.slug} className="h-full">
            <Link
              href={`/industries/${s.slug}/`}
              className="flex h-full flex-col rounded-lg border border-[#E3E3E3] p-6 no-underline transition hover:border-[#2D9CDB] hover:shadow-sm"
            >
              <h2 className="text-lg font-semibold tracking-[0.02em] text-[#333333] sm:text-xl">
                {s.title}
              </h2>
              <div className="my-3 h-[1px] w-[61px] bg-[#767E7E]" />
              {s.description && (
                <p className="text-sm leading-[190%] font-normal tracking-[0.02em] text-[#333333]">
                  {s.description}
                </p>
              )}
              <span className="mt-4 text-sm font-medium text-[#2D9CDB]">Read more</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
