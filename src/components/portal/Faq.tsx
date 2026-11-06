'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import type { FaqItem } from '../../lib/types'

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface px-6">
      {items.map((f, i) => (
        <div key={f.q}>
          <h3>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold"
            >
              {f.q}
              <Plus className={clsx('size-4 shrink-0 text-ink-soft transition-transform duration-300', open === i && 'rotate-45')} aria-hidden="true" />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-[15px] leading-[1.7] text-ink-soft">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
