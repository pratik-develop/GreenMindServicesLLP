import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — GreenMind Services LLP',
  description:
    'Get in touch with GreenMind Services LLP, Guwahati. Book a consultation on environmental compliance, EIA, waste management, monitoring, or ESG consultancy. Call +91 91810 18810 / 18811.',
}

export default function ContactPage() {
  return <ContactForm />
}
