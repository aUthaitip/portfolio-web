'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '../LanguageContext'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { homeData } from '@/data/home'
import { localizedHref } from '@/lib/portfolio'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)
  const changeLanguage = () => { toggleLang(); closeMenu() }
  const links = [
    { href: '/about', label: homeData.navbar.about[lang] },
    { href: '/#experience', label: homeData.navbar.experience[lang] },
    { href: '/projects', label: homeData.navbar.projects[lang] },
    { href: '/#skills', label: homeData.navbar.skills[lang] },
    { href: '/#contact', label: homeData.navbar.contact[lang] },
  ]
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const onChange = (event: MediaQueryListEvent) => { if (event.matches) setIsOpen(false) }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])
  const isActive = (href: string) => !href.includes('#') && pathname?.replace(/^\/(en|th)(?=\/|$)/, '').startsWith(href)
  const languageControl = <button type="button" onClick={changeLanguage} className="language-toggle" aria-label={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}><span className={lang === 'en' ? 'is-current' : ''}>EN</span><span className="language-divider" aria-hidden="true">/</span><span className={lang === 'th' ? 'is-current' : ''}>TH</span></button>

  return (
    <header className="site-header">
      <nav className="container-custom nav-shell" aria-label={t('เมนูหลัก', 'Main navigation')}>
        <Link href={localizedHref('/', lang)} onClick={closeMenu} className="wordmark">Portfolio<span>.</span></Link>
        <div className="nav-desktop">{links.map(link => <Link href={localizedHref(link.href, lang)} key={link.href} className="nav-link" aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}</div>
        <div className="nav-controls">
          {languageControl}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<button type="button" className="menu-toggle" aria-label={t('เปิดเมนู', 'Open menu')} />}><Menu aria-hidden="true" /></SheetTrigger>
            <SheetContent side="right" showCloseButton={false} className="mobile-menu-sheet">
              <SheetHeader>
                <SheetTitle className="sr-only">{t('เมนูหลัก', 'Main navigation')}</SheetTitle>
                <Link href={localizedHref('/', lang)} onClick={closeMenu} className="wordmark">Portfolio<span>.</span></Link>
                <SheetClose render={<button type="button" className="drawer-close" aria-label={t('ปิดเมนู', 'Close menu')} />}><X aria-hidden="true" /></SheetClose>
              </SheetHeader>
              <nav id="mobile-navigation" className="mobile-menu-links" aria-label={t('เมนูมือถือ', 'Mobile navigation')}>{links.map(link => <Link href={localizedHref(link.href, lang)} key={link.href} className="nav-link" onClick={closeMenu} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}</nav>
              <SheetFooter>{languageControl}</SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
