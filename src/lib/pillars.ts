import type { Pillar, PillarKey } from './types'

export const pillars: Record<PillarKey, Pillar> = {
  tax: {
    key: 'tax',
    title: 'Tax & Compliance',
    short: 'SR&ED, GST/PST and cross-border rules.',
    description:
      'Corporate tax thresholds, SR&ED credits, sales tax registration and provincial compliance for incorporated Canadian businesses.',
    seoTitle: 'Canadian Small Business Tax & Compliance Guides',
    seoDescription:
      'Practical tax and compliance guides for Canadian SMBs: SR&ED credits, GST/PST/HST/QST rules, corporate thresholds and provincial differences.',
  },
  software: {
    key: 'software',
    title: 'Software & Tech Stack',
    short: 'Hosting, SaaS picks and integrations.',
    description:
      'Software comparisons, hosting under $50/month, Canadian data residency and stack decisions for bootstrapped teams.',
    seoTitle: 'Software & Tech Stack Guides for Canadian SMBs',
    seoDescription:
      'Software and infrastructure guides for Canadian small businesses: affordable hosting, SaaS comparisons, integrations and data residency.',
  },
  operations: {
    key: 'operations',
    title: 'Operations & HR',
    short: 'Payroll and employment standards by province.',
    description:
      'Employment Standards Act differences, contractor classification, payroll setup and people ops across provinces.',
    seoTitle: 'Operations & HR Guides for Canadian SMBs',
    seoDescription:
      'HR and operations guides for Canadian SMBs: contractor vs employee rules, provincial employment standards and payroll compliance.',
  },
  growth: {
    key: 'growth',
    title: 'Funding & Growth',
    short: 'IRAP, CanExport and provincial grants.',
    description:
      'Federal and provincial innovation grants, non-dilutive funding, and growth programs available to Canadian SMBs.',
    seoTitle: 'Funding & Growth Grants for Canadian SMBs',
    seoDescription:
      'Funding guides for Canadian small businesses: NRC IRAP, CanExport, provincial innovation grants and non-dilutive capital.',
  },
}

export const pillarKeys = Object.keys(pillars) as PillarKey[]

export const isPillar = (v: string): v is PillarKey => v in pillars
