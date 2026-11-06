import type { Article } from './types'

let k = 0
const key = () => `k${k++}`

const p = (text: string) => ({
  _type: 'block' as const, _key: key(), style: 'normal', markDefs: [],
  children: [{ _type: 'span' as const, _key: key(), text, marks: [] }],
})
const h2 = (text: string) => ({ ...p(text), style: 'h2' })
const li = (text: string, listItem: 'bullet' | 'number' = 'bullet') => ({
  ...p(text), listItem, level: 1,
})
const callout = (body: string, tone: 'info' | 'warn' | 'tip' = 'info', title?: string) => ({
  _type: 'callout' as const, _key: key(), tone, title, body,
})
const table = (columns: string[], rows: string[][]) => ({
  _type: 'comparisonTable' as const, _key: key(), columns, rows,
})
const cta = (heading: string, body: string, buttonLabel: string, href: string) => ({
  _type: 'cta' as const, _key: key(), heading, body, buttonLabel, href,
})

export const seedArticles: Article[] = [
  {
    slug: 'sred-tax-credits-canadian-smb',
    title: 'SR&ED Tax Credits for Canadian Small Businesses: What Qualifies',
    pillar: 'tax',
    excerpt:
      'SR&ED gives Canadian-controlled private corporations a refundable 35% investment tax credit on the first $3 million of qualifying R&D spending — and 15% non-refundable above that. If your team solves technical problems with uncertain outcomes, you probably qualify.',
    publishedAt: '2026-01-14',
    updatedAt: '2026-02-02',
    readingTime: 7,
    body: [
      h2('What actually counts as SR&ED'),
      p('The CRA looks for systematic investigation carried out to resolve technological uncertainty. Routine bug fixing, cosmetic redesigns and data entry do not qualify. Prototyping a novel algorithm, engineering around a platform limitation, or experimenting where the outcome was genuinely uncertain usually does.'),
      callout('The test is not whether the project succeeded — it is whether competent professionals could not predict the outcome in advance. Failed experiments still generate eligible expenditures.', 'tip', 'Failed work counts'),
      h2('Credit rates for CCPCs vs other corporations'),
      table(
        ['Claimant type', 'First $3M of spend', 'Above $3M', 'Refundable?'],
        [
          ['CCPC (Canadian-controlled private corp)', '35%', '15%', 'Yes, fully refundable for most CCPCs'],
          ['Public corp / foreign-controlled', '15%', '15%', 'No — reduces taxes payable only'],
          ['Individuals / partnerships', '15%', '15%', 'Partially'],
        ]
      ),
      h2('Eligible expenditures'),
      li('Salaries and wages of employees directly performing or supervising R&D'),
      li('Materials consumed or transformed in the experimentation'),
      li('80% of payments to arm’s-length contractors doing SR&ED on your behalf'),
      li('Overhead via the proxy method (55% of direct salaries) or itemized traditional method'),
      h2('The mistakes that trigger reviews'),
      p('The three most common problems: claiming a whole employee’s salary instead of their actual R&D hours, filing without contemporaneous documentation (timesheets, commits, test logs), and describing a business goal instead of a technological uncertainty in the T661 narrative.'),
      callout('Keep a lightweight log throughout the year — dated experiments, hypotheses and results. Reconstructing a year of work at filing time is where claims fall apart.', 'warn', 'Documentation habit'),
      h2('Stacking with provincial credits'),
      p('British Columbia offers an additional 10% refundable credit for CCPCs, Quebec offers its R&D wage credit, and most provinces have parallel programs. A $200K qualifying salary pool in BC can return roughly $95K combined — before any associated grants.'),
      cta('Doing R&D in Canada?', 'We help SMBs structure SR&ED claims that survive review — documentation habits, defensible narratives, clean allocations.', 'Talk to us', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Can a pre-revenue startup claim SR&ED?', a: 'Yes — that is the point of the refundable credit. A CCPC with no taxes payable still receives the 35% credit as a cash refund.' },
      { q: 'Does work for clients count?', a: 'Only if your company bears the technical risk. If a client pays you to solve the uncertainty and keeps the IP, it is usually their claim, not yours.' },
      { q: 'How far back can I claim?', a: 'SR&ED is filed with your T2, up to 18 months after the tax year end for corporations. Miss it and the year is gone.' },
      { q: 'Does software development qualify?', a: 'Often, yes — when it involves genuine technological uncertainty. Novel architecture, performance constraints or integration problems nobody has solved can qualify; routine CRUD work does not.' },
    ],
    seoMetadata: {
      title: 'SR&ED Tax Credits for Canadian SMBs: Rates, Eligibility & Filing',
      description: 'What qualifies for SR&ED in Canada, the 35% refundable credit for CCPCs, eligible expenses, provincial stacking, and the documentation habits that survive CRA review.',
    },
    related: ['gst-pst-hst-sales-tax-provinces', 'nrc-irap-vs-canexport'],
  },
  {
    slug: 'gst-pst-hst-sales-tax-provinces',
    title: 'GST, PST, HST and QST: Charging Sales Tax Across Canadian Provinces',
    pillar: 'tax',
    excerpt:
      'You must register for GST/HST once worldwide taxable revenue passes $30,000 in a single quarter or four consecutive quarters. Which rate you charge depends on the customer’s province — not yours — and Quebec runs a separate QST registration through Revenu Québec.',
    publishedAt: '2026-01-20',
    readingTime: 8,
    body: [
      h2('The four sales tax systems'),
      table(
        ['Province', 'System', 'Rate', 'Administered by'],
        [
          ['Alberta, Territories', 'GST only', '5%', 'CRA'],
          ['British Columbia', 'GST + PST', '5% + 7%', 'CRA + BC'],
          ['Ontario', 'HST', '13%', 'CRA'],
          ['Quebec', 'GST + QST', '5% + 9.975%', 'CRA + Revenu Québec'],
          ['Saskatchewan', 'GST + PST', '5% + 6%', 'CRA + SK'],
          ['Manitoba', 'GST + RST', '5% + 7%', 'CRA + MB'],
          ['Atlantic provinces', 'HST', '15%', 'CRA'],
        ]
      ),
      h2('Place of supply: whose rate you charge'),
      p('For goods, the rate follows where the goods are delivered. For services and digital products, it generally follows the customer’s address. A Vancouver freelancer invoicing a Toronto client charges 13% HST, not 5% GST.'),
      callout('E-commerce platforms and most invoicing tools can auto-assign tax by customer province — configure the tax table once and audit a few invoices quarterly.', 'tip', 'Let the tool do it'),
      h2('The $30,000 small supplier rule'),
      p('Below the threshold you can skip registration entirely, or register voluntarily to claim input tax credits on purchases. Voluntary registration usually pays off once you spend meaningfully on taxable inputs — software, equipment, contractors charging GST.'),
      h2('PST registrations are separate'),
      p('BC, Saskatchewan and Manitoba each require their own provincial registration, and most now require out-of-province sellers to register once they make taxable sales into the province — even without a physical presence there. Quebec’s specified QST regime works the same way for remote sellers.'),
      callout('If you sell a SaaS product Canada-wide, you may need four separate registrations: GST/HST with CRA plus PST/QST accounts in BC, Saskatchewan, Manitoba and Revenu Québec.', 'warn', 'Remote seller rules'),
      cta('Not sure which registrations you need?', 'Our provincial compliance checklist maps every registration to your province and revenue model.', 'Run the checklist', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Do I charge sales tax to US or international clients?', a: 'Exports are generally zero-rated — you charge 0% but still report the sale and keep your input tax credits.' },
      { q: 'What happens if I forget to register past $30K?', a: 'CRA can assess retroactive GST/HST you should have collected — you pay it out of pocket, plus interest and penalties.' },
      { q: 'Do independent contractors need to register?', a: 'The same $30,000 rule applies to sole proprietors and contractors. Most incorporated consultants register immediately to reclaim ITCs.' },
      { q: 'Is QST charged on top of GST?', a: 'QST is 9.975% applied to the selling price excluding GST (since 2013, it is no longer tax-on-tax).' },
    ],
    seoMetadata: {
      title: 'GST, PST, HST & QST in Canada: Sales Tax Rules by Province',
      description: 'Which sales tax to charge in each Canadian province, the $30,000 small supplier threshold, place of supply rules, and separate PST/QST registrations for remote sellers.',
    },
    related: ['bc-employer-health-tax', 'ontario-hst-ecommerce-thresholds'],
  },
  {
    slug: 'cloud-hosting-under-50-canadian-smb',
    title: 'Best Cloud Hosting for Canadian SMBs Under $50/Month',
    pillar: 'software',
    excerpt:
      'A realistic Canadian SMB stack — VPS, managed database, object storage, backups and a CDN — runs $30–$48/month on Hetzner, DigitalOcean or OVH’s Canadian regions. The catch: CAD billing is rare, so budget a 40% USD conversion buffer.',
    publishedAt: '2026-01-28',
    readingTime: 6,
    body: [
      h2('A realistic under-$50 stack'),
      table(
        ['Component', 'Typical pick', 'Monthly cost (USD)'],
        [
          ['VPS / app server', 'Hetzner CX22 or DO Basic 2GB', '$4–$12'],
          ['Managed database', 'DO managed Postgres (or self-host)', '$0–$15'],
          ['Object storage', 'Backblaze B2 / Cloudflare R2', '$1–$5'],
          ['CDN + WAF', 'Cloudflare free or Pro', '$0–$20'],
          ['Backups', 'Provider snapshots', '$1–$3'],
          ['Email sending', 'Transactional provider free tier', '$0'],
        ]
      ),
      p('Total: roughly $25–$48 USD depending on how much you self-manage. Self-hosting Postgres on the same VPS is the single biggest lever — it trades a bit of operational risk for $15/month back.'),
      h2('Canadian regions that matter'),
      p('If your customers are Canadian or your data has residency requirements, pick a provider with Canadian regions: OVHcloud (Beauharnois, QC), AWS ca-central-1 (Montreal), Google Cloud Montreal and Toronto, Azure Canada Central (Toronto) and Canada East (Quebec City). Hetzner is cheapest but has no Canadian region — Toronto or Quebec customers see 20–40ms extra latency from its US-East Ashburn region.'),
      callout('PIPEDA does not require Canadian data to stay in Canada, but several provincial public-sector rules do — and many enterprise clients ask for it contractually. Quebec’s Law 25 adds real residency considerations for personal data.', 'info', 'Residency reality'),
      h2('The CAD billing problem'),
      p('Almost every cloud provider bills in USD. On a $40/month bill you are paying ~$55 CAD plus FX fees on your card. Two mitigations: OVHcloud.ca bills in CAD, and most business cards waive FX fees — check yours before assuming it does.'),
      h2('When to leave the $50 tier'),
      li('You need managed HA databases — a real failover cluster starts around $60/month alone'),
      li('Compliance requirements (SOC 2 evidence, audit logging) push you to bigger managed platforms'),
      li('Traffic crosses ~1–2 TB/month and bandwidth pricing starts dominating the bill'),
      cta('Map your real monthly spend', 'Our estimator stacks hosting, SaaS and per-seat tools into one number for your team size.', 'Estimate my stack', '/tools/software-cost-estimator'),
    ],
    faqs: [
      { q: 'Is Hetzner a good choice for a Canadian business?', a: 'On pure price, yes — it is 30–50% cheaper than US providers. But it has no Canadian region and bills in EUR, so weigh latency and FX against the savings.' },
      { q: 'Do I need a managed database?', a: 'Not at small scale. A self-hosted Postgres with automated backups on the same VPS is fine until the data is worth more than your time to restore it.' },
      { q: 'Is shared hosting like GoDaddy/HostPapa good enough?', a: 'For a brochure site, maybe. For anything dynamic or business-critical, a $6 VPS is faster, more secure and easier to back up properly.' },
      { q: 'What about Canadian-owned hosts?', a: 'OVHcloud (Beauharnois DCs), HostPapa and WebHostingCanada are the usual picks. OVH is the only one with real cloud-scale infrastructure in-country.' },
    ],
    seoMetadata: {
      title: 'Cloud Hosting for Canadian SMBs Under $50/Month (2026)',
      description: 'A realistic under-$50 cloud stack for Canadian small businesses: VPS, database, storage and CDN picks, Canadian regions for data residency, and the USD billing trap.',
    },
    related: ['canadian-data-residency-saas', 'nrc-irap-vs-canexport'],
  },
  {
    slug: 'canadian-data-residency-saas',
    title: 'Canadian Data Residency: Where Should Your SaaS Data Live?',
    pillar: 'software',
    excerpt:
      'PIPEDA does not force data to stay in Canada — but Quebec’s Law 25, BC and Nova Scotia public-sector rules, and client contracts often do. For most SMBs the practical answer is: pick vendors with Canadian regions for anything personal, contractual or regulated.',
    publishedAt: '2026-02-05',
    readingTime: 6,
    body: [
      h2('What the law actually requires'),
      p('PIPEDA permits cross-border transfers as long as you remain accountable for the data — you must disclose that data may be processed abroad and ensure comparable protection. Quebec’s Law 25 is stricter: it requires a privacy impact assessment before communicating personal information outside Quebec, and some organizations now default to in-country hosting.'),
      callout('BC’s FIPPA and Nova Scotia’s FOIPOP restrict public bodies — schools, health authorities, municipalities — from storing personal data outside Canada. If you sell to the public sector in those provinces, Canadian residency is effectively mandatory.', 'warn', 'Public sector sales'),
      h2('Who offers Canadian regions'),
      table(
        ['Vendor', 'Canadian region(s)', 'Notes'],
        [
          ['AWS', 'Montreal (ca-central-1), Calgary (ca-west-1)', 'Full service catalog; Calgary newer'],
          ['Google Cloud', 'Montreal, Toronto', 'Strong for data/analytics workloads'],
          ['Azure', 'Toronto, Quebec City', 'Preferred in MS-heavy enterprises'],
          ['OVHcloud', 'Beauharnois QC', 'CAD billing, cheapest in-country option'],
          ['Shopify', 'Canada for core store data', 'Some apps process abroad — audit them'],
        ]
      ),
      h2('The audit you actually need to do'),
      p('Your hosting region is only half the story. Support tools, analytics, error trackers and email providers routinely process data in the US. A residency audit means listing every vendor that touches personal data and checking their data processing agreement — most publish a data location statement.'),
      li('Inventory every vendor touching customer or employee personal data'),
      li('Check each vendor’s DPA for processing location and sub-processors'),
      li('Update your privacy policy to disclose cross-border processing honestly'),
      li('For Quebec users, document a PIA for any out-of-province processing'),
      cta('Selling to enterprise or public sector?', 'Residency questions land in every security review. We help SMBs prepare the answers once, properly.', 'Get prepared', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Does PIPEDA require data to stay in Canada?', a: 'No. PIPEDA allows cross-border processing if you stay accountable and disclose it. The hard requirements come from provincial public-sector laws and contracts.' },
      { q: 'Is US hosting illegal for Canadian SMBs?', a: 'Not illegal for most private businesses — but it creates extra disclosure duties and can be a dealbreaker for public-sector or privacy-sensitive clients.' },
      { q: 'Does Quebec Law 25 apply to me outside Quebec?', a: 'If you handle personal information of Quebec residents, parts of it do — including the PIA requirement for cross-border communication of personal information.' },
      { q: 'What is a data processing agreement?', a: 'A contract where your vendor commits to how and where it processes personal data on your behalf. Law 25 and enterprise procurement both expect you to have them.' },
    ],
    seoMetadata: {
      title: 'Canadian Data Residency for SMBs: Law 25, PIPEDA & Regions',
      description: 'Do Canadian SMBs need data residency? What PIPEDA, Quebec Law 25 and public-sector rules actually require, plus which cloud and SaaS vendors offer Canadian regions.',
    },
    related: ['cloud-hosting-under-50-canadian-smb', 'contractor-vs-employee-canada'],
  },
  {
    slug: 'contractor-vs-employee-canada',
    title: 'Contractor vs Employee in Canada: Classification Rules That Matter',
    pillar: 'operations',
    excerpt:
      'CRA judges the real relationship, not the contract title: control over work, ownership of tools, chance of profit, and integration into your business. Misclassification means you owe back CPP, EI, vacation pay and penalties — and provinces apply their own tests on top.',
    publishedAt: '2026-01-09',
    readingTime: 7,
    body: [
      h2('The four-factor CRA test'),
      p('CRA looks at the whole working relationship. No single factor is decisive, and the written contract is evidence — not the answer.'),
      li('Control: who decides hours, methods, order of work and where it happens', 'number'),
      li('Tools and equipment: who provides the laptop, software and workspace', 'number'),
      li('Chance of profit and risk of loss: can they make more by working efficiently, or lose money on a bad job', 'number'),
      li('Integration: is the work an integral part of your business, or an accessory service', 'number'),
      callout('A consultant with multiple clients, their own equipment, fixed-price deliverables and control over their schedule is a contractor. Someone working 40 set hours a week on your Slack, on your laptop, indefinitely — that is an employee no matter what the invoice says.', 'tip', 'The smell test'),
      h2('What misclassification costs'),
      p('If CRA reclassifies a contractor as an employee, the employer owes the employer share of CPP and EI retroactively, plus the employee share it failed to withhold, plus penalties and interest. The province can separately pursue unpaid vacation pay, overtime and termination entitlements under its employment standards act.'),
      table(
        ['Risk', 'Federal consequence', 'Provincial consequence'],
        [
          ['Unpaid CPP/EI', 'Back premiums + 1–10% penalties + interest', '—'],
          ['Employment standards', '—', 'Vacation pay, overtime, notice/severance owed'],
          ['Termination', '—', 'Common-law notice can reach months of pay'],
          ['Benefits', '—', 'Possible benefits/tax exposure recharacterized as wages'],
        ]
      ),
      h2('Cross-border wrinkle: US contractors'),
      p('Canadian companies engaging US contractors generally do not withhold Canadian tax — but get a completed W-8BEN for your files, and remember the contractor handles their own IRS obligations. The reverse — a Canadian contracting for US clients — can create a permanent establishment question for the US company, which is their problem to assess, not yours.'),
      h2('Structure engagements to survive scrutiny'),
      li('Contract for deliverables and outcomes, not hours and presence'),
      li('Contractors invoice you; you never put them on payroll-like payment schedules'),
      li('They carry their own insurance, tools and ideally other clients'),
      li('If the relationship drifts toward employment, convert them — payroll is cheaper than reassessment'),
      cta('Scaling a distributed team?', 'Classification is one line item on our provincial compliance checklist — payroll, workers comp and registrations included.', 'Check my province', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Does a signed contractor agreement settle it?', a: 'No. It helps, but CRA and the courts look at how the relationship actually operates day to day.' },
      { q: 'Can a contractor work exclusively for me?', a: 'Long-term exclusivity is a strong indicator of employment. It is not automatically fatal, but combined with your tools and your schedule, it usually tips the scale.' },
      { q: 'What is a personal services business?', a: 'A corporation whose worker would reasonably be an employee of the client without the corp. PSBs lose the small business deduction and most expense deductions — a punitive classification.' },
      { q: 'Do employment standards tests differ by province?', a: 'Yes — the factors rhyme, but Ontario’s ESA, BC’s ESA and Quebec’s labour standards act each have their own nuances and remedies. Check both levels.' },
    ],
    seoMetadata: {
      title: 'Contractor vs Employee in Canada: CRA Tests & Misclassification',
      description: 'How CRA and provincial bodies decide contractor vs employee, the four-factor test, misclassification costs, and how to structure engagements that survive review.',
    },
    related: ['ontario-vs-bc-employment-standards', 'bc-employer-health-tax'],
  },
  {
    slug: 'ontario-vs-bc-employment-standards',
    title: 'Ontario vs BC Employment Standards: Payroll Differences That Matter',
    pillar: 'operations',
    excerpt:
      'Ontario and BC both require 4–6% vacation accrual and overtime after 40–44 weekly hours — but BC adds 8-hour daily overtime, different statutory holidays, and a mandatory 10-day sick-leave floor Ontario lacks. One payroll config does not fit both.',
    publishedAt: '2026-01-22',
    readingTime: 7,
    body: [
      h2('The side-by-side'),
      table(
        ['Rule', 'Ontario', 'British Columbia'],
        [
          ['Minimum wage (2025/26)', '$17.60/hr (Oct 2025)', '$17.85/hr (Jun 2025)'],
          ['Weekly overtime trigger', 'After 44 hrs', 'After 40 hrs'],
          ['Daily overtime trigger', 'None (weekly only)', 'After 8 hrs; 2x after 12 hrs'],
          ['Vacation', '4% (<5 yrs), 6% (5+ yrs)', '4% (<5 yrs), 6% (5+ yrs)'],
          ['Paid sick days', '0 (3 unpaid ESA days)', '5 paid + 3 unpaid (illness/injury)'],
          ['Statutory holidays', '9 public holidays', '11 statutory holidays'],
          ['Termination notice (ESA)', '1 wk/yr to max 8 wks', '1 wk after 3 mo, up to 8 wks'],
          ['Payroll health tax', 'EHT, exempt under $1M payroll', 'EHT, exempt under $500K payroll'],
        ]
      ),
      h2('The traps for national payrolls'),
      li('BC daily overtime catches 4x10 schedules that are perfectly legal in Ontario'),
      li('BC has more stat holidays — a single holiday calendar underpays BC staff twice a year'),
      li('Ontario’s EHT exemption ($1M) is double BC’s ($500K), so a mid-size payroll can owe EHT in BC and nothing in Ontario'),
      li('Sick leave is paid in BC and unpaid under the Ontario ESA — copy-paste policies quietly shortchange BC employees'),
      callout('Most payroll platforms (Wagepoint, QuickBooks Payroll, Humi, Rise) handle provincial rules if each employee’s province is set correctly. The errors come from remote staff assigned to head office’s province by default.', 'warn', 'Remote-first default'),
      h2('Federal vs provincial jurisdiction'),
      p('Banks, airlines, telecoms, interprovincial transport and a few other industries are federally regulated under the Canada Labour Code — a separate rulebook entirely, with 10 paid sick days and different notice. If any part of your team is federally regulated, their rules do not follow the province they sit in.'),
      cta('Hiring across provinces?', 'Run the province-specific compliance checklist — registrations, payroll bodies and annual filings in one list.', 'Open the checklist', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Which province’s rules apply to remote workers?', a: 'Generally the province where the employee physically performs the work — not where your company is incorporated.' },
      { q: 'Is BC daily overtime really enforced?', a: 'Yes. WorkSafeBC and the Employment Standards Branch see regular complaints; 4x10 compressed schedules need either an averaging agreement or daily-OT budgeting.' },
      { q: 'Do both provinces require ESA poster/policy distribution?', a: 'Both require employees to receive ESA information — Ontario mandates a poster and employment standards handouts; BC requires the information be available.' },
      { q: 'What about Quebec employees on the same payroll?', a: 'Quebec is a third rulebook: CNESST, QPIP, HSF contributions, and the separate labour standards act. Treat it as its own payroll jurisdiction.' },
    ],
    seoMetadata: {
      title: 'Ontario vs BC Employment Standards: Payroll Rule Differences',
      description: 'Key ESA differences between Ontario and BC for payroll: overtime triggers, vacation, sick days, stat holidays, termination notice and employer health tax thresholds.',
    },
    related: ['contractor-vs-employee-canada', 'ontario-hst-ecommerce-thresholds'],
  },
  {
    slug: 'nrc-irap-vs-canexport',
    title: 'NRC IRAP vs CanExport: Which Federal Grant Fits Your SMB?',
    pillar: 'growth',
    excerpt:
      'IRAP funds domestic R&D projects — typically 60–80% of eligible salary and contractor costs on projects up to ~$500K. CanExport funds international expansion — up to $50K toward 50% of export marketing costs. Most growing SMBs should plan around both, for different budgets.',
    publishedAt: '2026-02-01',
    readingTime: 6,
    body: [
      h2('Different programs, different jobs'),
      table(
        ['', 'NRC IRAP', 'CanExport SMEs'],
        [
          ['Funds', 'R&D and innovation projects', 'International market expansion'],
          ['Typical size', 'Project-based; can reach $500K+', 'Up to $50,000 per application'],
          ['Covers', 'Salaries and contractor costs for technical staff', 'Travel, trade shows, market research, translation, IP in new markets'],
          ['Cost share', 'Typically 60–80% of eligible costs', 'Up to 50% of eligible costs'],
          ['Gatekeeper', 'Assigned Industrial Technology Advisor', 'Trade Commissioner Service'],
          ['Timeline', 'Relationship-driven; months', 'Application windows; ~8-12 week decisions'],
        ]
      ),
      h2('IRAP in practice'),
      p('You do not apply for IRAP cold — you contact NRC, get assessed, and are assigned an Industrial Technology Advisor who decides whether to champion a project. The bar: 1–500 employees, incorporated, profit-oriented, and doing genuine innovation. The ITA relationship is the whole game; a good one effectively co-designs your project into something fundable.'),
      callout('IRAP stacks beautifully with SR&ED but you must not double-dip the same dollars — grants reduce the expenditure pool your SR&ED credit is calculated on. Model the net benefit; it is almost always still strongly positive.', 'info', 'SR&ED interaction'),
      h2('CanExport in practice'),
      p('CanExport reimburses up to half of export-development costs for a market where you have little or no revenue. Eligible spend: trade shows, travel, market research, adaptation of marketing materials, IP protection. It is competitive, judged on whether the market and strategy make sense — a fuzzy "expand to Europe" application loses to "launch in Germany, targeting these three distributor types".'),
      h2('Provincial stacking'),
      p('Most provinces run parallel programs — Alberta Innovates vouchers, Ontario’s regional FedDev streams, Investissement Québec, Innovate BC. The strongest SMB funding stacks sequence them: provincial voucher for early prototype, IRAP for the engineering push, CanExport when the product travels.'),
      cta('Building a funding stack?', 'We help SMBs sequence grants so each program funds a different phase — without double-dipping.', 'Map my options', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Do IRAP or CanExport take equity?', a: 'No — both are non-dilutive contributions. The trade-off is reporting overhead and cost-share requirements.' },
      { q: 'Can I apply to both at once?', a: 'Yes. They fund different activity (R&D vs market expansion), so parallel applications are normal and expected.' },
      { q: 'What is the success rate?', a: 'Neither publishes a clean number. CanExport is more transactional and rejection-prone for vague applications; IRAP depends heavily on ITA capacity in your region.' },
      { q: 'Are sole proprietors eligible?', a: 'CanExport requires incorporated or LLP status with revenue. IRAP works with incorporated businesses and occasionally pre-incorporation innovators via partners.' },
    ],
    seoMetadata: {
      title: 'NRC IRAP vs CanExport: Federal Grant Guide for Canadian SMBs',
      description: 'IRAP vs CanExport compared for Canadian small businesses: what each funds, cost-share rates, eligibility, SR&ED interaction and how to sequence both.',
    },
    related: ['bc-small-business-grants-stack', 'sred-tax-credits-canadian-smb'],
  },
  {
    slug: 'bc-employer-health-tax',
    title: 'BC Employer Health Tax: Do You Actually Need to Pay It?',
    pillar: 'tax',
    province: 'bc',
    excerpt:
      'BC’s Employer Health Tax charges 2.925% of total BC remuneration — but only once annual payroll passes $500,000, and at a reduced rate up to $1.5M. Most SMBs under $500K in BC payroll owe nothing but should still understand the threshold mechanics.',
    publishedAt: '2026-01-16',
    readingTime: 5,
    body: [
      h2('How the threshold works'),
      table(
        ['Annual BC payroll', 'EHT status'],
        [
          ['$500,000 or less', 'Exempt — no tax, no filing'],
          ['$500,000.01 to $1,500,000', 'Reduced rate: 2.925% on payroll over $500,000'],
          ['Over $1,500,000', 'Full 2.925% on total payroll'],
        ]
      ),
      p('The threshold applies to associated corporations combined — two related companies each paying $300K are a $600K payroll for EHT purposes.'),
      h2('What counts as remuneration'),
      li('Salaries, wages, bonuses and commissions'),
      li('Taxable benefits (RRSP contributions, stock options, vehicle benefits)'),
      li('Amounts paid to employees who report for work in BC — remote BC residents on your payroll count'),
      callout('EHT is calculated on BC remuneration, not where the company is incorporated. An Alberta company with BC employees can owe BC EHT.', 'warn', 'Location of the employee'),
      h2('Registration and instalments'),
      p('Once you cross $500K you must register through eTaxBC, file annually by March 31 of the following year, and pay quarterly instalments if your prior-year tax exceeded $2,925. The registration step catches people — crossing the threshold mid-year still triggers a filing obligation.'),
      cta('BC payroll under control?', 'The full BC compliance list — PST, WorkSafeBC, licences and EHT — is one click away.', 'Run the BC checklist', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Do contractors count toward the EHT threshold?', a: 'No — EHT applies to employment remuneration. True independent contractors do not count, but misclassified ones will surface in an audit.' },
      { q: 'When did EHT start?', a: 'January 1, 2019, replacing MSP premiums for employers.' },
      { q: 'Is EHT deductible?', a: 'Yes — it is a deductible business expense for income tax purposes.' },
      { q: 'What if payroll crosses $500K mid-year?', a: 'You still register and file for that year, paying the reduced rate on the amount over the threshold.' },
    ],
    seoMetadata: {
      title: 'BC Employer Health Tax: Thresholds, Rates & Registration',
      description: 'BC EHT explained for small businesses: the $500,000 exemption, 2.925% rate, what counts as remuneration, instalments and eTaxBC registration.',
    },
    related: ['ontario-vs-bc-employment-standards', 'gst-pst-hst-sales-tax-provinces'],
  },
  {
    slug: 'ontario-hst-ecommerce-thresholds',
    title: 'Ontario HST for E-commerce: Registration Thresholds and Rates',
    pillar: 'tax',
    province: 'on',
    excerpt:
      'Ontario e-commerce sellers register for HST once worldwide taxable sales pass $30,000, then charge the customer’s province rate — 13% in Ontario, 5% to Alberta, 15% to Nova Scotia. Marketplace-facilitated sales are usually collected for you.',
    publishedAt: '2026-01-25',
    readingTime: 6,
    body: [
      h2('The two thresholds that matter'),
      li('Small supplier threshold: $30,000 in worldwide taxable revenue over four quarters (or one quarter). Below it, registration is optional — above it, mandatory.', 'number'),
      li('Marketplace rules: sales through Amazon, Etsy, Walmart Marketplace and similar are generally collected and remitted by the platform. Your own Shopify/WooCommerce store is on you.', 'number'),
      h2('Charging the right rate'),
      p('Ontario charges 13% HST to Ontario customers — but place-of-supply rules mean you charge the destination province’s rate for every order. An Ontario store shipping to BC charges 5% GST (and whether you owe BC PST depends on BC’s remote-seller rules — usually yes above a minimal threshold).'),
      callout('Shopify’s tax engine handles destination rates correctly if your tax registrations are configured under Settings → Taxes and duties. The common failure is registering for HST but leaving every other province unconfigured, which under-collects provincial tax.', 'warn', 'Platform gotcha'),
      h2('Input tax credits: why early registration can pay'),
      p('Every dollar of HST you pay on inventory, packaging, software or shipping supplies is recoverable as an input tax credit — but only once registered. Pre-launch spend like initial inventory orders often justifies registering before you cross $30K.'),
      h2('Quick method accounting'),
      p('Businesses under ~$400K in revenue can elect the Quick Method: charge 13%, remit only 8.8% on the first $30K and 10.5% beyond (Ontario rates), and forgo most ITCs. For service businesses with few taxable inputs, it wins. For inventory-heavy stores, it usually loses — run the numbers with your accountant.'),
      cta('Selling beyond Ontario?', 'Each province has its own registration logic. The checklist maps yours.', 'Open the checklist', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Does the $30K include sales through Amazon?', a: 'Marketplace-facilitated sales generally do not count toward your threshold because the platform is deemed the supplier for those sales.' },
      { q: 'Do I charge HST to US customers?', a: 'No — exports are zero-rated. Charge 0%, keep proof of export.' },
      { q: 'When are HST returns due?', a: 'Depends on your assigned frequency — annual for most small filers (due 3 months after year end, though payment may be due April 30), quarterly or monthly for larger ones.' },
      { q: 'Do digital products follow the same rules?', a: 'Yes — digital goods are taxable supplies with place-of-supply driven by customer location.' },
    ],
    seoMetadata: {
      title: 'Ontario HST for E-commerce: $30K Threshold, Rates & Filing',
      description: 'HST rules for Ontario e-commerce sellers: the $30,000 threshold, destination-based rates, marketplace collection, input tax credits and Quick Method election.',
    },
    related: ['gst-pst-hst-sales-tax-provinces', 'bc-employer-health-tax'],
  },
  {
    slug: 'alberta-corporate-tax-small-business',
    title: 'Alberta Corporate Tax: The Small Business Rate, Explained',
    pillar: 'tax',
    province: 'ab',
    excerpt:
      'An Alberta CCPC pays a combined 11% on its first $500,000 of active business income (9% federal + 2% Alberta) and 23% above that — the lowest combined rate in Canada. There is no PST, which keeps total tax drag the lightest in the country.',
    publishedAt: '2026-02-03',
    readingTime: 5,
    body: [
      h2('The rates'),
      table(
        ['Income type', 'Federal', 'Alberta', 'Combined'],
        [
          ['Active business income under $500K (CCPC)', '9%', '2%', '11%'],
          ['Active business income above $500K', '15%', '8%', '23%'],
          ['Investment income (CCPC)', '~38.7%', '8%', '~46.7%'],
        ]
      ),
      h2('What the small business deduction actually requires'),
      li('Be a Canadian-controlled private corporation'),
      li('Earn active business income — not investment income or a personal services business'),
      li('Stay under the $500K limit, which is shared across associated corporations'),
      li('Watch the passive-income grind: $50K+ of passive investment income starts shrinking the $500K room'),
      callout('The $500K small business limit is shared by associated companies. Two corps under common control split one limit — structure matters before you multiply entities.', 'warn', 'Association rules'),
      h2('The Alberta-specific quirks'),
      p('Alberta files its own corporate return — the AT1 — separate from the federal T2, though most software files both together. And with no PST, the sales-tax burden is a single 5% GST registration. For holding companies, Alberta’s lack of PST also simplifies intercompany invoicing.'),
      h2('Salary vs dividends at Alberta rates'),
      p('At an 11% small-business rate, the classic dilemma tilts slightly toward retaining earnings in the corp when personal rates are high — Alberta’s top personal marginal rate is ~48%, and eligible dividend gross-up math still favors salary for RRSP room and CPP. The honest answer is always personal: income needs, RRSP/TFSA room, and whether income splitting through family shareholders is available.'),
      cta('Incorporated in Alberta?', 'Our checklist covers the AT1, GST registration, WCB and licences for your situation.', 'Run the Alberta checklist', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Is 11% really the lowest small business rate in Canada?', a: 'Combined, yes — Alberta’s 2% provincial rate is the lowest, and there is no PST on top of it.' },
      { q: 'Does the $500K limit reset each year?', a: 'It applies per tax year, shared across associated corporations.' },
      { q: 'Do I file a separate Alberta return?', a: 'Yes — the AT1 goes to Alberta Tax and Revenue Administration, filed alongside the federal T2.' },
      { q: 'Can a US-owned company get the 2% rate?', a: 'No — the small business deduction requires Canadian-controlled private corporation status.' },
    ],
    seoMetadata: {
      title: 'Alberta Corporate Tax Rate: Small Business Guide (2026)',
      description: 'Alberta corporate tax for small businesses: the 11% combined small business rate, $500K limit, AT1 filing, passive income grind and salary vs dividend basics.',
    },
    related: ['gst-pst-hst-sales-tax-provinces', 'sred-tax-credits-canadian-smb'],
  },
  {
    slug: 'qst-registration-non-quebec-sellers',
    title: 'QST Registration for Non-Quebec Sellers: The Rules That Surprise People',
    pillar: 'tax',
    province: 'qc',
    excerpt:
      'If you sell taxable goods, software or services to Quebec consumers, you likely owe QST registration to Revenu Québec — even with no presence there — under the specified registration system that has applied to Canadian sellers since 2019. The threshold is the same $30,000.',
    publishedAt: '2026-01-30',
    readingTime: 6,
    body: [
      h2('Two different QST systems'),
      li('General system: for businesses with a Quebec presence — you collect QST on B2B and B2C sales, claim input tax refunds, file regular returns.', 'number'),
      li('Specified system: for out-of-province sellers (and non-residents) selling to Quebec consumers — B2C only, no input tax refunds, simplified quarterly filing.', 'number'),
      p('The specified system is the one that surprises people: it exists specifically to catch sellers in Toronto, Vancouver and beyond who ship to Quebecers.'),
      callout('Business-to-business sales to QST-registered Quebec businesses are generally exempt from specified registration — the obligation targets consumer sales.', 'info', 'B2B carve-out'),
      h2('What triggers registration'),
      p('More than $30,000 in taxable sales to Quebec consumers over the preceding 12 months — goods, digital products, SaaS subscriptions, and most services. Marketplaces (Amazon, app stores) are generally deemed to collect for you on facilitated sales, same as HST.'),
      h2('Quebec adds its own wrinkles'),
      li('QST registration is with Revenu Québec, entirely separate from your CRA GST/HST account'),
      li('Specified registrants file through a dedicated online portal — filing frequency is quarterly'),
      li('Consumer-facing documents and marketing targeting Quebec need French under the Charter — Bill 96 raised real enforcement stakes in 2025'),
      li('Quebec privacy law (Law 25) applies to Quebec consumer data regardless of where you sit'),
      cta('Selling Canada-wide?', 'Quebec is the jurisdiction that catches people. Our checklist walks through QST, language and privacy requirements step by step.', 'Check Quebec exposure', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'I sell on Shopify to Quebecers — do I need to register?', a: 'Probably yes, once past $30K to Quebec consumers. Shopify is a storefront, not a marketplace facilitator — collection is on you. Amazon/Etsy sales differ.' },
      { q: 'Does the specified system let me claim input tax refunds?', a: 'No — it is simplified precisely because it skips ITRs. If you have a Quebec presence, register under the general system instead.' },
      { q: 'What about selling to Quebec businesses only?', a: 'Pure B2B to QST-registered businesses generally does not trigger specified registration — they self-assess.' },
      { q: 'Does QST stack on GST?', a: 'QST (9.975%) applies to the price excluding GST since 2013 — you add both, roughly 14.975% total to the consumer.' },
    ],
    seoMetadata: {
      title: 'QST Registration for Out-of-Province Sellers: Rules & Threshold',
      description: 'Do you need to register for QST? The specified registration system for Canadian sellers outside Quebec, the $30K threshold, and the Revenu Québec filing basics.',
    },
    related: ['gst-pst-hst-sales-tax-provinces', 'canadian-data-residency-saas'],
  },
  {
    slug: 'bc-small-business-grants-stack',
    title: 'BC Small Business Grants: A 2026 Funding Stack',
    pillar: 'growth',
    province: 'bc',
    excerpt:
      'The strongest BC funding stack layers Innovate BC programs for early R&D, NRC IRAP for the engineering push, the BC+ federal SR&ED credits at tax time, and CanExport when the product goes abroad — each funding a different phase so no dollar is claimed twice.',
    publishedAt: '2026-02-08',
    readingTime: 6,
    body: [
      h2('The four layers'),
      table(
        ['Stage', 'Program', 'Funds'],
        [
          ['Early prototype', 'Innovate BC Ignite / Fast Pilot', '$200K–$300K awards for commercialization'],
          ['Engineering push', 'NRC IRAP', '60–80% of technical salaries on projects up to ~$500K'],
          ['Tax-time recovery', 'Federal + BC SR&ED', '35% federal + 10% BC refundable credits'],
          ['Market expansion', 'CanExport / PacifiCan', 'Up to $50K export development; regional growth programs'],
        ]
      ),
      h2('The sequencing logic'),
      p('Each program funds different activity, which is why stacking works. Innovate BC money goes to proof-of-concept milestones. IRAP covers the technical team’s salaries through the uncertain middle. SR&ED recovers a fraction of everything eligible at year end. CanExport only opens when the product can credibly travel to a new market.'),
      callout('Grants reduce the SR&ED expenditure pool — but a dollar of grant money still beats a 35-cent credit on the same dollar. Always take the grant; just model the interaction.', 'tip', 'Take the grant'),
      h2('Non-tech BC options'),
      li('WorkBC wage subsidies for hiring and training'),
      li('PacifiCan business scale-up loans (BSP — technically repayable, but patient capital)'),
      li('Export Navigator for first-time exporters — free advisory, not cash'),
      li('Municipal and regional programs — small but fast, often overlooked'),
      h2('Timing notes'),
      p('Innovate BC programs run intake rounds with deadlines that move year to year — watch the calendar rather than applying ad-hoc. IRAP is continuous but gated by ITA capacity. CanExport runs annual application windows with per-project caps. Building a 12-month funding calendar is the difference between "we applied" and "we got funded".'),
      cta('Mapping your funding year?', 'We help BC companies sequence grants, credits and loans so each funds a different phase.', 'Plan the stack', '/tools/tax-compliance-checklist'),
    ],
    faqs: [
      { q: 'Do I need to be a tech company for Innovate BC?', a: 'Most Innovate BC programs target technology commercialization, but the definition is broader than software — applied R&D across sectors qualifies.' },
      { q: 'Can pre-revenue companies apply for IRAP?', a: 'Yes — IRAP funds innovation, not traction. You need to be incorporated and pursuing profit.' },
      { q: 'Is BC SR&ED automatic with the federal claim?', a: 'No — it requires BC schedules on the same filing and applies only to SR&ED performed in BC.' },
      { q: 'How long do these take to pay out?', a: 'CanExport ~8-12 weeks to decision. IRAP depends on project approval. SR&ED refunds typically arrive 60–120 days after filing for clean CCPC claims.' },
    ],
    seoMetadata: {
      title: 'BC Small Business Grants 2026: Innovate BC, IRAP & SR&ED Stack',
      description: 'How to stack BC small business funding: Innovate BC programs, NRC IRAP, provincial SR&ED and CanExport — sequenced so each funds a different stage.',
    },
    related: ['nrc-irap-vs-canexport', 'bc-employer-health-tax'],
  },
]
