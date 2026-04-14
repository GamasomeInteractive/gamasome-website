import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-static'

async function getRobotsSettings() {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), 'content/settings/index.json'),
      'utf-8',
    )
    return JSON.parse(raw).robotsTxt ?? {}
  } catch {
    return {}
  }
}

const AI_CRAWLERS = [
  'GPTBot',
  'CCBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Amazonbot',
  'FacebookBot',
  'Bytespider',
]

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getRobotsSettings()
  const blockAi: boolean = settings.blockAiCrawlers ?? false
  const customRules: { path: string }[] = settings.customRules ?? []

  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: '/',
      ...(customRules.length > 0
        ? { disallow: customRules.map((r) => r.path).filter(Boolean) }
        : {}),
    },
  ]

  if (blockAi) {
    AI_CRAWLERS.forEach((bot) => {
      rules.push({ userAgent: bot, disallow: '/' })
    })
  }

  return {
    rules,
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
