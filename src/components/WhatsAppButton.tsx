import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { whatsappLink } from '../data/site'

export default function WhatsAppButton() {
  const [hover, setHover] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {hover && (
          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 14, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 14, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-1 hidden rounded-sm border border-gold/30 bg-ink-800/95 px-4 py-3 shadow-card backdrop-blur-xl sm:block"
          >
            <span className="block font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Need a quick answer?</span>
            <span className="mt-1 block text-xs text-cream/70">Chat with our team on WhatsApp →</span>
          </motion.a>
        )}
      </AnimatePresence>

      <div className="relative">
        <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full border border-[#25D366]/50" />
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          className="relative grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-ink-900 text-[#25D366] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-110"
          aria-label="Chat with CLINTON GLOBAL INVESTMENT on WhatsApp"
        >
          <MessageCircle size={25} strokeWidth={1.8} />
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="absolute -right-1 -top-1 hidden h-5 w-5 place-items-center rounded-full border border-white/15 bg-ink-700 text-cream/60 hover:text-cream sm:grid"
          aria-label="Hide WhatsApp button"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  )
}
