import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import StatsGrid from '@/components/StatsGrid'
import ClientLogoCard from '@/components/ClientLogoCard'
import PageCta from '@/components/PageCta'
import { getCertificates, type SanityCertificate } from '@/lib/sanity'

export const metadata = {
  title: 'About — GreenMind Services LLP',
  description:
    'GreenMind Services LLP, Guwahati — DPIIT-recognised startup, MSME-registered, and empanelled with the State Environmental Impact Assessment Authority. 35+ years of combined experience in environmental compliance.',
}

// ─── Real credentials from certificate ───────────────────────────────────────
const credentials = [
  { label: 'LLP Identification No.',  value: 'ACS-2757' },
  { label: 'ISO 9001',                value: 'Quality Management' },
  { label: 'ISO 14001',               value: 'Environmental Management' },
  { label: 'ISO 29990',               value: 'Learning Services' },
  { label: 'DPIIT Startup Certificate', value: 'DIPP243892' },
  { label: 'GSTIN',                   value: '18ABDFG6856C1ZC' },
  { label: 'PAN',                     value: 'ABDFG6856C' },
  { label: 'MSME Certificate',        value: 'UDYAM-AS-16-0061467' },
  { label: 'GMC Trade Licence',       value: 'GMC/LZ/27/2025-26/1757055109161537' },
]

const accreditations = [
  {
    title: 'MoU — NABET Consultancy Firm',
    detail: 'Ref No. QCI/NABET/ENV/ACO/25/3799 · 05 Aug 2025',
    icon: 'nabet',
  },
  {
    title: 'MoU — NABL Accredited Lab',
    detail: 'Ref No. TC-17284 · 19 Dec 2025',
    icon: 'nabl',
  },
  {
    title: 'SEIAC Empanelment — Meghalaya',
    detail: 'State Environmental Impact Assessment Authority, Dept. of Forests, Govt. of Meghalaya',
    icon: 'govt',
  },
  {
    title: 'DPIIT-Recognised Startup',
    detail: 'Certificate No. DIPP243892 · Department for Promotion of Industry and Internal Trade',
    icon: 'dpiit',
  },
]

// ─── Real client list from image ─────────────────────────────────────────────
const clients = [
  {
    name: 'Pridhiram Memorial Hospital & Research Centre',
    sector: 'Healthcare',
    location: 'Jakhipur, Goalpara',
  },
  {
    name: 'Krishnav Agro Ventures LLP',
    sector: 'Agribusiness',
    location: 'Assam',
  },
  {
    name: 'Actnow Arcowalics Pvt Ltd',
    sector: 'Manufacturing',
    location: 'Boko, Kamrup',
  },
  {
    name: 'KCE BuildCon Pvt Ltd',
    sector: 'Construction & Infrastructure',
    location: 'Haryana',
  },
  {
    name: 'American Institute of Pathology & Laboratory Sciences Pvt Ltd',
    sector: 'Pathology & Diagnostics',
    location: 'India',
  },
  {
    name: 'Arjuna Memorial & Research Centre',
    sector: 'Healthcare',
    location: 'Assam',
  },
  {
    name: 'Jack & Jill Enterprise',
    sector: 'Business Services',
    location: 'Diphu',
  },
]

const values = [
  {
    emoji: '🎯',
    title: 'Ambitious',
    description: 'We set high standards for the quality of our work and the outcomes we deliver for clients.',
    example: 'Our EIA reports are prepared to clearance-ready standard on the first submission — not after rounds of committee queries.',
  },
  {
    emoji: '🔧',
    title: 'Practical',
    description: 'We give implementable advice — not theoretical frameworks that gather dust.',
    example: 'Every gap report we produce comes with a prioritised action list, cost estimates, and timeline — not just a list of problems.',
  },
  {
    emoji: '🌱',
    title: 'Impactful',
    description: 'We measure success by real-world outcomes, not report page counts.',
    example: 'We track clearance timelines, inspection results, and compliance outcomes for every client — and share those results.',
  },
  {
    emoji: '🤝',
    title: 'Collaborative',
    description: 'We work alongside your team, not separately from it.',
    example: 'Our consultants share draft reports with client teams, incorporate operational knowledge, and build internal capability as they go.',
  },
]

const stats = [
  { value: 50,  label: 'Clients Served',        suffix: '+' },
  { value: 35,  label: 'Years Combined Exp.',    suffix: '+' },
  { value: 10,  label: 'Full-Time Team Members', suffix: ''  },
  { value: 4,   label: 'States Served',          suffix: '+'  },
]

