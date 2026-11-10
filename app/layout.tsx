import type { Metadata } from 'next'
import { Manrope, Noto_Sans_Thai, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { profileQuery } from '@/sanity/lib/queries'
import { ScrollToTop } from '@/components/ui/interactive-effects'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const thai = Noto_Sans_Thai({ subsets: ['thai', 'latin'], variable: '--font-thai', display: 'swap' })
const editorial = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-editorial', display: 'swap' })

export const metadata: Metadata = {
  title: 'Authaitip Saensri | Junior Full Stack Developer & System Analyst',
  description: 'Portfolio of Authaitip Saensri, a Computer Science graduate with experience in React, Next.js, TypeScript, system analysis, REST APIs, website support, SEO, and web application testing.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await client.fetch(profileQuery)

  return (
    <html lang="th" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${thai.variable} ${editorial.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative`}>
        <Providers>
          <a href="#main-content" className="skip-link">Skip to content / ข้ามไปยังเนื้อหา</a>
          <Navbar />
          <main id="main-content" className="min-h-screen" tabIndex={-1}>
            {children}
          </main>
          <Footer profileName={profile?.name} />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
