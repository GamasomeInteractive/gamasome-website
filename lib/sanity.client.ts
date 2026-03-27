import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'YOUR_PROJECT_ID')

// Only create clients when a real project ID is present
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null

export const previewClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'previewDrafts',
      stega: { enabled: true, studioUrl: '/studio' },
    })
  : null

// Sanity image URL helper (safe when client is null)
export function urlFor(source: SanityImageSource) {
  if (!client) throw new Error('Sanity not configured')
  return imageUrlBuilder(client).image(source)
}
