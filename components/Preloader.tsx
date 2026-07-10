"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogoLoader } from "./Logo"

interface PreloaderProps {
  children: React.ReactNode
  minDuration?: number
  fadeDuration?: number
}

export default function Preloader({
  children,
  minDuration = 1500,
  fadeDuration = 600,
}: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Start loading sequence
    const startTime = Date.now()

    // Listen for when the page is fully loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)

      // Ensure minimum display time for brand impact
      setTimeout(() => {
        setIsReady(true)
        // Small delay before starting fade for smoother transition
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      }, remaining)
    }

    // If document is already complete, trigger immediately
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [minDuration])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[100] bg-page flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <LogoLoader size={100} color="dark" />
            </motion.div>

            {/* Tagline reveal */}
            <motion.p
              className="mt-8 text-primary/60 font-body text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Preserve · Protect · Prosper
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-gold"
                initial={{ width: "0%" }}
                animate={{ width: isReady ? "100%" : "70%" }}
                transition={{
                  width: { duration: isReady ? 0.3 : 1.2, ease: "easeInOut" },
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - fade in after preloader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  )
}

// ─── Simple Logo Spinner for async operations ─────────────────────────────────
export function LogoSpinner({
  size = 40,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="animate-spin"
        style={{ animationDuration: "3s" }}
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#B8872A"
          strokeWidth="2"
          strokeDasharray="60 40"
          opacity="0.5"
        />
        {/* Inner leaf */}
        <path
          d="M50 25 C65 35, 70 50, 65 70 C62 78, 55 82, 50 85 C45 82, 38 78, 35 70 C30 50, 35 35, 50 25 Z"
          fill="#1E5C30"
        />
        <path
          d="M50 35 Q52 50, 50 80"
          fill="none"
          stroke="#B8872A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// ─── Logo Checkmark for success states ────────────────────────────────────────
export function LogoCheckmark({
  size = 60,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Background circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#B8872A"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Leaf */}
        <motion.path
          d="M50 25 C65 35, 70 50, 65 70 C62 78, 55 82, 50 85 C45 82, 38 78, 35 70 C30 50, 35 35, 50 25 Z"
          fill="#1E5C30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Checkmark overlay */}
        <motion.path
          d="M35 52 L45 62 L65 38"
          fill="none"
          stroke="#D4A84D"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}

// ─── Logo Error state ─────────────────────────────────────────────────────────
export function LogoError({
  size = 60,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#B8872A" strokeWidth="2" opacity="0.5" />

        {/* Leaf with different color to indicate error */}
        <path
          d="M50 25 C65 35, 70 50, 65 70 C62 78, 55 82, 50 85 C45 82, 38 78, 35 70 C30 50, 35 35, 50 25 Z"
          fill="#7DB89A"
          opacity="0.7"
        />

        {/* X mark */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <line
            x1="35"
            y1="35"
            x2="65"
            y2="65"
            stroke="#B8872A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="65"
            y1="35"
            x2="35"
            y2="65"
            stroke="#B8872A"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  )
}
