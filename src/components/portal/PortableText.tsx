import Link from 'next/link'
import { PortableText as PT, type PortableTextComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import { AlertTriangle, Info, Lightbulb, ArrowRight } from 'lucide-react'

type CalloutValue = { tone?: 'info' | 'warn' | 'tip'; title?: string; body?: string }
type TableValue = { columns?: string[]; rows?: string[][] }
type CtaValue = { heading?: string; body?: string; buttonLabel?: string; href?: string }

const tones = {
  info: { I: Info, cls: 'border-primary/40 bg-primary/10 text-electric' },
  warn: { I: AlertTriangle, cls: 'border-amber-400/40 bg-amber-400/10 text-amber-300 light:text-amber-700' },
  tip: { I: Lightbulb, cls: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300 light:text-emerald-700' },
} as const

function Callout({ value }: { value: CalloutValue }) {
  const t = tones[value.tone ?? 'info'] ?? tones.info
  return (
    <aside className={`my-8 rounded-2xl border p-5 ${t.cls}`}>
      <div className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase">
        <t.I className="size-4" aria-hidden="true" />
        {value.title ?? 'Note'}
      </div>
      <p className="mt-2 text-[15px] leading-[1.65] text-ink">{value.body}</p>
    </aside>
  )
}

function ComparisonTable({ value }: { value: TableValue }) {
  const columns = value.columns ?? []
  const rows = value.rows ?? []
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-line bg-white/[0.04] light:bg-black/[0.04]">
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => (
            <tr key={i} className="transition hover:bg-white/[0.02] light:hover:bg-black/[0.02]">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CtaBlock({ value }: { value: CtaValue }) {
  return (
    <div className="my-10 rounded-[24px] border border-primary/30 bg-[linear-gradient(140deg,rgba(232,58,46,.3),rgba(232,58,46,.12)_60%,transparent)] p-7 sm:p-9">
      <h3 className="display-lg text-[26px] sm:text-[30px]">{value.heading}</h3>
      {value.body && <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.65] text-ink-soft">{value.body}</p>}
      {value.href && (
        <Link
          href={value.href}
          className="group mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-semibold text-white transition hover:bg-[#f04a3e]"
        >
          {value.buttonLabel ?? 'Learn more'}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5 text-[16.5px] leading-[1.75] text-ink-soft">{children}</p>,
    h2: ({ children }) => <h2 className="display-lg mt-12 mb-4 text-[30px] sm:text-[34px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-9 mb-3 text-[21px] font-semibold tracking-tight">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-primary pl-5 text-[18px] leading-[1.65] text-ink italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 flex flex-col gap-2.5 pl-1">{children}</ul>,
    number: ({ children }) => <ol className="my-5 flex flex-col gap-2.5 pl-1 [counter-reset:li]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 text-[16px] leading-[1.7] text-ink-soft before:absolute before:top-[0.68em] before:left-1 before:size-1.5 before:rounded-full before:bg-primary">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="relative pl-8 text-[16px] leading-[1.7] text-ink-soft [counter-increment:li] before:absolute before:top-[0.05em] before:left-0 before:font-mono before:text-[14px] before:text-electric before:content-[counter(li)'.']">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-line bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-electric light:bg-black/[0.05]">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const internal = href.startsWith('/')
      return internal ? (
        <Link href={href} className="text-electric underline decoration-electric/40 underline-offset-4 transition hover:decoration-electric">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric underline decoration-electric/40 underline-offset-4 transition hover:decoration-electric"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    callout: Callout,
    comparisonTable: ComparisonTable,
    cta: CtaBlock,
  },
}

export default function PortableText({ value }: { value: TypedObject[] }) {
  return <PT value={value} components={components} />
}
