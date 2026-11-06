import Link from 'next/link'
import { Clock, CalendarDays, Zap } from 'lucide-react'
import type { Article } from '../../lib/types'
import { articleCrumbs, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '../../lib/seo'
import { getRelatedArticles } from '../../lib/articles'
import Breadcrumbs from './Breadcrumbs'
import JsonLd from './JsonLd'
import PortableText from './PortableText'
import Faq from './Faq'
import LeadForm from './LeadForm'
import { ArticleCard } from './Cards'

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default async function ArticlePage({ article }: { article: Article }) {
  const related = await getRelatedArticles(article)
  const crumbs = articleCrumbs(article)

  return (
    <article className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd(article), faqJsonLd(article.faqs)]} />

      <div className="mx-auto max-w-[860px]">
        <Breadcrumbs crumbs={crumbs} />

        <header>
          <h1 className="display-xl text-[36px] sm:text-[46px] lg:text-[54px]">{article.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12.5px] text-muted">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden="true" />{article.publishedAt}{article.updatedAt ? ` · updated ${article.updatedAt}` : ''}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden="true" />{article.readingTime} min read</span>
            <Link href={a11yPillarHref(article)} className="rounded-full border border-line px-2.5 py-0.5 text-electric transition hover:border-primary/50">
              {article.province ? article.province.toUpperCase() : article.pillar}
            </Link>
          </div>
        </header>

        <div className="mt-9 rounded-2xl border border-primary/30 bg-primary/10 p-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-electric uppercase">
            <Zap className="size-4" aria-hidden="true" /> Quick answer
          </div>
          <p className="mt-2.5 text-[16.5px] leading-[1.7] text-ink">{article.excerpt}</p>
        </div>

        <div className="mt-4">
          <PortableText value={article.body} />
        </div>

        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="display-lg mb-6 text-[28px] sm:text-[34px]">
            Common <span className="text-grad">questions.</span>
          </h2>
          <Faq items={article.faqs} />
        </section>

        <div className="mt-12">
          <LeadForm source={`article-${article.slug}`} />
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-20 max-w-[1100px]">
          <h2 id="related-heading" className="display-lg text-[28px] sm:text-[34px]">
            Related <span className="text-grad">guides.</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

const a11yPillarHref = (a: Article) => (a.province ? `/provinces/${a.province}` : `/guides/${a.pillar}`)
