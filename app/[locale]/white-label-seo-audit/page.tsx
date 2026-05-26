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
      ? '白标SEO审计工具 — 代理机构专用 | SEO Radar X'
      : 'White Label SEO Audit Tool for Agencies — Rebrand & Resell | SEO Radar X',
    description: zh
      ? '为你的代理机构提供白标SEO审计工具。专业PDF报告可自定义品牌，30项检测覆盖hreflang、Schema、Core Web Vitals。帮助客户发现SEO问题，展示你的专业价值。'
      : 'White label SEO audit tool for agencies. Branded PDF reports with 30 checks — hreflang, Schema, Core Web Vitals & more. Show clients exactly what to fix and prove your expertise.',
    keywords: zh
      ? ['白标seo审计', '代理机构seo工具', '白标seo工具', 'seo审计白标', 'seo报告工具代理机构', '可定制seo报告']
      : ['white label seo audit tool', 'seo audit tool white label', 'white label seo audit', 'white label seo tools', 'seo audit tool for agencies', 'white label seo report'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
      languages: {
        'zh-CN':     `${BASE_URL}/zh/white-label-seo-audit`,
        'en-US':     `${BASE_URL}/en/white-label-seo-audit`,
        'x-default': `${BASE_URL}/en/white-label-seo-audit`,
      },
    },
    openGraph: {
      title: zh ? '白标SEO审计工具 — 代理机构专用' : 'White Label SEO Audit Tool for Agencies',
      description: zh
        ? '30项检测，专业PDF报告，帮助代理机构向客户展示SEO问题。'
        : '30 checks, professional PDF reports. Help your agency clients see and fix their SEO issues.',
      url: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

export default function WhiteLabelPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  const features = zh ? [
    { icon: '📄', title: '专业PDF报告', desc: '完整的30项检测结果，格式专业，可直接发给客户。报告涵盖评分、问题分类、优先修复清单，中英双语。' },
    { icon: '🌐', title: 'GEO + 国际SEO检测', desc: '专为跨境卖家设计的hreflang、geo.region、x-default检测。这是大多数通用SEO工具覆盖不到的检测维度。' },
    { icon: '⚡', title: '30秒出结果', desc: '无需等待漫长的爬取过程。30秒内完成30项检测，让你在客户面前快速展示专业性。' },
    { icon: '🛍️', title: 'Shopify / WordPress专项建议', desc: '针对不同平台给出具体修复代码和操作步骤，而非泛泛的"优化元标签"建议。' },
    { icon: '💰', title: '低成本高价值', desc: '$9.99/份报告，你可以按照SEO顾问的价格（$300-500/份）转售给客户，利润空间极大。' },
    { icon: '🔒', title: '无需账号绑定', desc: '无需客户注册账号。输入URL即可，任何人都能立即获取结果。' },
  ] : [
    { icon: '📄', title: 'Professional PDF Reports', desc: 'Full 30-check results in a professional format you can send directly to clients. Includes score breakdown, issue categories, and a priority fix checklist — in English and Chinese.' },
    { icon: '🌐', title: 'GEO + International SEO Checks', desc: 'Dedicated hreflang, geo.region, and x-default auditing built for cross-border stores — checks that most generic SEO tools simply don\'t cover.' },
    { icon: '⚡', title: 'Results in 30 Seconds', desc: 'No waiting for lengthy crawls. 30 checks completed in 30 seconds, letting you demonstrate value to clients quickly.' },
    { icon: '🛍️', title: 'Shopify & WordPress Specific Fixes', desc: 'Platform-specific fix instructions with actual code snippets — not just "optimize your meta tags" generic advice.' },
    { icon: '💰', title: 'Low Cost, High Margin', desc: 'Reports cost $9.99 each. Resell them at your SEO consulting rate ($300–500/report) for significant margins.' },
    { icon: '🔒', title: 'No Client Account Needed', desc: 'Clients don\'t need to register. Just enter the URL — anyone gets instant results.' },
  ]

  const steps = zh ? [
    { n: '1', title: '输入客户网站URL', desc: '在SEO Radar X首页输入客户的域名，选择目标语言（中文或英文）。' },
    { n: '2', title: '查看即时评分报告', desc: '30秒内获得完整的在线评分报告，涵盖5个维度、30项检测。可以直接在客户面前演示。' },
    { n: '3', title: '购买完整PDF报告', desc: '支付$9.99获取完整PDF报告，包含所有检测项的详细说明和优先修复清单。' },
    { n: '4', title: '发送给客户', desc: '将PDF报告发送给客户，或根据报告内容提供你的SEO咨询建议。将$9.99的成本转化为高价值的服务交付。' },
  ] : [
    { n: '1', title: 'Enter Your Client\'s URL', desc: 'Input your client\'s domain on the SEO Radar X homepage. Select the target language (English or Chinese).' },
    { n: '2', title: 'Get the Instant Score Report', desc: 'In 30 seconds, get a full online score report across 5 categories and 30 checks — demonstrate it live to your client.' },
    { n: '3', title: 'Purchase the Full PDF Report', desc: 'Pay $9.99 for the complete PDF with detailed explanations of every check and a priority fix checklist.' },
    { n: '4', title: 'Deliver to Your Client', desc: 'Send the PDF to your client or use it to frame your SEO consulting recommendations. Turn a $9.99 cost into high-value service delivery.' },
  ]

  const faqs = zh ? [
    { q: '什么是白标SEO审计工具？', a: '白标SEO审计工具是代理机构可以使用并以自己品牌交付结果的SEO检测软件。SEO Radar X提供可下载的PDF报告，代理机构可以将其作为自己服务的一部分分享给客户。' },
    { q: '我可以将报告以自己的品牌发送吗？', a: '目前SEO Radar X的PDF报告显示SEO Radar X品牌。我们正在开发白标定制选项（代理机构套餐即将推出）。目前，代理机构可以将PDF作为参考数据使用，结合自己的咨询分析一起交付给客户。' },
    { q: 'SEO Radar X适合代理机构使用吗？', a: '非常适合。特别是为跨境电商客户提供服务的代理机构——我们的hreflang、GEO和国际SEO检测是大多数通用工具无法提供的。$9.99/份的成本非常适合用于客户提案或月度报告。' },
    { q: '支持批量审计吗？', a: '目前每次审计单个URL。批量审计API正在开发中，加入我们的代理机构等待名单可第一时间获知。' },
    { q: '可以为客户定制检测项目吗？', a: '标准版包含固定的30项检测。代理机构定制套餐（包括自定义报告品牌、批量审计、API访问）正在规划中，感兴趣请发邮件至 support@seoradarx.com。' },
  ] : [
    { q: 'What is a white label SEO audit tool?', a: 'A white label SEO audit tool is SEO auditing software that agencies can use and deliver results under their own brand. SEO Radar X provides downloadable PDF reports that agencies can share with clients as part of their service delivery.' },
    { q: 'Can I send reports under my own branding?', a: 'Currently SEO Radar X PDF reports carry the SEO Radar X brand. We\'re building white label customization options (agency plan coming soon). For now, agencies can use the PDFs as reference data alongside their own consulting analysis.' },
    { q: 'Is SEO Radar X suitable for agencies?', a: 'Yes — especially for agencies serving cross-border e-commerce clients. Our hreflang, GEO, and international SEO checks are unavailable in most generic tools. At $9.99/report, the cost is appropriate for client proposals or monthly reporting.' },
    { q: 'Do you support bulk audits?', a: 'Currently one URL per audit. A bulk audit API is in development. Join our agency waitlist to be first notified when it launches.' },
    { q: 'Can I customize the checks for my clients?', a: 'The standard version includes a fixed 30-check suite. An agency custom plan (including branded reports, bulk audits, and API access) is in planning — email support@seoradarx.com to express interest.' },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
      { '@type': 'ListItem', position: 2, name: zh ? '白标SEO审计工具' : 'White Label SEO Audit Tool', item: `${BASE_URL}/${params.locale}/white-label-seo-audit` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: zh ? 'SEO Radar X 白标SEO审计工具' : 'SEO Radar X White Label SEO Audit Tool',
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '9.99', priceCurrency: 'USD' },
    description: zh
      ? '专为代理机构设计的SEO审计工具，提供30项专业检测和可下载PDF报告。'
      : 'SEO audit tool for agencies with 30 professional checks and downloadable PDF reports.',
    url: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* Nav */}
      <nav
        className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{ background: 'rgba(8,14,26,0.95)', backdropFilter: 'blur(8px)' }}
      >
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/pricing`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">{zh ? '价格' : 'Pricing'}</Link>
          <Link href={`/${params.locale}/blog`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">{zh ? '博客' : 'Blog'}</Link>
          <Link href={zh ? `/en/white-label-seo-audit` : `/zh/white-label-seo-audit`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mt-8 mb-6">
          <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">{zh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <span className="text-[#64748b]">{zh ? '白标SEO审计工具' : 'White Label SEO Audit'}</span>
        </nav>

        {/* Hero */}
        <section className="text-center pt-4 pb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-950/60 text-purple-400 border border-purple-800/40 mb-6">
            🏢 {zh ? '代理机构专用' : 'For SEO Agencies'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] leading-tight mb-4">
            {zh ? '白标SEO审计工具' : 'White Label SEO Audit Tool'}
            <br />
            <span className="text-blue-400">{zh ? '专为代理机构打造' : 'Built for Agencies'}</span>
          </h1>
          <p className="text-base text-[#94a3b8] max-w-xl mx-auto mb-8 leading-relaxed">
            {zh
              ? '使用SEO Radar X为你的客户提供专业的SEO审计报告。30项检测，30秒出结果，$9.99获取完整PDF报告——专为跨境Shopify和WordPress客户设计。'
              : 'Use SEO Radar X to deliver professional SEO audits to your clients. 30 checks, results in 30 seconds, $9.99 for a full PDF report — built for cross-border Shopify and WordPress clients.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href={`/${params.locale}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all shadow-lg shadow-blue-900/40"
            >
              {zh ? '🔍 免费试用一次审计 →' : '🔍 Try a Free Audit Now →'}
            </Link>
            <a
              href="mailto:support@seoradarx.com?subject=Agency Plan Inquiry"
              className="inline-flex items-center gap-2 border border-[#1e3a5f] hover:border-blue-600/50 text-[#94a3b8] hover:text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all"
            >
              {zh ? '✉️ 咨询代理机构方案' : '✉️ Ask About Agency Plan'}
            </a>
          </div>
          <p className="text-xs text-[#4a5568]">
            {zh ? '无需注册 · 支持 Shopify / WordPress / 任意网站' : 'No sign-up · Works with Shopify, WordPress & any site'}
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '为什么代理机构选择 SEO Radar X？' : 'Why Agencies Use SEO Radar X'}
          </h2>
          <p className="text-sm text-[#64748b] mb-7">
            {zh
              ? '专为服务跨境电商客户的SEO代理机构设计，覆盖通用工具无法检测的国际SEO维度。'
              : 'Designed for agencies serving cross-border e-commerce clients — covering international SEO dimensions that generic tools miss.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">{title}</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '如何使用（4步）' : 'How It Works (4 Steps)'}
          </h2>
          <div className="space-y-4">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4 rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0 mt-0.5">{n}</div>
                <div>
                  <div className="text-sm font-bold text-[#e2e8f0] mb-1">{title}</div>
                  <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-6">
            {zh ? '定价方案' : 'Pricing'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Free */}
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
              <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">{zh ? '免费版' : 'Free'}</div>
              <div className="text-2xl font-black text-[#e2e8f0] mb-1">$0</div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '每天10次' : '10 audits/day'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['完整在线评分报告', '30项检测结果', '优化建议摘要', '无需注册'] : ['Full online score report', 'All 30 check results', 'Fix summaries', 'No sign-up']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-emerald-500">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            {/* Per Report */}
            <div className="rounded-xl border border-blue-600/50 bg-blue-950/20 p-5 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-blue-600 text-white px-3 py-0.5 rounded-full">{zh ? '代理机构推荐' : 'Agency Favorite'}</div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">{zh ? '完整报告' : 'Full Report'}</div>
              <div className="text-2xl font-black text-[#e2e8f0] mb-1">$9.99 <span className="text-sm text-[#64748b]">{zh ? '/ 份' : '/ report'}</span></div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '¥68 · 单次购买' : 'One-time purchase'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['30项完整详细解析', '优先修复清单（排序好）', 'Shopify/WP专项建议', '中英双语PDF', '可分享给开发者'] : ['30 checks fully explained', 'Priority fix checklist', 'Shopify/WP specific tips', 'Bilingual EN+ZH PDF', 'Share with developers']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-blue-400">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            {/* Agency Plan */}
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
              <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">{zh ? '代理机构套餐' : 'Agency Plan'}</div>
              <div className="text-2xl font-black text-[#94a3b8] mb-1">{zh ? '即将推出' : 'Coming Soon'}</div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '加入等待名单' : 'Join waitlist'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['批量审计API', '白标品牌定制', '客户管理面板', '按量计费', '优先支持'] : ['Bulk audit API', 'White label branding', 'Client management dashboard', 'Volume pricing', 'Priority support']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-[#4a5568]">○</span>{i}</li>
                ))}
              </ul>
              <a
                href="mailto:support@seoradarx.com?subject=Agency Plan Waitlist"
                className="mt-4 block text-center text-xs font-bold text-[#64748b] hover:text-[#94a3b8] border border-[#1e3a5f] hover:border-[#94a3b8]/30 rounded-lg px-3 py-2 transition-all"
              >
                {zh ? '加入等待名单 →' : 'Join Waitlist →'}
              </a>
            </div>
          </div>
        </section>

        {/* Comparison vs generic tools */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-6">
            {zh ? 'SEO Radar X vs 通用SEO工具' : 'SEO Radar X vs Generic SEO Tools'}
          </h2>
          <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e3a5f]/50">
                  <th className="text-left p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">{zh ? '功能' : 'Feature'}</th>
                  <th className="p-4 text-xs font-bold text-blue-400 uppercase tracking-wider">SEO Radar X</th>
                  <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">{zh ? '通用SEO工具' : 'Generic Tools'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a5f]/30">
                {(zh ? [
                  ['Hreflang完整检测', '✅ 是', '⚠️ 部分'],
                  ['geo.region / GEO标签检测', '✅ 是', '❌ 否'],
                  ['Shopify专项修复建议', '✅ 是', '❌ 否'],
                  ['中英双语报告', '✅ 是', '❌ 否'],
                  ['30秒出结果', '✅ 是', '❌ 需要数分钟'],
                  ['无需注册即可使用', '✅ 是', '❌ 通常需要'],
                  ['每份报告成本', '✅ $9.99', '❌ $99–299/月订阅'],
                ] : [
                  ['Full hreflang audit', '✅ Yes', '⚠️ Partial'],
                  ['geo.region / GEO tag checks', '✅ Yes', '❌ No'],
                  ['Shopify-specific fix tips', '✅ Yes', '❌ No'],
                  ['Bilingual EN+ZH reports', '✅ Yes', '❌ No'],
                  ['Results in 30 seconds', '✅ Yes', '❌ Minutes'],
                  ['No sign-up required', '✅ Yes', '❌ Usually required'],
                  ['Cost per report', '✅ $9.99', '❌ $99–299/mo subscription'],
                ]).map(([feat, ours, theirs]) => (
                  <tr key={feat} className="hover:bg-[#0f1729]/50 transition-colors">
                    <td className="p-4 text-xs text-[#94a3b8]">{feat}</td>
                    <td className="p-4 text-xs text-emerald-400 text-center font-semibold">{ours}</td>
                    <td className="p-4 text-xs text-[#4a5568] text-center">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-8 text-center mb-14">
          <div className="text-4xl mb-4">🏢</div>
          <h2 className="text-xl font-black text-[#e2e8f0] mb-3">
            {zh ? '立即为你的客户运行SEO审计' : 'Run an SEO Audit for Your Client Now'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6 max-w-md mx-auto leading-relaxed">
            {zh
              ? '免费版立即可用，无需注册。$9.99完整PDF报告可以直接交付给客户，展示你的专业价值。'
              : 'The free version is instant — no sign-up needed. The $9.99 full PDF report can be delivered directly to clients to demonstrate your expertise.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-4 font-bold text-base transition-all shadow-lg shadow-blue-900/30"
          >
            {zh ? '免费试用 →' : 'Try Free Audit →'}
          </Link>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <h3 className="text-sm font-bold text-[#e2e8f0] mb-2">{q}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e3a5f]/30 py-8 text-center">
        <p className="text-xs text-[#4a5568]">
          © 2025 SEO Radar X ·{' '}
          <Link href={`/${params.locale}/pricing`} className="hover:text-[#64748b]">{zh ? '价格' : 'Pricing'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/privacy`} className="hover:text-[#64748b]">{zh ? '隐私政策' : 'Privacy'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/terms`} className="hover:text-[#64748b]">{zh ? '服务条款' : 'Terms'}</Link>
        </p>
      </footer>
    </div>
  )
}
