import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json(); // Extract credentials from the request body

    try {
        // Replace the URL with your actual backend login endpoint
        const response = await axios.post('http://localhost:8080/login', {
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        const token = response.data;
        // Set cookies for authentication
        cookies().set('jwtToken', response.data.jwtToken, { maxAge: 60 * 60 });
        cookies().set('email', username, { maxAge: 60 * 60 });
        cookies().set('userId', response.data.userId, { maxAge: 60 * 60 });

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        // console.error('Login failed:', error);
        return NextResponse.json({ message: 'Login failed' }, { status: 401 });
    }
}
