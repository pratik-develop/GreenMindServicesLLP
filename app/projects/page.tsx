import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import PageCta from '@/components/PageCta'
import ForestBackground from '@/components/ForestBackground'
import { MapPin, Calendar, CheckCircle } from 'lucide-react'
import { getProjects, urlFor, type SanityProject } from '@/lib/sanity'

export const metadata = {
  title: 'Projects — GreenMind Services LLP',
  description: 'A portfolio of environmental impact assessments, ESG consultancy, and compliance work delivered across Northeast India and beyond.',
}

// ─── Fallback data (shown when Sanity project ID is not yet configured) ────────
const FALLBACK_PROJECTS = [
  {
    _id: 'f1',
    title: 'Northeast Industrial Park Development',
    slug: { current: 'northeast-industrial-park' },
    sector: 'Industrial Infrastructure',
    showClientName: false,
    anonymizedAlias: 'Confidential Manufacturing Client',
    location: 'Assam, India',
    date: '2023',
    status: 'completed' as const,
    featured: true,
    description: 'Comprehensive Environmental Impact Assessment for a 500-acre industrial park development, including biodiversity assessment, hydrological studies, and sustainable development planning.',
    outcome: [
      'Environmental clearance obtained from Ministry of Environment',
      'Sustainable development framework implemented',
      'Biodiversity conservation plan established',
    ],
    featuredImage: undefined,
    services: ['Environmental Impact Assessment'],
  },
  {
    _id: 'f2',
    title: 'Solar Power Plant Environmental Assessment',
    slug: { current: 'solar-power-plant' },
    sector: 'Energy & Power',
    showClientName: false,
    anonymizedAlias: 'Leading Renewable Energy Company',
    location: 'Gujarat, India',
    date: '2023',
    status: 'completed' as const,
    featured: true,
    description: 'Environmental and social impact assessment for a 200MW solar power plant, including land use assessment and community engagement.',
    outcome: [
      'Environmental clearance secured',
      'Community development program initiated',
      'Sustainable land use practices implemented',
    ],
    featuredImage: undefined,
    services: ['Environmental Impact Assessment'],
  },
  {
    _id: 'f3',
    title: 'Highway Expansion EIA Study',
    slug: { current: 'highway-expansion' },
    sector: 'Transportation',
    showClientName: false,
    anonymizedAlias: 'National Highway Authority',
    location: 'Multiple States, India',
    date: '2022',
    status: 'completed' as const,
    featured: false,
    description: 'Strategic environmental assessment for highway expansion project covering 300km across multiple ecologically sensitive zones.',
    outcome: [
      'Environmental clearance obtained',
      'Wildlife crossing structures designed',
      'Compensatory afforestation plan approved',
    ],
    featuredImage: undefined,
    services: ['Environmental Impact Assessment'],
  },
  {
    _id: 'f4',
    title: 'Pharmaceutical Manufacturing Unit',
    slug: { current: 'pharma-manufacturing' },
    sector: 'Manufacturing',
    showClientName: false,
    anonymizedAlias: 'Leading Pharma Company',
    location: 'Goa, India',
    date: '2022',
    status: 'completed' as const,
    featured: false,
    description: 'Environmental compliance assessment and pollution control system design for pharmaceutical manufacturing facility.',
    outcome: [
      'Consent to operate granted',
      'Zero liquid discharge system implemented',
      'Air pollution control systems optimized',
    ],
    featuredImage: undefined,
    services: ['Environmental Compliance'],
  },
  {
    _id: 'f5',
    title: 'Coastal Tourism Development',
    slug: { current: 'coastal-tourism' },
    sector: 'Real Estate & Tourism',
    showClientName: false,
    anonymizedAlias: 'Hospitality Group',
    location: 'Kerala, India',
    date: '2021',
    status: 'completed' as const,
    featured: false,
    description: 'Coastal regulation zone assessment and sustainable tourism development plan for beach resort project.',
    outcome: [
      'CRZ clearance obtained',
      'Sustainable tourism practices implemented',
      'Marine conservation program established',
    ],
    featuredImage: undefined,
    services: ['Environmental Impact Assessment', 'Regulatory Consulting'],
  },
  {
    _id: 'f6',
    title: 'Agro-processing Complex',
    slug: { current: 'agro-processing' },
    sector: 'Agriculture & Food Processing',
    showClientName: false,
    anonymizedAlias: 'Agro-industrial Consortium',
    location: 'Maharashtra, India',
    date: '2021',
    status: 'completed' as const,
    featured: false,
    description: 'Environmental assessment for integrated agro-processing complex with waste management and sustainable practices.',
    outcome: [
      'Environmental clearance secured',
      'Zero waste processing system designed',
      'Sustainable sourcing framework developed',
    ],
    featuredImage: undefined,
    services: ['Environmental Compliance', 'Sustainability Strategy'],
  },
]

function clientLabel(p: SanityProject) {
  return p.showClientName && p.clientName ? p.clientName : (p.anonymizedAlias || 'Confidential Client')
}

