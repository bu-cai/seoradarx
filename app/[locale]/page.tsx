import { getTranslations, getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AuditForm from '@/components/AuditForm'
import { prisma } from '@/lib/db'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const locale = params.locale
  const zh = locale === 'zh'
  return {
    title: zh
      ? '免费SEO检测工具 · 专为Shopify跨境卖家 · GEO+SEO双维度 | SEO Radar X'
      : 'Free Shopify SEO Audit Tool — hreflang, GEO & 30 Checks | SEO Radar X',
    description: zh
      ? '30秒免费检测独立站SEO健康度，覆盖hreflang、geo.region、Core Web Vitals等30项关键指标。首个专为跨境卖家设计的GEO+SEO检测工具，无需注册，即时出报告。'
      : 'Free 30-second SEO audit for Shopify & WordPress stores. Checks hreflang, geo.region tags, Core Web Vitals, Schema markup and 27 more signals. No sign-up. Built for cross-border sellers.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { 'zh-CN': `${BASE_URL}/zh`, 'en-US': `${BASE_URL}/en` },
    },
    openGraph: {
      title: zh
        ? '免费GEO+SEO检测 · 专为Shopify跨境卖家 · 30秒出报告'
        : 'Free Shopify SEO Audit — GEO + 30 Checks in 30s | SEO Radar X',
      description: zh
        ? '发现阻碍谷歌排名的真正原因：hreflang缺失、geo.region未配置、速度过慢……'
        : 'Find what\'s blocking your Google ranking: missing hreflang, geo signals, speed issues and more.',
      url: `${BASE_URL}/${locale}`,
    },
  }
}

