import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SEO Audit Pro — Free SEO Checker for Shopify & WordPress'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #080b14 0%, #0f1729 50%, #0a1628 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent circles */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -100,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Logo badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 40,
        }}>
          <div style={{
            width: 52, height: 52,
            background: '#2563eb',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, color: 'white',
          }}>S</div>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#f0f4ff' }}>
            {zh ? 'SEO审计专家' : 'SEO Audit Pro'}
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          fontSize: zh ? 52 : 48,
          fontWeight: 800,
          color: '#f0f4ff',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: 900,
          marginBottom: 20,
        }}>
          {zh ? '免费检测独立站SEO健康度' : 'Free SEO Audit for Shopify & WordPress'}
        </div>

        <div style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#3b82f6',
          marginBottom: 48,
          textAlign: 'center',
        }}>
          {zh ? '30项检测 · 30秒出报告 · 无需注册' : '30 Checks · 30 Seconds · No Sign-up'}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {(zh
            ? [['30项', 'SEO关键指标'], ['< 15秒', '平均检测耗时'], ['免费', '立即开始']]
            : [['30', 'SEO Checks'], ['< 15s', 'Avg Audit Time'], ['Free', 'No Sign-up']]
          ).map(([num, label]) => (
            <div key={num} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: 16, padding: '16px 32px',
            }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#3b82f6' }}>{num}</span>
              <span style={{ fontSize: 16, color: '#94a3b8', marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute', bottom: 32,
          fontSize: 18, color: '#4a5568',
        }}>
          www.seoradarx.com
        </div>
      </div>
    ),
    { ...size }
  )
}
