import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calculator, CheckCircle2, ListChecks } from 'lucide-react'
import ProvinceFlag from '../../src/components/portal/ProvinceFlag'
import WaveField from '../../src/components/WaveField'
import { Reveal } from '../../src/components/ui'
import { ArticleCard, PillarCard, SectionHeading } from '../../src/components/portal/Cards'
import Faq from '../../src/components/portal/Faq'
import JsonLd from '../../src/components/portal/JsonLd'
import LeadForm from '../../src/components/portal/LeadForm'
import { getArticles } from '../../src/lib/articles'
import { pillarKeys, pillars } from '../../src/lib/pillars'
import { provinces, provinceCodes } from '../../src/lib/provinces'
import { faqJsonLd, organizationJsonLd } from '../../src/lib/seo'
import { homeFaqs } from '../../src/data'
import { isLang, t } from '../../src/i18n'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'NorthStack — Guides & Tools for Canadian Small Businesses',
  description:
    'Answer-first guides and free tools for Canadian SMBs: tax compliance, software stacks, provincial employment rules and non-dilutive funding — for BC, Alberta, Ontario and Quebec.',
  alternates: { canonical: '/en', languages: { 'en-CA': '/en', 'fr-CA': '/fr' } },
}

const wrap = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[100px]'

const MapleLeaf = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden="true">
    <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5-5.1-7.5-42.7-79.8-42.7-79.8s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3s-12.5 27.3-15 32.3-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167S43 226.7 45.5 234.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512l30 0s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
  </svg>
)

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const l = (h: string) => `/${lang}${h}`
  const articles = await getArticles()
  const latest = articles.slice(0, 6)

  return (
    <div className="relative overflow-x-clip">
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 h-[560px] overflow-hidden sm:h-[640px]">
          <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_55%_20%,rgba(232,58,46,.28),rgba(14,13,16,.9))] light:bg-[radial-gradient(70%_80%_at_55%_20%,rgba(232,58,46,.14),rgba(250,246,245,.92))]" />
          <WaveField className="size-full opacity-80" intensity={0.9} />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        </div>
        <div className={`${wrap} pt-40 pb-20 text-center sm:pt-48`}>
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[12px] tracking-[0.12em] text-electric uppercase backdrop-blur light:border-black/10 light:bg-black/[0.03]">
              <MapleLeaf className="size-3.5" /> {lang === 'fr' ? 'Portail de ressources pour PME canadiennes' : 'Canadian SMB resource portal'}
            </div>
            <h1 className="display-xl mx-auto mt-7 max-w-[900px] text-[44px] sm:text-[64px] lg:text-[76px]">
              {lang === 'fr' ? <>Des réponses aux questions des <span className="text-grad">fondateurs canadiens.</span></> : <>Answers for the questions <span className="text-grad">Canadian founders.</span></>}
            </h1>
            <p className="mx-auto mt-7 max-w-[640px] text-[18px] leading-[1.65] text-ink-soft">
              {lang === 'fr'
                ? 'Des guides clairs sur la fiscalité, les logiciels, les opérations et le financement — plus des outils gratuits qui font les calculs. Chaque réponse commence par la réponse.'
                : 'Plain-English guides on tax, software, operations and funding — plus free tools that do the math. Every answer leads with the answer.'}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={l('/guides')} className="group inline-flex h-[50px] items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white transition hover:bg-[#f04a3e]">
                {t(lang, 'Browse')} {t(lang, 'All guides').toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href={l('/tools/tax-compliance-checklist')} className="inline-flex h-[50px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10 light:border-black/15 light:bg-black/[0.03] light:text-ink light:hover:border-black/30 light:hover:bg-black/[0.06]">
                {lang === 'fr' ? 'Vérifier la conformité' : 'Run the compliance checklist'}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className={wrap} aria-labelledby="pillars">
        <Reveal>
          <SectionHeading title={lang === 'fr' ? 'Quatre piliers, zéro jargon.' : 'Four pillars, zero jargon.'} sub={lang === 'fr' ? "Chaque guide répond à la question dans les 150 premiers mots, puis approfondit. Conçu pour les extraits, écrit pour les humains." : 'Each guide answers the question in the first 150 words, then goes deep. Built for snippets, written for humans.'} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillarKeys.map((k, i) => (
            <Reveal key={k} delay={i * 0.07} className="h-full">
              <PillarCard p={pillars[k]} count={articles.filter((a) => a.pillar === k && !a.province).length} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Latest guides */}
      <section className={`${wrap} mt-24 lg:mt-32`} aria-labelledby="latest">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={lang === 'fr' ? 'Nouveaux guides.' : 'Latest guides.'} />
            <Link href={l('/guides')} className="group mb-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition hover:text-electric">
              {t(lang, 'All guides')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.07} className="h-full">
              <ArticleCard a={a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Provinces */}
      <section className={`${wrap} mt-24 lg:mt-32`} aria-labelledby="provinces">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={lang === 'fr' ? 'Les règles changent à la frontière.' : 'Rules change at the border.'} sub={lang === 'fr' ? 'Taxes de vente, organismes de paie et subventions sont provinciaux. Ces hubs remettent les règles au clair.' : 'Sales tax, payroll bodies and grant programs are provincial. These hubs keep the rules straight.'} />
            <Link href={l('/provinces')} className="group mb-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition hover:text-electric">
              {t(lang, 'All provinces')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provinceCodes.map((c, i) => {
            const p = provinces[c]
            return (
              <Reveal key={c} delay={i * 0.07} className="h-full">
                <Link href={l(`/provinces/${c}`)} className="group flex h-full flex-col rounded-[22px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <ProvinceFlag code={c} className="h-auto w-9 shrink-0" />
                    <span className="font-mono text-[11.5px] tracking-[0.14em] text-muted uppercase">{c}</span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-tight">{p.name}</h3>
                  <dl className="mt-3 flex flex-col gap-1.5 text-[12.5px] text-ink-soft">
                    <div className="flex justify-between"><dt>{lang === 'fr' ? 'Taxe de vente' : 'Sales tax'}</dt><dd className="font-medium text-ink">{p.salesTax.rate}</dd></div>
                    <div className="flex justify-between"><dt>{lang === 'fr' ? 'Taux PME' : 'Small biz rate'}</dt><dd className="font-medium text-ink">{p.smallBizRate}</dd></div>
                    <div className="flex justify-between"><dt>{lang === 'fr' ? 'Salaire min' : 'Min wage'}</dt><dd className="font-medium text-ink">{p.minWage}</dd></div>
                  </dl>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-primary transition group-hover:text-electric">
                    {lang === 'fr' ? 'Ouvrir le hub' : 'Open hub'} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Tools */}
      <section className={`${wrap} mt-24 lg:mt-32`} aria-labelledby="tools">
        <Reveal>
          <h2 id="tools" className="display-lg text-[36px] sm:text-[48px]">{lang === 'fr' ? <>L&apos;utile bat le <span className="text-grad">téléchargeable.</span></> : <>Useful beats <span className="text-grad">downloadable.</span></>}</h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-ink-soft">{lang === 'fr' ? 'Pas de courriel requis. Choisissez votre province, vos forfaits, et obtenez un chiffre sur lequel agir.' : 'No email wall to try them. Pick your province, pick your tiers, get a number you can act on.'}</p>
        </Reveal>
        <div className="mt-10 grid gap-5">
          {[
            { href: l('/tools/software-cost-estimator'), I: Calculator, t: 'Software Cost Estimator', d: lang === 'fr' ? "Taille d'équipe × forfaits : comptabilité, paie, CRM, support, hébergement, design — un seul chiffre mensuel honnête, en USD et CAD." : 'Team size × plan tiers across accounting, payroll, CRM, support, hosting and design — one honest monthly number in USD and CAD.' },
            { href: l('/tools/tax-compliance-checklist'), I: ListChecks, t: lang === 'fr' ? 'Liste de conformité provinciale' : 'Provincial Compliance Checklist', d: lang === 'fr' ? 'Chaque inscription, organisme de paie et déclaration annuelle pour votre province, dans une liste à cocher et copier.' : 'Every registration, payroll body and annual filing for your province, in one checkable list you can copy out.' },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex items-center gap-7 rounded-[28px] border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-electric"><tool.I className="size-6" aria-hidden="true" /></span>
              <div className="flex-1"><h3 className="display-lg text-[26px]">{tool.t}</h3><p className="mt-2 max-w-[560px] text-[14.5px] leading-[1.65] text-ink-soft">{tool.d}</p></div>
              <span className="hidden shrink-0 items-center gap-1.5 text-[14px] font-semibold text-primary transition group-hover:text-electric sm:inline-flex">{t(lang, 'Open tool')} <ArrowRight className="size-4" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className={`${wrap} mt-24 lg:mt-32`} aria-labelledby="why">
        <div className="mx-auto grid max-w-[1100px] gap-10 rounded-[32px] border border-line bg-surface p-8 sm:p-10 md:grid-cols-[1fr_1.5fr] md:items-center">
          <Reveal>
            <h2 className="display-lg text-[40px] sm:text-[52px]">{lang === 'fr' ? "La réponse d'abord," : 'Answer first,'}<br /><span className="text-grad">{lang === 'fr' ? 'puis en profondeur.' : 'then go deep.'}</span></h2>
          </Reveal>
          <ul className="flex flex-col gap-5">
            {[
              lang === 'fr' ? ["Réponses directes d'emblée", "Chaque guide mène avec une réponse claire dans les 150 premiers mots — pas de défilement à travers une histoire de vie."] : ['Direct answers up top', 'Every guide leads with a plain-English answer in the first 150 words — no scrolling past a life story.'],
              lang === 'fr' ? ['Exact par province', 'Taux, seuils et organismes vérifiés par province — pas de moyennes inutiles.'] : ['Province-accurate', 'Rates, thresholds and filing bodies are checked per province, not averaged into uselessness.'],
              lang === 'fr' ? ['Gratuit, sans murs', "Tous les guides et outils sont gratuits. Le seul formulaire courriel est l'infolettre optionnelle."] : ['Free, no walls', 'Every guide and tool is free. The only email gate is the optional monthly briefing.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3.5">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-electric" aria-hidden="true" />
                <div>
                  <div className="text-[16.5px] font-semibold">{t}</div>
                  <p className="mt-1 text-[14.5px] leading-[1.6] text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} mt-24 lg:mt-32`} aria-labelledby="faq">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 id="faq" className="display-lg text-[40px] sm:text-[52px] md:sticky md:top-32">{lang === 'fr' ? 'Bonnes' : 'Good'}<br /><span className="text-grad">questions.</span></h2>
          </Reveal>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* Lead CTA */}
      <section className="mt-24 px-3 sm:px-[60px] lg:mt-32">
        <Reveal>
          <div className="dark-ui relative mx-auto max-w-[900px] overflow-hidden rounded-[40px] border border-white/10 bg-[#18161a] px-6 py-16 text-center light:border-black/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(232,58,46,.35),transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/20 text-electric shadow-[0_0_60px_20px_rgba(232,58,46,.35)]">
                <BookOpen className="size-8" aria-hidden="true" />
              </div>
              <h2 className="display-lg mx-auto mt-6 max-w-[720px] text-[40px] sm:text-[56px]">{lang === 'fr' ? 'Nouveaux guides, dès leur parution.' : 'New guides, as they ship.'}</h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[17px] text-white/75 light:text-ink-soft">{lang === 'fr' ? 'Un courriel pratique par mois — seuils, subventions, choix de stack. Pas de blabla.' : 'One practical email a month — threshold changes, grant windows, stack picks. No fluff, no dailies.'}</p>
              <div className="mx-auto mt-8 max-w-[520px] text-left">
                <LeadForm source="homepage" compact />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
