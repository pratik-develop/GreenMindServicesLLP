import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import CtaButton from '@/components/CtaButton'
import PageCta from '@/components/PageCta'
import Link from 'next/link'
import TrackedLink from '@/components/TrackedLink'
import { notFound } from 'next/navigation'
import { serviceBySlug, serviceOrder } from '@/lib/data/services'

// All service data lives in lib/data/services.ts — imported above as serviceBySlug / serviceOrder.

export async function generateStaticParams() {
  return serviceOrder.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = serviceBySlug[params.slug]
  if (!service) return {}
  return {
    title: `${service.title} — GreenMind Services LLP`,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceBySlug[params.slug]
  if (!service) notFound()

  const currentIndex = serviceOrder.indexOf(params.slug)
  const nextSlug = serviceOrder[(currentIndex + 1) % serviceOrder.length]
  const nextService = serviceBySlug[nextSlug]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-end pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover origin-center forest-bg-ken"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/60 to-forest-deep/20" />
        </div>
        <div className="container-custom relative z-10">
          <SectionReveal>
            <Link
              href="/services"
              className="inline-flex items-center text-cream/70 hover:text-cream text-sm mb-8 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All services
            </Link>
            <p className="text-cream/60 text-sm font-body uppercase tracking-widest mb-4">Service</p>
            <h1 className="heading-display text-cream mb-3 md:mb-4 max-w-3xl">
              {service.title}
            </h1>
            <p className="text-cream/80 text-xl md:text-2xl font-display italic">
              {service.tagline}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <div className="container-custom pt-6 pb-2">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-forest-deep/50 hover:text-forest-mid transition-colors font-body">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Services
        </Link>
      </div>

      {/* ── Summary ──────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-16">
              <SectionReveal>
                <p className="text-xl md:text-2xl text-forest-deep/80 leading-relaxed font-display">
                  {service.summary}
                </p>
              </SectionReveal>

              {/* What you get */}
              <SectionReveal>
                <h2 className="heading-section text-forest-deep mb-6">
                  What you get
                </h2>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {service.whatYouGet.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 md:gap-4">
                      {/* Gold tick badge */}
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/25 text-gold flex-shrink-0 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-forest-deep/75 text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionReveal>

              {/* Why it matters */}
              <SectionReveal>
                <h2 className="heading-section text-forest-deep mb-6">
                  Why it matters
                </h2>
                <p className="text-forest-deep/75 leading-relaxed text-lg">
                  {service.whyItMatters}
                </p>
              </SectionReveal>

              {/* How it works */}
              <SectionReveal>
                <h2 className="heading-section text-forest-deep mb-6">
                  How it works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {service.howItWorks.map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-xl bg-forest-deep/4 border border-forest-deep/8">
                      <div className="w-9 h-9 rounded-full bg-forest-mid/15 border border-forest-mid/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="font-display font-bold text-sm text-forest-mid">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-forest-deep text-base mb-1">{item.step}</p>
                        <p className="text-forest-deep/65 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Add-ons */}
              <SectionReveal>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-forest-deep mb-6">
                  Optional add-ons
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.addOns.map((addon, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-deep/6 border border-forest-deep/12 rounded-full text-sm text-forest-deep/75 font-body">
                      <svg className="w-3.5 h-3.5 text-forest-mid flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      {addon}
                    </span>
                  ))}
                </div>
              </SectionReveal>
            </div>

            {/* Sticky sidebar CTA */}
            <div className="lg:col-span-1">
              <SectionReveal delay={0.2}>
                {/* Sticky only on lg+; on mobile it flows naturally */}
                <div className="lg:sticky lg:top-28 bg-cream border border-forest-deep/10 rounded-2xl p-5 md:p-8 shadow-sm">
                  <h3 className="font-display font-semibold text-xl text-forest-deep mb-3">
                    {service.ctaLine}
                  </h3>
                  <p className="text-forest-deep/60 text-sm mb-6 leading-relaxed">
                    Book a free initial consultation. We&apos;ll review your requirements and outline a clear next step within 24 hours.
                  </p>
                  <CtaButton href="/contact" size="lg" eventName="cta_click" eventParams={{ location: 'service_sidebar', label: 'Book a Consultation', service: service.title }}>
                    Book a Consultation
                  </CtaButton>
                  <p className="text-xs text-forest-deep/40 mt-4 text-center">
                    Free · No obligation · 24 hr response
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Next service ─────────────────────────────────────────── */}
      <section className="border-t border-forest-deep/10">
        <TrackedLink href={`/services/${nextSlug}`} className="group block" eventName="next_service_click" eventParams={{ from: service.title, to: nextService.title, slug: nextSlug }}>
          <div className="container-custom py-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-body font-medium text-forest-deep/40 uppercase tracking-widest mb-1">Next service</p>
              <p className="font-display font-semibold text-xl md:text-2xl text-forest-deep group-hover:text-forest-mid transition-colors">
                {nextService.title}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border border-forest-deep/20 flex items-center justify-center group-hover:bg-forest-mid group-hover:border-forest-mid transition-all">
              <svg className="w-5 h-5 text-forest-deep group-hover:text-cream transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </TrackedLink>
      </section>

      {/* ── CTA ── */}
      <PageCta
        title="Ready to get started?"
        description={`Book a free consultation to discuss your ${service.title.toLowerCase()} requirements and receive a tailored proposal within 48 hours.`}
        buttonText="Book a Consultation"
      />
    </>
  )
}
