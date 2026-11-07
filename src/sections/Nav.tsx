'use client'

import clsx from 'clsx'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { nav, type NavGroup } from '../data'
import { t, type Lang } from '../i18n'
import { Button, Logo } from '../components/ui'
import ThemeToggle from '../components/ThemeToggle'

const groupHref = (g: NavGroup) => g.href ?? `/${g.label.toLowerCase()}`

export default function Nav({ lang }: { lang: Lang }) {
  const p = `/${lang}`
  const pathname = usePathname()
  const other = lang === 'fr' ? 'en' : 'fr'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setOpen(null)} onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}>
      <div className={clsx('transition-all duration-300', scrolled || open ? 'border-b border-line bg-canvas/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent')}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:px-10 lg:px-[100px]">
          <Logo className="text-[20px]" />
          <nav className="ml-12 hidden items-center gap-1 lg:flex">
            {nav.map((g) => g.items ? (
              <div key={g.label} className="nav-item flex items-center" onMouseEnter={() => setOpen(g.label)}>
                <a href={p + groupHref(g)} className="rounded-lg px-3 py-2 text-[14px] text-ink/80 transition hover:text-ink">
                  {t(lang, g.label)}
                </a>
                <button
                  type="button"
                  aria-expanded={open === g.label}
                  aria-label={`${t(lang, g.label)} submenu`}
                  onClick={() => setOpen(open === g.label ? null : g.label)}
                  className="-ml-1 rounded-lg p-2 text-ink/80 transition hover:text-ink"
                >
                  <ChevronDown className={clsx('size-3.5 transition-transform', open === g.label && 'rotate-180')} aria-hidden="true" />
                </button>
                <div className={clsx('mega absolute inset-x-0 top-full hidden border-b border-line bg-[#0f0c1c]/95 shadow-[0_24px_48px_-24px_rgba(0,0,0,.6)] backdrop-blur-xl light:bg-white/95 lg:block', open === g.label && 'mega-open')}>
                  <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-6 gap-y-2 px-[100px] py-8">
                    <div className="col-span-1 pr-6">
                      <div className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{g.label}</div>
                      <p className="display-lg mt-3 text-[26px]">{g.blurb}</p>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      {g.items.map((it) => (
                        <a key={it.title} href={p + (it.href ?? '#')} className="rounded-xl p-3 transition hover:bg-white/5 light:hover:bg-black/[0.04]">
                          <div className="text-[14px] font-semibold">{it.title}</div>
                          {it.desc && <div className="mt-1 text-[13px] text-ink-soft">{it.desc}</div>}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a key={g.label} href={p + (g.href ?? '#')} onMouseEnter={() => setOpen(null)} className="rounded-lg px-3 py-2 text-[14px] text-ink/80 transition hover:text-ink">{t(lang, g.label)}</a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <a href={`/${other}${pathname.replace(/^\/(en|fr)/, '') || '/'}`} className="rounded-lg px-2.5 py-2 font-mono text-[12px] font-semibold tracking-wider text-ink/60 uppercase transition hover:text-ink">{lang === 'fr' ? 'EN' : 'FR'}</a>
            <ThemeToggle />
            <Button variant="outline" href={`${p}/tools`}>{t(lang, 'Free tools')}</Button>
            <Button arrow href={`${p}/tools/tax-compliance-checklist`}>{t(lang, 'Check compliance')}</Button>
          </div>
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <details className="mobile-nav">
              <summary aria-label="Menu" className="list-none rounded-lg p-2 [&::-webkit-details-marker]:hidden">
                <Menu className="mi-closed size-5" />
                <X className="mi-open size-5" />
              </summary>
              <div className="absolute inset-x-0 top-full border-b border-line bg-canvas">
                <div className="flex flex-col gap-1 px-5 py-4">
                  {nav.map((g) => ({ l: g.label, href: p + groupHref(g) })).map((it) => (
                    <a key={it.l} href={it.href} className="rounded-lg px-2 py-3 text-[16px] font-medium">{t(lang, it.l)}</a>
                  ))}
                  <a href={`/${other}${pathname.replace(/^\/(en|fr)/, '') || '/'}`} className="rounded-lg px-2 py-2 font-mono text-[13px] font-semibold tracking-wider text-ink/60 uppercase">{lang === 'fr' ? 'English version' : 'Version française'}</a>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button variant="outline" href={`${p}/tools`}>{t(lang, 'Free tools')}</Button>
                    <Button arrow href={`${p}/tools/tax-compliance-checklist`}>{t(lang, 'Check compliance')}</Button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  )
}
