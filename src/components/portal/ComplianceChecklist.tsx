'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { Check, Copy, MapPin } from 'lucide-react'
import { provinces, provinceCodes } from '../../lib/provinces'
import type { ProvinceCode } from '../../lib/types'
import LeadForm from './LeadForm'

export default function ComplianceChecklist() {
  const [prov, setProv] = useState<ProvinceCode>('bc')
  const [done, setDone] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const p = provinces[prov]

  const all = useMemo(() => p.checklist.flatMap((g) => g.tasks.map((t) => ({ id: `${prov}:${t}`, t }))), [prov, p])
  const count = all.filter((a) => done.has(a.id)).length
  const pct = Math.round((count / all.length) * 100)

  const toggle = (id: string) =>
    setDone((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const copy = async () => {
    const text = `${p.name} compliance checklist\n\n` + p.checklist
      .map((g) => `${g.group}\n${g.tasks.map((t) => `  [${done.has(`${prov}:${t}`) ? 'x' : ' '}] ${t}`).join('\n')}`)
      .join('\n\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Choose your province">
        {provinceCodes.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={prov === c}
            onClick={() => setProv(c)}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition',
              prov === c ? 'border-primary bg-primary/20 text-white light:text-ink' : 'border-line bg-white/[0.02] text-ink-soft hover:border-white/25 hover:text-ink light:bg-black/[0.02] light:hover:border-black/25'
            )}
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            {provinces[c].code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[20px] font-semibold">{p.name} checklist</h2>
            <span className="font-mono text-[13px] text-electric">{count}/{all.length} done</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8 light:bg-black/8" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#b02618,#ff9a8d)] transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>

          {p.checklist.map((g) => (
            <fieldset key={g.group} className="mt-8">
              <legend className="font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">{g.group}</legend>
              <div className="mt-3 flex flex-col gap-2">
                {g.tasks.map((t) => {
                  const id = `${prov}:${t}`
                  const checked = done.has(id)
                  return (
                    <label
                      key={id}
                      className={clsx(
                        'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-[14.5px] leading-[1.55] transition',
                        checked ? 'border-primary/40 bg-primary/10 text-ink-soft line-through' : 'border-line bg-white/[0.02] hover:border-white/20 light:bg-black/[0.02] light:hover:border-black/20'
                      )}
                    >
                      <input type="checkbox" checked={checked} onChange={() => toggle(id)} className="peer sr-only" />
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition',
                          checked ? 'border-primary bg-primary text-white' : 'border-white/25 bg-black/20 light:border-black/30 light:bg-white'
                        )}
                      >
                        {checked && <Check className="size-3.5" />}
                      </span>
                      <span>{t}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ))}

          <button
            type="button"
            onClick={copy}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold transition hover:bg-white/10 light:hover:bg-black/[0.06]"
          >
            {copied ? <Check className="size-4 text-emerald-300 light:text-emerald-600" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? 'Copied to clipboard' : 'Copy checklist as text'}
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[24px] border border-line bg-surface p-6">
            <div className="font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">Quick facts · {p.name}</div>
            <dl className="mt-4 flex flex-col gap-3.5 text-[14px]">
              {[
                ['Sales tax', `${p.salesTax.label} · ${p.salesTax.rate}`],
                ['Small biz corp rate', p.smallBizRate],
                ['Minimum wage', p.minWage],
                ['Workers comp', p.workersComp],
                ['Employment rules', p.employmentBody],
              ].map(([dt, dd]) => (
                <div key={dt} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                  <dt className="text-muted">{dt}</dt>
                  <dd className="text-right font-medium">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LeadForm
            source={`checklist-${prov}`}
            heading="Get updates for your province"
            sub={`Threshold changes, filing deadlines and new ${p.name} programs — when they actually change.`}
            compact
          />
        </div>
      </div>
    </div>
  )
}
