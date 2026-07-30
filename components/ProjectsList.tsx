'use client'

import { useLanguage } from './LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Icons } from '@/components/Icons'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function ProjectsList({ projects }: { projects: any[] }) {
  const { t, lang } = useLanguage()

  if (!projects || projects.length === 0) return null

  return (
    <section id="projects" className="py-24 bg-card">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-heading font-extrabold text-foreground tracking-tight"
          >
            {t('ผลงานที่โดดเด่น', 'Featured Projects')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => {
            const projectTitle = typeof project.title === 'object' ? (project.title?.[lang] || project.title?.en || project.title?.th) : project.title
            const projectSummary = typeof project.summary === 'object' ? (project.summary?.[lang] || project.summary?.en || project.summary?.th) : project.summary

            return (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-border flex flex-col"
            >
              {project.mainImage && (
                <Link href={`/projects/${project.slug?.current}`} className="relative h-64 w-full bg-muted overflow-hidden block">
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={projectTitle}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    Featured
                  </div>
                </Link>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <Link href={`/projects/${project.slug?.current}`}>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">{projectTitle}</h3>
                </Link>
                {projectSummary && (
                  <p className="text-muted-foreground mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {projectSummary}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs font-semibold rounded-lg border border-secondary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-auto pt-4 border-t border-border/50">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'default' }), 'flex-1 rounded-xl font-heading group/btn')}
                    >
                      {t('ดูผลงาน', 'Live Demo')}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 rounded-xl font-heading')}
                    >
                      <Icons.Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
