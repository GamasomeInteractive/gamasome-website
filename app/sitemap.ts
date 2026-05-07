import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import fs from 'fs'
import path from 'path'
import { buildServiceSitemapUrls } from '@/lib/buildServiceSitemapUrls'

export const dynamic = 'force-static'

function getSitemapSettings() {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), 'content/settings/index.json'),
      'utf-8',
    )
    return JSON.parse(raw).sitemap ?? {}
  } catch {
    return {}
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]
  const settings = getSitemapSettings()

  const changefreq = (settings.defaultChangefreq ?? 'weekly') as MetadataRoute.Sitemap[number]['changeFrequency']
  const includeBlogs: boolean = settings.includeBlogs ?? true
  const includeServicePages: boolean = settings.includeServicePages ?? true

  const coreRoutes: MetadataRoute.Sitemap = ['', 'about', 'contact'].map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
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
          url: `${siteUrl}/${post.path}`,
          lastModified: post.lastmod || post.date,
          changeFrequency: changefreq,
        }))
    : []

  return [...coreRoutes, ...serviceRoutes, ...blogRoutes]
}
