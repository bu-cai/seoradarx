'use client'
import { useEffect, useState } from 'react'

interface Props {
  score: number
  size?: 'large' | 'small'
  label?: string
}

function scoreColor(s: number) {
  if (s >= 90) return '#10b981'
  if (s >= 75) return '#3b82f6'
  if (s >= 50) return '#f59e0b'
  return '#ef4444'
}

export default function ScoreGauge({ score, size = 'large', label }: Props) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const step = 16
    const increment = score / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= score) {
        setDisplayed(score)
        clearInterval(timer)
      } else {
        setDisplayed(Math.round(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [score])

  const isLarge = size === 'large'
  const radius = isLarge ? 54 : 32
  const stroke = isLarge ? 8 : 5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayed / 100) * circumference
  const viewBox = isLarge ? '0 0 120 120' : '0 0 74 74'
  const cx = isLarge ? 60 : 37
  const cy = isLarge ? 60 : 37
  const color = scoreColor(score)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width={isLarge ? 160 : 90} height={isLarge ? 160 : 90} viewBox={viewBox}>
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth={stroke}
          />
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-mono font-bold leading-none`}
            style={{ fontSize: isLarge ? 36 : 20, color }}
          >
            {displayed}
          </span>
          {isLarge && (
            <span className="text-xs text-[#94a3b8] mt-1">/100</span>
          )}
        </div>
      </div>
      {label && (
        <span
          className={`font-semibold text-center ${isLarge ? 'text-base' : 'text-xs'}`}
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
