'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import BlogCard from '@/components/BlogCard'
import CtaButton from '@/components/CtaButton'
import PageCta from '@/components/PageCta'

const blogPosts = [
  {
    title: 'How to Create a Credible Net-Zero Strategy',
    excerpt: 'Understand what makes an environmental plan trustworthy — and how to avoid greenwashing pitfalls that undermine stakeholder confidence.',
    category: 'Strategy',
    date: 'May 11, 2024',
    slug: 'net-zero-strategy-guide',
  },
  {
    title: 'Your 2025 Environmental Compliance Checklist',
    excerpt: 'A practical, step-by-step checklist to ensure your business meets all statutory environmental obligations before year-end.',
    category: 'Reporting',
    date: 'May 4, 2024',
    slug: 'environmental-compliance-checklist-2025',
  },
  {
    title: 'ESG Disclosure vs. Green Hype',
    excerpt: 'Understand the difference between genuine ESG disclosure and performative sustainability communications — and why it matters to investors.',
    category: 'Communication',
    date: 'Mar 16, 2024',
    slug: 'esg-disclosure-vs-green-hype',
  },
  {
    title: '7 Signs Your Business Is Ready for an EIA',
    excerpt: 'Key indicators that your project may require a formal Environmental Impact Assessment under MoEF&CC guidelines.',
    category: 'Measurement',
    date: 'Apr 6, 2024',
    slug: 'understanding-environmental-impact-assessments',
  },
  {
    title: 'Carbon Footprinting 101',
    excerpt: 'Learn the fundamentals of carbon accounting — from Scope 1, 2, and 3 emissions to setting science-based reduction targets.',
    category: 'Guide',
    date: 'Dec 20, 2023',
    slug: 'carbon-footprinting-101',
  },
  {
    title: 'The Business Case for Sustainability',
    excerpt: 'Sustainability is a strategic imperative. Discover how environmental leadership drives competitive advantage and long-term value.',
    category: 'Strategy',
    date: 'Dec 15, 2023',
    slug: 'esg-reporting-trends-2024',
  },
  {
    title: 'How to Get a CTO in Assam: Step-by-Step',
    excerpt: 'A complete walkthrough of the Assam Pollution Control Board CTO application process — eligibility, documents, and timelines.',
    category: 'Compliance',
    date: 'Mar 12, 2025',
    slug: 'how-to-get-cto-in-assam',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  },
  {
    title: 'BRSR Reporting Requirements 2025',
    excerpt: "SEBI's BRSR Core is now mandatory for top-1000 listed companies. Here's what you must disclose and how to prepare.",
    category: 'Reporting',
    date: 'Feb 3, 2025',
    slug: 'brsr-reporting-requirements-2025',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80',
  },
  {
    title: 'Waste Management Rules in India: A Practical Guide',
    excerpt: 'Solid, hazardous, biomedical, e-waste, and plastic waste rules — explained for Indian businesses.',
    category: 'Compliance',
    date: 'Jan 20, 2025',
    slug: 'waste-management-rules-india',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
  },
  {
    title: 'EIA Notification 2006 Explained',
    excerpt: 'A plain-language breakdown of which projects need environmental clearance, at what level, and how long it takes.',
    category: 'Guide',
    date: 'Dec 10, 2024',
    slug: 'eia-notification-2006-guide',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
  },
  {
    title: 'Environmental Audit: 10 Things an Inspector Checks',
    excerpt: 'Prepare for a PCB inspection with this practical checklist of the 10 documents and systems every facility must have ready.',
    category: 'Guide',
    date: 'Nov 28, 2024',
    slug: 'environmental-audit-checklist',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
  },
  {
    title: 'Carbon Footprinting for MSMEs',
    excerpt: "You don't need a large team to start measuring your carbon footprint. A practical, jargon-free guide for Indian businesses.",
    category: 'Guide',
    date: 'Oct 15, 2024',
    slug: 'carbon-footprinting-for-msmes',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=80',
  },
]

