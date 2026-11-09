import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CtaBand from './CtaBand'
import WhatsAppButton from './WhatsAppButton'
import ScrollProgress from './ScrollProgress'
import { useUI } from '../context/UIContext'
import QuoteModal from './QuoteModal'
import SearchOverlay from './SearchOverlay'

const hideCta = ['/contact', '/admin', '/privacy', '/terms']

export default function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const { quoteOpen, searchOpen } = useUI()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [location.pathname, location.hash])

  const showCta = !hideCta.includes(location.pathname) && location.pathname !== '/404'

  return (
    <div className="min-h-screen bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <motion.main
        id="main"
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      {showCta && <CtaBand />}
      <Footer />
      <WhatsAppButton />
      <AnimatePresence>{quoteOpen && <QuoteModal />}</AnimatePresence>
      <AnimatePresence>{searchOpen && <SearchOverlay />}</AnimatePresence>
    </div>
  )
}
