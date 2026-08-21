/**
 * Pure function that turns every JSON file in `content/pages/services/`
 * into a sitemap URL. Centralised here so:
 *
 *  1. `app/sitemap.ts` consumes it without growing complex.
 *  2. `lib/buildServiceSitemapUrls.test.ts` can verify that every Tina-CMS-
 *     created service page is guaranteed to land in /sitemap.xml.
 *
 * Contract — KEEP STABLE:
 *  - URL shape: `${siteUrl}/services/${slug}/` (trailing slash mandatory —
 *    matches `trailingSlash: true` in next.config.js so sitemap, canonical
 *    tags, and live URLs are all identical strings).
 *  - Reads every `*.json` under `servicesDir` and SKIPS pages that are `hidden`
 *    or marked `seo.robots: noindex`, plus pages where
 *    `hidden === true` (CMS-toggleable visibility — preserves the JSON
 *    while removing the URL from sitemap).
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
  servicesDir: string = path.join(process.cwd(), 'content/pages/services')
): ServiceSitemapEntry[] {
  if (!fs.existsSync(servicesDir)) return []

  const trimmedSiteUrl = siteUrl.replace(/\/+$/, '')
  return fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith('.json'))
    .filter((f) => {
      try {
        const raw = fs.readFileSync(path.join(servicesDir, f), 'utf-8')
        const parsed = JSON.parse(raw)
        if (parsed?.hidden === true) return false
        // A page that tells crawlers `noindex` must not also be advertised in the
        // sitemap — the two signals would contradict each other. Unlike `hidden`, this
        // keeps the route live and reachable; it is only withdrawn from search.
        const robots = String(parsed?.seo?.robots ?? '')
        return !robots.toLowerCase().includes('noindex')
      } catch {
        return true
      }
    })
    .map((f) => {
      const slug = f.replace(/\.json$/, '')
      return {
        slug,
        filePath: path.join(servicesDir, f),
        url: `${trimmedSiteUrl}/services/${slug}/`,
      }
    })
}
