import { Link } from 'react-router-dom'
import { MessageCircle, ClipboardList, Handshake, Send, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { useUI } from '../context/UIContext'
import { whatsappLink } from '../data/site'

export default function CtaBand() {
  const { openQuote } = useUI()

  const primary = [
    { label: 'Chat on WhatsApp', icon: MessageCircle, href: whatsappLink(), external: true },
    { label: 'Request a Service', icon: ClipboardList, action: () => openQuote() },
    { label: 'Partner With Us', icon: Handshake, to: '/contact' },
    { label: 'Send an Inquiry', icon: Send, to: '/contact' },
  ]

  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-ink-800 py-24 sm:py-28">
      <div className="bg-grid animate-grid-drift pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.09] blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="shell relative z-10 text-center">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-3"><span className="h-px w-8 bg-gold/70" /> Start a Conversation <span className="h-px w-8 bg-gold/70" /></p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] text-balance">
            Let&apos;s Build Something <span className="gold-text italic">Valuable</span> Together.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-mist sm:text-base">
            Tell us what you need. Whether it is an outboard engine, a property decision or a creative campaign, our team is ready to listen.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mx-auto mt-11 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {primary.map((item, i) => {
              const content = (
                <>
                  <item.icon size={15} />
                  <span>{item.label}</span>
                  <ArrowUpRight size={13} className="ml-auto opacity-50" />
                </>
              )
              const cls = 'group flex w-full items-center gap-2.5 rounded-sm border px-5 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5'
              if (item.external) {
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={`${cls} border-gold/60 bg-gold-gradient text-ink hover:brightness-110`}>
                    {content}
                  </a>
                )
              }
              if (item.action) {
                return (
                  <button key={item.label} onClick={item.action} className={`${cls} border-gold/50 text-gold hover:bg-gold/10`}>
                    {content}
                  </button>
                )
              }
              return (
                <Link key={item.label} to={item.to!} className={`${cls} border-white/[0.12] text-cream/85 hover:border-gold/60 hover:text-gold`}>
                  {content}
                </Link>
              )
            })}
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-9 font-heading text-[10px] uppercase tracking-[0.22em] text-cream/30">
            Marine Outboard Services &nbsp;·&nbsp; Real Estate Management &nbsp;·&nbsp; Fashion &amp; AI Advertising
          </p>
        </Reveal>
      </div>
    </section>
  )
}
