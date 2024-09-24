// middleware.ts or middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone();
    const cookieStore = cookies();
    const token = cookieStore.get('jwtToken'); // Get the JWT token from cookies

    // If the token exists, verify its validity
    if (token) {
        try {
            // Call the /isAuth endpoint to verify the token
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/isAuth`, {
                headers: {
                    Authorization: `Bearer ${token.value}`, // Pass the JWT token as a Bearer token
                },
            });
            // If the token is valid, redirect to the dashboard if accessing login or register

            if (response.status === 200) {
                if (url.pathname === '/login' || url.pathname === '/signup') {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
                // Proceed with the request if authenticated and accessing other routes
                return NextResponse.next();
            }

        } catch (error) {
            if (url.pathname !== '/login' && url.pathname !== '/signup') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            // return NextResponse.redirect(new URL('/login', request.url));
            return NextResponse.next();
        }
    }

    if (!token) {
        if (url.pathname == '/login' || url.pathname == '/signup') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }


    // Allow access to /login and /register pages for unauthenticated users


}

// Apply middleware only to these routes
export const config = {
    matcher: ['/transactions', '/dashboard', '/analytics', '/login', '/signup', '/'],
};
