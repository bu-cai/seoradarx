import type { Metadata } from 'next'
import Link from 'next/link'
import { getSortedPosts } from '@/lib/blog-posts'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

const CATEGORY_LABELS = {
  'tool-review': { en: 'Tool Review', zh: '工具评测' },
  'seo-guide': { en: 'SEO Guide', zh: 'SEO指南' },
  'geo-seo': { en: 'GEO / AI SEO', zh: 'GEO / AI SEO' },
} as const

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const zh = params.locale === 'zh'
  return {
    title: zh
      ? 'SEO博客 — Shopify跨境卖家SEO指南 | SEO Radar X'
      : 'SEO Blog — Guides for Shopify & Cross-Border Sellers | SEO Radar X',
    description: zh
      ? '深度SEO/GEO指南，帮助Shopify独立站卖家提升搜索排名和AI搜索可见性。覆盖Perplexity、ChatGPT、Google AI等最新趋势。'
      : 'In-depth SEO and GEO guides for Shopify and WordPress cross-border stores. Covering Perplexity SEO, LLM ranking, hreflang, and more.',
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/blog`,
      languages: {
        'zh-CN': `${BASE_URL}/zh/blog`,
        'en-US': `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/en/blog`,
      },
    },
  }
}

export default function BlogIndex({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'
  const posts = getSortedPosts()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>
      {/* Nav */}
      <nav className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between">
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? '免费检测' : 'Free Audit'}
          </Link>
          <Link
            href={zh ? '/en/blog' : '/zh/blog'}
            className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
          >
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
            {zh ? '学习中心' : 'Learning Center'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] mb-4">
          {zh ? 'SEO & GEO 指南博客' : 'SEO & GEO Blog'}
        </h1>
        <p className="text-[#64748b] text-base max-w-2xl leading-relaxed">
          {zh
            ? '专为Shopify跨境卖家整理的SEO和AI搜索优化指南，帮助你提升独立站在Google、Perplexity和ChatGPT中的可见性。'
            : 'Practical SEO and AI search guides for Shopify and WordPress cross-border stores. Learn to rank in Google, Perplexity, ChatGPT, and Copilot.'}
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid gap-6">
          {posts.map((post) => {
            const data = zh ? post.zh : post.en
            const categoryLabel = CATEGORY_LABELS[post.category][zh ? 'zh' : 'en']
            const dateStr = new Date(post.date).toLocaleDateString(
              zh ? 'zh-CN' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )

            return (
              <Link
                key={post.slug}
                href={`/${params.locale}/blog/${post.slug}`}
                className="group block rounded-2xl border border-[#1e3a5f]/50 hover:border-blue-600/50 bg-[#0c1322] hover:bg-[#0f1729] transition-all p-6 sm:p-7"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40">
                    {categoryLabel}
                  </span>
                  <span className="text-xs text-[#4a5568]">{dateStr}</span>
                  <span className="text-xs text-[#4a5568]">·</span>
                  <span className="text-xs text-[#4a5568]">
                    {zh ? `${post.readTime} 分钟阅读` : `${post.readTime} min read`}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#e2e8f0] group-hover:text-white mb-2 leading-snug transition-colors">
                  {data.title}
                </h2>

                <p className="text-sm text-[#64748b] leading-relaxed line-clamp-2 mb-4">
                  {data.description}
                </p>

                <div className="flex items-center gap-1.5 text-blue-400 text-sm font-semibold">
                  {zh ? '阅读全文' : 'Read article'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-blue-800/30 bg-blue-950/20 p-8 text-center">
          <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">
            {zh ? '立即检测你的独立站SEO' : 'Audit Your Store\'s SEO Now'}
          </h3>
          <p className="text-sm text-[#64748b] mb-5">
            {zh
              ? '30秒完成，覆盖30项GEO+SEO指标，无需注册'
              : '30 seconds. 30 checks. GEO + SEO. No sign-up required.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
          >
            {zh ? '免费检测' : 'Free Audit'} →
          </Link>
        </div>
      </div>
    </div>
  )
}
