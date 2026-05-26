'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HistoryPoint {
  id: string
  score: number
  categoryScores: Record<string, number>
  createdAt: string
}

interface Props {
  url: string
  currentId: string
  locale: string
}

const CAT_LABELS: Record<string, { en: string; zh: string }> = {
  seo:         { en: 'SEO',         zh: 'SEO基础' },
  performance: { en: 'Perf',        zh: '性能' },
  technical:   { en: 'Technical',   zh: '技术' },
  geo:         { en: 'GEO',         zh: 'GEO' },
  content:     { en: 'Content',     zh: '内容' },
}

function scoreColor(score: number) {
  if (score >= 80) return '#4ade80'   // green
  if (score >= 60) return '#facc15'   // yellow
  if (score >= 40) return '#fb923c'   // orange
  return '#f87171'                     // red
}

function formatDate(iso: string, zh: boolean) {
  const d = new Date(iso)
  if (zh) return `${d.getMonth() + 1}/${d.getDate()}`
  return `${d.getMonth() + 1}/${d.getDate()}`
}

// Pure-SVG line chart — no external deps
function LineChart({ points, zh }: { points: HistoryPoint[]; zh: boolean }) {
  const W = 320; const H = 90
  const PAD = { top: 10, right: 16, bottom: 24, left: 28 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const scores = points.map(p => p.score)
  const minS = Math.max(0, Math.min(...scores) - 10)
  const maxS = Math.min(100, Math.max(...scores) + 10)
  const range = maxS - minS || 1

  function x(i: number) {
    return PAD.left + (i / Math.max(points.length - 1, 1)) * innerW
  }
  function y(score: number) {
    return PAD.top + innerH - ((score - minS) / range) * innerH
  }

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.score).toFixed(1)}`)
    .join(' ')

  const areaPath =
    linePath +
    ` L${x(points.length - 1).toFixed(1)},${(PAD.top + innerH).toFixed(1)}` +
    ` L${x(0).toFixed(1)},${(PAD.top + innerH).toFixed(1)} Z`

  const latestColor = scoreColor(points[points.length - 1]?.score ?? 0)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 90 }}>
      {/* Y-axis gridlines */}
      {[40, 60, 80].map(v => (
        <g key={v}>
          <line
            x1={PAD.left} y1={y(v).toFixed(1)}
            x2={PAD.left + innerW} y2={y(v).toFixed(1)}
            stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3 3"
          />
          <text x={PAD.left - 4} y={y(v) + 3} textAnchor="end" fontSize="7" fill="#4a5568">{v}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={latestColor} fillOpacity="0.06" />

      {/* Line */}
      <path d={linePath} fill="none" stroke={latestColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots + x-axis labels */}
      {points.map((p, i) => (
        <g key={p.id}>
          <circle cx={x(i)} cy={y(p.score)} r="3.5" fill={scoreColor(p.score)} stroke="#080e1a" strokeWidth="1.5" />
          {/* Show label for first, last, and every 3rd point */}
          {(i === 0 || i === points.length - 1 || i % 3 === 0) && (
            <text
              x={x(i)} y={H - 2}
              textAnchor="middle" fontSize="7" fill="#4a5568"
            >
              {formatDate(p.createdAt, zh)}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

export default function ScoreHistory({ url, currentId, locale }: Props) {
  const zh = locale === 'zh'
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/history?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(data => {
        setHistory(data.history ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [url])

  if (loading) return null

  // Need at least 2 audits to show history
  if (history.length < 2) {
    return (
      <div className="rounded-2xl border border-[#1e3a5f]/50 bg-[#0c1322] p-4 mt-4">
        <p className="text-xs font-semibold text-[#64748b] mb-1">
          {zh ? '📈 历史分数追踪' : '📈 Score History'}
        </p>
        <p className="text-xs text-[#4a5568] leading-relaxed">
          {zh
            ? '修复问题后重新检测，这里将显示你的分数变化趋势。'
            : 'Re-audit after fixing issues to track your score improvement over time.'}
        </p>
      </div>
    )
  }

  const prev = history[history.length - 2]
  const latest = history[history.length - 1]
  const delta = latest.score - prev.score
  const isCurrentLatest = latest.id === currentId

  // If viewing an old audit, highlight which one is current
  const displayPoints = history

  return (
    <div className="rounded-2xl border border-[#1e3a5f]/50 bg-[#0c1322] p-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-[#94a3b8]">
          {zh ? '📈 历史分数追踪' : '📈 Score History'}
        </p>
        <span className="text-[10px] text-[#4a5568]">
          {zh ? `共 ${history.length} 次检测` : `${history.length} audits`}
        </span>
      </div>

      {/* Delta badge */}
      {isCurrentLatest && (
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-black ${delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-[#64748b]'}`}>
            {delta > 0 ? `↑ +${delta}` : delta < 0 ? `↓ ${delta}` : '→ ±0'}
          </span>
          <span className="text-xs text-[#4a5568]">
            {zh ? '与上次相比' : 'vs last audit'}
          </span>
          {delta > 0 && (
            <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded-full">
              {zh ? '进步了 🎉' : 'Improving 🎉'}
            </span>
          )}
          {delta < 0 && (
            <span className="text-[10px] bg-red-950/60 text-red-400 border border-red-800/40 px-2 py-0.5 rounded-full">
              {zh ? '需要关注' : 'Needs attention'}
            </span>
          )}
        </div>
      )}

      {/* Chart */}
      <div className="mb-3">
        <LineChart points={displayPoints} zh={zh} />
      </div>

      {/* Category deltas */}
      {isCurrentLatest && (
        <div className="grid grid-cols-5 gap-1 mb-3">
          {Object.entries(latest.categoryScores).map(([cat, score]) => {
            const prevScore = prev.categoryScores[cat] ?? 0
            const d = score - prevScore
            return (
              <div key={cat} className="text-center bg-[#0f1729] rounded-lg py-1.5 px-1">
                <div className="text-[9px] text-[#4a5568] mb-0.5">
                  {CAT_LABELS[cat]?.[zh ? 'zh' : 'en'] ?? cat}
                </div>
                <div className="text-xs font-bold" style={{ color: scoreColor(score) }}>{score}</div>
                {d !== 0 && (
                  <div className={`text-[9px] font-semibold ${d > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {d > 0 ? `+${d}` : d}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* History list — last 5 */}
      <div className="space-y-1">
        {[...displayPoints].reverse().slice(0, 5).map((p, i) => {
          const isCurrent = p.id === currentId
          return (
            <div
              key={p.id}
              className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${
                isCurrent ? 'bg-blue-950/30 border border-blue-800/30' : 'bg-[#0f1729]'
              }`}
            >
              <span className="text-[10px] text-[#4a5568]">
                {new Date(p.createdAt).toLocaleDateString(zh ? 'zh-CN' : 'en-US', {
                  month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
                {isCurrent && (
                  <span className="ml-1.5 text-blue-400 font-semibold">
                    {zh ? '（当前）' : '(current)'}
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: scoreColor(p.score) }}>
                  {p.score}
                </span>
                {i < displayPoints.length - 1 && !isCurrent && (
                  <Link
                    href={`/${locale}/results/${p.id}`}
                    className="text-[9px] text-[#4a5568] hover:text-blue-400 transition-colors"
                  >
                    {zh ? '查看' : 'View'}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
