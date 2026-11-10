'use client'

import { useLanguage } from '../LanguageContext'
import { homeData } from '@/data/home'
import { localized, localizedHref, type LocalizedText } from '@/lib/portfolio'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer({ profileName }: { profileName?: LocalizedText }) {
  const { lang } = useLanguage()
  const name = localized(profileName, lang) || 'AUTHAITIP SAENSRI'
  return (
    <footer className="site-footer">
      <div className="container-custom footer-inner">
        <Link href={localizedHref('/', lang)} className="wordmark">Portfolio<span>.</span></Link>
        <p>© {new Date().getFullYear()} {name}. {homeData.footer.allRightsReserved[lang]}</p>
        <Link href={localizedHref('/#contact', lang)} className="text-link">{homeData.navbar.contact[lang]}<ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </footer>
  )
}
