import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Expand } from 'lucide-react'
import { Link } from 'react-router-dom'
import AiVisual from './AiVisual'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import { projectCategories, projects, type DivisionKey, type Project } from '../data/site'

interface Props {
  limit?: number
  showFilters?: boolean
  showDisclaimer?: boolean
}

export default function ProjectsGallery({ limit, showFilters = false, showDisclaimer = false }: Props) {
  const [filter, setFilter] = useState<'all' | DivisionKey>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = useMemo(() => {
    const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const open = (project: Project) => {
    const idx = visible.findIndex((p) => p.id === project.id)
    setLightbox(idx >= 0 ? idx : 0)
  }

  return (
    <>
      {showFilters && (
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`rounded-sm border px-5 py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === cat.key
                    ? 'border-gold bg-gold-gradient text-ink'
                    : 'border-white/[0.12] text-mist hover:border-gold/60 hover:text-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto hidden font-heading text-[10px] uppercase tracking-[0.18em] text-mist/60 sm:block">
              {visible.length} {visible.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </Reveal>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.button
              layout
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => open(project)}
              className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-ink-800 text-left transition-colors duration-500 hover:border-gold/45"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                ) : (
                  <AiVisual className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
                <span className="absolute left-4 top-4 rounded-sm border border-gold/45 bg-ink/60 px-3 py-1.5 font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
                  {project.categoryLabel}
                </span>
                <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-sm border border-white/25 bg-ink/50 text-cream opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                  <Expand size={15} />
                </span>
                <span className="absolute bottom-4 left-4 font-display text-3xl text-cream/25">0{i + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-cream transition-colors group-hover:text-gold-light">{project.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-mist/85">{project.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="font-heading text-[9px] uppercase tracking-[0.16em] text-mist/60">{project.tags.join(' · ')}</span>
                  <ArrowUpRight size={15} className="text-gold/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {!showFilters && (
        <Reveal className="mt-12 text-center">
          <Link to="/projects" className="btn-outline">View All Projects <ArrowUpRight size={15} /></Link>
        </Reveal>
      )}

      {showDisclaimer && (
        <Reveal>
          <p className="mt-10 border-l-2 border-gold/40 pl-5 text-xs leading-relaxed text-mist/70">
            <span className="font-heading font-semibold uppercase tracking-[0.14em] text-gold/90">Please note:</span> The imagery on this page is illustrative of the work each division delivers. Verified photographs of completed projects and authorised property listings will be published here once supplied.
          </p>
        </Reveal>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            projects={visible}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        )}
      </AnimatePresence>
    </>
  )
}
