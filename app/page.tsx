import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  Image,
  ArrowRight,
  Upload,
  Zap,
  Shield,
  Download,
  CheckCircle,
  Star,
  ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'TooAI24 – Free Online PDF, JPG & PNG Converter Tools',
  description:
    'Convert PDF to JPG, JPG to PDF, PNG to PDF, and more for free. TooAI24 offers instant, secure, browser-based file conversion with no sign-up required.',
}

const allTools = [
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert every PDF page into high-quality JPG images. Perfect for sharing documents as photos.',
    from: 'PDF',
    to: 'JPG',
    href: '/tools/pdf-to-jpg',
    color: 'pdf',
    popular: true,
  },
  {
    id: 'pdf-to-png',
    title: 'PDF to PNG',
    description: 'Convert PDF pages to PNG format. Lossless quality with transparent background support.',
    from: 'PDF',
    to: 'PNG',
    href: '/tools/pdf-to-png',
    color: 'pdf',
    popular: false,
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Merge one or more JPG images into a single professional PDF document instantly.',
    from: 'JPG',
    to: 'PDF',
    href: '/tools/jpg-to-pdf',
    color: 'jpg',
    popular: true,
  },
  {
    id: 'png-to-pdf',
    title: 'PNG to PDF',
    description: 'Convert PNG images to a compact and shareable PDF file with a single click.',
    from: 'PNG',
    to: 'PDF',
    href: '/tools/png-to-pdf',
    color: 'png',
    popular: false,
  },
  {
    id: 'jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to PNG for lossless quality. Great for transparent backgrounds.',
    from: 'JPG',
    to: 'PNG',
    href: '/tools/jpg-to-png',
    color: 'jpg',
    popular: false,
  },
  {
    id: 'png-to-jpg',
    title: 'PNG to JPG',
    description: 'Compress PNG files to JPG for smaller file sizes. Ideal for web publishing.',
    from: 'PNG',
    to: 'JPG',
    href: '/tools/png-to-jpg',
    color: 'png',
    popular: false,
  },
]

const colorMap: Record<string, { bg: string; icon: string; badge: string; border: string }> = {
  pdf: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    icon: 'text-red-600',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    border: 'border-red-100 dark:border-red-900/30',
  },
  jpg: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    icon: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-900/30',
  },
  png: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-900/30',
  },
}

const faqs = [
  {
    q: 'Is TooAI24 completely free to use?',
    a: 'Yes! All conversion tools on TooAI24 are 100% free. There are no hidden fees, no watermarks, and no usage limits. You can convert as many files as you want.',
  },
  {
    q: 'Are my files safe when using TooAI24?',
    a: 'Absolutely. All file processing happens directly in your browser using modern Web APIs. Your files are never uploaded to our servers, ensuring complete privacy and security.',
  },
  {
    q: 'What is the maximum file size I can convert?',
    a: 'Since processing is done in your browser, the limit depends on your device memory. In practice, most files up to 50MB convert smoothly on modern devices.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is required. Just visit TooAI24.com, choose your conversion tool, upload your file, and download the result. It is that simple.',
  },
  {
    q: 'Which browsers are supported?',
    a: 'TooAI24 works on all modern browsers including Chrome, Firefox, Safari, and Edge on desktop and mobile devices.',
  },
  {
    q: 'Can I convert multiple files at once?',
    a: 'Yes, most of our tools support batch conversion. You can upload multiple images or pages and convert them all at once.',
  },
]

