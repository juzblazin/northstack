'use client'

import { useEffect, useRef } from 'react'

type Ribbon = { base: number; amp: number; freq: number; speed: number; strands: number; spread: number; rise: number; alpha: number }
const ribbons: Ribbon[] = [
  { base: 1.0, amp: 0.1, freq: 0.9, speed: 0.22, strands: 48, spread: 0.32, rise: 0.82, alpha: 0.75 },
  { base: 0.92, amp: 0.13, freq: 1.25, speed: 0.3, strands: 40, spread: 0.22, rise: 0.66, alpha: 0.6 },
  { base: 1.08, amp: 0.08, freq: 0.7, speed: 0.18, strands: 32, spread: 0.4, rise: 0.5, alpha: 0.4 },
]

export default function WaveField({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    let strandGrad: CanvasGradient | null = null
    let glowGrad: CanvasGradient | null = null

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      strandGrad = ctx.createLinearGradient(0, 0, w, 0)
      strandGrad.addColorStop(0, 'rgba(232,58,46,0)')
      strandGrad.addColorStop(0.3, 'rgba(232,58,46,0.35)')
      strandGrad.addColorStop(0.7, 'rgba(255,122,105,0.9)')
      strandGrad.addColorStop(1, 'rgba(255,217,212,1)')
      glowGrad = ctx.createLinearGradient(0, 0, w, 0)
      glowGrad.addColorStop(0, 'rgba(255,255,255,0)')
      glowGrad.addColorStop(0.45, 'rgba(255,217,212,0.5)')
      glowGrad.addColorStop(1, 'rgba(255,255,255,0.95)')
    }

    const ribbonY = (r: Ribbon, u: number, o: number, t: number) =>
      h * r.base -
      Math.pow(u, 1.7) * h * r.rise +
      Math.sin(u * Math.PI * 2 * r.freq + t * r.speed + o * 1.4) * h * r.amp * (0.35 + u) +
      o * h * r.spread * (0.55 + 0.45 * Math.sin(u * 3.2 + t * 0.4))

    const draw = (ms: number) => {
      const t = ms / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      const rows = 24
      const cols = Math.max(40, Math.round(w / 13))
      for (let r = 0; r < rows; r++) {
        const p = r / (rows - 1)
        const y0 = h * (0.62 + 0.42 * p * p)
        const size = 0.7 + 1.5 * p
        for (let k = 0; k <= cols; k++) {
          const q = k / cols
          const x = w / 2 + (q - 0.5) * w * (0.95 + 0.9 * p)
          if (x < -4 || x > w + 4) continue
          const u = x / w
          const wave = Math.sin(k * 0.17 + t * 0.7 + r * 0.33) * Math.cos(k * 0.045 - t * 0.25) * (8 + 26 * p)
          const y = y0 + wave - Math.pow(u, 1.6) * h * 0.3 * (1 - p * 0.4)
          const a = (0.06 + 0.5 * p) * (0.25 + 0.75 * u) * intensity
          ctx.fillStyle = `rgba(183,148,255,${a.toFixed(3)})`
          ctx.fillRect(x, y, size, size)
        }
      }

      for (const rb of ribbons) {
        ctx.lineWidth = 1
        ctx.strokeStyle = strandGrad!
        for (let s = 0; s < rb.strands; s++) {
          const o = s / (rb.strands - 1) - 0.5
          ctx.globalAlpha = rb.alpha * (1 - Math.abs(o) * 1.5) * 0.45 * intensity + 0.02
          ctx.beginPath()
          for (let x = 0; x <= w + 8; x += 8) {
            const y = ribbonY(rb, x / w, o, t)
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
        ctx.globalAlpha = rb.alpha * 0.9 * intensity
        ctx.strokeStyle = glowGrad!
        ctx.lineWidth = 2.2
        ctx.shadowColor = 'rgba(183,148,255,0.9)'
        ctx.shadowBlur = 24
        ctx.beginPath()
        for (let x = 0; x <= w + 8; x += 8) {
          const y = ribbonY(rb, x / w, 0, t)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (ms: number) => {
      if (visible) draw(ms)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(4000) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    if (reduce) draw(4000)
    else raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [intensity])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
