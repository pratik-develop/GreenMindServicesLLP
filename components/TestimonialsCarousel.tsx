"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionReveal from './SectionReveal'

interface Testimonial {
  quote: string
  author: string
  role?: string
  company: string
  sector?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <SectionReveal>
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            initial={false}
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -60) next()
              else if (info.offset.x > 60) prev()
            }}
          >
            {testimonials.map((t, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1 sm:px-2">
                <div className="card-base p-6 sm:p-8 md:p-10">
                  {/* Gold left-border accent + enlarged quote */}
                  <div className="border-l-4 border-gold/60 pl-5 md:pl-7 mb-6 md:mb-8">
                    <blockquote className="text-lg sm:text-xl md:text-2xl text-primary italic font-light leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  {/* Author — separated with top border */}
                  <div className="pt-4 border-t border-card flex items-center gap-4">
                    {/* Monogram avatar */}
                    <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-semibold text-sm text-secondary">
                        {t.author.split(',').map(part => part.trim().split(' ').map(w => w[0]).join('')).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <cite className="font-display font-semibold text-primary not-italic text-base md:text-lg block">
                        {t.author}
                      </cite>
                      {t.role && (
                        <p className="text-primary/70 text-xs md:text-sm font-body font-medium mt-0.5">{t.role}</p>
                      )}
                      <p className="text-sage-dark text-xs md:text-sm font-body font-medium mt-0.5">{t.company}</p>
                      {t.sector && (
                        <div className="mt-2">
                          <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-[10px] md:text-xs font-body font-medium rounded-full border border-secondary/20">
                            {t.sector}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center mt-6 md:mt-8 gap-4">
          <button
            onClick={prev}
            className="min-w-[44px] min-h-[44px] hidden md:flex items-center justify-center rounded-full border border-primary/20 hover:bg-secondary hover:text-cream hover:border-secondary transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Pill dots — active elongates to show progress */}
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="p-2 flex items-center justify-center"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
              >
                <span
                  className={`block rounded-full transition-all duration-400 ${
                    i === currentIndex
                      ? 'w-6 h-2.5 bg-secondary'
                      : 'w-2.5 h-2.5 bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="min-w-[44px] min-h-[44px] hidden md:flex items-center justify-center rounded-full border border-primary/20 hover:bg-secondary hover:text-cream hover:border-secondary transition-all duration-200"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </SectionReveal>
  )
}
