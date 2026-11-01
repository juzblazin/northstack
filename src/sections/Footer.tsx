import { Button, HavenMark, Logo, Reveal } from '../components/ui'
import { brand, footerCols, legal } from '../data'

export function CTA() {
  return (
    <section className="px-3 sm:px-[60px]">
      <div className="paper relative mx-auto max-w-[1320px] overflow-hidden rounded-[40px] bg-peach px-6 py-24 text-center">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-white/30 blur-3xl" />
        <Reveal>
          <h2 className="display-lg text-[44px] sm:text-[66px]">Build your company workspace.</h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" apple download>Download for macOS</Button>
            <Button size="lg" variant="outline">Start free on the web</Button>
          </div>
          <p className="mt-5 text-[14px] text-ink-soft">Or pick a build: <a href="#" className="font-semibold text-ink">Apple silicon</a> or <a href="#" className="font-semibold text-ink">Intel</a></p>
        </Reveal>
      </div>
    </section>
  )
}

const X = () => <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" /></svg>
const In = () => <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.97c0-1.19-.02-2.71-1.65-2.71-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z" /></svg>
const Ig = () => <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]">
        <div className="wavy-line" />
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center">
          <Logo className="text-[30px]" />
          <p className="text-[17px] text-ink-soft md:ml-8">{brand.tagline}</p>
          <div className="flex gap-5 text-ink md:ml-auto">{[X, In, Ig].map((I, i) => <a key={i} href="#" className="transition hover:opacity-60"><I /></a>)}</div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-7">
          {footerCols.map((c) => (
            <div key={c.h}>
              <div className="text-[17px] font-semibold">{c.h}</div>
              <ul className="mt-5 flex flex-col gap-3">{c.l.map((l) => <li key={l}><a href="#" className="text-[14.5px] text-ink-soft transition hover:text-ink">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line py-8 text-[14px] text-ink-soft lg:flex-row lg:items-center">
          <span>{brand.copyright}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 lg:mx-auto">{legal.map((l) => <a key={l} href="#" className="hover:text-ink">{l}</a>)}</div>
          <span>English <span className="mx-2">/</span> Español</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center gap-[4vw] px-5 pt-10 pb-0 text-[#e6dccb] select-none sm:px-10 lg:px-[100px]" aria-hidden="true">
        <HavenMark className="size-[17vw] max-h-[260px] max-w-[260px] shrink-0" />
        <span className="font-display text-[clamp(120px,24vw,370px)] leading-[0.8] font-semibold tracking-[-0.05em]">Haven</span>
      </div>
    </footer>
  )
}
