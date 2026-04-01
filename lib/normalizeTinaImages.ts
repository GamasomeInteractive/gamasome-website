const TINA_CDN_PREFIX = `https://assets.tina.io/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}`

/**
 * Tina Cloud's GraphQL API converts local image paths like /static/images/foo.jpg
 * into CDN URLs like https://assets.tina.io/{clientId}/static/images/foo.jpg.
 * Since our images live in git (public/static/images/), not on Tina's CDN,
 * those CDN URLs 404. This strips the CDN prefix back to the local path.
 */
export function normalizeTinaImages<T>(data: T): T {
  if (!data) return data
  if (typeof data === 'string') {
    if (TINA_CDN_PREFIX && data.startsWith(TINA_CDN_PREFIX)) {
      return data.slice(TINA_CDN_PREFIX.length) as unknown as T
    }
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
