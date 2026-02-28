import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'PDF to PNG Converter – Convert PDF Pages to PNG Images Free',
  description:
    'Convert PDF to PNG online for free at TooAI24. Get lossless, high-resolution PNG images from every page of your PDF. No uploads, no watermarks, 100% private.',
  keywords: ['pdf to png', 'convert pdf to png', 'pdf to image png', 'lossless pdf converter'],
}

const relatedTools = [
  { label: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
  { label: 'PNG to PDF', href: '/tools/png-to-pdf' },
  { label: 'PNG to JPG', href: '/tools/png-to-jpg' },
]

export default function PdfToPngPage() {
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
            <span className="text-foreground font-medium">PDF to PNG</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 items-center justify-center mb-5">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            PDF to PNG Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Convert PDF pages to lossless PNG images. Perfect for transparent backgrounds, design work,
            and archival-quality screenshots.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="pdf-to-png"
            fromFormat="PDF"
            toFormat="PNG"
            acceptedTypes=".pdf,application/pdf"
            color="pdf"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Benefits of PDF to PNG Conversion
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Lossless Quality',
                desc: 'PNG uses lossless compression — no quality degradation compared to JPG.',
              },
              {
                title: 'Transparency Support',
                desc: 'PNG supports transparent backgrounds, great for layering in design tools.',
              },
              {
                title: 'Browser-Based Privacy',
                desc: 'No server upload — your PDF is processed entirely within your browser.',
              },
              {
                title: 'All Pages Converted',
                desc: 'Each page of your PDF becomes a separate, downloadable PNG image.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">{title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5">How to Convert PDF to PNG</h2>
          <ol className="space-y-3">
            {[
              'Upload your PDF file by clicking the upload zone or dragging it in.',
              'TooAI24 will read your PDF and prepare all pages for conversion.',
              'Click "Convert to PNG" — each page is rendered at high resolution.',
              'Download your PNG files individually.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="prose max-w-none text-sm text-muted-foreground mb-12 space-y-3">
          <h2 className="text-xl font-bold text-foreground">Why Convert PDF to PNG?</h2>
          <p>
            PNG (Portable Network Graphics) is the preferred format when image quality is critical and no compression
            artifacts can be tolerated. Designers, developers, and content creators often prefer PNG over JPG because
            of its lossless compression and support for transparency.
          </p>
          <p>
            When you convert a PDF page to PNG using TooAI24, the rendering engine processes each page at twice the
            standard screen resolution, producing sharp, detailed images suitable for printing, archiving, or use in
            creative projects.
          </p>
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
