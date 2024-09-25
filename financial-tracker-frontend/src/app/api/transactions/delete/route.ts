import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function DELETE(request: NextRequest) {

    try {
        // Retrieve token and userId from cookies
        const token = cookies().get('jwtToken')?.value;
        const userId = cookies().get('userId')?.value;

        if (!token || !userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Extract transactionId from the request URL
        const { searchParams } = new URL(request.url);
        const transactionId = searchParams.get('transactionId');
        console.log(transactionId)

        if (!transactionId) {
            return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 });
        }

        console.log("RED")

        // Make delete request to the backend
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/delete/${transactionId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Return success response
        return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete transaction' }, { status: 500 });
    }
}
