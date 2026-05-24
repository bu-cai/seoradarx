'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScoreGauge from '@/components/ScoreGauge'
import CategoryBar from '@/components/CategoryBar'
import IssueCard from '@/components/IssueCard'
import PlatformBadge from '@/components/PlatformBadge'
import PdfPreview from '@/components/PdfPreview'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import type { AuditCheck } from '@/lib/auditor'

interface Audit {
  id: string
  url: string
  platform: string
  score: number
  categoryScores: Record<string, number>
  checks: AuditCheck[]
  paid: boolean
  createdAt: string
  locale: string
}

interface Props {
  audit: Audit
  locale: string
}

const CAT_MAX = { seo: 25, performance: 20, technical: 20, geo: 20, content: 15 }
const CAT_NAMES = {
  zh: { seo: 'SEO基础', performance: '性能速度', technical: '技术指标', geo: 'GEO本地化', content: '内容质量' },
  en: { seo: 'SEO Basics', performance: 'Performance', technical: 'Technical', geo: 'GEO / Local SEO', content: 'Content Quality' },
}

function scoreLabel(score: number, zh: boolean) {
  if (score >= 90) return zh ? '优秀' : 'Excellent'
  if (score >= 75) return zh ? '表现良好' : 'Good'
  if (score >= 50) return zh ? '有待提升' : 'Needs Work'
  return zh ? '急需优化' : 'Poor'
}

const SHOPIFY_TIPS = {
  zh: [
    '在主题liquid文件中添加自定义meta description，避免使用系统默认描述',
    '使用Shopify URL重定向功能管理301跳转，迁移旧产品页时必须操作',
    '在产品页添加Review/Product结构化数据Schema，可在搜索结果展示星级评分',
    '启用Shopify的自动sitemap.xml生成，并在Google Search Console中提交',
    '优化图片文件名（英文关键词+连字符），上传前重命名，如：mens-running-shoes.jpg',
  ],
  en: [
    'Add custom meta descriptions in theme liquid files — avoid default system descriptions',
    'Use Shopify URL redirects for 301 management when migrating old product pages',
    'Add Review/Product structured data to product pages to show star ratings in SERPs',
    "Enable Shopify's automatic sitemap.xml and submit it to Google Search Console",
    'Optimize image filenames with English keywords and hyphens before uploading',
  ],
}

const WORDPRESS_TIPS = {
  zh: [
    '安装Yoast SEO或Rank Math插件，提供全面的on-page SEO控制',
    '设置固定链接结构为/%postname%/，避免使用带数字的URL结构',
    '使用WP Rocket或W3 Total Cache提升速度，开启页面缓存和资源压缩',
    '在functions.php中添加hreflang标签或使用WPML插件管理多语言',
    '安装Imagify或ShortPixel插件自动压缩图片，减少页面大小',
  ],
  en: [
    'Install Yoast SEO or Rank Math for comprehensive on-page SEO control',
    'Set permalink structure to /%postname%/ — avoid numeric URL structures',
    'Use WP Rocket or W3 Total Cache — enable page caching and asset compression',
    'Add hreflang functions in functions.php or use WPML for multilingual management',
    'Install Imagify or ShortPixel for automatic image compression',
  ],
}

const GEO_TIPS = {
  zh: [
    'hreflang实施：<link rel="alternate" hreflang="en-US" href="https://example.com/en/"/>',
    '在Google Search Console国际化定向中设置目标国家/地区',
    '在Product Schema中包含priceCurrency字段，标注接受的货币类型',
    '使用Cloudflare等CDN减少目标市场的延迟，提升全球访问速度',
    '本地化不仅是翻译文字，还需本地化日期格式、电话格式、地址格式',
  ],
  en: [
    'Hreflang: <link rel="alternate" hreflang="en-US" href="https://example.com/en/"/>',
    'Set target country in Google Search Console International Targeting',
    'Include priceCurrency in Product Schema to specify accepted currencies',
    'Use Cloudflare CDN to reduce latency for target markets globally',
    'Localization means more than translation — localize date, phone, and address formats',
  ],
}

