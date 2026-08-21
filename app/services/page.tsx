import fs from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import Link from '@/components/Link'

const SERVICES_DIR = path.join(process.cwd(), 'content/pages/services')

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Physical AI data collection, data annotation, robotics engineering, AI platform work, simulation and digital twins, and AR/VR development from Gamasome.',
  alternates: { canonical: 'https://www.gamasome.com/services/' },
  openGraph: {
    title: 'Gamasome Services | Physical AI, Robotics, Simulation & AR/VR',
    description:
      'Physical AI data collection, data annotation, robotics engineering, AI platform work, simulation and digital twins, and AR/VR development from Gamasome.',
    url: 'https://www.gamasome.com/services/',
    type: 'website',
  },
}

/**
 * The hub is grouped, not just ordered, so it states the current positioning rather than
 * listing ten peers. CURRENT is the offer we lead with; ADDITIONAL holds capabilities that
 * are real and still delivered but are not what Gamasome sells first.
 *
 * Nothing is deleted here — a service JSON not named in either list still renders, appended
 * to ADDITIONAL, so adding a page in the CMS can never silently drop it from the hub.
 */
const CURRENT = [
  'physical-ai-data-collection',
  'data-annotation',
  'robotics-solutions',
  'ai-platform',
  'ai-solutions',
  'simulation-digital-twins',
  'ar-vr-development',
]

const ADDITIONAL = ['ai-avatars-platform', 'game-development', 'metaverse']
type ServiceCard = { slug: string; title: string; description: string }

async function getServices(): Promise<{ current: ServiceCard[]; additional: ServiceCard[] }> {
  let files: string[] = []
  try {
    files = await fs.readdir(SERVICES_DIR)
  } catch {
    return { current: [], additional: [] }
  }

  const cards: ServiceCard[] = []
  for (const file of files) {
    if (!file.endsWith('.json')) continue
    const slug = file.replace(/\.json$/, '')
    try {
      const parsed = JSON.parse(await fs.readFile(path.join(SERVICES_DIR, file), 'utf-8'))
      // `hidden` pages 404 and are excluded from the sitemap, so they must not be linked here.
      // home.json is the homepage content, not a service page.
      if (parsed?.hidden === true || slug === 'home') continue

      const hero = parsed.hero ?? {}
      const seo = parsed.seo ?? {}
      const headline = [hero.headline, hero.headlineAccent]
        .filter((p: unknown): p is string => typeof p === 'string' && p.trim() !== '')
        .join(' ')
      cards.push({
        slug,
        title:
          seo.metaTitle || parsed.pageTitle || hero.title || headline || slug.replace(/-/g, ' '),
        description:
          seo.metaDescription ||
          parsed.pageDescription ||
          hero.subtitle ||
          hero.subheadline ||
          hero.description ||
          '',
      })
    } catch {
      // A malformed JSON file should not take the whole hub down.
      continue
    }
  }

  const rank = (list: string[], slug: string) => {
    const i = list.indexOf(slug)
    return i === -1 ? list.length : i
  }
  const current = cards
    .filter((c) => CURRENT.includes(c.slug))
    .sort((a, b) => rank(CURRENT, a.slug) - rank(CURRENT, b.slug))
  const additional = cards
    .filter((c) => !CURRENT.includes(c.slug))
    .sort((a, b) => rank(ADDITIONAL, a.slug) - rank(ADDITIONAL, b.slug))
  return { current, additional }
}

function ServiceGrid({ items }: { items: ServiceCard[] }) {
  return (
    <ul className="mx-auto mt-8 grid max-w-5xl list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
      {items.map((s) => (
        <li key={s.slug} className="h-full">
          <Link
            href={`/services/${s.slug}/`}
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
  )
}

export default async function ServicesIndexPage() {
  const { current, additional } = await getServices()

  return (
    <div className="min-h-screen font-['Poppins']">
      <section className="relative h-[444px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        <div className="absolute inset-0 z-20 bg-black/36" />
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          <div className="absolute top-[137px] left-4 sm:left-8 md:left-16 lg:left-40">
            <p className="text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              HOME &gt; Services
            </p>
          </div>
          <div className="text-center">
            <h1 className="max-w-[766.5px] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              Services
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-[190%] font-normal tracking-[0.02em] text-[#333333]">
              Gamasome builds the data foundation for Physical AI — collecting, annotating and
              engineering the real-world data robots learn from — backed by a decade of simulation,
              digital twin and AR/VR engineering.
            </p>
          </div>

          <h2 className="mx-auto mt-14 max-w-5xl text-xl font-semibold tracking-[0.02em] text-[#333333] sm:text-2xl">
            What we do now
          </h2>
          <ServiceGrid items={current} />

          {additional.length > 0 && (
            <>
              <h2 className="mx-auto mt-16 max-w-5xl text-xl font-semibold tracking-[0.02em] text-[#333333] sm:text-2xl">
                Other capabilities
              </h2>
              <p className="mx-auto mt-2 max-w-5xl text-sm leading-[190%] font-normal tracking-[0.02em] text-[#767E7E]">
                Work we continue to deliver, though it is not where Gamasome leads today.
              </p>
              <ServiceGrid items={additional} />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
