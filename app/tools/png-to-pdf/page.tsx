import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'PNG to PDF Converter – Convert PNG Images to PDF Free Online',
  description:
    'Convert PNG to PDF online free at TooAI24. Combine multiple PNG images into one PDF document. Secure, instant, and no sign-up required.',
  keywords: ['png to pdf', 'convert png to pdf', 'png pdf converter', 'image to pdf png', 'free png converter'],
}

const relatedTools = [
  { label: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { label: 'PDF to PNG', href: '/tools/pdf-to-png' },
  { label: 'PNG to JPG', href: '/tools/png-to-jpg' },
]

export default function PngToPdfPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#tools" className="hover:text-foreground transition-colors">Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">PNG to PDF</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/20 items-center justify-center mb-5">
            <Image className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            PNG to PDF Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Convert one or multiple PNG images into a compact, professional PDF document. Free,
            instant, and completely private.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="png-to-pdf"
            fromFormat="PNG"
            toFormat="PDF"
            acceptedTypes=".png,image/png"
            color="png"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Features of TooAI24 PNG to PDF Tool
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Multiple PNG Support',
                desc: 'Upload several PNG files at once to create a multi-page PDF in one step.',
              },
              {
                title: 'Full Resolution Output',
                desc: 'PNG images are embedded at their original resolution in the output PDF.',
              },
              {
                title: 'Zero Watermarks',
                desc: 'Your output PDF contains only your images — no branding or watermarks added.',
              },
              {
                title: 'Fully Secure',
                desc: 'Processing happens client-side. No data is ever transmitted to any server.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">{title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5">Steps to Convert PNG to PDF</h2>
          <ol className="space-y-3">
            {[
              'Upload your PNG files using the drag-and-drop zone or the file picker.',
              'Add multiple PNG files to create a multi-page document.',
              'Click "Convert to PDF" to generate your PDF file.',
              'Download the completed PDF instantly.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {t.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
