import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAccessJwt, validAccessJwt } from './lib/access/next';

export function middleware(request: NextRequest) {
  if (!!process.env.CLOUDFLARE_ACCESS_AUTH_DISABLED) return NextResponse.next();
  if (!validAccessJwt(getAccessJwt(request))) {
    const url = process.env.CLOUDFLARE_ACCESS_URL || 'https://yourteam.cloudflareaccess.com';
    return NextResponse.redirect(new URL(url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/(.*)'],
}