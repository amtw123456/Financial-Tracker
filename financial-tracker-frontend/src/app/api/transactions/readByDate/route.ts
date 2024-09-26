import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

// POST handler to send date range and userId
export async function POST(request: NextRequest) {
    try {
        // Retrieve token and userId from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token || !userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Parse the incoming request body for startDate and endDate
        const { startDate, endDate } = await request.json();

        // Validate that both dates are provided
        if (!startDate || !endDate) {
            return NextResponse.json({ message: 'Invalid date range' }, { status: 400 });
        }

        // Make POST request to the backend API with the date range and userId
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/getTransactionsByDate/${userId}`,
            {
                startDate,
                endDate,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response with the data from the backend
        return NextResponse.json({
            message: 'Transactions fetched successfully',
            transactions: response.data,
        }, { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
    }
}
