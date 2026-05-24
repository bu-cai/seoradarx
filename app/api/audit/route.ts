import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/auditor'
import { prisma } from '@/lib/db'
import { checkRateLimit } from '@/lib/rate-limit'

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, locale = 'zh' } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'invalid_url' }, { status: 400 })
    }

    let parsedUrl: URL
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'invalid_url' }, { status: 400 })
    }

    const ip = getIP(req)
    const { allowed } = await checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
    }

    // Check cache: same URL audited in last 24h
    const cached = await prisma.audit.findFirst({
      where: {
        url: parsedUrl.href,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })
    if (cached) {
      return NextResponse.json({
        auditId: cached.id,
        results: JSON.parse(cached.results),
        score: cached.score,
        categoryScores: JSON.parse(cached.categoryScores),
        platform: cached.platform,
        cached: true,
      })
    }

    const result = await runAudit(parsedUrl.href)

    const audit = await prisma.audit.create({
      data: {
        url: parsedUrl.href,
        platform: result.platform,
        score: result.overallScore,
        categoryScores: JSON.stringify(result.categoryScores),
        results: JSON.stringify(result.checks),
        locale,
        ipAddress: ip,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })

    return NextResponse.json({
      auditId: audit.id,
      results: result.checks,
      score: result.overallScore,
      categoryScores: result.categoryScores,
      platform: result.platform,
      fetchTime: result.fetchTime,
    })
  } catch (err) {
    console.error('Audit error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('fetch') || message.includes('network') || message.includes('abort')) {
      return NextResponse.json({ error: 'fetch_failed' }, { status: 502 })
    }
    return NextResponse.json({ error: 'generic' }, { status: 500 })
  }
}