export default function ResultsClient({ audit, locale }: Props) {
  const zh = locale === 'zh'
  // Default to critical tab if there are critical issues, else show all
  const hasCritical = audit.checks.some(c => !c.passed && c.priority === 'critical')
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning' | 'passed'>(
    hasCritical ? 'critical' : 'all'
  )
  const [copied, setCopied] = useState(false)
  const [confettiShown, setConfettiShown] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [reauditing, setReauditing] = useState(false)

  const catNames = CAT_NAMES[zh ? 'zh' : 'en']
  const categories = ['seo', 'performance', 'technical', 'geo', 'content'] as const

  const critical = audit.checks.filter(c => !c.passed && c.priority === 'critical')
  const warnings = audit.checks.filter(c => !c.passed && c.priority === 'warning')
  const passed = audit.checks.filter(c => c.passed)

  const filtered = activeTab === 'all'
    ? audit.checks
    : activeTab === 'critical' ? critical
    : activeTab === 'warning' ? warnings
    : passed

  useEffect(() => {
    if (audit.score >= 90 && !confettiShown) {
      setConfettiShown(true)
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } })
      })
    }
  }, [audit.score, confettiShown])

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function reaudit() {
    if (reauditing) return
    setReauditing(true)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: audit.url, locale, force: true }),
      })
      const data = await res.json()
      if (res.ok && data.auditId) {
        window.location.href = `/${locale}/results/${data.auditId}`
      } else {
        setReauditing(false)
        alert(zh ? '重新检测失败，请稍后再试' : 'Re-audit failed, please try again')
      }
    } catch {
      setReauditing(false)
      alert(zh ? '网络错误，请稍后再试' : 'Network error, please try again')
    }
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput.trim() || emailStatus === 'sending') return
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId: audit.id, email: emailInput.trim(), locale }),
      })
      const data = await res.json()
      if (res.ok) {
        setEmailStatus(data.duplicate ? 'success' : 'success')
      } else {
        setEmailStatus('error')
      }
    } catch {
      setEmailStatus('error')
    }
  }

  const tabs = [
    { key: 'all', label: zh ? '全部问题' : 'All Issues', count: audit.checks.length },
    { key: 'critical', label: zh ? '严重' : 'Critical', count: critical.length },
    { key: 'warning', label: zh ? '警告' : 'Warning', count: warnings.length },
    { key: 'passed', label: zh ? '通过' : 'Passed', count: passed.length },
  ] as const

  const platformTips = audit.platform === 'shopify' ? SHOPIFY_TIPS : WORDPRESS_TIPS
  const platformTitle = zh
    ? (audit.platform === 'shopify' ? 'Shopify专项优化建议' : audit.platform === 'wordpress' ? 'WordPress专项优化建议' : '独立站优化建议')
    : (audit.platform === 'shopify' ? 'Shopify-Specific Tips' : audit.platform === 'wordpress' ? 'WordPress-Specific Tips' : 'Store SEO Tips')

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f] sticky top-0 z-10 bg-[#080b14]/95 backdrop-blur">
        <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
          <span className="text-sm font-semibold text-[#f0f4ff]">{zh ? 'SEO审计专家' : 'SEO Audit Pro'}</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={reaudit}
            disabled={reauditing}
            className="text-xs text-[#94a3b8] hover:text-[#f0f4ff] border border-[#1e3a5f] hover:border-[#2a4a7f] rounded-full px-3 py-1.5 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            {reauditing ? (
              <>
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
                {zh ? '检测中...' : 'Re-auditing...'}
              </>
            ) : (
              <>↻ {zh ? '重新检测' : 'Re-audit'}</>
            )}
          </button>
          <button
            onClick={copyLink}
            className="text-xs text-[#94a3b8] hover:text-[#f0f4ff] border border-[#1e3a5f] hover:border-[#2a4a7f] rounded-full px-3 py-1.5 transition-all"
          >
            {copied ? (zh ? '已复制!' : 'Copied!') : (zh ? '分享报告' : 'Share')}
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDEBAR — on mobile shows BELOW main content */}
          <div className="lg:w-80 flex-shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Score Card */}
              <div className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <PlatformBadge platform={audit.platform} locale={locale} />
                </div>
                <p className="text-xs text-[#94a3b8] mb-1 truncate">{audit.url}</p>
                <div className="flex justify-center mt-4 mb-2">
                  <ScoreGauge
                    score={audit.score}
                    size="large"
                    label={scoreLabel(audit.score, zh)}
                  />
                </div>
                <p className="text-xs text-[#64748b] mt-3">
                  {new Date(audit.createdAt).toLocaleDateString(zh ? 'zh-CN' : 'en-US')}
                </p>
              </div>

              {/* Category Scores */}
              <div className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-[#f0f4ff] mb-4">
                  {zh ? '各维度评分' : 'Category Scores'}
                </h3>
                {categories.map((cat, i) => (
                  <CategoryBar
                    key={cat}
                    name={catNames[cat]}
                    score={audit.categoryScores[cat] || 0}
                    max={CAT_MAX[cat]}
                    delay={i * 100}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: critical.length, label: zh ? '严重' : 'Critical', color: 'text-red-400 bg-red-950/30 border-red-800/40' },
                  { count: warnings.length, label: zh ? '警告' : 'Warning', color: 'text-amber-400 bg-amber-950/30 border-amber-800/40' },
                  { count: passed.length, label: zh ? '通过' : 'Passed', color: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40' },
                ].map(stat => (
                  <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.color}`}>
                    <div className="text-2xl font-mono font-bold">{stat.count}</div>
                    <div className="text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* PDF Download */}
              <PdfPreview auditId={audit.id} paid={audit.paid} score={audit.score} />
            </div>
          </div>

          {/* MAIN CONTENT — on mobile shows FIRST */}
          <div className="flex-1 min-w-0 order-1 lg:order-2">
            <h1 className="text-2xl font-bold text-[#f0f4ff] mb-6">
              {zh ? 'SEO审计报告' : 'SEO Audit Report'}
            </h1>

            {/* TOP 3 Priority Card */}
            <div className="bg-gradient-to-br from-[#120a00] to-[#1a0f00] border border-amber-700/40 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-bold text-amber-300">
                  ⚡ {zh ? '最优先修复的问题' : 'Fix These First'}
                </span>
              </div>
              <p className="text-xs text-amber-600 mb-4">
                {zh ? '修复这些问题，可以最快提升您的SEO评分' : 'Resolving these will give you the biggest score boost'}
              </p>
              {[...critical, ...warnings].slice(0, 3).length > 0 ? (
                <div className="space-y-2.5">
                  {[...critical, ...warnings].slice(0, 3).map((issue, idx) => (
                    <div key={issue.id} className="flex items-start gap-3 bg-black/20 rounded-xl p-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-900/60 text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            issue.priority === 'critical'
                              ? 'bg-red-950/60 text-red-400'
                              : 'bg-amber-950/60 text-amber-400'
                          }`}>
                            {issue.priority === 'critical' ? (zh ? '严重' : 'Critical') : (zh ? '警告' : 'Warning')}
                          </span>
                          <span className="text-sm font-medium text-[#f0f4ff]">{zh ? issue.nameZh : issue.nameEn}</span>
                        </div>
                        {(zh ? issue.tipsZh : issue.tipsEn) && (
                          <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">💡 {zh ? issue.tipsZh : issue.tipsEn}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-400">
                  ✓ {zh ? '很好！暂无严重问题' : 'Great — no critical issues found!'}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#0f1729] border border-[#1e3a5f] rounded-xl p-1 mb-6 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white'
                      : 'text-[#94a3b8] hover:text-[#f0f4ff]'
                  }`}
                >
                  {tab.label}
                  <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                    activeTab === tab.key ? 'bg-blue-500' : 'bg-[#162035]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Issue Cards */}
            <div className="space-y-2 mb-8">
              {filtered.map((check, i) => (
                <IssueCard key={check.id} check={check} locale={locale} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-[#94a3b8]">
                  {zh ? '该分类下没有问题 ✓' : 'No issues in this category ✓'}
                </div>
              )}
            </div>

            {/* Platform Tips */}
            <div className="bg-[#0f1729] border border-[#1e3a5f] rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[#f0f4ff] mb-4 flex items-center gap-2">
                {audit.platform === 'shopify' ? '🛍️' : audit.platform === 'wordpress' ? '📝' : '🌐'}
                {platformTitle}
              </h2>
              <ul className="space-y-3">
                {(platformTips[zh ? 'zh' : 'en']).map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#94a3b8]">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-900/60 text-blue-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GEO Tips */}
            <div className="bg-gradient-to-br from-[#0f1729] to-[#0a1628] border border-blue-800/40 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[#f0f4ff] mb-4 flex items-center gap-2">
                🌍 {zh ? '跨境卖家特别提示' : 'Cross-border Seller Tips'}
              </h2>
              <ul className="space-y-3">
                {(GEO_TIPS[zh ? 'zh' : 'en']).map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#94a3b8]">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-900/60 text-blue-300 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-mono text-xs sm:text-sm sm:font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Collection */}
            <div className="bg-gradient-to-br from-[#0a1628] to-[#080b14] border border-blue-700/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">📧</div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-[#f0f4ff] mb-1">
                    {zh ? '把报告发到您的邮箱' : 'Send This Report to Your Inbox'}
                  </h2>
                  <p className="text-sm text-[#94a3b8] mb-4">
                    {zh
                      ? '方便随时查看，或直接转发给您的开发者'
                      : 'Easy to review later, or forward to your developer'}
                  </p>

                  {emailStatus === 'success' ? (
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 border border-emerald-700/40 rounded-xl px-4 py-3">
                      <span className="text-lg">✓</span>
                      <span className="text-sm font-medium">
                        {zh ? '已发送！请查收邮件（可能在垃圾箱）' : 'Sent! Check your inbox (or spam folder)'}
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmail} className="flex gap-2 flex-col sm:flex-row">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        placeholder={zh ? '请输入您的邮箱地址' : 'your@email.com'}
                        disabled={emailStatus === 'sending'}
                        className="flex-1 bg-[#0f1729] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-[#f0f4ff] placeholder-[#4a5568] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={emailStatus === 'sending' || !emailInput.trim()}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-5 py-2.5 font-semibold text-sm whitespace-nowrap transition-all"
                      >
                        {emailStatus === 'sending'
                          ? (zh ? '发送中...' : 'Sending...')
                          : (zh ? '发送报告' : 'Send Report')}
                      </button>
                    </form>
                  )}

                  {emailStatus === 'error' && (
                    <p className="mt-2 text-xs text-red-400">
                      {zh ? '发送失败，请稍后重试' : 'Failed to send. Please try again.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
