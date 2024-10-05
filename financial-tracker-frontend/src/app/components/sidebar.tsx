import { DateValue } from "@nextui-org/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";

import { FaHouse } from "react-icons/fa6"; // house
import { FaHandHoldingWater } from "react-icons/fa"; // utilities
import { FaMoneyBills } from "react-icons/fa6"; // debts bills
import { GiClothes } from "react-icons/gi"; // clothes
import { FaCarSide } from "react-icons/fa"; // transportation
import { MdHealthAndSafety } from "react-icons/md"; // healthcare
import { IoFastFood } from "react-icons/io5"; // food
import { MdShoppingCart } from "react-icons/md"; // shopping cart
import { HiDotsCircleHorizontal } from "react-icons/hi"; // others
import { FaShieldAlt } from "react-icons/fa"; // insurance

import { CgProfile } from "react-icons/cg";

import TrackIt from "../../components/TrackIt.png";
import Image from 'next/image';


const iconMap: { [key: string]: JSX.Element } = {
    House: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
            <FaHouse className="text-blue-500" />
        </div>
    ),
    Utilities: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
            <FaHandHoldingWater className="text-yellow-600" />
        </div>
    ),
    Bills: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100">
            <FaMoneyBills className="text-purple-600" />
        </div>
    ),
    Clothes: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100">
            <GiClothes className="text-amber-600" />
        </div>
    ),
    Transportation: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
            <FaCarSide className="text-orange-600" />
        </div>
    ),
    Healthcare: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100">
            <MdHealthAndSafety className="text-sky-600" />
        </div>
    ),
    Food: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
            <IoFastFood className="text-green-600" />
        </div>
    ),
    Shopping: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100">
            <MdShoppingCart className="text-red-600" />
        </div>
    ),
    Others: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-100">
            <HiDotsCircleHorizontal className="text-cyan-600" />
        </div>
    ),
    Insurance: (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100">
            <FaShieldAlt className="text-pink-600" />
        </div>
    ),

};


export default function Sidebar() {
    const [recentTransactions, setRecentTransactions] = useState<number[]>([]);
    const [userEmail, setUserEmail] = useState<String>();

    const [startDate, setStartDate] = useState<DateValue>(now(getLocalTimeZone()).subtract({ weeks: 4 }) as DateValue);
    const [endDate, setEndDate] = useState<DateValue>(now(getLocalTimeZone()) as DateValue);

    const getUserTransactionByDate = async (startDate: DateValue, endDate: DateValue) => {
        try {
            const response = await axios.post('/api/transactions/readByDate', { startDate, endDate });
            return response.data.transactions; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get('/api/authentication/logout');
            if (response.status === 200) {
                window.location.reload(); // This will refresh the page
            }
            return response.data; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const getUserEmail = async () => {
        try {
            const response = await axios.get('/api/users/readEmail');
            return response.data; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    useEffect(() => {
        const fetchTransactionsByDate = async () => {
            try {
                const transactions = await getUserTransactionByDate(startDate, endDate);
                // Handle the transactions as needed
                // console.log('Fetched transactions:', transactions);
                setRecentTransactions(transactions)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };
        fetchTransactionsByDate();

    }, [startDate, endDate]);

    useEffect(() => {
        console.log(recentTransactions)

    }, [recentTransactions]);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await getUserEmail();
                // Handle the transactions as needed
                console.log('Fetched userEmail:', response.email);
                setUserEmail(response.email);

            } catch (error) {
                console.error('Failed to userEmail:', error);
            }
        };

        fetchUserEmail()

    }, []);

    return (
        <div className="hidden lg:flex flex-col w-64 bg-gray-800">
            <div className="flex flex-row items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold uppercase">TrackIt</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <ul className="flex flex-col gap-2 max-w-[280px] mx-2">
                        <li>
                            <details className="group">
                                <summary
                                    className="flex items-center justify-between gap-2 p-2 marker:content-none hover:cursor-pointer">
                                    <span className="flex gap-2">
                                        <CgProfile className="w-6 h-6 rounded-lg text-white" />
                                        <span className="text-white">
                                            {userEmail}
                                        </span>
                                    </span>
                                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                        </path>
                                    </svg>
                                </summary>

                                <article className="px-4 pb-4">
                                    <ul className="flex flex-col gap-4 pl-2 mt-4">
                                        <li className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                stroke="currentColor" className="w-6 h-6 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z">
                                                </path>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                                </path>
                                            </svg>


                                            <a className="text-white">
                                                Settings
                                            </a>
                                        </li>

                                        <form action={() => { logout(); }} method="POST">
                                            <button type="submit" className="text-white text-sm px-2 py-1 rounded-md">
                                                Log Out
                                            </button>
                                        </form>

                                    </ul>

                                </article>

                            </details>
                        </li>

                        <li>
                            <details className="group">

                                <summary
                                    className="flex items-center justify-between gap-2 p-2 marker:content-none hover:cursor-pointer">

                                    <span className="flex gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>

                                        <span className="text-white">
                                            Recent Transactions
                                        </span>
                                    </span>
                                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                        </path>
                                    </svg>
                                </summary>

                                <article className="px-4 pb-4">
                                    <ul className="flex flex-col gap-1 pl-2">
                                        {recentTransactions.slice(0, 3).map((transaction: any, index) => (
                                            <li key={index}>
                                                <div className="ml-10 flex flex-row justify-left items-center text-white">
                                                    <div>
                                                        {iconMap[transaction.expenseCategory] || <HiDotsCircleHorizontal className="text-gray-600" />}
                                                    </div>
                                                    {/* <div className="ml-2">
                                                        {new Date(transaction.dateTimePosted).toLocaleDateString('en-GB', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })}
                                                    </div> */}
                                                    <div className="ml-2">
                                                        {transaction.expenseCategory}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </details>
                        </li>
                    </ul>
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Dashboard
                    </a>
                    <a href="/transactions" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Transactions
                    </a>
                    {/* <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Analytics
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        About
                    </a> */}
                </nav>
            </div>
        </div >

    )
}