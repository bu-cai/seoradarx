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
      ? '代理机构SEO审计工具 — 30项检测 30秒出结果 | SEO Radar X'
      : 'SEO Audit Tool for Agencies — 30 Checks, 30 Seconds, PDF Reports | SEO Radar X',
    description: zh
      ? '专为SEO代理机构设计的审计工具。30秒完成30项检测，覆盖hreflang、Schema、Core Web Vitals。帮助你快速为Shopify和WordPress客户发现SEO问题，提升服务价值。'
      : 'SEO audit tool built for agencies. Run 30 checks in 30 seconds — hreflang, Schema, Core Web Vitals & more. Quickly find SEO issues for your Shopify and WordPress clients.',
    keywords: zh
      ? ['代理机构seo审计工具', 'seo审计工具代理机构', '代理机构seo报告', '客户seo检测', '代理机构seo软件', '本地seo审计工具代理机构']
      : ['seo audit tool for agencies', 'local seo audit tools for agencies', 'agency seo audit tool', 'seo reporting tool for agencies', 'client seo audit', 'seo audit software agencies'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/seo-audit-agencies`,
      languages: {
        'zh-CN':     `${BASE_URL}/zh/seo-audit-agencies`,
        'en-US':     `${BASE_URL}/en/seo-audit-agencies`,
        'x-default': `${BASE_URL}/en/seo-audit-agencies`,
      },
    },
    openGraph: {
      title: zh ? '代理机构SEO审计工具 — 30项检测' : 'SEO Audit Tool for Agencies — 30 Checks in 30s',
      description: zh
        ? '专为服务跨境电商客户的SEO代理机构而设计。'
        : 'Built for agencies serving cross-border e-commerce clients.',
      url: `${BASE_URL}/${params.locale}/seo-audit-agencies`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

export default function AgenciesPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  const painPoints = zh ? [
    { icon: '⏱️', problem: '手动审计太耗时', solution: '30秒完成30项检测，立刻出结果' },
    { icon: '🌐', problem: '通用工具不检测hreflang / GEO', solution: '专项检测hreflang、geo.region、x-default等国际SEO信号' },
    { icon: '📊', problem: '向客户解释SEO问题太难', solution: '清晰的评分+问题优先级，客户一眼就懂' },
    { icon: '💸', problem: '专业工具订阅费用高', solution: '$9.99/份报告，按需购买，无月费压力' },
  ] : [
    { icon: '⏱️', problem: 'Manual audits take hours', solution: '30 checks complete in 30 seconds — instant results' },
    { icon: '🌐', problem: 'Generic tools miss hreflang & GEO checks', solution: 'Dedicated hreflang, geo.region, x-default checks for international clients' },
    { icon: '📊', problem: 'Hard to explain SEO issues to clients', solution: 'Clear scores + prioritized issues clients immediately understand' },
    { icon: '💸', problem: 'Pro tools cost $100+/month per seat', solution: '$9.99/report, pay only when you need it' },
  ]

  const useCases = zh ? [
    { title: '客户提案阶段', desc: '在发送提案前，快速运行潜在客户的免费审计。用具体的分数和问题清单展示你发现了哪些问题，说明你的服务价值。比任何话术都更有说服力。', badge: '🎯 新客户开发' },
    { title: '月度汇报', desc: '每月运行一次客户网站审计，对比分数变化。$9.99的PDF报告可以直接发给客户，清晰展示本月SEO工作成果，提升客户续约率。', badge: '📈 保留客户' },
    { title: '跨境电商专项', desc: '专为Shopify和WordPress跨境独立站客户设计。检测hreflang配置、geo.region标签、多货币支持等通用工具检测不到的维度。', badge: '🛍️ 跨境专项' },
    { title: '快速问题定位', desc: '客户说"我的谷歌流量下降了"？30秒运行一次审计，立刻看到最可能的技术原因。不需要等待漫长的全站爬取。', badge: '🔍 故障排查' },
  ] : [
    { title: 'Client Prospecting', desc: 'Before sending a proposal, quickly run a free audit on the prospect\'s site. Show them the exact issues you found and explain why your services will fix them. More persuasive than any pitch deck.', badge: '🎯 New Business' },
    { title: 'Monthly Reporting', desc: 'Run a monthly audit for each client and track score changes. The $9.99 PDF can be sent directly to clients showing progress — improving retention and demonstrating ongoing value.', badge: '📈 Retention' },
    { title: 'Cross-Border E-Commerce', desc: 'Built for Shopify and WordPress cross-border clients. Audits hreflang configuration, geo.region tags, and multi-currency signals that generic tools miss entirely.', badge: '🛍️ Cross-Border' },
    { title: 'Rapid Issue Diagnosis', desc: '"My Google traffic dropped." Run a 30-second audit and immediately see the most likely technical causes. No waiting for a full site crawl.', badge: '🔍 Troubleshooting' },
  ]

  const checks = zh ? [
    { cat: 'GEO / 国际SEO', items: ['Hreflang标签检测', 'x-default配置', 'geo.region元标签', '语言代码格式', '多货币信号'] },
    { cat: '技术SEO', items: ['HTTPS检测', 'Canonical标签', 'robots.txt分析', 'XML站点地图', '可索引性'] },
    { cat: '页面SEO', items: ['标题标签', 'Meta描述', 'H1/H2结构', '图片Alt文本', '内容长度'] },
    { cat: '性能速度', items: ['Core Web Vitals', '页面速度评估', '移动端适配', '资源压缩', 'HTTPS重定向'] },
    { cat: '结构化数据', items: ['Schema标记检测', 'Open Graph标签', 'Twitter Card', 'JSON-LD格式', '富媒体摘要资格'] },
  ] : [
    { cat: 'GEO / International', items: ['Hreflang tags', 'x-default setup', 'geo.region meta', 'Locale code format', 'Multi-currency signals'] },
    { cat: 'Technical SEO', items: ['HTTPS check', 'Canonical tags', 'robots.txt analysis', 'XML sitemap', 'Indexability'] },
    { cat: 'On-Page SEO', items: ['Title tags', 'Meta descriptions', 'H1/H2 structure', 'Image alt text', 'Content length'] },
    { cat: 'Performance', items: ['Core Web Vitals', 'Page speed', 'Mobile-friendliness', 'Resource compression', 'HTTPS redirect'] },
    { cat: 'Structured Data', items: ['Schema markup', 'Open Graph tags', 'Twitter Card', 'JSON-LD format', 'Rich snippet eligibility'] },
  ]

  const faqs = zh ? [
    { q: 'SEO Radar X适合代理机构使用吗？', a: '非常适合，尤其是服务跨境电商客户的代理机构。我们的hreflang和GEO检测覆盖了大多数通用SEO工具无法提供的国际SEO维度。$9.99/份的成本远低于Semrush（$139/月起）等工具的订阅费用。' },
    { q: '一次可以审计多少个URL？', a: '目前每次审计单个URL，免费版每天10次。我们正在开发批量审计API，适合需要同时管理多个客户网站的代理机构。加入等待名单可第一时间获知。' },
    { q: 'PDF报告可以定制品牌吗？', a: '目前PDF报告显示SEO Radar X品牌。白标定制（代理机构品牌报告）正在开发中，是我们代理机构套餐的核心功能。感兴趣请发邮件至 support@seoradarx.com 加入等待名单。' },
    { q: '支持哪些平台？', a: 'SEO Radar X支持任何可通过URL访问的网站，包括Shopify、WordPress、自建网站等。针对Shopify和WordPress，报告会提供平台专属的修复建议和代码示例。' },
    { q: '与 Semrush 或 Ahrefs 相比有什么优势？', a: 'Semrush和Ahrefs是功能全面的平台，适合关键词研究、外链分析等长期SEO工作。SEO Radar X专注于单页面技术审计，特别强化了hreflang和GEO检测，对跨境电商客户更专业，且无需高额月费——$9.99/份按需购买更灵活。' },
  ] : [
    { q: 'Is SEO Radar X suitable for agencies?', a: 'Absolutely — especially agencies serving cross-border e-commerce clients. Our hreflang and GEO checks cover international SEO dimensions most generic tools miss entirely. The $9.99/report cost is far lower than Semrush ($139/month+) subscriptions.' },
    { q: 'How many URLs can I audit at once?', a: 'Currently one URL per audit, with 10 free audits/day. We\'re building a bulk audit API for agencies managing multiple client sites simultaneously. Join the waitlist to be notified first.' },
    { q: 'Can I white-label the PDF reports?', a: 'PDF reports currently carry SEO Radar X branding. White label customization (branded agency reports) is in development as a core feature of our agency plan. Email support@seoradarx.com to join the waitlist.' },
    { q: 'Which platforms do you support?', a: 'SEO Radar X works with any URL-accessible website including Shopify, WordPress, and custom-built sites. For Shopify and WordPress, reports include platform-specific fix instructions and code snippets.' },
    { q: 'How does it compare to Semrush or Ahrefs?', a: 'Semrush and Ahrefs are full-featured platforms great for keyword research and link analysis. SEO Radar X specializes in single-page technical auditing, with particularly strong hreflang and GEO checks for cross-border clients — and no expensive monthly subscription.' },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
      { '@type': 'ListItem', position: 2, name: zh ? '代理机构SEO审计工具' : 'SEO Audit Tool for Agencies', item: `${BASE_URL}/${params.locale}/seo-audit-agencies` },
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          <Link href={zh ? `/en/seo-audit-agencies` : `/zh/seo-audit-agencies`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mt-8 mb-6">
          <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">{zh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <span className="text-[#64748b]">{zh ? '代理机构SEO审计工具' : 'SEO Audit Tool for Agencies'}</span>
        </nav>

        {/* Hero */}
        <section className="text-center pt-4 pb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 mb-6">
            🏆 {zh ? '代理机构SEO工具' : 'Agency SEO Tool'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] leading-tight mb-4">
            {zh ? '代理机构专用SEO审计工具' : 'SEO Audit Tool for Agencies'}
            <br />
            <span className="text-blue-400">{zh ? '30项检测 · 30秒 · $9.99报告' : '30 Checks · 30 Seconds · $9.99 Reports'}</span>
          </h1>
          <p className="text-base text-[#94a3b8] max-w-xl mx-auto mb-8 leading-relaxed">
            {zh
              ? '帮助你的代理机构快速为Shopify和WordPress客户发现SEO问题。专项检测hreflang、GEO信号和国际SEO——这是竞对工具覆盖不到的维度。'
              : 'Help your agency quickly find SEO issues for Shopify and WordPress clients. Specialized hreflang, GEO, and international SEO checks that competing tools don\'t cover.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-4 font-bold text-base transition-all shadow-lg shadow-blue-900/40"
          >
            {zh ? '🔍 免费运行第一次审计 →' : '🔍 Run Your First Free Audit →'}
          </Link>
          <p className="text-xs text-[#4a5568] mt-3">
            {zh ? '无需注册 · 30秒出结果 · 10次/天免费' : 'No sign-up · 30-second results · 10 free/day'}
          </p>
        </section>

        {/* Pain Points → Solutions */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '解决代理机构最常见的SEO难题' : 'Solving the Biggest Agency SEO Frustrations'}
          </h2>
          <div className="space-y-3">
            {painPoints.map(({ icon, problem, solution }) => (
              <div key={problem} className="flex gap-4 rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-xs text-red-400 line-through">{problem}</span>
                    <span className="hidden sm:inline text-[#4a5568]">→</span>
                    <span className="text-xs font-semibold text-emerald-400">{solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '代理机构使用场景' : 'How Agencies Use SEO Radar X'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map(({ title, desc, badge }) => (
              <div key={title} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="text-xs font-semibold text-blue-400 mb-2">{badge}</div>
                <h3 className="text-sm font-bold text-[#e2e8f0] mb-2">{title}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 30 Checks breakdown */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '30项检测覆盖全面' : '30 Checks Across 5 Categories'}
          </h2>
          <p className="text-sm text-[#64748b] mb-7">
            {zh
              ? '每项检测都包含具体的修复建议——不只是告诉客户"有问题"，而是告诉他们"如何修复"。'
              : 'Every check includes a specific fix recommendation — not just "there\'s a problem" but exactly how to fix it.'}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {checks.map(({ cat, items }) => (
              <div key={cat} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-4">
                <div className="text-xs font-bold text-blue-400 mb-3">{cat}</div>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex gap-1.5 text-xs text-[#64748b]">
                      <span className="text-emerald-500 flex-shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-8 text-center mb-14">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-xl font-black text-[#e2e8f0] mb-3">
            {zh ? '立即为你的第一个客户运行审计' : 'Run Your First Client Audit Now'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6 max-w-md mx-auto leading-relaxed">
            {zh
              ? '免费版无需注册，30秒出结果。$9.99完整PDF报告可直接交付给客户，包含优先修复清单和Shopify/WordPress专项建议。'
              : 'No sign-up required for the free version. $9.99 for a full PDF report you can deliver directly to clients, complete with a priority fix checklist and platform-specific recommendations.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${params.locale}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
            >
              {zh ? '免费运行审计 →' : 'Run Free Audit →'}
            </Link>
            <Link
              href={`/${params.locale}/pricing`}
              className="inline-flex items-center gap-2 border border-[#1e3a5f] hover:border-blue-600/50 text-[#94a3b8] hover:text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all"
            >
              {zh ? '查看定价 →' : 'View Pricing →'}
            </Link>
          </div>
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
          <Link href={`/${params.locale}/white-label-seo-audit`} className="hover:text-[#64748b]">{zh ? '白标工具' : 'White Label'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/pricing`} className="hover:text-[#64748b]">{zh ? '价格' : 'Pricing'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/privacy`} className="hover:text-[#64748b]">{zh ? '隐私政策' : 'Privacy'}</Link>
        </p>
      </footer>
    </div>
  )
}
