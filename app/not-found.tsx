import Link from 'next/link'
import Logo, { LogoWatermark } from '@/components/Logo'
import CtaButton from '@/components/CtaButton'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page relative overflow-hidden">
      {/* Background watermark — emblem at low opacity */}
      <LogoWatermark
        size={560}
        opacity={0.04}
        color="dark"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="container-custom text-center relative z-10 py-24">
        {/* Logo at top */}
        <div className="mb-10">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Logo variant="full" size="md" color="dark" />
          </Link>
        </div>

        {/* Emblem with X overlay */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Logo variant="icon" size={72} color="dark" />
            {/* X overlay */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 72 72"
              width="72"
              height="72"
            >
              <line x1="20" y1="20" x2="52" y2="52" stroke="#B8872A" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="52" y1="20" x2="20" y2="52" stroke="#B8872A" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 404 code */}
        <h1 className="font-display font-bold text-8xl md:text-9xl text-primary mb-2">
          404
        </h1>

        {/* Message */}
        <h2 className="heading-section text-primary mb-4">
          This page has gone green
        </h2>

        <p className="text-primary/70 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. But don&apos;t worry — we&apos;re still here to help you preserve, protect, and prosper.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <CtaButton>Back to Home</CtaButton>
          </Link>
          <Link href="/contact">
            <CtaButton variant="secondary">Get in Touch</CtaButton>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-card">
          <p className="text-primary/50 text-sm mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: 'Our Services', href: '/services' },
              { label: 'Projects',    href: '/projects' },
              { label: 'About Us',    href: '/about' },
              { label: 'Resources',   href: '/resources' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-secondary hover:text-primary transition-colors underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
