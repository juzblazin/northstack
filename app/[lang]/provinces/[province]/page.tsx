import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Landmark, Scale, HandCoins } from 'lucide-react'
import { isProvince, provinces, provinceCodes } from '../../../../src/lib/provinces'
import { getArticlesByProvince } from '../../../../src/lib/articles'
import { ArticleCard, SectionHeading } from '../../../../src/components/portal/Cards'
import Breadcrumbs from '../../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../../src/lib/seo'
import LeadForm from '../../../../src/components/portal/LeadForm'

export const revalidate = 3600

export function generateStaticParams() {
  return provinceCodes.map((province) => ({ province }))
}

export async function generateMetadata({ params }: { params: Promise<{ province: string }> }): Promise<Metadata> {
  const { province } = await params
  if (!isProvince(province)) return {}
  const p = provinces[province]
  return {
    title: `Small Business Rules in ${p.name} — Tax, Payroll & Grants`,
    description: `${p.name} hub for Canadian SMBs: ${p.salesTax.label} at ${p.salesTax.rate}, ${p.smallBizRate} small business rate, ${p.workersComp} registration, and provincial grant programs.`,
    alternates: { canonical: `/provinces/${province}` },
  }
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default async function ProvincePage({ params }: { params: Promise<{ province: string }> }) {
  const { province } = await params
  if (!isProvince(province)) notFound()
  const p = provinces[province]
  const articles = await getArticlesByProvince(province)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Provinces', href: '/provinces' },
    { name: p.name, href: `/provinces/${province}` },
  ]

  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <SectionHeading kicker="Provincial hub" title={`Doing business in ${p.name}.`} sub={p.blurb} />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-line bg-surface p-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-electric uppercase"><Landmark className="size-4" aria-hidden="true" /> Taxes</div>
          <dl className="mt-4 flex flex-col gap-3 text-[14px]">
            <div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-muted">Sales tax</dt><dd className="text-right font-medium">{p.salesTax.label} · {p.salesTax.rate}</dd></div>
            <div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-muted">Small biz corp</dt><dd className="font-medium">{p.smallBizRate}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted">General corp</dt><dd className="font-medium">{p.generalRate}</dd></div>
          </dl>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-muted">{p.salesTax.note}</p>
        </div>

        <div className="rounded-[24px] border border-line bg-surface p-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-electric uppercase"><Scale className="size-4" aria-hidden="true" /> Employment</div>
          <dl className="mt-4 flex flex-col gap-3 text-[14px]">
            <div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-muted">Minimum wage</dt><dd className="font-medium">{p.minWage}</dd></div>
            <div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-muted">Workers comp</dt><dd className="font-medium">{p.workersComp}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted">Standards</dt><dd className="text-right font-medium">{p.employmentBody}</dd></div>
          </dl>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-muted">{p.wageNote}</p>
        </div>

        <div className="rounded-[24px] border border-line bg-surface p-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-electric uppercase"><HandCoins className="size-4" aria-hidden="true" /> Funding programs</div>
          <ul className="mt-4 flex flex-col gap-3.5">
            {p.grants.map((g) => (
              <li key={g.name} className="text-[13.5px] leading-[1.55]">
                <span className="font-semibold">{g.name}</span>
                <span className="mt-0.5 block text-ink-soft">{g.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-primary/30 bg-[linear-gradient(140deg,rgba(232,58,46,.28),transparent_70%)] p-6 sm:p-7">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[19px] font-semibold">{p.name} compliance checklist</h2>
            <p className="mt-1 text-[14px] text-ink-soft">{p.checklist.reduce((n, g) => n + g.tasks.length, 0)} tasks across registration, payroll and annual filings.</p>
          </div>
          <Link href="/tools/tax-compliance-checklist" className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#f04a3e]">
            Open checklist <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <section aria-labelledby="prov-guides" className="mt-16">
        <h2 id="prov-guides" className="display-lg text-[28px] sm:text-[34px]">
          {p.name} <span className="text-grad">guides.</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="mt-8 rounded-2xl border border-line bg-surface p-8 text-[15px] text-ink-soft">
            {p.name}-specific guides are being written now — subscribe below and we&apos;ll send them as they ship.
          </p>
        )}
      </section>

      <div className="mx-auto mt-16 max-w-[720px]">
        <LeadForm source={`province-${province}`} />
      </div>
    </div>
  )
}
