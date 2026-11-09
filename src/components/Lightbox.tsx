import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AiVisual from './AiVisual'
import type { Project } from '../data/site'
import { divisions } from '../data/site'

interface Props {
  projects: Project[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ projects, index, onClose, onNavigate }: Props) {
  const project = projects[index]
  const division = divisions.find((d) => d.key === project.category)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % projects.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + projects.length) % projects.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, projects.length, onClose, onNavigate])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/92 backdrop-blur-lg" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-sm border border-gold/25 bg-ink-800 shadow-card lg:grid-cols-[1.35fr_1fr]"
      >
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px]">
          {project.image ? (
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <AiVisual className="h-full w-full" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-sm border border-gold/50 bg-ink/70 px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
            {project.categoryLabel}
          </span>
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-9">
          <div>
            <p className="eyebrow eyebrow-line">Selected Work · {String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-5 font-display text-3xl leading-tight text-cream">{project.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-mist">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-white/10 px-3 py-1.5 font-heading text-[10px] uppercase tracking-[0.14em] text-cream/70">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <div className="hairline mb-6" />
            {division && (
              <Link to={division.path} className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-gold hover:text-gold-light">
                Explore {division.shortTitle} <ArrowUpRight size={14} />
              </Link>
            )}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-mist/60">{index + 1} / {projects.length}</span>
              <div className="flex gap-2">
                <button onClick={() => onNavigate((index - 1 + projects.length) % projects.length)} className="grid h-9 w-9 place-items-center border border-white/15 text-cream hover:border-gold/60 hover:text-gold" aria-label="Previous project"><ChevronLeft size={16} /></button>
                <button onClick={() => onNavigate((index + 1) % projects.length)} className="grid h-9 w-9 place-items-center border border-white/15 text-cream hover:border-gold/60 hover:text-gold" aria-label="Next project"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sm border border-white/15 bg-ink/80 text-cream hover:border-gold/60 hover:text-gold" aria-label="Close project viewer">
          <X size={16} />
        </button>
      </motion.div>
    </div>
  )
}
