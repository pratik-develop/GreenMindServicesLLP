import SectionReveal from '@/components/SectionReveal'

export default function TermsConditions() {
  return (
    <main>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <SectionReveal>
            <h1 className="heading-display text-primary mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="text-primary/70">
              Last updated: January 2024
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <div className="prose prose-lg max-w-none text-primary/80">
                <h2 className="font-display font-semibold text-2xl text-primary mb-4">
                  Introduction
                </h2>
                <p className="mb-6">
                  Welcome to GreenMind Services LLP. By accessing or using our website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Services
                </h2>
                <p className="mb-6">
                  GreenMind Services LLP provides environmental consulting, compliance, and ESG reporting services. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Client Responsibilities
                </h2>
                <p className="mb-4">As a client, you agree to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Cooperate with our consultants throughout the engagement</li>
                  <li>Pay fees as agreed upon in the service contract</li>
                  <li>Maintain confidentiality of shared information</li>
                  <li>Comply with applicable laws and regulations</li>
                </ul>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Professional Services
                </h2>
                <p className="mb-6">
                  Our services are provided on a professional basis. While we strive for accuracy and completeness, we do not guarantee specific outcomes and are not liable for decisions made based on our recommendations.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Intellectual Property
                </h2>
                <p className="mb-6">
                  All content on this website, including text, graphics, logos, and software, is the property of GreenMind Services LLP or its licensors and is protected by intellectual property laws.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Confidentiality
                </h2>
                <p className="mb-6">
                  We maintain strict confidentiality of client information. We do not disclose client information to third parties except as required by law or with your explicit consent.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Limitation of Liability
                </h2>
                <p className="mb-6">
                  To the fullest extent permitted by law, GreenMind Services LLP shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Indemnification
                </h2>
                <p className="mb-6">
                  You agree to indemnify and hold GreenMind Services LLP harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Governing Law
                </h2>
                <p className="mb-6">
                  These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [City], India.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Changes to Terms
                </h2>
                <p className="mb-6">
                  We reserve the right to modify these Terms & Conditions at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>

                <h2 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">
                  Contact Information
                </h2>
                <p className="mb-6">
                  For questions about these Terms & Conditions, please contact us through our website contact form.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  )
}