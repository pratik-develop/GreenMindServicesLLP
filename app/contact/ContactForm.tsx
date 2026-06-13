"use client"

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import CtaButton from '@/components/CtaButton'
import FaqAccordion from '@/components/FaqAccordion'
const contactFaqs = [
  {
    question: 'What information should I prepare before the call?',
    answer: 'A brief description of your project or facility, the regulatory obligation you\'re facing (e.g., EC clearance, CTO renewal, BRSR reporting), your industry and approximate scale, and your desired timeline. Don\'t worry if you\'re unsure — we ask the right questions.',
  },
  {
    question: 'Can I reschedule or cancel a consultation?',
    answer: 'Yes. We understand that schedules change. Simply reply to the confirmation email or call us and we\'ll arrange a new time. We ask for at least 4 hours\' notice where possible.',
  },
  {
    question: 'Do you handle urgent compliance matters?',
    answer: 'Yes. For time-sensitive matters — an NGT notice, an expiring CTO, or an imminent inspection — please call us directly on +91 91810 18810 or mention the urgency in your message. We prioritise urgent enquiries.',
  },
  {
    question: 'Do you work with clients outside Assam and the Northeast?',
    answer: 'Yes. While our physical office is in Guwahati, we serve clients across India. Field surveys are conducted with our partner network; reporting, advisory, and documentation work can be handled remotely.',
  },
  {
    question: 'What happens after I submit this form?',
    answer: 'You will receive an acknowledgement email within minutes. A GreenMind consultant will call or email you within 24 business hours to discuss your requirement and schedule a free 30-minute scoping call.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name:           '',
    organisation:   '',
    email:          '',
    phone:          '',
    service:        '',
    message:        '',
    gm_verify_check: '', // honeypot
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [isSubmitting,  setIsSubmitting]  = useState(false)
  const [submitStatus,  setSubmitStatus]  = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched({ ...touched, [field]: true })
  }

  const getErrors = () => {
    const errors: { name?: string; email?: string; message?: string } = {}
    if (touched.name && !formData.name) {
      errors.name = 'Name is required'
    }
    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        errors.email = 'Email is required'
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address'
      }
    }
    if (touched.message && !formData.message) {
      errors.message = 'Message is required'
    }
    return errors
  }

  const errors = getErrors()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', organisation: '', email: '', phone: '', service: '', message: '', gm_verify_check: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClasses = (hasError: boolean) => {
    if (hasError) {
      return 'form-input bg-white border-red-400 focus:ring-red-400/20'
    }
    return 'form-input bg-white'
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionReveal>
              <p className="label-section mb-4">Contact us</p>
              <h1 className="heading-display text-forest-deep mb-4 md:mb-6">
                We&apos;d love to hear from you
              </h1>
              <p className="text-base md:text-xl text-forest-deep/65 max-w-2xl leading-relaxed">
                Click below to schedule a call with an environmental expert. Alternatively, drop us a message and we&apos;ll respond within 24 hours.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80 mt-4 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
                  alt="Environmental consultants collaborating"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/25 to-transparent" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── What happens next ── */}
      <section className="section-padding-tight border-b border-forest-deep/8">
        <div className="container-custom">
          <SectionReveal>
            <p className="label-section mb-6 text-center">What to expect</p>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {/* Connector line — desktop only */}
              <div aria-hidden="true" className="hidden sm:block absolute top-5 left-[calc(16.7%+1rem)] right-[calc(16.7%+1rem)] h-px bg-forest-deep/10" />
              {[
                { step: '01', title: 'We call within 24 hrs', desc: 'A consultant reviews your message and calls or emails to understand your requirements.', icon: '📞' },
                { step: '02', title: 'Free 30-min scoping call', desc: 'We clarify your project, timeline, and obligations — no obligation, no charge.', icon: '🗓' },
                { step: '03', title: 'Proposal within 48 hrs', desc: 'You receive a clear, itemised proposal with scope, deliverables, and fixed fee.', icon: '📄' },
              ].map((item, i) => (
                <SectionReveal key={i} delay={i * 0.12}>
                  <div className="text-center px-2">
                    <div className="w-12 h-12 rounded-full bg-forest-deep/6 border border-forest-deep/10 flex items-center justify-center mx-auto mb-3">
                      <span className="font-display font-bold text-forest-mid text-lg">{item.step}</span>
                    </div>
                    <h3 className="font-display font-semibold text-forest-deep text-base mb-1.5">{item.title}</h3>
                    <p className="text-forest-deep/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Contact block ── */}
      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          {/* Issue #13 — responsive gap */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">

            {/* Left — contact details */}
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="space-y-8">
                  {/* Book a call */}
                  {submitStatus !== 'success' && (
                    <div>
                      <h2 className="heading-card text-forest-deep mb-3">
                        Book a free consultation
                      </h2>
                      <p className="text-forest-deep/65 mb-5 leading-relaxed text-sm">
                        Schedule a complimentary 30-minute discovery call with one of our consultants to discuss your requirements.
                      </p>
                      <CtaButton href="mailto:greenmindservicesllp@gmail.com">Email us directly</CtaButton>
                    </div>
                  )}

                  {/* Office details */}
                  <div className="border-t border-forest-deep/10 pt-8 space-y-5">
                    <div className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full bg-forest-deep/8 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-body font-semibold text-forest-deep text-sm mb-1">Office</p>
                        <p className="text-forest-deep/65 text-sm leading-relaxed">House No. 45, Jai Ram Boro Path<br />Garchuk, Kamrup (M)<br />Assam — 781035</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full bg-forest-deep/8 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-body font-semibold text-forest-deep text-sm mb-1">Email</p>
                        <a href="mailto:greenmindservicesllp@gmail.com" className="text-forest-mid text-sm hover:underline">
                          greenmindservicesllp@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full bg-forest-deep/8 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-body font-semibold text-forest-deep text-sm mb-1">Phone</p>
                        <a href="tel:+919181018810" className="text-forest-mid text-sm hover:underline block">+91 91810 18810</a>
                        <a href="tel:+919181018811" className="text-forest-mid text-sm hover:underline block">+91 91810 18811</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full bg-forest-deep/8 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-body font-semibold text-forest-deep text-sm mb-1">Office hours</p>
                        <p className="text-forest-deep/65 text-sm">Monday – Friday<br />9:00 AM – 6:00 PM IST</p>
                      </div>
                    </div>

                    {/* OpenStreetMap embed */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-forest-deep/10">
                      <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=91.6762%2C26.0936%2C91.7362%2C26.1336&layer=mapnik&marker=26.1136%2C91.7062"
                        width="100%"
                        height="200"
                        loading="lazy"
                        title="GreenMind Services LLP office location"
                        className="w-full h-48 rounded-xl border border-forest-deep/10"
                        style={{ border: 0 }}
                      />
                    </div>

                    {/* Get directions — opens native maps app on mobile, Google Maps on desktop */}
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=26.1136,91.7062"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-forest-mid text-sm font-body font-semibold hover:underline min-h-[44px]"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get directions
                    </a>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <SectionReveal delay={0.15}>
                {/* Issue #5 — responsive form padding */}
                <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 md:p-8 border border-forest-deep/10 space-y-5">
                  {submitStatus === 'success' && (
                    <div className="p-6 rounded-xl bg-sage/10 border border-sage/25 text-center">
                      <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-forest-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-display font-semibold text-forest-deep text-lg mb-1">Message received!</h3>
                      <p className="text-forest-deep/65 text-sm">We respond to all enquiries within 24 business hours. You&apos;ll hear from us soon.</p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 md:p-5 bg-red-50 border border-red-300 text-red-700 rounded-xl text-sm md:text-base flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}

                  {submitStatus !== 'success' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Name <span className="text-forest-mid">*</span></label>
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            value={formData.name} 
                            onChange={handleChange}
                            onBlur={() => handleBlur('name')}
                            placeholder="Your name" 
                            className={getInputClasses(!!errors.name)} 
                          />
                          {errors.name && (
                            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="form-label">Organisation</label>
                          <input 
                            type="text" 
                            name="organisation" 
                            value={formData.organisation} 
                            onChange={handleChange}
                            placeholder="Company or org name" 
                            className="form-input bg-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Email <span className="text-forest-mid">*</span></label>
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange}
                            onBlur={() => handleBlur('email')}
                            placeholder="you@example.com" 
                            className={getInputClasses(!!errors.email)} 
                          />
                          {errors.email && (
                            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="form-label">Phone</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                            placeholder="+91 98765 43210" 
                            className="form-input bg-white" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">Service of interest</label>
                        <select name="service" value={formData.service} onChange={handleChange} className="form-input bg-white">
                          <option value="">Select a service…</option>
                          <option value="eia-compliance">Environmental Impact Survey &amp; Its Compliance</option>
                          <option value="waste-pollution">Waste &amp; Pollution Management</option>
                          <option value="monitoring-studies">Environmental Monitoring &amp; Studies</option>
                          <option value="training-advisory">Training, Advisory &amp; Social Responsibility</option>
                          <option value="esg-consultancy">ESG Consultancy</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label">Message <span className="text-forest-mid">*</span></label>
                        <textarea 
                          name="message" 
                          required 
                          rows={5} 
                          value={formData.message} 
                          onChange={handleChange}
                          onBlur={() => handleBlur('message')}
                          placeholder="Briefly describe your project or requirements…"
                          className={getInputClasses(!!errors.message) + ' resize-none'} 
                        />
                        {errors.message && (
                          <p className="text-red-600 text-xs mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Honeypot — hidden from humans */}
                      <input type="text" name="gm_verify_check" value={formData.gm_verify_check} onChange={handleChange}
                        style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                      {/* Response-time trust callout */}
                      <p className="text-xs text-forest-deep/45 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        We respond to all enquiries within 24 business hours
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[48px] px-8 py-3.5 bg-gradient-to-br from-forest-mid to-forest-deep text-cream font-body font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Sending…
                          </span>
                        ) : 'Send Message'}
                      </button>
                    </>
                  )}
                </form>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="mb-12">
              <p className="label-section mb-4">FAQ</p>
              <h2 className="heading-section text-forest-deep mb-4">
                Frequently asked questions
              </h2>
              <p className="text-forest-deep/65 max-w-2xl leading-relaxed">
                Here are the questions our clients ask most before getting in touch.
              </p>
            </div>
          </SectionReveal>
          <div className="max-w-3xl">
            <FaqAccordion faqs={contactFaqs} />
          </div>
        </div>
      </section>
      {/* ── Closing CTA — re-engage anyone who scrolled past the form ── */}
      <section className="bg-forest-deep section-padding">
        <div className="container-custom">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12 text-center md:text-left">
              <div className="max-w-xl mx-auto md:mx-0">
                <h2 className="heading-section text-cream mb-2">Prefer to talk it through?</h2>
                <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                  Skip the form and speak with an environmental expert directly. We respond to every enquiry within 24 business hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 justify-center">
                <a
                  href="tel:+919181018810"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-gold text-forest-deep font-body font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 91810 18810
                </a>
                <a
                  href="mailto:greenmindservicesllp@gmail.com"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl border border-cream/30 text-cream font-body font-semibold text-sm hover:bg-cream/10 transition-colors"
                >
                  Email us
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
