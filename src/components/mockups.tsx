import clsx from 'clsx'
import { AppWindow, ArrowUpDown, AtSign, Bot, ChevronDown, Copy, Globe, Link2, ListTree, Maximize2, Mic, MoreHorizontal, Plus, RefreshCw, Send, UploadCloud, UserPlus, Workflow, X } from 'lucide-react'
import { useState } from 'react'
import { face, invoices, type UseCase } from '../data'
import { Avatar } from './ui'

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

const boardCols = [
  { h: 'New', c: [['Priya Nair', 'Best fit: Ops lead'], ['Marco Villa', 'Best fit: Support']] },
  { h: 'Screen', c: [['Lucia Ferrer', 'Best fit: Ops associate'], ['Tom Byrne', 'Best fit: Ops associate']] },
  { h: 'Interview', c: [['Amara Osei', 'Ops lead · Thu 14:00']] },
  { h: 'Offer', c: [['Jonas Weber', 'Ops lead · verbal yes']] },
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

const kpis = [['Open deals', '42', '9 added this week'], ['Weighted', '$486K', 'up 12%'], ['Waiting on us', '11', '4 over a week'], ['Won this month', '7', 'best since June']]
const bars = [44, 52, 47, 66, 72, 88]
const deals = [['Harbor & Pine', 'Pricing sent', '$84K'], ['Bluegate Travel', 'Call booked', '$62K'], ['Juniper Hall', 'Waiting on them', '$48K']]
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
            <div className="origin-bottom rounded-t-[3px] bg-slate transition-all duration-700" style={{ width: 26 * s, height: h * s }} />
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
      <div className="font-semibold tracking-wide text-black/60 uppercase" style={{ fontSize: 8.5 * s }}>Submit a count</div>
      {field('SKU', 'NW-1042')}
      {field('Counted quantity', '120')}
      <label className="block">
        <span className="block font-medium" style={{ fontSize: 9 * s, marginBottom: 5 * s }}>Aisle</span>
        <span className="flex items-center justify-between rounded border border-black/15" style={{ fontSize: 9 * s, padding: `${7 * s}px ${8 * s}px` }}>Choose<ChevronDown style={{ width: 10 * s, height: 10 * s }} /></span>
      </label>
      {field('Counted by', 'Your name')}
      {field('Anything odd', 'Two boxes damaged, left on the rack', true)}
      <span className="self-start rounded bg-black/10 font-semibold text-black/50" style={{ fontSize: 9 * s, padding: `${6 * s}px ${12 * s}px` }}>Submit count</span>
    </div>
  )
}

export function AppBody({ app, s = 1, interactive }: { app: UseCase['app']; s?: number; interactive?: boolean }) {
  return (
    <div style={{ padding: 18 * s }}>
      <div className="font-semibold tracking-tight" style={{ fontSize: 22 * s }}>{app.name}</div>
      <p className="text-black/60" style={{ fontSize: 10 * s, margin: `${6 * s}px 0 ${16 * s}px` }}>{app.desc}</p>
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
    <div className={clsx('flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-app-border bg-app-tint-soft', className)}>
      <div className="flex items-center gap-2 px-3 py-2 text-[11px]">
        <AppWindow className="size-3.5 text-agent" />
        <span className="font-semibold">{app.name}</span>
        <span className="text-black/30">|</span>
        <span className="text-black/50">APP</span>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-black/10 bg-white px-2 py-1 text-[10px] text-black/60 sm:flex"><Globe className="size-3" />{app.url}<Copy className="size-3" /></span>
        <RefreshCw className={ic} /><UserPlus className={ic} />
        <span className="flex items-center gap-1 rounded-full bg-[#4f6a3a] px-2.5 py-1 text-[10px] font-semibold text-white"><UploadCloud className="size-3" />Publish</span>
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
  return <span className="font-semibold text-[#5b6b3a]">@{children}</span>
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
    <div className={clsx('flex flex-col bg-white', className)}>
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
          <Avatar src={face('m4')} size={26} ring={false} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[11px]"><span className="font-semibold">Ryan</span><span className="text-black/50">Operations agent</span><Bot className="size-3 text-black/50" /></div>
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
          <div><div className="mb-1 text-[11px] font-semibold">{t.followWho}</div><Bubble><Mention>Ryan</Mention> {t.follow}</Bubble></div>
        </div>
        <Composer className="mt-auto" />
      </div>
    </div>
  )
}
