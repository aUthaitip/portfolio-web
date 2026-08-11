import { client } from '@/sanity/lib/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import ProjectContent from './ProjectContent'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    return {
      title: 'Project Not Found | Portfolio',
      description: 'The requested project could not be found.',
    }
  }

  const title = typeof project.title === 'object' ? (project.title?.en || project.title?.th || '') : project.title || ''
  const summary = typeof project.summary === 'object' ? (project.summary?.en || project.summary?.th || '') : project.summary || ''

  return {
    title: `${title} | Project Details`,
    description: summary,
    openGraph: {
      title: title,
      description: summary,
    }
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20 bg-background">
      <ProjectContent project={project} />
    </div>
  )
}
