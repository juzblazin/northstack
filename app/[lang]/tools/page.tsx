import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calculator, ListChecks } from 'lucide-react'
import { SectionHeading } from '../../../src/components/portal/Cards'
import Breadcrumbs from '../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../src/lib/seo'

export const metadata: Metadata = {
  title: 'Free Tools for Canadian SMBs',
  description:
    'Free interactive tools for Canadian small businesses: a software cost estimator and a provincial compliance checklist for BC, Alberta, Ontario and Quebec.',
  alternates: { canonical: '/tools' },
}

const tools = [
  {
    href: '/tools/software-cost-estimator',
    I: Calculator,
    title: 'Software Cost Estimator',
    desc: 'Stack your team size against accounting, payroll, CRM and hosting tiers to see the real monthly number — in USD and CAD.',
  },
  {
    href: '/tools/tax-compliance-checklist',
    I: ListChecks,
    title: 'Provincial Compliance Checklist',
    desc: 'Registration, payroll and annual filing tasks for your province — check them off, copy them out, stay onside.',
  },
]

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default function ToolsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
  ]
  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <SectionHeading kicker="Free tools" title="Useful beats downloadable." sub="Small interactive tools that answer a question in under a minute — no signup wall to try them." />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col rounded-[28px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/20 text-electric">
              <t.I className="size-5" aria-hidden="true" />
            </span>
            <h2 className="display-lg mt-5 text-[26px]">{t.title}</h2>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-soft">{t.desc}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-primary transition group-hover:text-electric">
              Open tool <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