function ProjectCard({ project, featured = false }: { project: SanityProject; featured?: boolean }) {
  const imgSrc = project.featuredImage
    ? urlFor(project.featuredImage).width(featured ? 800 : 600).height(featured ? 400 : 300).fit('crop').url()
    : null

  if (featured) {
    return (
      <div className="card-base overflow-hidden">
        {imgSrc ? (
          <>
            <div className="relative h-52 overflow-hidden">
              <Image src={imgSrc} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
          </>
        ) : (
          <div className="h-48 bg-gradient-to-br from-secondary/10 to-primary/5 flex items-center justify-center border-b border-card">
            <svg className="w-16 h-16 text-secondary/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="px-3 py-1 bg-sage/10 text-secondary rounded-full text-xs font-body font-semibold">
              {project.sector}
            </span>
            <span className="flex items-center text-xs text-primary/50 font-body gap-1">
              <Calendar className="w-3.5 h-3.5" />{project.date}
            </span>
          </div>
          <h3 className="heading-card text-primary mb-3">{project.title}</h3>
          <div className="flex items-center text-sm text-primary/55 font-body mb-4 gap-1.5">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors hover:underline"
            >
              {project.location}
            </a>
          </div>
          <p className="text-primary/65 text-sm md:text-base leading-relaxed mb-5">{project.description}</p>
          {project.outcome?.length > 0 && (
            <ul className="space-y-2 mb-5">
              {project.outcome.slice(0, 3).map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-primary/65">
                  <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />{o}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-primary/40 font-body">Client: {clientLabel(project)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-base card-hover overflow-hidden h-full flex flex-col">
      {imgSrc && (
        <div className="relative h-40 overflow-hidden">
          <Image src={imgSrc} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
          <span className="px-2 py-0.5 bg-sage/10 text-secondary rounded-full text-xs font-body font-semibold">
            {project.sector}
          </span>
          <span className="flex items-center text-xs text-primary/45 gap-1">
            <Calendar className="w-3 h-3" />{project.date}
          </span>
        </div>
        <h3 className="font-display font-semibold text-base md:text-lg text-primary mb-2">{project.title}</h3>
        <div className="flex items-center text-xs text-primary/50 mb-3 gap-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors hover:underline"
          >
            {project.location}
          </a>
        </div>
        <p className="text-primary/60 text-sm leading-relaxed flex-1">{project.description}</p>
      </div>
    </div>
  )
}

export default async function Projects() {
  // Fetch from Sanity; fall back to hardcoded data if not yet configured
  let projects: SanityProject[] = []
  const isConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

  if (isConfigured) {
    try {
      projects = await getProjects()
    } catch {
      projects = FALLBACK_PROJECTS as SanityProject[]
    }
  } else {
    projects = FALLBACK_PROJECTS as SanityProject[]
  }

  const featured = projects.filter(p => p.featured)
  const others   = projects.filter(p => !p.featured)

  const sectors = Array.from(new Set(projects.map(p => p.sector))).sort()

  return (
    <>
      {/* ── Hero ── */}
      <section className="section-padding pt-32 relative overflow-hidden">
        <ForestBackground variant="ken" overlay="dark" scene="aerial" />
        <div className="container-custom relative z-10">
          <SectionReveal>
            <p className="label-section mb-4 text-gold/80">Our Work</p>
            <h1 className="heading-display text-cream mb-4 md:mb-6">
              Projects
            </h1>
            <p className="text-cream/70 text-base md:text-xl max-w-2xl leading-relaxed">
              A portfolio of environmental impact assessments, compliance work, and sustainability consultancy delivered across Northeast India and beyond.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionReveal>
              <div className="mb-10 md:mb-14">
                <p className="label-section mb-4">Highlighted work</p>
                <h2 className="heading-section text-primary mb-4">Featured projects</h2>
                <p className="text-primary/65 max-w-2xl leading-relaxed">
                  Select engagements that reflect the breadth and depth of our consultancy work.
                </p>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featured.map((p, i) => (
                <SectionReveal key={p._id} delay={i * 0.1}>
                  <ProjectCard project={p} featured />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All projects ── */}
      {others.length > 0 && (
        <section className="section-padding bg-primary/5">
          <div className="container-custom">
            <SectionReveal>
              <div className="mb-10">
                <p className="label-section mb-4">Full portfolio</p>
                <h2 className="heading-section text-primary mb-4">More projects</h2>
                {sectors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {sectors.map(s => (
                      <span key={s} className="px-3 py-1 bg-page-elevated border border-card text-primary/65 rounded-full text-xs font-body">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {others.map((p, i) => (
                <SectionReveal key={p._id} delay={i * 0.08} className="h-full">
                  <ProjectCard project={p} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <PageCta
        title="Have a project in mind?"
        description="Tell us about your requirements and we'll outline a clear path to environmental clearance."
        buttonText="Start a Conversation"
      />
    </>
  )
}
