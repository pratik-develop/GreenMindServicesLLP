import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import RouteChangeTracker from '@/components/RouteChangeTracker'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import SkipLink from '@/components/SkipLink'
import MobileCtaBar from '@/components/MobileCtaBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTop from '@/components/ScrollToTop'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Site URL for OG images
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://greenmind.services'

export const viewport: Viewport = {
  themeColor: '#152E1C',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: {
    default: 'GreenMind Services LLP — Environmental & Compliance Consultants',
    template: '%s — GreenMind Services LLP',
  },
  description: 'Preserve · Protect · Prosper — Environmental Impact Assessments, ESG Disclosure, and Environmental Compliance services for sustainable business growth across Northeast India.',
  keywords: ['environmental consulting', 'ESG', 'compliance', 'sustainability', 'GreenMind', 'EIA', 'BRSR', 'Guwahati', 'Assam'],
  authors: [{ name: 'GreenMind Services LLP' }],
  creator: 'GreenMind Services LLP',
  publisher: 'GreenMind Services LLP',
  metadataBase: new URL(siteUrl),

  // Icons
  icons: {
    icon: [
      { url: '/favicon.png?v=2', type: 'image/png', sizes: '256x256' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo-sm.png', type: 'image/png', sizes: '180x180' },
    ],
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'GreenMind Services LLP',
    title: 'GreenMind Services LLP — Environmental & Compliance Consultants',
    description: 'Preserve · Protect · Prosper — Environmental Impact Assessments, ESG Disclosure, and Environmental Compliance services.',
    images: [
      {
        url: '/api/og?title=GreenMind+Services+LLP&description=Environmental+%26+Compliance+Consultants',
        width: 1200,
        height: 630,
        alt: 'GreenMind Services LLP - Preserve · Protect · Prosper',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'GreenMind Services LLP',
    description: 'Preserve · Protect · Prosper — Environmental & Compliance Consultants',
    images: ['/api/og?title=GreenMind+Services+LLP&description=Environmental+%26+Compliance+Consultants'],
    creator: '@greenmindllp',
  },

  // Verification
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Alternative languages
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-IN': siteUrl,
      'en': siteUrl,
    },
  },

  // Other
  category: 'business',
  classification: 'Environmental Consulting',
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <ThemeProvider>
          <SkipLink />
          <GoogleAnalytics />
          <Suspense fallback={null}>
            <RouteChangeTracker />
          </Suspense>
          <LenisProvider />
          <Navbar />
          <main id="main-content" className="min-h-screen scroll-mt-16 md:scroll-mt-20">
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
          <WhatsAppButton />
          <ScrollToTop />
          <ThemeToggle />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}