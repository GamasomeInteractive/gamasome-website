import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

/**
 * Shared guard for the internal CMS tool pages (/template-picker, /theme-picker,
 * /version-history).
 *
 * These are local authoring tools, not public pages. They were reachable in production,
 * returned 200 and carried `index, follow`, so they were eligible for search results —
 * and two of them linked publicly to the CMS admin.
 *
 * They are dev-only in practice already: every one of them drives an API route that is
 * gated to `NODE_ENV === 'development'` (see app/api/{versions,theme,template}/route.ts),
 * and their writes target the filesystem, which is read-only on the Cloudflare deployment.
 * Gating the pages to match keeps the UI and its backend consistent instead of serving a
 * page whose every action 403s.
 *
 * This does not touch TinaCMS at /admin, which is the actual content CMS.
 */
export const internalToolMetadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
}

/** Renders 404 outside development. Call from an internal tool's server layout. */
export function assertDevOnly(): void {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }
}
