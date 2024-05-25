import {NextResponse} from 'next/server';
import {ensurePrefix, withoutSuffix} from '@/utils/string';
import Cookies from "js-cookie";

const HOME_PAGE_URL = '/dashboards/crm';

const _redirect = (url, request) => {
    const _url = ensurePrefix(url, `${process.env.BASEPATH}`);
    const redirectUrl = new URL(_url, request.url).toString();
    return NextResponse.redirect(redirectUrl);
};

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    const token = Cookies.get('token');
    const isUserLoggedIn = !!token;

    const guestRoutes = ['login'];
    const sharedRoutes = ['shared-route'];
    const privateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route));

    // if (!isUserLoggedIn && privateRoute) {
    //     let redirectUrl = '/login';
    //     if (pathname !== '/') {
    //         const searchParamsStr = new URLSearchParams({redirectTo: withoutSuffix(pathname, '/')}).toString();
    //         redirectUrl += `?${searchParamsStr}`;
    //     }
    //     return _redirect(redirectUrl, request);
    // }

    const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route));

    if (isUserLoggedIn && isRequestedRouteIsGuestRoute) {
        return _redirect(HOME_PAGE_URL, request);
    }

    if (pathname === '/') {
        return _redirect(HOME_PAGE_URL, request);
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)'
    ]
};
