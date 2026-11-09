import { Link } from 'react-router-dom'
import { ArrowUpRight, Search } from 'lucide-react'
import Reveal from '../components/Reveal'
import { useUI } from '../context/UIContext'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFound() {
  const { openSearch } = useUI()
  usePageMeta('Page Not Found', 'The page you were looking for could not be found.')

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[130px]" />
      <div className="shell relative z-10 text-center">
        <Reveal>
          <p className="font-display text-[clamp(7rem,20vw,14rem)] leading-none text-gold/20">404</p>
          <h1 className="display -mt-8 text-[clamp(2rem,5vw,3.5rem)] sm:-mt-14">This Page Has Drifted Off Course.</h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-mist">The page you were looking for isn&apos;t here. Let&apos;s get you back to something useful.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-gold">Back to Home <ArrowUpRight size={15} /></Link>
            <button onClick={openSearch} className="btn-ghost"><Search size={14} /> Search the Site</button>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
