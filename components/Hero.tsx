'use client'

import { useLanguage } from './LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { homeData } from '@/data/home'
import { resumeProfile } from '@/data/resume'
import { localized, localizedHref, type Profile } from '@/lib/portfolio'

export default function Hero({ profile }: { profile: Profile | null }) {
  const { lang } = useLanguage()
  const name = localized(profile?.name, lang) || homeData.hero.defaultName[lang]
  const bio = resumeProfile.shortBio[lang]
  const headline = resumeProfile.headline[lang]
  const email = profile?.email || 'Authaitip.131047@gmail.com'
  const nameParts = name.split(/\s+/)

  return (
    <section id="about" className="hero" aria-labelledby="hero-title">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <p className="hero-greeting hero-enter">{homeData.hero.greeting[lang]}</p>
          <h1 id="hero-title" className="hero-name hero-enter" data-language={lang}>
            {nameParts.map((part, index) => <span key={`${part}-${index}`}>{part}{index < nameParts.length - 1 ? ' ' : ''}</span>)}
          </h1>
          <p className="hero-role hero-enter">{headline}</p>
          <p className="hero-bio hero-enter">{bio}</p>
          <div className="hero-actions hero-enter">
            <Link href={localizedHref('/projects', lang)} className={cn(buttonVariants({ variant: 'accent', size: 'lg' }), 'hero-primary')}>
              {homeData.hero.viewProjects[lang]}<ArrowDownRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a href={`mailto:${email}`} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              {homeData.hero.contactMe[lang]}<ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-social hero-enter">
            <a href={profile?.githubUrl || 'https://github.com/aUthaitip'} target="_blank" rel="noopener noreferrer" className="text-link">GitHub<ArrowUpRight aria-hidden="true" /></a>
            <a href={`mailto:${email}`} className="text-link"><Mail aria-hidden="true" /><span>{email}</span></a>
          </div>
        </div>
        <div className="hero-portrait hero-enter">
          <div className="portrait-mat"><Image
            src={profile?.profileImage ? urlFor(profile.profileImage).width(800).auto('format').url() : '/Ice.png'}
            alt={name}
            fill
            sizes="(max-width: 767px) 78vw, (max-width: 1100px) 34vw, 400px"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          /></div>
        </div>
      </div>
    </section>
  )
}
