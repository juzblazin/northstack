const pngLogos = new Set(['cursor', 'devin', 'microsoftoutlook', 'microsoftteams', 'openai', 'salesforce', 'segment', 'slack', 'twilio'])
export const logo = (slug: string) => `/assets/logos/${slug}.${pngLogos.has(slug) ? 'png' : 'svg'}`
export const face = (id: string) => `/assets/faces/${id}.jpg`

export const mark = '/assets/thamada-mark.svg'

export const brand = {
  name: 'Thamada',
  tagline: 'AI-powered commerce for a more human world.',
  heroTitle: ['/ ធម្មតា /', 'Rooted in culture,', 'Built for the future.'],
  heroLead: 'Thamada builds AI-powered storefronts that adapt, converse, and grow',
  heroLeadStrong: 'with your customers.',
  copyright: '© 2026 Thamada Inc.',
}

export type NavGroup = { label: string; items: { title: string; desc?: string }[] }
export const nav: NavGroup[] = [
  {
    label: 'Product',
    items: [
      { title: 'Overview', desc: 'The adaptive storefront, top to bottom.' },
      { title: 'Adaptive storefronts', desc: 'Layouts that change for every shopper.' },
      { title: 'Shopping assistant', desc: 'Conversations in your brand voice.' },
      { title: 'Live layouts', desc: 'Products and pages picked in real time.' },
      { title: 'Insights', desc: 'See which experiences actually sell.' },
      { title: 'Campaign pages', desc: 'Drop and launch pages, made in chat.' },
      { title: 'Brand voice', desc: 'Guardrails that keep every reply on-brand.' },
      { title: 'API & SDK', desc: 'Bring Thamada into any stack.' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { title: 'Fashion & apparel', desc: 'Styling help on every visit.' },
      { title: 'Beauty', desc: 'Shade matching and routines that convert.' },
      { title: 'Home & living', desc: 'Rooms, sizes and delivery questions handled.' },
      { title: 'Food & beverage', desc: 'Subscriptions that grow themselves.' },
      { title: 'DTC brands', desc: 'Grow without growing headcount.' },
      { title: 'Agencies', desc: 'Launch adaptive stores for clients.' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { title: 'Partner program', desc: 'Build and run Thamada for your clients.' },
      { title: 'Become a partner', desc: 'Apply in a few minutes.' },
      { title: 'Agency directory', desc: 'Find a certified Thamada partner.' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { title: 'Shopify' }, { title: 'Stripe' }, { title: 'HubSpot' }, { title: 'Mailchimp' },
      { title: 'Browse all integrations', desc: 'Your catalog, payments, CRM and support tools.' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'What is adaptive commerce' }, { title: 'Blog' }, { title: 'Help Center' },
      { title: 'Developer docs' }, { title: 'FAQ' }, { title: 'Brand guidelines' },
    ],
  },
]

export const heroAvatars = [
  { src: face('f1') }, { src: logo('shopify'), pad: true }, { src: face('m2') }, { src: mark },
  { src: face('f2') }, { src: logo('stripe'), pad: true }, { src: face('m1') },
]

export const agentGrid = [
  { k: ['Same page', 'Every visitor'], items: [{ n: 'Static themes', l: logo('shopify') }, { n: 'Site builders', l: logo('webflow') }] },
  { k: ['Adaptive store', 'Every visitor'], featured: true },
  { k: ['Bolt-on chat', 'Some visitors'], items: [{ n: 'Intercom', l: logo('intercom') }, { n: 'Zendesk', l: logo('zendesk') }, { n: 'Twilio', l: logo('twilio') }] },
  { k: ['Manual tests', 'Some visitors'], items: [{ n: 'Segments', l: logo('segment') }, { n: 'Email lists', l: logo('mailchimp') }] },
]

export const customerLogos = ['Nova Apparel', 'Lumen Home', 'Atelier Rue', 'Fennel & Co', 'Kiko Beauty', 'Northwind', 'Juniper Tea', 'Larkspur']

export const testimonials = [
  { org: 'Nova Apparel', quote: '“Our homepage used to be a guess. Now every visitor sees a store that fits them, and conversion is up 31% in two months.”', name: 'Lina Park', role: 'Founder, Nova Apparel', bg: '#7f5cff', fg: '#ffffff' },
  { org: 'Lumen Home', quote: '“Shoppers ask the store questions at 2am and get better answers than our FAQ ever gave. Support tickets dropped by half.”', name: 'Diego Alvarez', role: 'Head of E-commerce, Lumen Home', bg: '#e9ddff', fg: '#16121f' },
  { org: 'ATELIER RUE', quote: '“We launched our spring drop page in one conversation. No developer, no agency, no waiting.”', name: 'Camille Laurent', role: 'Creative Director, Atelier Rue', bg: '#b794ff', fg: '#16121f' },
  { org: 'KIKO BEAUTY', quote: '“It feels like having our best salesperson on every single visit.”', name: 'Aiko Tanaka', role: 'CEO, Kiko Beauty', bg: '#5a2dda', fg: '#ffffff' },
]

export const integrationRows = [
  ['shopify', 'stripe', 'webflow', 'hubspot', 'mailchimp', 'segment', 'intercom', 'zendesk'],
  ['gmail', 'slack', 'notion', 'salesforce', 'airtable', 'twilio', 'typeform', 'calendly'],
  ['googlesheets', 'snowflake', 'vercel', 'figma', 'zoom', 'microsoftteams', 'dropbox', 'xero'],
  ['github', 'openai', 'claude', 'linear', 'jira', 'asana', 'sentry', 'microsoftoutlook'],
]
export const integrationNames: Record<string, string> = {
  gmail: 'Gmail', slack: 'Slack', notion: 'Notion', hubspot: 'HubSpot', linear: 'Linear', calendly: 'Calendly', confluence: 'Confluence', twilio: 'Twilio',
  microsoftoutlook: 'Outlook', github: 'GitHub', salesforce: 'Salesforce', airtable: 'Airtable', zoom: 'Zoom', discord: 'Discord', mailchimp: 'Mailchimp', webflow: 'Webflow',
  googlesheets: 'Google Sheets', stripe: 'Stripe', jira: 'Jira', microsoftteams: 'Teams', shopify: 'Shopify', snowflake: 'Snowflake', vercel: 'Vercel', sentry: 'Sentry',
  intercom: 'Intercom', figma: 'Figma', asana: 'Asana', dropbox: 'Dropbox', zendesk: 'Zendesk', xero: 'Xero', typeform: 'Typeform', segment: 'Segment', openai: 'OpenAI', claude: 'Claude',
}

export type UseCase = {
  n: string; team: string; room: string; rest: string; sub: string
  thread: { title: string; by: string; who: string; whoFace: string; ask: string; reply1: string; reply2: string; follow: string; followFace: string; followWho: string }
  app: { name: string; url: string; kind: 'store' | 'table' | 'board' | 'dashboard' | 'form'; desc: string }
}
export const useCases: UseCase[] = [
  {
    n: '01', team: 'Merchandising', room: '#homepage', rest: 'rebuilds itself for every visitor.', sub: 'Different products, different layouts. One site.',
    thread: { title: 'Homepage layouts', by: 'nova-apparel · Started by Mira at 9:12 AM', who: 'Mira', whoFace: 'f1', ask: 'Our homepage shows winter coats to everyone, even shoppers where it’s 30 degrees.', reply1: 'On it. Reading location, weather and browsing history to choose a layout for each visitor.', reply2: 'Live. Six layouts running, conversion up 18% on day one.', follow: 'keep the bestsellers in the first row.', followFace: 'f3', followWho: 'Clara' },
    app: { name: 'Live Storefront', url: 'nova-apparel.com', kind: 'store', desc: 'What Maya sees right now. Every visitor gets a layout picked for them.' },
  },
  {
    n: '02', team: 'Conversations', room: '#support', rest: 'becomes a shopping assistant.', sub: 'Answers like your best salesperson, even at 2am.',
    thread: { title: 'Shopper questions', by: 'lumen-home · Started by Nan at 10:04 AM', who: 'Nan', whoFace: 'f4', ask: 'Same sizing and shipping questions all day, and half of them leave before we reply.', reply1: 'I’ll answer them on the store in your brand voice and flag anything that needs a person.', reply2: '312 conversations today, 41 turned into orders. Board is live.', follow: 'send me anyone asking about bulk orders.', followFace: 'f4', followWho: 'Nan' },
    app: { name: 'Shopper Conversations', url: 'chats.thamada.app', kind: 'board', desc: 'Every shopper conversation, moving from browsing to bought.' },
  },
  {
    n: '03', team: 'Growth', room: '#growth', rest: 'gets a live revenue dashboard.', sub: 'Know which experience sells, every morning.',
    thread: { title: 'Weekly numbers', by: 'kiko-beauty · Started by Clara at 8:30 AM', who: 'Clara', whoFace: 'f3', ask: 'Every Monday I rebuild the same conversion report by hand.', reply1: 'Pulling orders from Shopify and Stripe and building the dashboard right here.', reply2: 'Live, and it refreshes itself every morning.', follow: 'post it here on Mondays.', followFace: 'f3', followWho: 'Clara' },
    app: { name: 'Growth Dashboard', url: 'growth.thamada.app', kind: 'dashboard', desc: 'Conversion, order value and revenue by experience, from your own store data.' },
  },
  {
    n: '04', team: 'Campaigns', room: '#campaigns', rest: 'gets a drop page in minutes.', sub: 'Made in chat. Live on your domain.',
    thread: { title: 'Spring drop', by: 'atelier-rue · Started by Saul at 7:45 AM', who: 'Saul', whoFace: 'm3', ask: 'We need a signup page for the spring drop by Friday, and our developer is out.', reply1: 'Building it in your brand style. Signups go straight to Mailchimp.', reply2: 'Live at atelierrue.com/spring. 312 signups already.', follow: 'send it to the VIP list.', followFace: 'm3', followWho: 'Saul' },
    app: { name: 'Spring Drop Page', url: 'atelierrue.com/spring', kind: 'form', desc: 'A page anyone can fill in. Signups appear wherever this app is linked.' },
  },
]

export const invoices = [
  { c: 'Harbor & Pine', a: '$4,200', d: 'Sep 12', s: 'Paid' },
  { c: 'Juniper Hall', a: '$1,850', d: 'Sep 18', s: 'Open' },
  { c: 'Bluegate Travel', a: '$9,400', d: 'Aug 29', s: 'Overdue' },
  { c: 'Lark Supply Co.', a: '$2,150', d: 'Sep 24', s: 'Open' },
  { c: 'Tidewater', a: '$6,000', d: 'Oct 02', s: 'Review' },
  { c: 'Fennel Studio', a: '$3,300', d: 'Oct 06', s: 'Review' },
]

export const security = ['SOC 2 Type II audit in progress', 'PCI DSS compliant payments via Stripe', 'GDPR & CCPA ready']

export const faqs = [
  { q: 'What is Thamada?', a: 'Thamada builds AI-powered storefronts that adapt, converse and grow with your customers. Every visitor gets a store shaped around them, with different products, different layouts and a shopping assistant that talks like your brand.' },
  { q: 'How is it different from a regular store theme?', a: 'A theme shows every visitor the same page. Thamada changes the layout, the products and the conversation in real time, based on what each shopper is looking for.' },
  { q: 'Do we have to leave Shopify or our current platform?', a: 'No. Thamada works with Shopify, Webflow and custom stores. Your catalog, checkout and payments stay where they are.' },
  { q: 'What does “adaptive” actually mean?', a: 'Thamada reads signals like location, weather, device, referral source and browsing history, then picks the layout and products most likely to help that shopper. You set the rules and can review every variation.' },
  { q: 'Will the assistant say things that are off-brand?', a: 'You set the brand voice, the topics it can cover and when it should hand off to a person. Every conversation is logged so your team can review it.' },
  { q: 'Do I need developers?', a: 'No. Install the app, connect your store and describe what you want in plain words. Developers can go further with the API and SDK.' },
  { q: 'How do you handle customer data?', a: 'Shopper data stays yours. We never sell it or use it to train shared models, and you can export or delete it at any time.' },
  { q: 'Can a person take over a conversation?', a: 'Yes. Your team can step into any conversation, and Thamada flags the ones that need a human touch.' },
  { q: 'How fast can we launch?', a: 'Most stores go live in a day. Many start with one page, like the homepage, then roll out from there.' },
  { q: 'How does pricing work?', a: 'Plans are based on monthly visitors, and every plan includes adaptive layouts, the shopping assistant and integrations. Early access teams get launch pricing.' },
]

export const footerCols = [
  { h: 'Product', l: ['Overview', 'Adaptive storefronts', 'Shopping assistant', 'Live layouts', 'Insights', 'Campaign pages', 'Brand voice', 'API & SDK'] },
  { h: 'Solutions', l: ['Fashion & apparel', 'Beauty', 'Home & living', 'DTC brands', 'Agencies'] },
  { h: 'Partners', l: ['Partner program', 'Become a partner', 'Agency directory'] },
  { h: 'Integrations', l: ['Shopify', 'Stripe', 'HubSpot', 'Mailchimp', 'All integrations'] },
  { h: 'Resources', l: ['Blog', 'Help Center', 'Developer docs', 'FAQ', 'Brand guidelines'] },
  { h: 'Compare', l: ['vs static themes', 'vs chat widgets', 'vs A/B testing tools', 'All comparisons'] },
  { h: 'Company', l: ['About', 'Careers', 'Brand assets', 'Trust Center'] },
]
export const legal = ['Privacy', 'Terms', 'DPA', 'Subprocessors', 'Trust Center', 'Cookie settings']
