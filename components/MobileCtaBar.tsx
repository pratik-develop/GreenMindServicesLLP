"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function MobileCtaBar() {
  const pathname = usePathname()
  const [scrolledEnough, setScrolledEnough] = useState(false)
  const [footerVisible,  setFooterVisible]  = useState(false)

  // Show after scrolling past 400px
  useEffect(() => {
    const handleScroll = () => setScrolledEnough(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hide as soon as the footer enters the viewport
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [pathname])

  const visible = scrolledEnough && !footerVisible

  if (pathname === "/contact") return null
  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden
        bg-forest-deep border-t border-cream/10
        flex items-center justify-between px-4 py-3 pb-[env(safe-area-inset-bottom,0.75rem)]"
    >
      {/* Phone link */}
      <a
        href="tel:+919181018810"
        className="flex items-center gap-2 text-cream/70 text-sm min-h-[44px]"
      >
        {/* Phone icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>+91 91810 18810</span>
      </a>

      {/* CTA link */}
      <Link
        href="/contact"
        className="bg-gradient-to-br from-forest-mid to-forest-deep text-cream
          font-semibold text-sm px-5 py-2.5 rounded-xl
          border border-forest-light/30 shadow-lg min-h-[44px]
          flex items-center"
      >
        Get in Touch
      </Link>
    </div>
  )
}
