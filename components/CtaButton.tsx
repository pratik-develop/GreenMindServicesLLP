"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface CtaButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  eventName?: string
  eventParams?: Record<string, any>
}

export default function CtaButton({
  children,
  onClick,
  href,
  className = "",
  variant = 'primary',
  size = 'md',
  eventName,
  eventParams,
}: CtaButtonProps) {
  // All sizes enforce ≥44px height (WCAG 2.5.5 touch target)
  const sizeStyles: Record<string, string> = {
    sm: "px-6 py-2.5 text-sm min-h-[44px]",
    md: "px-8 py-3 text-base min-h-[44px]",
    lg: "px-10 py-4 text-lg min-h-[44px]",
  }

  // No CSS hover:scale / active:scale — Framer Motion handles transforms exclusively
  // to avoid fighting with the layout system on certain browsers.
  const variantStyles: Record<string, string> = {
    primary:   "bg-gradient-to-br from-forest-mid to-forest-deep text-cream font-semibold shadow-xl hover:shadow-2xl hover:shadow-forest-deep/40",
    secondary: "bg-transparent border-2 border-forest-mid text-forest-mid font-semibold hover:bg-forest-mid hover:text-cream hover:border-forest-deep",
    outline:   "bg-transparent border-2 border-cream/60 text-cream font-semibold hover:bg-forest-mid hover:border-forest-mid hover:text-cream",
  }

  const baseStyles = `inline-flex items-center justify-center font-medium transition-shadow duration-300 rounded-xl ${sizeStyles[size]}`

  const handleClick = () => {
    if (eventName) {
      trackEvent(eventName, eventParams)
    }
    onClick?.()
  }

  const buttonContent = (
    <motion.button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, type: "spring", stiffness: 420, damping: 20 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block" onClick={handleClick}>
        {buttonContent}
      </a>
    )
  }

  return buttonContent
}
