import clsx from 'clsx'
import { AppWindow, ArrowUpDown, AtSign, Bot, ChevronDown, Copy, Footprints, ShoppingBag, Shirt, Sparkles, Globe, Link2, ListTree, Maximize2, Mic, MoreHorizontal, Plus, RefreshCw, Send, UploadCloud, UserPlus, Workflow, X } from 'lucide-react'
import { useState } from 'react'
import { face, invoices, mark, type UseCase } from '../data'
import { Avatar, BrandMark } from './ui'

const statusStyle: Record<string, string> = {
  Paid: 'bg-[#e4e7e3] text-[#4c5f63]',
  Open: 'bg-[#fbe7a8] text-[#7a5b10]',
  Overdue: 'bg-[#f6c8bb] text-[#8f3a22]',
  Review: 'bg-[#dfe6d4] text-[#4f5a33]',
}

function TableApp({ s }: { s: number }) {
  return (
    <div className="overflow-hidden rounded-md border border-black/10">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/10 bg-[#fafaf8] font-semibold tracking-wide text-black/70 uppercase" style={{ fontSize: 9 * s, padding: `${8 * s}px ${10 * s}px` }}>
        {['Customer', 'Amount', 'Due', 'Status'].map((h) => (
          <span key={h} className="flex items-center gap-1">{h}<ArrowUpDown style={{ width: 8 * s, height: 8 * s }} className="opacity-50" /></span>
        ))}
      </div>
      {invoices.map((r) => (
        <div key={r.c} className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-b border-black/5 last:border-0" style={{ fontSize: 10.5 * s, padding: `${11 * s}px ${10 * s}px` }}>
          <span>{r.c}</span><span>{r.a}</span><span>{r.d}</span>
          <span><span className={clsx('rounded-full font-semibold', statusStyle[r.s])} style={{ fontSize: 8.5 * s, padding: `${3 * s}px ${7 * s}px` }}>{r.s}</span></span>
        </div>
      ))}
    </div>
  )
}

const storeTags = ['Returning shopper', 'Mobile', 'Lisbon · 24°C', 'Likes linen']
const products = [
  { n: 'Sand linen blazer', p: '$148', I: Shirt, bg: 'linear-gradient(150deg,#efe7ff,#d9c9ff)' },
  { n: 'Woven tote', p: '$96', I: ShoppingBag, bg: 'linear-gradient(150deg,#f6f1ff,#e3d6ff)' },
  { n: 'Leather loafers', p: '$132', I: Footprints, bg: 'linear-gradient(150deg,#ece4ff,#cdb8ff)' },
]
function StoreApp({ s }: { s: number }) {
  return (
    <div className="flex flex-col" style={{ gap: 10 * s }}>
      <div className="flex flex-wrap items-center" style={{ gap: 5 * s }}>
        <Sparkles className="text-primary" style={{ width: 11 * s, height: 11 * s }} />
        {storeTags.map((t) => <span key={t} className="rounded-full bg-[#f1ebff] font-semibold text-violet" style={{ fontSize: 8.5 * s, padding: `${3 * s}px ${8 * s}px` }}>{t}</span>)}
      </div>
      <div className="relative overflow-hidden rounded-lg text-white" style={{ padding: 16 * s, background: 'linear-gradient(120deg,#5a2dda,#7f5cff 55%,#b794ff)' }}>
        <div className="tracking-[0.14em] uppercase opacity-80" style={{ fontSize: 8 * s }}>For you, Maya</div>
        <div className="font-display font-semibold" style={{ fontSize: 19 * s, marginTop: 4 * s, lineHeight: 1.15 }}>Light layers<br />for Lisbon nights.</div>
        <span className="inline-block rounded-full bg-white font-semibold text-violet" style={{ fontSize: 9 * s, padding: `${5 * s}px ${11 * s}px`, marginTop: 10 * s }}>Shop the edit</span>
        <BrandMark className="absolute text-white opacity-20" style={{ width: 120 * s, height: 120 * s, right: -18 * s, bottom: -30 * s }} />
      </div>
      <div className="grid grid-cols-3" style={{ gap: 8 * s }}>
        {products.map(({ n, p, I, bg }) => (
          <div key={n} className="overflow-hidden rounded-md border border-black/10">
            <div className="flex items-center justify-center" style={{ height: 70 * s, background: bg }}><I className="text-violet/70" style={{ width: 26 * s, height: 26 * s }} strokeWidth={1.4} /></div>
            <div style={{ padding: 7 * s }}>
              <div className="truncate font-semibold" style={{ fontSize: 9.5 * s }}>{n}</div>
              <div className="flex justify-between text-black/50" style={{ fontSize: 8.5 * s, marginTop: 3 * s }}><span>{p}</span><span>In stock · M</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-md bg-[#f6f2ff] text-black/60" style={{ fontSize: 9 * s, padding: `${7 * s}px ${10 * s}px` }}>
        <span>Layout 3 of 6 · picked in 0.2s</span><span className="font-semibold text-violet">Conversion +18%</span>
      </div>
    </div>
  )
}

const boardCols = [
  { h: 'Browsing', c: [['Maya R.', 'Linen, size M'], ['Theo B.', 'Gift under $80']] },
  { h: 'Asking', c: [['Sofia L.', 'Asked about returns'], ['Ken W.', 'Comparing two lamps']] },
  { h: 'In cart', c: [['Ana P.', 'Lamp + rug · $280']] },
  { h: 'Purchased', c: [['Jonas K.', 'Ships tomorrow']] },
]
function BoardApp({ s, interactive }: { s: number; interactive?: boolean }) {
  const [cols, setCols] = useState(boardCols)
  const move = (ci: number, i: number) => {
    if (!interactive || ci === cols.length - 1) return
    setCols((prev) => {
      const next = prev.map((c) => ({ ...c, c: [...c.c] }))
      const [card] = next[ci].c.splice(i, 1)
      next[ci + 1].c.push(card)
      return next
    })
  }
  return (
    <div>
      <div className="grid grid-cols-4" style={{ gap: 6 * s }}>
        {cols.map((col, ci) => (
          <div key={col.h} className="rounded-md border border-black/10 bg-[#fafaf8]" style={{ padding: 6 * s, minHeight: 120 * s }}>
            <div className="flex items-center justify-between font-semibold tracking-wide text-black/70 uppercase" style={{ fontSize: 8.5 * s, padding: `${4 * s}px ${3 * s}px ${8 * s}px` }}>
              {col.h}<span className="rounded-full bg-black/5 px-1.5">{col.c.length}</span>
            </div>
            <div className="flex flex-col" style={{ gap: 5 * s }}>
              {col.c.map(([n, d], i) => (
                <button key={n} type="button" onClick={() => move(ci, i)} className={clsx('rounded border border-black/10 bg-white text-left transition', interactive && 'hover:-translate-y-0.5 hover:shadow-md')} style={{ padding: 8 * s }}>
                  <div className="font-semibold" style={{ fontSize: 10 * s }}>{n}</div>
                  <div className="text-black/50" style={{ fontSize: 8.5 * s, marginTop: 4 * s }}>{d}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-black/60" style={{ fontSize: 9.5 * s, marginTop: 8 * s }}>Click a card to move it to the next stage.</p>
    </div>
  )
}

const kpis = [['Conversion', '4.8%', 'up 1.2 pts'], ['Avg order', '$86', 'up 9%'], ['Chats today', '1,240', '92% resolved'], ['Revenue (mo)', '$212K', 'best month yet']]
const bars = [44, 52, 47, 66, 72, 88]
const deals = [['Returning · mobile', 'Layout: For you', '$84K'], ['New · Instagram', 'Layout: Bestsellers', '$62K'], ['Gift shoppers', 'Layout: Gift guide', '$48K']]
function DashboardApp({ s }: { s: number }) {
  return (
    <div className="flex flex-col" style={{ gap: 8 * s }}>
      <div className="grid grid-cols-4" style={{ gap: 6 * s }}>
        {kpis.map(([k, v, d]) => (
          <div key={k} className="rounded-md border border-black/10" style={{ padding: 9 * s }}>
            <div className="tracking-wide text-black/50 uppercase" style={{ fontSize: 7.5 * s }}>{k}</div>
            <div className="font-semibold" style={{ fontSize: 17 * s, margin: `${5 * s}px 0` }}>{v}</div>
            <div className="text-black/50" style={{ fontSize: 7.5 * s }}>{d}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-around rounded-md border border-black/10" style={{ height: 128 * s, padding: `${10 * s}px ${10 * s}px ${6 * s}px` }}>
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center" style={{ gap: 5 * s }}>
            <div className="origin-bottom rounded-t-[3px] bg-[linear-gradient(#b794ff,#7f5cff)] transition-all duration-700" style={{ width: 26 * s, height: h * s }} />
            <span className="text-black/50" style={{ fontSize: 7.5 * s }}>Wk {i + 1}</span>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-black/10">
        {deals.map(([n, st, v]) => (
          <div key={n} className="flex items-center justify-between border-b border-black/5 last:border-0" style={{ padding: `${8 * s}px ${10 * s}px` }}>
            <div><div className="font-semibold" style={{ fontSize: 9.5 * s }}>{n}</div><div className="text-black/45" style={{ fontSize: 7.5 * s, marginTop: 3 * s }}>{st}</div></div>
            <span className="font-semibold" style={{ fontSize: 10 * s }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormApp({ s }: { s: number }) {
  const field = (label: string, ph: string, tall?: boolean) => (
    <label className="block">
      <span className="block font-medium" style={{ fontSize: 9 * s, marginBottom: 5 * s }}>{label}</span>
      <span className="block rounded border border-black/15 text-black/35" style={{ fontSize: 9 * s, padding: `${7 * s}px ${8 * s}px`, height: tall ? 56 * s : undefined }}>{ph}</span>
    </label>
  )
  return (
    <div className="flex flex-col" style={{ gap: 10 * s }}>
      <div className="font-semibold tracking-wide text-black/60 uppercase" style={{ fontSize: 8.5 * s }}>Join the spring drop</div>
      {field('Email', 'you@example.com')}
      {field('Name', 'Your name')}
      <label className="block">
        <span className="block font-medium" style={{ fontSize: 9 * s, marginBottom: 5 * s }}>Favorite category</span>
        <span className="flex items-center justify-between rounded border border-black/15" style={{ fontSize: 9 * s, padding: `${7 * s}px ${8 * s}px` }}>Choose<ChevronDown style={{ width: 10 * s, height: 10 * s }} /></span>
      </label>
      {field('Size', 'M')}
      {field('Anything we should know', 'I prefer natural fabrics', true)}
      <span className="self-start rounded-full bg-primary font-semibold text-white" style={{ fontSize: 9 * s, padding: `${6 * s}px ${14 * s}px` }}>Join the drop</span>
    </div>
  )
}

export function AppBody({ app, s = 1, interactive }: { app: UseCase['app']; s?: number; interactive?: boolean }) {
  return (
    <div style={{ padding: 18 * s }}>
      <div className="font-semibold tracking-tight" style={{ fontSize: 22 * s }}>{app.name}</div>
      <p className="text-black/60" style={{ fontSize: 10 * s, margin: `${6 * s}px 0 ${16 * s}px` }}>{app.desc}</p>
      {app.kind === 'store' && <StoreApp s={s} />}
      {app.kind === 'table' && <TableApp s={s} />}
      {app.kind === 'board' && <BoardApp s={s} interactive={interactive} />}
      {app.kind === 'dashboard' && <DashboardApp s={s} />}
      {app.kind === 'form' && <FormApp s={s} />}
      {app.kind === 'table' && (
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-black/10 font-medium" style={{ fontSize: 10 * s, padding: `${6 * s}px ${10 * s}px` }}><Plus style={{ width: 11 * s, height: 11 * s }} />New record</span>
      )}
    </div>
  )
}

const ic = 'size-3.5 text-black/50'
export function AppPanel({ app, className, interactive }: { app: UseCase['app']; className?: string; interactive?: boolean }) {
  return (
    <div className={clsx('light-ui flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-app-border bg-app-tint-soft', className)}>
      <div className="flex items-center gap-2 px-3 py-2 text-[11px]">
        <AppWindow className="size-3.5 text-agent" />
        <span className="font-semibold">{app.name}</span>
        <span className="text-black/30">|</span>
        <span className="text-black/50">APP</span>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-black/10 bg-white px-2 py-1 text-[10px] text-black/60 sm:flex"><Globe className="size-3" />{app.url}<Copy className="size-3" /></span>
        <RefreshCw className={ic} /><UserPlus className={ic} />
        <span className="flex items-center gap-1 rounded-full bg-violet px-2.5 py-1 text-[10px] font-semibold text-white"><UploadCloud className="size-3" />Publish</span>
        <Maximize2 className={ic} /><X className={ic} />
      </div>
      <div className="mx-1.5 mb-1.5 flex-1 rounded-xl bg-white">
        <AppBody app={app} interactive={interactive} />
      </div>
    </div>
  )
}

function Bubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('w-fit max-w-full rounded-2xl bg-[#f1f0ee] px-3 py-2 text-[12.5px] leading-[1.6]', className)}>{children}</div>
}
export function Mention({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-violet">@{children}</span>
}

export function Composer({ placeholder = 'Message…', className }: { placeholder?: string; className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-black/10 bg-[#f6f5f3] px-4 py-3', className)}>
      <div className="text-[13px] text-black/40">{placeholder}</div>
      <div className="mt-3 flex items-center gap-4 text-black/55">
        <Plus className="size-4" /><Workflow className="size-4" /><AtSign className="size-4" /><ListTree className="size-4" />
        <Mic className="ml-auto size-3.5" /><Send className="size-3.5" />
      </div>
    </div>
  )
}

export function ChatThread({ uc, className, showMini = true }: { uc: UseCase; className?: string; showMini?: boolean }) {
  const t = uc.thread
  return (
    <div className={clsx('light-ui flex flex-col bg-white', className)}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#f1f0ee]"><ListTree className="size-4 text-black/60" /></span>
        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-semibold">{t.title}</div>
          <div className="truncate text-[10.5px] text-black/50">{t.by}</div>
        </div>
        <Link2 className="ml-auto size-4 text-black/50" /><MoreHorizontal className="size-4 text-black/50" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pb-4">
        <div className="flex gap-2.5">
          <Avatar src={face(t.whoFace)} size={26} ring={false} />
          <div className="min-w-0"><div className="mb-1 text-[11px] font-semibold">{t.who}</div><Bubble>{t.ask}</Bubble></div>
        </div>
        <div className="flex gap-2.5">
          <Avatar src={mark} size={26} ring={false} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[11px]"><span className="font-semibold">Nova</span><span className="text-black/50">Storefront agent</span><Bot className="size-3 text-black/50" /></div>
            <Bubble>{t.reply1}</Bubble>
            <Bubble>{t.reply2}</Bubble>
            {showMini && (
              <div className="mt-1 w-full max-w-[240px] overflow-hidden rounded-xl border-[1.5px] border-app-border bg-app-tint-soft">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[9.5px]">
                  <AppWindow className="size-3 text-agent" /><span className="font-semibold">{uc.app.name}</span><span className="text-black/40">| APP</span>
                  <Maximize2 className="ml-auto size-2.5 text-black/40" />
                </div>
                <div className="mx-1 mb-1 h-[150px] overflow-hidden rounded-lg bg-white">
                  <div className="w-[380px] origin-top-left scale-[0.6]"><AppBody app={uc.app} s={0.75} /></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2.5">
          <Avatar src={face(t.followFace)} size={26} ring={false} />
          <div><div className="mb-1 text-[11px] font-semibold">{t.followWho}</div><Bubble><Mention>Nova</Mention> {t.follow}</Bubble></div>
        </div>
        <Composer className="mt-auto" />
      </div>
    </div>
  )
}
