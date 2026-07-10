"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  variant?: "full" | "icon" | "wordmark" | "large"
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

// Intrinsic PNG dimensions (used for Next/Image aspect ratio)
const INTRINSIC = {
  emblem:   { w: 2544, h: 2488 }, // logo-sm.png
  wordmark: { w: 2630, h: 649 },  // logo-txt.png
  large:    { w: 2630, h: 1600 }, // logo-lg.png
}

// ─── Display sizes ─────────────────────────────────────────────────────────────
const emblemSize = { sm: 36, md: 44, lg: 56, xl: 72 }        // icon-only / loader
const lockupEmblemSize = { sm: 34, md: 40, lg: 50, xl: 64 }  // emblem next to wordmark
const wordmarkHeight = { sm: 28, md: 34, lg: 42, xl: 54 }
const largeHeight = { sm: 56, md: 72, lg: 96, xl: 128 }

function sizeKey(size: NonNullable<LogoProps["size"]>): "sm" | "md" | "lg" | "xl" {
  return typeof size === "number" ? "md" : size
}

// ─── Emblem — small logo PNG ───────────────────────────────────────────────────
function Emblem({
  size,
  animate: anim,
}: {
  size: number
  animate?: boolean
}) {
  const img = (
    <Image
      src="/logo-sm.png"
      alt="GreenMind emblem"
      width={INTRINSIC.emblem.w}
      height={INTRINSIC.emblem.h}
      priority
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  )

  if (!anim) return <span className="inline-block shrink-0 self-center">{img}</span>

  return (
    <motion.span
      className="inline-block shrink-0 self-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {img}
    </motion.span>
  )
}

// ─── Wordmark — logo text PNG ──────────────────────────────────────────────────
function Wordmark({
  size,
}: {
  size: "sm" | "md" | "lg" | "xl"
}) {
  const h = wordmarkHeight[size]

  return (
    <Image
      src="/logo-txt.png"
      alt="GreenMind Services LLP"
      width={INTRINSIC.wordmark.w}
      height={INTRINSIC.wordmark.h}
      style={{ height: h, width: "auto", maxWidth: "100%" }}
      className="shrink-0 self-center"
    />
  )
}

// ─── Large lockup — full logo PNG ──────────────────────────────────────────────
function LargeLockup({
  size,
}: {
  size: "sm" | "md" | "lg" | "xl"
}) {
  const h = largeHeight[size]

  return (
    <Image
      src="/logo-lg.png"
      alt="GreenMind Services LLP"
      width={INTRINSIC.large.w}
      height={INTRINSIC.large.h}
      style={{ height: h, width: "auto", maxWidth: "100%" }}
    />
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
  const key   = sizeKey(size)
  const eSize = typeof size === "number" ? size : emblemSize[key]
  const lockupEmblem = typeof size === "number" ? size : lockupEmblemSize[key]

  // Gap between emblem and wordmark (px), scales with size
  const gap = {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
  }[key]

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
        <Wordmark size={key} />
      </span>
    )
  }

  // ── Large lockup (single PNG) ───────────────────────────────────────────────
  if (variant === "large") {
    return (
      <span
        className={`inline-block ${className}`}
        aria-label="GreenMind Services LLP"
      >
        <LargeLockup size={key} />
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
      <Emblem size={lockupEmblem} animate={animate} />
      <Wordmark size={key} />
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
