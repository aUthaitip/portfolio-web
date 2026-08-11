'use client'

import { useLanguage } from './LanguageContext'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Code2, FolderKanban, Briefcase, Calendar } from 'lucide-react'

import { aboutData } from '@/data/about'
import { skillCategories } from '@/data/skills'

export default function About({ profile, projects, experiences }: { profile?: any; projects?: any[]; experiences?: any[] }) {
  const { lang } = useLanguage()
  const pathname = usePathname()
  const isAboutPage = pathname?.includes('/about')

  const shortBio = typeof profile?.shortBio === 'object' ? (profile?.shortBio?.[lang] || profile?.shortBio?.en || profile?.shortBio?.th) : profile?.shortBio || ''
  const fullBio = typeof profile?.fullBio === 'object' ? (profile?.fullBio?.[lang] || profile?.fullBio?.en || profile?.fullBio?.th) : profile?.fullBio || ''
  const bio = isAboutPage ? fullBio : shortBio

  // Calculate dynamic stats
  const projectsCount = projects && projects.length > 0 ? projects.length : 10
  
  // Calculate unique tech stacks from the skills list
  const uniqueTechs = new Set<string>()
  
  if (skillCategories) {
    skillCategories.forEach(cat => {
      if (cat.skills) {
        cat.skills.forEach((skill: string) => uniqueTechs.add(skill.trim()))
      }
    })
  }
  const techCount = uniqueTechs.size

  // Calculate internship count and months/years of experience
  const internshipsCount = experiences ? experiences.filter(exp => {
    const title = typeof exp.jobTitle === 'object' ? (exp.jobTitle?.en || exp.jobTitle?.th || '') : exp.jobTitle || ''
    return title.toLowerCase().includes('intern')
  }).length : 1

  // Calculate total months of experience from start/end dates
  let totalMonths = 0
  if (experiences && experiences.length > 0) {
    experiences.forEach(exp => {
      if (exp.startDate) {
        const start = new Date(exp.startDate)
        const end = exp.isCurrent || !exp.endDate ? new Date() : new Date(exp.endDate)
        const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        totalMonths += Math.max(1, diffMonths) // count at least 1 month per job
      }
    })
  }

  // Format experience value (e.g. "1.5 Yrs" or "6 Mos")
  let experienceValue = '6+ Mos'
  if (totalMonths > 0) {
    if (totalMonths >= 12) {
      const years = (totalMonths / 12).toFixed(1)
      experienceValue = `${parseFloat(years)} Yrs`
    } else {
      experienceValue = `${totalMonths} Mos`
    }
  }

  const stats = [
    {
      icon: <FolderKanban className="w-6 h-6 text-primary" />,
      value: `${projectsCount}+`,
      label: aboutData.about.stats.projects[lang],
    },
    {
      icon: <Code2 className="w-6 h-6 text-primary" />,
      value: `${techCount}+`,
      label: aboutData.about.stats.technologies[lang],
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      value: `${internshipsCount}`,
      label: aboutData.about.stats.internships[lang],
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      value: experienceValue,
      label: aboutData.about.stats.experience[lang],
    },
  ]

  return (
    <section id="about-section" className="py-24 bg-card">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-heading font-extrabold text-foreground tracking-tight"
          >
            {aboutData.about.title[lang]}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            <p className="text-foreground/90 font-medium">
              {bio}
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium text-foreground">Fullstack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium text-foreground">Frontend Developer</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-background border border-border p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="p-3 bg-primary/10 rounded-2xl">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-heading font-extrabold text-foreground">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
