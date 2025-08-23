import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];
const adminRoute = '/admin';

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isAdminRoute = path.startsWith(adminRoute);

  // 3. Decrypt the session from the cookie
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isAdminRoute && session?.userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}