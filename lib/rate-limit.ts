import { prisma } from './db'

const MAX_REQUESTS = 10 // 每天10次（之前3次太少，用户测试完不够用）
const WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date()

  try {
    const record = await prisma.rateLimit.findUnique({ where: { ipAddress: ip } })

    if (!record || record.resetAt < now) {
      await prisma.rateLimit.upsert({
        where: { ipAddress: ip },
        update: { count: 1, resetAt: new Date(now.getTime() + WINDOW_MS) },
        create: { ipAddress: ip, count: 1, resetAt: new Date(now.getTime() + WINDOW_MS) },
      })
      return { allowed: true, remaining: MAX_REQUESTS - 1 }
    }

    if (record.count >= MAX_REQUESTS) {
      return { allowed: false, remaining: 0 }
    }

    await prisma.rateLimit.update({
      where: { ipAddress: ip },
      data: { count: record.count + 1 },
    })
    return { allowed: true, remaining: MAX_REQUESTS - record.count - 1 }
  } catch {
    return { allowed: true, remaining: 1 }
  }
}
