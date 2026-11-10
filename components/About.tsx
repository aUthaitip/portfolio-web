'use client'

import { useLanguage } from './LanguageContext'
import { usePathname } from 'next/navigation'
import { aboutData } from '@/data/about'
import { skillCategories } from '@/data/skills'
import { education, resumeProfile } from '@/data/resume'
import { experienceMonths, localized, type Profile, type Project, type Experience } from '@/lib/portfolio'
import Reveal from './Reveal'

export default function About({ profile, projects = [], experiences = [] }: { profile?: Profile | null; projects?: Project[]; experiences?: Experience[] }) {
  const { lang } = useLanguage()
  const pathname = usePathname()
  const isAboutPage = pathname?.includes('/about')
  const bio = isAboutPage ? `${resumeProfile.shortBio[lang]}\n\n${resumeProfile.fullBio[lang]}` : resumeProfile.fullBio[lang]
  const educationData = { ...education, ...profile?.education }
  const techCount = new Set(skillCategories.flatMap(category => category.skills)).size
  const internshipCount = experiences.filter(exp => localized(exp.jobTitle, 'en').toLowerCase().includes('intern')).length
  const months = experiences.reduce((total, exp) => total + experienceMonths(exp), 0)
  const stats = [
    { value: projects.length, label: aboutData.about.stats.projects[lang] },
    { value: techCount, label: aboutData.about.stats.technologies[lang] },
    { value: internshipCount, label: aboutData.about.stats.internships[lang] },
    { value: months, label: aboutData.about.stats.experience[lang] },
  ]

  return (
    <section id="about-section" className="section-about section-space" aria-labelledby="about-title">
      <div className="container-custom">
        <Reveal><div className="section-heading"><h2 id="about-title">{aboutData.about.title[lang]}</h2><span className="section-heading-rule" aria-hidden="true" /></div></Reveal>
        <div className="about-grid">
          <Reveal>
            <div className="about-bio">{bio.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <div className="education-block">
              <h3>{education.title[lang]}</h3>
              <p>{localized(educationData.degree, lang)}</p>
              <p className="muted">{localized(educationData.university, lang)} · {educationData.period}</p>
              <p>GPA {education.gpa}</p>
            </div>
          </Reveal>
          <Reveal><dl className="about-stats">{stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl></Reveal>
        </div>
      </div>
    </section>
  )
}
