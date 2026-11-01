import { motion, useScroll, useTransform } from 'motion/react'
import { Plus } from 'lucide-react'
import { useRef } from 'react'
import { brand, heroAvatars } from '../data'
import WaveField from '../components/WaveField'
import LabShowcase from '../components/lab/LabShowcase'
import { Avatar, Button } from '../components/ui'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="relative">
      <div ref={ref} className="relative h-[460px] overflow-hidden bg-canvas sm:h-[560px] lg:h-[640px]">
        <motion.img src="/assets/hero-dancer.jpg" alt="Dancer in traditional Khmer costume, tinted Thamada purple" style={{ y: imgY }}
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease }}
          className="absolute inset-0 size-full object-cover object-[55%_0%]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_55%_35%,rgba(10,8,22,.35),rgba(10,8,22,.75))]" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.4, ease }}
          className="pointer-events-none absolute inset-0 mix-blend-screen">
          <WaveField className="size-full" />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-canvas/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pt-12 pb-16 sm:px-10 lg:px-[100px] lg:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-40 -z-10 mx-auto h-[420px] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(127,92,255,.28),transparent)] blur-2xl" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }}
            className="display-xl max-w-[820px] text-[46px] sm:text-[64px] lg:text-[76px]">
            <span lang="km" className="mb-3 block font-khmer text-[56px] leading-[1.35] font-semibold tracking-normal sm:text-[76px] lg:text-[92px]">{brand.heroTitle[0]}</span>
            {brand.heroTitle[1]}<br /><span className="text-grad">{brand.heroTitle[2]}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease }}
            className="flex flex-col gap-6 lg:max-w-[440px] lg:shrink-0 lg:items-end lg:pb-3">
            <p className="text-[18px] leading-snug text-ink-soft lg:text-right">{brand.heroLead}<br /><strong className="font-semibold text-ink">{brand.heroLeadStrong}</strong></p>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
                {heroAvatars.map((a, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.07, type: 'spring', stiffness: 300, damping: 18 }}>
                    <Avatar src={a.src} size={34} pad={a.pad} ring={false} />
                  </motion.span>
                ))}
                <span className="flex size-[34px] items-center justify-center rounded-full border border-dashed border-white/25 text-white/60"><Plus className="size-4" /></span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" arrow>Explore Experiments</Button>
                <Button size="lg" variant="outline">Collaborate with us</Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6, ease }} className="mt-16 lg:mt-20">
          <LabShowcase />
        </motion.div>
      </div>
    </section>
  )
}
