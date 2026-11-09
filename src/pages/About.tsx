import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, ArrowRight, Target, Eye, HeartHandshake } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../lib/usePageMeta'
import { commitments, config, divisions, processSteps, whyChooseUs } from '../data/site'

export default function About() {
  usePageMeta('About Us', 'Learn about CLINTON GLOBAL INVESTMENT: our story, vision, mission, values and the three divisions that connect people with opportunity.')

  return (
    <>
      <PageHero
        eyebrow="About the Company"
        title={<>A Diversified Enterprise Built Around <span className="gold-text italic">Opportunity.</span></>}
        description="CLINTON GLOBAL INVESTMENT connects people with quality products, professional services and creative solutions across three specialised divisions."
        image="/images/about-corporate.jpg"
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* Story */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-gold/[0.05] blur-[130px]" />
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Our Story" title={<>Who We <span className="gold-text italic">Are.</span></>} />
            <Reveal delay={0.1}>
              <div className="mt-9 space-y-5 text-[15px] leading-[1.85] text-cream/75">
                <p>
                  CLINTON GLOBAL INVESTMENT is a diversified business company providing professional marine outboard services, real estate management, fashion solutions and AI-powered advertising services.
                </p>
                <p>
                  We are committed to delivering quality, innovation and reliable business solutions that create value for our customers. Rather than asking clients to navigate three unrelated businesses, we bring them under one professional identity built on service excellence.
                </p>
                <p>
                  A fisherman looking for an outboard engine, an investor considering a property and a fashion entrepreneur planning a campaign should all find the same clarity, care and commitment when they arrive.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 border-l-2 border-gold/60 bg-ink-800/50 py-5 pl-6 pr-5">
                <p className="font-display text-[20px] italic leading-relaxed text-cream/90 sm:text-2xl">
                  “{config.tagline}”
                </p>
                <p className="mt-3 font-heading text-[10px] uppercase tracking-[0.2em] text-gold">{config.strapline}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/4.4] overflow-hidden">
              <img src="/images/realestate-interior.jpg" alt="Refined interior representing the standard of care across the group" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 border border-gold/30 bg-ink/70 p-6 backdrop-blur-md">
                <p className="font-display text-2xl text-gold-light">One Standard</p>
                <p className="mt-2 text-[13px] leading-relaxed text-cream/70">Three divisions, one promise: professional work, clear communication and genuine value.</p>
              </div>
            </div>
            <div className="absolute -left-5 -top-5 hidden h-32 w-32 border-l border-t border-gold/40 sm:block" />
          </Reveal>
        </div>
      </section>

      {/* Vision, mission, approach */}
      <section className="relative border-y border-white/[0.06] bg-ink-800/60 py-24 sm:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="What Guides Us"
            title={<>Vision, Mission &amp; <span className="gold-text italic">Approach.</span></>}
            description="The principles behind every decision we make and every service we deliver."
            align="center"
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {commitments.map((c, i) => {
              const icons = [Eye, Target, HeartHandshake]
              const Icon = icons[i]
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden border border-white/[0.09] bg-ink-900 p-8 transition-colors duration-500 hover:border-gold/45 sm:p-10">
                    <span className="absolute right-6 top-4 font-display text-6xl text-cream/[0.04]">0{i + 1}</span>
                    <div className="grid h-12 w-12 place-items-center border border-gold/40 text-gold"><Icon size={20} strokeWidth={1.5} /></div>
                    <h3 className="mt-8 font-display text-2xl text-cream">{c.title}</h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-mist">{c.text}</p>
                    <div className="mt-8 h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-24 sm:py-28">
        <div className="shell">
          <SectionHeading eyebrow="Our Values" title={<>Six Commitments That <span className="gold-text italic">Define Us.</span></>} />
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08}>
                <div className="flex gap-5 border-t border-white/[0.09] pt-6">
                  <span className="font-display text-lg text-gold/70">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl text-cream">{v.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist/85">{v.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Three divisions */}
      <section className="border-y border-white/[0.06] bg-ink-800/50 py-24 sm:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="One Group, Three Divisions"
            title={<>Built to Serve <span className="gold-text italic">Different Needs.</span></>}
            description="Each division has its own expertise and identity, while sharing the same company-wide standards."
          />
          <div className="mt-14 divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {divisions.map((d, i) => (
              <Reveal key={d.key} delay={i * 0.06}>
                <Link to={d.path} className="group grid items-center gap-6 py-7 sm:grid-cols-[80px_1fr_1.2fr_auto] sm:gap-8">
                  <span className="font-display text-3xl text-gold/70">{d.number}</span>
                  <h3 className="font-display text-2xl text-cream transition-colors group-hover:text-gold-light">{d.title}</h3>
                  <p className="text-[13px] leading-relaxed text-mist">{d.tagline}</p>
                  <span className="inline-flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                    Explore <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-ink py-24 sm:py-28">
        <div className="shell">
          <SectionHeading eyebrow="Our Approach in Practice" title={<>From Conversation <span className="gold-text italic">To Delivery.</span></>} align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="h-full border border-white/[0.08] bg-ink-800/60 p-7">
                  <p className="font-display text-3xl text-gold/70">{step.number}</p>
                  <h3 className="mt-5 font-display text-xl text-cream">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Link to="/services" className="btn-gold">Explore Our Services <ArrowUpRight size={15} /></Link>
              <Link to="/contact" className="btn-ghost">Contact Our Team <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Small brand values list */}
      <section className="border-t border-white/[0.06] bg-ink-800/40 py-14">
        <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {['Trust', 'Innovation', 'Professionalism', 'Quality Service', 'Business Growth'].map((v) => (
            <span key={v} className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.2em] text-cream/45"><Check size={12} className="text-gold" /> {v}</span>
          ))}
        </div>
      </section>
    </>
  )
}
