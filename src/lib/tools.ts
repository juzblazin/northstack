export interface ToolPlan {
  name: string
  flat?: number
  perSeat?: number
}

export interface ToolCategory {
  key: string
  label: string
  desc: string
  plans: ToolPlan[]
}

export const estimatorCategories: ToolCategory[] = [
  {
    key: 'accounting',
    label: 'Accounting',
    desc: 'Books, invoicing, tax-ready reports',
    plans: [
      { name: 'None / spreadsheets', flat: 0 },
      { name: 'Essential (QuickBooks EasyStart tier)', flat: 20 },
      { name: 'Standard (Essentials tier)', flat: 45 },
      { name: 'Advanced (Plus tier + payroll-ready)', flat: 90 },
    ],
  },
  {
    key: 'payroll',
    label: 'Payroll',
    desc: 'Canadian payroll with CRA remittances',
    plans: [
      { name: 'None / contractor-only', flat: 0 },
      { name: 'Small team (base + per seat)', flat: 25, perSeat: 6 },
      { name: 'Growing team (full remittance + EHT)', flat: 49, perSeat: 10 },
    ],
  },
  {
    key: 'crm',
    label: 'CRM & Sales',
    desc: 'Pipeline, contacts, outreach',
    plans: [
      { name: 'Free tier', flat: 0 },
      { name: 'Starter', perSeat: 20 },
      { name: 'Professional', perSeat: 55 },
      { name: 'Sales-led (sequences + forecasting)', perSeat: 100 },
    ],
  },
  {
    key: 'pm',
    label: 'Project Management',
    desc: 'Tasks, sprints, client delivery',
    plans: [
      { name: 'Free tier', flat: 0 },
      { name: 'Standard', perSeat: 9 },
      { name: 'Premium (portfolios + reporting)', perSeat: 22 },
    ],
  },
  {
    key: 'comms',
    label: 'Email & Comms',
    desc: 'Domain email, chat, video',
    plans: [
      { name: 'Free / bundled', flat: 0 },
      { name: 'Workspace per seat', perSeat: 8 },
      { name: 'Workspace + recorded meetings', perSeat: 16 },
    ],
  },
  {
    key: 'support',
    label: 'Support Desk',
    desc: 'Shared inbox, help center, chat',
    plans: [
      { name: 'None / shared email', flat: 0 },
      { name: 'Shared inbox', perSeat: 15 },
      { name: 'Omnichannel (chat + social)', perSeat: 55 },
    ],
  },
  {
    key: 'hosting',
    label: 'Hosting & Infra',
    desc: 'VPS, database, CDN, backups',
    plans: [
      { name: 'Static / site builder', flat: 15 },
      { name: 'VPS + managed basics', flat: 40 },
      { name: 'Managed DB + staging + CDN', flat: 110 },
    ],
  },
  {
    key: 'design',
    label: 'Design & Creative',
    desc: 'Design tools, stock assets, brand',
    plans: [
      { name: 'Free tools', flat: 0 },
      { name: 'Single seat', perSeat: 16 },
      { name: 'Team plan', perSeat: 32 },
    ],
  },
]

export const fxNote =
  'Estimates in USD list prices. Most vendors bill in USD — multiply by ~1.4 for CAD and check whether your card waives FX fees.'

export interface ChecklistData {
  group: string
  tasks: string[]
}
