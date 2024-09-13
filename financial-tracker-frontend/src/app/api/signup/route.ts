import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json(); // Extract credentials from the request body

    try {
        // Replace the URL with your actual backend login endpoint
        console.log(username);
        console.log(password);
        const response = await axios.post('http://localhost:8080/signup', {
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data;

        return NextResponse.json({ message: 'Registration successful' }, { status: 200 });

    } catch (error) {
        // console.error('Login failed:', error);
        return NextResponse.json({ message: 'Registration failed' }, { status: 401 });
    }
}
