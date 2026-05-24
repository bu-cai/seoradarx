'use client'
import { useEffect, useState } from 'react'

interface Props {
  name: string
  score: number
  max: number
  delay?: number
}

function barColor(pct: number) {
  if (pct >= 90) return 'bg-emerald-500'
  if (pct >= 75) return 'bg-blue-500'
  if (pct >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function CategoryBar({ name, score, max, delay = 0 }: Props) {
  const [width, setWidth] = useState(0)
  const pct = Math.round((score / max) * 100)

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay + 100)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-[#94a3b8]">{name}</span>
        <span className="text-sm font-mono font-semibold text-[#f0f4ff]">
          {score}<span className="text-[#94a3b8]">/{max}</span>
        </span>
      </div>
      <div className="h-2 bg-[#1e3a5f] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(pct)}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
