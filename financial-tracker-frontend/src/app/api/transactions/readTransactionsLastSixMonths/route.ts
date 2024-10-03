import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        // Retrieve token and userId from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        // Check if token and userId exist
        if (!token || !userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        // Make GET request to the backend API for the last six months transactions summary
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/getLastSixMonthsTransactionsSummary/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response with the data from the backend
        return NextResponse.json({
            message: 'Transactions summary fetched successfully',
            transactionsSummary: response.data,
        }, { status: 200 });

    } catch (error) {
        // Handle errors
        console.error('Error fetching transactions summary:', error);
        return NextResponse.json({ message: 'Failed to fetch transactions summary' }, { status: 500 });
    }
}
