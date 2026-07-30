'use client'

import { useLanguage } from './LanguageContext'
import { motion } from 'framer-motion'

export default function Skills() {
  const { t } = useLanguage()

  const categories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand']
    },
    {
      title: 'Backend & DB',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Prisma', 'REST API']
    },
    {
      title: 'Tools & Other',
      skills: ['Git', 'GitHub', 'Figma', 'Vercel', 'Sanity CMS', 'SEO', 'Jest']
    }
  ]

  return (
    <section id="skills" className="py-24 bg-primary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-heading font-extrabold text-white tracking-tight"
          >
            {t('ทักษะความสามารถ', 'Skills & Technologies')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-white mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
