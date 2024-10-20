import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// src > middleware.ts 

const roleBasedPrivateRoutes = {
    USER: [/^\/dashboard\/user/],
    AGENT: [/^\/dashboard\/agent/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super_admin/],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken')?.value;
    // console.log(accessToken);
    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (accessToken) {
        return NextResponse.next();
    }
    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
        console.log(decodedData?.role)
    }
    const role = decodedData?.role;
    type Role = keyof typeof roleBasedPrivateRoutes;
    if (roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    return NextResponse.redirect(new URL('/', request.url));

}

export const config = {
    matcher: ['/user/:path*'],
    // matcher: ['/'],
}