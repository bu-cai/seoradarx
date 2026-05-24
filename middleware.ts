import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Auto-detect locale on root path only
  if (pathname === '/') {
    const country     = req.headers.get('x-vercel-ip-country') ?? ''
    const acceptLang  = req.headers.get('accept-language') ?? ''

    let locale = 'en' // default: English for international visitors

    if (country === 'CN') {
      // Mainland China IP → Chinese
      locale = 'zh'
    } else if (acceptLang.toLowerCase().includes('zh')) {
      // Browser set to Chinese (e.g. overseas Chinese) → Chinese
      locale = 'zh'
    }

    return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  // All other paths: let next-intl handle routing normally
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/', '/(zh|en)/:path*'],
}
