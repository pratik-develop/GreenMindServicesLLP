"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CtaButton from './CtaButton'
import Logo from './Logo'

const navLinks = [
  // { name: 'Home',       href: '/' }, // temporarily disabled
  { name: 'Services',   href: '/services' },
  { name: 'Industries', href: '/industries' },
  // { name: 'Projects',   href: '/projects' }, // temporarily disabled
  { name: 'Resources',  href: '/resources' },
  { name: 'About',      href: '/about' },
  { name: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [isVisible,        setIsVisible]        = useState(true)
  const [lastScrollY,      setLastScrollY]      = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsVisible(y < lastScrollY || y < 100)
      setLastScrollY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false) }, [pathname])

  const activeHref = navLinks.find(l =>
    l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
  )?.href

  return (
    <>
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/85 backdrop-blur-md border-b border-forest-deep/10"
      >
          <div className="container-custom">
            {/* Issue #4 — h-16 on mobile, h-20 on desktop */}
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Logo — icon-only on mobile, full lockup on desktop */}
              <Link
                href="/"
                className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
                aria-label="GreenMind Services LLP - Home"
              >
                {/* Mobile: emblem only */}
                <span className="md:hidden">
                  <Logo variant="icon" size={38} color="dark" />
                </span>

                {/* md–lg: full logo, sm preset */}
                <span className="hidden md:block lg:hidden">
                  <Logo variant="full" size="sm" color="dark" />
                </span>

                {/* lg+: full logo, md preset */}
                <span className="hidden lg:block">
                  <Logo variant="full" size="md" color="dark" />
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                {navLinks.map((link) => {
                  const isActive = link.href === activeHref
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative text-sm font-body font-medium transition-colors py-1 px-1 ${isActive ? 'text-forest-mid font-semibold' : 'text-forest-deep hover:text-forest-mid'}`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-forest-mid rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )
                })}
                <a
                  href="tel:+919181018810"
                  aria-label="Call us"
                  className="hidden md:flex items-center gap-1.5 text-sm font-body text-forest-deep/60 hover:text-forest-mid transition-colors min-h-[44px] min-w-[44px] justify-center"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden lg:inline">+91 91810 18810</span>
                </a>
                <CtaButton href="/contact">Book a Consultation</CtaButton>
              </div>

              {/* Issue #16 — min 44×44 touch target */}
              <button
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-forest-deep"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>

          {/* Issue #4 — max-h so long menus don't overflow off-screen */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-cream/98 border-t border-forest-deep/10 overflow-y-auto max-h-[calc(100dvh-4rem)]"
              >
                <div className="container-custom py-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      /* min-h-[44px] ensures touch target compliance on every item */
                      className={`flex items-center min-h-[44px] text-sm font-body font-medium px-2 rounded-lg transition-colors ${
                        link.href === activeHref
                          ? 'text-forest-mid bg-forest-mid/15 font-semibold'
                          : 'text-forest-deep hover:text-forest-mid hover:bg-forest-deep/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <CtaButton href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Book a Consultation
                    </CtaButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
    </>
  )
}
