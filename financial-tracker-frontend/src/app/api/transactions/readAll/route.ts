import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {

    try {
        // Retrieve token and userId from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token || !userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/getAll/${userId}`,

            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        // Return success response
        return NextResponse.json({ message: 'Get all user specific Transactions Successfully', listOfUserTransactions: response.data }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: 'Get all user specific Transactions Failed' }, { status: 500 });
    }
}
