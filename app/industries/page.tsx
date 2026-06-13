'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import PageCta from '@/components/PageCta'
import { Factory, Hammer, HeartPulse, Wheat, Landmark, Store } from 'lucide-react'

const industries = [
  {
    icon: Factory,
    title: 'Manufacturing & Industrial Units',
    description: 'Environmental compliance and pollution control for manufacturing facilities — from CTE/CTO consents to waste management and emission monitoring.',
    services: ['Environmental Impact Assessment', 'Consent to Establish / Operate', 'Pollution Monitoring', 'Hazardous Waste Management'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=75',
    regulation: 'Environment Protection Act 1986 · Hazardous Waste Rules 2016',
    contactHint: 'Non-compliance can trigger NGT shutdown orders within 7 days.',
  },
  {
    icon: Hammer,
    title: 'Infrastructure & Construction',
    description: 'End-to-end environmental planning for infrastructure and construction projects, ensuring clearances and minimising project delays.',
    services: ['EIA for Infrastructure Projects', 'Environmental Management Plans', 'Site Due Diligence', 'Compliance Monitoring'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=75',
    regulation: 'EIA Notification 2006 · CRZ Notification 2019',
    contactHint: 'MoEF&CC clearance required before any ground-breaking activity.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Educational Institutions',
    description: 'Specialised environmental advisory for hospitals and educational institutions, including biomedical waste management and regulatory compliance.',
    services: ['Biomedical Waste Advisory', 'Environmental Audits', 'Consent Management', 'Training & Awareness Programs'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75',
    regulation: 'BMW Management & Handling Rules 2016 · CPCB Guidelines',
    contactHint: 'All healthcare facilities must hold valid BMW authorisation annually.',
  },
  {
    icon: Wheat,
    title: 'Agriculture & Allied Sectors',
    description: 'Sustainable environmental solutions for agribusiness and allied sectors — land use assessment, water management, and eco-friendly practices.',
    services: ['Baseline Environmental Studies', 'Water & Waste Management', 'Green Practices Advisory', 'Environmental Monitoring'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=75',
    regulation: 'National Water Policy · Wetland Conservation Rules 2017',
    contactHint: 'Agro-processing units above threshold capacity need EC clearance.',
  },
  {
    icon: Landmark,
    title: 'Government & Public Sector',
    description: 'Environmental advisory and compliance support for government agencies, public bodies, and publicly funded infrastructure projects.',
    services: ['EIA for Public Projects', 'Regulatory Compliance', 'Environmental Monitoring', 'Capacity Building & Training'],
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=75',
    regulation: 'MoEF&CC Notification 2006 · Forest Conservation Act 1980',
    contactHint: 'Public projects are subject to enhanced scrutiny and public hearings.',
  },
  {
    icon: Store,
    title: 'Micro, Small & Medium Enterprises',
    description: 'Accessible, cost-effective environmental compliance support tailored for MSMEs navigating complex regulatory requirements.',
    services: ['Compliance Gap Analysis', 'CTE / CTO Support', 'Pollution Control Advisory', 'ESG Consultancy'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75',
    regulation: 'MSME Development Act · State PCB Rules',
    contactHint: 'Many MSMEs unknowingly operate without valid CTO — a curable risk.',
  },
]

export default function Industries() {
  const [expandedCards, setExpandedCards] = useState<number[]>([])
  const toggleCard = (i: number) => setExpandedCards(prev =>
    prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
  )

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">Industries</p>
              <h1 className="heading-display text-forest-deep mb-4 md:mb-6">
                Industries We Serve
              </h1>
              <p className="text-base md:text-xl text-forest-deep/65 max-w-2xl leading-relaxed">
                Scientific and cost-effective environmental solutions tailored to the compliance needs of six key sectors across North-east India and beyond.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80 mt-4 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80"
                  alt="Industrial facility with environmental monitoring"
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

      {/* Industries Grid */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <SectionReveal key={industry.title} delay={index * 0.1}>
                <div className="card-base card-hover h-full flex flex-col overflow-hidden">
                  {/* Image banner with icon overlay */}
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-forest-deep/20 to-transparent" />
                    {/* Icon badge bottom-left */}
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-cream/15 backdrop-blur-sm border border-cream/25 flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-cream" />
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="heading-card text-forest-deep mb-3">
                      {industry.title}
                    </h3>
                    <p className="text-forest-deep/60 text-sm md:text-base leading-relaxed mb-5 flex-1">
                      {industry.description}
                    </p>
                    <div className="border-t border-forest-deep/8 pt-4">
                      <p className="text-xs font-body font-semibold text-forest-deep/40 uppercase tracking-wider mb-3">Key Services</p>
                      <ul className="space-y-1.5">
                        {industry.services.map((service) => (
                          <li key={service} className="flex items-center gap-2.5 text-sm text-forest-deep/65">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 flex-shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => toggleCard(index)}
                      className="md:hidden mt-3 flex items-center gap-1.5 text-xs text-forest-mid font-body font-semibold hover:text-forest-deep transition-colors"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${expandedCards.includes(index) ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {expandedCards.includes(index) ? 'Hide compliance details' : 'See compliance details'}
                    </button>
                    <div className={`${expandedCards.includes(index) ? 'block' : 'hidden'} md:block`}>
                      <div className="mt-4 pt-3 border-t border-forest-deep/8">
                        <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-forest-deep/35 mb-1">Key Regulation</p>
                        <p className="text-xs text-forest-mid/80 font-body">{industry.regulation}</p>
                      </div>
                      <div className="mt-3 flex items-start gap-2 bg-gold/6 border border-gold/15 rounded-lg px-3 py-2">
                        <svg className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-[11px] text-forest-deep/60 leading-relaxed">{industry.contactHint}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCta
        label="Get in touch"
        title="Need industry-specific environmental support?"
        description="Our consultants understand the regulatory and operational realities of your sector. Let us help you navigate compliance, reduce risk, and grow responsibly."
        buttonText="Discuss Your Requirements"
      />
    </>
  )
}
