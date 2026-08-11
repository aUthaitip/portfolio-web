import About from '@/components/About'
import { client } from '@/sanity/lib/client'
import { profileQuery, projectsQuery, experiencesQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function AboutPage() {
  const [profile, projects, experiences] = await Promise.all([
    client.fetch(profileQuery),
    client.fetch(projectsQuery),
    client.fetch(experiencesQuery),
  ])

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <About profile={profile} projects={projects} experiences={experiences} />
    </div>
  )
}
