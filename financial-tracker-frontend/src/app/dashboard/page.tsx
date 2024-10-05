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
import { DoubleBarChart } from "./DoubleBarChart"

import TrackIt from "../../components/TrackIt.png"

interface Transaction {
    transactionId: number,
    dateTimePosted: string; // or Date, depending on how you handle dates
    transactionAmount: number;
    expenseCategory: string;
    transactionType: string;
    transactionDescription: string;
    // Add any other properties that are relevant
}

export default function Dashboard() {

    const [startDate, setStartDate] = useState<DateValue>(now(getLocalTimeZone()).subtract({ weeks: 4 }) as DateValue);
    const [endDate, setEndDate] = useState<DateValue>(now(getLocalTimeZone()) as DateValue);

    const [incomeValue, setIncomeValue] = useState<number>(0);
    const [expenseValue, setExpenseValue] = useState<number>(0);
    const [sumOfValues, setSumOfValues] = useState<number>(0);

    const [selectedTransactionIds, setSelectedTransactionIds] = useState<number[]>([]);
    const [selectedTransactionsByCategoryAndDate, setSelectedTransactionsByCategoryAndDate] = useState<any>([]);
    const [selectedTransactionsByDate, setSelectedTransactionsByDate] = useState<any>([]);
    const [selectedTransactionsSumLastSixMonths, setSelectedTransactionsSumLastSixMonths] = useState<any>([]);
    const [selectedTransactionsSumLast14Days, setSelectedTransactionsSumLast14Days] = useState<any>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // const [ringTransactionsData, setRingTransactionsData] = 

    const getUserTransaction = async () => {
        try {
            const response = await axios.get('/api/transactions/readAll');
            // console.log('User transactions:', response.data.listOfUserTransactions);
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
            return response.data.transactions; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const getUserTransactionByCategoryAndDate = async (startDate: DateValue, endDate: DateValue) => {
        try {
            const response = await axios.post('/api/transactions/readByCategoryAndDate', { startDate, endDate });
            return response.data.transactions; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const getUserTransactionByLastSixMonths = async () => {
        try {
            const response = await axios.get('/api/transactions/readTransactionsLastSixMonths');
            return response.data.transactionsSummary; // Ensure you're returning the correct data structure
        } catch (error) {
            // console.error('Error fetching transactions:', error);
            // throw error; 
        }
    };

    const getUserTransactionByLast14Days = async () => {
        try {
            const response = await axios.get('/api/transactions/readTransactionsLast14Days');
            return response.data.transactionsSummary; // Ensure you're returning the correct data structure
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
                setSelectedTransactionsByDate(transactions)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        const fetchTransactionsByCategoryAndDate = async () => {
            try {
                const transactions = await getUserTransactionByCategoryAndDate(startDate, endDate);
                // Handle the transactions as needed

                setSelectedTransactionsByCategoryAndDate(transactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        const fetchTransactionsByLastSixMonths = async () => {
            try {
                const transactions = await getUserTransactionByLastSixMonths();
                // Handle the transactions as needed
                setSelectedTransactionsSumLastSixMonths(transactions)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        const fetchTransactionsByLast14Days = async () => {
            try {
                const transactions = await getUserTransactionByLast14Days();
                // Handle the transactions as needed
                setSelectedTransactionsSumLast14Days(transactions)
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };



        fetchTransactionsByDate();
        fetchTransactionsByCategoryAndDate()
        fetchTransactionsByLastSixMonths()
        fetchTransactionsByLast14Days()
    }, [startDate, endDate]);

    const [categories, setCategories] = useState([
        { name: "Utilities", value: 0 },
        { name: "Food", value: 0 },
        { name: "House", value: 0 },
        { name: "Bills", value: 0 },
        { name: "Shopping", value: 0 },
        { name: "Transportation", value: 0 },
        { name: "Insurance", value: 0 },
        { name: "Healthcare", value: 0 },
        { name: "Clothes", value: 0 },
        { name: "Others", value: 0 },
    ]);

    useEffect(() => {
        var categories = [
            { name: "Utilities", value: 0 },
            { name: "Food", value: 0 },
            { name: "House", value: 0 },
            { name: "Bills", value: 0 },
            { name: "Shopping", value: 0 },
            { name: "Transportation", value: 0 },
            { name: "Insurance", value: 0 },
            { name: "Healthcare", value: 0 },
            { name: "Clothes", value: 0 },
            { name: "Others", value: 0 },
        ];

        var income = 0
        var expense = 0

        const updatedCategories = categories.map(category => {
            // Find the matching transaction for the category
            const transaction = selectedTransactionsByCategoryAndDate.find((t: any) => t.name === category.name);
            // Update the value if a transaction exists
            return {
                ...category,
                value: transaction ? transaction.value : 0 // Default to 0 if no transaction found
            };
        });

        const sum = updatedCategories
            .map(category => category.value) // Extract values
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Sum them


        selectedTransactionsByDate.map((transaction: any) => {
            if (transaction.transactionType === "Expense") {
                expense += transaction.transactionAmount;
            } else if (transaction.transactionType === "Income") {
                income += transaction.transactionAmount;
            }
        });

        setIncomeValue(income)
        setExpenseValue(expense)
        setCategories(updatedCategories);
        setSumOfValues(sum)

    }, [selectedTransactionsByCategoryAndDate]);


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
                        <div className="grid gap-2 lg:gap-4 md:grid-cols-4 p-2 pt-1">
                            <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center text-3xl text-green-500 dark:text-gray-100">
                                        ₱{incomeValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>

                                    <div
                                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Income</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow text-red-500 dark:bg-gray-800">
                                <div className="space-y-2">


                                    <div className="flex items-center justify-center text-3xl dark:text-gray-100">
                                        ₱{expenseValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div
                                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Expenses</span>
                                    </div>

                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow text-blue-500 dark:bg-gray-800">
                                <div className="space-y-2">


                                    <div className="flex items-center justify-center text-3xl dark:text-gray-100">
                                        ₱{(incomeValue - expenseValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div
                                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Balance</span>
                                    </div>

                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-white shadow text-teal-500 dark:bg-gray-800">
                                <div className="space-y-2">


                                    <div className="flex items-center justify-center text-3xl dark:text-gray-100">
                                        {selectedTransactionsByDate.length}
                                    </div>
                                    <div
                                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Transactions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative max-w-full flex flex-row">
                            <div className="relative p-2 rounded-2xl bg-white shadow dark:bg-gray-800 w-2/4 m-2">
                                <BarChart width={800} height={450} data={categories} />
                            </div>
                            <div className="relative p-4 rounded-2xl bg-white shadow dark:bg-gray-800 w-2/4 m-2">
                                <div className="flex-col">
                                    {/* <div>Total Expenses</div> */}
                                    <div className="flex flex-row pt-2">
                                        <div className="flex-1 flex items-center justify-center">
                                            <RingChart categoryExpenseData={categories} width={400} height={400} />
                                        </div>
                                        <div className="flex-1 pt-8">
                                            <div className="flex flex-row">
                                                <div className="w-2">
                                                    <ul className="list-disc pl-10">
                                                        <div className="h-8"><li className="marker:text-customPalette-deepBlue marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-skyBlue marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-turquoise marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-mintGreen marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-limeGreen marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-yellow marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-tangerine marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-coralRed marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-magenta marker:text-5xl"></li></div>
                                                        <div className="h-8"><li className="marker:text-customPalette-violet marker:text-5xl"></li></div>

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
                                                        {categories.map((transaction: any, index: number) => (
                                                            <div key={index} className="h-8 pl-5 pt-3">{transaction.name}</div>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul className="list-disc w-24">
                                                        {categories.map((transaction: any, index: number) => (
                                                            <div key={index} className="h-8 pl-5 pt-3">₱{(transaction.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul className="list-disc w-24">
                                                        {categories.map((transaction: any, index: number) => (
                                                            <div key={index} className="h-8 pl-8 pt-3">
                                                                {((transaction.value / sumOfValues) * 100).toFixed(2)}%
                                                            </div>
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

                            <div className="flex-col">
                                <div>Total Expenses</div>
                                <div className="text-gray-400 text-sm pl-1">Last 14 Days</div>
                                <div className="flex flex-row pt-6">
                                    <div className="flex-1 flex">
                                        <ConnectedScatterplot data={selectedTransactionsSumLast14Days} width={775} height={400} />
                                    </div>

                                </div>
                            </div>


                            <div className="flex-col">
                                <div>Total Expenses/Income</div>
                                <div className="text-gray-400 text-sm pl-1">Last 6 Months</div>
                                <div className="flex flex-row pt-6">
                                    <div className="flex-1 flex">
                                        {/* <VerticalGroupedBarplotChart data={verticalGroupedBarplotData} width={650} height={400} />, */}
                                        <DoubleBarChart
                                            width={775}
                                            height={400}
                                            data={selectedTransactionsSumLastSixMonths}
                                        />
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
                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Type</span>
                                    <span className="w-1/5 text-lg font-bold ml-2 py-1">Amount</span>
                                </div>
                                {transactions.slice(0, 5).map((transaction, index) => (
                                    <TransactionRow
                                        key={transaction.transactionId}
                                        date={transaction.dateTimePosted}
                                        description={transaction.transactionDescription}
                                        category={transaction.expenseCategory}
                                        type={transaction.transactionType}
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
