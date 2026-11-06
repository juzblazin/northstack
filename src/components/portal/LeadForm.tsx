'use client'

import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function LeadForm({
  source,
  heading = 'Get the Canadian SMB briefing',
  sub = 'One practical email a month — tax thresholds, grant windows, stack picks. No fluff.',
  compact,
}: {
  source: string
  heading?: string
  sub?: string
  compact?: boolean
}) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return setState('error')
    setState('busy')
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      setState(r.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className={clsx('rounded-2xl border border-emerald-400/30 bg-emerald-400/10', compact ? 'p-4' : 'p-6')} role="status">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-emerald-300 light:text-emerald-600">
          <CheckCircle2 className="size-4" aria-hidden="true" /> You&apos;re on the list.
        </div>
        <p className="mt-1.5 text-[13.5px] text-ink-soft">Watch for the next briefing — and check spam just in case.</p>
      </div>
    )
  }

  return (
    <div className={clsx('rounded-2xl border border-line bg-surface', compact ? 'p-4' : 'p-6')}>
      <div className="text-[16px] font-semibold">{heading}</div>
      <p className="mt-1.5 text-[13.5px] leading-[1.6] text-ink-soft">{sub}</p>
      <form onSubmit={submit} className="mt-4 flex gap-2" noValidate={false}>
        <label htmlFor={`lead-${source}`} className="sr-only">Email address</label>
        <input
          id={`lead-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.ca"
          className="min-w-0 flex-1 rounded-full border border-line bg-black/30 px-4 py-2.5 text-[14px] outline-none transition placeholder:text-muted focus:border-primary/60 light:bg-ink/[0.04]"
        />
        <button
          type="submit"
          disabled={state === 'busy'}
          className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 text-[13.5px] font-semibold text-white transition hover:bg-[#f04a3e] disabled:opacity-60"
        >
          {state === 'busy' ? 'Joining…' : 'Subscribe'}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </form>
      {state === 'error' && <p className="mt-2 text-[12.5px] text-amber-300 light:text-amber-700" role="alert">Enter a valid email address.</p>}
    </div>
  )
}
