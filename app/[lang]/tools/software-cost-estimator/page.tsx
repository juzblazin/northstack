import type { Metadata } from 'next'
import CostEstimator from '../../../../src/components/portal/CostEstimator'
import Breadcrumbs from '../../../../src/components/portal/Breadcrumbs'
import JsonLd from '../../../../src/components/portal/JsonLd'
import { breadcrumbJsonLd } from '../../../../src/lib/seo'

export const metadata: Metadata = {
  title: 'Software Cost Estimator for Canadian SMBs',
  description:
    'Estimate your real monthly software spend: pick team size and tiers across accounting, payroll, CRM, support, hosting and design — USD and CAD totals.',
  alternates: { canonical: '/tools/software-cost-estimator' },
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export default function SoftwareCostEstimatorPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Software Cost Estimator', href: '/tools/software-cost-estimator' },
  ]
  return (
    <div className={`${wrap} pt-32 pb-24`}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="display-xl max-w-[820px] text-[38px] sm:text-[50px]">
        What does your software stack <span className="text-grad">really cost?</span>
      </h1>
      <p className="mt-5 max-w-[640px] text-[17px] leading-[1.65] text-ink-soft">
        Most SMBs underestimate their stack by 30–50%. Pick a tier per category, set your team size, and see the honest monthly number.
      </p>
      <div className="mt-12">
        <CostEstimator />
      </div>
    </div>
  )
}
