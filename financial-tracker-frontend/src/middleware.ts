// middleware.ts or middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    // Retrieve the cookie store
    const cookieStore = cookies();
    const token = cookieStore.get('jwtToken'); // Get the JWT token from cookies

    // If the token does not exist, allow access to the requested routes
    if (!token) {
        return NextResponse.next();
    }

    try {
        // Call the /isAuth endpoint to verify the token
        const response = await fetch('http://localhost:3000/api/isauth', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.value}`, // Pass the JWT token as a Bearer token
            },
        });

        // If the token is valid, redirect to the dashboard
        if (response.ok) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
    }

    // Proceed with the request if the token is invalid or the call fails
    return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
    matcher: ['/register', '/login'],
};
