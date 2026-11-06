import type { TypedObject } from '@portabletext/types'

export type PillarKey = 'tax' | 'software' | 'operations' | 'growth'
export type ProvinceCode = 'bc' | 'ab' | 'on' | 'qc'

export interface Pillar {
  key: PillarKey
  title: string
  short: string
  description: string
  seoTitle: string
  seoDescription: string
}

export interface Province {
  code: ProvinceCode
  name: string
  blurb: string
  salesTax: { label: string; rate: string; note: string }
  smallBizRate: string
  generalRate: string
  minWage: string
  wageNote: string
  workersComp: string
  employmentBody: string
  grants: { name: string; desc: string }[]
  checklist: { group: string; tasks: string[] }[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface SeoMetadata {
  title?: string
  description?: string
}

export interface Article {
  slug: string
  title: string
  pillar: PillarKey
  province?: ProvinceCode
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readingTime: number
  body: TypedObject[]
  faqs: FaqItem[]
  seoMetadata?: SeoMetadata
  related?: string[]
}

export const canonicalPath = (a: Pick<Article, 'slug' | 'pillar' | 'province'>) =>
  a.province ? `/provinces/${a.province}/${a.slug}` : `/guides/${a.pillar}/${a.slug}`
