import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isProvince } from '../../../../../src/lib/provinces'
import { getArticles, getProvinceArticle } from '../../../../../src/lib/articles'
import { canonicalPath } from '../../../../../src/lib/types'
import { abs } from '../../../../../src/lib/seo'
import ArticlePage from '../../../../../src/components/portal/ArticlePage'

export const revalidate = 3600

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.filter((a) => a.province).map((a) => ({ province: a.province, slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; slug: string }>
}): Promise<Metadata> {
  const { province, slug } = await params
  if (!isProvince(province)) return {}
  const article = await getProvinceArticle(province, slug)
  if (!article) return {}
  const title = article.seoMetadata?.title ?? article.title
  return {
    title,
    description: article.seoMetadata?.description ?? article.excerpt,
    alternates: { canonical: canonicalPath(article) },
    openGraph: { title, description: article.excerpt, url: abs(canonicalPath(article)), type: 'article' },
  }
}

export default async function ProvinceArticlePage({
  params,
}: {
  params: Promise<{ province: string; slug: string }>
}) {
  const { province, slug } = await params
  if (!isProvince(province)) notFound()
  const article = await getProvinceArticle(province, slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
