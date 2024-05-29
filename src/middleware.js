import { NextResponse } from 'next/server';
import { withoutSuffix } from '@/utils/string';

const HOME_PAGE_URL = '/login';

const _redirect = (url, request) => {
    const redirectUrl = new URL(url, request.url).toString();
    return NextResponse.redirect(redirectUrl);
};

export async function middleware(request) {
    // const pathname = request.nextUrl.pathname;
    //
    // const token = request.cookies.get('token'); // دسترسی به کوکی‌ها از طریق request.cookies
    // const isUserLoggedIn = !!token;
    //
    // const guestRoutes = ['login'];
    // const sharedRoutes = ['shared-route'];
    // const privateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route));
    //
    //
    // const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route));
    //
    // // if (isUserLoggedIn && isRequestedRouteIsGuestRoute) {
    // //     return _redirect(HOME_PAGE_URL, request);
    // // }
    //
    // if (pathname === '/') {
    //     return _redirect(HOME_PAGE_URL, request);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)'
    ]
};
