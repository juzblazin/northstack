import clsx from 'clsx'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ChevronLeft, ChevronRight, Megaphone, Plus, ShoppingBag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { agentGrid, customerLogos, face, heroAvatars, integrationNames, integrationRows, logo, mark, security, testimonials, useCases } from '../data'
import { AppPanel, ChatThread, Composer, Mention } from '../components/mockups'
import { Avatar, HavenMark, Logo, Reveal, SectionTitle } from '../components/ui'

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

export function AgentsGrid() {
  return (
    <section className={clsx(wrap, 'py-24 lg:py-32')}>
      <Reveal className="text-center">
        <SectionTitle a="From one static store" b="to a million experiences." className="mx-auto" />
        <p className="mx-auto mt-6 max-w-[780px] text-[18px] text-ink-soft">Most storefronts show every visitor the same page. Thamada builds one that adapts, converses and grows with each customer.</p>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-[980px] gap-2.5 md:grid-cols-[1fr_1.75fr]">
        {agentGrid.map((c, i) => (
          <Reveal key={i} delay={i * 0.08} className={clsx(i < 2 ? 'md:h-[400px]' : 'md:h-[250px]')}>
            <div className={clsx('group relative flex h-full min-h-[220px] flex-col rounded-[28px] p-5 transition-transform duration-500 hover:-translate-y-1', c.featured ? 'bg-[linear-gradient(140deg,#5a2dda,#7f5cff_60%,#b794ff)] shadow-[0_30px_80px_-30px_rgba(127,92,255,.8)]' : 'border border-line bg-surface')}>
              <div className={clsx('text-[11px] font-semibold tracking-[0.12em] uppercase', c.featured ? 'text-white/80' : 'text-muted')}>{c.k[0]} <span className="mx-1">·</span> {c.k[1]}</div>
              {c.featured ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8">
                  <Logo className="pointer-events-none text-[44px] text-white" />
                  <div className="flex -space-x-2">{heroAvatars.slice(0, 6).map((a, j) => <Avatar key={j} src={a.src} pad={a.pad} size={30} />)}</div>
                  <p className="text-center text-[17px] font-medium text-white/90">One site.<br />Infinite experiences.</p>
                </div>
              ) : (
                <div className="flex flex-1 flex-wrap content-center items-center justify-center gap-x-6 gap-y-4 py-6">
                  {c.items!.map((it) => (
                    <div key={it.n} className="flex flex-col items-center gap-2 grayscale-[.2] transition group-hover:grayscale-0">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white"><img src={it.l} alt="" className="size-6 object-contain" /></span>
                      <span className="text-[13px] text-ink-soft">{it.n}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function CustomerLogos() {
  return (
    <div className="mask-fade-x overflow-hidden py-6">
      <div className="flex w-max animate-marquee gap-16 [--marquee-duration:40s]">
        {[...customerLogos, ...customerLogos].map((n, i) => (
          <span key={i} className="font-display text-[26px] font-semibold tracking-tight text-ink/25">{n}</span>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials
  return (
    <section className={clsx(wrap, 'pt-16 pb-24 lg:pb-32')}>
      <Reveal className="text-center"><SectionTitle a="Stores that feel" b="made for every shopper." /></Reveal>
      <div className="mx-auto mt-16 hidden max-w-[1100px] gap-6 md:grid md:grid-cols-2">
        {t.map((q, k) => (
          <Reveal key={k} delay={(k % 2) * 0.1} y={40}>
            <figure className="flex h-full flex-col rounded-[32px] border border-black/5 p-8 shadow-[0_30px_60px_-30px_rgba(127,92,255,.6)] transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-[-.4deg]" style={{ background: q.bg, color: q.fg }}>
              <div className="font-display text-[22px] font-bold tracking-tight">{q.org}</div>
              <blockquote className="mt-6 font-display text-[22px] leading-[1.35] font-medium tracking-[-0.01em] lg:text-[25px]">{q.quote}</blockquote>
              <figcaption className="mt-auto pt-8"><div className="text-[14px] font-semibold">{q.name}</div><div className="mt-2 text-[13px] opacity-70">{q.role}</div></figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 md:hidden">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="rounded-[28px] p-7" style={{ background: t[i].bg, color: t[i].fg }}>
            <div className="font-display text-[20px] font-bold">{t[i].org}</div>
            <blockquote className="mt-5 font-display text-[20px] leading-[1.35] font-medium">{t[i].quote}</blockquote>
            <figcaption className="mt-6 text-[14px] font-semibold">{t[i].name}<div className="mt-1 font-normal opacity-70">{t[i].role}</div></figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-center gap-4 text-[14px]">
          <button type="button" aria-label="Previous" onClick={() => setI((i + t.length - 1) % t.length)} className="rounded-full border border-line p-2"><ChevronLeft className="size-4" /></button>
          <span>{i + 1} of {t.length}</span>
          <button type="button" aria-label="Next" onClick={() => setI((i + 1) % t.length)} className="rounded-full border border-line p-2"><ChevronRight className="size-4" /></button>
        </div>
      </div>
    </section>
  )
}

const roomMsgs = [
  { who: 'Maya', role: 'Shopper', f: face('f2'), body: <>I’m in Lisbon next week. I need something light that still works for dinner.</> },
  { who: 'Stylist', role: 'Thamada agent', f: mark, agent: true, body: <>Lovely trip. I’ve pulled linen pieces that go from day to night, and your page now shows them first.</>, file: true },
  { who: 'Inventory', role: 'Thamada agent', f: mark, agent: true, body: <>The sand linen blazer is in stock in M and ships tomorrow. <Mention>Checkout</Mention> it’s ready when she is.</> },
  { who: 'Maya', role: 'Shopper', f: face('f2'), body: <>Perfect, adding the blazer.</> },
]

function TeamRoom() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || n >= roomMsgs.length) return
    const id = setTimeout(() => setN((x) => x + 1), n === 0 ? 300 : 1400)
    return () => clearTimeout(id)
  }, [inView, n])
  return (
    <div ref={ref} className="light-ui mt-14 overflow-hidden rounded-[22px] bg-white shadow-[0_40px_100px_-30px_rgba(127,92,255,.55)]">
      <div className="flex items-center gap-2 border-b border-black/8 px-5 py-4 text-[14px] font-semibold"><span className="flex size-5 items-center justify-center rounded-md bg-[#efe7ff]"><Megaphone className="size-3 text-agent" /></span>nova-apparel · live shopper chat</div>
      <div className="flex flex-wrap items-center gap-3 border-b border-black/8 bg-[#f8f5ff] px-5 py-3 text-[12.5px] text-ink-soft">
        <div className="flex -space-x-1.5">{[face('f2'), mark, logo('shopify'), logo('stripe'), logo('zendesk')].map((s, i) => <Avatar key={i} src={s} size={24} pad={i > 1} />)}</div>
        <span><b className="font-semibold text-ink">1</b> shopper, <b className="font-semibold text-ink">3</b> agents on</span>
        {[['Thamada', null], ['Shopify', logo('shopify')], ['Stripe', logo('stripe')], ['Zendesk', logo('zendesk')]].map(([n, l]) => (
          <span key={n as string} className="flex items-center gap-1.5 rounded-md border border-black/10 bg-white px-2 py-1 text-[12px] text-ink">
            {l ? <img src={l} alt="" className="size-3.5" /> : <HavenMark className="size-3 text-primary" />}{n}
          </span>
        ))}
      </div>
      <div className="mx-auto flex min-h-[460px] max-w-[840px] flex-col justify-end gap-5 px-5 pt-10 pb-6">
        <AnimatePresence>
          {roomMsgs.slice(0, n).map((m, i) => (
            <motion.div key={i} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex gap-3">
              <Avatar src={m.f} size={32} ring={false} className="border border-black/5" />
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5 text-[12px]"><span className="font-semibold">{m.who}</span>{m.role && <span className="text-black/50">{m.role}</span>}{m.agent && <HavenMark className="size-3 text-primary" />}</div>
                <div className="rounded-2xl bg-[#f1f0ee] px-3.5 py-2.5 text-[14px] leading-[1.6]">{m.body}</div>
                {m.file && <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#f1ebff] px-3 py-2 text-[13px]"><ShoppingBag className="size-4 text-violet" /><b className="font-semibold">The Lisbon edit</b><span className="text-black/50">3 linen pieces</span></div>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {n < roomMsgs.length && inView && (
          <div className="flex items-center gap-1 pl-11 text-black/40">{[0, 1, 2].map((d) => <motion.span key={d} className="size-1.5 rounded-full bg-current" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }} />)}</div>
        )}
        <Composer placeholder="Ask Nova Apparel anything…" className="mt-2" />
      </div>
    </div>
  )
}

export function BringAgents() {
  return (
    <section className="px-3 sm:px-[60px]">
      <div className="paper relative mx-auto max-w-[1320px] overflow-hidden rounded-[40px] border border-line bg-[radial-gradient(90%_60%_at_85%_0%,rgba(127,92,255,.35),transparent_70%),#15111f] px-5 pt-20 pb-16 sm:px-[72px] lg:pt-24 lg:pb-24">
        <Reveal>
          <SectionTitle a="Shoppers ask." b="Your store answers." />
          <p className="mt-7 max-w-[580px] text-[17px] leading-[1.6] text-ink-soft">Thamada’s agents greet every visitor, answer in your brand voice, and reshape the page around what each shopper wants. When a human touch matters, they hand off to your team.</p>
        </Reveal>
        <TeamRoom />
      </div>
    </section>
  )
}

export function Integrations() {
  return (
    <section className="py-24 lg:py-32">
      <Reveal className={clsx(wrap, 'text-center')}>
        <SectionTitle a="Connected to the" b="commerce stack you run on." />
        <p className="mx-auto mt-6 max-w-[640px] text-[18px] text-ink-soft">Thamada plugs into your catalog, payments, CRM and support tools, with access you control.</p>
      </Reveal>
      <div className="mask-fade-x mt-14 flex flex-col gap-4 overflow-hidden">
        {integrationRows.map((row, r) => (
          <div key={r} className={clsx('flex w-max gap-10 hover:[animation-play-state:paused]', r % 2 ? 'animate-marquee-reverse' : 'animate-marquee')} style={{ ['--marquee-duration' as string]: `${50 + r * 8}s` }}>
            {[...row, ...row, ...row, ...row].map((s, i) => (
              <span key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-3 text-[15px] font-medium text-ink-soft transition hover:bg-white/5 hover:text-ink">
                <span className="flex size-9 items-center justify-center rounded-xl bg-white"><img src={logo(s)} alt="" className="size-5 object-contain" loading="lazy" /></span>{integrationNames[s]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function UseCases() {
  return (
    <section className="pt-10 pb-24">
      <div className={wrap}>
        <Reveal><div className="max-w-[430px] border-b border-line pb-6 text-[15px] font-semibold">One platform, every part of the store.</div></Reveal>
      </div>
      <div className="mt-16 flex flex-col gap-28">
        {useCases.map((uc) => (
          <div key={uc.n} className="mx-auto grid max-w-[1440px] items-start gap-10 pl-5 sm:pl-10 lg:grid-cols-[486px_1fr] lg:pl-[100px]">
            <Reveal className="pr-5 lg:sticky lg:top-32 lg:pt-10">
              <div className="flex items-center gap-3 text-[15px]"><span className="font-mono text-muted">{uc.n}</span><span className="font-semibold">{uc.team}</span></div>
              <h3 className="display-lg mt-5 text-[40px] lg:text-[52px]"><span className="text-grad">{uc.room}</span> {uc.rest}</h3>
              <p className="mt-6 text-[17px] text-ink-soft">{uc.sub}</p>
            </Reveal>
            <Reveal y={50}>
              <div className="mask-fade-b flex h-[560px] overflow-hidden rounded-l-[24px] bg-white shadow-[0_40px_100px_-40px_rgba(127,92,255,.6)]">
                <ChatThread uc={uc} className="w-full shrink-0 border-r border-black/8 sm:w-[310px]" />
                <AppPanel app={uc.app} interactive className="m-2 hidden min-w-[560px] flex-1 sm:flex" />
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Security() {
  return (
    <section className={clsx(wrap, 'py-16')}>
      <Reveal>
        <div className="mx-auto grid max-w-[1100px] gap-10 rounded-[32px] border border-line bg-surface p-8 sm:p-10 md:grid-cols-[1fr_1.5fr] md:items-center">
          <h2 className="display-lg text-[44px] sm:text-[56px]">Security &amp;<br /><span className="text-grad">privacy.</span></h2>
          <ul className="divide-y divide-line">
            {security.map((s) => <li key={s} className="py-6 text-[22px] first:pt-0 last:pb-0 sm:text-[24px]">{s}</li>)}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const [all, setAll] = useState(false)
  const shown = all ? items : items.slice(0, 5)
  return (
    <section className={clsx(wrap, 'py-24 lg:py-32')}>
      <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_1.6fr]">
        <Reveal><h2 className="display-lg text-[48px] sm:text-[66px] md:sticky md:top-32">Good<br /><span className="text-grad">questions.</span></h2></Reveal>
        <div>
          {shown.map((f, i) => (
            <div key={f.q} className="border-b border-line">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px] font-semibold">
                {f.q}<Plus className={clsx('size-5 shrink-0 text-ink-soft transition-transform duration-300', open === i && 'rotate-45')} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="pb-7 text-[16px] leading-[1.6] text-ink-soft">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {!all && <button type="button" onClick={() => setAll(true)} className="mt-6 rounded-full border border-line px-4 py-2 text-[15px] font-semibold transition hover:bg-white/10">Show all {items.length} questions</button>}
        </div>
      </div>
    </section>
  )
}
