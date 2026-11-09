import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { Faq } from '../data/site'

export default function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`font-heading text-[13px] font-semibold tracking-wide transition-colors sm:text-sm ${isOpen ? 'text-gold' : 'text-cream/90'}`}>
                <span className="mr-4 font-display text-sm text-gold/60">0{i + 1}</span>
                {item.q}
              </span>
              <span className={`grid h-7 w-7 shrink-0 place-items-center border transition-colors ${isOpen ? 'border-gold/60 text-gold' : 'border-white/15 text-mist'}`}>
                {isOpen ? <Minus size={13} /> : <Plus size={13} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pl-0 text-sm leading-relaxed text-mist sm:pl-10">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
