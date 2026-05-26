import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const zh = params.locale === 'zh'
  return {
    title: zh
      ? 'SEO Radar X 价格方案 — 免费/单次报告/代理商套餐'
      : 'SEO Radar X Pricing — Free, Single Report & Agency Plans',
    description: zh
      ? '从免费版到代理商月度套餐，找到最适合你的SEO审计方案。免费版无限次在线检测，$9.99获得完整PDF报告，$49/月代理商无限次审计+白标报告。'
      : 'Free to start, $9.99 for a full PDF report, or $49/month for unlimited agency audits with white-label PDF exports. No sign-up required for the free tier.',
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/pricing`,
      languages: {
        'zh-CN': `${BASE_URL}/zh/pricing`,
        'en-US': `${BASE_URL}/en/pricing`,
        'x-default': `${BASE_URL}/en/pricing`,
      },
    },
  }
}

const FREE_FEATURES = {
  en: [
    '10 audits per day',
    'Full 30-point online report',
    'All category scores',
    'Fix recommendations (summary)',
    'No sign-up required',
  ],
  zh: [
    '每天10次免费检测',
    '完整30项在线报告',
    '所有维度分数',
    '优化建议摘要',
    '无需注册',
  ],
}

const REPORT_FEATURES = {
  en: [
    'Everything in Free',
    '30 checks — fully explained',
    'Priority fix checklist (ranked)',
    'Shopify-specific tips',
    'WordPress-specific tips',
    'Bilingual PDF (EN + ZH)',
    'Share with your developer',
    'Instant download after payment',
  ],
  zh: [
    '包含免费版全部功能',
    '30项检测逐一详细解析',
    '优先修复清单（已排序）',
    'Shopify专项建议',
    'WordPress专项建议',
    '中英双语PDF报告',
    '可直接发给开发者',
    '付款后立即下载',
  ],
}

const AGENCY_FEATURES = {
  en: [
    'Everything in Report',
    'Unlimited audits per day',
    'Bulk audit support',
    'White-label PDF (your logo)',
    'API access',
    'Client management dashboard',
    'Priority email support',
    'Early access to new features',
  ],
  zh: [
    '包含报告版全部功能',
    '每天无限次检测',
    '批量审计支持',
    '白标PDF（展示你的Logo）',
    'API接口访问',
    '客户管理仪表板',
    '优先邮件支持',
    '新功能优先体验',
  ],
}

const FAQ_PRICING = {
  en: [
    {
      q: 'Is the free tier really free forever?',
      a: 'Yes. The free plan gives you 10 full audits per day with no credit card required and no time limit. We make money on PDF reports and Agency subscriptions.',
    },
    {
      q: 'What exactly is in the PDF report that\'s not in the free version?',
      a: 'The free version shows your scores and a brief fix summary. The $9.99 PDF gives you each check fully explained with the exact code/configuration fix, a prioritized action list sorted by impact, and platform-specific guidance for Shopify or WordPress.',
    },
    {
      q: 'Can I pay per-report and not subscribe?',
      a: 'Yes. The Report plan ($9.99) is a one-time payment per audit — no subscription. You pay only when you need a PDF export.',
    },
    {
      q: 'When is the Agency plan launching?',
      a: 'The Agency plan ($49/month) is coming soon. Join the waitlist by emailing support@seoradarx.com to get early access and a founding member discount.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes. If you\'re not satisfied with your PDF report, email support@seoradarx.com within 7 days for a full refund.',
    },
  ],
  zh: [
    {
      q: '免费版真的永久免费吗？',
      a: '是的。免费方案每天10次完整审计，无需信用卡，无时间限制。我们通过PDF报告和代理商套餐盈利，免费版不会消失。',
    },
    {
      q: '付费PDF报告比免费版多什么？',
      a: '免费版展示你的分数和简要修复摘要。¥68的PDF报告会对每项检测进行详细解析，提供具体的代码/配置修复方案，按影响程度排序的优先行动清单，以及Shopify或WordPress的专项建议。',
    },
    {
      q: '可以单次付费而不订阅吗？',
      a: '可以。报告方案（¥68）是单次购买，不是订阅。只在需要PDF导出时付费。',
    },
    {
      q: '代理商方案什么时候上线？',
      a: '代理商方案（$49/月）即将上线。发邮件到 support@seoradarx.com 加入候补名单，可获得早期使用权和创始会员折扣。',
    },
    {
      q: '支持退款吗？',
      a: '支持。如果你对PDF报告不满意，在7天内发邮件到 support@seoradarx.com，我们全额退款。',
    },
  ],
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'
  const freeFeats = zh ? FREE_FEATURES.zh : FREE_FEATURES.en
  const reportFeats = zh ? REPORT_FEATURES.zh : REPORT_FEATURES.en
  const agencyFeats = zh ? AGENCY_FEATURES.zh : AGENCY_FEATURES.en
  const faqs = zh ? FAQ_PRICING.zh : FAQ_PRICING.en

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Nav */}
      <nav className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between">
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/blog`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? '博客' : 'Blog'}
          </Link>
          <Link
            href={zh ? '/en/pricing' : '/zh/pricing'}
            className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
          >
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/40 rounded-full px-4 py-1.5 text-xs text-blue-300 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          {zh ? '简单透明的定价' : 'Simple, transparent pricing'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] mb-4">
          {zh ? '找到适合你的方案' : 'Find the Right Plan'}
        </h1>
        <p className="text-[#64748b] text-base max-w-xl mx-auto">
          {zh
            ? '从免费开始。需要完整报告时付费。规模扩大时升级代理商套餐。'
            : 'Start free. Pay only for the PDF when you need it. Scale up with Agency when your clients do.'}
        </p>
      </div>

      {/* Pricing cards */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Free */}
          <div className="rounded-2xl border border-[#1e3a5f]/60 bg-[#0c1322] p-7 flex flex-col">
            <div className="mb-6">
              <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
                {zh ? '免费版' : 'Free'}
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#e2e8f0]">$0</span>
              </div>
              <p className="text-xs text-[#4a5568]">
                {zh ? '永久免费，无需信用卡' : 'Free forever, no credit card'}
              </p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {freeFeats.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/${params.locale}`}
              className="block text-center bg-[#162035] hover:bg-[#1e3a5f] text-[#e2e8f0] rounded-xl px-6 py-3 font-semibold text-sm transition-all border border-[#1e3a5f]"
            >
              {zh ? '开始免费检测 →' : 'Start Free Audit →'}
            </Link>
          </div>

          {/* Report — Most Popular */}
          <div className="rounded-2xl border-2 border-blue-600/70 bg-[#0c1322] p-7 flex flex-col relative shadow-lg shadow-blue-900/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              {zh ? '最受欢迎' : 'Most Popular'}
            </div>
            <div className="mb-6">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                {zh ? '完整报告' : 'Full Report'}
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#e2e8f0]">
                  {zh ? '¥68' : '$9.99'}
                </span>
                <span className="text-sm text-[#64748b] mb-1">
                  {zh ? '/份' : '/report'}
                </span>
              </div>
              <p className="text-xs text-[#4a5568]">
                {zh ? '一次性付费，无订阅' : 'One-time payment, no subscription'}
              </p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {reportFeats.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/${params.locale}`}
              className="block text-center bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-bold text-sm transition-all shadow-md shadow-blue-900/30"
            >
              {zh ? '先免费检测，再付费导出 →' : 'Audit Free, Then Export PDF →'}
            </Link>
            <p className="text-center text-xs text-[#4a5568] mt-2">
              {zh ? '先检测，满意再付款' : 'See your results first, pay when ready'}
            </p>
          </div>

          {/* Agency */}
          <div className="rounded-2xl border border-[#1e3a5f]/60 bg-[#0c1322] p-7 flex flex-col">
            <div className="mb-6">
              <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
                {zh ? '代理商套餐' : 'Agency'}
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#e2e8f0]">$49</span>
                <span className="text-sm text-[#64748b] mb-1">/mo</span>
              </div>
              <p className="text-xs text-[#4a5568]">
                {zh ? '即将上线 — 加入候补名单' : 'Coming soon — join the waitlist'}
              </p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {agencyFeats.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:support@seoradarx.com?subject=Agency Plan Waitlist"
              className="block text-center bg-[#162035] hover:bg-[#1e3a5f] text-[#e2e8f0] rounded-xl px-6 py-3 font-semibold text-sm transition-all border border-[#1e3a5f]"
            >
              {zh ? '加入候补名单 →' : 'Join Waitlist →'}
            </a>
          </div>
        </div>

        {/* Value comparison strip */}
        <div className="mt-8 rounded-2xl border border-[#1e3a5f]/40 bg-[#080e1a] p-5 text-center">
          <p className="text-sm text-[#64748b]">
            {zh
              ? '🤝 SEO顾问收费 ¥500+/小时 · 我们只要 ¥68 · 7天退款保障'
              : '🤝 SEO consultants charge $100+/hr · We charge $9.99 · 7-day money-back guarantee'}
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-[#e2e8f0] text-center mb-8">
          {zh ? '常见问题' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group bg-[#0c1322] border border-[#1e3a5f]/60 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-[#e2e8f0] font-medium text-sm list-none select-none hover:bg-[#0f1729] transition-colors">
                <span>{item.q}</span>
                <span className="text-[#64748b] ml-4 flex-shrink-0 group-open:hidden">+</span>
                <span className="text-[#64748b] ml-4 flex-shrink-0 hidden group-open:inline">−</span>
              </summary>
              <p className="px-6 pb-5 pt-3 text-sm text-[#94a3b8] leading-relaxed border-t border-[#1e3a5f]/40">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-10 rounded-2xl border border-blue-800/30 bg-blue-950/20 p-8 text-center">
          <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
            {zh ? '先免费体验，再决定是否付费' : 'Try it free — no commitment'}
          </h3>
          <p className="text-sm text-[#64748b] mb-5">
            {zh
              ? '输入你的网址，30秒免费查看SEO问题，满意了再付费导出PDF。'
              : 'Enter your URL, see your full 30-point report free. Pay for the PDF only if you want it.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 py-3 font-bold text-sm transition-all"
          >
            {zh ? '免费检测 →' : 'Start Free Audit →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
