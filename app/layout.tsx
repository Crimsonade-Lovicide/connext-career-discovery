import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const siteUrl = 'https://v0-a-i-esquire-legal.vercel.app'
const siteDescription = 'Modern legal services combining licensed attorneys with AI-powered workflows. Free consultation available nationwide.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'A.I. Esquire Legal - AI-Powered Virtual Law Firm',
  description: siteDescription,
  keywords: ['law firm', 'AI legal', 'virtual attorney', 'legal services', 'family law', 'criminal defense', 'personal injury', 'estate planning'],
  openGraph: {
    title: 'A.I. Esquire Legal - AI-Powered Virtual Law Firm',
    description: siteDescription,
    url: siteUrl,
    siteName: 'A.I. Esquire Legal',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A.I. Esquire Legal - AI-Powered Virtual Law Firm',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'A.I. Esquire Legal',
  url: siteUrl,
  telephone: '+1-845-274-1100',
  email: 'eric@aisquire.io',
  areaServed: 'United States',
  priceRange: 'Free consultation',
  description: siteDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#0A0A0F] text-white min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
