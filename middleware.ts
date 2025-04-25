import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (path === '/sign-in' || path === '/sign-up') {
        return NextResponse.next()
    }

    const token = request.cookies.get('payload-token')?.value

    if (!token && path !== '/') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (token && (path.startsWith('/admin') || path.startsWith('/editor-catalogo') || path.startsWith('/editor-ambiente'))) {
        try {
            const response = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                return NextResponse.redirect(new URL('/sign-in', request.url))
            }

            const user = await response.json()

            if (path.startsWith('/admin') && user.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url))
            }

            if (path.startsWith('/editor-catalogo') && !['admin', 'editorCatalogo'].includes(user.role)) {
                return NextResponse.redirect(new URL('/', request.url))
            }

            if (path.startsWith('/editor-ambiente') && !['admin', 'editorAmbiente'].includes(user.role)) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}