const stats = [
  { value: '6+', label: 'Free Converter Tools' },
  { value: '100%', label: 'Browser-Based & Private' },
  { value: '0', label: 'Sign-ups Required' },
  { value: '∞', label: 'Conversions Allowed' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-[0.07]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
            <Zap className="w-3 h-3" />
            Free Online File Converter – No Sign-up Required
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
            Convert PDF, JPG &amp; PNG
            <br />
            <span className="text-primary">Files Instantly &amp; Free</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 text-pretty">
            TooAI24 gives you powerful, browser-based file conversion tools. Convert PDF to JPG, JPG to PDF, PNG to PDF,
            and more — all for free, with no watermarks and no uploads to our servers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#tools"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Choose a Converter Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-border transition-colors"
            >
              How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              { icon: Shield, text: 'No server uploads — 100% private' },
              { icon: Zap, text: 'Instant conversion in seconds' },
              { icon: CheckCircle, text: 'No watermarks or sign-up' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-y border-border py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            All Free File Converter Tools
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Choose from our complete suite of online PDF, JPG, and PNG converters. All tools are free,
            instant, and work entirely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTools.map((tool) => {
            const c = colorMap[tool.color]
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className={`relative group flex flex-col p-6 bg-card rounded-2xl border ${c.border} shadow-sm tool-card-hover`}
              >
                {tool.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold dark:bg-amber-900/40 dark:text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                  {tool.from === 'PDF' ? (
                    <FileText className={`w-6 h-6 ${c.icon}`} />
                  ) : (
                    <Image className={`w-6 h-6 ${c.icon}`} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.description}</p>

                <div className="flex items-center gap-2 mt-5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${c.badge}`}>{tool.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${c.badge}`}>{tool.to}</span>
                  <span className="ml-auto text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Convert Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-card border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Convert Files Online for Free
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              TooAI24 makes file conversion dead simple. Three steps, zero friction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Upload Your File',
                desc: 'Click "Choose File" or drag and drop your PDF, JPG, or PNG directly onto the converter. All processing stays in your browser.',
              },
              {
                step: '02',
                icon: Zap,
                title: 'Instant Conversion',
                desc: 'Our browser-based engine converts your file in seconds using modern Web APIs — no server upload, no waiting.',
              },
              {
                step: '03',
                icon: Download,
                title: 'Download Your Result',
                desc: 'Click download to save your converted file instantly. Your original and converted files are never stored anywhere.',
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mb-5 shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-0 right-0 md:right-4 text-6xl font-black text-primary/5 leading-none select-none">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Why Choose TooAI24 for Your File Conversions?
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: '100% Private & Secure',
                  desc: 'All conversions happen inside your browser. Your files are never sent to any server, ensuring total privacy.',
                },
                {
                  title: 'No Registration, No Watermarks',
                  desc: 'Use every tool completely free without creating an account. Output files have zero watermarks.',
                },
                {
                  title: 'High-Quality Output',
                  desc: 'We use the highest quality conversion settings to preserve your document and image fidelity.',
                },
                {
                  title: 'Works on All Devices',
                  desc: 'Fully responsive and optimized for desktop, tablet, and mobile browsers.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground text-sm">{title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allTools.slice(0, 4).map((tool) => {
              const c = colorMap[tool.color]
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={`p-5 rounded-xl ${c.bg} border ${c.border} flex flex-col gap-3 hover:shadow-md transition-shadow`}
                >
                  {tool.from === 'PDF' ? (
                    <FileText className={`w-6 h-6 ${c.icon}`} />
                  ) : (
                    <Image className={`w-6 h-6 ${c.icon}`} />
                  )}
                  <div>
                    <div className="font-bold text-foreground text-sm">{tool.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Free converter</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="bg-primary/5 border-y border-primary/10 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Most Popular File Conversions
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'PDF to JPG online free',
              'JPG to PDF converter',
              'PNG to PDF converter',
              'PDF to PNG high quality',
              'JPG to PNG lossless',
              'PNG to JPG compress',
              'convert image to PDF',
              'convert PDF to image',
            ].map((kw) => (
              <span
                key={kw}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about TooAI24 file converters.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group bg-card border border-border rounded-xl px-5 py-4">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold text-foreground text-sm">{q}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-3" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="hero-gradient rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
            Start Converting Your Files Right Now
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-7 text-pretty">
            No sign-up. No installation. No watermarks. Just fast, free, and secure file conversion at
            TooAI24.com.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#tools"
              className="flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Pick a Converter Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
