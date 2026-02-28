import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FileConverter from '@/components/file-converter'

export const metadata: Metadata = {
  title: 'JPG to PNG Converter – Convert JPG to PNG Free Online',
  description:
    'Convert JPG to PNG online for free. Get lossless PNG images from your JPG files in seconds. No sign-up, no watermarks, 100% browser-based at TooAI24.',
  keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'jpg png converter free', 'image converter'],
}

const relatedTools = [
  { label: 'PNG to JPG', href: '/tools/png-to-jpg' },
  { label: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { label: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
]

export default function JpgToPngPage() {
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
            <span className="text-foreground font-medium">JPG to PNG</span>
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 items-center justify-center mb-5">
            <Image className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            JPG to PNG Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Convert JPG images to lossless PNG format for superior image quality and transparency
            support. Free, fast, and completely private.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <FileConverter
            conversionType="jpg-to-png"
            fromFormat="JPG"
            toFormat="PNG"
            acceptedTypes=".jpg,.jpeg,image/jpeg"
            color="jpg"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why Convert JPG to PNG?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Lossless Compression',
                desc: 'PNG preserves every pixel. No compression artifacts like those found in JPG.',
              },
              {
                title: 'Transparency Support',
                desc: 'PNGs support alpha transparency — essential for logos and graphic design work.',
              },
              {
                title: 'Instant Conversion',
                desc: 'Canvas API converts your image in milliseconds right in the browser.',
              },
              {
                title: 'Batch Convert',
                desc: 'Upload multiple JPG files and get multiple PNG files back at once.',
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

        <section className="prose max-w-none text-sm text-muted-foreground mb-12 space-y-3">
          <h2 className="text-xl font-bold text-foreground">JPG vs PNG – Which Is Better?</h2>
          <p>
            JPG is great for photographs because it produces smaller file sizes through lossy compression. However,
            each time you save a JPG, quality is lost. PNG, on the other hand, uses lossless compression, meaning
            your image data is perfectly preserved no matter how many times the file is saved.
          </p>
          <p>
            Converting JPG to PNG is ideal when you need to edit an image repeatedly, use it in design software, or
            need a version that supports transparent backgrounds. TooAI24&#39;s tool handles this conversion instantly
            using the HTML5 Canvas API, with no server involvement.
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
