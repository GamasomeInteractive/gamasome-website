import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import fs from 'fs'
import path from 'path'
import { buildServiceSitemapUrls } from '@/lib/buildServiceSitemapUrls'
import { ensureTrailingSlash } from '@/lib/urlConsistency'

export const dynamic = 'force-static'

function getSitemapSettings() {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'content/settings/index.json'), 'utf-8')
    return JSON.parse(raw).sitemap ?? {}
  } catch {
    return {}
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]
  const settings = getSitemapSettings()

  const changefreq = (settings.defaultChangefreq ??
    'weekly') as MetadataRoute.Sitemap[number]['changeFrequency']
  const includeBlogs: boolean = settings.includeBlogs ?? true
  const includeServicePages: boolean = settings.includeServicePages ?? true

  // Every <loc> must end with '/' — next.config.js sets trailingSlash:true, so the
  // slashless form 301s and Google reports the pair as duplicate URLs.
  // 'services' is the hub added alongside the individual service pages; the three legal
  // routes are linked from the footer of every page and must be crawlable.
  const coreRoutes: MetadataRoute.Sitemap = [
    '',
    'about',
    'contact',
    'blog',
    'tags',
    'services',
    'privacy',
    'terms',
    'refunds',
    // Live booking page: previously indexable but absent from the sitemap.
    'prasanna',
  ].map((route) => ({
    url: route ? ensureTrailingSlash(`${siteUrl}/${route}`) : siteUrl,
    lastModified: today,
    changeFrequency: changefreq,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = includeServicePages
    ? buildServiceSitemapUrls(siteUrl).map(({ url }) => ({
        url,
        lastModified: today,
        changeFrequency: changefreq,
      }))
    : []

  const blogRoutes: MetadataRoute.Sitemap = includeBlogs
    ? allBlogs
        .filter((post) => !post.draft)
        .map((post) => ({
          url: ensureTrailingSlash(`${siteUrl}/${post.path}`),
          lastModified: post.lastmod || post.date,
          changeFrequency: changefreq,
        }))
    : []

  return [...coreRoutes, ...serviceRoutes, ...blogRoutes]
}
