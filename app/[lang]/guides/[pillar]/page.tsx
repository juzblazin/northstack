import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isPillar, pillarKeys, pillars } from '../../../../src/lib/pillars'
import { getArticlesByPillar } from '../../../../src/lib/articles'
import { ArticleCard, SectionHeading } from '../../../../src/components/portal/Cards'
import Breadcrumbs from '../../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../../src/lib/seo'
import LeadForm from '../../../../src/components/portal/LeadForm'

export const revalidate = 3600

export function generateStaticParams() {
  return pillarKeys.map((pillar) => ({ pillar }))
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }): Promise<Metadata> {
  const { pillar } = await params
  if (!isPillar(pillar)) return {}
  const p = pillars[pillar]
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/guides/${pillar}` },
  }
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params
  if (!isPillar(pillar)) notFound()
  const p = pillars[pillar]
  const articles = await getArticlesByPillar(pillar)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: p.title, href: `/guides/${pillar}` },
  ]

  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <SectionHeading kicker="Guide pillar" title={p.title} sub={p.description} />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} a={a} showPillar={false} />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="mt-14 rounded-2xl border border-line bg-surface p-8 text-[15px] text-ink-soft">
          Guides for this pillar are being written now — subscribe below and we&apos;ll send them as they ship.
        </p>
      )}

      <div className="mx-auto mt-16 max-w-[720px]">
        <LeadForm source={`pillar-${pillar}`} />
      </div>
    </div>
  )
}
