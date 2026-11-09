import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DivisionKey } from '../data/site'

interface QuoteContext {
  division?: DivisionKey
  service?: string
}

interface UIState {
  quoteOpen: boolean
  quoteContext: QuoteContext
  openQuote: (ctx?: QuoteContext) => void
  closeQuote: () => void
  searchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const UIContext = createContext<UIState | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteContext, setQuoteContext] = useState<QuoteContext>({})
  const [searchOpen, setSearchOpen] = useState(false)

  const openQuote = (ctx: QuoteContext = {}) => {
    setSearchOpen(false)
    setQuoteContext(ctx)
    setQuoteOpen(true)
  }
  const closeQuote = () => setQuoteOpen(false)
  const openSearch = () => {
    setQuoteOpen(false)
    setSearchOpen(true)
  }
  const closeSearch = () => setSearchOpen(false)

  // Global keyboard shortcuts: Cmd/Ctrl+K for search, Escape closes overlays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setQuoteOpen(false)
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape') {
        setQuoteOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while an overlay is open.
  useEffect(() => {
    const locked = quoteOpen || searchOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [quoteOpen, searchOpen])

  const value = useMemo(
    () => ({ quoteOpen, quoteContext, openQuote, closeQuote, searchOpen, openSearch, closeSearch }),
    [quoteOpen, quoteContext, searchOpen]
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside UIProvider')
  return ctx
}
