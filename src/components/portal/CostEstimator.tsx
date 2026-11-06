'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { estimatorCategories, fxNote } from '../../lib/tools'
import LeadForm from './LeadForm'

export default function CostEstimator() {
  const [seats, setSeats] = useState(8)
  const [sel, setSel] = useState<Record<string, number>>(() =>
    Object.fromEntries(estimatorCategories.map((c) => [c.key, c.key === 'accounting' || c.key === 'pm' ? 1 : 0]))
  )

  const rows = useMemo(
    () =>
      estimatorCategories.map((c) => {
        const plan = c.plans[sel[c.key] ?? 0]
        const monthly = (plan.flat ?? 0) + (plan.perSeat ?? 0) * seats
        return { key: c.key, label: c.label, plan: plan.name, monthly }
      }),
    [seats, sel]
  )
  const total = rows.reduce((s, r) => s + r.monthly, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-semibold">Your stack</h2>
            <p className="mt-1 text-[13.5px] text-ink-soft">Pick a plan tier per category. Per-seat tools scale with team size.</p>
          </div>
          <div className="w-full sm:w-56">
            <label htmlFor="seats" className="flex justify-between font-mono text-[12px] text-ink-soft">
              <span>Team size</span><span className="text-electric">{seats} {seats === 1 ? 'person' : 'people'}</span>
            </label>
            <input
              id="seats"
              type="range"
              min={1}
              max={50}
              value={seats}
              onChange={(e) => setSeats(+e.target.value)}
              className="mt-2 w-full accent-primary"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {estimatorCategories.map((c) => (
            <fieldset key={c.key}>
              <legend className="text-[15px] font-semibold">{c.label}</legend>
              <p className="mt-0.5 text-[12.5px] text-muted">{c.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={`${c.label} plan`}>
                {c.plans.map((plan, i) => (
                  <button
                    key={plan.name}
                    type="button"
                    role="radio"
                    aria-checked={(sel[c.key] ?? 0) === i}
                    onClick={() => setSel((s) => ({ ...s, [c.key]: i }))}
                    className={clsx(
                      'rounded-full border px-3.5 py-2 text-[13px] transition',
                      (sel[c.key] ?? 0) === i
                        ? 'border-primary bg-primary/20 text-white'
                        : 'border-line bg-white/[0.02] text-ink-soft hover:border-white/25 hover:text-ink light:bg-black/[0.02] light:hover:border-black/25'
                    )}
                  >
                    {plan.name}
                    <span className="ml-1.5 font-mono text-[11px] text-muted">
                      {plan.perSeat ? `$${plan.perSeat}/seat` : plan.flat ? `$${plan.flat}` : 'free'}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="dark-ui rounded-[24px] border border-primary/30 bg-[linear-gradient(160deg,rgba(232,58,46,.35),rgba(20,14,16,.6))] p-6 sm:p-7">
          <div className="font-mono text-[11.5px] tracking-[0.14em] text-electric uppercase">Estimated monthly stack</div>
          <div className="display-xl mt-3 text-[52px] leading-none">
            ${Math.round(total).toLocaleString()}
            <span className="ml-1 text-[16px] font-normal text-ink-soft">USD/mo</span>
          </div>
          <div className="mt-1.5 text-[13px] text-ink-soft">≈ ${Math.round(total * 12).toLocaleString()}/yr · ≈ ${Math.round(total * 1.4).toLocaleString()} CAD/mo</div>
          <ul className="mt-6 divide-y divide-white/8 text-[13.5px] light:divide-black/8">
            {rows.filter((r) => r.monthly > 0).map((r) => (
              <li key={r.key} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="min-w-0"><span className="font-medium">{r.label}</span><span className="ml-2 block truncate text-[12px] text-muted sm:inline sm:text-[12.5px]">{r.plan}</span></span>
                <span className="shrink-0 font-mono text-electric">${Math.round(r.monthly)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] leading-[1.6] text-muted">{fxNote}</p>
        </div>
        <LeadForm source="cost-estimator" heading="Get this stack, cheaper" sub="We audit SMB software stacks and typically find 15–30% in overlap and unused seats." compact />
      </div>
    </div>
  )
}
