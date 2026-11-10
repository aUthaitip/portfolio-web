'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../LanguageContext'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return <button type="button" className="back-to-top" aria-label={t('กลับด้านบน', 'Back to top')} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp aria-hidden="true" /></button>
}
