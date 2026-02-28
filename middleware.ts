import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'mm_auth';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/workbox') ||
    pathname.startsWith('/sw') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  const authCookie = req.cookies.get(AUTH_COOKIE);
  const isLoggedIn = !!authCookie?.value;
  const isAuthRoute =
    pathname === '/' || pathname === '/login' || pathname === '/signup';

  // If not logged in and trying to access a protected route, go to root (login)
  if (!isLoggedIn && !isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access login/signup/root, send to home dashboard
  if (isLoggedIn && isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|workbox-).*)'],
};

