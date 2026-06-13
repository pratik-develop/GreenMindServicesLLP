"use client"

import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If the user prefers reduced motion, snap to visible immediately — no observer needed.
    if (prefersReducedMotion) {
      controls.set('visible')
      return
    }

    // Copy ref.current to a local variable so the cleanup closure captures
    // the stable reference, not the mutable ref object (fixes React hooks/exhaustive-deps warning).
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible')
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [controls, prefersReducedMotion])

  const variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
