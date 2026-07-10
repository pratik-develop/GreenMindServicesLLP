import Image from 'next/image'
import Link from 'next/link'
import TrackedLink from '@/components/TrackedLink'
import SectionReveal from '@/components/SectionReveal'
import { services } from '@/lib/data/services'
import CtaButton from '@/components/CtaButton'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import FaqAccordion from '@/components/FaqAccordion'
import BlogCard from '@/components/BlogCard'
import ServiceCard from '@/components/ServiceCard'
import StatsGrid from '@/components/StatsGrid'
import ComplianceQuiz from '@/components/ComplianceQuiz'
import PageCta from '@/components/PageCta'

export const metadata = {
  title: 'GreenMind Services LLP — Environmental & Compliance Consultants, Guwahati',
  description: 'GreenMind Services LLP — expert environmental consultancy in Guwahati, Assam. EIA, waste & pollution management, environmental monitoring, training, and ESG consultancy for industries, institutions, and government bodies across North-east India.',
}

export default function Home() {
  const stats = [
    { value: 50,  label: 'Clients Served',        suffix: '+' },
    { value: 35,  label: 'Years Combined Exp.',    suffix: '+' },
    { value: 10,  label: 'Full-Time Team Members', suffix: ''  },
    { value: 4,   label: 'States Served',          suffix: '+' },
  ]

  const testimonials = [
    {
      quote: 'GreenMind transformed our approach to environmental compliance. Their expertise in EIA helped us navigate complex regulatory requirements with complete confidence — we secured EC clearance 3 months ahead of schedule.',
      author: 'A.K.',
      role: 'Managing Director',
      company: 'Infrastructure Developer',
      sector: 'Infrastructure · Assam',
    },
    {
      quote: 'The BRSR disclosure framework they built for us impressed our institutional investors and significantly simplified our annual ESG reporting cycle. Highly recommended for listed companies.',
      author: 'R.S.',
      role: 'Chief Financial Officer',
      company: 'Listed Manufacturing Company',
      sector: 'Manufacturing · NSE Listed',
    },
    {
      quote: 'Professional, thorough, and deeply knowledgeable. GreenMind navigated us through a complex CRZ clearance that had stalled for 18 months with another consultant. They are now our permanent environmental partner.',
      author: 'P.M.',
      role: 'Operations Head',
      company: 'Real Estate Developer',
      sector: 'Real Estate · Northeast India',
    },
  ]

  const blogPosts = [
    {
      title: 'How to create a credible net-zero strategy',
      excerpt: 'Understand what makes an environmental plan trustworthy — and how to avoid greenwashing pitfalls.',
      category: 'Strategy',
      date: 'May 11, 2024',
      slug: 'understanding-environmental-impact-assessments',
    },
    {
      title: 'Your 2025 environmental compliance checklist',
      excerpt: 'A practical, step-by-step checklist to ensure your business meets all statutory environmental obligations.',
      category: 'Reporting',
      date: 'May 4, 2024',
      slug: 'esg-reporting-trends-2024',
    },
  ]

  const faqs = [
    {
      question: 'What is an Environmental Impact Assessment (EIA)?',
      answer: 'An EIA is a systematic process that evaluates the potential environmental effects of a proposed project. It is mandatory under MoEF&CC\'s EIA Notification 2006 for many categories of industrial and infrastructure projects in India.',
    },
    {
      question: 'Why is ESG disclosure important for my business?',
      answer: 'ESG disclosure builds investor confidence, supports compliance with SEBI\'s BRSR mandate for listed companies, and is increasingly required by enterprise clients in supply chain due-diligence processes.',
    },
    {
      question: 'How long does the environmental compliance process take?',
      answer: 'It depends on the project category and complexity. A consent application typically takes 4–12 weeks; a full EIA clearance may take 6–18 months. We provide a realistic timeline at the outset of every engagement.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We work across manufacturing, real estate, infrastructure, mining, energy, agribusiness, and professional services — any sector with environmental or ESG compliance obligations.',
    },
    {
      question: 'How do I get started?',
      answer: 'Book a free initial consultation through our contact page. We\'ll review your requirements and outline a clear next step within 24 hours.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const process = [
    {
      number: '01',
      title: 'Discovery',
      detail: 'We learn your business, project scope, regulatory obligations, and timeline in a focused initial consultation.',
      icon: (
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Assessment',
      detail: 'Our consultants conduct field surveys, data analysis, and regulatory review to build a complete picture.',
      icon: (
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Strategy',
      detail: 'We develop your compliance roadmap, ESG framework, or EIA report — tailored to your needs.',
      icon: (
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Delivery',
      detail: 'We present audit-ready documentation and stay alongside you through submissions, approvals, and implementation.',
      icon: (
        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Page content wrapper — sits above the site-wide gradient wash */}
      <div className="relative z-[1]">
        {/* ── Hero — full-bleed forest image with layered gradients ──────── */}
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
          {/* Full-bleed forest background — fixed attachment so it stays static while content scrolls */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed bg-no-repeat dark:brightness-75"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/31573719/pexels-photo-31573719.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            }}
          />

          {/* Layered legibility overlays */}
          {/* Top darkening so the navbar stays readable over bright sky/sunshine */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-forest-deep/80 to-transparent dark:from-forest-deep/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/35 via-forest-deep/15 to-forest-deep/5 dark:from-forest-deep/75 dark:via-forest-deep/50 dark:to-forest-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-forest-deep/10 to-forest-deep/5 dark:from-forest-deep/65 dark:via-forest-deep/15 dark:to-forest-deep/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,_var(--tw-gradient-stops))] from-forest-deep/30 via-forest-deep/10 to-transparent dark:from-forest-deep/50 dark:via-forest-deep/20" />

          <div className="container-custom w-full relative z-10 pt-24 pb-20 md:pt-28 md:pb-24">
            <div className="max-w-2xl">
              <SectionReveal>
                <p className="inline-flex items-center gap-2 label-section text-gold-light mb-5 md:mb-6">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Guwahati, Assam · North-east India
                </p>
                <div className="bg-gradient-to-br from-forest-deep/60 to-forest-deep/30 dark:from-forest-deep/75 dark:to-forest-deep/45 backdrop-blur-md border border-cream/10 dark:border-cream/15 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl shadow-forest-deep/40">
                  <h1 className="heading-display text-cream text-shadow-hero mb-5 md:mb-6">
                    Expert Solutions for Environmental Excellence
                  </h1>
                  <p className="text-base md:text-lg xl:text-xl text-cream/90 text-shadow-soft mb-8 md:mb-10 max-w-xl leading-relaxed">
                    We combine deep domain expertise, technical advisory, and compliance support to help industries, infrastructure projects, institutions, and government bodies navigate complex environmental frameworks — with confidence.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <span className="hidden sm:inline-block">
                      <CtaButton href="/contact" eventName="cta_click" eventParams={{ location: 'homepage_hero', label: 'Book a Consultation' }}>Book a Consultation</CtaButton>
                    </span>
                    <TrackedLink
                      href="#services"
                      eventName="cta_click"
                      eventParams={{ location: 'homepage_hero', label: 'Explore our services' }}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl border border-cream/40 text-cream font-body font-semibold text-sm bg-page/5 hover:bg-page/10 transition-colors"
                    >
                      Explore our services
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </TrackedLink>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>

          {/* Floating credentials bar — full width */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <SectionReveal delay={0.2}>
              <div className="bg-gradient-to-r from-page/55 via-page/70 to-page/55 dark:from-forest-deep/55 dark:via-forest-deep/70 dark:to-forest-deep/55 backdrop-blur-lg border-t border-card/60 shadow-2xl">
                <div className="container-custom py-4 md:py-5">
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-10">
                    {[
                      { label: 'DPIIT Recognised', sub: 'Startup India' },
                      { label: 'UDYAM Registered', sub: 'MSME · Govt of India' },
                      { label: 'ISO Certified', sub: '9001 · 14001 · 29990' },
                      { label: 'MoEF&CC Compliant', sub: 'EIA Notification 2006' },
                      { label: 'NABL Lab Partners', sub: 'Accredited Analysis' },
                      { label: 'NGT Qualified', sub: 'Tribunal-Ready Reports' },
                    ].map((badge) => (
                      <div key={badge.label} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-body font-semibold text-xs text-primary dark:text-cream text-shadow-soft">{badge.label}</p>
                          <p className="text-primary/55 dark:text-cream/55 text-[10px]">{badge.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Scroll cue */}
          <div aria-hidden="true" className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <svg className="w-6 h-6 text-cream/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

      <div className="section-stack">

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="section-padding" id="services">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">Services</p>
              <h2 className="heading-section text-primary mb-4">
                What we do
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                Four integrated service areas covering every environmental need — from regulatory clearances and pollution control to monitoring, training, and ESG consultancy.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-6">
            {services.map((service, index) => (
              <SectionReveal key={service.slug} delay={index * 0.1}>
                <TrackedLink href={`/services/${service.slug}`} className="group block h-full" eventName="service_card_click" eventParams={{ slug: service.slug, title: service.title, location: 'homepage' }}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    image={service.image}
                  />
                </TrackedLink>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About strip ──────────────────────────────────────────── */}
      <section className="section-padding border-t border-card">
        <div className="container-custom">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="label-section mb-4">About</p>
                <h2 className="heading-section text-primary mb-6">
                  A professional environmental consultancy committed to sustainable development in North-east India and beyond.
                </h2>
                <p className="text-primary/65 leading-relaxed mb-8">
                  We partner with industries, institutions, and government bodies to deliver scientific and cost-effective environmental solutions — protecting natural resources for future generations.
                </p>
                <CtaButton href="/about" variant="secondary" eventName="cta_click" eventParams={{ location: 'homepage_about', label: 'Learn more about us' }}>Learn more about us</CtaButton>
              </div>
              <div className="hidden md:block relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72 bg-primary/5 mt-6 md:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=80"
                  alt="Environmental consultants at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Our Commitment ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — heading block */}
            <SectionReveal>
              <p className="label-section mb-4">Our Commitment</p>
              <h2 className="heading-section text-primary mb-6">
                Environmental responsibility and economic growth — hand in hand
              </h2>
              <p className="text-primary/60 text-base md:text-lg leading-relaxed">
                We work closely with our clients to ensure compliance today while building resilience for tomorrow — protecting natural resources and business interests at the same time.
              </p>
            </SectionReveal>

            {/* Right — three commitment pillars */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Scientifically rigorous',
                  desc: 'Every recommendation is grounded in field data, regulatory frameworks, and peer-reviewed science.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'Client-first always',
                  desc: 'We act as a trusted partner — integrating into your workflow, not just delivering reports.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Long-term stewardship',
                  desc: 'Compliance today and resilience for tomorrow — preserving natural resources for future generations.',
                },
              ].map((item, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 bg-primary/5 border border-card rounded-xl p-5">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-primary text-sm md:text-base mb-1">{item.title}</p>
                      <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">Process</p>
              <h2 className="heading-section text-primary mb-4">
                How we work
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                A clear, structured engagement — from first conversation to final deliverable.
              </p>
            </div>
          </SectionReveal>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Connector line — desktop only */}
            <div aria-hidden="true" className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-px bg-primary/10" />
            {process.map((step, index) => (
              <SectionReveal key={index} delay={index * 0.12}>
                <div className="relative card-base card-hover p-6 md:p-8 h-full flex flex-col">
                  {/* Gold badge: icon + step number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <span className="font-display font-bold text-2xl text-gold/40 leading-none select-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="heading-card text-primary mb-3">{step.title}</h3>
                  <p className="text-primary/60 text-sm md:text-base leading-relaxed flex-1">
                    {step.detail}
                  </p>
                  {/* Connecting arrow between steps on desktop */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:flex absolute top-[3.25rem] -right-3.5 z-10 items-center justify-center w-7 h-7 rounded-full bg-page border border-card">
                      <svg className="w-3 h-3 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">Benefits</p>
              <h2 className="heading-section text-primary mb-4">
                Why choose us?
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                Environmental compliance can be a confusing space. We help you cut through the noise and focus on your business.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 mb-10">
            {[
              {
                title: 'Experienced Environmental Professionals',
                desc: 'Led by former Director & senior scientists from the Central Pollution Control Board (CPCB) and Assam Pollution Control Board — regulatory insight and scientific credibility that few consultancies can match.',
              },
              {
                title: 'Practical and Compliant Solutions',
                desc: 'We solve mission-critical environmental compliance challenges — real clearances, real consents, real results. Actionable strategies that work for your business, not just on paper.',
              },
              {
                title: 'Industry-Focused Consultancy Approach',
                desc: 'A diversified service model serving manufacturing, infrastructure, healthcare, educational institutions, government bodies, agriculture, and MSMEs across the region.',
              },
              {
                title: 'Timely Project Execution',
                desc: 'Compliance planning integrated early into your project workflow — reducing regulatory delays, protecting timelines, and keeping your operations on schedule.',
              },
              {
                title: 'Commitment to Sustainability and Ethics',
                desc: 'We are building category leadership in Assam and the North East — a region where quality environmental advisory has historically been limited and demand is growing rapidly.',
              },
            ].map((item, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="card-base card-hover h-full p-5 md:p-6 xl:p-5 bg-page/70">
                  <h3 className="heading-card text-primary text-lg sm:text-xl md:text-xl mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* ── Compliance Quiz ── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-2xl mb-8">
              <p className="label-section mb-3">Quick Assessment</p>
              <h2 className="heading-section text-primary mb-3">Is your business fully compliant?</h2>
              <p className="text-primary/60 text-base leading-relaxed">
                Answer 5 quick questions to get a personalised compliance risk summary and a list of recommended services.
              </p>
            </div>
          </SectionReveal>
          <ComplianceQuiz />
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">Testimonials</p>
              <h2 className="heading-section text-primary mb-4">
                What our clients say
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                Environmental compliance is a long-term commitment — so we build lasting relationships to match.
              </p>
            </div>
          </SectionReveal>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── Blog Preview ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">Resources</p>
              <h2 className="heading-section text-primary mb-4">
                Latest insights
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                Research and insights for forward-thinking businesses.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-stretch">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} delay={index * 0.1} />
            ))}
          </div>
          <SectionReveal>
            <a
              href="/resources"
              className="inline-flex items-center min-h-[44px] text-primary hover:text-secondary font-body font-medium transition-colors"
            >
              View all articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </SectionReveal>
        </div>
      </section>

      </div>{/* end .section-stack */}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-page/55 backdrop-blur-sm">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-6 md:mb-8">
              <p className="label-section mb-4">FAQ</p>
              <h2 className="heading-section text-primary mb-4">
                Frequently asked questions
              </h2>
              <p className="text-primary/65 max-w-2xl leading-relaxed">
                Here are the questions our clients ask most before getting started.
              </p>
            </div>
          </SectionReveal>
          <div className="max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to Preserve · Protect · Prosper?"
        description="Book a free consultation to speak with an environmental expert and discuss your goals. We'll outline a clear next step within 24 hours."
        buttonText="Book a Consultation"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      </div>{/* end content wrapper */}
    </>
  )
}
