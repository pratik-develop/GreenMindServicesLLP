"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

interface StatsGridProps {
  stats: Stat[]
}

function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const duration = 1800
    function step(ts: number) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Bold, oversized number for impact */}
          <p className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-forest-deep mb-1 md:mb-2 leading-none">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </p>
          <p className="text-forest-deep/55 text-xs sm:text-sm md:text-base font-body font-medium mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
