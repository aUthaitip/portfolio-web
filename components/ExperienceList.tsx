'use client'

import { useLanguage } from './LanguageContext'
import { motion } from 'framer-motion'

export default function ExperienceList({ experiences }: { experiences: any[] }) {
  const { t, lang } = useLanguage()

  if (!experiences || experiences.length === 0) return null

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-heading font-extrabold text-foreground tracking-tight"
          >
            {t('ประสบการณ์', 'Experience')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border rounded-full"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp._id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary z-10 hidden md:block"></div>
                
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}>
                  {/* Mobile Dot */}
                  <div className="absolute left-0 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10 md:hidden"></div>
                  
                  <div className="bg-card border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -{' '}
                      {exp.isCurrent ? t('ปัจจุบัน', 'Present') : (exp.endDate ? new Date(exp.endDate).toLocaleDateString() : '')}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                      {typeof exp.jobTitle === 'object' ? (exp.jobTitle?.[lang] || exp.jobTitle?.en || exp.jobTitle?.th) : exp.jobTitle}
                    </h3>
                    <div className="text-lg font-medium text-secondary mb-4">
                      {typeof exp.company === 'object' ? (exp.company?.[lang] || exp.company?.en || exp.company?.th) : exp.company}
                    </div>
                    
                    {exp.description && (
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {typeof exp.description === 'object' ? (exp.description?.[lang] || exp.description?.en || exp.description?.th) : exp.description}
                      </p>
                    )}
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string) => (
                          <span key={tech} className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs font-semibold rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
    </section>
  )
}
