import { Link } from 'react-router-dom'
import { config } from '../data/site'

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3.5" aria-label={`${config.company} — home`}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <span className="absolute inset-0 rotate-45 border border-gold/70 transition-transform duration-700 group-hover:rotate-[135deg]" />
        <span className="absolute inset-[6px] rotate-45 border border-gold/25 transition-transform duration-700 group-hover:-rotate-[135deg]" />
        <span className="relative font-display text-xl font-semibold text-gold-light">C</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-[13px] font-bold tracking-[0.16em] text-cream sm:text-[14px]">
            CLINTON GLOBAL
          </span>
          <span className="mt-[5px] flex items-center gap-2">
            <span className="h-px w-4 bg-gold/70" />
            <span className="font-heading text-[10px] font-medium tracking-[0.34em] text-gold">
              INVESTMENT
            </span>
          </span>
        </span>
      )}
    </Link>
  )
}