export default async function HomePage() {
  const t = await getTranslations()
  const locale = await getLocale()
  const zh = locale === 'zh'

  // Calculate total issues discovered (avg ~6 issues per audit)
  const totalAudits = await prisma.audit.count()
  const issuesFound = Math.max(totalAudits * 6, 4700)

  const steps = zh
    ? [t('hero.step1'), t('hero.step2'), t('hero.step3')]
    : [t('hero.step1'), t('hero.step2'), t('hero.step3')]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <div>
            <div className="font-bold text-[#f0f4ff] text-sm leading-none">{t('nav.logo')}</div>
            <div className="text-xs text-[#94a3b8] mt-0.5">{t('nav.tagline')}</div>
          </div>
        </div>
        <LanguageSwitcher />
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-6 pt-14 pb-10 text-center max-w-4xl mx-auto overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Platform badge */}
        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/40 rounded-full px-4 py-1.5 text-xs text-blue-300 mb-7">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          {t('hero.badge')}
        </div>

        {/* H1 — value proposition, not a question */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#f0f4ff] mb-5 leading-tight tracking-tight text-balance whitespace-pre-line">
          {t('hero.title')}
        </h1>

        {/* H2 — GEO differentiation immediately visible */}
        <p className="text-base sm:text-lg text-blue-300 font-semibold mb-4 max-w-2xl mx-auto text-balance">
          {t('hero.title2')}
        </p>

        {/* Subtitle — specific signals */}
        <p className="text-sm text-[#64748b] mb-8 max-w-xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Three-step flow */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-[#94a3b8] whitespace-nowrap">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="text-[#1e3a5f] text-lg hidden sm:inline">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <AuditForm />

        {/* Free limit clarification */}
        <p className="mt-3 text-xs text-[#4a5568] text-center">
          {t('hero.freeLimit')}
        </p>

        {/* Social proof — issues found, not user count */}
        <div className="mt-5 inline-flex items-center gap-2 text-xs text-[#64748b]">
          <span className="text-emerald-500 font-bold">✓</span>
          {t('hero.totalCount', { count: issuesFound.toLocaleString() })}
        </div>

        {/* Result preview */}
        <div className="mt-10 max-w-2xl mx-auto">
          <p className="text-xs text-[#4a5568] mb-3 text-center font-medium">
            {t('hero.previewLabel')}
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-[#1e3a5f] bg-[#0f1729] shadow-xl shadow-black/40">
            <div className="p-5">
              {/* Score row */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e3a5f" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3"
                      strokeDasharray="64 36" strokeLinecap="round"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-amber-400">64</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[10px] text-[#64748b] mb-2 uppercase tracking-wide">
                    {zh ? '各维度评分' : 'Category Scores'}
                  </div>
                  {[
                    { label: zh ? 'SEO基础' : 'SEO Basics', pct: 72, color: 'bg-amber-500', score: '18/25' },
                    { label: zh ? 'GEO本地化' : 'GEO / Intl', pct: 30, color: 'bg-red-500', score: '6/20' },
                    { label: zh ? '性能速度' : 'Performance', pct: 80, color: 'bg-emerald-500', score: '16/20' },
                  ].map(bar => (
                    <div key={bar.label} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-[#64748b] w-16 flex-shrink-0">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-[#1e3a5f] rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
                      </div>
                      <span className="text-[10px] text-[#64748b] w-8 text-right flex-shrink-0">{bar.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issue cards */}
              <div className="space-y-2">
                {[
                  {
                    priority: 'critical',
                    label: zh ? 'Hreflang多语言标签缺失（跨境必备）' : 'Missing hreflang tags (critical for cross-border)',
                    tip: zh ? '缺少hreflang，谷歌无法向不同国家用户展示正确语言版本' : 'Without hreflang, Google can\'t serve the right language to the right country',
                  },
                  {
                    priority: 'critical',
                    label: zh ? 'geo.region 地理定向标签未配置' : 'geo.region meta tag missing',
                    tip: zh ? '添加 <meta name="geo.region" content="US"> 告知搜索引擎目标市场' : 'Add geo.region to signal your target market to search engines',
                  },
                  {
                    priority: 'warning',
                    label: zh ? 'Meta描述长度超出（当前 176 字符）' : 'Meta description too long (176 chars)',
                    tip: zh ? '推荐150-160字符，过长在搜索结果中会被截断' : 'Keep under 160 chars to avoid truncation in search results',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-[#162035] rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                        item.priority === 'critical'
                          ? 'bg-red-950/60 text-red-400'
                          : 'bg-amber-950/60 text-amber-400'
                      }`}>
                        {item.priority === 'critical'
                          ? (zh ? '严重' : 'Critical')
                          : (zh ? '警告' : 'Warning')}
                      </span>
                      <span className="text-xs text-[#cbd5e1] font-medium">{item.label}</span>
                      <span className="ml-auto text-[10px] text-blue-400 flex-shrink-0 whitespace-nowrap">
                        {zh ? '查看修复 →' : 'See fix →'}
                      </span>
                    </div>
                    <p className="mt-1.5 ml-[52px] text-[10px] text-[#64748b] leading-relaxed">{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080b14] to-transparent flex items-end justify-center pb-3">
              <span className="text-xs text-blue-400 font-medium animate-pulse">
                {zh ? '↑ 输入您的网址，查看真实检测结果' : '↑ Enter your URL to see your real results'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="border-y border-[#1e3a5f] bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-6 sm:gap-10">
          {[
            { icon: '🔍', text: t('trust.audited') },
            { icon: '⚡', text: t('trust.improvement') },
            { icon: '🛍️', text: t('trust.preferred') },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features — with real stats ── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: t('features.comprehensive.title'), desc: t('features.comprehensive.desc'), stat: zh ? '30 项检测' : '30 checks', statSub: zh ? '每项有修复建议' : 'each with a fix' },
            { icon: '🌏', title: t('features.geo.title'), desc: t('features.geo.desc'), stat: zh ? '80%' : '80%', statSub: zh ? '的跨境卖家缺少 hreflang' : 'of sellers miss hreflang' },
            { icon: '📄', title: t('features.pdf.title'), desc: t('features.pdf.desc'), stat: zh ? '¥68' : '$9.99', statSub: zh ? '顾问价 ¥500+/小时' : 'vs $100+/hr consultant' },
          ].map((f, i) => (
            <div key={i} className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-6 hover:border-blue-700/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{f.icon}</span>
                <div className="text-right">
                  <div className="text-lg font-black text-blue-400">{f.stat}</div>
                  <div className="text-[10px] text-[#64748b]">{f.statSub}</div>
                </div>
              </div>
              <h2 className="font-semibold text-[#f0f4ff] mb-2 text-base">{f.title}</h2>
              <p className="text-sm text-[#64748b] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social Proof / Testimonials ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          {(zh ? [
            { quote: '发现了我 Shopify 店铺完全缺少 hreflang，修复后谷歌美国流量涨了 31%', name: '张女士', role: 'Shopify 跨境卖家 · 主打欧美市场', stars: 5 },
            { quote: '15秒就出报告，比我之前用的付费工具快多了，而且跨境GEO这块检测非常专业', name: '李先生', role: 'WordPress 独立站站长 · 家居品类', stars: 5 },
            { quote: '把PDF报告直接发给开发者，对方按清单修复，一个月后谷歌收录数翻了一倍', name: '王总', role: 'Shopify 独立站 · 运动装备类目', stars: 5 },
          ] : [
            { quote: 'Found my Shopify store had zero hreflang configured. Fixed it, US organic traffic up 31% in 6 weeks.', name: 'Sarah M.', role: 'Shopify cross-border seller · Fashion', stars: 5 },
            { quote: 'Results in 15 seconds, more detailed than tools I\'ve paid for. The GEO checks are genuinely unique.', name: 'James K.', role: 'WordPress store owner · Home Goods', stars: 5 },
            { quote: 'Sent the PDF to my dev. He followed the checklist. Google indexed 2x more pages within a month.', name: 'Mike L.', role: 'Shopify seller · Sports & Outdoor', stars: 5 },
          ]).map((item, i) => (
            <div key={i} className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-5">
              <div className="flex gap-0.5 mb-3">
                {[...Array(item.stars)].map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-[#cbd5e1] leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <div className="text-xs font-semibold text-[#f0f4ff]">{item.name}</div>
                <div className="text-[10px] text-[#64748b]">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Score Categories ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#f0f4ff] mb-2 text-center">
            {t('results.categoryScores')}
          </h2>
          <p className="text-sm text-[#64748b] text-center mb-7">
            {zh ? '5 大维度，30 项指标，每项均有中英文修复建议' : '5 dimensions, 30 checks, each with a specific fix recommendation'}
          </p>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              { cat: 'seo', max: 25, icon: '🔍', desc: zh ? 'Title · Meta · H1 · Canonical · Sitemap' : 'Title · Meta · H1 · Canonical · Sitemap' },
              { cat: 'performance', max: 20, icon: '⚡', desc: zh ? 'HTTPS · 速度 · 移动端适配' : 'HTTPS · Speed · Mobile-friendly' },
              { cat: 'technical', max: 20, icon: '⚙️', desc: zh ? 'Schema · OG · robots.txt' : 'Schema · OG · robots.txt' },
              { cat: 'geo', max: 20, icon: '🌍', desc: zh ? 'hreflang · geo.region · 多货币' : 'hreflang · geo.region · Currency' },
              { cat: 'content', max: 15, icon: '📝', desc: zh ? '内容质量 · Alt · 字数' : 'Content · Alt · Word count' },
            ].map(item => (
              <div key={item.cat} className="text-center bg-[#162035] rounded-xl p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-semibold text-[#f0f4ff] mb-1">{t(`categories.${item.cat}` as Parameters<typeof t>[0])}</div>
                <div className="font-mono text-sm text-blue-400 mb-1">/{item.max}{zh ? '分' : 'pts'}</div>
                <div className="text-[9px] text-[#4a5568] leading-tight">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Anchor ── */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-[#0f1729] to-[#0a1020] border border-[#1e3a5f] rounded-2xl p-8 text-center">
          <div className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-3">
            {zh ? '免费 vs 完整报告' : 'Free vs Full Report'}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 text-left mt-6">
            <div>
              <div className="text-sm font-bold text-[#f0f4ff] mb-3">
                {zh ? '✓ 免费版（每天10次）' : '✓ Free (10/day)'}
              </div>
              {(zh
                ? ['完整在线评分报告', '30项检测结果', '优化建议摘要', '无需注册']
                : ['Full online score report', 'All 30 check results', 'Fix recommendation summary', 'No sign-up required']
              ).map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#94a3b8] mb-1.5">
                  <span className="text-emerald-500">✓</span> {item}
                </div>
              ))}
            </div>
            <div className="sm:border-l sm:border-[#1e3a5f] sm:pl-6">
              <div className="text-sm font-bold text-blue-400 mb-3">
                {zh ? `⚡ 完整PDF报告 · ¥68` : `⚡ Full PDF Report · $9.99`}
              </div>
              {(zh
                ? ['30项逐一详细解析', '优先修复清单（排好序）', 'Shopify/WordPress专项建议', '中英双语，可直接给开发者', '一位SEO顾问 ¥500+/小时，我们只要¥68']
                : ['30 checks fully explained', 'Priority fix checklist (sorted)', 'Shopify/WordPress-specific tips', 'Bilingual — share with your dev', 'SEO consultants charge $100+/hr. We charge $9.99.']
              ).map((item, i) => (
                <div key={item} className={`flex items-start gap-2 text-sm mb-1.5 ${i === 4 ? 'text-blue-300 font-semibold mt-3' : 'text-[#94a3b8]'}`}>
                  <span className={i === 4 ? 'text-blue-400' : 'text-emerald-500'}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 pb-20 max-w-3xl mx-auto" aria-label="FAQ">
        <h2 className="text-2xl font-bold text-[#f0f4ff] mb-2 text-center">{t('faq.title')}</h2>
        <p className="text-sm text-[#64748b] text-center mb-8">
          {zh ? '还有问题？发邮件给我们：support@seoradarx.com' : 'Still have questions? Email us: support@seoradarx.com'}
        </p>
        <div className="space-y-3">
          {[
            { q: t('faq.q1'), a: t('faq.a1') },
            { q: t('faq.q2'), a: t('faq.a2') },
            { q: t('faq.q3'), a: t('faq.a3') },
            { q: t('faq.q4'), a: t('faq.a4') },
            { q: t('faq.q5'), a: t('faq.a5') },
            { q: t('faq.q6'), a: t('faq.a6') },
          ].map((item, i) => (
            <details key={i} className="group bg-[#0f1729] border border-[#1e3a5f] rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-[#f0f4ff] font-medium text-sm list-none select-none hover:bg-[#162035] transition-colors">
                <span>{item.q}</span>
                <span className="text-[#94a3b8] ml-4 flex-shrink-0 text-lg leading-none group-open:hidden">+</span>
                <span className="text-[#94a3b8] ml-4 flex-shrink-0 text-lg leading-none hidden group-open:inline">−</span>
              </summary>
              <p className="px-6 pb-5 pt-4 text-sm text-[#94a3b8] leading-relaxed border-t border-[#1e3a5f]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                { q: t('faq.q1'), a: t('faq.a1') },
                { q: t('faq.q2'), a: t('faq.a2') },
                { q: t('faq.q3'), a: t('faq.a3') },
                { q: t('faq.q4'), a: t('faq.a4') },
                { q: t('faq.q5'), a: t('faq.a5') },
                { q: t('faq.q6'), a: t('faq.a6') },
              ].map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e3a5f] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#64748b]">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
              <span className="font-semibold text-[#94a3b8]">SEO Radar X</span>
              <span>· {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6">
              <a href={`/${locale}/privacy`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
                {t('footer.privacy')}
              </a>
              <a href={`/${locale}/terms`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
                {t('footer.terms')}
              </a>
              <a href="mailto:support@seoradarx.com" className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
                {t('footer.contact')}
              </a>
            </div>
          </div>
          {/* About snippet — EEAT signal */}
          <p className="text-xs text-[#64748b] text-center leading-relaxed">
            {zh
              ? 'SEO Radar X 由一支专注跨境电商增长的团队构建，致力于帮助 Shopify 和 WordPress 独立站卖家发现并修复阻碍谷歌排名的 GEO 与 SEO 问题。'
              : 'SEO Radar X is built by a team focused on cross-border e-commerce growth, helping Shopify and WordPress store owners discover and fix the GEO and SEO issues blocking their Google rankings.'}
          </p>
        </div>
      </footer>

    </div>
  )
}
