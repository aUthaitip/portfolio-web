import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { profileQuery } from '@/sanity/lib/queries'
import { MouseFollowerGlow, ScrollToTop, PremiumBackground } from '@/components/ui/interactive-effects'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'Portfolio | Frontend Developer',
  description: 'Premium minimal portfolio',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await client.fetch(profileQuery)

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative`}>
        <Providers>
          <PremiumBackground />
          <MouseFollowerGlow />
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer profileName={profile?.name} />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
