import { createClient, type SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const sanityEnabled = Boolean(projectId)

export const sanity: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null
