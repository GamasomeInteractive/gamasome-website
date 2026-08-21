// Tina Cloud API converts image field values to CDN URLs.
// With mediaRoot='static/images', Tina strips that prefix when building CDN URLs:
//   /static/images/foo.jpg (stored) → https://assets.tina.io/{clientId}/foo.jpg (API response)
// Images live in git (public/static/images/), not on Tina's CDN, so CDN URLs 404.
// This function restores the correct local path — safe to call on any data shape.
//
// Also handles the /uploads/ prefix Tina sometimes writes:
//   /uploads/static/images/foo.jpg → /static/images/foo.jpg
const TINA_CDN_RE = /^https:\/\/assets\.tina\.io\/[a-f0-9-]+\//
const TINA_UPLOADS_RE = /^\/uploads\//
const STATIC_PREFIX = '/static/images/'

export function normalizeTinaImages<T>(data: T): T {
  if (!data) return data
  if (typeof data === 'string') {
    if (TINA_CDN_RE.test(data)) {
      // Strip the CDN base — what remains is the path relative to mediaRoot
      const afterCdn = data.replace(TINA_CDN_RE, '')
      // If the path already contains 'static/images/', it's a full public-relative path
      if (afterCdn.startsWith('static/images/') || afterCdn.startsWith('/static/images/')) {
        return `/${afterCdn.replace(/^\//, '')}` as unknown as T
      }
      // Otherwise Tina stripped 'static/images/' — re-add it
      return `${STATIC_PREFIX}${afterCdn}` as unknown as T
    }
    if (TINA_UPLOADS_RE.test(data)) return data.replace(TINA_UPLOADS_RE, '/') as unknown as T
    return data
  }
  if (Array.isArray(data)) {
    return data.map((item) => normalizeTinaImages(item)) as unknown as T
  }
  if (typeof data === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = normalizeTinaImages(value)
    }
    return result as T
  }
  return data
}
