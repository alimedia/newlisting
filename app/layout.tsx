import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://tooai24.com'),
  title: {
    default: 'TooAI24 – Free Online PDF, JPG & PNG Converter Tools',
    template: '%s | TooAI24 – Free File Converter',
  },
  description:
    'TooAI24 offers free, fast, and secure online file converters. Convert PDF to JPG, JPG to PDF, PNG to PDF, PDF to PNG, and more. No installation needed.',
  keywords: [
    'pdf to jpg converter',
    'jpg to pdf converter',
    'png to pdf',
    'pdf to png',
    'image to pdf',
    'pdf converter online',
    'free pdf converter',
    'convert pdf to image',
    'jpg to png converter',
    'png to jpg',
    'online file converter',
    'tooai24',
  ],
  authors: [{ name: 'TooAI24', url: 'https://tooai24.com' }],
  creator: 'TooAI24',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tooai24.com',
    siteName: 'TooAI24',
    title: 'TooAI24 – Free Online PDF, JPG & PNG Converter Tools',
    description:
      'Convert PDF, JPG, and PNG files online for free. Fast, secure, and easy-to-use file conversion tools at TooAI24.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TooAI24 – Free Online File Converter',
    description: 'Convert PDF to JPG, JPG to PDF, PNG to PDF and more – free and instant at TooAI24.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
