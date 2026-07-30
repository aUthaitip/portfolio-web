import About from '@/components/About'

export const revalidate = 60

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <About />
    </div>
  )
}
