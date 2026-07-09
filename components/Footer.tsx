"use client"

import Link from 'next/link'
import Logo from './Logo'
import { trackEvent } from '@/lib/analytics'

function trackPhone(number: string) {
  trackEvent('phone_click', { location: 'footer', number })
}

function trackEmail() {
  trackEvent('email_click', { location: 'footer' })
}

function trackLinkedIn() {
  trackEvent('linkedin_click', { location: 'footer' })
}

function trackFooterLink(label: string, section: 'pages' | 'legal') {
  trackEvent('footer_link_click', { label, section, location: 'footer' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[1] bg-forest-deep text-cream">
      <div className="container-custom pt-10 pb-6 md:pt-12 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">

          {/* Brand — Logo lockup with tagline */}
          <div className="sm:col-span-2 md:col-span-1">
            {/* Logo in light color for dark footer */}
            <div className="mb-3">
              <Logo variant="full" size="sm" color="light" />
            </div>
            <p className="text-cream/50 text-xs leading-relaxed">
              Environmental consultancy for sustainable growth across Northeast India.
            </p>
            <a
              href="https://www.linkedin.com/company/greenmind-services-llp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GreenMind on LinkedIn"
              onClick={trackLinkedIn}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-cream/20 hover:bg-cream/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.851-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-cream/40 mb-3">Pages</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'Home',      href: '/' },
                { label: 'About',     href: '/about' },
                { label: 'Services',  href: '/services' },
                { label: 'Resources', href: '/resources' },
                { label: 'Contact',   href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => trackFooterLink(l.label, 'pages')} className="text-cream/55 hover:text-cream text-xs transition-colors py-0.5 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-cream/40 mb-3">Legal</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'Privacy Policy',     href: '/policies/privacy-policy' },
                { label: 'Terms & Conditions', href: '/policies/terms-conditions' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => trackFooterLink(l.label, 'legal')} className="text-cream/55 hover:text-cream text-xs transition-colors py-0.5 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-cream/40 mb-3">Contact</h4>
            <ul className="space-y-2 text-xs text-cream/55">
              <li>
                <a href="mailto:greenmindservicesllp@gmail.com" onClick={trackEmail} className="hover:text-cream transition-colors break-all">
                  greenmindservicesllp@gmail.com
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <a href="tel:+919181018810" onClick={() => trackPhone('+919181018810')} className="hover:text-cream transition-colors">+91 91810 18810</a>
                <a href="tel:+919181018811" onClick={() => trackPhone('+919181018811')} className="hover:text-cream transition-colors">+91 91810 18811</a>
              </li>
              <li className="text-cream/35 leading-snug">
                House No. 45, Jai Ram Boro Path<br />
                Garchuk, Kamrup (M), Assam 781035
              </li>
              <li className="text-cream/30">Mon–Fri · 9 AM – 6 PM IST</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with credentials */}
        <div className="border-t border-cream/10 mt-8 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            {/* Copyright */}
            <span className="text-cream/30">
              © {year} GreenMind Services LLP. All rights reserved.
            </span>

            {/* Credentials with mini logo */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-cream/40">
              <span className="flex items-center gap-1.5">
                <Logo variant="icon" size={16} color="light" />
                <span>DIPP243892</span>
              </span>
              <span className="hidden sm:inline text-cream/20">·</span>
              <span>UDYAM-AS-16-0061467</span>
              <span className="hidden sm:inline text-cream/20">·</span>
              <span>GSTIN 18ABDFG6856C1ZC</span>
              <span className="hidden sm:inline text-cream/20">·</span>
              <span>LLP ID: ACS-2757</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
