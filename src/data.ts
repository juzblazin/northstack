const pngLogos = new Set(['cursor', 'devin', 'microsoftoutlook', 'microsoftteams', 'openai', 'salesforce', 'segment', 'slack', 'twilio'])
export const logo = (slug: string) => `/assets/logos/${slug}.${pngLogos.has(slug) ? 'png' : 'svg'}`
export const face = (id: string) => `/assets/faces/${id}.jpg`

export const brand = {
  name: 'Haven',
  tagline: 'One workspace for your team, agents, and company context.',
  heroTitle: ['Your first', 'company workspace.'],
  heroLead: 'Haven, where people and AI agents work',
  heroLeadStrong: 'better together.',
  copyright: '© 2026 Haven Labs Inc.',
}

export type NavGroup = { label: string; items: { title: string; desc?: string }[] }
export const nav: NavGroup[] = [
  {
    label: 'Product',
    items: [
      { title: 'Overview', desc: 'The company workspace, top to bottom.' },
      { title: 'Workspace', desc: 'Rooms, threads and files for your team.' },
      { title: 'Agents', desc: 'Agent teammates that keep your context.' },
      { title: 'Bring your own agents', desc: 'Invite Claude Code, Codex and more.' },
      { title: 'CLI', desc: 'Run Haven from your terminal.' },
      { title: 'Apps', desc: 'Internal apps built on your company data.' },
      { title: 'Automations', desc: 'Recurring work on a schedule or trigger.' },
      { title: 'Skills', desc: 'Repeatable know-how your agents reuse.' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { title: 'For AI natives', desc: 'Agents, tools and CLI on one workspace.' },
      { title: 'For business owners', desc: 'Turn everyday work into shared systems.' },
      { title: 'AI CRM', desc: 'A CRM your agents keep up to date.' },
      { title: 'Email collaboration', desc: 'Shared inboxes with agent drafts.' },
      { title: 'Meeting notes to work', desc: 'From call notes to finished tasks.' },
      { title: 'Hiring & recruiting', desc: 'Applicants matched and scheduled.' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { title: 'Partner program', desc: 'Build and run Haven for your clients.' },
      { title: 'Become a partner', desc: 'Apply in a few minutes.' },
      { title: 'Bootcamp', desc: 'Hands-on sessions every month.' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { title: 'Gmail' }, { title: 'Slack' }, { title: 'Notion' }, { title: 'HubSpot' },
      { title: 'Browse all integrations', desc: '3,000+ apps your team already uses.' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'What is Haven' }, { title: 'Blog' }, { title: 'Help Center' },
      { title: 'Developer docs' }, { title: 'FAQ' }, { title: 'Download apps' },
    ],
  },
]

export const heroAvatars = [
  { src: face('f1') }, { src: logo('devin') }, { src: logo('openai'), pad: true }, { src: face('f2') },
  { src: face('m2') }, { src: logo('claude'), pad: true }, { src: face('m1') },
]

export const agentGrid = [
  { k: ['Any agent', 'One person'], items: [{ n: 'OpenAgent', l: logo('googlegemini') }, { n: 'Cursor', l: logo('cursor') }] },
  { k: ['Any agent', 'Whole team'], featured: true },
  { k: ['One vendor', 'One person'], items: [{ n: 'Claude Code', l: logo('claude') }, { n: 'Codex', l: logo('openai') }, { n: 'Gemini', l: logo('googlegemini') }, { n: 'Devin', l: logo('devin') }] },
  { k: ['One vendor', 'Whole team'], items: [{ n: 'Claude Teams', l: logo('anthropic') }, { n: 'Copilot', l: logo('github') }] },
]

export const customerLogos = ['Northwind', 'Lumen&Co', 'Bluegate', 'Fennel', 'Harbor', 'Tidewater', 'Juniper', 'Larkspur']

export const testimonials = [
  { org: 'Bluegate Travel', quote: '“From nothing I had before, I now have more than 200,000 impressions on LinkedIn. I still create the content, but Haven helps me shape the ideas, schedule, check DMs and make the charts and images.”', name: 'Andrea Costa', role: 'Founder, Bluegate Travel', bg: '#f4e0bd' },
  { org: 'Retail Labs', quote: '“We built a marketing dashboard in minutes. What used to take weeks of engineering time now happens in one conversation.”', name: 'Ben Walker', role: 'Co-founder and CEO, Retail Labs', bg: '#ecc480' },
  { org: 'HARBOR CAPITAL', quote: '“Haven streamlined our fund’s middle and back office. The agents handle the routine; we keep the judgment calls.”', name: 'Tony Chen', role: 'CEO, Harbor Capital', bg: '#e4a386' },
  { org: 'MINDSHIFT', quote: '“It’s honestly mind-blowing. I can see the possibilities everywhere.”', name: 'Sam Gonzalez', role: 'Mindshift Studio', bg: '#e4a386' },
]

export const integrationRows = [
  ['gmail', 'slack', 'notion', 'hubspot', 'linear', 'calendly', 'confluence', 'twilio'],
  ['microsoftoutlook', 'github', 'salesforce', 'airtable', 'zoom', 'discord', 'mailchimp', 'webflow'],
  ['googlesheets', 'stripe', 'jira', 'microsoftteams', 'shopify', 'snowflake', 'vercel', 'sentry'],
  ['intercom', 'figma', 'asana', 'dropbox', 'zendesk', 'xero', 'typeform', 'segment'],
]
export const integrationNames: Record<string, string> = {
  gmail: 'Gmail', slack: 'Slack', notion: 'Notion', hubspot: 'HubSpot', linear: 'Linear', calendly: 'Calendly', confluence: 'Confluence', twilio: 'Twilio',
  microsoftoutlook: 'Outlook', github: 'GitHub', salesforce: 'Salesforce', airtable: 'Airtable', zoom: 'Zoom', discord: 'Discord', mailchimp: 'Mailchimp', webflow: 'Webflow',
  googlesheets: 'Google Sheets', stripe: 'Stripe', jira: 'Jira', microsoftteams: 'Teams', shopify: 'Shopify', snowflake: 'Snowflake', vercel: 'Vercel', sentry: 'Sentry',
  intercom: 'Intercom', figma: 'Figma', asana: 'Asana', dropbox: 'Dropbox', zendesk: 'Zendesk', xero: 'Xero', typeform: 'Typeform', segment: 'Segment',
}

export type UseCase = {
  n: string; team: string; room: string; rest: string; sub: string
  thread: { title: string; by: string; who: string; whoFace: string; ask: string; reply1: string; reply2: string; follow: string; followFace: string; followWho: string }
  app: { name: string; url: string; kind: 'table' | 'board' | 'dashboard' | 'form'; desc: string }
}
export const useCases: UseCase[] = [
  {
    n: '01', team: 'Finance', room: '#ops', rest: 'gets an invoice tracker.', sub: 'Built from the billing inbox.',
    thread: { title: 'Invoice chasing', by: 'ops · Started by Mira at 9:12 AM', who: 'Mira', whoFace: 'f1', ask: 'We keep chasing unpaid invoices by hand. Can we just see them in here?', reply1: 'On it. Building a tracker in this chat from the billing mailbox.', reply2: 'Tracker is live. 14 open, 3 overdue by more than two weeks.', follow: 'can it send the Monday reminders too?', followFace: 'f3', followWho: 'Clara' },
    app: { name: 'Invoice Tracker', url: 'invoices.haven.app', kind: 'table', desc: 'Records an agent built and keeps current. Changes here appear wherever this app is linked.' },
  },
  {
    n: '02', team: 'Hiring', room: '#hiring', rest: 'gets a hiring board.', sub: 'Every applicant matched to the roles that fit.',
    thread: { title: 'Ops role', by: 'hiring · Started by Nan at 10:04 AM', who: 'Nan', whoFace: 'f4', ask: 'Sixty applicants for the ops role and they are all sitting in my inbox.', reply1: 'Pulling them in here and matching each one to the open roles in Monday’s brief.', reply2: 'Sixty in, eight are a strong match for ops. Board is live.', follow: 'book the three best matches.', followFace: 'f4', followWho: 'Nan' },
    app: { name: 'Talent Pipeline', url: 'talent.haven.app', kind: 'board', desc: 'One card per person, moving through the stages. Changes here appear wherever this app is linked.' },
  },
  {
    n: '03', team: 'Sales', room: '#sales', rest: 'gets a live dashboard.', sub: 'Rebuilt from your deals every morning.',
    thread: { title: 'Pipeline review', by: 'sales · Started by Clara at 8:30 AM', who: 'Clara', whoFace: 'f3', ask: 'Every Monday I rebuild the same pipeline slide by hand.', reply1: 'Reading the deals in this chat and the shared mailbox. Building the dashboard here.', reply2: 'Live, and it refreshes itself every morning.', follow: 'post it here on Mondays.', followFace: 'f3', followWho: 'Clara' },
    app: { name: 'Pipeline Dashboard', url: 'pipeline.haven.app', kind: 'dashboard', desc: 'What the app counts, from its own records. Changes here appear wherever this app is linked.' },
  },
  {
    n: '04', team: 'Operations', room: '#ops', rest: 'gets a page for the floor.', sub: 'Made in chat. Used in the warehouse.',
    thread: { title: 'Warehouse counts', by: 'ops · Started by Saul at 7:45 AM', who: 'Saul', whoFace: 'm3', ask: 'The floor team cannot fill in a spreadsheet on a phone at the racks.', reply1: 'Publishing a count page for them. Anything submitted lands in the records here.', reply2: 'Live at counts.northwind.app. Eleven counts in already.', follow: 'send it to the shift leads.', followFace: 'm3', followWho: 'Saul' },
    app: { name: 'Warehouse Counts', url: 'counts.northwind.app', kind: 'form', desc: 'A page of the app anyone in the room can fill in. Changes here appear wherever this app is linked.' },
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

export const security = ['SOC 2 Type II audit in progress', 'ISO/IEC 27001:2022 in progress', 'GDPR compliant']

export const faqs = [
  { q: 'What is Haven, and what is a company workspace?', a: 'One place where your team, AI agents, company knowledge and tools come together to get work done. Underneath, Haven gives agents a complete environment to work in, with memory, tools, permissions and a place to run, and brings them into the same rooms as your people.' },
  { q: 'How is it different from ChatGPT or Claude?', a: 'Instead of working in separate AI chats, your team and agents share context and build on each other’s work. Agents draw on the email, files and conversations your team connects, so the next person picks up where the last one stopped.' },
  { q: 'Do we have to stop using Slack, Teams or email?', a: 'No. Keep talking where you already do. Haven is where your team and agents get the work done, and you can connect Slack, Microsoft Teams, Gmail or Outlook so agents can work with them using the access you give.' },
  { q: 'What can Haven do for my company?', a: 'Work across the whole company: finance, sales, marketing, operations, IT and hiring. Agents research leads and keep the CRM current, chase invoices, run campaigns, answer customer inquiries and build the tools each team needs.' },
  { q: 'Who is Haven a good fit for?', a: 'Small and midsize teams that want AI to run real parts of the business, and agencies that build and run AI workflows for their clients. You don’t need engineers on staff to get value from it.' },
  { q: 'Do I need a technical background?', a: 'No. Describe what you need in plain words, and an agent builds the app, page or workflow for you to review. The basics work from day one.' },
  { q: 'Can we start with one team or one workflow?', a: 'Yes. Many teams start with one piece of work, like invoice chasing or lead follow-ups, in one room, then add people, agents and workflows as it proves useful.' },
  { q: 'Can I bring my own Claude Code or Codex?', a: 'Yes. Bring them into Haven to work with your team, using the company context and tools you give them access to.' },
  { q: 'Which devices can I use?', a: 'Any computer through the browser, plus a desktop app for Mac and mobile apps for iPhone and Android.' },
  { q: 'How does pricing work?', a: 'You pay per workspace, and your whole team shares one plan and its credits. Every plan includes rooms, workflows, apps and integrations.' },
]

export const footerCols = [
  { h: 'Product', l: ['Overview', 'Workspace', 'Agents', 'Bring your own agents', 'CLI', 'Apps', 'Automations', 'Skills', 'Tools'] },
  { h: 'Solutions', l: ['All solutions', 'All use cases', 'AI OS'] },
  { h: 'Partners', l: ['Partner program', 'Become a partner'] },
  { h: 'Integrations', l: ['Gmail', 'Slack', 'Notion', 'HubSpot', 'All integrations'] },
  { h: 'Resources', l: ['Blog', 'Help Center', 'Developer docs', 'FAQ', 'Download for Mac', 'Haven for iPad'] },
  { h: 'Compare', l: ['Haven vs Slack', 'Haven vs Notion AI', 'Haven vs ChatGPT Teams', 'All comparisons'] },
  { h: 'Company', l: ['Company & contact', 'Brand assets', 'Trust Center'] },
]
export const legal = ['Privacy', 'Terms', 'DPA', 'Subprocessors', 'Trust Center', 'Account & data', 'Privacy choices']
