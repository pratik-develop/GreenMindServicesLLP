import SectionReveal from '@/components/SectionReveal'
import PageCta from '@/components/PageCta'
import ForestBackground from '@/components/ForestBackground'
import StatsGrid from '@/components/StatsGrid'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { Building2, Award, Users, TrendingUp } from 'lucide-react'

const clientCategories = [
  {
    icon: Building2,
    title: 'Manufacturing & Industrial Units',
    description: 'We serve manufacturing facilities across Northeast India needing CTO management, ETP commissioning, pollution monitoring, and compliance audits.',
    clients: [
      'Pharmaceutical manufacturers (CTO & ETP support)',
      'Agro-processing units (EIA & waste management)',
      'Food & beverage facilities (consent management)',
      'Textile & garment units (effluent compliance)',
    ]
  },
  {
    icon: Users,
    title: 'Healthcare & Institutional',
    description: 'Hospitals, clinics, and educational institutions requiring biomedical waste authorisation and environmental compliance.',
    clients: [
      'Pridhiram Hospital, Assam',
      'Multi-specialty hospitals (BMW authorisation)',
      'Medical colleges (environmental compliance)',
      'Diagnostic centres (CPCB authorisation)',
    ]
  },
  {
    icon: TrendingUp,
    title: 'Infrastructure & Real Estate',
    description: 'Infrastructure developers and real estate projects needing EIA, CRZ clearances, and environmental management plans.',
    clients: [
      'Industrial park developers (full EIA)',
      'Solar energy project developers',
      'Highway and road project contractors',
      'Real estate developers (CRZ & EC clearance)',
    ]
  },
  {
    icon: Award,
    title: 'Government & Agribusiness',
    description: 'Government bodies and agribusiness firms seeking environmental compliance, monitoring programmes, and ESG advisory.',
    clients: [
      'Krishnav Agro, Assam',
      'Government infrastructure projects',
      'Agricultural processing cooperatives',
      'Public sector environmental programmes',
    ]
  }
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

export default function Clients() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden text-cream">
        <ForestBackground variant="ken" overlay="dark" scene="canopy" />
        <div className="relative z-10 container-custom section-padding">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="label-section mb-4">Our Clients</p>
              <h1 className="heading-display text-cream mb-6 tracking-tight">
                Our Valued Clients
              </h1>
              <p className="text-xl md:text-2xl text-cream/90 font-body max-w-3xl mx-auto leading-relaxed">
                Trusted by leading organizations across sectors for environmental excellence and sustainable growth.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <StatsGrid
            stats={[
              { value: 50, label: 'Clients Served',           suffix: '+' },
              { value: 35, label: 'Years Combined Experience', suffix: '+' },
              { value: 10, label: 'Full-Time Team Members' },
              { value: 4,  label: 'States Served',            suffix: '+' },
            ]}
          />
        </div>
      </section>

      {/* Client Categories */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="label-section mb-4">Client Segments</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Client Segments
              </h2>
              <p className="text-lg text-forest-deep/65 font-body max-w-2xl mx-auto">
                Serving diverse organizations with tailored environmental solutions across multiple sectors.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {clientCategories.map((category, index) => (
              <SectionReveal key={category.title} delay={index * 0.1}>
                <div className="card-base card-hover p-6 md:p-8 h-full">
                  <div className="w-16 h-16 bg-forest-mid/10 rounded-2xl flex items-center justify-center mb-6">
                    <category.icon className="w-8 h-8 text-forest-mid" />
                  </div>
                  <h3 className="heading-card text-forest-deep mb-3">
                    {category.title}
                  </h3>
                  <p className="text-forest-deep/65 font-body mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-forest-deep font-body mb-3">Key Clients:</h4>
                    <ul className="space-y-1">
                      {category.clients.map((client) => (
                        <li key={client} className="flex items-center text-sm text-forest-deep/65 font-body">
                          <div className="w-1.5 h-1 bg-gold rounded-full mr-3" />
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="label-section mb-4">What Our Clients Say</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Client Testimonials
              </h2>
              <p className="text-lg text-forest-deep/65 font-body max-w-2xl mx-auto">
                Hear what our clients have to say about their experience working with GreenMind.
              </p>
            </div>
          </SectionReveal>

          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCta
        title="Join Our Growing Family of Satisfied Clients"
        description="Experience the GreenMind difference and let us help you achieve your environmental and sustainability goals."
        buttonText="Become a Client"
      />
    </>
  )
}
