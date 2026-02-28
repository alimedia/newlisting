import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy – TooAI24',
  description: 'TooAI24 privacy policy. Learn how we protect your data and why we never store your files.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
        <div className="prose max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. No File Storage</h2>
            <p>
              TooAI24.com processes all file conversions entirely within your browser using client-side
              JavaScript. Your files — PDFs, JPGs, PNGs, or any other uploaded documents — are never
              transmitted to our servers. We have no ability to access, view, or store your files.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Analytics</h2>
            <p>
              We may collect anonymous usage analytics (such as page views and tool usage counts) to
              understand how visitors use our site. This data does not include any personally identifiable
              information and does not include your file contents.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Cookies</h2>
            <p>
              TooAI24 may use minimal cookies for session management and analytics. We do not use
              advertising cookies or share your data with third-party advertisers.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us at privacy@tooai24.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
