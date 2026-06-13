import SectionReveal from '@/components/SectionReveal'

export default function PrivacyPolicy() {
  return (
    <main>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <SectionReveal>
            <h1 className="heading-display text-forest-deep mb-6">
              Privacy Policy
            </h1>
            <p className="text-forest-deep/70">
              Last updated: January 2024
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-forest-deep/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <div className="prose prose-lg max-w-none text-forest-deep/80">
                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4">
                  Introduction
                </h2>
                <p className="mb-6">
                  GreenMind Services LLP ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Information We Collect
                </h2>
                <p className="mb-4">We collect several types of information:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Business information (organization name, industry)</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Information you provide through contact forms and enquiries</li>
                </ul>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  How We Use Your Information
                </h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Respond to your enquiries and requests</li>
                  <li>Send you communications about our services (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and ensure security</li>
                </ul>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Data Sharing and Disclosure
                </h2>
                <p className="mb-6">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Service providers who assist our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Data Security
                </h2>
                <p className="mb-6">
                  We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Your Rights
                </h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where applicable</li>
                </ul>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Contact Us
                </h2>
                <p className="mb-6">
                  If you have questions about this Privacy Policy or our data practices, please contact us through our website contact form.
                </p>

                <h2 className="font-display font-semibold text-2xl text-forest-deep mb-4 mt-8">
                  Changes to This Policy
                </h2>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  )
}