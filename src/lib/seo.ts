import type { Article, FaqItem } from './types'
import { canonicalPath } from './types'
import { pillars } from './pillars'
import { provinces } from './provinces'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://northstack.ca'
export const siteName = 'NorthStack'

export const abs = (path: string) => `${siteUrl}${path}`

export interface Crumb {
  name: string
  href: string
}

export const articleCrumbs = (a: Article): Crumb[] => {
  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }]
  if (a.province) {
    crumbs.push({ name: 'Provinces', href: '/provinces' })
    crumbs.push({ name: provinces[a.province].name, href: `/provinces/${a.province}` })
  } else {
    crumbs.push({ name: 'Guides', href: '/guides' })
    crumbs.push({ name: pillars[a.pillar].title, href: `/guides/${a.pillar}` })
  }
  crumbs.push({ name: a.title, href: canonicalPath(a) })
  return crumbs
}

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.href),
  })),
})

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: { '@type': 'ImageObject', url: abs('/assets/northstack-mark.svg') },
  description: 'Answer-first guides and free tools for Canadian small businesses — tax compliance, software stacks, provincial employment rules and funding.',
  sameAs: [],
})

export const articleJsonLd = (a: Article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.excerpt,
  datePublished: a.publishedAt,
  dateModified: a.updatedAt ?? a.publishedAt,
  mainEntityOfPage: abs(canonicalPath(a)),
  author: { '@type': 'Organization', name: 'NorthStack Editorial', url: siteUrl },
  publisher: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: abs('/assets/northstack-mark.svg') },
  },
})

export const faqJsonLd = (faqs: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
