import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ['/', '/account', '/about', '/events', '/services'];
  const isPublcRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/api/auth')
  );

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = !!token; // this converts a variable into boolean expression

  if (!isAuthenticated && !isPublcRoute) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  if (isAuthenticated && pathname == '/account') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}


export const config = {
    matcher: [
        // Apply to all routes except for static files, images, and other assets
        '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
    ]
}