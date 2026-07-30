'use client'

import { useLanguage } from '../LanguageContext'

export default function Footer({ profileName }: { profileName?: any }) {
  const { t, lang } = useLanguage()
  const name = typeof profileName === 'object' 
    ? (profileName?.[lang] || profileName?.en || profileName?.th || 'AUTHAITIP SAENSRI')
    : (profileName || 'AUTHAITIP SAENSRI')

  return (
    <footer className="text-center py-12 bg-background border-t border-border text-muted-foreground text-sm">
      <div className="font-heading font-bold text-xl mb-4 text-primary">Portfolio.</div>
      © {new Date().getFullYear()} {name}. {t('สงวนลิขสิทธิ์', 'All rights reserved.')}
    </footer>
  )
}
