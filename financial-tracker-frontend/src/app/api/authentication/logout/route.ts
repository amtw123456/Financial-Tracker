import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        // Delete the cookies by setting their expiration date in the past
        cookies().set('email', '', { expires: new Date(0) });
        cookies().set('jwtToken', '', { expires: new Date(0) });
        cookies().set('userId', '', { expires: new Date(0) });

        // Return a response indicating successful logout
        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error during logout:', error);
        return NextResponse.json({ message: 'Failed to log out' }, { status: 500 });
    }
}
