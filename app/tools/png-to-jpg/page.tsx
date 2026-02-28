import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'PNG to JPG Converter – Convert PNG to JPG Free Online',
  description:
    'Convert PNG to JPG online for free. Compress PNG images to smaller JPG files instantly in your browser. No registration, no watermarks — TooAI24.',
  keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'compress png to jpg', 'png jpg converter'],
}

const relatedTools = [
  { label: 'JPG to PNG', href: '/tools/jpg-to-png' },
  { label: 'PNG to PDF', href: '/tools/png-to-pdf' },
  { label: 'PDF to PNG', href: '/tools/pdf-to-png' },
]

export default function PngToJpgPage() {
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
            <span className="text-foreground font-medium">PNG to JPG</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/20 items-center justify-center mb-5">
            <Image className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            PNG to JPG Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Convert PNG images to JPG format for smaller file sizes and wider compatibility. Perfect
            for web publishing and email sharing.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="png-to-jpg"
            fromFormat="PNG"
            toFormat="JPG"
            acceptedTypes=".png,image/png"
            color="png"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Benefits of PNG to JPG Conversion
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Smaller File Size',
                desc: 'JPG files are typically 50–80% smaller than PNG, saving bandwidth and storage.',
              },
              {
                title: 'Universal Compatibility',
                desc: 'JPG is supported by virtually every application, browser, and device.',
              },
              {
                title: 'Fast Conversion',
                desc: 'The HTML5 Canvas API converts images in milliseconds, right in your browser.',
              },
              {
                title: 'Batch Processing',
                desc: 'Convert multiple PNG files to JPG in one single conversion step.',
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

        <section className="prose max-w-none text-sm text-muted-foreground mb-12 space-y-3">
          <h2 className="text-xl font-bold text-foreground">When to Convert PNG to JPG</h2>
          <p>
            While PNG is the better format for quality-critical applications, it can produce very large files —
            especially for photographs and complex illustrations. When you need to share images via email, upload them
            to social media, or publish them on a website, JPG&#39;s smaller file size is a significant advantage.
          </p>
          <p>
            TooAI24&#39;s PNG to JPG converter applies a white background fill before conversion (since JPG does not
            support transparency), ensuring your images look correct without any unexpected black backgrounds.
            The result is a high-quality JPG at 92% quality setting for an optimal balance of size and clarity.
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
