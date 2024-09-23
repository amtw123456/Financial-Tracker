import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const { transactionAmount, dateTimePosted, expenseCategory, transactionType, transactionDescription } = await req.json(); // Extract transaction data from the request body

    try {
        // Retrieve token from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Make the POST request to the backend
        const response = await axios.post(
            `https://financial-tracker-s47q.onrender.com/transaction/create/${userId}`,
            {
                "transactionAmount": transactionAmount,
                "dateTimePosted": dateTimePosted,
                "expenseCategory": expenseCategory,
                "transactionType": transactionType,
                "transactionDescription": transactionDescription,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response
        return NextResponse.json({ message: 'Transaction created successfully', data: response.data }, { status: 200 });

    } catch (error) {
        // console.error('Transaction creation failed:', error);
        return NextResponse.json({ message: 'Transaction creation failed' }, { status: 500 });
    }
}
