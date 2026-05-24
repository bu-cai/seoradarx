interface Props {
  platform: string
  locale: string
}

const config: Record<string, { icon: string; color: string }> = {
  shopify:   { icon: '🛍️', color: 'bg-green-900/50 text-green-300 border-green-700/50' },
  wordpress: { icon: '📝', color: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
  unknown:   { icon: '🌐', color: 'bg-[#162035] text-[#94a3b8] border-[#1e3a5f]' },
}

const labels: Record<string, { zh: string; en: string }> = {
  shopify:   { zh: 'Shopify 独立站', en: 'Shopify Store' },
  wordpress: { zh: 'WordPress 独立站', en: 'WordPress Store' },
  unknown:   { zh: '独立站', en: 'Independent Store' },
}

export default function PlatformBadge({ platform, locale }: Props) {
  const cfg = config[platform] ?? config.unknown
  const lbl = labels[platform] ?? labels.unknown
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${cfg.color}`}>
      {cfg.icon} {locale === 'zh' ? lbl.zh : lbl.en}
    </span>
  )
}