const categories = ['All', 'Strategy', 'Reporting', 'Compliance', 'Communication', 'Measurement', 'Guide']

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory)
  const featured = blogPosts[0]
  const visiblePosts = showAll ? filtered.slice(1) : filtered.slice(1, 9)

  return (
    <>
      {/* ── Hero ── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">Research &amp; insights</p>
              <h1 className="heading-display text-forest-deep mb-4 md:mb-6">
                The GreenMind Blog
              </h1>
              <p className="text-base md:text-xl text-forest-deep/65 max-w-2xl leading-relaxed">
                Practical research and insights on environmental compliance, ESG reporting, and sustainable business strategy — written for Indian industries and institutions.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80 mt-4 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80"
                  alt="Environmental research and insights"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/30 to-transparent" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Category chips ── */}
      <section className="py-6 md:py-8">
        <div className="container-custom">
          <SectionReveal>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all min-h-[36px] border ${
                    activeCategory === cat
                      ? 'bg-forest-mid text-cream border-forest-mid shadow-sm'
                      : 'bg-white/60 text-forest-deep/70 border-forest-deep/15 hover:border-forest-mid hover:text-forest-mid'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section className="section-padding-tight">
        <div className="container-custom">
          <SectionReveal>
            <BlogCard {...featured} delay={0} featured />
          </SectionReveal>
        </div>
      </section>

      {/* ── Rest of posts ── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post, index) => (
              <BlogCard key={post.slug + index} {...post} delay={index * 0.07} />
            ))}
          </div>
          {!showAll && filtered.slice(1).length > 8 && (
            <div className="text-center mt-8">
              <CtaButton onClick={() => setShowAll(true)} variant="secondary">
                Load more articles ({filtered.slice(1).length - 8} more)
              </CtaButton>
            </div>
          )}
        </div>
      </section>

      {/* ── Lead Magnet ── */}
      <section className="py-10 md:py-12">
        <div className="container-custom">
          <SectionReveal>
            <div className="rounded-2xl bg-gradient-to-br from-forest-deep to-forest-mid p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              {/* Left */}
              <div className="flex-1">
                <p className="text-gold/80 font-body font-semibold text-xs uppercase tracking-wider mb-3">Free Download</p>
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-cream mb-3 leading-snug">
                  Environmental Compliance<br className="hidden md:block" /> Checklist for Indian Businesses
                </h3>
                <p className="text-cream/65 text-sm md:text-base leading-relaxed mb-5 max-w-md">
                  A 2-page PDF covering the key consents, permits, and reporting obligations every Indian business must have in place — and the consequences of missing them.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'CTE / CTO requirements by industry category',
                    'EIA Schedule categories and EC triggers',
                    'BRSR reporting obligations for listed companies',
                    'Biomedical and hazardous waste authorisations',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-cream/75 text-sm">
                      <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact?ref=checklist"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-forest-deep font-body font-semibold text-sm rounded-xl hover:bg-cream/90 transition-colors min-h-[44px] shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Request Free Checklist
                </a>
              </div>
              {/* Right — decorative */}
              <div className="hidden md:flex flex-col items-center justify-center w-48 flex-shrink-0">
                <div className="w-36 h-48 rounded-2xl bg-cream/8 border border-cream/15 flex flex-col items-center justify-center gap-3 shadow-2xl">
                  <svg className="w-12 h-12 text-cream/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="text-center px-4">
                    <p className="text-cream/50 text-xs font-body leading-tight">Compliance Checklist</p>
                    <p className="text-cream/25 text-[10px] mt-1">PDF · 2 pages</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCta
        title="Ready to Preserve · Protect · Prosper?"
        description="Book a free consultation to speak with an environmental expert and discuss your goals."
        buttonText="Book a Consultation"
      />
    </>
  )
}
