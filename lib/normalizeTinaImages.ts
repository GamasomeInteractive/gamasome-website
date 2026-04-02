// Tina Cloud API converts /static/images/foo.jpg → https://assets.tina.io/{clientId}/static/images/foo.jpg
// Images live in git (public/static/images/), not on Tina's CDN, so CDN URLs 404.
// This strips the CDN prefix back to the local path — safe to call on any data.
// Also strips /uploads/ prefix that Tina writes when mediaRoot='uploads' is configured:
//   /uploads/static/images/foo.jpg → /static/images/foo.jpg
const TINA_CDN_RE    = /^https:\/\/assets\.tina\.io\/[a-f0-9-]+\//
const TINA_UPLOADS_RE = /^\/uploads\//

export function normalizeTinaImages<T>(data: T): T {
  if (!data) return data
  if (typeof data === 'string') {
    if (TINA_CDN_RE.test(data))    return data.replace(TINA_CDN_RE, '/')    as unknown as T
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
