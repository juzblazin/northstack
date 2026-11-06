'use client'

import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const toggle = () => {
    const light = !document.documentElement.classList.contains('light')
    document.documentElement.classList.toggle('light', light)
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark')
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="relative flex size-9 items-center justify-center rounded-lg text-ink/80 transition hover:bg-white/10 hover:text-ink light:hover:bg-black/[0.06]"
    >
      <Sun className="absolute size-[18px] opacity-100 transition-opacity light:opacity-0" aria-hidden="true" />
      <Moon className="absolute size-[18px] opacity-0 transition-opacity light:opacity-100" aria-hidden="true" />
    </button>
  )
}
