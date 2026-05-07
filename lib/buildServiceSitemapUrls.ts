/**
 * Pure function that turns every JSON file in `content/pages/services/`
 * into a sitemap URL. Centralised here so:
 *
 *  1. `app/sitemap.ts` consumes it without growing complex.
 *  2. `lib/buildServiceSitemapUrls.test.ts` can verify that every Tina-CMS-
 *     created service page is guaranteed to land in /sitemap.xml.
 *
 * Contract — KEEP STABLE:
 *  - URL shape: `${siteUrl}/services/${slug}`
 *  - Reads every `*.json` under `servicesDir`. No filtering — Tina is the
 *    source of truth for what's published.
 */
import fs from 'fs'
import path from 'path'

export type ServiceSitemapEntry = {
  url: string
  slug: string
  filePath: string
}

export function buildServiceSitemapUrls(
  siteUrl: string,
  servicesDir: string = path.join(process.cwd(), 'content/pages/services'),
): ServiceSitemapEntry[] {
  if (!fs.existsSync(servicesDir)) return []

  const trimmedSiteUrl = siteUrl.replace(/\/+$/, '')
  return fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const slug = f.replace(/\.json$/, '')
      return {
        slug,
        filePath: path.join(servicesDir, f),
        url: `${trimmedSiteUrl}/services/${slug}`,
      }
    })
}
