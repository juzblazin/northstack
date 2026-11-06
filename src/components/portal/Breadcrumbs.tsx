import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Crumb } from '../../lib/seo'

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="max-w-[280px] truncate text-ink-soft sm:max-w-none">
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="transition hover:text-ink">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
