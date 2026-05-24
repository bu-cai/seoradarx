import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://seoauditpro.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Free SEO Audit Tool for Shopify & WordPress | SEO Audit Pro',
    template: '%s | SEO Audit Pro',
  },
  description: 'Instantly audit your Shopify or WordPress store with 30 SEO checks — performance, technical, GEO & content. Free, no sign-up. Bilingual reports for cross-border sellers.',
  keywords: ['shopify seo checker', 'wordpress seo audit', 'free seo audit tool', 'seo score', '独立站SEO', 'Shopify SEO检测', '跨境卖家SEO', 'GEO optimization', 'hreflang checker'],
  authors: [{ name: 'SEO审计专家团队' }],
  creator: 'SEO Audit Pro',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'SEO Audit Pro',
    title: 'Free SEO Audit for Shopify & WordPress Stores',
    description: '30 SEO checks in 30 seconds — find what\'s hurting your Google ranking. Free, no sign-up. Bilingual PDF reports for cross-border sellers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEO Audit Pro — Free SEO Checker for Shopify & WordPress',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Audit for Shopify & WordPress — 30 Checks in 30s',
    description: 'Find what\'s hurting your Google ranking. Free, no sign-up required.',
    images: ['/og-image.png'],
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
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/zh`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'SEO审计专家 / SEO Audit Pro',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: BASE_URL,
              description: '专为Shopify和WordPress跨境卖家设计的SEO检测工具，30项检测，中英双语报告',
              offers: {
                '@type': 'Offer',
                price: '9.99',
                priceCurrency: 'USD',
                priceValidUntil: '2027-12-31',
              },
              featureList: [
                '30+ SEO检测项',
                'Shopify & WordPress专项检测',
                'GEO跨境优化检测',
                '中英双语PDF报告',
                '实时进度反馈',
              ],
              inLanguage: ['zh-CN', 'en-US'],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
