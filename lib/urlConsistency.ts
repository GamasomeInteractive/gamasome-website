/**
 * Pure helper that validates an internal URL/href ends with '/'.
 *
 * The site is configured with `trailingSlash: true` in next.config.js.
 * That means every live page URL ends with '/'. For SEO, sitemap entries,
 * canonical tags, and CMS-edited menu links must all match — otherwise
 * Google sees `/services/foo` and `/services/foo/` as separate URLs.
 *
 * Used by:
 *  - lib/urlConsistency.test.ts (regression test)
 *  - tina/config.ts validateInternalHref (CMS-side guard)
 *  - app/sitemap.ts + page canonicals (via ensureTrailingSlash below)
 */

export type HrefIssue = { source: string; href: string; reason: string }

/**
 * Returns null if href is OK, or a reason string describing the problem.
 * - http/https URLs are exempt (external)
 * - anchor (#), mailto:, tel: links are exempt
 * - everything else MUST end with '/'
 */
export function checkInternalHref(href: string | undefined | null): string | null {
  if (typeof href !== 'string' || href.length === 0) return null
  if (/^https?:\/\//.test(href)) return null
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null
  if (!href.endsWith('/')) {
    return `internal href "${href}" must end with '/' (trailingSlash:true)`
  }
  return null
}

/**
 * Appends '/' to a URL or path that should have one, so sitemap entries and
 * canonical tags match the live (trailingSlash:true) URL exactly.
 *
 * Left untouched:
 *  - URLs carrying a query string or fragment
 *  - file-like last segments (feed.xml, sitemap.xml, robots.txt)
 *  - mailto: / tel: / #anchor links
 * A bare origin ("https://www.gamasome.com") DOES get the slash — its path is
 * empty, and the root's canonical form is "/".
 */
export function ensureTrailingSlash(url: string): string {
  if (typeof url !== 'string' || url.length === 0) return url
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) return url
  if (url.includes('?') || url.includes('#')) return url
  if (url.endsWith('/')) return url

  const pathname = /^https?:\/\//.test(url) ? url.replace(/^https?:\/\/[^/]+/, '') : url
  const lastSegment = pathname.split('/').filter(Boolean).pop() ?? ''
  if (lastSegment.includes('.')) return url

  return `${url}/`
}

/**
 * Walks any object/array and emits issues for every internal href that
 * doesn't end with '/'. Used to scan parsed JSON nav files.
 */
export function findHrefIssues(node: unknown, source: string, key: string = 'href'): HrefIssue[] {
  const issues: HrefIssue[] = []
  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (k === key && typeof v === 'string') {
          const reason = checkInternalHref(v)
          if (reason) issues.push({ source, href: v, reason })
        } else {
          visit(v)
        }
      }
    }
  }
  visit(node)
  return issues
}
