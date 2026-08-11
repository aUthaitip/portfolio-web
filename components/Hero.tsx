'use client'

import { useLanguage } from './LanguageContext'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { buttonVariants, Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Icons } from '@/components/Icons'
import Link from 'next/link'

import { homeData } from '@/data/home'

export default function Hero({ profile }: { profile: any }) {
  const { lang } = useLanguage()

  // Use sanity data if available, fallback to README requested defaults
  const defaultName = homeData.hero.defaultName[lang]
  const defaultRoles = homeData.hero.defaultRoles
  const defaultBio = homeData.hero.defaultBio[lang]

  const name = typeof profile?.name === 'object' ? (profile?.name?.[lang] || profile?.name?.en || profile?.name?.th) : profile?.name || defaultName
  const roles = typeof profile?.headline === 'object' ? (profile?.headline?.[lang] || profile?.headline?.en || profile?.headline?.th) : profile?.headline || defaultRoles
  const bio = typeof profile?.shortBio === 'object' ? (profile?.shortBio?.[lang] || profile?.shortBio?.en || profile?.shortBio?.th) : profile?.shortBio || defaultBio
  const email = profile?.email || 'contact@example.com'
  
  return (
    <section id="about" className="min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden relative bg-background">
      {/* Soft background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container-custom relative w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left flex-1 space-y-8"
          >
            <div>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-primary font-medium tracking-wide mb-2 text-lg"
              >
                {homeData.hero.greeting[lang]}
              </motion.p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-foreground tracking-tight leading-tight">
                {name}
              </h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 flex flex-wrap justify-center lg:justify-start gap-3 items-center text-xl sm:text-2xl text-secondary font-semibold"
              >
                {roles.split('/').map((role: string, i: number) => (
                  <span key={i} className="flex items-center">
                    {role.trim()}
                    {i !== roles.split('/').length - 1 && <span className="mx-3 text-amber-950 text-sm">•</span>}
                  </span>
                ))}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                {bio}
              </motion.p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/projects"
                className={cn(buttonVariants({ size: 'lg' }), 'rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all gap-2 group font-heading')}
              >
                {homeData.hero.viewProjects[lang]}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`mailto:${email}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full font-heading bg-transparent border-primary/20 hover:bg-primary/5')}
              >
                {homeData.hero.contactMe[lang]}
              </a>
            </div>

            <div className="flex justify-center lg:justify-start gap-6 pt-6">
              {(profile?.githubUrl || true) && (
                <a href={profile?.githubUrl || 'https://github.com/aUthaitip'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <Icons.Github className="w-6 h-6" />
                </a>
              )}
              <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Image and Tech Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-112.5 lg:h-112.5">
              {profile?.profileImage ? (
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-card rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={urlFor(profile.profileImage).url()}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-card rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/Ice.png"
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              
              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl shadow-lg font-semibold text-primary text-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> React
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 -right-8 bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl shadow-lg font-semibold text-primary text-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-black"></div> Next.js
              </motion.div>
              <motion.div 
                animate={{ y: [0, -12, 0] }} 
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 left-10 bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl shadow-lg font-semibold text-primary text-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600"></div> TypeScript
              </motion.div>
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-1/4 -left-12 bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl shadow-lg font-semibold text-primary text-sm flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500"></div> Tailwind
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
