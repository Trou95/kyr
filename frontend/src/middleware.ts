import { NextRequest, NextResponse } from 'next/server';

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
