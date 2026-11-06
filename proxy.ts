import { NextRequest, NextResponse } from 'next/server'

const SKIP = /^\/(_next|api|assets|favicon\.ico|sitemap\.xml|robots\.txt|llms.*\.txt|.*\.\w+)$/
const LOCALIZED = /^\/(en|fr)(\/|$)/

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (SKIP.test(pathname) || LOCALIZED.test(pathname)) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = { matcher: ['/((?!_next).*)'] }
