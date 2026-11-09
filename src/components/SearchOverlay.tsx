import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search, X, ArrowUpRight, Home, Info, Layers, FolderOpen, Mail, CornerDownLeft,
  LayoutDashboard, Anchor, Building2, Sparkles, Wrench, type LucideIcon,
} from 'lucide-react'
import { useUI } from '../context/UIContext'
import { divisions, projects } from '../data/site'

interface SearchItem {
  id: string
  title: string
  subtitle: string
  group: string
  to: string
  icon: LucideIcon
  keywords: string
}

const groupIcons: Record<string, LucideIcon> = {
  'Marine': Anchor,
  'Real Estate': Building2,
  'Fashion & AI': Sparkles,
  'Services': Wrench,
}

const staticItems: SearchItem[] = [
  { id: 'home', title: 'Home', subtitle: 'Start here', group: 'Pages', to: '/', icon: Home, keywords: 'home landing company start' },
  { id: 'about', title: 'About Us', subtitle: 'Our story, vision and mission', group: 'Pages', to: '/about', icon: Info, keywords: 'about story vision mission values company' },
  { id: 'services', title: 'Our Services', subtitle: 'All three business divisions', group: 'Pages', to: '/services', icon: Layers, keywords: 'services divisions offerings' },
  { id: 'projects', title: 'Our Projects', subtitle: 'Portfolio and selected work', group: 'Pages', to: '/projects', icon: FolderOpen, keywords: 'projects portfolio gallery work' },
  { id: 'contact', title: 'Contact Us', subtitle: 'Inquiries, address and map', group: 'Pages', to: '/contact', icon: Mail, keywords: 'contact email phone address inquiry whatsapp' },
  { id: 'admin', title: 'Inquiry Dashboard', subtitle: 'View submitted inquiries', group: 'Pages', to: '/admin', icon: LayoutDashboard, keywords: 'admin dashboard leads inquiries' },
  ...divisions.flatMap<SearchItem>((d) => [
    {
      id: `division-${d.key}`,
      title: d.title,
      subtitle: d.tagline,
      group: 'Divisions',
      to: d.path,
      icon: d.icon,
      keywords: `${d.title} ${d.shortTitle} division ${d.services.map((s) => s.title).join(' ')}`,
    },
    ...d.services.map<SearchItem>((s) => ({
      id: `service-${d.key}-${s.title}`,
      title: s.title,
      subtitle: `${d.shortTitle} · ${s.description}`,
      group: 'Services',
      to: d.path,
      icon: groupIcons[d.shortTitle] ?? Wrench,
      keywords: `${s.title} ${d.title} ${s.description}`,
    })),
  ]),
  ...projects.map<SearchItem>((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    subtitle: `${p.categoryLabel} · ${p.description}`,
    group: 'Projects',
    to: '/projects',
    icon: FolderOpen,
    keywords: `${p.title} ${p.categoryLabel} ${p.tags.join(' ')} ${p.description}`,
  })),
]

export default function SearchOverlay() {
  const { closeSearch } = useUI()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 100)
    return () => window.clearTimeout(t)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return staticItems.filter((i) => i.group === 'Pages' || i.group === 'Divisions').slice(0, 9)
    return staticItems
      .filter((i) => `${i.title} ${i.subtitle} ${i.keywords} ${i.group}`.toLowerCase().includes(q))
      .slice(0, 12)
  }, [query])

  useEffect(() => setActive(0), [query])

  const go = (item: SearchItem) => {
    navigate(item.to)
    closeSearch()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((v) => Math.min(v + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((v) => Math.max(v - 1, 0))
      } else if (e.key === 'Enter' && results[active]) {
        e.preventDefault()
        go(results[active])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [results, active])

  const groups = useMemo(() => {
    const map = new Map<string, SearchItem[]>()
    results.forEach((item) => map.set(item.group, [...(map.get(item.group) ?? []), item]))
    return Array.from(map.entries())
  }, [results])

  let runningIndex = -1

  return (
    <div className="fixed inset-0 z-[75] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]" role="dialog" aria-modal="true" aria-label="Search website">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={closeSearch} />
      <motion.div
        initial={{ opacity: 0, y: -18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-sm border border-gold/25 bg-ink-800 shadow-card"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <Search size={19} className="shrink-0 text-gold" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, divisions, projects..."
            className="w-full bg-transparent text-[15px] text-cream placeholder:text-mist/50 focus:outline-none"
            aria-label="Search query"
          />
          <button onClick={closeSearch} className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-white/10 text-mist hover:border-gold/60 hover:text-gold" aria-label="Close search">
            <X size={15} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="font-display text-xl text-cream">No results for “{query}”</p>
              <p className="mt-2 text-sm text-mist">Try a division name such as “marine”, “property” or “AI”.</p>
            </div>
          ) : (
            groups.map(([group, items]) => (
              <div key={group} className="mb-1">
                <p className="px-4 pb-1 pt-3 font-heading text-[9px] font-bold uppercase tracking-[0.22em] text-gold/70">{group}</p>
                {items.map((item) => {
                  runningIndex += 1
                  const index = runningIndex
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => go(item)}
                      className={`flex w-full items-center gap-3 rounded-sm px-4 py-2.5 text-left transition-colors ${active === index ? 'bg-gold/10' : 'hover:bg-white/[0.04]'}`}
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center border ${active === index ? 'border-gold/60 text-gold' : 'border-white/10 text-mist'}`}>
                        <item.icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm font-medium ${active === index ? 'text-gold' : 'text-cream'}`}>{item.title}</span>
                        <span className="block truncate text-xs text-mist/70">{item.subtitle}</span>
                      </span>
                      {active === index ? <CornerDownLeft size={13} className="shrink-0 text-gold" /> : <ArrowUpRight size={13} className="shrink-0 text-mist/40" />}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] px-5 py-3 text-[10px] text-mist/60">
          <span className="hidden sm:inline">Search across all three divisions</span>
          <span className="flex items-center gap-3">
            <kbd className="rounded border border-white/10 px-1.5 py-0.5">↑</kbd>
            <kbd className="rounded border border-white/10 px-1.5 py-0.5">↓</kbd> to navigate
            <kbd className="rounded border border-white/10 px-1.5 py-0.5">↵</kbd> to open
            <kbd className="rounded border border-white/10 px-1.5 py-0.5">esc</kbd> to close
          </span>
        </div>
      </motion.div>
    </div>
  )
}
