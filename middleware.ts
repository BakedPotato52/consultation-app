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
    const token = await getToken({ req: request })
    const isAuthenticated = !!token

    // if (!isAuthenticated) {
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }

    // Skip middleware for public routes and API routes
    if (publicRoutes.includes(pathname) || apiRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    // Check for authentication token
    // const token = await getToken({
    //     req: request,
    //     secret: process.env.NEXTAUTH_SECRET
    // })



    return NextResponse.next()
}

export const config = {
    matcher: [
        // Protected routes
        '/profile/:path*',
        '/:path*',
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Exclude all static files, api routes, and auth routes
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ]
}

