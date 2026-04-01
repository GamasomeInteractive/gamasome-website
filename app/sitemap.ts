import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const coreRoutes = ['', 'about', 'contact'].map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: today,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const servicesDir = path.join(process.cwd(), 'content/pages/services')
  const serviceRoutes = fs.existsSync(servicesDir)
    ? fs
        .readdirSync(servicesDir)
        .filter((f) => f.endsWith('.json'))
        .map((f) => ({
          url: `${siteUrl}/${f.replace('.json', '')}`,
          lastModified: today,
          priority: 0.9,
        }))
    : []

  return [...coreRoutes, ...serviceRoutes, ...blogRoutes]
}
