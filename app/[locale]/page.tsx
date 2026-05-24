import { getTranslations, getLocale } from 'next-intl/server'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AuditForm from '@/components/AuditForm'
import { prisma } from '@/lib/db'

export default async function HomePage() {
  const t = await getTranslations()
  const locale = await getLocale()

  // Server-side stats: total cumulative count, min floor for cold-start
  const totalCount = await prisma.audit.count()
  const displayCount = Math.max(totalCount, 318) // 底线，真实累计超过后自动增长

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
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

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-800/40 rounded-full px-4 py-1.5 text-xs text-blue-300 mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          {t('hero.badge')}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f0f4ff] mb-3 leading-tight text-balance">
          {t('hero.title')}
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6">
          {t('hero.title2')}
        </p>
        <p className="text-base text-[#94a3b8] mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <AuditForm />

        {/* Social proof counter */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#64748b]">
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-70" />
            ))}
          </span>
          {t('hero.totalCount', { count: displayCount })}
        </div>

        {/* Result Preview — shows users what they'll get */}
        <div className="mt-10 max-w-2xl mx-auto">
          <p className="text-xs text-[#64748b] mb-3 text-center">
            {locale === 'zh' ? '↓ 检测完成后，您将看到' : '↓ After your audit, you\'ll see'}
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-[#1e3a5f] bg-[#0f1729] shadow-xl shadow-black/40">
            {/* Mock results preview */}
            <div className="p-5">
              {/* Mock score row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-blue-400">72</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#64748b] mb-2">{locale === 'zh' ? '各维度评分' : 'Category Scores'}</div>
                  {[
                    { label: locale === 'zh' ? 'SEO基础' : 'SEO Basics', pct: 68, color: 'bg-amber-500' },
                    { label: locale === 'zh' ? '性能速度' : 'Performance', pct: 45, color: 'bg-red-500' },
                    { label: locale === 'zh' ? 'GEO本地化' : 'GEO / Intl', pct: 80, color: 'bg-emerald-500' },
                  ].map(bar => (
                    <div key={bar.label} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-[#64748b] w-16 flex-shrink-0 text-right">{bar.label}</span>
                      <div className="flex-1 h-2 bg-[#1e3a5f] rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mock issue cards */}
              <div className="space-y-2">
                {[
                  { priority: 'critical', label: locale === 'zh' ? '缺少 Meta Description' : 'Missing Meta Description' },
                  { priority: 'critical', label: locale === 'zh' ? 'H1标签缺失' : 'Missing H1 Tag' },
                  { priority: 'warning',  label: locale === 'zh' ? '图片缺少 Alt 属性' : 'Images Missing Alt Text' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-[#162035] rounded-xl px-3 py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                      item.priority === 'critical'
                        ? 'bg-red-950/60 text-red-400'
                        : 'bg-amber-950/60 text-amber-400'
                    }`}>
                      {item.priority === 'critical'
                        ? (locale === 'zh' ? '严重' : 'Critical')
                        : (locale === 'zh' ? '警告' : 'Warning')}
                    </span>
                    <span className="text-xs text-[#cbd5e1]">{item.label}</span>
                    <span className="ml-auto text-[10px] text-blue-400 flex-shrink-0">
                      {locale === 'zh' ? '查看修复建议 →' : 'See fix →'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Fade overlay with CTA */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080b14] to-transparent flex items-end justify-center pb-3">
              <span className="text-xs text-blue-400 font-medium">
                {locale === 'zh' ? '输入您的网址，查看真实检测结果 ↑' : 'Enter your URL above to see your real results ↑'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-[#1e3a5f] bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8">
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

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: t('features.comprehensive.title'), desc: t('features.comprehensive.desc') },
            { icon: '🌍', title: t('features.geo.title'), desc: t('features.geo.desc') },
            { icon: '📄', title: t('features.pdf.title'), desc: t('features.pdf.desc') },
          ].map((f, i) => (
            <div key={i} className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-6 hover:border-blue-700/60 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h2 className="font-semibold text-[#f0f4ff] mb-2 text-base">{f.title}</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Score Categories Preview */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#f0f4ff] mb-6 text-center">
            {t('results.categoryScores')}
          </h2>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              { cat: 'seo', max: 25, icon: '🔍' },
              { cat: 'performance', max: 20, icon: '⚡' },
              { cat: 'technical', max: 20, icon: '⚙️' },
              { cat: 'geo', max: 20, icon: '🌍' },
              { cat: 'content', max: 15, icon: '📝' },
            ].map(item => (
              <div key={item.cat} className="text-center bg-[#162035] rounded-xl p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-[#94a3b8] mb-1">{t(`categories.${item.cat}` as Parameters<typeof t>[0])}</div>
                <div className="font-mono text-sm text-[#f0f4ff]">/{item.max}{locale === 'zh' ? '分' : 'pts'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 pb-20 max-w-3xl mx-auto" aria-label="FAQ">
        <h2 className="text-2xl font-bold text-[#f0f4ff] mb-8 text-center">{t('faq.title')}</h2>
        <div className="space-y-3">
          {[
            { q: t('faq.q1'), a: t('faq.a1') },
            { q: t('faq.q2'), a: t('faq.a2') },
            { q: t('faq.q3'), a: t('faq.a3') },
            { q: t('faq.q4'), a: t('faq.a4') },
            { q: t('faq.q5'), a: t('faq.a5') },
            { q: t('faq.q6'), a: t('faq.a6') },
          ].map((item, i) => (
            <details
              key={i}
              className="group bg-[#0f1729] border border-[#1e3a5f] rounded-xl overflow-hidden"
            >
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

      {/* Footer */}
      <footer className="border-t border-[#1e3a5f] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#64748b]">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
            SEO Audit Pro · {new Date().getFullYear()}
          </div>
          <div className="flex gap-6">
            <a href={`/${locale}/privacy`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {t('footer.privacy')}
            </a>
            <a href={`/${locale}/terms`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {t('footer.terms')}
            </a>
            <a href="mailto:support@seoauditpro.com" className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
