export const brand = {
  name: 'NorthStack',
  tagline: 'Plain-English guides and tools for Canadian small businesses.',
  copyright: '© 2026 NorthStack Inc.',
}

export type NavGroup = { label: string; blurb?: string; href?: string; items?: { title: string; desc?: string; href?: string }[] }
export const nav: NavGroup[] = [
  {
    label: 'Guides',
    blurb: 'Answer-first guides for Canadian SMBs.',
    items: [
      { title: 'Tax & Compliance', desc: 'SR&ED, GST/PST and cross-border rules.', href: '/guides/tax' },
      { title: 'Software & Tech Stack', desc: 'Hosting, SaaS picks and integrations.', href: '/guides/software' },
      { title: 'Operations & HR', desc: 'Payroll and employment standards by province.', href: '/guides/operations' },
      { title: 'Funding & Growth', desc: 'IRAP, CanExport and provincial grants.', href: '/guides/growth' },
      { title: 'All guides', desc: 'Every guide, newest first.', href: '/guides' },
    ],
  },
  {
    label: 'Provinces',
    blurb: 'Rules change at the border.',
    items: [
      { title: 'British Columbia', desc: 'PST, WorkSafeBC and EHT rules.', href: '/provinces/bc' },
      { title: 'Alberta', desc: 'GST-only, lowest corp rate.', href: '/provinces/ab' },
      { title: 'Ontario', desc: 'HST, WSIB and EHT exemption.', href: '/provinces/on' },
      { title: 'Quebec & other', desc: 'QST, CNESST and Law 25.', href: '/provinces/qc' },
      { title: 'All provinces', desc: 'Every provincial hub.', href: '/provinces' },
    ],
  },
  {
    label: 'Tools',
    blurb: 'Free tools that answer in a minute.',
    items: [
      { title: 'Software cost estimator', desc: 'Your real monthly stack number.', href: '/tools/software-cost-estimator' },
      { title: 'Compliance checklist', desc: 'Provincial tasks, checked off.', href: '/tools/tax-compliance-checklist' },
    ],
  },
]

export type FooterCol = { h: string; l: { t: string; href: string }[] }
const fl = (...t: string[]) => t.map((x) => ({ t: x, href: '#' }))
export const footerCols: FooterCol[] = [
  {
    h: 'Guides',
    l: [
      { t: 'All guides', href: '/guides' },
      { t: 'Tax & compliance', href: '/guides/tax' },
      { t: 'Software & stack', href: '/guides/software' },
      { t: 'Operations & HR', href: '/guides/operations' },
      { t: 'Funding & growth', href: '/guides/growth' },
    ],
  },
  {
    h: 'Provinces',
    l: [
      { t: 'All provinces', href: '/provinces' },
      { t: 'British Columbia', href: '/provinces/bc' },
      { t: 'Alberta', href: '/provinces/ab' },
      { t: 'Ontario', href: '/provinces/on' },
      { t: 'Quebec & other', href: '/provinces/qc' },
    ],
  },
  {
    h: 'Tools',
    l: [
      { t: 'All tools', href: '/tools' },
      { t: 'Software cost estimator', href: '/tools/software-cost-estimator' },
      { t: 'Compliance checklist', href: '/tools/tax-compliance-checklist' },
    ],
  },
  { h: 'Company', l: fl('About', 'Contact', 'Editorial policy', 'Advertise') },
]
export const legal = ['Privacy', 'Terms', 'Disclaimer', 'Cookie settings']

export const homeFaqs = [
  { q: 'What is NorthStack?', a: 'A free resource portal for Canadian small businesses — plain-English guides on tax, software, operations and funding, plus interactive tools like the cost estimator and provincial compliance checklist.' },
  { q: 'Is this legal or tax advice?', a: 'No. Guides are practical starting points written for founders and operators, not substitutes for an accountant or lawyer. Thresholds and rates change — always verify with CRA, Revenu Québec or your advisor before acting.' },
  { q: 'Which provinces do you cover?', a: 'British Columbia, Alberta, Ontario and Quebec today — the four largest SMB populations. Atlantic provinces and the territories are on the roadmap as the library grows.' },
  { q: 'Is everything free?', a: 'Yes. Every guide and both interactive tools are free, with no signup required to read or use them. The optional email briefing just sends you new guides as they publish.' },
]
