'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Language = 'th' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (th: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Determine initial language from URL path, default to 'th'
  const initialLang: Language = pathname?.startsWith('/en') ? 'en' : 'th'
  const [lang, setLang] = useState<Language>(initialLang)

  // Sync state if pathname changes (e.g. user uses back/forward browser buttons)
  useEffect(() => {
    if (pathname?.startsWith('/en')) {
      setLang('en')
    } else {
      setLang('th') // Default language
    }
  }, [pathname])

  const toggleLang = () => {
    const newLang = lang === 'th' ? 'en' : 'th'
    setLang(newLang)
    
    // Update the URL to reflect the new language
    if (!pathname) return
    
    let newPathname = pathname
    if (newLang === 'en') {
      if (pathname === '/') newPathname = '/en'
      else if (pathname.startsWith('/th')) newPathname = pathname.replace(/^\/th/, '/en')
      else if (!pathname.startsWith('/en')) newPathname = `/en${pathname}`
    } else {
      // For 'th', we can explicitly use /th or just remove /en
      if (pathname === '/') newPathname = '/th'
      else if (pathname.startsWith('/en')) newPathname = pathname.replace(/^\/en/, '/th')
      else if (!pathname.startsWith('/th')) newPathname = `/th${pathname}`
    }
    
    router.push(newPathname)
  }

  const t = (th: string, en: string) => (lang === 'th' ? th : en)

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
