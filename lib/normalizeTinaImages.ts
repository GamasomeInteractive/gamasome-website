// Tina Cloud API converts /static/images/foo.jpg → https://assets.tina.io/{clientId}/static/images/foo.jpg
// Images live in git (public/static/images/), not on Tina's CDN, so CDN URLs 404.
// This strips the CDN prefix back to the local path — safe to call on any data.
const TINA_CDN_RE = /^https:\/\/assets\.tina\.io\/[a-f0-9-]+\//

export function normalizeTinaImages<T>(data: T): T {
  if (!data) return data
  if (typeof data === 'string') {
    return (TINA_CDN_RE.test(data) ? data.replace(TINA_CDN_RE, '/') : data) as unknown as T
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
