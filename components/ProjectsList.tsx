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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              className="group bg-background rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden border border-border flex flex-col"
            >
              {project.mainImage && (
                <Link href={`/projects/${project.slug?.current}`} className="relative h-48 w-full bg-muted overflow-hidden block">
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={projectTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-primary shadow-sm">
                    Featured
                  </div>
                </Link>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <Link href={`/projects/${project.slug?.current}`}>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-1">{projectTitle}</h3>
                </Link>
                {projectSummary && (
                  <p className="text-muted-foreground text-sm mb-5 flex-1 line-clamp-2 leading-relaxed">
                    {projectSummary}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-secondary/5 text-primary text-[10px] font-semibold rounded-md border border-secondary/15">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 mt-auto pt-4 border-t border-border/40">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'flex-1 rounded-lg font-heading text-xs group/btn')}
                    >
                      {pageData.projects.liveDemo[lang]}
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1 rounded-lg font-heading text-xs')}
                    >
                      <Icons.Github className="w-3.5 h-3.5 mr-1.5" />
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
