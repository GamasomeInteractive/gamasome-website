/**
 * Guards against regressions in normalizeTinaImages.
 *
 * Run: yarn test:lib
 *
 * BACKGROUND — why this matters
 * ─────────────────────────────
 * With mediaRoot='static/images', Tina Cloud STRIPS that prefix when building
 * CDN URLs. So a stored value of /static/images/foo.jpg comes back from the
 * Tina Cloud API as:
 *
 *   https://assets.tina.io/{clientId}/foo.jpg   ← no 'static/images'!
 *
 * The useTina() hook in the visual editor replaces SSR data with this CDN URL.
 * normalizeTinaImages must restore the full local path, otherwise Next.js Image
 * requests /foo.jpg → 404 and the image appears briefly then vanishes.
 *
 * History: broke once when the replacement was just '/' instead of
 * '/static/images/'. DO NOT change the replacement logic without updating
 * these tests.
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeTinaImages } from './normalizeTinaImages.js'

const CLIENT = '0d0f812a-be37-4a42-a27f-b8269705c115'
const cdn = (path: string) => `https://assets.tina.io/${CLIENT}/${path}`

describe('normalizeTinaImages — CDN → local path', () => {
  // ── Core case: Tina strips mediaRoot prefix ──────────────────────────────
  it('restores /static/images/ when Tina strips mediaRoot', () => {
    // This is THE regression case — was producing /sim-banner.jpg (404)
    assert.equal(normalizeTinaImages(cdn('sim-banner.jpg')), '/static/images/sim-banner.jpg')
  })

  it('handles filenames with hyphens and extensions', () => {
    assert.equal(
      normalizeTinaImages(cdn('metaverse-banner.png')),
      '/static/images/metaverse-banner.png'
    )
  })

  it('handles filenames in subdirectory (e.g. canada/)', () => {
    assert.equal(normalizeTinaImages(cdn('canada/maple.jpg')), '/static/images/canada/maple.jpg')
  })

  // ── Edge case: CDN URL already contains full path ────────────────────────
  it('does not double-prefix when CDN path already has static/images/', () => {
    assert.equal(
      normalizeTinaImages(cdn('static/images/sim-banner.jpg')),
      '/static/images/sim-banner.jpg'
    )
  })

  // ── /uploads/ prefix stripping ───────────────────────────────────────────
  it('strips /uploads/ prefix that Tina sometimes writes', () => {
    assert.equal(normalizeTinaImages('/uploads/static/images/foo.jpg'), '/static/images/foo.jpg')
  })

  // ── Passthrough: non-image strings ───────────────────────────────────────
  it('leaves already-correct local paths untouched', () => {
    assert.equal(normalizeTinaImages('/static/images/blog.png'), '/static/images/blog.png')
  })

  it('leaves non-image strings untouched', () => {
    assert.equal(normalizeTinaImages('Hello World'), 'Hello World')
    assert.equal(normalizeTinaImages(''), '')
  })

  // ── Recursive: objects and arrays ────────────────────────────────────────
  it('normalizes image values inside objects', () => {
    const input = { hero: { bannerImage: cdn('hero.jpg'), title: 'Test' } }
    const result = normalizeTinaImages(input) as any
    assert.equal(result.hero.bannerImage, '/static/images/hero.jpg')
    assert.equal(result.hero.title, 'Test')
  })

  it('normalizes image values inside arrays', () => {
    const input = [cdn('a.jpg'), cdn('b.png'), '/static/images/c.jpg']
    const result = normalizeTinaImages(input) as string[]
    assert.deepEqual(result, [
      '/static/images/a.jpg',
      '/static/images/b.png',
      '/static/images/c.jpg',
    ])
  })

  it('handles null and undefined gracefully', () => {
    assert.equal(normalizeTinaImages(null), null)
    assert.equal(normalizeTinaImages(undefined), undefined)
  })
})
