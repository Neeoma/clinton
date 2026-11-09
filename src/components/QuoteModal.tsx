import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import InquiryForm from './InquiryForm'
import { useUI } from '../context/UIContext'
import { whatsappLink } from '../data/site'

export default function QuoteModal() {
  const { closeQuote, quoteContext } = useUI()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLInputElement>('input')?.focus(), 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={closeQuote}
      />
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-sm border border-gold/25 bg-ink-800 shadow-card"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex items-start justify-between gap-6 border-b border-white/[0.07] px-6 py-6 sm:px-9">
          <div>
            <p className="eyebrow eyebrow-line">Start a Conversation</p>
            <h2 id="quote-title" className="mt-3 font-display text-3xl text-cream sm:text-4xl">Request a Quote</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              Share a few details and our team will come back to you with the right next step.
            </p>
          </div>
          <button onClick={closeQuote} className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-white/10 text-mist transition-colors hover:border-gold/60 hover:text-gold" aria-label="Close quote form">
            <X size={17} />
          </button>
        </div>
        <div className="px-6 py-7 sm:px-9">
          <InquiryForm
            source="Quote modal"
            lockedDivision={quoteContext.division}
            defaultService={quoteContext.service}
            compact
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-6 py-4 sm:px-9">
          <p className="text-[11px] text-mist/60">Prefer to talk? We&apos;re one message away.</p>
          <a href={whatsappLink('Hello, I would like to request a quote.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-gold hover:text-gold-light">
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}
