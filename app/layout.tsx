import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { profileQuery } from '@/sanity/lib/queries'

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
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer profileName={profile?.name} />
        </Providers>
      </body>
    </html>
  )
}
