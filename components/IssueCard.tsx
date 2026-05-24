'use client'
import { useState } from 'react'
import type { AuditCheck } from '@/lib/auditor'

interface Props {
  check: AuditCheck
  locale: string
  index: number
}

const priorityConfig = {
  critical: { icon: '✗', bg: 'bg-red-950/40', border: 'border-red-800/40', badge: 'bg-red-900/60 text-red-300', label: { zh: '严重', en: 'Critical' } },
  warning:  { icon: '⚠', bg: 'bg-amber-950/30', border: 'border-amber-800/40', badge: 'bg-amber-900/60 text-amber-300', label: { zh: '警告', en: 'Warning' } },
  passed:   { icon: '✓', bg: 'bg-emerald-950/20', border: 'border-emerald-800/30', badge: 'bg-emerald-900/50 text-emerald-300', label: { zh: '通过', en: 'Passed' } },
}

export default function IssueCard({ check, locale, index }: Props) {
  const [open, setOpen] = useState(false)
  const cfg = priorityConfig[check.priority]
  const zh = locale === 'zh'

  return (
    <div
      className={`rounded-xl border ${cfg.bg} ${cfg.border} overflow-hidden animate-fade-up`}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-lg w-6 text-center flex-shrink-0">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#f0f4ff]">
              {zh ? check.nameZh : check.nameEn}
            </span>
            {!zh && (
              <span className="text-xs text-[#94a3b8]">{check.nameZh}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
            {cfg.label[zh ? 'zh' : 'en']}
          </span>
          <span className="text-xs font-mono text-[#94a3b8]">{check.score}/{check.maxScore}</span>
          <span className="text-[#94a3b8] text-sm ml-1">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5">
          <div className="bg-[#0f1729] rounded-lg p-3 mt-2">
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {zh ? check.tipsZh : check.tipsEn}
            </p>
            {zh && check.tipsEn && (
              <p className="text-xs text-[#64748b] mt-2 leading-relaxed border-t border-[#1e3a5f] pt-2">
                {check.tipsEn}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
