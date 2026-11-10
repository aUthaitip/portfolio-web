'use client'

import { useLanguage } from './LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { homeData } from '@/data/home'
import { localized, type Experience } from '@/lib/portfolio'
import Reveal from './Reveal'

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const { lang } = useLanguage()
  if (!experiences?.length) return null
  const formatDate = (value?: string) => value ? new Date(value).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : ''

  return (
    <section id="experience" className="section-space" aria-labelledby="experience-title">
      <div className="container-custom">
        <Reveal><div className="section-heading"><h2 id="experience-title">{homeData.experience.title[lang]}</h2><span className="section-heading-rule" aria-hidden="true" /></div></Reveal>
        <div className="experience-list">
          {experiences.map(exp => {
            const company = localized(exp.company, lang)
            const description = localized(exp.description, lang).split('\n').map(line => line.trim()).filter(Boolean)
            return (
              <Reveal key={exp._id}>
                <article className="experience-entry">
                  <div className="experience-date">
                    <p>{formatDate(exp.startDate)}<span aria-hidden="true"> — </span>{exp.endDate ? formatDate(exp.endDate) : exp.isCurrent ? homeData.experience.present[lang] : ''}</p>
                    {!!exp.durationMonths && <p className="experience-duration">{exp.durationMonths} {lang === 'th' ? 'เดือน' : exp.durationMonths === 1 ? 'month' : 'months'}</p>}
                  </div>
                  <div className="experience-identity">
                    {exp.companyLogo && <div className="company-logo"><Image src={urlFor(exp.companyLogo).width(120).url()} alt="" fill sizes="40px" className="object-contain" /></div>}
                    <h3>{localized(exp.jobTitle, lang)}</h3>
                    <p className="company-name">{company}</p>
                    {exp.companyImage && <div className="experience-image"><Image src={urlFor(exp.companyImage).width(640).auto('format').url()} alt={company} fill sizes="(max-width: 767px) 80vw, 280px" className="object-contain" /></div>}
                  </div>
                  <ul className="experience-description">{description.map((line, index) => <li key={index}>{line.replace(/^[-•]\s*/, '')}</li>)}</ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
