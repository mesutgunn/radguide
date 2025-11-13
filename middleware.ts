// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Şimdilik sadece istekleri aynen devam ettiriyoruz (koruma yok)
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
