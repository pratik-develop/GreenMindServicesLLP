"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CtaButton from '@/components/CtaButton'

const questions = [
  {
    id: 'industry',
    question: 'What best describes your organisation?',
    options: [
      { label: 'Manufacturing / Industrial unit', value: 'manufacturing' },
      { label: 'Construction / Infrastructure project', value: 'construction' },
      { label: 'Healthcare / Hospital / Clinic', value: 'healthcare' },
      { label: 'Government / Public sector body', value: 'government' },
      { label: 'MSME / Small business', value: 'msme' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'size',
    question: 'What is your approximate annual turnover or project cost?',
    options: [
      { label: 'Under ₹1 crore', value: 'tiny' },
      { label: '₹1–10 crore', value: 'small' },
      { label: '₹10–100 crore', value: 'medium' },
      { label: 'Over ₹100 crore', value: 'large' },
    ],
  },
  {
    id: 'consent',
    question: 'Do you have a valid Consent to Operate (CTO) from your State Pollution Control Board?',
    options: [
      { label: 'Yes, valid and current', value: 'yes_valid' },
      { label: 'Yes, but it has expired', value: 'yes_expired' },
      { label: 'No / Not applicable', value: 'no' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'eia',
    question: 'Has your project undergone a formal Environmental Impact Assessment (EIA)?',
    options: [
      { label: 'Yes, EC clearance obtained', value: 'yes' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Not yet — we need to check', value: 'no' },
      { label: 'Not required for our project', value: 'not_required' },
    ],
  },
  {
    id: 'esg',
    question: 'Are you required to report on ESG or sustainability performance?',
    options: [
      { label: 'Yes — SEBI BRSR mandated', value: 'brsr' },
      { label: 'Yes — supply chain / lender requirement', value: 'voluntary' },
      { label: 'No, but we want to start', value: 'aspiring' },
      { label: 'Not currently', value: 'no' },
    ],
  },
]

function getRiskLevel(answers: Record<string, string>): { level: 'low' | 'medium' | 'high'; summary: string; services: string[] } {
  let score = 0
  if (answers.consent === 'yes_expired' || answers.consent === 'unsure') score += 2
  if (answers.consent === 'no') score += 3
  if (answers.eia === 'no') score += 2
  if (answers.size === 'large' || answers.size === 'medium') score += 1
  if (answers.esg === 'brsr') score += 1

  const services: string[] = []
  if (answers.consent !== 'yes_valid') services.push('Consent to Operate (CTO) Advisory')
  if (answers.eia === 'no' || answers.eia === 'in_progress') services.push('Environmental Impact Assessment')
  if (answers.esg === 'brsr' || answers.esg === 'voluntary') services.push('ESG Consultancy & BRSR Reporting')
  if (answers.industry === 'healthcare') services.push('Biomedical Waste Management Advisory')
  if (services.length === 0) services.push('Environmental Compliance Audit', 'Ongoing Monitoring Programme')

  if (score >= 5) return {
    level: 'high',
    summary: 'Your responses indicate significant compliance gaps that may expose your organisation to regulatory risk, NGT action, or operational disruption. We recommend a compliance audit as a priority.',
    services,
  }
  if (score >= 2) return {
    level: 'medium',
    summary: 'Your organisation has some compliance gaps worth addressing proactively. Early action is significantly cheaper than reactive remediation.',
    services,
  }
  return {
    level: 'low',
    summary: 'Your compliance position appears reasonably strong. A periodic audit will confirm this and identify any emerging obligations.',
    services,
  }
}

export default function ComplianceQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const q = questions[step]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [q.id]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setDone(false) }

  const result = done ? getRiskLevel(answers) : null

  const riskColors = {
    low: { bg: 'bg-sage/10', border: 'border-sage/30', text: 'text-secondary', badge: 'bg-sage/20 text-secondary' },
    medium: { bg: 'bg-gold/8', border: 'border-gold/25', text: 'text-gold-dark', badge: 'bg-gold/15 text-gold-dark' },
    high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!done ? (
        <div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-6">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-secondary' : 'bg-primary/10'}`}
              />
            ))}
          </div>
          <p className="text-xs font-body font-semibold text-primary/40 uppercase tracking-wider mb-3">
            Question {step + 1} of {questions.length}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="font-display font-semibold text-xl md:text-2xl text-primary mb-5 leading-snug">
                {q.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="text-left px-4 py-3.5 rounded-xl border border-card bg-card/70 hover:border-secondary hover:bg-secondary/5 text-primary text-sm font-body transition-all min-h-[52px] active:scale-[0.98]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 text-xs text-primary/40 hover:text-primary transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      ) : result ? (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className={`p-6 rounded-2xl border ${riskColors[result.level].bg} ${riskColors[result.level].border} mb-5`}>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h3 className="font-display font-semibold text-primary text-lg">Your Compliance Assessment</h3>
                <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${riskColors[result.level].badge}`}>
                  {result.level === 'low' ? 'Low Risk' : result.level === 'medium' ? 'Medium Risk' : 'High Risk — Act Now'}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${riskColors[result.level].text}`}>{result.summary}</p>
            </div>
            <div className="mb-5">
              <p className="font-body font-semibold text-xs uppercase tracking-wider text-primary/40 mb-3">Recommended Services</p>
              <ul className="space-y-2">
                {result.services.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-primary/70">
                    <span className="w-5 h-5 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 flex-wrap">
              <CtaButton href="/contact" size="sm">Get a Consultation</CtaButton>
              <CtaButton onClick={reset} variant="secondary" size="sm">Retake Quiz</CtaButton>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  )
}
