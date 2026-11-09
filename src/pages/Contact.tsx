import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle, Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import InquiryForm from '../components/InquiryForm'
import Accordion from '../components/Accordion'
import { useUI } from '../context/UIContext'
import { usePageMeta } from '../lib/usePageMeta'
import { config, faqs, whatsappLink } from '../data/site'

export default function Contact() {
  const { openQuote, openSearch } = useUI()
  usePageMeta('Contact Us', 'Contact CLINTON GLOBAL INVESTMENT for marine, real estate, fashion and AI advertising inquiries. Send an inquiry, request a quote or chat on WhatsApp.')

  const cards = [
    { icon: MessageCircle, label: 'WhatsApp', value: config.whatsappDisplay, note: 'Fastest way to reach us', href: whatsappLink(), external: true },
    { icon: Phone, label: 'Phone', value: config.phoneDisplay, note: config.hours, href: config.phoneHref },
    { icon: Mail, label: 'Email', value: config.email, note: 'We reply to every inquiry', href: `mailto:${config.email}` },
    { icon: MapPin, label: 'Location', value: config.address, note: 'Visit by appointment', href: undefined },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>Let&apos;s Start a <span className="gold-text italic">Conversation.</span></>}
        description="Tell us what you need and the right team will get back to you. One message is all it takes to begin."
        breadcrumb={[{ label: 'Contact Us' }]}
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openQuote()} className="btn-gold">Get a Quote <ArrowUpRight size={15} /></button>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle size={15} /> Chat on WhatsApp</a>
          <button onClick={openSearch} className="btn-ghost"><Search size={14} /> Find a Service</button>
        </div>
      </PageHero>

      {/* Contact + form */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-gold/[0.045] blur-[130px]" />
        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Reach Our Team" title={<>We&apos;re Here <span className="gold-text italic">To Help.</span></>} description="Choose whichever channel suits you. For anything urgent, WhatsApp is the quickest route." />

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {cards.map((c, i) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/35 text-gold"><c.icon size={17} strokeWidth={1.6} /></span>
                    <span className="min-w-0">
                      <span className="block font-heading text-[9px] font-bold uppercase tracking-[0.2em] text-mist/70">{c.label}</span>
                      <span className="mt-1.5 block break-words text-[13px] text-cream/90">{c.value}</span>
                      <span className="mt-1 block text-[11px] text-mist/60">{c.note}</span>
                    </span>
                  </>
                )
                return (
                  <Reveal key={c.label} delay={i * 0.06}>
                    {c.href ? (
                      <a href={c.href} target={c.external ? '_blank' : undefined} rel="noreferrer" className="flex h-full items-start gap-4 border border-white/[0.08] bg-ink-800/60 p-5 transition-colors hover:border-gold/45">{inner}</a>
                    ) : (
                      <div className="flex h-full items-start gap-4 border border-white/[0.08] bg-ink-800/60 p-5">{inner}</div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 border border-white/[0.08] bg-ink-800/40 p-6">
                <div className="flex items-center gap-3"><Clock size={16} className="text-gold" /><span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-cream">Business Hours</span></div>
                <p className="mt-3 text-sm text-cream/75">{config.hours}</p>
                <div className="hairline my-6" />
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-cream">Follow Us</p>
                <div className="mt-4 flex gap-2.5">
                  {[
                    { icon: Instagram, href: config.social.instagram, label: 'Instagram' },
                    { icon: Facebook, href: config.social.facebook, label: 'Facebook' },
                    { icon: Linkedin, href: config.social.linkedin, label: 'LinkedIn' },
                    { icon: ArrowUpRight, href: config.social.tiktok, label: 'TikTok' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center border border-white/10 text-mist transition-colors hover:border-gold/60 hover:text-gold"><s.icon size={15} /></a>
                  ))}
                </div>
              </div>
            </Reveal>

            <p className="mt-6 text-[11px] leading-relaxed text-mist/45">
              Contact details shown here are placeholders to be replaced with verified business information before launch. Inquiry forms in this build are demonstrations.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="relative border border-white/[0.09] bg-ink-800/70 p-6 sm:p-9">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <div className="mb-8 border-b border-white/[0.08] pb-6">
                <p className="eyebrow eyebrow-line">Send an Inquiry</p>
                <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">Tell us what you need.</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">Fill in the form below and we&apos;ll route your message to the right division.</p>
              </div>
              <InquiryForm source="Contact page" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="border-y border-white/[0.06] bg-ink-800/50 py-20 sm:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Find Us" title={<>Based in <span className="gold-text italic">Lagos, Nigeria.</span></>} description="Visits are by appointment — please get in touch first so we can make sure the right person is available." />
          <Reveal delay={0.1}>
            <div className="mt-10 grid overflow-hidden border border-white/[0.09] lg:grid-cols-[1.5fr_1fr]">
              <div className="relative min-h-[320px] bg-ink-900">
                <div className="absolute inset-0 bg-radial-gold" />
                <div className="absolute inset-0 bg-grid opacity-70" />
                <iframe
                  title="Map showing Lagos, Nigeria"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(config.mapsQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 h-full w-full grayscale-[0.7] invert-[0.88] contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 border-[10px] border-ink-900/40" />
              </div>
              <div className="flex flex-col justify-center gap-6 bg-ink-900 p-8 sm:p-10">
                <div className="flex gap-4"><MapPin size={19} className="mt-1 shrink-0 text-gold" /><div><p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-cream">Office Location</p><p className="mt-2 text-sm text-mist">{config.address}</p></div></div>
                <div className="hairline" />
                <div className="flex gap-4"><Clock size={19} className="mt-1 shrink-0 text-gold" /><div><p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-cream">Hours</p><p className="mt-2 text-sm text-mist">{config.hours}</p></div></div>
                <div className="hairline" />
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.mapsQuery)}`} target="_blank" rel="noreferrer" className="btn-outline self-start">Open in Google Maps <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Good to Know" title={<>Common <span className="gold-text italic">Questions.</span></>} />
          <Reveal delay={0.1}><Accordion items={faqs.general} /></Reveal>
        </div>
      </section>

      {/* Final CTA (this page hides the global band) */}
      <section className="relative overflow-hidden border-t border-gold/15 bg-ink-800 py-20 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[120px]" />
        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3"><span className="h-px w-8 bg-gold/70" /> Let&apos;s Build Something Valuable Together <span className="h-px w-8 bg-gold/70" /></p>
            <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Your Next Opportunity Starts With a Conversation.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={15} /> Chat on WhatsApp</a>
              <button onClick={() => openQuote()} className="btn-outline">Request a Service <ArrowUpRight size={15} /></button>
              <Link to="/services" className="btn-ghost">Partner With Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
