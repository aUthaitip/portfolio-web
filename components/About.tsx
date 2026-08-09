'use client'

import { useLanguage } from './LanguageContext'
import { motion } from 'framer-motion'
import { Code2, FolderKanban, Briefcase, Calendar } from 'lucide-react'

import { aboutData } from '@/data/about'

export default function About() {
  const { lang } = useLanguage()

  const stats = [
    {
      icon: <FolderKanban className="w-6 h-6 text-primary" />,
      value: '10+',
      label: aboutData.about.stats.projects[lang],
    },
    {
      icon: <Code2 className="w-6 h-6 text-primary" />,
      value: '15+',
      label: aboutData.about.stats.technologies[lang],
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      value: '1',
      label: aboutData.about.stats.internships[lang],
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      value: '6+',
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
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              {aboutData.about.bio1[lang]}
            </p>
            <p>
              {aboutData.about.bio2[lang]}
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium text-foreground">Computer Engineering</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium text-foreground">Frontend Developer Intern</span>
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
