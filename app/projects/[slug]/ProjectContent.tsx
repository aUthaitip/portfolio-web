'use client'

import { useLanguage } from '@/components/LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProjectContent({ project }: { project: any }) {
  const { t, lang } = useLanguage()

  const projectTitle = typeof project.title === 'object' ? (project.title?.[lang] || project.title?.en || project.title?.th) : project.title
  const projectSummary = typeof project.summary === 'object' ? (project.summary?.[lang] || project.summary?.en || project.summary?.th) : project.summary
  const projectContent = typeof project.content === 'object' ? (project.content?.[lang] || project.content?.en || project.content?.th) : project.content

  return (
    <article className="container-custom w-full">
      <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        {t('กลับไปหน้าผลงาน', 'Back to Projects')}
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-6 leading-tight">
          {projectTitle}
        </h1>
        
        {projectSummary && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {projectSummary}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mb-10 border-b border-border pb-10">
          {project.projectUrl && (
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'rounded-full font-heading group/btn shadow-md hover:shadow-lg transition-all')}
            >
              {t('ดูผลงาน', 'Live Demo')}
              <ExternalLink className="w-5 h-5 ml-2 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full font-heading border-border hover:border-primary hover:bg-primary/5 transition-colors')}
            >
              <Icons.Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          )}
        </div>


        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-heading font-bold mb-4 tracking-tight text-foreground/90">{t('เทคโนโลยีที่ใช้', 'Technologies')}</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech: string) => (
                <span 
                  key={tech} 
                  className="px-4 py-1.5 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 text-primary text-xs font-mono font-semibold tracking-wider uppercase rounded-full border border-primary/15 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {projectContent && (
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-3xl prose-img:shadow-lg prose-img:border prose-img:border-border">
            <PortableText 
              value={projectContent} 
              components={{
                types: {
                  image: ({ value }) => {
                    if (!value?.asset) return null
                    return (
                      <div className="relative w-full h-[400px] my-8 rounded-3xl overflow-hidden">
                        <Image src={urlFor(value).url()} alt="Content image" fill className="object-contain" />
                      </div>
                    )
                  },
                  contentImage: ({ value }) => {
                    if (!value?.image) return null
                    return (
                      <div className="relative w-full h-[400px] my-8 rounded-3xl overflow-hidden">
                        <Image src={urlFor(value.image).url()} alt="Content image" fill className="object-contain" />
                      </div>
                    )
                  }
                }
              }}
            />
          </div>
        )}
      </motion.div>
    </article>
  )
}
