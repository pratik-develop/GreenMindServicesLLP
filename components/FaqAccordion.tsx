"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faqs: FAQItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              openIndex === index
                ? 'border-secondary/40 bg-card/90 shadow-md shadow-forest-mid/8'
                : 'border-card bg-page-elevated/50 hover:border-primary/20'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 md:px-7 py-5 text-left flex justify-between items-start gap-4 min-h-[60px] hover:bg-secondary/3 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-display font-semibold text-base md:text-lg text-primary leading-snug">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-shrink-0 mt-0.5 transition-colors ${openIndex === index ? 'text-secondary' : 'text-primary/40'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-7 pb-5 md:pb-6 border-t border-card">
                    <p className="text-primary/75 text-sm md:text-base leading-relaxed font-light pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
  )
}
