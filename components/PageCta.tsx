import SectionReveal from '@/components/SectionReveal'
import CtaButton from '@/components/CtaButton'

interface PageCtaProps {
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  label?: string
}

export default function PageCta({
  title,
  description,
  buttonText,
  buttonHref = '/contact',
  label,
}: PageCtaProps) {
  return (
    <section className="bg-forest-deep/5 border-t border-forest-deep/10 py-10 md:py-12">
      <div className="container-custom">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12">

            {/* Left — text */}
            <div className="max-w-xl">
              {label && (
                <p className="label-section mb-2">{label}</p>
              )}
              <h2 className="heading-section text-forest-deep mb-2">
                {title}
              </h2>
              <p className="text-forest-deep/60 text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right — button */}
            <div className="shrink-0">
              <CtaButton href={buttonHref}>{buttonText}</CtaButton>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
