import { NextRequest, NextResponse } from 'next/server';

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_KEY)?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
