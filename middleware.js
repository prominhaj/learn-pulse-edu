import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/account', '/account/enrolled-courses'];
const publicRoutes = ['/login', '/register/student', '/register/instructor'];

export default async function middleware(req) {
    const token = await getToken({ req });
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(`/login?redirectUrl=${path}`, req.nextUrl));
    }

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
