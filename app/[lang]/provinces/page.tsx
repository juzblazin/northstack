import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { provinces, provinceCodes } from '../../../src/lib/provinces'
import { getArticlesByProvince } from '../../../src/lib/articles'
import { SectionHeading } from '../../../src/components/portal/Cards'
import Breadcrumbs from '../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../src/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Provincial Guides — BC, Alberta, Ontario & Quebec',
  description:
    'Province-specific guides for Canadian SMBs: sales tax systems, corporate rates, payroll bodies and grant programs in BC, Alberta, Ontario and Quebec.',
  alternates: { canonical: '/provinces' },
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default async function ProvincesPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Provinces', href: '/provinces' },
  ]
  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <SectionHeading
        kicker="Geo hubs"
        title="Rules change at the border."
        sub="Tax rates, payroll bodies and grant programs are provincial. Pick your province for the rules and guides that actually apply to you."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {provinceCodes.map((c) => (
          <ProvinceCard key={c} code={c} />
        ))}
      </div>
    </div>
  )
}

async function ProvinceCard({ code }: { code: (typeof provinceCodes)[number] }) {
  const p = provinces[code]
  const articles = await getArticlesByProvince(code)
  return (
    <Link
      href={`/provinces/${code}`}
      className="group flex flex-col rounded-[28px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="display-lg text-[28px]">{p.name}</h2>
        <span className="font-mono text-[12px] tracking-[0.14em] text-electric uppercase">{code}</span>
      </div>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-soft">{p.blurb}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 text-[12.5px]">
        <div className="rounded-xl border border-line bg-white/[0.02] p-3 light:bg-black/[0.03]">
          <div className="text-muted">Sales tax</div>
          <div className="mt-1 font-semibold">{p.salesTax.rate}</div>
        </div>
        <div className="rounded-xl border border-line bg-white/[0.02] p-3 light:bg-black/[0.03]">
          <div className="text-muted">Small biz rate</div>
          <div className="mt-1 font-semibold">{p.smallBizRate}</div>
        </div>
        <div className="rounded-xl border border-line bg-white/[0.02] p-3 light:bg-black/[0.03]">
          <div className="text-muted">Min wage</div>
          <div className="mt-1 font-semibold">{p.minWage}</div>
        </div>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-primary transition group-hover:text-electric">
        {articles.length} {articles.length === 1 ? 'guide' : 'guides'} + checklist <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}
