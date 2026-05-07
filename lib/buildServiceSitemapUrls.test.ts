/**
 * Guards against the sitemap silently losing service pages.
 *
 * Run: yarn test:lib
 *
 * BACKGROUND — why this matters
 * ─────────────────────────────
 * Service pages are created via Tina CMS (or manually) by dropping a JSON
 * file under `content/pages/services/`. The sitemap auto-includes them by
 * scanning that directory at build time.
 *
 * If the URL pattern, scan logic, or directory ever drift, new Tina-CMS
 * pages would silently miss the sitemap — bad for SEO and indexing.
 * These tests ensure every JSON file in the directory becomes a URL with
 * the expected `/services/{slug}` shape.
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { buildServiceSitemapUrls } from './buildServiceSitemapUrls'

const REPO_ROOT = path.resolve(__dirname, '..')
const SERVICES_DIR = path.join(REPO_ROOT, 'content/pages/services')
const SITE_URL = 'https://www.gamasome.com'

describe('buildServiceSitemapUrls', () => {
  it('emits one URL per non-hidden JSON file in content/pages/services/', () => {
    const visibleFiles = fs.readdirSync(SERVICES_DIR)
      .filter((f) => f.endsWith('.json'))
      .filter((f) => {
        try {
          const parsed = JSON.parse(fs.readFileSync(path.join(SERVICES_DIR, f), 'utf-8'))
          return parsed?.hidden !== true
        } catch {
          return true
        }
      })
    const entries = buildServiceSitemapUrls(SITE_URL, SERVICES_DIR)

    assert.equal(
      entries.length,
      visibleFiles.length,
      `Sitemap entry count (${entries.length}) does not match visible service JSON count (${visibleFiles.length}). ` +
      `New pages added via Tina CMS must appear in the sitemap (unless hidden:true).`,
    )
  })

  it('uses the /services/{slug}/ URL shape with trailing slash for every entry', () => {
    const entries = buildServiceSitemapUrls(SITE_URL, SERVICES_DIR)
    for (const e of entries) {
      assert.equal(
        e.url,
        `${SITE_URL}/services/${e.slug}/`,
        `Service "${e.slug}" did not produce a /services/{slug}/ URL — sitemap pattern drifted.`,
      )
      assert.equal(
        e.url.endsWith('/'),
        true,
        `Service "${e.slug}" URL must end with / to match next.config.js trailingSlash:true.`,
      )
    }
  })

  it('includes physical-ai-data-collection (canary check)', () => {
    const entries = buildServiceSitemapUrls(SITE_URL, SERVICES_DIR)
    const found = entries.some((e) => e.slug === 'physical-ai-data-collection')
    assert.equal(found, true, 'physical-ai-data-collection must be in the sitemap')
  })

  it('strips trailing slashes from siteUrl while preserving slug trailing slash', () => {
    const entries = buildServiceSitemapUrls('https://example.com/', SERVICES_DIR)
    for (const e of entries) {
      assert.equal(e.url.startsWith('https://example.com/services/'), true)
      assert.equal(e.url.includes('//services'), false)
      assert.equal(e.url.endsWith('/'), true)
    }
  })

  it('returns empty array when services directory does not exist', () => {
    const entries = buildServiceSitemapUrls(SITE_URL, '/nonexistent/dir')
    assert.deepEqual(entries, [])
  })
})
