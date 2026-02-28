import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'JPG to PDF Converter – Convert JPG Images to PDF Free Online',
  description:
    'Convert JPG to PDF online free. Merge one or multiple JPG images into a single PDF document instantly. No sign-up, no watermarks, browser-based at TooAI24.',
  keywords: ['jpg to pdf', 'jpeg to pdf', 'convert jpg to pdf', 'image to pdf', 'jpg pdf converter free'],
}

const relatedTools = [
  { label: 'PNG to PDF', href: '/tools/png-to-pdf' },
  { label: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
  { label: 'JPG to PNG', href: '/tools/jpg-to-png' },
]

export default function JpgToPdfPage() {
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
            <span className="text-foreground font-medium">JPG to PDF</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 items-center justify-center mb-5">
            <Image className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            JPG to PDF Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Turn one or more JPG images into a single professional PDF document. Ideal for sharing
            photos, scanned documents, and portfolios.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="jpg-to-pdf"
            fromFormat="JPG"
            toFormat="PDF"
            acceptedTypes=".jpg,.jpeg,image/jpeg"
            color="jpg"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Convert JPG to PDF with TooAI24?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Merge Multiple Images',
                desc: 'Upload multiple JPG files at once and combine them all into a single PDF.',
              },
              {
                title: 'Preserve Image Quality',
                desc: 'Images are embedded at full resolution — no resizing or quality loss.',
              },
              {
                title: 'Instant & Free',
                desc: 'No waiting, no queues. Conversion completes in seconds, completely free.',
              },
              {
                title: 'Private by Design',
                desc: 'Your images are processed entirely in your browser. Nothing is uploaded.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm">{title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-5">How to Convert JPG to PDF Online</h2>
          <ol className="space-y-3">
            {[
              'Click "Choose JPG Files" or drag and drop one or more JPG images.',
              'Reorder or remove images if needed using the file list.',
              'Click "Convert to PDF" — your images are compiled into a multi-page PDF.',
              'Download the finished PDF document to your device.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="prose max-w-none text-sm text-muted-foreground mb-12 space-y-3">
          <h2 className="text-xl font-bold text-foreground">JPG to PDF — Use Cases</h2>
          <p>
            Converting JPG images to PDF is essential for countless professional and personal scenarios. When you
            scan a document with your phone, you typically get a series of JPG files. TooAI24&#39;s JPG to PDF
            converter lets you merge those scans into a single, organized PDF in seconds.
          </p>
          <p>
            Other common use cases include creating a photo portfolio in PDF format, submitting application
            documents as a single file, or archiving receipts and invoices. TooAI24 handles all of these with
            zero sign-up and zero watermarks.
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
