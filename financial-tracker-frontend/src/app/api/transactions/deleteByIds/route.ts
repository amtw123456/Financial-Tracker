import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        // Retrieve token and userId from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token || !userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Get the transaction IDs from the request body
        const { transactionIds } = await req.json();
        console.log(transactionIds)

        if (!transactionIds || transactionIds.length === 0) {
            return NextResponse.json({ message: 'No transaction IDs provided' }, { status: 400 });
        }

        // Make the delete request to the backend
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/deleteByIds`,
            transactionIds,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response
        return NextResponse.json({ message: 'Transactions deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete transactions', error }, { status: 500 });
    }
}
