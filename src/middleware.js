// ════════════════════════════════════════
// 📄 src/middleware.js
// Protection des routes (protected)
// Le token est lu depuis les cookies
// (localStorage inaccessible côté serveur)
// ════════════════════════════════════════

import { NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/lecons', '/quiz', '/mon-espace'];
const AUTH_PATHS      = ['/login', '/signup', '/forgot-password'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Lire le token depuis le cookie (sync avec le client)
  const token = request.cookies.get('eduplatform_token')?.value;

  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  const isAuthPage  = AUTH_PATHS.some(p => pathname.startsWith(p));

  // ── Route protégée sans token → login ──
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Déjà authentifié → pas de page login/signup ──
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/formations', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/lecons/:path*',
    '/quiz/:path*',
    '/mon-espace/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
};
