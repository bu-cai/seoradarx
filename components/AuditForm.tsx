'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import ProgressSteps from './ProgressSteps'

const DEMO_URLS = {
  shopify: 'https://www.allbirds.com',
  wordpress: 'https://www.smashingmagazine.com',
}

export default function AuditForm() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setShowProgress(false)
    setError('')
    setStep(0)

    // Only show progress bar after 600 ms — fast errors (rate_limit, invalid_url)
    // return before that and the progress bar never appears.
    const progressDelay = setTimeout(() => setShowProgress(true), 600)

    // Simulate progress steps (starts at 0, advances every 800 ms)
    let stepIdx = 0
    const stepTimer = setInterval(() => {
      stepIdx++
      if (stepIdx <= 6) setStep(stepIdx)
    }, 800)

    function cleanup() {
      clearTimeout(progressDelay)
      clearInterval(stepTimer)
    }

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), locale }),
      })

      const data = await res.json()
      if (!res.ok) {
        cleanup()
        setShowProgress(false)
        setError(data.error || 'generic')
        setLoading(false)
        return
      }

      cleanup()
      setStep(6)
      await new Promise(r => setTimeout(r, 400))
      router.push(`/${locale}/results/${data.auditId}`)
    } catch {
      cleanup()
      setShowProgress(false)
      setError('generic')
      setLoading(false)
    }
  }

  const errorMessages: Record<string, { zh: string; en: string }> = {
    invalid_url: { zh: '请输入有效的网址', en: 'Please enter a valid URL' },
    fetch_failed: { zh: '无法访问该网站，请检查URL是否正确', en: 'Could not reach this site. Check the URL and try again' },
    rate_limit: { zh: '您今日的免费检测次数已用完（每日3次）', en: "You've used all 3 free daily audits. Come back tomorrow" },
    generic: { zh: '检测失败，请稍后重试', en: 'Analysis failed. Please try again' },
  }

  const errMsg = error ? (errorMessages[error]?.[locale as 'zh' | 'en'] || errorMessages.generic[locale as 'zh' | 'en']) : ''

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            disabled={loading}
            required
            minLength={10}
            className="w-full bg-[#0f1729] border border-[#1e3a5f] rounded-xl px-4 py-3.5 text-[#f0f4ff] placeholder-[#94a3b8] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3.5 font-bold text-sm transition-all whitespace-nowrap shadow-lg shadow-blue-900/30"
        >
          {loading ? t('analyzing') : t('button')}
        </button>
      </form>

      {/* Trust microcopy */}
      {!loading && !error && (
        <div className="mt-3 flex items-center justify-center gap-4 flex-wrap">
          {(locale === 'zh'
            ? ['只读分析，不影响网站', 'URL不对外公开', '无需注册']
            : ['Read-only, no impact', 'URL stays private', 'No sign-up needed']
          ).map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <span className="text-emerald-500 font-bold text-sm leading-none">✓</span>
              {item}
            </span>
          ))}
        </div>
      )}

      {errMsg && (
        <div className="mt-3 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3 text-sm text-red-300">
          {errMsg}
        </div>
      )}

      {loading && showProgress && (
        <div className="mt-6">
          <ProgressSteps step={step} locale={locale} />
        </div>
      )}

      {!loading && !error && (
        <div className="mt-4 flex items-center gap-3 flex-wrap justify-center">
          <span className="text-xs text-[#64748b]">
            {locale === 'zh' ? '试试示例网站：' : 'Try a sample:'}
          </span>
          {Object.entries(DEMO_URLS).map(([type, demoUrl]) => (
            <button
              key={type}
              type="button"
              onClick={() => setUrl(demoUrl)}
              className="text-xs text-blue-400 hover:text-blue-300 border border-[#1e3a5f] hover:border-blue-600 rounded-full px-4 py-2.5 min-h-[44px] transition-colors"
            >
              {type === 'shopify'
                ? (locale === 'zh' ? '🛍️ Shopify示例' : '🛍️ Shopify Sample')
                : (locale === 'zh' ? '📝 WordPress示例' : '📝 WordPress Sample')}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
