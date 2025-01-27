import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { routeAccessMap } from './lib/settings'

// Add auth routes that should be public
const publicRoutes = ['/login', '/register']
// Add API routes that don't need authentication
const apiRoutes = ['/api/auth']

const matchers = Object.keys(routeAccessMap).map((route) => ({
    allowedRoles: routeAccessMap[route],
}));

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip middleware for public routes and API routes
    if (publicRoutes.includes(pathname) || apiRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    // Check for authentication token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    // Redirect to login if no token is found
    if (!token) {
        const loginUrl = new URL('/login', request.url)
        // Add the current path as a redirect parameter
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Protected routes
        '/profile/:path*',
        '/dashboard/:path*',
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Exclude all static files, api routes, and auth routes
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ]
}

