import { client } from '@/sanity/lib/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import ProjectContent from './ProjectContent'

export const revalidate = 60

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
