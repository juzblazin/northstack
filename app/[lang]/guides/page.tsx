import type { Metadata } from 'next'
import { pillarKeys, pillars } from '../../../src/lib/pillars'
import { getArticles } from '../../../src/lib/articles'
import { ArticleCard, PillarCard, SectionHeading } from '../../../src/components/portal/Cards'
import Breadcrumbs from '../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../src/lib/seo'
import LeadForm from '../../../src/components/portal/LeadForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Guides for Canadian SMBs — Tax, Software, Operations & Growth',
  description:
    'Practical, answer-first guides for Canadian small businesses: tax compliance, software stacks, provincial employment rules and non-dilutive funding.',
  alternates: { canonical: '/guides' },
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default async function GuidesPage() {
  const articles = await getArticles()
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
  ]
  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <SectionHeading
        kicker="NorthStack Resources"
        title="Guides built for Canadian SMBs."
        sub="Direct answers to the long-tail questions founders actually search — provincial tax rules, stack decisions, employment standards and grant programs."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillarKeys.map((k) => (
          <PillarCard key={k} p={pillars[k]} count={articles.filter((a) => a.pillar === k && !a.province).length} />
        ))}
      </div>

      <section aria-labelledby="latest" className="mt-20">
        <h2 id="latest" className="display-lg text-[28px] sm:text-[34px]">
          Latest <span className="text-grad">guides.</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-[720px]">
        <LeadForm source="guides-index" />
      </div>
    </div>
  )
}
