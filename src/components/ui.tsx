import clsx from 'clsx'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function HavenMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M14 2c0 6.6-5.4 12-12 12V4a2 2 0 0 1 2-2h10Z" />
        <path d="M18 2h10a2 2 0 0 1 2 2v10c-6.6 0-12-5.4-12-12Z" />
        <path d="M2 18c6.6 0 12 5.4 12 12H4a2 2 0 0 1-2-2V18Z" />
        <path d="M30 18v10a2 2 0 0 1-2 2H18c0-6.6 5.4-12 12-12Z" />
      </g>
    </svg>
  )
}

export function Logo({ className, markClass }: { className?: string; markClass?: string }) {
  return (
    <a href="#" className={clsx('flex items-center gap-1.5 font-display font-semibold tracking-tight text-ink', className)}>
      <HavenMark className={clsx('size-[0.8em]', markClass)} />
      <span>Haven</span>
    </a>
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

type BtnProps = { children: ReactNode; variant?: 'dark' | 'outline' | 'ghost'; size?: 'sm' | 'lg'; className?: string; href?: string; apple?: boolean; download?: boolean }
export function Button({ children, variant = 'dark', size = 'sm', className, href = '#', apple, download }: BtnProps) {
  return (
    <a
      href={href}
      className={clsx(
        'group inline-flex items-center justify-center gap-2 rounded-[10px] font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98]',
        size === 'sm' ? 'h-10 px-4 text-[14px]' : 'h-[50px] px-6 text-[15px]',
        variant === 'dark' && 'bg-ink text-white shadow-[0_1px_0_rgba(255,255,255,.15)_inset,0_6px_16px_-6px_rgba(27,23,18,.5)] hover:bg-[#2b251e]',
        variant === 'outline' && 'border border-line bg-white/70 text-ink backdrop-blur hover:bg-white',
        variant === 'ghost' && 'text-ink hover:bg-black/5',
        className,
      )}
    >
      {apple && <AppleIcon />}
      {children}
      {download && <span className="transition-transform group-hover:translate-y-0.5"><DownloadIcon /></span>}
    </a>
  )
}

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Avatar({ src, size = 32, ring = true, pad, className }: { src: string; size?: number; ring?: boolean; pad?: boolean; className?: string }) {
  return (
    <span
      className={clsx('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white', ring && 'ring-2 ring-white', className)}
      style={{ width: size, height: size }}
    >
      <img src={src} alt="" className={clsx(pad ? 'size-[60%] object-contain' : 'size-full object-cover')} loading="lazy" />
    </span>
  )
}

export function SectionTitle({ a, b, bClass = 'text-tan', className }: { a: string; b: string; bClass?: string; className?: string }) {
  return (
    <h2 className={clsx('display-lg text-[44px] sm:text-[56px] lg:text-[66px]', className)}>
      <span className="block">{a}</span>
      <span className={clsx('block', bClass)}>{b}</span>
    </h2>
  )
}
