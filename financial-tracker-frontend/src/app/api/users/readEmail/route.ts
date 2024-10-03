import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        // Retrieve email from cookies
        const email = cookies().get('email')?.value;

        // Check if email exists
        if (!email) {
            return NextResponse.json({ message: 'Email not found' }, { status: 404 });
        }

        // Return the email in the response
        return NextResponse.json({ email }, { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error fetching email:', error);
        return NextResponse.json({ message: 'Failed to fetch email' }, { status: 500 });
    }
}
