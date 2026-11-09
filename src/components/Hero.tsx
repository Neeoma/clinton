import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDown, ArrowRight } from 'lucide-react'
import { divisions, config } from '../data/site'
import { useUI } from '../context/UIContext'

const slides = divisions.map((d) => ({
  image: d.image,
  label: d.title,
  short: d.shortTitle,
  number: d.number,
  path: d.path,
  icon: d.icon,
}))

export default function Hero() {
  const [slide, setSlide] = useState(0)
  const reduce = useReducedMotion()
  const { openQuote } = useUI()

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 6800)
    return () => window.clearInterval(id)
  }, [reduce])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  }
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* Cinematic slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[slide].image}
              alt=""
              className={`h-full w-full object-cover object-center ${reduce ? '' : 'animate-kenburns'}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_20%,rgba(10,10,12,0.55)_100%)]" />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/[0.07] blur-[140px]" />

      {/* Side label */}
      <span className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-heading text-[9px] uppercase tracking-[0.32em] text-cream/35 xl:block">
        {config.strapline}
      </span>

      {/* Main content */}
      <div className="shell relative z-10 flex-1 pb-10 pt-40 sm:pb-14">
        <div className="flex h-full max-w-3xl flex-col justify-center">
          <motion.div variants={container} initial={reduce ? false : 'hidden'} animate="show">
            <motion.div variants={item} className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light sm:text-[11px]">
                A Diversified Business Group · Lagos, Nigeria
              </span>
            </motion.div>

            <motion.h1 variants={item} className="display text-[clamp(2.7rem,6.4vw,5.6rem)] text-balance">
              Building Opportunities.
              <br />
              Connecting Businesses.
              <br />
              <span className="gold-text italic">Creating the Future.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 max-w-xl text-[15px] leading-relaxed text-cream/75 sm:text-[17px] text-pretty">
              Discover a world of professional marine solutions, real estate opportunities, fashion creativity and intelligent AI-powered advertising with CLINTON GLOBAL INVESTMENT.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/services" className="btn-gold group">
                Explore Our Services <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/contact" className="btn-ghost">Contact Our Team</Link>
              <button onClick={() => openQuote()} className="hidden items-center gap-2 px-2 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-gold sm:inline-flex">
                Get a Quote <ArrowRight size={13} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom: scroll cue + division switcher */}
      <div className="relative z-10 border-t border-white/10 bg-ink/45 backdrop-blur-md">
        <div className="shell">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="hidden shrink-0 items-center gap-3 border-r border-white/10 pr-8 lg:flex">
              <a href="#about" className="group flex items-center gap-3" aria-label="Scroll to about section">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold/10">
                  <ArrowDown size={15} className="animate-floaty" />
                </span>
                <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-cream/50">Scroll to explore</span>
              </a>
            </div>

            <div className="grid flex-1 grid-cols-3 divide-x divide-white/10">
              {slides.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => setSlide(i)}
                  onMouseEnter={() => setSlide(i)}
                  className={`group relative flex items-center gap-3 py-5 pl-4 pr-2 text-left transition-colors duration-500 sm:gap-4 sm:px-6 ${slide === i ? 'bg-gold/[0.06]' : 'hover:bg-white/[0.03]'}`}
                  aria-label={`Show ${s.label}`}
                >
                  <span className={`hidden font-display text-lg sm:inline ${slide === i ? 'text-gold' : 'text-cream/30'}`}>{s.number}</span>
                  <span className="min-w-0">
                    <span className={`block truncate font-heading text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors sm:text-[10px] ${slide === i ? 'text-gold' : 'text-cream/60'}`}>
                      {s.short}
                    </span>
                    <span className="mt-0.5 hidden truncate text-[11px] text-mist/70 sm:block">{s.label}</span>
                  </span>
                  <ArrowUpRight size={13} className={`ml-auto hidden shrink-0 transition-all sm:block ${slide === i ? 'text-gold' : 'text-cream/25 group-hover:text-gold'}`} />
                  <span className="absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-[6800ms] ease-linear" style={{ width: slide === i ? '100%' : '0%' }} />
                </button>
              ))}
            </div>

            <div className="hidden shrink-0 items-center gap-2 border-l border-white/10 pl-7 lg:flex">
              {slides.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => setSlide(i)}
                  className={`h-[3px] rounded-full transition-all duration-500 ${slide === i ? 'w-8 bg-gold' : 'w-3 bg-white/20 hover:bg-gold/50'}`}
                  aria-label={`Slide ${i + 1}: ${s.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
