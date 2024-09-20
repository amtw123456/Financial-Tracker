import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export async function POST(req: NextRequest) {
    const { username, password } = await req.json(); // Extract credentials from the request body

    try {
        // Replace the URL with your actual backend login endpoint
        const response = await axios.post('http://localhost:8080/signup', {
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 226) {
            return NextResponse.json({ isSuccessful: false, message: 'Registration failed, username already exist!' }, { status: 226 });
        }

        return NextResponse.json({ isSuccessful: true, message: 'Registration successful' }, { status: 200 });

    } catch (error) {
        // console.error('Login failed:', error);
        return NextResponse.json({ isSuccessful: false, message: 'Registration failed' }, { status: 401 });
    }
}
