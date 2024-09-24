import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    // Extract the Authorization header from the incoming request
    const authHeader = req.headers.get('authorization');

    // console.log(authHeader)

    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Authorization header is missing or invalid' }, { status: 401 });
    }

    try {
        // Call the backend /isAuth endpoint with the Authorization header
        const response = await axios.get(`${process.env.BACKEND_URL}/isAuth`, {

            headers: {
                Authorization: authHeader, // Pass the original Authorization header
            },
        });

        // Assuming the backend returns a boolean indicating if the user is authenticated
        const isAuthenticated = response.data;

        if (isAuthenticated) {
            return NextResponse.json({ message: 'User is authenticated' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
        }
    } catch (error) {
        // console.error('Authentication check failed:', error);
        return NextResponse.json({ message: 'Failed to check authentication' }, { status: 500 });
    }
}
