import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/account', '/dashboard'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req) {
    const token = await getToken({ req });
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    const protectedRoute = protectedRoutes.find((route) => path.startsWith(route));
    if (protectedRoute && !token) {
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
