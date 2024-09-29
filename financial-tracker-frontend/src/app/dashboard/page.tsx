"use client"

import React, { useContext, useEffect, useState } from "react";
import { connectedScatterplotData } from "./connectedScatterplotData";
import { ConnectedScatterplot } from './connectedScatterplotChart';

import { ringData } from "./ringData";
import { RingChart } from "./ringChart";

import Sidebar from "../components/sidebar";
import Header from "../components/header";

import axios from "axios";
import TransactionRow from "../components/transactionRow";

import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

import { BarChart } from "./BarChart"

interface Transaction {
    transactionId: number,
    dateTimePosted: string; // or Date, depending on how you handle dates
    transactionAmount: number;
    expenseCategory: string;
    transactionDescription: string;
    // Add any other properties that are relevant
}

export default function Dashboard() {

    const [startDate, setStartDate] = useState<DateValue>(now(getLocalTimeZone()).subtract({ weeks: 1 }) as DateValue);
    const [endDate, setEndDate] = useState<DateValue>(now(getLocalTimeZone()) as DateValue);

    const [selectedTransactionIds, setSelectedTransactionIds] = useState<number[]>([]);
    const [selectectedTransactionsByCategoryAndDate, setSelectectedTransactionsByCategoryAndDate] = useState<any>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // const [ringTransactionsData, setRingTransactionsData] = 

    const getUserTransaction = async () => {
        try {
            const response = await axios.get('/api/transactions/readAll');
            console.log('User transactions:', response.data.listOfUserTransactions);
            return response.data.listOfUserTransactions

        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    }

    const fetchTransactions = async () => {
        try {
            setTransactions(await getUserTransaction())
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();


    }, []);

    const getUserTransactionByDate = async (startDate: DateValue, endDate: DateValue) => {
        try {
            const response = await axios.post('/api/transactions/readByDate', { startDate, endDate });
            console.log('User transactions:', response.data.transactions); // Adjusted to access transactions
            return response.data.transactions; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const getUserTransactionByCategoryAndDate = async (startDate: DateValue, endDate: DateValue) => {
        try {
            const response = await axios.post('/api/transactions/readByCategoryAndDate', { startDate, endDate });
            console.log('User transactions:', response.data.transactions); // Adjusted to access transactions
            return response.data.transactions; // Ensure you're returning the correct data structure
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
                console.log('Fetched transactions:', transactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        const fetchTransactionsByCategoryAndDate = async () => {
            try {
                const transactions = await getUserTransactionByCategoryAndDate(startDate, endDate);
                // Handle the transactions as needed

                setSelectectedTransactionsByCategoryAndDate(transactions);
                console.log(transactions)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactionsByDate();
        fetchTransactionsByCategoryAndDate()
    }, [startDate, endDate]);

    return (

        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate} // Pass the setter function for startDate
                    onEndDateChange={setEndDate} // Pass the setter function for endDate
                />
                <div className="p-2">
                    <div className="">
                        <div className="grid gap-2 lg:gap-4 md:grid-cols-5 p-2 pt-1">
                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Income</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        $192.1k
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>32k increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Expenses</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        $192.1k
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>32k increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Balance</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        $192.1k
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>32k increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Transactions</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        1340
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">

                                        <span>3% decrease</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                                        <span>New orders</span>
                                    </div>

                                    <div className="text-3xl dark:text-gray-100">
                                        3543
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                                        <span>7% increase</span>

                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="relative max-w-full flex flex-row">
                            <div className="relative p-2 rounded-2xl bg-white shadow dark:bg-gray-800 w-3/5 m-2">

                                <BarChart width={800} height={450} data={selectectedTransactionsByCategoryAndDate} />


                            </div>
                            <div className="relative p-4 rounded-2xl bg-white shadow dark:bg-gray-800 w-2/5 m-2">
                                <div className="flex-col">
                                    <div>Total Expenses</div>
                                    <div className="flex flex-row pt-2">
                                        <div className="bg-red-100 flex-1 flex items-center justify-center">
                                            <RingChart categoryExpenseData={selectectedTransactionsByCategoryAndDate} width={400} height={400} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-row">
                                                <div className="w-2">
                                                    <ul className="list-disc pl-6">
                                                        <div className="h-8"><li className="marker:text-blue-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-green-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-yellow-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-purple-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-red-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-orange-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-pink-500 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-blue-800 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-yellow-800 marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-blue-200 marker:text-5xl"></li></div>
                                                    </ul>
                                                </div>
                                                <div>
                                                    {/* <div className="h-8 pl-1 pt-3">House / Rent</div>
                                                        <div className="h-8 pl-1 pt-3">Food</div>
                                                        <div className="h-8 pl-1 pt-3">Utilities</div>
                                                        <div className="h-8 pl-1 pt-3">Bills</div>
                                                        <div className="h-8 pl-1 pt-3">Shopping</div>
                                                        <div className="h-8 pl-1 pt-3">Transportation</div>
                                                        <div className="h-8 pl-1 pt-3">Insurance</div>
                                                        <div className="h-8 pl-1 pt-3">Health Care</div>
                                                        <div className="h-8 pl-1 pt-3">Clothing</div>
                                                        <div className="h-8 pl-1 pt-3">Others</div> */}
                                                    <ul className="list-disc w-32">
                                                        {selectectedTransactionsByCategoryAndDate.map((transaction: any, index: number) => (
                                                            <div className="h-8 pl-1 pt-3">{transaction.name}</div>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul className="list-disc w-24">
                                                        {/* <div className="h-8 pl-1 pt-3"> $ 7521</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 18345</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 4079</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 2190</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 5643</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 12367</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 3452</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 4987</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 6578</div>
                                                        <div className="h-8 pl-1 pt-3"> $ 2994</div> */}
                                                        {selectectedTransactionsByCategoryAndDate.map((transaction: any, index: number) => (
                                                            <div className="h-8 pl-1 pt-3">₱ {transaction.value}</div>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {/* <div className="w-48 border-1">
                                                    <div className="h-8 pl-1 pt-3">25%</div>
                                                    <div className="h-8 pl-1 pt-3">15%</div>
                                                    <div className="h-8 pl-1 pt-3">10%</div>
                                                    <div className="h-8 pl-1 pt-3">20%</div>
                                                    <div className="h-8 pl-1 pt-3">8%</div>
                                                    <div className="h-8 pl-1 pt-3">12%</div>
                                                    <div className="h-8 pl-1 pt-3">5%</div>
                                                    <div className="h-8 pl-1 pt-3">3%</div>
                                                    <div className="h-8 pl-1 pt-3">1%</div>
                                                    <div className="h-8 pl-1 pt-3">1%</div>
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-row relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 max-w mx-2 mt-4">
                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 w-1/2 mx-8 mt-4">
                                <div className="flex-col">
                                    <div>Total Expenses</div>
                                    <div>Jun 1 - Nov 30</div>
                                    <div className="flex flex-row pt-6">
                                        <div className="flex-1 flex">
                                            <ConnectedScatterplot data={connectedScatterplotData} width={650} height={400} />,
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 w-1/2 mx-8 mt-4">
                                <div className="flex-col">
                                    <div>Total Expenses</div>
                                    <div>Jun 1 - Nov 30</div>
                                    <div className="flex flex-row pt-6">
                                        <div className="flex-1 flex">
                                            {/* <VerticalGroupedBarplotChart data={verticalGroupedBarplotData} width={650} height={400} />, */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 mx-2 mt-4">

                            <div className="flex-col w-full border-x border-t">
                                <div className="flex flex-row w-full border-b items-center">

                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Date</span>
                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Category</span>
                                    <span className="w-2/5 text-lg font-bold border-r ml-2 py-1">Description</span>
                                    <span className="w-1/5 text-lg font-bold ml-2 py-1">Amount</span>
                                </div>
                                {transactions.slice(0, 5).map((transaction, index) => (
                                    <TransactionRow
                                        key={transaction.transactionId}
                                        date={transaction.dateTimePosted}
                                        description={transaction.transactionDescription}
                                        category={transaction.expenseCategory}
                                        amount={transaction.transactionAmount}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div >

    );
}
