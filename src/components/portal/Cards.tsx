import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { canonicalPath, type Article, type Pillar } from '../../lib/types'

export function SectionHeading({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div>
      {kicker && <div className="font-mono text-[11.5px] tracking-[0.16em] text-electric uppercase">{kicker}</div>}
      <h2 className="display-lg mt-2 text-[32px] sm:text-[40px]">{title}</h2>
      {sub && <p className="mt-3 max-w-[640px] text-[16px] leading-[1.65] text-ink-soft">{sub}</p>}
    </div>
  )
}

export function ArticleCard({ a, showPillar = true }: { a: Article; showPillar?: boolean }) {
  return (
    <Link
      href={canonicalPath(a)}
      className="group flex h-full flex-col rounded-[22px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="flex items-center gap-3 text-[11.5px] font-mono tracking-[0.1em] text-muted uppercase">
        {showPillar && <span className="text-electric">{a.pillar}</span>}
        {a.province && <span className="rounded-full border border-line px-2 py-0.5 text-[10.5px] text-ink-soft">{a.province.toUpperCase()}</span>}
        <span className="ml-auto flex items-center gap-1 normal-case"><Clock className="size-3" aria-hidden="true" />{a.readingTime} min</span>
      </div>
      <h3 className="mt-4 text-[19px] leading-snug font-semibold tracking-tight transition group-hover:text-electric">{a.title}</h3>
      <p className="mt-3 line-clamp-3 text-[14px] leading-[1.65] text-ink-soft">{a.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-primary transition group-hover:text-electric">
        Read guide <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

export function PillarCard({ p, count }: { p: Pillar; count: number }) {
  return (
    <Link
      href={`/guides/${p.key}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/10" aria-hidden="true" />
      <div className="font-mono text-[11.5px] tracking-[0.14em] text-electric uppercase">{count} guides</div>
      <h3 className="display-lg mt-3 text-[26px]">{p.title}</h3>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-soft">{p.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-primary transition group-hover:text-electric">
        Browse <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}
