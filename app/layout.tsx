import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Noto_Sans_SC, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

// next/font — eliminates render-blocking CSS @import, auto-subsets, preloads
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
  preload: false, // Chinese font — large, don't block initial load
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Free SEO Audit Tool for Shopify & WordPress | SEO Radar X',
    template: '%s | SEO Radar X',
  },
  description: 'Instantly audit your Shopify or WordPress store with 30 SEO checks — performance, technical, GEO & content. Free, no sign-up. Bilingual reports for cross-border sellers.',
  keywords: ['shopify seo checker', 'wordpress seo audit', 'free seo audit tool', 'seo score', '独立站SEO', 'Shopify SEO检测', '跨境卖家SEO', 'GEO optimization', 'hreflang checker'],
  authors: [{ name: 'SEO Radar X Team' }],
  creator: 'SEO Radar X',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'SEO Radar X',
    title: 'Free SEO Audit for Shopify & WordPress Stores | SEO Radar X',
    description: '30 SEO checks in 30 seconds — find what\'s hurting your Google ranking. Free, no sign-up. Bilingual PDF reports for cross-border sellers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Audit for Shopify & WordPress — 30 Checks in 30s | SEO Radar X',
    description: 'Find what\'s hurting your Google ranking. Free, no sign-up required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'zh-CN': `${BASE_URL}/zh`,
      'en-US': `${BASE_URL}/en`,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={`${notoSansSC.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/zh`} />
        {/* Google AdSense — must be in <head> as static HTML for verification */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7224234791121280"
          crossOrigin="anonymous"
        />
        {/* Organization schema — tells AI/search who we are */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'SEO Radar X',
              url: BASE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/favicon.ico`,
                width: 512,
                height: 512,
              },
              description: 'Free SEO and GEO audit tool for Shopify and WordPress cross-border e-commerce sellers. 30 checks in 30 seconds, bilingual PDF reports.',
              foundingDate: '2025',
              knowsAbout: [
                'SEO Audit',
                'GEO Optimization',
                'Hreflang',
                'Core Web Vitals',
                'Shopify SEO',
                'WordPress SEO',
                'Cross-border E-commerce',
                'Generative Engine Optimization',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@seoradarx.com',
                contactType: 'customer support',
                availableLanguage: ['English', 'Chinese'],
              },
              sameAs: [
                'https://twitter.com/seoradarx',
              ],
            }),
          }}
        />
        {/* WebSite schema with SearchAction — enables sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${BASE_URL}/#website`,
              name: 'SEO Radar X',
              url: BASE_URL,
              description: 'Free SEO audit tool for Shopify & WordPress cross-border sellers — 30 checks, GEO optimization, bilingual PDF reports.',
              inLanguage: ['zh-CN', 'en-US'],
              publisher: { '@id': `${BASE_URL}/#organization` },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${BASE_URL}/en?url={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* SoftwareApplication schema — for app knowledge panels */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              '@id': `${BASE_URL}/#app`,
              name: 'SEO Radar X',
              applicationCategory: 'BusinessApplication',
              applicationSubCategory: 'SEO Tool',
              operatingSystem: 'Web',
              url: BASE_URL,
              publisher: { '@id': `${BASE_URL}/#organization` },
              description: 'Free SEO and GEO audit tool built for Shopify and WordPress cross-border e-commerce sellers. Runs 30 checks in 30 seconds including hreflang validation, Core Web Vitals, Schema markup, and AI search optimization signals.',
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Free Audit',
                  price: '0',
                  priceCurrency: 'USD',
                  description: 'Unlimited free SEO audits — no signup required',
                },
                {
                  '@type': 'Offer',
                  name: 'PDF Report',
                  price: '9.99',
                  priceCurrency: 'USD',
                  priceValidUntil: '2027-12-31',
                  description: 'Full bilingual PDF report (English + Chinese)',
                },
              ],
              featureList: [
                '30-point SEO audit in 30 seconds',
                'GEO (Generative Engine Optimization) checks',
                'Hreflang and international SEO validation',
                'Core Web Vitals (LCP, INP, CLS)',
                'Shopify-specific SEO checks',
                'WordPress-specific SEO checks',
                'Schema markup validation',
                'Bilingual PDF reports (English + Chinese)',
                'Historical score tracking',
                'No signup required',
              ],
              screenshot: `${BASE_URL}/og-image.png`,
              inLanguage: ['zh-CN', 'en-US'],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127',
                bestRating: '5',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
