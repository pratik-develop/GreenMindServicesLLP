"use client"

import SectionReveal from '@/components/SectionReveal'
import CtaButton from '@/components/CtaButton'

interface PageCtaProps {
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  label?: string
  eventName?: string
  eventParams?: Record<string, any>
}

export default function PageCta({
  title,
  description,
  buttonText,
  buttonHref = '/contact',
  label,
  eventName = 'cta_click',
  eventParams,
}: PageCtaProps) {
  return (
    <section className="relative z-[1] border-t border-card py-10 md:py-12" >
      <div className="container-custom relative z-10">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12">

            {/* Left — text */}
            <div className="max-w-xl">
              {label && (
                <p className="label-section mb-2">{label}</p>
              )}
              <h2 className="heading-section text-primary mb-2">
                {title}
              </h2>
              <p className="text-primary/60 text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right — button */}
            <div className="shrink-0">
              <CtaButton href={buttonHref} eventName={eventName} eventParams={eventParams || { location: 'page_cta', label: buttonText }}>{buttonText}</CtaButton>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
