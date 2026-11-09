import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { ArrowUpRight, ArrowRight, Check, MessageCircle, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useUI } from '../context/UIContext'
import { usePageMeta } from '../lib/usePageMeta'
import { divisions, whatsappLink } from '../data/site'

export default function Services() {
  const { openQuote, openSearch } = useUI()
  usePageMeta('Our Services', 'Explore the three divisions of CLINTON GLOBAL INVESTMENT: Marine Outboard Services, Real Estate Management, and Fashion & AI Advertising.')

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Three Divisions. <span className="gold-text italic">Endless Possibility.</span></>}
        description="Professional marine solutions, real estate opportunities, fashion creativity and intelligent AI-powered advertising — under one roof."
        image="/images/hero-marine.jpg"
        breadcrumb={[{ label: 'Our Services' }]}
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openQuote()} className="btn-gold">Get a Quote <ArrowUpRight size={15} /></button>
          <button onClick={openSearch} className="btn-ghost"><Search size={14} /> Find a Service</button>
        </div>
      </PageHero>

      {/* Overview grid */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-3">
            {divisions.map((d, i) => (
              <Reveal key={d.key} delay={i * 0.08}>
                <a href={`#division-${d.key}`} className="group flex h-full items-center gap-5 border border-white/[0.09] bg-ink-800/60 p-6 transition-colors hover:border-gold/45">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/35 text-gold"><d.icon size={20} strokeWidth={1.5} /></span>
                  <span>
                    <span className="font-display text-sm" style={{ color: d.accent }}>{d.number}</span>
                    <span className="mt-1 block font-heading text-[12px] font-semibold text-cream transition-colors group-hover:text-gold">{d.title}</span>
                    <span className="mt-1 block text-[11px] text-mist/75">{d.audience.length} audiences served</span>
                  </span>
                  <ArrowUpRight size={15} className="ml-auto shrink-0 text-gold/60" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating division detail sections */}
      {divisions.map((d, index) => (
        <section
          key={d.key}
          id={`division-${d.key}`}
          className={`relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 ${index % 2 === 0 ? 'bg-ink-800/55' : 'bg-ink'}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="shell relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={d.gallery[0]} alt={d.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 font-display text-5xl text-cream/80 drop-shadow-lg">{d.number}</span>
                <span className="absolute bottom-5 left-5 rounded-sm border border-gold/40 bg-ink/70 px-4 py-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">{d.eyebrow}</span>
              </div>
              <div className="absolute -bottom-4 -right-4 hidden h-28 w-28 border-b border-r border-gold/40 sm:block" />
            </Reveal>

            <div>
              <SectionHeading eyebrow={d.eyebrow} title={d.title} description={d.intro} />
              <Reveal delay={0.12}>
                <ul className="mt-9 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {d.services.map((s) => (
                    <li key={s.title} className="flex items-start gap-2.5 text-[13px] text-cream/75">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: d.accent }} /> {s.title}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 border-l-2 pl-5" style={{ borderColor: d.accent } as CSSProperties}>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-cream/70">Who it&apos;s for</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-mist">{d.audience.join(' · ')}</p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to={d.path} className="btn-gold">Explore {d.shortTitle} <ArrowUpRight size={15} /></Link>
                  <button onClick={() => openQuote({ division: d.key })} className="btn-ghost">Request a Service <ArrowRight size={14} /></button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Cross-division help band */}
      <section className="relative overflow-hidden border-t border-gold/15 bg-ink-800 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[110px]" />
        <div className="shell relative z-10 flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3"><span className="h-px w-8 bg-gold/70" /> Not Sure Where to Start? <span className="h-px w-8 bg-gold/70" /></p>
            <h2 className="display mx-auto mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)]">Tell us what you need. We&apos;ll point you to the right division.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-mist">One conversation is enough. Describe your goal and our team will guide you from there.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button onClick={() => openQuote()} className="btn-gold">Get a Quote <ArrowUpRight size={15} /></button>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={15} /> Chat on WhatsApp</a>
              <Link to="/contact" className="btn-outline">Contact Our Team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
