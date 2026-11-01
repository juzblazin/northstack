import { useEffect, useRef } from 'react'

import { palettes, type Mode, type PaletteName } from './palettes'

const petal = new Path2D('M50 46C44 40 33 34 33 24C33 15 42 11 50 3C58 11 67 15 67 24C67 34 56 40 50 46Z')

type Params = { mode: Mode; entropy: number; culture: number; palette: PaletteName }

export default function GenCanvas({
  className,
  onFps,
  ...params
}: Params & { className?: string; onFps?: (fps: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const p = useRef(params)
  const fpsCb = useRef(onFps)
  useEffect(() => {
    p.current = params
    fpsCb.current = onFps
  })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true, frames = 0, last = performance.now()
    const seeds = Array.from({ length: 46 }, (_, i) => ({ x: ((i * 0.6180339) % 1), y: ((i * 0.7548776) % 1), s: 0.4 + ((i * 0.381966) % 1) }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(canvas)

    const draw = (t: number) => {
      const { mode, entropy, culture, palette } = p.current
      const pal = palettes[palette]
      const e = entropy / 100
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, w, h)
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, Math.max(w, h) * 0.7)
      glow.addColorStop(0, pal.c[0] + '55'); glow.addColorStop(1, pal.bg + '00')
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      if (culture > 0) {
        const n = 2 + Math.round(culture / 14)
        const size = Math.min(w, h) / (n * 0.9)
        ctx.globalAlpha = culture / 750
        ctx.fillStyle = pal.c[2]
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
          ctx.save()
          ctx.translate((i + 0.5) * (w / n), (j + 0.5) * (h / n))
          ctx.rotate(t * 0.15 + (i + j) * 0.4)
          ctx.scale(size / 100, size / 100); ctx.translate(-50, -50)
          for (let r = 0; r < 4; r++) { ctx.save(); ctx.translate(50, 50); ctx.rotate((r * Math.PI) / 2); ctx.translate(-50, -50); ctx.fill(petal); ctx.restore() }
          ctx.restore()
        }
        ctx.globalAlpha = 1
      }

      if (mode === 'silk') {
        const strands = 26 + Math.round(e * 30)
        for (let k = 0; k < strands; k++) {
          const u = k / strands
          ctx.beginPath()
          for (let x = -10; x <= w + 10; x += 8) {
            const nx = x / w
            const y = h * (0.5 + (u - 0.5) * 0.35) +
              Math.sin(nx * 5 + t * 0.9 + u * 2.2) * h * 0.14 +
              Math.sin(nx * 13 + t * 1.7 + k) * h * 0.05 * e
            if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
          }
          ctx.strokeStyle = (k % 3 === 0 ? pal.c[2] : k % 2 ? pal.c[1] : pal.c[0]) + '50'
          ctx.lineWidth = 1.1
          ctx.stroke()
        }
      } else if (mode === 'weave') {
        const pts = seeds.map((s, i) => ({
          x: s.x * w + Math.sin(t * s.s + i) * (14 + e * 60),
          y: s.y * h + Math.cos(t * s.s * 1.2 + i * 2) * (14 + e * 60),
        }))
        const max = Math.min(w, h) * (0.18 + e * 0.12)
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < max) {
            ctx.strokeStyle = pal.c[1] + Math.round((1 - d / max) * 140).toString(16).padStart(2, '0')
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
        for (const q of pts) { ctx.fillStyle = pal.c[2]; ctx.beginPath(); ctx.arc(q.x, q.y, 2.2, 0, Math.PI * 2); ctx.fill() }
      } else if (mode === 'audio') {
        const cx = w / 2, cy = h / 2
        const lvl = (Math.sin(t * 3) + Math.sin(t * 5.3) + Math.sin(t * 1.7)) / 3
        for (let i = 1; i < 14; i++) {
          const r = i * Math.min(w, h) * 0.035 + lvl * 10 * e + Math.sin(t * 2 - i * 0.5) * 6
          ctx.strokeStyle = (i % 2 ? pal.c[0] : pal.c[1]) + '70'; ctx.lineWidth = 1.4
          ctx.beginPath(); ctx.arc(cx, cy, Math.max(r, 1), 0, Math.PI * 2); ctx.stroke()
        }
        const bars = 72, base = Math.min(w, h) * 0.3
        for (let b = 0; b < bars; b++) {
          const a = (b / bars) * Math.PI * 2
          const len = 8 + Math.abs(Math.sin(t * 4 + b * 0.7) * Math.sin(t * 1.3 + b * 0.21)) * (20 + e * 70)
          ctx.strokeStyle = pal.c[2] + 'aa'; ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * base, cy + Math.sin(a) * base); ctx.lineTo(cx + Math.cos(a) * (base + len), cy + Math.sin(a) * (base + len)); ctx.stroke()
        }
      } else {
        const word = 'THAMADA'
        const rows = 7, fs = Math.min(w / 6.5, h / 9)
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.font = `800 ${fs}px "Plus Jakarta Sans Variable", sans-serif`
        for (let r = 0; r < rows; r++) {
          for (let i = 0; i < word.length; i++) {
            const x = w / 2 + (i - 3) * fs * 0.78 + Math.sin(t * 1.4 + r * 0.6) * fs * 0.6 * e
            const y = (r + 0.5) * (h / rows) + Math.sin(t * 2.2 + i * 0.55 + r * 0.8) * fs * 0.35 * (0.3 + e)
            ctx.fillStyle = (r === 3 ? pal.c[2] : r % 2 ? pal.c[0] : pal.c[1]) + (r === 3 ? 'ff' : '40')
            ctx.fillText(word[i], x, y)
          }
        }
        ctx.font = `700 ${fs * 1.4}px "Noto Sans Khmer Variable", sans-serif`
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.9
        ctx.fillText('ធម្មតា', w / 2, h / 2 + Math.sin(t * 1.5) * 6)
        ctx.globalAlpha = 1
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      draw(now / 1000)
      frames++
      if (now - last > 500) { fpsCb.current?.(Math.round((frames * 1000) / (now - last))); frames = 0; last = now }
    }
    if (reduce) draw(2)
    else raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [])

  return <canvas ref={ref} className={className} />
}
