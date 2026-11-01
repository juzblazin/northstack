import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ChevronRight, CornerDownLeft, FileCode2, FileText, Folder, Layers, Monitor, Smartphone, Sparkles, Terminal, Tv } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { face } from '../../data'
import { Avatar, BrandMark } from '../ui'
import GenCanvas from './GenCanvas'
import { palettes, type Mode, type PaletteName } from './palettes'

/* ---------- shared chrome ---------- */

function Window({ title, status, children }: { title: string; status: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0f0c1c] text-white shadow-[0_40px_120px_-30px_rgba(127,92,255,.55),0_0_0_6px_rgba(233,221,255,.04)]">
      <div className="flex h-11 items-center gap-2 border-b border-white/8 px-4">
        <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
        <BrandMark className="ml-3 size-4 text-primary" />
        <span className="truncate text-[12.5px] font-medium text-white/75">{title}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-white/50"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />{status}</span>
      </div>
      <div className="flex flex-col lg:h-[600px] lg:flex-row">{children}</div>
    </div>
  )
}
const Label = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={clsx('font-mono text-[10.5px] tracking-[0.14em] text-white/40 uppercase', className)}>{children}</div>
)
const leftCls = 'hidden w-[230px] shrink-0 flex-col gap-1 border-r border-white/8 bg-white/[0.02] p-4 lg:flex'
const midCls = 'flex min-w-0 flex-col border-b border-white/8 p-4 lg:w-[400px] lg:shrink-0 lg:border-r lg:border-b-0'
const rightCls = 'relative flex min-h-[340px] min-w-0 flex-1 flex-col p-3'

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex justify-between font-mono text-[11.5px]"><span className="text-white/70">{label}</span><span className="text-electric">{(value / 100).toFixed(2)}</span></div>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(+e.target.value)} className="mt-2 w-full accent-primary" />
    </label>
  )
}

