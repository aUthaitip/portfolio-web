'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Language } from '@/lib/portfolio'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (th: string, en: string) => string
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const lang: Language = /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'th'

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const toggleLang = () => {
    const nextLang = lang === 'th' ? 'en' : 'th'
    const path = pathname.replace(/^\/(en|th)(?=\/|$)/, '') || '/'
    router.push(`/${nextLang}${path === '/' ? '' : path}${window.location.search}${window.location.hash}`, { scroll: false })
  }
  return <LanguageContext.Provider value={{ lang, toggleLang, t: (th, en) => lang === 'th' ? th : en }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
