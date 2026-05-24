import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Icon */}
      <div className="relative mb-6 w-20 h-20 bg-blue-950/60 border border-blue-800/40 rounded-2xl flex items-center justify-center">
        <span className="text-4xl">🔍</span>
      </div>

      {/* Headline */}
      <h1 className="text-6xl font-black text-[#1e3a5f] mb-3">404</h1>
      <h2 className="text-xl font-bold text-[#f0f4ff] mb-3">页面不见了</h2>
      <p className="text-sm text-[#64748b] mb-8 max-w-sm leading-relaxed">
        这个页面不存在或已被移除。<br />
        返回首页，免费检测您的独立站 SEO。
      </p>

      {/* CTAs */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/zh"
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
        >
          🇨🇳 返回首页
        </Link>
        <Link
          href="/en"
          className="bg-[#0f1729] hover:bg-[#162035] border border-[#1e3a5f] text-[#94a3b8] rounded-xl px-6 py-3 font-semibold text-sm transition-all"
        >
          🇺🇸 Go to Homepage
        </Link>
      </div>

      {/* Brand */}
      <div className="mt-12 flex items-center gap-2 text-xs text-[#4a5568]">
        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
        <span>SEO Radar X</span>
      </div>
    </div>
  )
}
