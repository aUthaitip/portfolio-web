'use client'

import { useLanguage } from '../LanguageContext'
import { usePathname } from 'next/navigation'
import { homeData } from '@/data/home'
import { aboutData } from '@/data/about'
import { projectsData } from '@/data/projects'

export default function Footer({ profileName }: { profileName?: any }) {
  const { lang } = useLanguage()
  const pathname = usePathname()

  const getPageData = () => {
    if (pathname?.includes('/about')) return aboutData
    if (pathname?.includes('/projects')) return projectsData
    return homeData
  }

  const pageData = getPageData()
  const name = typeof profileName === 'object' 
    ? (profileName?.[lang] || profileName?.en || profileName?.th || 'AUTHAITIP SAENSRI')
    : (profileName || 'AUTHAITIP SAENSRI')

  return (
    <footer className="text-center py-12 bg-background border-t border-border text-muted-foreground text-sm">
      <div className="font-heading font-bold text-xl mb-4 text-primary">Portfolio.</div>
      © {new Date().getFullYear()} {name}. {pageData.footer.allRightsReserved[lang]}
    </footer>
  )
}