const team = [
  {
    initials: 'MK',
    name: 'Mantu Kumar Choudhury',
    role: 'Co-Founder',
    expertise: 'Civil Engineering & Central Pollution Control Board',
    bio: 'BE (Civil), retired as Scientist F from CPCB. Brings strong technical and regulatory expertise with deep experience in environmental systems and compliance at the highest levels of India\'s central regulatory framework.',
    photo: undefined, // Replace photo: undefined with photo: '/team/mantu-kumar-choudhury.jpg' when available
  },
  {
    initials: 'MD',
    name: 'Mridul Dev Adhikary',
    role: 'Co-Founder',
    expertise: 'Ecology, Environment & Assam Pollution Control Board',
    bio: 'MSc in Ecology & Environment, retired as Senior Environmental Scientist from Assam Pollution Control Board. Offers extensive experience in environmental management and regulatory processes across the North East.',
    photo: undefined, // Replace photo: undefined with photo: '/team/mridul-dev-adhikary.jpg' when available
  },
  {
    initials: 'PD',
    name: 'Pralay Das',
    role: 'Consultant',
    expertise: 'Environmental Assessment & Institutional Compliance',
    bio: 'MSc in Ecology & Environment, retired as Executive Environmental Scientist from Assam Pollution Control Board. Adds deep domain knowledge in environmental assessment, monitoring, and institutional compliance.',
    photo: undefined, // Replace photo: undefined with photo: '/team/pralay-das.jpg' when available
  },
]

