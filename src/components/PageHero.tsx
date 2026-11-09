import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { config } from '../data/site'

interface Props {
  eyebrow: string
  title: React.ReactNode
  description: string
  image?: string
  breadcrumb?: { label: string; to?: string }[]
  children?: React.ReactNode
}

export default function PageHero({ eyebrow, title, description, image, breadcrumb = [], children }: Props) {
  const reduce = useReducedMotion()
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink-800 pb-16 pt-40 sm:min-h-[68vh] sm:pb-20">
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-radial-gold" />
          <div className="bg-grid absolute inset-0 opacity-70" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />

      <div className="shell relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 flex flex-wrap items-center gap-2 font-heading text-[10px] uppercase tracking-[0.2em] text-mist/80">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight size={11} className="text-gold/70" />
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-gold">{crumb.label}</Link>
                ) : (
                  <span className="text-gold">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
          <p className="eyebrow eyebrow-line">{eyebrow}</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] text-balance">{title}</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-cream/70 sm:text-[17px]">{description}</p>
          {children && <div className="mt-9">{children}</div>}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px divider-gold" />
      <span className="pointer-events-none absolute bottom-8 right-8 hidden font-heading text-[10px] uppercase tracking-[0.3em] text-cream/25 lg:block">
        {config.strapline}
      </span>
    </section>
  )
}
