"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  variant?: "full" | "icon" | "wordmark"
  color?: "dark" | "light"
  size?: "sm" | "md" | "lg" | "xl" | number
  animate?: boolean
  className?: string
}

// ─── Colour tokens ────────────────────────────────────────────────────────────
const theme = {
  dark: {
    text: "#152E1C",  // forest-deep
    sub:  "#B8872A",  // gold
    tag:  "#5A8F73",  // sage
  },
  light: {
    text: "#F7F3EC",  // cream
    sub:  "#D4A84D",  // light gold
    tag:  "#A5D4BB",  // light sage
  },
}

// ─── Emblem sizes (px) ───────────────────────────────────────────────────────
const emblemSize = {
  sm: 36,
  md: 44,
  lg: 56,
  xl: 72,
}

// ─── Emblem — real logo PNG ──────────────────────────────────────────────────
function Emblem({
  size,
  animate: anim,
}: {
  size: number
  animate?: boolean
}) {
  const img = (
    <Image
      src="/logo.png"
      alt="GreenMind emblem"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
      priority
    />
  )

  if (!anim) return <span className="inline-block shrink-0">{img}</span>

  return (
    <motion.span
      className="inline-block shrink-0"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {img}
    </motion.span>
  )
}

// ─── Wordmark text block ─────────────────────────────────────────────────────
// Uses Tailwind classes so responsive scaling works correctly everywhere.
function Wordmark({
  t,
  size,
}: {
  t: typeof theme.dark
  size: "sm" | "md" | "lg" | "xl"
}) {
  // Name line: prominent, display font
  const nameClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }[size]

  // Tagline line: small caps, body font
  const tagClass = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-[11px]",
    xl: "text-xs",
  }[size]

  return (
    <span className="inline-flex flex-col justify-center leading-none gap-[3px]">
      <span
        className={`font-display font-semibold tracking-tight whitespace-nowrap ${nameClass}`}
        style={{ color: t.text, lineHeight: 1.1 }}
      >
        GreenMind Services LLP
      </span>
      <span
        className={`font-body font-normal uppercase tracking-[0.18em] whitespace-nowrap ${tagClass}`}
        style={{ color: t.sub, lineHeight: 1 }}
      >
        Preserve · Protect · Prosper
      </span>
    </span>
  )
}

// ─── Main Logo Component ──────────────────────────────────────────────────────
export default function Logo({
  variant   = "full",
  color     = "dark",
  size      = "md",
  animate   = false,
  className = "",
}: LogoProps) {
  const t        = theme[color]
  const sizeKey  = typeof size === "number" ? "md" : size
  const eSize    = typeof size === "number" ? size : emblemSize[sizeKey]

  // Gap between emblem and wordmark (px), scales with size
  const gap = {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16,
  }[sizeKey]

  // ── Icon only ──────────────────────────────────────────────────────────────
  if (variant === "icon") {
    return (
      <span className={`inline-block ${className}`} aria-label="GreenMind">
        <Emblem size={eSize} animate={animate} />
      </span>
    )
  }

  // ── Wordmark only ─────────────────────────────────────────────────────────
  if (variant === "wordmark") {
    return (
      <span
        className={`inline-block ${className}`}
        aria-label="GreenMind Services LLP"
      >
        <Wordmark t={t} size={sizeKey} />
      </span>
    )
  }

  // ── Full logo (emblem + wordmark) ──────────────────────────────────────────
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      aria-label="GreenMind Services LLP"
    >
      <Emblem size={eSize} animate={animate} />
      <Wordmark t={t} size={sizeKey} />
    </span>
  )
}

// ─── Animated logo for loading states ────────────────────────────────────────
export function LogoLoader({
  size = 80,
  color = "dark",
  className = "",
}: {
  size?: number
  color?: "dark" | "light"
  className?: string
}) {
  const t = theme[color]
  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <Emblem size={size} animate />
      <motion.p
        className="text-xs font-body uppercase tracking-widest"
        style={{ color: t.tag }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading…
      </motion.p>
    </div>
  )
}

// ─── Background watermark ─────────────────────────────────────────────────────
export function LogoWatermark({
  opacity   = 0.06,
  size      = 400,
  className = "",
}: {
  opacity?: number
  size?: number
  color?: "dark" | "light"
  className?: string
}) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </div>
  )
}
