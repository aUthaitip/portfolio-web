'use client'

import { useLanguage } from './LanguageContext'
import { skillCategories } from '@/data/skills'
import { homeData } from '@/data/home'
import Reveal from './Reveal'

export default function Skills() {
  const { lang } = useLanguage()
  return (
    <section id="skills" className="section-space section-skills" aria-labelledby="skills-title">
      <div className="container-custom">
        <Reveal><div className="section-heading"><h2 id="skills-title">{homeData.skills.title[lang]}</h2><span className="section-heading-rule" aria-hidden="true" /></div></Reveal>
        <div className="skills-list">
          {skillCategories.map(category => <Reveal key={category.title}>
            <div className="skill-row">
              <h3>{category.title}</h3>
              <ul>{category.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            </div>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}
