/**
 * lib/data/services.ts
 *
 * Single source of truth for service data used across:
 *   - app/page.tsx            (homepage service cards)
 *   - app/services/page.tsx   (services listing with bullets)
 *   - app/services/[slug]/page.tsx (full service detail page)
 *
 * When Sanity is live, replace these with getServices() / getServiceBySlug()
 * from lib/sanity.ts and delete this file.
 */

import { FileSearch, Recycle, Activity, GraduationCap, type LucideIcon } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceSummary {
  slug: string
  title: string
  description: string
  bullets: string[]
  icon: LucideIcon
  image: string
}

export interface ServiceDetail extends ServiceSummary {
  tagline: string
  summary: string
  whatYouGet: string[]
  whyItMatters: string
  howItWorks: { step: string; detail: string }[]
  addOns: string[]
  ctaLine: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const services: ServiceDetail[] = [
  {
    slug: 'environmental-impact-assessments',
    title: 'Environmental Impact Survey & Its Compliance',
    description: 'Comprehensive EIA consultancy, environmental management planning, audits, and consent management for projects of all scales.',
    bullets: [
      'Consultancy for Environmental Impact Assessment (EIA)',
      'Preparation of Environmental Management Plans (EMP)',
      'Conducting Environmental Audits',
      'Consultancy for Consent to Establish / Operate (CTE / CTO) & Compliance',
      'Inventory Works of Industrial Units / Waste / Resources',
    ],
    icon: FileSearch,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=75',
    tagline: 'Clear evidence. Confident approvals.',
    summary: 'Understanding your project\'s environmental footprint is the first step toward a smooth clearance process. Our EIA service gives you a rigorous, credible assessment — and the confidence to proceed.',
    whatYouGet: [
      'Full baseline study covering air, water, soil, ecology, and socio-economics',
      'Regulatory compliance with MoEF&CC EIA Notification 2006 and amendments',
      'Stakeholder engagement and public hearing preparation support',
      'Environmental Management Plan (EMP) with practical mitigation measures',
      'Audit-ready documentation for environmental clearance submission',
    ],
    whyItMatters: 'Regulatory delays are the single biggest cost driver on infrastructure and industrial projects in India. A well-prepared EIA reduces back-and-forth with appraisal committees, speeds up clearance timelines, and demonstrates due diligence to lenders, insurers, and investors.',
    howItWorks: [
      { step: 'Scoping', detail: 'We map your project footprint, identify applicable schedule categories, and define the Terms of Reference.' },
      { step: 'Baseline Survey', detail: 'Our field teams collect primary data across air, water, soil, noise, ecology, and socio-economic parameters.' },
      { step: 'Impact Assessment', detail: 'We predict, evaluate, and rank environmental impacts using quantitative and qualitative methods.' },
      { step: 'Report & Submission', detail: 'We prepare the EIA/EMP report and support you through the MoEF&CC/SEIAA clearance process.' },
    ],
    addOns: [
      'Rapid Environmental Assessment (REA) for time-sensitive projects',
      'EIA for linear projects (roads, pipelines)',
      'Post-clearance compliance monitoring',
      'Expert witness support for appellate proceedings',
    ],
    ctaLine: 'Let\'s map your project\'s environmental pathway',
  },
  {
    slug: 'environmental-compliance',
    title: 'Waste & Pollution Management',
    description: 'Advisory and practical solutions for waste streams, pollution control, effluent systems, and resource/energy balance.',
    bullets: [
      'Solid & Hazardous Waste Management',
      'Biomedical & E-Waste Advisory',
      'Air, Water & Noise Pollution Monitoring',
      'Water & Waste Water Management Solutions',
      'Effluent & Emission Control Planning',
      'Water / Energy / Material Balance',
    ],
    icon: Recycle,
    image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&q=75',
    tagline: 'Stay compliant. Stay operational.',
    summary: 'Non-compliance with environmental regulations can halt operations, trigger penalties, and damage reputation overnight. We build the systems and habits that keep your facility firmly on the right side of the law.',
    whatYouGet: [
      'Comprehensive compliance gap analysis against applicable Acts and Rules',
      'Consent to Establish (CTE) and Consent to Operate (CTO) application support',
      'Environmental compliance calendar and monitoring systems',
      'Preparation for State Pollution Control Board inspections and audits',
      'Training programmes for your environment, health & safety teams',
    ],
    whyItMatters: 'India\'s environmental enforcement landscape is tightening. The National Green Tribunal (NGT) has the power to shut facilities and impose unlimited fines. Proactive compliance is always cheaper than reactive remediation.',
    howItWorks: [
      { step: 'Compliance Audit', detail: 'We conduct a detailed review of your current consents, licences, and practices against statutory requirements.' },
      { step: 'Gap Report', detail: 'We deliver a prioritised gap report with clear timelines and cost estimates for each corrective action.' },
      { step: 'Implementation', detail: 'We manage permit applications, monitoring systems, and process changes on your behalf or alongside your team.' },
      { step: 'Ongoing Support', detail: 'We provide a retainer service covering monthly compliance checks, regulatory updates, and inspection readiness.' },
    ],
    addOns: [
      'NGT / court representation support',
      'Environmental Management System (ISO 14001) implementation',
      'Hazardous waste authorisation and management planning',
      'Annual environmental audit as per MoEF&CC clearance conditions',
    ],
    ctaLine: 'Let\'s review your compliance position today',
  },
  {
    slug: 'environmental-monitoring',
    title: 'Environmental Monitoring & Studies',
    description: 'Baseline studies, monitoring programmes, risk assessments, site due diligence, and environmental restoration works.',
    bullets: [
      'Baseline Environmental Studies',
      'Environmental Monitoring Programs',
      'Risk Assessment & Mitigation',
      'Site Environmental Due Diligence',
      'Landscaping and Beautification',
      'Rejuvenation of Water Bodies & Bio-remediation',
      'Any other Environmental Works',
    ],
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=75',
    tagline: 'Measure what matters.',
    summary: 'Sound environmental decisions start with accurate data. Our monitoring and studies service gives you a verified, defensible baseline and an ongoing view of your environmental performance.',
    whatYouGet: [
      'Comprehensive baseline environmental study across all relevant media',
      'Ongoing monitoring programme design and field execution',
      'Risk assessment aligned with IS/ISO standards',
      'Site environmental due diligence for acquisitions and transactions',
      'Restoration and bio-remediation planning and delivery',
    ],
    whyItMatters: 'Without reliable baseline data, you cannot demonstrate improvement, defend against regulatory action, or make credible sustainability claims. Ongoing monitoring is the backbone of any environmental management system.',
    howItWorks: [
      { step: 'Study Design', detail: 'We define sampling locations, parameters, frequency, and methods appropriate to your project and regulatory requirements.' },
      { step: 'Field Execution', detail: 'Our field teams collect samples and measurements using calibrated, NABL-accredited laboratory partners.' },
      { step: 'Analysis & Reporting', detail: 'We analyse results against applicable standards and produce clear, interpretable reports.' },
      { step: 'Ongoing Programme', detail: 'We design and manage your continuing environmental monitoring programme and maintain records for compliance.' },
    ],
    addOns: [
      'Air quality dispersion modelling',
      'Water quality trend analysis',
      'Biodiversity surveys and habitat assessments',
      'Environmental Due Diligence for M&A transactions',
    ],
    ctaLine: 'Let\'s design your environmental monitoring programme',
  },
  {
    slug: 'esg-disclosure-reporting',
    title: 'Training, Advisory & Social Responsibility',
    description: 'Capacity building, compliance training, CSR advisory, and sustainability consultancy for organisations and communities.',
    bullets: [
      'Environmental Awareness & Training Programs',
      'Regulatory Compliance Training',
      'Green Practices & Best-Use Advisory',
      'Corporate Social Responsibility',
      'Circular Economy among Rural Masses',
      'ESG Consultancy',
    ],
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=75',
    tagline: 'Build the capability. Sustain the change.',
    summary: 'Compliance is only as strong as the people who implement it. We build environmental knowledge and capability inside your organisation — from board level to plant floor.',
    whatYouGet: [
      'Customised environmental awareness and compliance training programmes',
      'ESG disclosure and BRSR reporting framework design',
      'CSR planning and programme management under Companies Act 2013',
      'Stakeholder engagement and community sustainability programmes',
      'Green practices advisory and circular economy implementation',
    ],
    whyItMatters: 'Regulatory knowledge gaps at the operational level are one of the most common causes of non-compliance. Investing in training reduces your enforcement risk, builds internal capability, and demonstrates genuine commitment to environmental responsibility.',
    howItWorks: [
      { step: 'Needs Assessment', detail: 'We assess your team\'s current environmental knowledge and identify the most critical gaps.' },
      { step: 'Programme Design', detail: 'We develop a training or advisory programme tailored to your industry, team level, and compliance obligations.' },
      { step: 'Delivery', detail: 'We deliver workshops, e-learning, and on-site sessions — with practical exercises grounded in your real operations.' },
      { step: 'Follow-up', detail: 'We provide reference materials, assessment tools, and ongoing advisory support after the programme.' },
    ],
    addOns: [
      'BRSR and ESG disclosure report preparation',
      'Science-based target setting support',
      'Community sustainability programme design',
      'Environmental induction programmes for new staff',
    ],
    ctaLine: 'Let\'s build your team\'s environmental capability',
  },
]

// Convenience: lookup by slug
export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

// Slugs in display order (used for prev/next navigation on detail pages)
export const serviceOrder = services.map((s) => s.slug)
