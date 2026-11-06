import type { Metadata } from 'next'
import ComplianceChecklist from '../../../../src/components/portal/ComplianceChecklist'
import Breadcrumbs from '../../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../../src/lib/seo'

export const metadata: Metadata = {
  title: 'Provincial Compliance Checklist for Canadian SMBs',
  description:
    'Interactive compliance checklist by province: registration, payroll and annual filing tasks for BC, Alberta, Ontario and Quebec small businesses.',
  alternates: { canonical: '/tools/tax-compliance-checklist' },
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default function TaxComplianceChecklistPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Tax Compliance Checklist', href: '/tools/tax-compliance-checklist' },
  ]
  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="display-xl max-w-[820px] text-[38px] sm:text-[50px]">
        Stay onside in <span className="text-grad">your province.</span>
      </h1>
      <p className="mt-5 max-w-[640px] text-[17px] leading-[1.65] text-ink-soft">
        Every registration, payroll body and annual filing your province expects — in one checkable list. Not legal advice; a very good starting point.
      </p>
      <div className="mt-12">
        <ComplianceChecklist />
      </div>
    </div>
  )
}
