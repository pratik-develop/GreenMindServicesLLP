"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CtaButton from './CtaButton'
import Logo from './Logo'
import { trackEvent } from '@/lib/analytics'
import { useTheme } from 'next-themes'

const navLinks = [
  // { name: 'Home',       href: '/' }, // temporarily disabled
  { name: 'About',      href: '/about' },
  { name: 'Services',   href: '/services' },
  { name: 'Industries', href: '/industries' },
  // { name: 'Projects',   href: '/projects' }, // temporarily disabled
  { name: 'Resources',  href: '/resources' },
  { name: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [isVisible,        setIsVisible]        = useState(true)
  const [lastScrollY,      setLastScrollY]      = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const logoColor = mounted && resolvedTheme === 'dark' ? 'light' : 'dark'

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
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-forest-deep/55 to-forest-deep/35 md:from-page/55 md:to-page/35 md:dark:from-page/45 md:dark:to-page/25 backdrop-blur-lg shadow-sm"
      >
          <div className="container-custom">
            {/* Issue #4 — h-16 on mobile, h-20 on desktop */}
            <div className="relative flex items-center h-16 md:h-20">

              {/* Mobile layout: emblem left, wordmark center, hamburger right */}
              <div className="grid grid-cols-[44px_1fr_44px] items-center w-full md:hidden">
                <Link
                  href="/"
                  className="contents"
                  aria-label="GreenMind Services LLP - Home"
                  onClick={() => trackEvent('logo_click', { location: 'navbar' })}
                >
                  <span className="flex items-center justify-start" suppressHydrationWarning>
                    <Logo variant="icon" size="sm" color="light" />
                  </span>
                  <span className="flex items-center justify-center" suppressHydrationWarning>
                    <Logo variant="wordmark" size="sm" color="light" />
                  </span>
                </Link>

                {/* Issue #16 — min 44×44 touch target */}
                <button
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] text-cream"
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

              {/* Desktop layout: full lockup left, nav right */}
              <div className="hidden md:flex items-center justify-between w-full">
                <Link
                  href="/"
                  className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
                  aria-label="GreenMind Services LLP - Home"
                  onClick={() => trackEvent('logo_click', { location: 'navbar' })}
                >
                  <span suppressHydrationWarning>
                    <Logo variant="full" size="lg" color={logoColor} />
                  </span>
                </Link>

                <div className="flex items-center gap-2 lg:gap-4">
                  {navLinks.map((link) => {
                    const isActive = link.href === activeHref
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`relative text-sm font-body font-medium transition-colors py-1 px-1 ${isActive ? 'text-secondary font-semibold' : 'text-primary hover:text-secondary'}`}
                        onClick={() => trackEvent('nav_link_click', { label: link.name, location: 'desktop' })}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-secondary rounded-full" />
                        )}
                      </Link>
                    )
                  })}
                  <a
                    href="tel:+919181018810"
                    aria-label="Call us"
                    onClick={() => trackEvent('phone_click', { location: 'navbar', number: '+919181018810' })}
                    className="hidden lg:flex items-center justify-center text-sm font-body text-primary/60 hover:text-secondary transition-colors min-h-[44px] min-w-[44px]"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <CtaButton href="/contact" eventName="cta_click" eventParams={{ location: 'navbar', label: 'Book a Consultation' }}>
                    <span className="hidden lg:inline">Book a Consultation</span>
                    <span className="lg:hidden">Book</span>
                  </CtaButton>
                </div>
              </div>
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
                className="md:hidden bg-gradient-to-b from-forest-deep/90 to-forest-deep/85 border-t border-cream/10 overflow-y-auto max-h-[calc(100dvh-4rem)] backdrop-blur-lg"
              >
                <div className="container-custom py-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      /* min-h-[44px] ensures touch target compliance on every item */
                      className={`flex items-center min-h-[44px] text-sm font-body font-medium px-2 rounded-lg transition-colors ${
                        link.href === activeHref
                          ? 'text-secondary bg-secondary/15 font-semibold'
                          : 'text-cream hover:text-secondary hover:bg-cream/10'
                      }`}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        trackEvent('nav_link_click', { label: link.name, location: 'mobile' })
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <CtaButton href="/contact" onClick={() => setIsMobileMenuOpen(false)} eventName="cta_click" eventParams={{ location: 'navbar_mobile', label: 'Book a Consultation' }}>
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
