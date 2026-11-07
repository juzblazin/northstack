'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Plus } from 'lucide-react'
import type { FaqItem } from '../../lib/types'

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface px-6">
      {items.map((f, i) => (
        <details key={f.q} className="faq-item" open={open === i}>
          <summary
            onClick={(e) => {
              e.preventDefault()
              setOpen(open === i ? null : i)
            }}
            className="flex w-full cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold [&::-webkit-details-marker]:hidden"
          >
            <h3 className="text-[16px] font-semibold">{f.q}</h3>
            <Plus className={clsx('size-4 shrink-0 text-ink-soft transition-transform duration-300', open === i && 'rotate-45')} aria-hidden="true" />
          </summary>
          <p className="pb-6 text-[15px] leading-[1.7] text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
