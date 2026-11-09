import { useEffect } from 'react'

/** Keeps document title + description in sync for client-side routes (basic SPA SEO). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | CLINTON GLOBAL INVESTMENT`
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
