import { motion, useScroll, useTransform } from 'motion/react'
import { Bell, ChevronDown, ChevronRight, Grid2x2, Hash, Lock, MessageCircle, PenSquare, Plus, Search, Users } from 'lucide-react'
import { useRef } from 'react'
import { brand, face, heroAvatars, useCases } from '../data'
import { AppPanel, ChatThread } from '../components/mockups'
import { Avatar, Button, HavenMark } from '../components/ui'

const dms = [
  { n: 'Ryan', f: 'm4', t: '2m', m: 'Monday reminders are set for 9:00.', u: 1 },
  { n: 'Mira', f: 'f1', t: '1h', m: 'You: Perfect, thank you!' },
]
const rooms = [
  { r: 'ops', c: '#e3ecd5', threads: [{ n: 'Invoice chasing', t: 'now', m: 'Clara: @Ryan can it send the Monday re…', f: 'f3', active: true }, { n: 'Warehouse counts', t: '18m', m: 'Nova: Eleven counts in already.', f: 'm3', u: 3 }] },
  { r: 'sales', c: '#dcefd9', threads: [{ n: 'Partner follow ups', t: '1h', m: 'Ada: Drafted replies for four partners.', f: 'f5', u: 2 }] },
]

function ChatList() {
  return (
    <div className="hidden w-[310px] shrink-0 flex-col border-r border-black/8 bg-white md:flex">
      <div className="flex items-center px-5 pt-4 pb-3">
        <span className="text-[15px] font-semibold">Chat</span>
        <Search className="ml-auto size-4" /><Plus className="ml-4 size-4" />
      </div>
      <div className="flex gap-1.5 px-5 pb-3 text-[12px]">
        <span className="rounded-full bg-[#f1f0ee] px-3 py-1 font-semibold">Home</span>
        <span className="px-2 py-1 text-black/55">Recent</span>
        <span className="px-2 py-1 text-black/55">Unread <span className="rounded bg-black/5 px-1">4</span></span>
        <span className="px-2 py-1 text-black/55">@me</span>
      </div>
      <div className="flex items-center gap-2 px-5 py-2 text-[12.5px] font-semibold"><MessageCircle className="size-3.5" />Direct messages</div>
      {dms.map((d) => (
        <div key={d.n} className="flex gap-3 px-5 py-2">
          <Avatar src={face(d.f)} size={36} ring={false} />
          <div className="min-w-0 flex-1">
            <div className="flex text-[13px] font-semibold">{d.n}<span className="ml-auto text-[11px] font-normal text-black/45">{d.t}</span></div>
            <div className="flex items-center text-[11.5px] text-black/60"><span className="truncate">{d.m}</span>{d.u && <span className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full bg-[#5c6b3c] text-[9px] text-white">{d.u}</span>}</div>
          </div>
        </div>
      ))}
      {rooms.map((r) => (
        <div key={r.r}>
          <div className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold">
            <ChevronDown className="size-3 text-black/40" /><span className="flex size-5 items-center justify-center rounded-md" style={{ background: r.c }}><Hash className="size-3 text-black/60" /></span>{r.r}
          </div>
          {r.threads.map((t) => (
            <div key={t.n} className={`flex gap-3 px-5 py-2.5 ${t.active ? 'bg-[#f3f2ef]' : ''}`}>
              <Avatar src={face(t.f)} size={36} ring={false} />
              <div className="min-w-0 flex-1">
                <div className="flex text-[13px] font-semibold">{t.n}<span className="ml-auto text-[11px] font-normal text-black/45">{t.t}</span></div>
                <div className="flex items-center text-[11.5px] text-black/60"><span className="truncate">{t.m}</span>{t.u && <span className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full bg-[#5c6b3c] text-[9px] text-white">{t.u}</span>}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {[['hiring', '#f6dede'], ['finance', '#f8e1d9'], ['design', '#f8efcf']].map(([r, c]) => (
        <div key={r} className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold">
          <ChevronRight className="size-3 text-black/40" /><span className="flex size-5 items-center justify-center rounded-md" style={{ background: c }}><Hash className="size-3 text-black/60" /></span>{r}{r === 'hiring' && <Lock className="size-3 text-black/50" />}
        </div>
      ))}
    </div>
  )
}

function HeroApp() {
  const uc = useCases[0]
  return (
    <div className="flex h-[660px] overflow-hidden rounded-[20px] border border-black/8 bg-white shadow-[0_40px_80px_-30px_rgba(60,40,20,.35),0_2px_6px_rgba(60,40,20,.06)]">
      <div className="hidden w-[50px] shrink-0 flex-col items-center gap-5 border-r border-black/8 py-4 text-black/60 sm:flex">
        <HavenMark className="size-5 text-ink" />
        <PenSquare className="size-4" /><Search className="size-4" />
        <span className="relative rounded-lg bg-[#f1f0ee] p-2"><MessageCircle className="size-4 text-ink" /><span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#5c6b3c]" /></span>
        <Users className="size-4" /><Grid2x2 className="size-4" />
        <Bell className="mt-auto size-4" /><Avatar src={face('m1')} size={24} ring={false} />
      </div>
      <ChatList />
      <ChatThread uc={uc} className="w-full min-w-0 border-r border-black/8 lg:w-[420px] lg:shrink-0" />
      <AppPanel app={uc.app} className="m-2 hidden min-w-0 flex-1 lg:flex" />
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="relative">
      <div ref={ref} className="wave-bottom relative h-[420px] overflow-hidden bg-[#c9b89a] sm:h-[500px] lg:h-[550px]">
        <motion.img src="/assets/hero.jpg" alt="Illustration of a sunny villa where people and agents work together" style={{ y: imgY }}
          initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease }}
          className="absolute inset-0 size-full object-cover object-[50%_60%]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/35 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-16 sm:px-10 lg:px-[100px] lg:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-40 -z-10 mx-auto h-[420px] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(215,180,130,.35),transparent)] blur-2xl" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }}
            className="display-xl text-[52px] sm:text-[68px] lg:text-[80px]">
            {brand.heroTitle[0]}<br />{brand.heroTitle[1]}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease }}
            className="flex flex-col gap-6 lg:items-end lg:pb-3">
            <p className="text-[18px] leading-snug text-ink-soft lg:text-right">{brand.heroLead}<br /><strong className="font-semibold text-ink">{brand.heroLeadStrong}</strong></p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-fit items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-sm">
                {heroAvatars.map((a, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.07, type: 'spring', stiffness: 300, damping: 18 }}>
                    <Avatar src={a.src} size={34} pad={a.pad} className="border border-black/5" />
                  </motion.span>
                ))}
                <span className="flex size-[34px] items-center justify-center rounded-full border border-dashed border-black/20 text-black/50"><Plus className="size-4" /></span>
              </div>
              <Button size="lg" apple download>Download for macOS</Button>
            </div>
            <p className="text-[14px] text-ink-soft lg:text-right">Or <a href="#" className="font-semibold text-ink underline-offset-4 hover:underline">start free on the web</a></p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6, ease }} className="mt-16 lg:mt-20">
          <HeroApp />
        </motion.div>
      </div>
    </section>
  )
}
