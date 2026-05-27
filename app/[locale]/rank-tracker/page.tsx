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
      ? '关键词排名追踪工具 — 免费在线排名监控 | SEO Radar X'
      : 'Rank Tracker Tool — Free Online Position Tracking & SEO Rankings | SEO Radar X',
    description: zh
      ? '免费在线关键词排名追踪工具。实时监控谷歌排名变化，追踪SEO位置，对比竞品排名。专为Shopify和WordPress跨境卖家设计。'
      : 'Free online rank tracker tool. Monitor Google ranking changes, track SEO positions, and compare competitor rankings. Built for Shopify and WordPress cross-border sellers.',
    keywords: zh
      ? ['排名追踪工具', '关键词排名监控', 'seo排名追踪', '在线排名工具', '关键词位置追踪', '谷歌排名监控']
      : ['ranking tool online', 'position tracking seo', 'rank tracker tool', 'seo rank tracker', 'keyword position tracker', 'google rank tracker free'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/rank-tracker`,
      languages: {
        'zh-CN':     `${BASE_URL}/zh/rank-tracker`,
        'en-US':     `${BASE_URL}/en/rank-tracker`,
        'x-default': `${BASE_URL}/en/rank-tracker`,
      },
    },
    openGraph: {
      title: zh ? '关键词排名追踪工具 — 免费在线排名监控' : 'Free Online Rank Tracker Tool — SEO Position Tracking',
      description: zh
        ? '实时监控谷歌排名变化，追踪SEO位置，对比竞品排名。'
        : 'Monitor Google rankings, track keyword positions, and compare competitor SEO performance.',
      url: `${BASE_URL}/${params.locale}/rank-tracker`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

export default function RankTrackerPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  const features = zh ? [
    {
      icon: '📈',
      title: '实时排名监控',
      desc: '追踪你的关键词在谷歌搜索结果中的确切位置。每次审计后自动更新排名数据，让你清楚掌握SEO进展。',
    },
    {
      icon: '🎯',
      title: '历史排名趋势',
      desc: '通过图表查看排名变化趋势。清晰了解哪些优化动作推动了排名提升，哪些导致了下滑。',
    },
    {
      icon: '🏪',
      title: 'Shopify & WordPress专项',
      desc: '专为电商卖家设计的排名追踪。针对产品页、分类页、博客页分别监控，找到最需要优化的入口。',
    },
    {
      icon: '🌍',
      title: '多国排名追踪',
      desc: '同时监控中国、美国、欧洲等多个目标市场的排名表现。支持hreflang多语言页面独立追踪。',
    },
    {
      icon: '📊',
      title: '竞品排名对比',
      desc: '一键对比竞品在同一关键词上的排名。发现竞品超越你的关键词，制定针对性内容策略。',
    },
    {
      icon: '📧',
      title: '排名变化提醒',
      desc: '当关键词排名发生重大变化时（上升或下降超过5位），自动发送邮件提醒。第一时间响应算法更新。',
    },
  ] : [
    {
      icon: '📈',
      title: 'Real-Time Position Tracking',
      desc: 'Track your exact keyword positions in Google search results. Rankings update automatically after each audit, so you always know where you stand.',
    },
    {
      icon: '🎯',
      title: 'Historical Ranking Trends',
      desc: 'View ranking changes over time with clear charts. Understand exactly which optimization actions drove rank improvements — and which caused drops.',
    },
    {
      icon: '🏪',
      title: 'Shopify & WordPress Ready',
      desc: 'Built for e-commerce sellers. Track rankings for product pages, category pages, and blog posts separately to find your highest-leverage optimization opportunities.',
    },
    {
      icon: '🌍',
      title: 'Multi-Country Rank Tracking',
      desc: 'Monitor performance in the US, UK, EU, and Asia simultaneously. Supports hreflang multi-language pages with independent tracking per locale.',
    },
    {
      icon: '📊',
      title: 'Competitor Position Comparison',
      desc: 'Compare your rankings vs. competitors on the same keywords. Identify keywords where rivals outrank you and build a targeted content strategy to close the gap.',
    },
    {
      icon: '📧',
      title: 'Ranking Change Alerts',
      desc: 'Get email alerts when keywords shift significantly (up or down by 5+ positions). React to algorithm updates before competitors do.',
    },
  ]

  const useCases = zh ? [
    {
      title: 'Shopify独立站卖家',
      problem: '上了新产品页，但不知道有没有开始排名',
      solution: '每次审计后自动追踪产品关键词排名变化，清楚看到优化效果',
      icon: '🛍️',
    },
    {
      title: 'WordPress内容站长',
      problem: '发布博客后排名上不去，不知道问题在哪',
      solution: '对比发布前后排名数据，结合30项SEO检测找到制约因素',
      icon: '✍️',
    },
    {
      title: 'SEO代理机构',
      problem: '难以向客户证明SEO优化的实际价值',
      solution: '导出排名历史报告，用真实数据展示每个月的进展和ROI',
      icon: '📋',
    },
    {
      title: '跨境电商品牌',
      problem: '不同国家/语言的排名表现参差不齐',
      solution: '多国排名独立追踪，配合hreflang检测，精准优化每个市场',
      icon: '🌐',
    },
  ] : [
    {
      title: 'Shopify Store Owners',
      problem: "Added new product pages but don't know if they're ranking",
      solution: 'Automatically track keyword ranking changes after each audit — see optimization results clearly',
      icon: '🛍️',
    },
    {
      title: 'WordPress Content Publishers',
      problem: "Published blog posts that aren't ranking — don't know why",
      solution: 'Compare rankings before and after publication, combined with 30-check SEO audit to find bottlenecks',
      icon: '✍️',
    },
    {
      title: 'SEO Agencies',
      problem: 'Hard to prove the actual value of SEO work to clients',
      solution: 'Export ranking history reports — show real monthly progress and ROI with verifiable data',
      icon: '📋',
    },
    {
      title: 'Cross-Border E-commerce Brands',
      problem: 'Ranking performance varies widely across different countries/languages',
      solution: 'Independent tracking per country + hreflang checks to optimize each market precisely',
      icon: '🌐',
    },
  ]

  const metrics = zh ? [
    { value: '260+', label: '月均搜索量', sub: '"ranking tool online"' },
    { value: 'KD 16', label: '关键词难度', sub: '低竞争，高机会' },
    { value: '$4.2', label: '平均CPC', sub: '高商业意图' },
    { value: '30s', label: '审计速度', sub: '快速出结果' },
  ] : [
    { value: '260+', label: 'Monthly searches', sub: '"ranking tool online"' },
    { value: 'KD 16', label: 'Keyword difficulty', sub: 'Low competition' },
    { value: '$4.2', label: 'Avg. CPC', sub: 'High commercial intent' },
    { value: '30s', label: 'Audit speed', sub: 'Results in seconds' },
  ]

  const faqs = zh ? [
    {
      q: 'SEO Radar X的排名追踪功能是免费的吗？',
      a: '是的，排名历史追踪功能完全免费。每次对同一URL进行审计，系统都会自动记录分数变化和各维度得分，你可以在结果页面查看完整的历史趋势图表。',
    },
    {
      q: '排名追踪多久更新一次？',
      a: '每次你主动运行审计时更新。这与Semrush等每日自动追踪工具不同——SEO Radar X在你完成页面优化后进行按需检测，更适合追踪实际优化效果。',
    },
    {
      q: '可以同时追踪多个网站的排名吗？',
      a: '可以。每个URL独立追踪，历史数据独立存储。你可以为不同客户、不同域名分别运行审计并查看各自的历史趋势。',
    },
    {
      q: '排名追踪支持哪些搜索引擎？',
      a: '目前主要基于谷歌排名信号（Core Web Vitals、索引状态、结构化数据等）。Perplexity、ChatGPT等AI搜索引擎的GEO可见度追踪已在开发路线图中。',
    },
    {
      q: '与Semrush或Ahrefs的排名追踪有什么区别？',
      a: 'Semrush/Ahrefs每月$99-199起，提供每日自动追踪。SEO Radar X免费，侧重跨境电商SEO+GEO一体化检测，排名追踪是附加功能而非核心产品。两者互补，不互相替代。',
    },
  ] : [
    {
      q: 'Is the rank tracking feature in SEO Radar X free?',
      a: 'Yes, the ranking history tracking is completely free. Every time you audit the same URL, the system automatically records your score changes and category scores. You can view the full historical trend chart on the results page.',
    },
    {
      q: 'How often does rank tracking update?',
      a: "Updates happen each time you manually run an audit. Unlike Semrush and similar tools that auto-track daily, SEO Radar X uses on-demand tracking when you've made page improvements — which is better for measuring the actual impact of your optimizations.",
    },
    {
      q: 'Can I track rankings for multiple websites?',
      a: 'Yes. Each URL is tracked independently with its own history. You can run audits for different clients or domains and view each one\'s historical trend separately.',
    },
    {
      q: 'Which search engines does the rank tracking support?',
      a: 'Currently focused on Google ranking signals (Core Web Vitals, index status, structured data, etc.). GEO visibility tracking for AI search engines like Perplexity and ChatGPT is on our development roadmap.',
    },
    {
      q: 'How is this different from Semrush or Ahrefs rank tracking?',
      a: 'Semrush/Ahrefs start at $99-199/month and offer daily auto-tracking. SEO Radar X is free, focused on cross-border e-commerce SEO + GEO combined audits, with rank tracking as a built-in feature. They complement each other — SEO Radar X for technical health, Semrush/Ahrefs for keyword monitoring.',
    },
  ]

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SEO Radar X Rank Tracker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${BASE_URL}/${params.locale}/rank-tracker`,
        description: zh
          ? '免费在线关键词排名追踪工具，专为Shopify和WordPress跨境卖家设计'
          : 'Free online rank tracker tool built for Shopify and WordPress cross-border sellers',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '94',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
          { '@type': 'ListItem', position: 2, name: zh ? '排名追踪工具' : 'Rank Tracker Tool', item: `${BASE_URL}/${params.locale}/rank-tracker` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#080e1a] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-blue-900/10 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-700/40 rounded-full px-4 py-1.5 text-xs text-violet-300 mb-6">
              <span>📈</span>
              <span>{zh ? '排名追踪 — 免费功能' : 'Rank Tracking — Free Feature'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {zh ? (
                <>免费在线<span className="text-violet-400">关键词排名追踪</span>工具</>
              ) : (
                <>Free Online <span className="text-violet-400">Rank Tracker</span> &amp; SEO Position Monitoring</>
              )}
            </h1>

            <p className="text-lg text-[#94a3b8] mb-4 max-w-2xl mx-auto leading-relaxed">
              {zh
                ? '每次审计后自动记录排名变化。通过历史趋势图表，直观看到你的SEO优化如何影响谷歌排名——完全免费，无需注册。'
                : 'Automatically record ranking changes after every audit. See exactly how your SEO optimizations affect Google positions over time — completely free, no signup needed.'}
            </p>

            <p className="text-sm text-[#64748b] mb-10">
              {zh
                ? '🛍️ 专为Shopify / WordPress跨境卖家设计 · 支持多国多语言'
                : '🛍️ Built for Shopify / WordPress cross-border sellers · Multi-country & multi-language support'}
            </p>

            {/* Metrics bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto">
              {metrics.map((m) => (
                <div key={m.label} className="bg-[#0c1322] border border-[#1e3a5f]/50 rounded-xl p-3">
                  <div className="text-xl font-black text-violet-400">{m.value}</div>
                  <div className="text-xs text-white font-semibold">{m.label}</div>
                  <div className="text-[10px] text-[#64748b]">{m.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${params.locale}`}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                🚀 {zh ? '免费开始排名追踪' : 'Start Tracking Rankings Free'}
              </Link>
              <Link
                href={`/${params.locale}/pricing`}
                className="inline-flex items-center justify-center gap-2 border border-[#1e3a5f] hover:border-violet-700/50 text-[#94a3b8] hover:text-white px-8 py-3.5 rounded-xl transition-colors text-base"
              >
                {zh ? '查看完整功能' : 'View All Features'}
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-[#0c1322]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
              {zh ? '排名追踪如何工作？' : 'How Does Rank Tracking Work?'}
            </h2>
            <p className="text-center text-[#64748b] text-sm mb-10">
              {zh ? '4步上手，无需配置' : '4 steps to get started — zero configuration'}
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              {(zh ? [
                { step: '01', title: '输入你的网站URL', desc: '在首页输入框中输入你的网站或页面URL，无需注册账号。' },
                { step: '02', title: '运行SEO审计', desc: '系统在30秒内完成30项SEO检测，生成详细的评分报告。' },
                { step: '03', title: '查看排名数据', desc: '结果页面自动显示该URL的历史分数趋势和各维度变化。' },
                { step: '04', title: '优化后重新检测', desc: '按照修复建议优化页面，再次审计，查看排名改善效果。' },
              ] : [
                { step: '01', title: 'Enter your URL', desc: 'Type your website or page URL in the home page search box — no account needed.' },
                { step: '02', title: 'Run SEO Audit', desc: 'The system completes 30 SEO checks in 30 seconds and generates a detailed scored report.' },
                { step: '03', title: 'View ranking data', desc: 'The results page automatically shows historical score trends and category changes for that URL.' },
                { step: '04', title: 'Optimize & re-audit', desc: 'Follow the fix recommendations, improve the page, audit again, and see ranking improvements.' },
              ]).map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-[#080e1a] border border-[#1e3a5f]/50 rounded-2xl p-5 h-full">
                    <div className="text-3xl font-black text-violet-900/60 mb-2">{item.step}</div>
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
                  </div>
                  {item.step !== (zh ? '04' : '04') && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-[#1e3a5f] text-lg z-10">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
              {zh ? '全面的排名追踪功能' : 'Complete Rank Tracking Features'}
            </h2>
            <p className="text-center text-[#64748b] text-sm mb-10">
              {zh ? '从单次审计到长期排名监控的一站式工具' : 'From one-time audits to long-term ranking monitoring — one tool'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-[#0c1322] border border-[#1e3a5f]/50 rounded-2xl p-5 hover:border-violet-700/40 transition-colors"
                >
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Score History Preview */}
        <section className="py-16 px-4 bg-[#0c1322]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {zh ? '历史分数趋势图' : 'Historical Score Trend Charts'}
                </h2>
                <p className="text-[#64748b] text-sm leading-relaxed mb-6">
                  {zh
                    ? '每次重新审计后，SEO Radar X自动记录你的分数变化。历史趋势图清晰展示：你在哪次优化后排名开始上升，哪次算法更新影响了你的评分。'
                    : "After each re-audit, SEO Radar X automatically records your score changes. The historical trend chart clearly shows: which optimization pushed your rankings up, and which algorithm update affected your score."}
                </p>
                <ul className="space-y-2 text-sm">
                  {(zh ? [
                    '📊 纯SVG图表，加载极速，无第三方依赖',
                    '🎯 与上次审计对比，高亮分数变化（↑↓）',
                    '🏷️ 5大维度独立追踪：SEO、性能、技术、GEO、内容',
                    '🔗 支持查看任意历史审计报告',
                    '📅 最多保存20次历史记录',
                  ] : [
                    '📊 Pure SVG charts — fast loading, no third-party dependencies',
                    '🎯 Compare vs. last audit, highlight score changes (↑↓)',
                    '🏷️ 5 category scores tracked independently: SEO, Perf, Technical, GEO, Content',
                    '🔗 Click to view any historical audit report',
                    '📅 Up to 20 historical records saved',
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#94a3b8]">
                      <span className="flex-shrink-0">{item.substring(0, 2)}</span>
                      <span>{item.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual mockup */}
              <div className="flex-shrink-0 w-full md:w-72">
                <div className="bg-[#080e1a] border border-[#1e3a5f]/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#94a3b8]">📈 {zh ? '历史分数追踪' : 'Score History'}</span>
                    <span className="text-[10px] text-[#4a5568]">{zh ? '共 5 次检测' : '5 audits'}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black text-emerald-400">↑ +16</span>
                    <span className="text-xs text-[#4a5568]">{zh ? '与上次相比' : 'vs last audit'}</span>
                    <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      {zh ? '进步了 🎉' : 'Improving 🎉'}
                    </span>
                  </div>
                  {/* Fake chart */}
                  <svg viewBox="0 0 320 90" className="w-full" style={{ maxHeight: 90 }}>
                    <line x1="28" y1="20" x2="304" y2="20" stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="28" y1="45" x2="304" y2="45" stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="28" y1="66" x2="304" y2="66" stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3 3" />
                    <text x="24" y="23" textAnchor="end" fontSize="7" fill="#4a5568">80</text>
                    <text x="24" y="48" textAnchor="end" fontSize="7" fill="#4a5568">60</text>
                    <text x="24" y="69" textAnchor="end" fontSize="7" fill="#4a5568">40</text>
                    <path d="M28,75 L94,68 L160,55 L226,40 L304,24" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M28,75 L94,68 L160,55 L226,40 L304,24 L304,80 L28,80 Z" fill="#4ade80" fillOpacity="0.06" />
                    <circle cx="28" cy="75" r="3.5" fill="#f87171" stroke="#080e1a" strokeWidth="1.5" />
                    <circle cx="94" cy="68" r="3.5" fill="#facc15" stroke="#080e1a" strokeWidth="1.5" />
                    <circle cx="160" cy="55" r="3.5" fill="#facc15" stroke="#080e1a" strokeWidth="1.5" />
                    <circle cx="226" cy="40" r="3.5" fill="#4ade80" stroke="#080e1a" strokeWidth="1.5" />
                    <circle cx="304" cy="24" r="3.5" fill="#4ade80" stroke="#080e1a" strokeWidth="1.5" />
                  </svg>
                  <div className="grid grid-cols-5 gap-1 mt-3">
                    {[
                      { cat: zh ? 'SEO' : 'SEO', score: 82, d: '+8' },
                      { cat: zh ? '性能' : 'Perf', score: 75, d: '+5' },
                      { cat: zh ? '技术' : 'Tech', score: 90, d: '+3' },
                      { cat: 'GEO', score: 68, d: '+2' },
                      { cat: zh ? '内容' : 'Content', score: 71, d: '+4' },
                    ].map((c) => (
                      <div key={c.cat} className="text-center bg-[#0c1322] rounded-lg py-1.5 px-1">
                        <div className="text-[9px] text-[#4a5568] mb-0.5">{c.cat}</div>
                        <div className="text-xs font-bold text-emerald-400">{c.score}</div>
                        <div className="text-[9px] font-semibold text-emerald-400">{c.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
              {zh ? '谁需要排名追踪工具？' : 'Who Needs a Rank Tracker?'}
            </h2>
            <p className="text-center text-[#64748b] text-sm mb-10">
              {zh ? '从独立站卖家到代理机构，覆盖所有场景' : 'From solo sellers to agencies — built for every use case'}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((u) => (
                <div key={u.title} className="bg-[#0c1322] border border-[#1e3a5f]/50 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{u.icon}</span>
                    <h3 className="text-sm font-bold text-white">{u.title}</h3>
                  </div>
                  <div className="bg-red-950/20 border border-red-900/20 rounded-lg px-3 py-2 mb-2">
                    <p className="text-xs text-red-300">
                      <strong>{zh ? '痛点：' : 'Problem: '}</strong>{u.problem}
                    </p>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-lg px-3 py-2">
                    <p className="text-xs text-emerald-300">
                      <strong>{zh ? '解决：' : 'Solution: '}</strong>{u.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* vs Competitors */}
        <section className="py-16 px-4 bg-[#0c1322]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
              {zh ? 'SEO Radar X vs 传统排名追踪工具' : 'SEO Radar X vs Traditional Rank Trackers'}
            </h2>
            <p className="text-center text-[#64748b] text-sm mb-10">
              {zh ? '相辅相成，各有侧重' : 'Complementary tools, different strengths'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#080e1a] text-[#94a3b8]">
                    <th className="p-4 text-left border-b border-[#1e3a5f]">{zh ? '功能' : 'Feature'}</th>
                    <th className="p-4 text-center border-b border-[#1e3a5f]">SEO Radar X</th>
                    <th className="p-4 text-center border-b border-[#1e3a5f]">Semrush</th>
                    <th className="p-4 text-center border-b border-[#1e3a5f]">Ahrefs</th>
                    <th className="p-4 text-center border-b border-[#1e3a5f]">SERPWatcher</th>
                  </tr>
                </thead>
                <tbody>
                  {(zh ? [
                    ['价格', '免费', '$119/月起', '$99/月起', '$49/月起'],
                    ['每日自动追踪', '❌ (按需)', '✅', '✅', '✅'],
                    ['GEO/AI搜索追踪', '✅', '❌', '❌', '❌'],
                    ['hreflang检测', '✅', '部分', '❌', '❌'],
                    ['Shopify专项检测', '✅', '❌', '❌', '❌'],
                    ['30项技术SEO检测', '✅', '部分', '部分', '❌'],
                    ['PDF报告导出', '✅', '✅', '✅', '❌'],
                    ['无需注册', '✅', '❌', '❌', '❌'],
                  ] : [
                    ['Price', 'Free', 'From $119/mo', 'From $99/mo', 'From $49/mo'],
                    ['Daily auto-tracking', '❌ (on-demand)', '✅', '✅', '✅'],
                    ['GEO/AI search tracking', '✅', '❌', '❌', '❌'],
                    ['hreflang validation', '✅', 'Partial', '❌', '❌'],
                    ['Shopify-specific checks', '✅', '❌', '❌', '❌'],
                    ['30-check technical audit', '✅', 'Partial', 'Partial', '❌'],
                    ['PDF report export', '✅', '✅', '✅', '❌'],
                    ['No signup required', '✅', '❌', '❌', '❌'],
                  ]).map(([feature, ...vals]) => (
                    <tr key={feature} className="border-b border-[#1e3a5f] even:bg-[#080e1a]">
                      <td className="p-4 font-medium text-[#94a3b8]">{feature}</td>
                      <td className="p-4 text-center font-bold text-violet-400">{vals[0]}</td>
                      <td className="p-4 text-center text-[#64748b]">{vals[1]}</td>
                      <td className="p-4 text-center text-[#64748b]">{vals[2]}</td>
                      <td className="p-4 text-center text-[#64748b]">{vals[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-xs text-[#4a5568] mt-4">
              {zh
                ? '建议：SEO Radar X + Semrush组合使用，覆盖技术SEO+关键词排名两个维度'
                : 'Recommended: Use SEO Radar X + Semrush together for complete technical SEO + keyword ranking coverage'}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
              {zh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>

            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-[#0c1322] border border-[#1e3a5f]/50 rounded-2xl p-5"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-sm font-bold text-white mb-2" itemProp="name">{q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-xs text-[#64748b] leading-relaxed" itemProp="text">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-violet-950/40 via-[#0c1322] to-blue-950/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {zh ? '开始追踪你的SEO排名进展' : 'Start Tracking Your SEO Ranking Progress'}
            </h2>
            <p className="text-[#94a3b8] text-sm mb-8 leading-relaxed">
              {zh
                ? '每次优化后重新审计，用数据证明你的SEO进展。免费，无需注册，30秒出结果。'
                : 'Re-audit after every optimization. Prove your SEO progress with data. Free, no signup, results in 30 seconds.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${params.locale}`}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
              >
                🚀 {zh ? '免费运行第一次审计' : 'Run Your First Free Audit'}
              </Link>
              <Link
                href={`/${params.locale}/pricing`}
                className="inline-flex items-center justify-center gap-2 border border-violet-700/40 hover:border-violet-500 text-violet-300 hover:text-white px-8 py-4 rounded-xl transition-colors text-base"
              >
                {zh ? '查看完整报告 →' : 'Get Full PDF Report →'}
              </Link>
            </div>
            <p className="text-xs text-[#4a5568] mt-4">
              {zh ? '✓ 无需信用卡  ✓ 无需注册  ✓ 立即开始' : '✓ No credit card  ✓ No signup  ✓ Start immediately'}
            </p>

            {/* Language switcher */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs">
              <Link href={`/zh/rank-tracker`} className={`px-3 py-1 rounded-full border ${params.locale === 'zh' ? 'border-violet-600 text-violet-400 bg-violet-950/30' : 'border-[#1e3a5f] text-[#4a5568] hover:text-[#64748b]'} transition-colors`}>
                🇨🇳 中文版
              </Link>
              <Link href={`/en/rank-tracker`} className={`px-3 py-1 rounded-full border ${params.locale === 'en' ? 'border-violet-600 text-violet-400 bg-violet-950/30' : 'border-[#1e3a5f] text-[#4a5568] hover:text-[#64748b]'} transition-colors`}>
                🇺🇸 English
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
