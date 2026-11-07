'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

export function BrandMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 109.35 122.88" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M55.15,85.62c1.73,11.9-0.93,21.51-8.05,31.37c-1.6,2.21-3.29,3.99-5.25,5.89c-0.01-2.63-1.69-3.76-4.22-4.34C48.04,108.25,52.33,96.9,53.7,85.62h-2.36c-7.79-0.77-16.33,12.35-26.35,15.92c4.77-9.16-0.56-10.4-12.66-6.33c9.05-10.8,9.93-14.79,0-13.35c5.13-3.88,9.9-6.11,14.38-7.02c-9.33-2.97-17.63-7.97-24.64-15.57c13.16-0.48,9.93-9.37-2.05-22.76c15.93,8.01,24.33,9.02,21.73-0.17c4.71,3.18,10.75,9.27,17.11,16.09c-2.45-12.5-4.29-24.34-3.42-33.2C41.63,28.56,48.3,19.12,54.84,0c5.51,17.44,11.43,27.12,18.92,20.08c0.97,7.76-0.07,16.06-2.74,24.81l-0.17,6.67c6.21-6.7,12.31-13.03,17.22-15.44c-3.05,10.09,7.63,6.57,21.28,0.38c-12.92,14.44-13.94,22.06-2.57,22.59c-4.73,7.36-13.07,11.84-22.76,15.23c4.22,1.21,8.44,3.49,12.66,7.02c-8.73-0.72-6.9,5,0.25,14.2c-10.92-3.2-16.49-2.33-13.04,6C70.98,90.74,61.77,85.51,56.13,85.62H55.15L55.15,85.62z"
      />
    </svg>
  )
}
export const HavenMark = BrandMark

export function Logo({ className, markClass }: { className?: string; markClass?: string }) {
  return (
    <Link href="/" className={clsx('flex items-center gap-[0.35em] font-display font-extrabold tracking-[-0.01em] text-ink uppercase', className)}>
      <BrandMark className={clsx('size-[1.15em]', markClass)} />
      <span>NorthStack</span>
    </Link>
  )
}

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.47-.03-.01-2.3-.88-2.3-3.51ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21Z" />
  </svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
  </svg>
)

type BtnProps = { children: ReactNode; variant?: 'dark' | 'outline' | 'ghost' | 'light'; size?: 'sm' | 'lg'; className?: string; href?: string; apple?: boolean; download?: boolean; arrow?: boolean }
export function Button({ children, variant = 'dark', size = 'sm', className, href = '#', apple, download, arrow }: BtnProps) {
  return (
    <a
      href={href}
      className={clsx(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98]',
        size === 'sm' ? 'h-10 px-4 text-[14px]' : 'h-[50px] px-6 text-[15px]',
        variant === 'dark' && 'bg-primary text-white hover:bg-[#f04a3e]',
        variant === 'outline' && 'border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10 light:border-black/15 light:bg-black/[0.03] light:text-ink light:hover:border-black/30 light:hover:bg-black/[0.06]',
        variant === 'ghost' && 'text-white hover:bg-white/10 light:text-ink light:hover:bg-black/[0.06]',
        variant === 'light' && 'bg-white text-violet hover:bg-lavender light:border light:border-black/10',
        className,
      )}
    >
      {apple && <AppleIcon />}
      {children}
      {download && <span className="transition-transform group-hover:translate-y-0.5"><DownloadIcon /></span>}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </a>
  )
}

export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return <div className={className}>{children}</div>
}

export function Avatar({ src, size = 32, ring = true, pad, className }: { src: string; size?: number; ring?: boolean; pad?: boolean; className?: string }) {
  return (
    <span
      className={clsx('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white', ring && 'ring-2 ring-canvas', className)}
      style={{ width: size, height: size }}
    >
      <img src={src} alt="" className={clsx(pad ? 'size-[60%] object-contain' : 'size-full object-cover')} loading="lazy" />
    </span>
  )
}

export function SectionTitle({ a, b, bClass = 'text-grad', className }: { a: string; b: string; bClass?: string; className?: string }) {
  return (
    <h2 className={clsx('display-lg text-[44px] sm:text-[56px] lg:text-[66px]', className)}>
      <span className="block">{a}</span>
      <span className={clsx('block', bClass)}>{b}</span>
    </h2>
  )
}
