import { NextResponse } from 'next/server';
import { withoutSuffix } from '@/utils/string';

const HOME_PAGE_URL = '/login';

const _redirect = (url, request) => {
    const redirectUrl = new URL(url, request.url).toString();
    return NextResponse.redirect(redirectUrl);
};

export async function middleware(request) {
    const token = request.cookies.get('token');
    console.log("token")
    // چک کردن وجود توکن
    // if (!token && request.nextUrl.pathname !== '/login') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)'
    ]
};
