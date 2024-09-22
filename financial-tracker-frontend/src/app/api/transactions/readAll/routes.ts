import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    try {
        // Retrieve token from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Make the POST request to the backend
        const response = await axios.post(
            'http://localhost:8080/transaction/getAll/' + userId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response
        return NextResponse.json({ message: 'Get all user specific Transactions Successfully', data: response.data }, { status: 200 });

    } catch (error) {
        // console.error('Transaction creation failed:', error);
        return NextResponse.json({ message: 'Transaction creation failed' }, { status: 500 });
    }
}
