import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import {
  ArrowUpRight, ArrowRight, Check, Quote, ShieldCheck, Gem, HeartHandshake,
  Compass, Target, Layers3,
} from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ProjectsGallery from '../components/ProjectsGallery'
import { useUI } from '../context/UIContext'
import { usePageMeta } from '../lib/usePageMeta'
import { commitments, config, divisions, processSteps, whyChooseUs } from '../data/site'

const marqueeWords = [
  'Marine Outboard Services',
  'Real Estate Management',
  'Fashion & AI Advertising',
  'Quality Service',
  'Business Growth',
  'Innovation',
]

export default function Home() {
  const { openQuote } = useUI()
  usePageMeta(
    'Connecting Business With Opportunity',
    'CLINTON GLOBAL INVESTMENT — professional marine outboard services, real estate management, fashion solutions and AI-powered advertising. Three divisions, one standard of excellence.'
  )

  return (
    <>
      <Hero />

      {/* Marquee identity band */}
      <div className="relative overflow-hidden border-y border-gold/15 bg-ink-800/70 py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeWords.map((word) => (
                <span key={word} className="flex items-center gap-8 px-8">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-cream/55">{word}</span>
                  <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About preview */}
      <section id="about" className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-gold/[0.045] blur-[120px]" />
        <div className="shell relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative">
              <div className="absolute -bottom-5 -left-5 hidden h-40 w-40 border-b border-l border-gold/40 sm:block" />
              <div className="absolute -right-5 -top-5 hidden h-40 w-40 border-r border-t border-gold/40 sm:block" />
              <div className="relative aspect-[4/3.3] overflow-hidden">
                <img src="/images/about-corporate.jpg" alt="A quiet moment in a modern corporate office at dusk" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-7 right-4 border border-gold/40 bg-ink-800/95 px-6 py-5 shadow-card backdrop-blur-md sm:right-8">
                <p className="font-display text-3xl text-gold-light">03</p>
                <p className="mt-1 font-heading text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/70">Business Divisions</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title={<>One Company.<br /><span className="gold-text italic">Many Opportunities.</span></>}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 text-[15px] leading-[1.85] text-cream/75">
                CLINTON GLOBAL INVESTMENT is a diversified enterprise built around innovation, service excellence and business opportunities. Our operations span marine outboard solutions, real estate management, fashion services and AI-powered advertising.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-mist">
                Our goal is to connect people with quality products, professional services and creative solutions.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Compass, label: 'Our Vision', text: 'Connecting people with opportunity' },
                  { icon: ShieldCheck, label: 'Our Mission', text: 'Reliable value in every engagement' },
                  { icon: Gem, label: 'Our Standard', text: 'One level of care, three divisions' },
                ].map((v) => (
                  <div key={v.label} className="border border-white/[0.08] bg-ink-800/60 p-4 transition-colors hover:border-gold/40">
                    <v.icon size={17} className="text-gold" />
                    <p className="mt-3 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-cream">{v.label}</p>
                    <p className="mt-1.5 text-[11px] leading-snug text-mist/80">{v.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link to="/about" className="btn-outline">Discover Our Story <ArrowUpRight size={15} /></Link>
                <button onClick={() => openQuote()} className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-cream/60 hover:text-gold">
                  Work with us <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink-800/60 py-24 sm:py-32">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="Our Three Business Divisions"
            title={<>Three Divisions. <span className="gold-text italic">One Standard.</span></>}
            description="Distinct expertise, one professional identity. Find the division built for what you need."
            align="center"
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <Reveal key={d.key} delay={i * 0.1}>
                <article
                  className="division-card group flex h-full flex-col overflow-hidden rounded-sm border border-white/[0.09] bg-ink-900"
                  style={{ '--accent': d.accent } as CSSProperties}
                >
                  <Link to={d.path} className="relative block aspect-[4/2.7] overflow-hidden">
                    <img src={d.image} alt={d.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                    <div className="division-accent-bg absolute inset-x-0 bottom-0 h-[2px] opacity-70" />
                    <span className="absolute left-5 top-5 font-display text-4xl text-cream/85 drop-shadow-lg">{d.number}</span>
                    <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-sm border border-white/25 bg-ink/45 text-cream backdrop-blur-sm">
                      <d.icon size={17} />
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="division-accent-text font-heading text-[9px] font-bold uppercase tracking-[0.22em]">{d.eyebrow}</p>
                    <h3 className="mt-3 font-display text-[26px] leading-tight text-cream">{d.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-mist/85">{d.description}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6">
                      {d.featured.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[12px] text-cream/70">
                          <Check size={13} className="mt-0.5 shrink-0 text-gold" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={d.path} className="mt-auto flex items-center justify-between pt-8 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      <span>Explore Division</span>
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/services" className="btn-ghost">See All Services <ArrowUpRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[130px]" />
        <div className="shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="Why Choose Us"
                title={<>The Difference Is <span className="gold-text italic">In the Details.</span></>}
                description="Six commitments that shape how we work with every customer, in every division."
              />
              <Reveal delay={0.2}>
                <div className="mt-10 hidden max-w-sm border-l-2 border-gold/50 pl-6 lg:block">
                  <p className="font-display text-xl italic leading-relaxed text-cream/80">“{config.tagline}”</p>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {whyChooseUs.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 0.08}>
                  <div className="group h-full bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-700 sm:p-8">
                    <div className="flex items-start justify-between">
                      <span className="grid h-11 w-11 place-items-center border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/10">
                        <v.icon size={19} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-2xl text-cream/15">0{i + 1}</span>
                    </div>
                    <h3 className="mt-7 font-display text-xl text-cream">{v.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-mist/85">{v.description}</p>
                    <div className="mt-6 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-ink-800/50 py-24 sm:py-32">
        <div className="shell relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Featured Work"
              title={<>Selected Work &amp; <span className="gold-text italic">Capabilities.</span></>}
              description="A look across the products, properties and creative work our three divisions deliver."
            />
            <Reveal delay={0.1}>
              <Link to="/projects" className="btn-outline mb-2">View All Projects <ArrowUpRight size={15} /></Link>
            </Reveal>
          </div>
          <div className="mt-14">
            <ProjectsGallery limit={6} />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink py-24 sm:py-28">
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="How We Work"
            title={<>A Clear Path From <span className="gold-text italic">First Conversation.</span></>}
            description="A straightforward process, whichever division you work with."
            align="center"
          />
          <div className="relative mt-20">
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {processSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-ink font-display text-lg text-gold-light">
                      {step.number}
                    </div>
                    <h3 className="mt-6 font-display text-2xl text-cream">{step.title}</h3>
                    <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-mist">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer voices — honest, per the brief's instruction not to invent reviews */}
      <section className="relative overflow-hidden bg-ink-800/40 py-24 sm:py-28">
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="Customer Voices"
            title={<>Feedback Shared <span className="gold-text italic">With Permission.</span></>}
            description="What our customers say about working with us will be published here."
            align="center"
          />
          <Reveal delay={0.12}>
            <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden border border-gold/25 bg-ink-900 px-7 py-12 text-center sm:px-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <Quote size={34} className="mx-auto text-gold/40" strokeWidth={1} />
              <p className="mx-auto mt-6 max-w-xl font-display text-[22px] italic leading-relaxed text-cream/85 sm:text-2xl">
                Real feedback, from real customers, shared only with their permission.
              </p>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-mist">
                We do not publish invented reviews or customer ratings. As we collect genuine feedback from clients across our marine, real estate and creative work, their words will appear here.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-heading text-[10px] uppercase tracking-[0.18em] text-cream/45">
                <span className="flex items-center gap-2"><HeartHandshake size={13} className="text-gold" /> Professionalism</span>
                <span className="flex items-center gap-2"><Gem size={13} className="text-gold" /> Quality Service</span>
                <span className="flex items-center gap-2"><Target size={13} className="text-gold" /> Commitment</span>
              </div>
              <Link to="/contact" className="btn-outline mt-10">
                Worked With Us? Share Your Experience <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commitments strip */}
      <section className="border-t border-white/[0.06] bg-ink py-20">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="border-l border-gold/30 pl-6">
                  <div className="flex items-center gap-3">
                    <c.icon size={18} className="text-gold" />
                    <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-cream">{c.title}</h3>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-mist">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14 flex items-center justify-center gap-4 font-heading text-[10px] uppercase tracking-[0.22em] text-cream/35">
              <Layers3 size={14} className="text-gold/60" /> {config.strapline} <Layers3 size={14} className="text-gold/60" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
