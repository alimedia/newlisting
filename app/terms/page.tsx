import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service – TooAI24',
  description: 'TooAI24 terms of service. Free, browser-based file conversion tools for personal and professional use.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
        <div className="prose max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TooAI24.com, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Free Service</h2>
            <p>
              TooAI24 provides free file conversion tools for personal and commercial use. We reserve the
              right to modify, suspend, or discontinue any part of the service at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Acceptable Use</h2>
            <p>
              You may use TooAI24 for any lawful purpose. You agree not to use the service to process
              illegal content or to attempt to circumvent any technical measures.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Disclaimer of Warranties</h2>
            <p>
              TooAI24 is provided "as is" without warranty of any kind. We do not guarantee that the
              service will be uninterrupted, error-free, or that results will meet your specific requirements.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Contact</h2>
            <p>
              For questions about these terms, contact us at legal@tooai24.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
