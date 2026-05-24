'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  return (
    <div className="flex items-center gap-1 bg-[#0f1729] border border-[#1e3a5f] rounded-full p-1" role="group" aria-label="Language switcher">
      <button
        onClick={() => switchLocale('zh')}
        aria-label="切换到中文"
        aria-pressed={locale === 'zh'}
        className={`min-h-[44px] px-4 py-2 rounded-full text-sm transition-all ${
          locale === 'zh'
            ? 'bg-blue-600 text-white'
            : 'text-[#94a3b8] hover:text-white'
        }`}
      >
        🇨🇳 中文
      </button>
      <button
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
        className={`min-h-[44px] px-4 py-2 rounded-full text-sm transition-all ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-[#94a3b8] hover:text-white'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  )
}
