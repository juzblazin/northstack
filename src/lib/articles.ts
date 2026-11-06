import { sanity, sanityEnabled } from './sanity'
import { seedArticles } from './seed'
import type { Article, PillarKey, ProvinceCode } from './types'

const articleProjection = `{
  title,
  "slug": slug.current,
  "pillar": pillar->key,
  "province": province->code,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  body,
  "faqs": faqs[]{ q: question, a: answer },
  seoMetadata,
  "related": related[]->slug.current
}`

async function fetchSanity<T>(query: string, params: Record<string, unknown>): Promise<T> {
  return sanity!.fetch<T>(query, params)
}

export async function getArticles(): Promise<Article[]> {
  if (sanityEnabled) {
    return fetchSanity<Article[]>(`*[_type == "article"] | order(publishedAt desc) ${articleProjection}`, {})
  }
  return [...seedArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getArticlesByPillar(pillar: PillarKey): Promise<Article[]> {
  if (sanityEnabled) {
    return fetchSanity<Article[]>(
      `*[_type == "article" && pillar->key == $pillar && !defined(province)] | order(publishedAt desc) ${articleProjection}`,
      { pillar }
    )
  }
  return seedArticles.filter((a) => a.pillar === pillar && !a.province)
}

export async function getArticlesByProvince(province: ProvinceCode): Promise<Article[]> {
  if (sanityEnabled) {
    return fetchSanity<Article[]>(
      `*[_type == "article" && province->code == $province] | order(publishedAt desc) ${articleProjection}`,
      { province }
    )
  }
  return seedArticles.filter((a) => a.province === province)
}

export async function getGuideArticle(pillar: PillarKey, slug: string): Promise<Article | null> {
  if (sanityEnabled) {
    return fetchSanity<Article | null>(
      `*[_type == "article" && slug.current == $slug && pillar->key == $pillar && !defined(province)][0] ${articleProjection}`,
      { pillar, slug }
    )
  }
  return seedArticles.find((a) => a.slug === slug && a.pillar === pillar && !a.province) ?? null
}

export async function getProvinceArticle(province: ProvinceCode, slug: string): Promise<Article | null> {
  if (sanityEnabled) {
    return fetchSanity<Article | null>(
      `*[_type == "article" && slug.current == $slug && province->code == $province][0] ${articleProjection}`,
      { province, slug }
    )
  }
  return seedArticles.find((a) => a.slug === slug && a.province === province) ?? null
}

export async function getRelatedArticles(article: Article): Promise<Article[]> {
  const all = await getArticles()
  const bySlug = new Map(all.map((a) => [a.slug, a]))
  const related = (article.related ?? [])
    .map((s) => bySlug.get(s))
    .filter((a): a is Article => Boolean(a))
  if (related.length >= 3) return related.slice(0, 3)
  const fill = all.filter(
    (a) => a.slug !== article.slug && !related.includes(a) && (a.pillar === article.pillar || a.province === article.province)
  )
  return [...related, ...fill].slice(0, 3)
}
