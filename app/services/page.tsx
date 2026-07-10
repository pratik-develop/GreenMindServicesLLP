import Image from 'next/image'
import TrackedLink from '@/components/TrackedLink'
import SectionReveal from '@/components/SectionReveal'
import PageCta from '@/components/PageCta'
import { services } from '@/lib/data/services'

export const metadata = {
  title: 'Services — GreenMind Services LLP',
  description: 'Environmental Impact Surveys, Waste & Pollution Management, Environmental Monitoring, Training and ESG Consultancy — tailored for Indian businesses.',
}

export default function Services() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">Services</p>
              <h1 className="heading-display text-primary mb-4 md:mb-6">
                Our Services
              </h1>
              <p className="text-base md:text-xl text-primary/65 max-w-2xl leading-relaxed">
                Four integrated service areas delivering scientific and cost-effective environmental solutions — from regulatory clearances and pollution control to monitoring studies, training, and ESG consultancy.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80 mt-4 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
                  alt="Environmental scientist conducting field assessment"
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

      {/* ── Services Grid ── */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <SectionReveal key={service.slug} delay={index * 0.1}>
                <TrackedLink href={`/services/${service.slug}`} className="group block h-full" eventName="service_card_click" eventParams={{ slug: service.slug, title: service.title }}>
                <div className="card-base card-hover p-6 md:p-8 h-full flex flex-col">
                  {/* Icon + number row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/12 to-secondary/4 border border-secondary/12 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-secondary" strokeWidth={1.75} />
                    </div>
                    <span className="font-display font-bold text-2xl text-gold/35 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="heading-card text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  {/* Bullet sub-services */}
                  <ul className="space-y-2 flex-1">
                    {service.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-primary/65">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/70 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                </TrackedLink>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regulatory Coverage Table ── */}
      <section className="section-padding-tight">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-8">
              <p className="label-section mb-3">Quick reference</p>
              <h2 className="heading-section text-primary">Which service covers your requirement?</h2>
              <p className="text-primary/60 text-base mt-3 max-w-2xl">
                Use this table to match your regulatory obligation to the right service. Not sure? Contact us — most requirements span more than one area.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-card shadow-sm">
              <table className="w-full text-sm font-body min-w-[720px]">
                <thead>
                  <tr className="bg-forest-deep text-cream">
                    <th className="text-left px-5 py-4 font-semibold text-sm">Regulatory Obligation</th>
                    <th className="px-5 py-4 font-semibold text-xs text-center whitespace-nowrap">EIA & Compliance</th>
                    <th className="px-5 py-4 font-semibold text-xs text-center whitespace-nowrap">Waste & Pollution</th>
                    <th className="px-5 py-4 font-semibold text-xs text-center whitespace-nowrap">Monitoring & Studies</th>
                    <th className="px-5 py-4 font-semibold text-xs text-center whitespace-nowrap">ESG & Training</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { req: 'Environmental Clearance (EC)',          s1: true,  s2: false, s3: false, s4: false },
                    { req: 'Consent to Establish / Operate (CTE/CTO)', s1: true, s2: true, s3: true, s4: false },
                    { req: 'Environmental Management Plan (EMP)',   s1: true,  s2: true,  s3: true,  s4: false },
                    { req: 'Hazardous Waste Authorisation',         s1: false, s2: true,  s3: false, s4: false },
                    { req: 'Biomedical Waste Authorisation',        s1: false, s2: true,  s3: false, s4: false },
                    { req: 'Air / Water / Noise Monitoring',        s1: false, s2: true,  s3: true,  s4: false },
                    { req: 'Baseline Environmental Study',          s1: true,  s2: true,  s3: true,  s4: false },
                    { req: 'Site Environmental Due Diligence',      s1: false, s2: false, s3: true,  s4: false },
                    { req: 'ISO 14001 / EMS Implementation',        s1: false, s2: true,  s3: false, s4: false },
                    { req: 'Staff Training & Awareness',            s1: false, s2: false, s3: false, s4: true  },
                  ].map((row, i) => (
                    <tr key={row.req} className={`border-b border-primary/6 ${i % 2 === 0 ? 'bg-card/70' : 'bg-primary/3'}`}>
                      <td className="px-5 py-3.5 text-primary font-medium">{row.req}</td>
                      {[row.s1, row.s2, row.s3, row.s4].map((v, j) => (
                        <td key={j} className="px-4 py-3.5 text-center">
                          {v ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary/12 border border-secondary/20">
                              <svg className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="text-primary/15 text-lg leading-none">·</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCta
        title="Need a custom solution?"
        description="We specialise in bespoke environmental and compliance engagements. Tell us what you need and we'll scope a tailored approach."
        buttonText="Get in Touch"
      />
    </>
  )
}
