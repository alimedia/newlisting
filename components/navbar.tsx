'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, FileText, Image, ChevronDown } from 'lucide-react'

const tools = [
  { label: 'PDF to JPG', href: '/tools/pdf-to-jpg', category: 'pdf' },
  { label: 'PDF to PNG', href: '/tools/pdf-to-png', category: 'pdf' },
  { label: 'JPG to PDF', href: '/tools/jpg-to-pdf', category: 'image' },
  { label: 'PNG to PDF', href: '/tools/png-to-pdf', category: 'image' },
  { label: 'JPG to PNG', href: '/tools/jpg-to-png', category: 'image' },
  { label: 'PNG to JPG', href: '/tools/png-to-jpg', category: 'image' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center shadow-sm">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              TooAI<span className="text-primary">24</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                All Tools <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg p-2">
                  {tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      {t.category === 'pdf' ? (
                        <FileText className="w-3.5 h-3.5 text-[var(--tool-pdf)]" />
                      ) : (
                        <Image className="w-3.5 h-3.5 text-[var(--tool-jpg)]" />
                      )}
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#tools"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start Converting
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Home
            </Link>
            <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Conversion Tools
            </div>
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
              >
                {t.category === 'pdf' ? (
                  <FileText className="w-3.5 h-3.5 text-[var(--tool-pdf)]" />
                ) : (
                  <Image className="w-3.5 h-3.5 text-[var(--tool-jpg)]" />
                )}
                {t.label}
              </Link>
            ))}
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/#tools"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground text-center hover:opacity-90 transition-opacity"
            >
              Start Converting Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
