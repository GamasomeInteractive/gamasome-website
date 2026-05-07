/**
 * Guards against URL inconsistency between the site's URLs and where they're
 * referenced (sitemap, navigation, redirects).
 *
 * Run: yarn test:lib
 *
 * BACKGROUND — why this matters
 * ─────────────────────────────
 * next.config.js has `trailingSlash: true`, so every live URL is
 * https://www.gamasome.com/some-path/. If a sitemap entry, menu href, or
 * canonical tag uses /some-path (no slash), Google treats them as TWO URLs
 * and ranks neither. These tests scan the navigation JSON files and assert
 * every internal href ends with '/'.
 *
 * Tina CMS also has a client-side validator (validateInternalHref in
 * tina/config.ts) that catches this on save. These tests are the backstop.
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { checkInternalHref, findHrefIssues } from './urlConsistency'

const REPO_ROOT = path.resolve(__dirname, '..')

describe('checkInternalHref', () => {
  it('passes external https URLs', () => {
    assert.equal(checkInternalHref('https://example.com'), null)
    assert.equal(checkInternalHref('http://example.com/foo'), null)
  })

  it('passes mailto / tel / anchor links', () => {
    assert.equal(checkInternalHref('mailto:hi@example.com'), null)
    assert.equal(checkInternalHref('tel:+11234567890'), null)
    assert.equal(checkInternalHref('#how-it-works'), null)
  })

  it('passes empty / undefined', () => {
    assert.equal(checkInternalHref(''), null)
    assert.equal(checkInternalHref(undefined), null)
    assert.equal(checkInternalHref(null), null)
  })

  it('passes internal paths that end with /', () => {
    assert.equal(checkInternalHref('/'), null)
    assert.equal(checkInternalHref('/services/ai-platform/'), null)
    assert.equal(checkInternalHref('/blog/'), null)
  })

  it('flags internal paths missing trailing slash', () => {
    assert.notEqual(checkInternalHref('/services/ai-platform'), null)
    assert.notEqual(checkInternalHref('/blog'), null)
    assert.notEqual(checkInternalHref('/about'), null)
  })
})

describe('findHrefIssues — content/navigation JSON files', () => {
  const navFiles = [
    'content/navigation/header.json',
    'content/navigation/footer.json',
  ]

  for (const rel of navFiles) {
    it(`${rel} has zero href issues`, () => {
      const full = path.join(REPO_ROOT, rel)
      const json = JSON.parse(fs.readFileSync(full, 'utf-8'))
      const issues = findHrefIssues(json, rel)
      assert.deepEqual(
        issues,
        [],
        `${rel} contains internal hrefs missing trailing slash:\n` +
        issues.map((i) => `  - ${i.href}: ${i.reason}`).join('\n'),
      )
    })
  }
})
