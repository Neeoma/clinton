import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Search, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { useUI } from '../context/UIContext'
import { config, divisions, navLinks, whatsappLink } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { openQuote, openSearch } = useUI()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobile(false)
    setDropdown(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobile
            ? 'border-b border-white/[0.07] bg-ink/95 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent py-5'
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative flex items-center gap-1.5 px-4 py-3 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                        isActive || location.pathname.startsWith('/services/') ? 'text-gold' : 'text-cream/75 hover:text-gold'
                      }`
                    }
                    aria-expanded={dropdown}
                  >
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${dropdown ? 'rotate-180' : ''}`} />
                  </NavLink>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full w-[355px] pt-3"
                      >
                        <div className="overflow-hidden rounded-sm border border-white/10 bg-ink-800/98 p-2 shadow-card backdrop-blur-xl">
                          {divisions.map((d) => (
                            <Link
                              key={d.key}
                              to={d.path}
                              className="group flex items-start gap-3 rounded-sm px-3 py-3 transition-colors hover:bg-white/[0.05]"
                            >
                              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-gold/25 text-gold">
                                <d.icon size={15} />
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 font-heading text-[12px] font-semibold text-cream group-hover:text-gold">
                                  {d.number} · {d.title}
                                </span>
                                <span className="mt-1 block text-xs leading-snug text-mist/80">{d.tagline}</span>
                              </span>
                            </Link>
                          ))}
                          <Link
                            to="/services"
                            className="mt-1 flex items-center justify-between border-t border-white/[0.07] px-3 py-3 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                          >
                            View all services <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-3 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:bottom-1 after:left-4 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] ${
                      isActive ? 'text-gold after:w-[calc(100%-2rem)]' : 'text-cream/75 hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openSearch}
              className="grid h-10 w-10 place-items-center rounded-sm border border-white/10 text-cream/80 transition-all hover:border-gold/60 hover:text-gold"
              aria-label="Search the website (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <Search size={16} />
            </button>
            <button onClick={() => openQuote()} className="btn-gold hidden !px-5 !py-3 md:inline-flex">
              Get a Quote
            </button>
            <button
              onClick={() => setMobile((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-sm border border-white/10 text-cream lg:hidden"
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              aria-expanded={mobile}
            >
              {mobile ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-12 pt-28 lg:hidden"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative mx-auto max-w-lg">
              <p className="eyebrow eyebrow-line mb-7">Navigation</p>
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.055 }}
                    className="border-b border-white/[0.08]"
                  >
                    <Link to={link.to} className="flex items-center justify-between py-4 font-display text-3xl text-cream">
                      {link.label} <ArrowUpRight size={18} className="text-gold/70" />
                    </Link>
                    {link.hasDropdown && (
                      <div className="mb-4 flex flex-col gap-1">
                        {divisions.map((d) => (
                          <Link key={d.key} to={d.path} className="flex items-center gap-2 py-1.5 text-sm text-mist hover:text-gold">
                            <span className="font-heading text-[10px] text-gold">{d.number}</span> {d.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <button onClick={() => { setMobile(false); openQuote() }} className="btn-gold mt-9 w-full">
                Get a Quote
              </button>
              <div className="mt-8 flex flex-col gap-3 text-sm text-mist">
                <a href={config.phoneHref} className="flex items-center gap-3 hover:text-gold"><Phone size={15} className="text-gold" /> {config.phoneDisplay}</a>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold"><MessageCircle size={15} className="text-gold" /> Chat on WhatsApp</a>
              </div>
              <p className="mt-10 font-heading text-[10px] uppercase tracking-[0.25em] text-cream/30">{config.strapline}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
