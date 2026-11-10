import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import ProjectsList from '@/components/ProjectsList'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery)

  return (
    <div className="interior-page">
      <ProjectsList projects={projects} />
    </div>
  )
}
