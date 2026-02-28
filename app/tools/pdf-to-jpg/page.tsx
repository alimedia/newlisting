import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'PDF to JPG Converter – Convert PDF Pages to JPG Images Free',
  description:
    'Convert PDF to JPG online for free. Transform every PDF page into a high-quality JPG image instantly in your browser. No sign-up, no watermarks, 100% secure.',
  keywords: ['pdf to jpg', 'convert pdf to jpg', 'pdf to image', 'pdf to jpeg', 'pdf converter'],
}

const relatedTools = [
  { label: 'PDF to PNG', href: '/tools/pdf-to-png' },
  { label: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { label: 'PNG to PDF', href: '/tools/png-to-pdf' },
]

export default function PdfToJpgPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#tools" className="hover:text-foreground transition-colors">Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">PDF to JPG</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 items-center justify-center mb-5">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            PDF to JPG Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Convert every page of your PDF document into high-quality JPG images instantly. Free,
            secure, and entirely browser-based — no file uploads.
          </p>
        </div>

        {/* Converter Tool */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="pdf-to-jpg"
            fromFormat="PDF"
            toFormat="JPG"
            acceptedTypes=".pdf,application/pdf"
            color="pdf"
          />
        </div>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Use TooAI24 to Convert PDF to JPG?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'High-Quality Rendering',
                desc: 'Pages are rendered at 2x scale using PDF.js for crisp, clear JPG output.',
              },
              {
                title: '100% Private',
                desc: 'Your PDF never leaves your device. All processing runs in your browser using Web APIs.',
              },
              {
                title: 'Multi-Page Support',
                desc: 'Every single page of your PDF is converted into a separate downloadable JPG image.',
              },
              {
                title: 'No Software Needed',
                desc: 'Works directly in Chrome, Firefox, Safari, and Edge. No installation required.',
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

        {/* How to use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5">
            How to Convert PDF to JPG Online
          </h2>
          <ol className="space-y-3">
            {[
              'Click "Choose PDF File" or drag and drop your PDF into the upload area.',
              'The tool will automatically detect the number of pages in your PDF.',
              'Click "Convert to JPG" and wait a moment while each page is processed.',
              'Download individual JPG images for each page.',
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

        {/* SEO content */}
        <section className="prose max-w-none text-sm text-muted-foreground mb-12 space-y-3">
          <h2 className="text-xl font-bold text-foreground">About PDF to JPG Conversion</h2>
          <p>
            Converting a PDF to JPG is one of the most common file conversion tasks for students, professionals, and
            designers. Whether you need to share a single page of a report as an image, embed PDF content into a
            presentation, or simply view a PDF on a device that does not support the format, converting to JPG makes
            your content universally accessible.
          </p>
          <p>
            TooAI24&#39;s free PDF to JPG converter uses PDF.js — the same technology used by Firefox — to render each
            page of your document at high resolution. The result is sharp, clear JPG images that faithfully represent
            every element of the original PDF, including text, images, and vector graphics.
          </p>
          <p>
            Unlike many online converters that upload your files to a remote server, TooAI24 processes everything
            directly in your browser. This means your sensitive documents — contracts, invoices, reports — never leave
            your device.
          </p>
        </section>

        {/* Related tools */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Related Converter Tools</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {t.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
