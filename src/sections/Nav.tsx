'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { nav } from '../data'
import { t, type Lang } from '../i18n'
import { Button, Logo } from '../components/ui'
import ThemeToggle from '../components/ThemeToggle'

export default function Nav({ lang }: { lang: Lang }) {
  const p = `/${lang}`
  const pathname = usePathname()
  const other = lang === 'fr' ? 'en' : 'fr'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const group = nav.find((g) => g.label === open && g.items)

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setOpen(null)}>
      <div className={clsx('transition-all duration-300', scrolled || open ? 'border-b border-line bg-canvas/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent')}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:px-10 lg:px-[100px]">
          <Logo className="text-[20px]" />
          <nav className="ml-12 hidden items-center gap-1 lg:flex">
            {nav.map((g) => g.items ? (
              <button key={g.label} type="button" onMouseEnter={() => setOpen(g.label)} onClick={() => setOpen(open === g.label ? null : g.label)}
                className={clsx('flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] text-ink/80 transition hover:text-ink', open === g.label && 'text-ink')}>
                {t(lang, g.label)}
                <ChevronDown className={clsx('size-3.5 transition-transform', open === g.label && 'rotate-180')} />
              </button>
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
            <button type="button" className="rounded-lg p-2" aria-label="Menu" onClick={() => setMobile((m) => !m)}>
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {group && (
          <motion.div key="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
            className="absolute inset-x-0 hidden border-b border-line bg-[#0f0c1c]/95 shadow-[0_24px_48px_-24px_rgba(0,0,0,.6)] backdrop-blur-xl light:bg-white/95 lg:block">
            <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-6 gap-y-2 px-[100px] py-8">
              <div className="col-span-1 pr-6">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{group.label}</div>
                <p className="display-lg mt-3 text-[26px]">{group.blurb}</p>
              </div>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                {group.items?.map((it) => (
                  <a key={it.title} href={p + (it.href ?? '#')} className="rounded-xl p-3 transition hover:bg-white/5 light:hover:bg-black/[0.04]">
                    <div className="text-[14px] font-semibold">{it.title}</div>
                    {it.desc && <div className="mt-1 text-[13px] text-ink-soft">{it.desc}</div>}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-canvas lg:hidden">
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((g) => ({ l: g.label, href: p + (g.href ?? g.items?.[0]?.href ?? '#') })).map((it) => (
                <a key={it.l} href={it.href} className="rounded-lg px-2 py-3 text-[16px] font-medium">{t(lang, it.l)}</a>
              ))}
              <a href={`/${other}${pathname.replace(/^\/(en|fr)/, '') || '/'}`} className="rounded-lg px-2 py-2 font-mono text-[13px] font-semibold tracking-wider text-ink/60 uppercase">{lang === 'fr' ? 'English version' : 'Version française'}</a>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" href={`${p}/tools`}>{t(lang, 'Free tools')}</Button>
                <Button arrow href={`${p}/tools/tax-compliance-checklist`}>{t(lang, 'Check compliance')}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
