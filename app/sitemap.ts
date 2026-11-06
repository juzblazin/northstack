import type { MetadataRoute } from 'next'
import { getArticles } from '../src/lib/articles'
import { pillarKeys } from '../src/lib/pillars'
import { provinceCodes } from '../src/lib/provinces'
import { canonicalPath } from '../src/lib/types'
import { abs } from '../src/lib/seo'
import { langs } from '../src/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()
  const paths = ['', '/guides', '/provinces', '/tools', '/tools/software-cost-estimator', '/tools/tax-compliance-checklist', ...pillarKeys.map((k) => `/guides/${k}`), ...provinceCodes.map((c) => `/provinces/${c}`), ...articles.map(canonicalPath)]
  return paths.map((p) => ({
    url: abs(`/en${p}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l === 'en' ? 'en-CA' : 'fr-CA', abs(`/${l}${p}`)])) },
  }))
}
