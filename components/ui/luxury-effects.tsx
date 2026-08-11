'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 1. Magnetic Container Component
export function Magnetic({ children, range = 60, actionScale = 1.1 }: { children: React.ReactNode; range?: number; actionScale?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    if (distance < range) {
      x.set(distanceX * 0.4)
      y.set(distanceY * 0.4)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (el) el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: actionScale }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

// 2. 3D Tilt Card Component
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// 3. Text Reveal (Split Type Animation)
export function TextReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  
  const containerVars = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      }
    }
  }

  const wordVars = {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      }
    }
  }

  return (
    <motion.span
      variants={containerVars}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-block overflow-hidden ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] pb-[0.05em]">
          <motion.span variants={wordVars} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