const kw = /(\/\/.*$|#.*$|"[^"]*"|'[^']*'|`[^`]*`|\b(?:const|let|export|default|function|return|import|from|uniform|vec2|vec3|vec4|float|void|for|if|type|await|async|new|precision|highp|in|out)\b|\b\d+(?:\.\d+)?\b)/g
function Code({ lines, start = 1 }: { lines: string[]; start?: number }) {
  return (
    <pre className="font-mono text-[11.5px] leading-[1.75]">
      {lines.map((l, i) => (
        <div key={i} className="flex">
          <span className="w-7 shrink-0 text-right text-white/20 select-none">{i + start}</span>
          <span className="ml-4 whitespace-pre-wrap text-white/80">
            {l.split(kw).map((tok, j) => {
              if (!tok) return null
              const c = /^(\/\/|#)/.test(tok) ? 'text-white/35' : /^["'`]/.test(tok) ? 'text-[#ffd6ec]' : /^\d/.test(tok) ? 'text-[#f5c56b]' : /^(const|let|export|default|function|return|import|from|uniform|vec2|vec3|vec4|float|void|for|if|type|await|async|new|precision|highp|in|out)$/.test(tok) ? 'text-electric' : ''
              return <span key={j} className={c}>{tok}</span>
            })}
          </span>
        </div>
      ))}
    </pre>
  )
}

/* ---------- Option 1: Lab sandbox ---------- */

const experiments: { id: string; mode: Mode; note: string }[] = [
  { id: 'kinetic-typography', mode: 'kinetic', note: 'Khmer + latin type in motion' },
  { id: 'generative-silk', mode: 'silk', note: 'Woven ribbons from noise' },
  { id: 'neural-weave', mode: 'weave', note: 'A loom of connected nodes' },
  { id: 'audio-reactive-shaders', mode: 'audio', note: 'Rings that listen' },
]
const presets: Record<string, { entropy: number; culture: number; palette: PaletteName }> = {
  'silk at dusk': { entropy: 30, culture: 40, palette: 'amethyst' },
  'temple gold': { entropy: 55, culture: 80, palette: 'temple-gold' },
  'lotus storm': { entropy: 92, culture: 25, palette: 'lotus' },
}

function Sandbox() {
  const [exp, setExp] = useState(experiments[1])
  const [entropy, setEntropy] = useState(42)
  const [culture, setCulture] = useState(55)
  const [palette, setPalette] = useState<PaletteName>('amethyst')
  const [prompt, setPrompt] = useState('')
  const [log, setLog] = useState('ready · waiting for a prompt')
  const apply = (name: string, p: { entropy: number; culture: number; palette: PaletteName }) => {
    setEntropy(p.entropy); setCulture(p.culture); setPalette(p.palette); setLog(`applied “${name}” in 0.2s`)
  }
  const run = () => {
    const q = prompt.toLowerCase().trim()
    if (!q) return
    const p = {
      entropy: /calm|still|quiet/.test(q) ? 12 : /chaos|storm|wild/.test(q) ? 90 : 30 + (q.length * 7) % 50,
      culture: /temple|khmer|culture|apsara/.test(q) ? 85 : 30 + (q.length * 11) % 40,
      palette: (/gold|sun|temple/.test(q) ? 'temple-gold' : /lotus|pink|rose/.test(q) ? 'lotus' : 'amethyst') as PaletteName,
    }
    apply(prompt, p); setPrompt('')
  }
  return (
    <Window title="Thamada Labs · Sandbox" status="live · 60fps">
      <div className={leftCls}>
        <Label className="mb-2">The vault</Label>
        {experiments.map((x) => (
          <button key={x.id} type="button" onClick={() => setExp(x)}
            className={clsx('rounded-lg px-2.5 py-2 text-left transition', exp.id === x.id ? 'bg-primary/20 ring-1 ring-primary/50' : 'hover:bg-white/5')}>
            <div className="font-mono text-[12.5px]"><span className="text-electric">*</span> {x.id}</div>
            <div className="mt-0.5 pl-3 text-[11px] text-white/45">{x.note}</div>
          </button>
        ))}
        <Label className="mt-auto mb-1">Archived</Label>
        {['lotus-grid', 'ink-rain', 'kbach-ornament-01'].map((a) => <div key={a} className="px-2.5 py-1 font-mono text-[12px] text-white/35">· {a}</div>)}
      </div>
      <div className={midCls}>
        <div className="mb-3 flex gap-1.5 overflow-x-auto no-scrollbar lg:hidden">
          {experiments.map((x) => (
            <button key={x.id} type="button" onClick={() => setExp(x)} className={clsx('shrink-0 rounded-full px-3 py-1 font-mono text-[11px]', exp.id === x.id ? 'bg-primary text-white' : 'bg-white/5 text-white/60')}>{x.id}</button>
          ))}
        </div>
        <Label>Parameters</Label>
        <div className="mt-3 flex flex-col gap-4">
          <Slider label="entropy" value={entropy} onChange={setEntropy} />
          <Slider label="culture-weight" value={culture} onChange={setCulture} />
          <div>
            <div className="font-mono text-[11.5px] text-white/70">color-palette</div>
            <div className="mt-2 flex gap-2">
              {(Object.keys(palettes) as PaletteName[]).map((k) => (
                <button key={k} type="button" onClick={() => setPalette(k)}
                  className={clsx('flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] transition', palette === k ? 'border-white/40 bg-white/10' : 'border-white/10 text-white/55 hover:border-white/25')}>
                  <span className="size-2.5 rounded-full" style={{ background: `linear-gradient(90deg,${palettes[k].c[0]},${palettes[k].c[2]})` }} />{k}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-xl border border-white/8 bg-black/30 p-3">
          <Code lines={[
            `const exp = lab.load('${exp.id}')`,
            'exp.set({',
            `  entropy: ${(entropy / 100).toFixed(2)},`,
            `  cultureWeight: ${(culture / 100).toFixed(2)},`,
            `  palette: '${palette}',`,
            '})',
          ]} />
        </div>
        <div className="mt-auto pt-5">
          <Label>Prompt console</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.keys(presets).map((k) => (
              <button key={k} type="button" onClick={() => apply(k, presets[k])} className="rounded-full bg-white/5 px-2.5 py-1 text-[11.5px] text-white/70 transition hover:bg-white/10">{k}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); run() }} className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 focus-within:border-primary/60">
            <Sparkles className="size-4 shrink-0 text-electric" />
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe an experiment… e.g. calm temple gold" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/35" />
            <button type="submit" aria-label="Run prompt" className="rounded-md bg-primary p-1"><CornerDownLeft className="size-3.5" /></button>
          </form>
          <div className="mt-2 font-mono text-[11px] text-white/40">› {log}</div>
        </div>
      </div>
      <div className={rightCls}>
        <GenCanvas mode={exp.mode} entropy={entropy} culture={culture} palette={palette} className="size-full min-h-[320px] flex-1 rounded-xl" />
        <div className="pointer-events-none absolute top-6 left-6 rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur">live canvas · {exp.id}</div>
        <div className="pointer-events-none absolute right-6 bottom-6 left-6 flex justify-between font-mono text-[10.5px] text-white/55"><span>seed 0x7F5C</span><span>1440 × 900 · webgl2</span></div>
      </div>
    </Window>
  )
}

/* ---------- Option 2: Code & vibe terminal ---------- */

const files: Record<string, { dir: string; name: string; size: string; mode: Mode; code: string[] }> = {
  shader: { dir: '/shaders', name: 'silk.frag', size: '3.1 kB', mode: 'silk', code: [
    'precision highp float;', 'uniform float uTime;', 'uniform vec2 uRes;', 'uniform float uEntropy;', '',
    '// woven ribbons, one strand per thread', 'void main() {', '  vec2 uv = gl_FragCoord.xy / uRes;', '  float t = uTime * 0.9;',
    '  float y = 0.5 + sin(uv.x * 5.0 + t) * 0.14;', '  y += sin(uv.x * 13.0 + t * 1.7) * 0.05 * uEntropy;', '  float d = abs(uv.y - y);',
    '  vec3 violet = vec3(0.50, 0.36, 1.0);', '  vec3 col = violet * smoothstep(0.02, 0.0, d);', '  gl_FragColor = vec4(col, 1.0);', '}'] },
  component: { dir: '/components', name: 'SilkCanvas.tsx', size: '12.4 kB', mode: 'weave', code: [
    "import { useShader } from '@thamada/gl'", "import silk from '../shaders/silk.frag'", '',
    'export default function SilkCanvas({ entropy = 0.4 }) {', '  const ref = useShader(silk, {', '    uEntropy: entropy,', "    uPalette: 'amethyst',", '  })',
    '  // 60fps budget: 16.6ms per frame', '  return <canvas ref={ref} className="silk" />', '}'] },
  agent: { dir: '/ai-agents', name: 'curator.ts', size: '8.7 kB', mode: 'audio', code: [
    "import { agent } from '@thamada/agents'", '', 'export const curator = agent({', "  name: 'curator',", "  goal: 'rank frames by cultural resonance',",
    "  tools: ['vision', 'palette', 'archive'],", '})', '', 'const best = await curator.run({ frames: 128 })', '// → returns top 8 frames in 1.2s'] },
  manifesto: { dir: '/', name: 'manifesto.md', size: '1.9 kB', mode: 'kinetic', code: [
    '# Thamada Labs manifesto', '', '1. Rooted in culture, built for the future.', '2. Craft first. Code is a material, like silk.', '3. Ship experiments, not slide decks.',
    '4. Every pixel should carry a story.', '5. Ordinary (ធម្មតា) made extraordinary.'] },
}
const tree: { dir: string; keys: string[] }[] = [
  { dir: '/shaders', keys: ['shader'] }, { dir: '/components', keys: ['component'] }, { dir: '/ai-agents', keys: ['agent'] },
]

function TerminalOption() {
  const [shown, setShown] = useState(0)
  const [key, setKeyRaw] = useState('shader')
  const setKey = (k: string) => { setKeyRaw(k); setShown(0) }
  const f = files[key]
  const [fps, setFps] = useState(60)
  const [vibe, setVibe] = useState(94)
  const term = useMemo(() => [
    `$ thamada build ${f.dir === '/' ? '' : f.dir + '/'}${f.name}`,
    `  › compiling ${f.name} …`,
    '  › tree-shaking 214 modules',
    `  ✓ built in ${180 + f.name.length * 17}ms · ${f.size} gzip`,
    '  ✓ hot-reloaded preview',
  ], [f])
  useEffect(() => {
    const id = setInterval(() => setShown((s) => (s >= term.length ? s : s + 1)), 420)
    return () => clearInterval(id)
  }, [term])
  useEffect(() => {
    const id = setInterval(() => setVibe((v) => Math.max(88, Math.min(99, v + Math.round((Math.random() - 0.5) * 3)))), 1200)
    return () => clearInterval(id)
  }, [])
  const fileBtn = (k: string, icon: ReactNode) => (
    <button key={k} type="button" onClick={() => setKey(k)} className={clsx('flex w-full items-center gap-2 rounded-md py-1.5 pr-2 pl-6 font-mono text-[12px] transition', key === k ? 'bg-primary/20 text-white' : 'text-white/60 hover:bg-white/5')}>{icon}{files[k].name}</button>
  )
  return (
    <Window title="thamada-labs / main" status="build passing">
      <div className={leftCls}>
        <Label className="mb-2">Repository</Label>
        {tree.map((d) => (
          <div key={d.dir}>
            <div className="flex items-center gap-1.5 px-1 py-1.5 font-mono text-[12px] text-white/80"><ChevronDown className="size-3 text-white/40" /><Folder className="size-3.5 text-electric" />{d.dir}</div>
            {d.keys.map((k) => fileBtn(k, <FileCode2 className="size-3.5 text-white/40" />))}
          </div>
        ))}
        {[['/experiments', 'closed'], ['/public', 'closed']].map(([d]) => (
          <div key={d} className="flex items-center gap-1.5 px-1 py-1.5 font-mono text-[12px] text-white/50"><ChevronRight className="size-3 text-white/30" /><Folder className="size-3.5 text-white/30" />{d}</div>
        ))}
        <div className="-ml-4">{fileBtn('manifesto', <FileText className="size-3.5 text-white/40" />)}</div>
        <div className="mt-auto rounded-lg bg-white/[0.03] p-3 font-mono text-[11px] leading-relaxed text-white/45">branch <span className="text-white/80">main</span><br />last commit <span className="text-white/80">2m ago</span><br />contributors <span className="text-white/80">7</span></div>
      </div>
      <div className={clsx(midCls, 'p-0 lg:p-0')}>
        <div className="flex h-10 items-center gap-2 border-b border-white/8 px-4 font-mono text-[12px]">
          <span className="rounded-md bg-white/10 px-2 py-1 text-white">{f.name}</span><span className="text-white/35">{f.dir}</span>
          <div className="ml-auto flex gap-1 lg:hidden">{Object.keys(files).map((k) => <button key={k} type="button" onClick={() => setKey(k)} className={clsx('size-2 rounded-full', key === k ? 'bg-electric' : 'bg-white/20')} aria-label={files[k].name} />)}</div>
        </div>
        <div className="min-h-[220px] flex-1 overflow-auto p-4 no-scrollbar"><Code lines={f.code} /></div>
        <div className="h-[170px] shrink-0 border-t border-white/8 bg-black/40 p-4 font-mono text-[11.5px] leading-[1.8]">
          <div className="mb-1 flex items-center gap-2 text-white/40"><Terminal className="size-3.5" />terminal</div>
          {term.slice(0, shown).map((l, i) => <div key={i} className={l.includes('✓') ? 'text-emerald-300' : i === 0 ? 'text-white' : 'text-white/55'}>{l}</div>)}
          {shown < term.length && <span className="inline-block h-3.5 w-2 animate-pulse bg-electric" />}
        </div>
      </div>
      <div className={rightCls}>
        <GenCanvas mode={f.mode} entropy={45} culture={key === 'manifesto' ? 70 : 20} palette="amethyst" onFps={setFps} className="size-full min-h-[300px] flex-1 rounded-xl" />
        <div className="absolute top-6 left-6 rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur">preview · {f.name}</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[['framerate', `${Math.min(fps, 120)} fps`], ['bundle size', f.size], ['vibe index', `${vibe}/100`]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
              <div className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">{k}</div>
              <div className="mt-1 text-[16px] font-semibold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* ---------- Option 3: Design system & artifact generator ---------- */

const accents = [
  { n: 'Violet', v: '#7f5cff' }, { n: 'Electric', v: '#b794ff' }, { n: 'Temple gold', v: '#e8a64a' }, { n: 'Lotus', v: '#ff6fae' },
]
const layers = ['Typography', 'Khmer script accents', 'Color spectrum', 'Spacing grids']

function BrandCard({ accent, scale, khmer, compact }: { accent: string; scale: number; khmer: boolean; compact?: boolean }) {
  return (
    <div className="relative flex size-full flex-col justify-end overflow-hidden p-[8%] text-white" style={{ background: `radial-gradient(120% 90% at 80% 10%, ${accent}, #1d1150 55%, #0d0a1f)`, borderRadius: 10 * scale }}>
      <BrandMark className="absolute top-[10%] right-[8%] text-white/80" style={{ width: (compact ? 18 : 28) * scale, height: (compact ? 18 : 28) * scale }} />
      {khmer && <div lang="km" className="font-khmer leading-[1.3] font-semibold" style={{ fontSize: (compact ? 22 : 30) * scale }}>ធម្មតា</div>}
      <div className="font-display font-extrabold tracking-[-0.01em] uppercase" style={{ fontSize: (compact ? 11 : 15) * scale }}>Thamada Labs</div>
      <div className="mt-1 text-white/70" style={{ fontSize: (compact ? 8 : 10) * scale }}>Rooted in culture, built for the future.</div>
    </div>
  )
}

function DesignOption() {
  const [accent, setAccent] = useState(accents[0])
  const [layer, setLayer] = useState(layers[1])
  const [scale, setScale] = useState(100)
  const khmer = layer !== 'Typography'
  const s = scale / 100
  return (
    <Window title="Thamada Brand System · v2.4" status="synced">
      <div className={leftCls}>
        <Label className="mb-2">Layers</Label>
        {layers.map((l) => (
          <button key={l} type="button" onClick={() => setLayer(l)} className={clsx('flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12.5px] transition', layer === l ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-white/65 hover:bg-white/5')}>
            <Layers className="size-3.5 text-electric" />{l}
          </button>
        ))}
        <Label className="mt-5 mb-2">Tokens</Label>
        <div className="font-mono text-[11.5px] leading-[1.9] text-white/55">
          <div>font.display <span className="text-white/85">Plus Jakarta</span></div>
          <div>font.khmer <span className="text-white/85">Noto Sans Khmer</span></div>
          <div>space.unit <span className="text-white/85">{Math.round(8 * s)}px</span></div>
          <div>radius.card <span className="text-white/85">{Math.round(20 * s)}px</span></div>
        </div>
        <Label className="mt-5 mb-2">Color spectrum</Label>
        <div className="grid grid-cols-4 gap-1.5">
          {accents.map((a) => (
            <button key={a.n} type="button" onClick={() => setAccent(a)} aria-label={a.n} className={clsx('aspect-square rounded-md transition', accent.n === a.n && 'ring-2 ring-white ring-offset-2 ring-offset-[#0f0c1c]')} style={{ background: a.v }} />
          ))}
        </div>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full">{['#0a0816', '#1a1626', '#5a2dda', '#7f5cff', '#b794ff', '#e9ddff'].map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}</div>
      </div>
      <div className={midCls}>
        <Label>Inspector · {layer}</Label>
        <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11.5px]">
          {[['W', 'fill'], ['H', 'hug'], ['Layout', 'auto · col'], ['Gap', `${Math.round(12 * s)}px`], ['Min W', '320px'], ['Max W', '1440px']].map(([k, v]) => (
            <div key={k} className="flex justify-between rounded-lg bg-white/[0.04] px-3 py-2"><span className="text-white/45">{k}</span><span>{v}</span></div>
          ))}
        </div>
        <div className="mt-5"><Slider label="responsive-scale" value={scale} onChange={(v) => setScale(Math.max(70, v))} /></div>
        <div className="mt-2 font-mono text-[11px] text-white/40">accent → <span style={{ color: accent.v }}>{accent.n} {accent.v}</span></div>
        <Label className="mt-5">Moodboard mapping</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[['Apsara silk', 'color.accent', `linear-gradient(140deg,${accent.v},#2a1670)`], ['Temple stone', 'surface.base', 'linear-gradient(140deg,#3a3346,#15111f)'], ['Kbach ornament', 'pattern.petal', 'radial-gradient(circle,#e9ddff 1.5px,transparent 2px) 0 0/10px 10px,#1a1626'],
            ['Lotus dawn', 'color.glow', 'linear-gradient(140deg,#ff6fae,#7f5cff)'], ['Night river', 'surface.canvas', 'linear-gradient(140deg,#0a0816,#26135f)'], ['Gold leaf', 'color.highlight', 'linear-gradient(140deg,#f5c56b,#e8a64a)']].map(([n, t, bg]) => (
            <div key={n}>
              <div className="flex aspect-[4/3] items-end rounded-lg p-1.5" style={{ background: bg }}>
                {n === 'Kbach ornament' && <BrandMark className="m-auto size-6 text-white/60" />}
              </div>
              <div className="mt-1 truncate text-[11px] text-white/75">{n}</div>
              <div className="truncate font-mono text-[10px] text-white/40">→ {t}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={clsx(rightCls, 'gap-3 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(127,92,255,.18),transparent)] p-5')}>
        <Label>Preview · adapting across mediums</Label>
        <div className="flex flex-1 items-end gap-4">
          <div className="flex-1">
            <div className="rounded-xl border border-white/15 bg-black/50 p-1.5">
              <div className="flex gap-1 px-1 pb-1.5"><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" /></div>
              <div className="aspect-[16/10]"><BrandCard accent={accent.v} scale={s} khmer={khmer} /></div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-white/45"><Monitor className="size-3" />desktop · 1440</div>
          </div>
          <div className="w-[26%] shrink-0">
            <div className="rounded-[18px] border border-white/15 bg-black/50 p-1.5"><div className="aspect-[9/18]"><BrandCard accent={accent.v} scale={s * 0.8} khmer={khmer} compact /></div></div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-white/45"><Smartphone className="size-3" />mobile · 390</div>
          </div>
        </div>
        <div>
          <div className="rounded-xl border border-white/15 bg-black/50 p-1.5"><div className="aspect-[21/6]"><BrandCard accent={accent.v} scale={s * 1.1} khmer={khmer} /></div></div>
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-white/45"><Tv className="size-3" />immersive display · 21:9</div>
        </div>
      </div>
    </Window>
  )
}

/* ---------- Option 4: Live telemetry & vibe feed ---------- */

const eventPool = [
  ['App Deployed', 'silk-portal → edge · 38 regions', '#34d399'],
  ['Shader Compiled', 'generative-silk.frag · 4.2ms', '#b794ff'],
  ['Design System V2.4 Updated', '+3 tokens · khmer accents', '#f5c56b'],
  ['Sandbox Visit', 'Phnom Penh · stayed 3m 12s', '#e9ddff'],
  ['Agent Run', 'curator ranked 128 frames', '#ff6fae'],
  ['Experiment Forked', 'neural-weave → weave-ii', '#7f5cff'],
] as const
const stamp = (d: Date) => d.toTimeString().slice(0, 8)

function TelemetryOption() {
  const [events, setEvents] = useState(() => eventPool.map((e, i) => ({ id: i, e, t: stamp(new Date(Date.now() - i * 47000)) })))
  const [spark, setSpark] = useState(() => Array.from({ length: 24 }, (_, i) => 40 + Math.sin(i / 2) * 14 + (i % 5) * 3))
  const [visitors, setVisitors] = useState(1284)
  const [metrics, setMetrics] = useState([82, 41, 94])
  useEffect(() => {
    let n = eventPool.length
    const id = setInterval(() => {
      n++
      setEvents((ev) => [{ id: n, e: eventPool[n % eventPool.length], t: stamp(new Date()) }, ...ev].slice(0, 9))
      setSpark((s) => [...s.slice(1), Math.max(15, Math.min(90, s[s.length - 1] + (Math.random() - 0.45) * 18))])
      setVisitors((v) => v + Math.round(Math.random() * 4))
      setMetrics((m) => m.map((x) => Math.max(20, Math.min(99, x + Math.round((Math.random() - 0.5) * 6)))))
    }, 1800)
    return () => clearInterval(id)
  }, [])
  const path = spark.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (spark.length - 1)) * 300},${100 - v}`).join(' ')
  return (
    <Window title="Lab telemetry · live feed" status="streaming">
      <div className={clsx(leftCls, 'w-[260px] overflow-hidden')}>
        <Label className="mb-2">Event stream</Label>
        <AnimatePresence initial={false}>
          {events.map(({ id, e, t }) => (
            <motion.div key={id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="rounded-lg border border-white/6 bg-white/[0.02] px-2.5 py-2">
              <div className="flex items-center gap-1.5 font-mono text-[11px]"><span className="size-1.5 shrink-0 rounded-full" style={{ background: e[2] }} /><span className="truncate text-white/90">[{e[0]}]</span></div>
              <div className="mt-0.5 flex justify-between gap-2 font-mono text-[10.5px] text-white/40"><span className="truncate">{e[1]}</span><span className="shrink-0">{t}</span></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className={midCls}>
        <Label>Activity · weave-ii build</Label>
        <div className="mt-3 flex flex-col gap-4">
          {[
            { f: face('f3'), n: 'Sophea', t: '10:42', m: 'Pushed the silk shader with the new entropy curve. It feels like water now.' },
            { f: face('m3'), n: 'Dara', t: '10:44', m: 'Love it. Can we lift culture-weight to 0.7 so the petals read on mobile?' },
            { f: face('f5'), n: 'Mina', t: '10:47', m: 'Design system v2.4 is synced. Khmer accents are live in all three mockups.' },
            { f: face('m2'), n: 'Vuthy', t: '10:51', m: 'Deployed to edge. Sandbox visitors are already playing with it.' },
          ].map((c) => (
            <div key={c.n} className="flex gap-3">
              <Avatar src={c.f} size={30} ring={false} />
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold">{c.n} <span className="ml-1 font-mono text-[10.5px] font-normal text-white/35">{c.t}</span></div>
                <p className="mt-0.5 text-[13px] leading-snug text-white/70">{c.m}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 font-mono text-[11px] leading-[1.9] text-white/45">
          <div><span className="text-emerald-300">✓</span> culture-weight 0.55 → 0.70</div>
          <div><span className="text-emerald-300">✓</span> preview rebuilt · 412ms</div>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-[12.5px] text-white/35"><Sparkles className="size-3.5 text-electric" />Comment on weave-ii…</div>
        </div>
      </div>
      <div className={clsx(rightCls, 'gap-3 p-4')}>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <Label>Sandbox visitors</Label>
            <div className="mt-1 text-[30px] font-semibold tabular-nums">{visitors.toLocaleString()}</div>
            <svg viewBox="0 0 300 100" className="mt-2 h-14 w-full" preserveAspectRatio="none">
              <defs><linearGradient id="sp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7f5cff" stopOpacity=".5" /><stop offset="1" stopColor="#7f5cff" stopOpacity="0" /></linearGradient></defs>
              <path d={`${path} L300,100 L0,100 Z`} fill="url(#sp)" />
              <path d={path} fill="none" stroke="#b794ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <Label>Aesthetic metrics</Label>
            {['Harmony', 'Entropy', 'Vibe'].map((k, i) => (
              <div key={k} className="mt-2.5">
                <div className="flex justify-between text-[12px]"><span className="text-white/65">{k}</span><span className="font-mono tabular-nums">{metrics[i]}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-white/8"><motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#5a2dda,#b794ff)]" animate={{ width: `${metrics[i]}%` }} transition={{ duration: 0.8 }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] p-4">
          <Label>Active deployments</Label>
          <div className="mt-2 divide-y divide-white/6">
            {[['silk-portal', 'edge · 38 regions', 'live', '#34d399'], ['weave-ii', 'preview', 'building', '#f5c56b'], ['kinetic-typography', 'edge · 12 regions', 'live', '#34d399'], ['audio-reactive-shaders', 'staging', 'queued', '#b794ff']].map(([n, w, s, c]) => (
              <div key={n} className="flex items-center gap-3 py-2.5 text-[12.5px]">
                <span className="size-2 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
                <span className="font-mono">{n}</span><span className="hidden text-white/40 sm:inline">{w}</span>
                <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-white/70">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-24 overflow-hidden rounded-xl">
          <GenCanvas mode="silk" entropy={60} culture={0} palette="amethyst" className="size-full" />
          <div className="absolute inset-0 flex items-center justify-between px-4 font-mono text-[11px] text-white/80"><span>vibe stream</span><span>{metrics[2]}% resonance</span></div>
        </div>
      </div>
    </Window>
  )
}

/* ---------- switcher ---------- */

const options = [
  { n: 'Lab Sandbox', C: Sandbox },
  { n: 'Code & Vibe Terminal', C: TerminalOption },
  { n: 'Design System', C: DesignOption },
  { n: 'Live Telemetry', C: TelemetryOption },
]

export default function LabShowcase() {
  const [i, setI] = useState(0)
  const { C } = options[i]
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 no-scrollbar backdrop-blur">
          {options.map((o, k) => (
            <button key={o.n} type="button" onClick={() => setI(k)}
              className={clsx('shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition', i === k ? 'bg-primary text-white shadow-[0_8px_24px_-8px_rgba(127,92,255,.8)]' : 'text-white/65 hover:text-white')}>
              <span className="mr-1.5 font-mono text-[11px] opacity-70">0{k + 1}</span>{o.n}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          <C />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
