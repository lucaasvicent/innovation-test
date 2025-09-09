import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token');

  const loginUrl = new URL('/login', request.url);
  const produtosUrl = new URL('/produtos', request.url);

  if (pathname.startsWith('/produtos') && !token) {
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(produtosUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/produtos', '/login'],
};