'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// 1. Mouse Follower Neon Glow (Liquid Background Glow)
export function MouseFollowerGlow() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for liquid feel
  const springConfig = { damping: 40, stiffness: 120, mass: 1.2 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the glow width/height (150px) to center it
      mouseX.set(e.clientX - 150)
      mouseY.set(e.clientY - 150)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        x: glowX,
        y: glowY,
      }}
      className="hidden md:block fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-0 blur-[100px] opacity-[0.14] bg-gradient-to-tr from-primary via-secondary to-accent"
    />
  )
}

// 2. Interactive Scroll To Top Button with Circular Progress
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setProgress(window.scrollY / totalScroll)
      }
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-card border border-border/80 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:border-primary/40 text-primary transition-colors focus:outline-hidden"
        >
          {/* Circular progress track */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-muted-foreground/10 fill-none"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-primary fill-none"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - progress)}
              transition={{ ease: "easeOut" }}
            />
          </svg>
          <ArrowUp className="w-5 h-5 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
// 3. Premium Interactive Grid + Animated Grain Noise Background
export function PremiumBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03]" 
        style={{
          backgroundImage: `
            radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(111,78,55,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(111,78,55,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
        }}
      />

      {/* High-end Animated Noise/Grain layer */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignettes */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/30" />
    </div>
  )
}
