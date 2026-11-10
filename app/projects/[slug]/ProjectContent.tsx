'use client'

import { useLanguage } from '@/components/LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { buttonVariants } from '@/components/ui/button'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { localized, localizedHref, smallImage, type Project } from '@/lib/portfolio'
import Reveal from '@/components/Reveal'

export default function ProjectContent({ project }: { project: Project }) {
  const { t, lang } = useLanguage()
  const title = localized(project.title, lang)
  const content = Array.isArray(project.content) ? project.content : project.content?.[lang] || project.content?.en || project.content?.th

  return (
    <article className="container-custom project-detail">
      <Link href={localizedHref('/projects', lang)} className="text-link back-link"><ArrowLeft aria-hidden="true" />{t('กลับไปหน้าผลงาน', 'Back to Projects')}</Link>
      <Reveal>
        <h1>{title}</h1>
        <p className="project-detail-summary">{localized(project.summary, lang)}</p>
        <div className="project-detail-actions">
          {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: 'lg' })}>{t('ดูผลงาน', 'Live Demo')}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'soft', size: 'lg' })}>GitHub<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
          {project.figmaUrl && <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'soft', size: 'lg' })}>{t('ดูงานออกแบบใน Figma', 'View Design in Figma')}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>}
        </div>
        {project.mainImage && <div className={`project-detail-image${smallImage(project.mainImage) ? ' is-icon' : ''}`}><Image src={smallImage(project.mainImage) ? urlFor(project.mainImage).url() : urlFor(project.mainImage).width(1600).auto('format').url()} alt={title} fill sizes="(max-width: 767px) 92vw, 90vw" loading="eager" fetchPriority="high" unoptimized={smallImage(project.mainImage)} /></div>}
        {!!project.technologies?.length && <div className="project-detail-technologies"><h2>{t('เทคโนโลยีที่ใช้', 'Technologies')}</h2><ul className="technology-list">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></div>}
      </Reveal>
      {content && <div className="project-rich-content"><PortableText value={content} components={{
        types: {
          image: ({ value }) => value?.asset ? <div className="content-image"><Image src={urlFor(value).width(1400).auto('format').url()} alt={value.alt || t('ภาพรายละเอียดผลงาน', 'Project detail')} fill sizes="(max-width: 767px) 92vw, 900px" className="object-contain" /></div> : null,
          contentImage: ({ value }) => value?.image ? <div className="content-image"><Image src={urlFor(value.image).width(1400).auto('format').url()} alt={value.alt || t('ภาพรายละเอียดผลงาน', 'Project detail')} fill sizes="(max-width: 767px) 92vw, 900px" className="object-contain" /></div> : null,
        },
      }} /></div>}
    </article>
  )
}
