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

import { usePathname } from 'next/navigation'
import { homeData } from '@/data/home'
import { projectsData } from '@/data/projects'

export default function ProjectsList({ projects }: { projects: any[] }) {
  const { lang } = useLanguage()
  const pathname = usePathname()

  const getPageData = () => {
    if (pathname?.includes('/projects')) return projectsData
    return homeData
  }

  const pageData = getPageData()

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
            {pageData.projects.title[lang]}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="group bg-card hover:bg-card/90 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-border/60 flex flex-col"
            >
              {project.mainImage && (
                <Link href={`/projects/${project.slug?.current}`} className="relative h-36 w-full bg-muted overflow-hidden block">
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={projectTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/40 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/projects/${project.slug?.current}`}>
                    <h3 className="text-lg font-heading font-extrabold text-foreground mb-1.5 hover:text-primary transition-colors cursor-pointer line-clamp-1">
                      {projectTitle}
                    </h3>
                  </Link>
                  {projectSummary && (
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed font-normal">
                      {projectSummary}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-semibold rounded-lg border border-border/40">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 pt-3 border-t border-border/40">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'flex-1 rounded-xl font-heading text-xs group/btn py-3.5 shadow-sm hover:shadow-md hover:shadow-primary/10 transition-all font-bold')}
                    >
                      {pageData.projects.liveDemo[lang]}
                      <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1 rounded-xl font-heading text-xs py-3.5 border-border/60 hover:bg-secondary/40 font-bold')}
                    >
                      <Icons.Github className="w-3 h-3 mr-1" />
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
