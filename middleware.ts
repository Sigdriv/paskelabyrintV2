import type { NextRequest } from 'next/server';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  isUserRoutes,
  publicRoutes,
} from './routes';
import { getRoleFromToken, isTokenExpired } from './utils';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('session_token');
  const isExpiredToken = isTokenExpired(token?.value);
  const isLoggedIn = !!token?.value && !isExpiredToken;
  const userRole = getRoleFromToken(token?.value);

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isUserRoute = isUserRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isAminRoute = pathname.startsWith('/admin');
  const isDevRoute = pathname.startsWith('/dev');

  const isDevUser = userRole === 'DEV';
  const isAdminUser = userRole === 'ADMIN' || userRole === 'DEV';

  if (isApiAuthRoute) return;

  if (isPublicRoute) return;

  if (isDevRoute && !isDevUser) {
    return Response.redirect(new URL('/admin', req.url));
  }

  if (isAminRoute && !isAdminUser) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  if (!isLoggedIn && DEFAULT_LOGIN_REDIRECT === pathname)
    return Response.redirect(new URL(authRoutes[0], req.url));

  if (isUserRoute && !isLoggedIn)
    return Response.redirect(new URL(authRoutes[0], req.url));

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (isDevUser) {
        return Response.redirect(new URL('/dev', req.url));
      } else if (isAdminUser) {
        return Response.redirect(new URL('/admin', req.url));
      } else {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
      }
    }

    return;
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
