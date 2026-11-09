import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import ProjectsGallery from '../components/ProjectsGallery'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../lib/usePageMeta'
import { whatsappLink } from '../data/site'

export default function Projects() {
  usePageMeta('Our Projects', 'Explore selected work and capabilities across marine outboard services, real estate management, and fashion & AI advertising at CLINTON GLOBAL INVESTMENT.')

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title={<>Work That Speaks <span className="gold-text italic">For Itself.</span></>}
        description="A portfolio view across our three divisions — engines and spare parts, property and interiors, fashion design and AI-driven creative campaigns."
        image="/images/hero-realestate.jpg"
        breadcrumb={[{ label: 'Our Projects' }]}
      >
        <Link to="/contact" className="btn-gold">Start a Project <ArrowUpRight size={15} /></Link>
      </PageHero>

      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative z-10">
          <div className="mb-12 flex flex-col gap-6 border-b border-white/[0.08] pb-10 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow eyebrow-line">Portfolio &amp; Capabilities</p>
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3.2rem)]">Explore By Division</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist">Filter the gallery to see the kind of work each division delivers. Select any item for a closer look.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <a href={whatsappLink('Hello, I would like to ask about your projects.')} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle size={15} /> Ask About Our Work</a>
            </Reveal>
          </div>
          <ProjectsGallery showFilters showDisclaimer />
        </div>
      </section>
    </>
  )
}
