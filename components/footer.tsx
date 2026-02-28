import Link from 'next/link'
import { FileText, Image, Shield, Zap, Globe } from 'lucide-react'

const toolLinks = [
  { label: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
  { label: 'PDF to PNG', href: '/tools/pdf-to-png' },
  { label: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { label: 'PNG to PDF', href: '/tools/png-to-pdf' },
  { label: 'JPG to PNG', href: '/tools/jpg-to-png' },
  { label: 'PNG to JPG', href: '/tools/png-to-jpg' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-background">
                TooAI<span className="text-primary">24</span>
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Fast, free, and secure online file converter. Convert PDF, JPG,
              and PNG files instantly – no sign-up required.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1.5 text-xs text-background/50">
                <Shield className="w-3.5 h-3.5" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-background/50">
                <Zap className="w-3.5 h-3.5" />
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-background/50">
                <Globe className="w-3.5 h-3.5" />
                <span>Free</span>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-wider">
              PDF Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.slice(0, 2).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-background/60 hover:text-background transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3 h-3 text-[var(--tool-pdf)]" />
                    {t.label}
                  </Link>
                </li>
              ))}
              {toolLinks.slice(2, 4).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-background/60 hover:text-background transition-colors flex items-center gap-1.5"
                  >
                    <Image className="w-3 h-3 text-[var(--tool-jpg)]" />
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-wider">
              Image Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.slice(4).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-background/60 hover:text-background transition-colors flex items-center gap-1.5"
                  >
                    <Image className="w-3 h-3 text-[var(--tool-png)]" />
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-background mt-6 mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-sm font-semibold text-background mb-4 uppercase tracking-wider">
              Why TooAI24?
            </h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Files are processed in your browser. Nothing is uploaded to our servers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Instant conversion powered by modern web technologies.</span>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>100% free. No watermarks, no sign-up, no limits.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} TooAI24.com – All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/40">
            <Link href="/privacy" className="hover:text-background/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-background/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
