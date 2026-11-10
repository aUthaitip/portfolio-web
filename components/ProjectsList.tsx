'use client'

import { useLanguage } from './LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { homeData } from '@/data/home'
import { localized, localizedHref, smallImage, projectImageRatio, type Project } from '@/lib/portfolio'
import Reveal from './Reveal'
import { buttonVariants } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const { lang, t } = useLanguage()
  const isProjectsPage = usePathname()?.includes('/projects')
  if (!projects?.length) return null
  // Lead with the existing full stack clinic project; retain every project and its original URL.
  const featured = projects.find(project => /vet-care|pawplan/i.test(project.slug?.current || '')) || projects[0]
  const orderedProjects = [featured, ...projects.filter(project => project._id !== featured._id)]

  return (
    <section id="projects" className="section-work section-space" aria-labelledby="projects-title">
      <div className="container-custom">
        <Reveal><div className="section-heading"><h2 id="projects-title">{homeData.projects.title[lang]}</h2><span className="section-heading-rule" aria-hidden="true" /></div></Reveal>
        <div className="project-grid">
          {orderedProjects.map((project, index) => {
            const title = localized(project.title, lang)
            const summary = localized(project.summary, lang)
            const role = summary.match(lang === 'en' ? /My Role:[^\n]+/i : /โดยฉันทำหน้าที่[^\n]+/)?.[0]
            const preview = summary.match(/(?:Key Features|ฟีเจอร์เด่น):[\s\S]+/i)?.[0] || summary.replace(/^Mobile Application\s*\n+/i, '')
            const detailsHref = project.slug?.current ? localizedHref(`/projects/${project.slug.current}`, lang) : undefined
            const isSmall = project.mainImage ? smallImage(project.mainImage) : false
            const media = (
              <div className={`project-media${isSmall ? ' project-media-icon' : ''}`} style={{ aspectRatio: projectImageRatio(project.mainImage) }}>
                {project.mainImage ? <Image
                  src={isSmall ? urlFor(project.mainImage).url() : urlFor(project.mainImage).width(1400).auto('format').url()}
                  alt={title}
                  fill
                  sizes={index === 0 ? '(max-width: 767px) 92vw, 62vw' : '(max-width: 767px) 92vw, 46vw'}
                  className="project-image"
                  unoptimized={isSmall}
                  loading={index === 0 && isProjectsPage ? 'eager' : 'lazy'}
                /> : <span className="project-media-title">{title}</span>}
              </div>
            )
            return (
              <Reveal key={project._id} className={index === 0 || index === orderedProjects.length - 1 && orderedProjects.length % 2 === 0 ? 'project-wide' : ''}>
                <article className={`project-item${index === 0 ? ' project-featured' : ''}`}>
                  {detailsHref ? <Link href={detailsHref} className="project-media-link" aria-label={t(`ดูรายละเอียด ${title}`, `View ${title} details`)}>{media}</Link> : media}
                  <div className="project-copy">
                    {project.projectType === 'design' && <p className="project-kind">UI/UX Design</p>}
                    <h3>{detailsHref ? <Link href={detailsHref}>{title}<ArrowUpRight aria-hidden="true" /></Link> : title}</h3>
                    {role && <p className="project-role">{role}</p>}
                    {preview && <p className="project-summary">{preview}</p>}
                    {!!project.technologies?.length && <ul className="technology-list" aria-label={t('เทคโนโลยีที่ใช้', 'Technologies')}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
                    <div className="project-actions">
                      {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: 'sm' })}>{homeData.projects.liveDemo[lang]}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'soft', size: 'sm' })}>GitHub<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
                      {project.figmaUrl && <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'soft', size: 'sm' })}>{t('ดู Figma', 'View Figma')}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
