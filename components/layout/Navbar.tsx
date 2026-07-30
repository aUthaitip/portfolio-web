'use client'

import { useState } from 'react'
import { useLanguage } from '../LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  const navLinks = [
    { href: '/about', label: t('เกี่ยวกับ', 'About') },
    { href: '/#experience', label: t('ประสบการณ์', 'Experience') },
    { href: '/projects', label: t('ผลงาน', 'Projects') },
    { href: '/#skills', label: t('ทักษะ', 'Skills') },
    { href: '/#contact', label: t('ติดต่อ', 'Contact') },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-primary border-b border-border transition-colors duration-300 shadow-sm"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" onClick={closeMenu} className="shrink-0 font-heading font-extrabold text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity">
            Portfolio<span className="text-accent">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 text-sm font-semibold text-white">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="font-semibold text-sm hover:text-amber-100 transition-colors w-8 text-center text-white"
            >
              {lang === 'th' ? 'EN' : 'TH'}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-muted-foreground hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
