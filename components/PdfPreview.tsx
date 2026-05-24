'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'

interface Props {
  auditId: string
  paid: boolean
  score: number
}

export default function PdfPreview({ auditId, paid }: Props) {
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const zh = locale === 'zh'

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId, locale }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  function handleDownload(lang: string) {
    window.open(`/api/pdf/${auditId}?lang=${lang}`, '_blank')
  }

  if (paid) {
    return (
      <div className="rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-400 text-xl">✓</span>
          <span className="font-semibold text-emerald-300">
            {zh ? '报告已解锁' : 'Report Unlocked'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload('zh')}
            className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
          >
            🇨🇳 {zh ? '下载中文版' : 'Download CN'}
          </button>
          <button
            onClick={() => handleDownload('en')}
            className="flex-1 bg-blue-700 hover:bg-blue-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
          >
            🇺🇸 {zh ? '下载英文版' : 'Download EN'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#1e3a5f] bg-[#0f1729] overflow-hidden">
      {/* Blurred preview */}
      <div className="relative p-4 select-none">
        <div className="blur-sm opacity-40 pointer-events-none space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-[#1e3a5f] rounded w-32" />
            <div className="h-3 bg-blue-800 rounded w-12" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="h-2 bg-[#1e3a5f] rounded flex-1" style={{ width: `${60 + i * 8}%` }} />
              <div className="h-2 bg-emerald-900 rounded w-8" />
            </div>
          ))}
          <div className="h-20 bg-[#162035] rounded-lg mt-3" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-12 bg-[#162035] rounded" />
            <div className="h-12 bg-[#162035] rounded" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/60 to-transparent" />
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <p className="text-sm font-semibold text-center text-[#f0f4ff] mb-3">
          {zh ? '解锁完整PDF报告' : 'Unlock Full PDF Report'}
        </p>
        <ul className="space-y-1.5 mb-4">
          {(zh
            ? ['完整评分细项（30项逐一解析）', '优先修复清单', 'Shopify/WordPress专项建议', '中英双语内容', '可分享给开发者']
            : ['Complete score breakdown (all 30 checks explained)', 'Priority fix checklist', 'Platform-specific tips', 'Bilingual (Chinese + English)', 'Shareable with your developer']
          ).map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <span className="text-emerald-400">✓</span>{item}
            </li>
          ))}
        </ul>
        {/* Value anchor */}
        <div className="bg-[#162035] rounded-xl p-3 mb-3 text-xs text-[#94a3b8] text-center leading-relaxed">
          {zh
            ? '一位SEO顾问咨询费 ¥500–2000 / 小时\n我们完成同样的工作，只需 '
            : 'SEO consultants charge $100–300/hr\nWe deliver the same analysis for just '}
          <span className="text-blue-400 font-bold">{zh ? '¥68' : '$9.99'}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
        >
          {loading
            ? (zh ? '跳转中...' : 'Redirecting...')
            : (zh ? '立即获取完整报告 · ¥68' : 'Get Full Report · $9.99')}
        </button>
        <div className="flex items-center justify-center gap-3 mt-2.5">
          <span className="text-xs text-[#64748b]">🔒 {zh ? 'Stripe安全加密' : 'Stripe secure'}</span>
          <span className="text-[#2a4a7f]">·</span>
          <span className="text-xs text-[#64748b]">⚡ {zh ? '即时下载' : 'Instant download'}</span>
          <span className="text-[#2a4a7f]">·</span>
          <span className="text-xs text-emerald-500">✓ {zh ? '生成失败全额退款' : 'Full refund if failed'}</span>
        </div>
      </div>
    </div>
  )
}
