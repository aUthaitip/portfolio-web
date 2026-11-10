import { client } from '@/sanity/lib/client'
import { profileQuery, projectsQuery, experiencesQuery } from '@/sanity/lib/queries'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ExperienceList from '@/components/ExperienceList'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

import ProjectsList from '@/components/ProjectsList'

export const revalidate = 60 // revalidate every 60 seconds

export default async function Home() {
  const [profile, projects, experiences] = await Promise.all([
    client.fetch(profileQuery),
    client.fetch(projectsQuery),
    client.fetch(experiencesQuery),
  ])

  return (
    <div className="home-page">
      <Hero profile={profile} />
      <ProjectsList projects={projects} />
      <ExperienceList experiences={experiences} />
      <About profile={profile} projects={projects} experiences={experiences} />
      <Skills />
      <Contact profile={profile} />
    </div>
  )
}
