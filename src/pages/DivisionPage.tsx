import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle, Check, Phone, Mail, Clock, MapPin, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import InquiryForm from '../components/InquiryForm'
import Accordion from '../components/Accordion'
import AiVisual from '../components/AiVisual'
import { useUI } from '../context/UIContext'
import { usePageMeta } from '../lib/usePageMeta'
import { config, divisionByKey, divisions, faqs, processSteps, whatsappLink, type DivisionKey } from '../data/site'

export default function DivisionPage({ divisionKey }: { divisionKey: DivisionKey }) {
  const d = divisionByKey(divisionKey)
  const { openQuote } = useUI()
  const others = divisions.filter((x) => x.key !== divisionKey)
  usePageMeta(
    d.title,
    `${d.title} at CLINTON GLOBAL INVESTMENT. ${d.intro}`
  )

  return (
    <>
      <PageHero
        eyebrow={`${d.eyebrow} · Our Services`}
        title={d.title}
        description={d.intro}
        image={d.image}
        breadcrumb={[{ label: 'Our Services', to: '/services' }, { label: d.shortTitle }]}
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openQuote({ division: d.key })} className="btn-gold">Get a Quote <ArrowUpRight size={15} /></button>
          <a href="#inquiry" className="btn-ghost">Send an Inquiry <ArrowRight size={14} /></a>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-gold/[0.04] blur-[130px]" />
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Division Overview" title={d.tagline} />
            <Reveal delay={0.1}>
              <p className="mt-9 text-[15px] leading-[1.85] text-cream/75">{d.description}</p>
              <p className="mt-5 text-[15px] leading-[1.85] text-mist">
                Every engagement starts with a conversation about what you actually need. From there, our specialists recommend the most sensible route and keep you informed throughout the work.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {d.featured.map((f) => (
                  <div key={f} className="flex items-center gap-3 border border-white/[0.08] bg-ink-800/60 px-4 py-3.5">
                    <Check size={14} className="shrink-0 text-gold" />
                    <span className="text-[12px] text-cream/80">{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative h-full border border-white/[0.09] bg-ink-800/60 p-8 sm:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <p className="font-display text-6xl" style={{ color: d.accent }}>{d.number}</p>
              <h3 className="mt-5 font-display text-2xl text-cream">Who We Serve</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {d.audience.map((a) => (
                  <span key={a} className="border border-white/[0.12] px-3 py-2 font-heading text-[10px] uppercase tracking-[0.12em] text-cream/70">{a}</span>
                ))}
              </div>
              <div className="hairline my-8" />
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Talk to a specialist</p>
              <a href={whatsappLink(`Hello, I'm interested in ${d.title}.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-display text-xl text-cream transition-colors hover:text-gold">
                <MessageCircle size={18} className="text-gold" /> Chat on WhatsApp
              </a>
              <p className="mt-2 text-xs text-mist/70">{config.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="relative border-y border-white/[0.06] bg-ink-800/55 py-24 sm:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="What We Offer"
            title={<>Services Built Around <span className="gold-text italic">Your Needs.</span></>}
            description={`A closer look at the work our ${d.shortTitle} division delivers.`}
            align="center"
          />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.07}>
                <div className="group h-full border border-white/[0.08] bg-ink-900 p-7 transition-all duration-500 hover:border-gold/45 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center border border-gold/30 text-gold transition-colors group-hover:bg-gold/10"><s.icon size={19} strokeWidth={1.5} /></span>
                    <span className="font-display text-xl text-cream/15">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist/85">{s.description}</p>
                  <div className="mt-6 h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion × AI special section */}
      {divisionKey === 'fashion-ai' && (
        <section className="bg-ink py-24 sm:py-28">
          <div className="shell">
            <SectionHeading eyebrow="Two Crafts, One Division" title={<>Where Craft Meets <span className="gold-text italic">Intelligent Media.</span></>} description="Fashion and AI advertising are stronger together — a collection can be designed, styled, promoted and campaigned within one team." align="center" />
            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="h-full border border-white/[0.09] bg-ink-800/60 p-8 sm:p-10">
                  <p className="font-display text-3xl text-gold-light">01 / Fashion</p>
                  <h3 className="mt-4 font-display text-2xl text-cream">Designed and made with care</h3>
                  <ul className="mt-7 space-y-3">
                    {['Fashion designing', 'Tailoring & custom outfits', 'Fashion styling', 'Beading & embellishment', 'Fashion brand promotion'].map((x) => (
                      <li key={x} className="flex items-center gap-3 border-b border-white/[0.06] pb-3 text-sm text-cream/75"><Check size={14} className="text-gold" /> {x}</li>
                    ))}
                  </ul>
                  <div className="mt-8 aspect-[16/8] overflow-hidden">
                    <img src="/images/fashion-atelier.jpg" alt="Garments and beadwork in the atelier" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="h-full border border-white/[0.09] bg-ink-800/60 p-8 sm:p-10">
                  <p className="font-display text-3xl text-gold-light">02 / AI Advertising</p>
                  <h3 className="mt-4 font-display text-2xl text-cream">Creative content, intelligently produced</h3>
                  <ul className="mt-7 space-y-3">
                    {['AI-generated advertising videos', 'AI character creation', 'Product advertising campaigns', 'AI voice-over production', 'Social media adverts & graphics'].map((x) => (
                      <li key={x} className="flex items-center gap-3 border-b border-white/[0.06] pb-3 text-sm text-cream/75"><Check size={14} className="text-gold" /> {x}</li>
                    ))}
                  </ul>
                  <div className="mt-8 aspect-[16/8] overflow-hidden">
                    <AiVisual className="h-full w-full" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="border-t border-white/[0.06] bg-ink py-24 sm:py-28">
        <div className="shell">
          <SectionHeading eyebrow="Inside the Division" title={<>A Closer <span className="gold-text italic">Look.</span></>} description="The products, spaces and creative work behind what we do." />
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {(divisionKey === 'fashion-ai' ? d.gallery.slice(0, 2) : d.gallery).map((img, i) => (
              <Reveal key={img + i} delay={i * 0.08}>
                <div className="group relative aspect-[4/3.2] overflow-hidden border border-white/[0.08]">
                  <img src={img} alt={`${d.title} — view ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display text-2xl text-cream/70">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
            {divisionKey === 'fashion-ai' && (
              <Reveal delay={0.16}>
                <div className="group relative aspect-[4/3.2] overflow-hidden border border-white/[0.08]">
                  <AiVisual className="h-full w-full" />
                  <span className="absolute bottom-4 left-4 font-display text-2xl text-cream/70">03</span>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/[0.06] bg-ink-800/50 py-20">
        <div className="shell">
          <SectionHeading eyebrow="How to Get Started" title={<>Four Simple <span className="gold-text italic">Steps.</span></>} align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.number} delay={i * 0.08}>
                <div className="border-t border-gold/40 pt-5">
                  <p className="font-display text-3xl text-gold/70">{s.number}</p>
                  <h3 className="mt-4 font-display text-xl text-cream">{s.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated inquiry form */}
      <section id="inquiry" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/[0.05] blur-[130px]" />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Request a Service" title={<>Let&apos;s Talk About <span className="gold-text italic">Your Needs.</span></>} description={`Send us the details and our ${d.shortTitle} team will come back to you with the next step.`} />
            <Reveal delay={0.12}>
              <div className="mt-10 space-y-5">
                {[
                  { icon: MessageCircle, label: 'WhatsApp', value: config.whatsappDisplay, href: whatsappLink(`Hello, I'm interested in ${d.title}.`) },
                  { icon: Phone, label: 'Phone', value: config.phoneDisplay, href: config.phoneHref },
                  { icon: Mail, label: 'Email', value: config.email, href: `mailto:${config.email}` },
                  { icon: MapPin, label: 'Location', value: config.address, href: undefined },
                  { icon: Clock, label: 'Hours', value: config.hours, href: undefined },
                ].map((c) => {
                  const inner = (
                    <>
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-gold/30 text-gold"><c.icon size={15} /></span>
                      <span>
                        <span className="block font-heading text-[9px] font-bold uppercase tracking-[0.2em] text-mist/70">{c.label}</span>
                        <span className="mt-1 block text-sm text-cream/85">{c.value}</span>
                      </span>
                    </>
                  )
                  return c.href ? (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 transition-colors hover:text-gold">{inner}</a>
                  ) : (
                    <div key={c.label} className="flex items-center gap-4">{inner}</div>
                  )
                })}
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 border-l-2 border-gold/50 pl-5">
                <p className="text-[13px] leading-relaxed text-mist">Prefer a quick conversation? WhatsApp is usually the fastest way to reach our team.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-white/[0.09] bg-ink-800/70 p-6 sm:p-9">
              <div className="pointer-events-none absolute" />
              <div className="mb-7 flex items-center justify-between border-b border-white/[0.08] pb-5">
                <h3 className="font-display text-2xl text-cream">{d.shortTitle} Inquiry</h3>
                <span className="font-display text-3xl" style={{ color: d.accent }}>{d.number}</span>
              </div>
              <InquiryForm source={`${d.title} page`} lockedDivision={d.key} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] bg-ink-800/50 py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Good to Know" title={<>Frequently Asked <span className="gold-text italic">Questions.</span></>} />
          <Reveal delay={0.1}><Accordion items={faqs[divisionKey]} /></Reveal>
        </div>
      </section>

      {/* Other divisions */}
      <section className="bg-ink py-20">
        <div className="shell">
          <p className="eyebrow eyebrow-line">Explore Our Other Divisions</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.key} delay={i * 0.08}>
                <Link to={o.path} className="group relative flex h-48 items-end overflow-hidden border border-white/[0.09] p-7">
                  <img src={o.image} alt={o.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
                  <div className="relative">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{o.eyebrow}</span>
                    <h3 className="mt-2 font-display text-2xl text-cream">{o.title}</h3>
                  </div>
                  <ArrowUpRight size={20} className="absolute right-6 top-6 text-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