// Icon components for accreditation cards
function AccreditationIcon({ type }: { type: string }) {
  if (type === 'nabet') return (
    <svg className="w-6 h-6 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
  if (type === 'nabl') return (
    <svg className="w-6 h-6 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
  if (type === 'govt') return (
    <svg className="w-6 h-6 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4V10zm6 0h1v11h-1V10zm5 0h1v11h-1V10zm5 0h1v11h-1V10z" />
    </svg>
  )
  // dpiit
  return (
    <svg className="w-6 h-6 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

export default async function About() {
  // Fetch certificates from Sanity if configured; otherwise show nothing extra
  let sanityCertificates: SanityCertificate[] = []
  const isConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'
  if (isConfigured) {
    try { sanityCertificates = await getCertificates() } catch { /* silent */ }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">About us</p>
              <h1 className="heading-display text-forest-deep mb-4 md:mb-6 max-w-3xl">
                Expert Solutions for Environmental Excellence
              </h1>
              <p className="text-base md:text-xl text-forest-deep/65 max-w-2xl leading-relaxed mb-5">
                GreenMind Services LLP is a DPIIT-recognised environmental consultancy firm based in Guwahati, Assam. We bring 35+ years of combined regulatory expertise and a commitment to delivering audit-ready compliance solutions for Indian businesses.
              </p>
              <p className="text-base md:text-xl text-forest-deep/65 max-w-2xl leading-relaxed">
                Our team of retired government scientists and engineers works with manufacturers, real estate developers, healthcare institutions, and government bodies across Northeast India and beyond.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80 mt-4 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
                  alt="Environmental consultants at work"
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

      {/* ── Mission ── */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          {/* Issue #21 — responsive gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">Vision</p>
              <h2 className="heading-section text-forest-deep mb-5">
                To be a trusted leader in environmental consultancy
              </h2>
              <p className="text-forest-deep/65 leading-relaxed text-base md:text-lg mb-10">
                Enabling sustainable growth towards a greener-cleaner environment with social harmony — for industries, institutions, and communities across India.
              </p>

              <p className="label-section mb-4">Mission</p>
              <ul className="space-y-3">
                {[
                  'To provide reliable and innovative environmental solutions',
                  'To support clients in achieving compliance and sustainability goals efficiently',
                  'To promote long-term environmental stewardship through knowledge, action, and accountability',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/25 text-gold flex-shrink-0 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-forest-deep/75 text-sm md:text-base leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              {/* Issue #20 — responsive height */}
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-80 mt-6 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80"
                  alt="Forest canopy"
                  fill
                  className="object-cover origin-center forest-bg-ken"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Values + Stats ── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-12">
              <p className="label-section mb-4">Values</p>
              <h2 className="heading-section text-forest-deep mb-4">
                The principles that guide everything we do
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {values.map((value, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="card-base card-hover p-6 md:p-8">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-mid/12 to-forest-mid/4 border border-forest-mid/12 flex items-center justify-center mb-4">
                    <span className="text-xl leading-none">{value.emoji}</span>
                  </div>
                  <h3 className="heading-card text-forest-deep mb-3">{value.title}</h3>
                  <p className="text-forest-deep/60 leading-relaxed text-sm md:text-base">{value.description}</p>
                  {value.example && (
                    <p className="text-forest-deep/40 text-xs leading-relaxed mt-2 italic border-l-2 border-forest-mid/20 pl-3">
                      {value.example}
                    </p>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>

          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* ── Credentials & Registrations ── */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-12">
              <p className="label-section mb-4">Credentials</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Registered, recognised &amp; accredited
              </h2>
              <p className="text-forest-deep/65 max-w-2xl leading-relaxed">
                GreenMind Services LLP is a DPIIT-recognised startup, MSME-registered firm, and empanelled Environmental Management Consultant with the State Environmental Impact Assessment Authority, Meghalaya.
              </p>
            </div>
          </SectionReveal>

          {/* Accreditation highlight chips */}
          <SectionReveal>
            <div className="flex flex-wrap gap-3 mb-6">
              {accreditations.map((acc) => (
                <div key={acc.title} className="flex items-center gap-2.5 px-4 py-2.5 bg-forest-mid/8 border border-forest-mid/20 rounded-xl">
                  <span className="w-6 h-6 flex items-center justify-center">
                    <AccreditationIcon type={acc.icon} />
                  </span>
                  <div>
                    <p className="font-body font-semibold text-xs text-forest-mid">{acc.title}</p>
                    {acc.detail && <p className="text-forest-deep/40 text-[10px]">{acc.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Divider between accreditations and credentials */}
          <div className="border-t border-forest-deep/8 my-8 md:my-12" />

          {/* Registration numbers table */}
          <SectionReveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-forest-deep/10">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest-deep/10">
                    <th className="text-left px-5 py-3 text-forest-deep/60 font-semibold text-xs uppercase tracking-wider">Registration</th>
                    <th className="text-left px-5 py-3 text-forest-deep/60 font-semibold text-xs uppercase tracking-wider">Number / Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials.map((cred, i) => (
                    <tr key={cred.label} className={i % 2 === 0 ? 'bg-white/60' : 'bg-forest-deep/[0.02]'}>
                      <td className="px-5 py-3 text-forest-deep/70 font-medium">{cred.label}</td>
                      <td className="px-5 py-3 text-forest-deep font-semibold font-mono text-xs md:text-sm">{cred.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionReveal>

          {/* Sanity-managed certificates (shown only when Sanity is configured + has records) */}
          {sanityCertificates.length > 0 && (
            <SectionReveal delay={0.15}>
              <div className="mt-8">
                <p className="font-body font-semibold text-sm text-forest-deep mb-4">Certificates &amp; Accreditations</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sanityCertificates.map((cert) => (
                    <div key={cert._id} className="bg-white/60 border border-forest-deep/10 rounded-xl p-4 flex flex-col gap-1">
                      <p className="font-body font-semibold text-sm text-forest-deep">{cert.certName}</p>
                      <p className="text-xs text-forest-deep/55">{cert.authority}</p>
                      {cert.certificateNumber && (
                        <p className="text-xs font-mono text-forest-deep/45 mt-0.5">No. {cert.certificateNumber}</p>
                      )}
                      {!cert.isLifetime && cert.expiryDate && (
                        <p className="text-xs text-forest-deep/40 mt-0.5">
                          Valid until {new Date(cert.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-12">
              <p className="label-section mb-4">Team</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Meet the experts behind GreenMind
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <SectionReveal key={index} delay={index * 0.12}>
                <div className="card-base card-hover p-6 md:p-8">
                  {/* Avatar — photo slot with monogram fallback */}
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-forest-mid/15 flex items-center justify-center mb-5">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display font-bold text-lg text-forest-mid">
                        {member.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="heading-card text-forest-deep mb-1">{member.name}</h3>
                  <p className="text-forest-mid font-body font-semibold text-sm mb-2">{member.role}</p>
                  <p className="text-forest-deep/45 text-xs mb-4 font-body">{member.expertise}</p>
                  <p className="text-forest-deep/65 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-10">
              <p className="label-section mb-4">Clients</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Businesses that trust GreenMind
              </h2>
              <p className="text-forest-deep/65 max-w-2xl leading-relaxed">
                We&apos;ve had the privilege of working with leading organisations across healthcare, agribusiness, construction, diagnostics, and services — from Northeast India to Haryana.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {clients.map((client, index) => (
              <SectionReveal key={index} delay={index * 0.07}>
                <ClientLogoCard
                  name={client.name}
                  sector={client.sector}
                  location={client.location}
                />
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.1}>
            <p className="text-forest-deep/40 text-xs mt-6">
              Client relationships are confidential. Names shown with permission.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl">
              <div className="border-l-4 border-gold/60 pl-6 md:pl-8">
                <blockquote className="text-xl md:text-2xl lg:text-3xl text-forest-deep leading-relaxed italic mb-5 font-display font-light">
                  &ldquo;GreenMind&rsquo;s practical approach and deep regulatory knowledge have helped us maintain compliance without compromising our project timelines. They feel less like consultants and more like part of our team.&rdquo;
                </blockquote>
                <cite className="text-forest-mid font-body font-semibold not-italic text-sm">
                  — Operations Director, Infrastructure Company, Assam
                </cite>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCta
        title="Work with us"
        description="Join the growing list of businesses that trust GreenMind for their environmental and compliance needs."
        buttonText="Get in Touch"
      />
    </>
  )
}
