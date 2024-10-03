"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import TransactionRow from "../components/transactionRow";
import TransactionModal from "./addTransactionModal";
import Pagination from "./pagination";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

interface Transaction {
    transactionId: number,
    dateTimePosted: string; // or Date, depending on how you handle dates
    transactionAmount: number;
    expenseCategory: string;
    transactionType: string;
    transactionDescription: string;
    // Add any other properties that are relevant
}

export default function Transactions() {

    const [startDate, setStartDate] = useState<DateValue>(now(getLocalTimeZone()).subtract({ weeks: 1 }) as DateValue);
    const [endDate, setEndDate] = useState<DateValue>(now(getLocalTimeZone()) as DateValue);

    const [selectedTransactionIds, setSelectedTransactionIds] = useState<number[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleOpenChange = () => setIsOpen(!isOpen);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Number of items to display per page

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const [checkedTransactions, setCheckedTransactions] = useState(
        transactions.map(() => false) // Start with all unchecked
    );

    // Function to toggle the checked state
    const toggleCheck = (index: any, transactionId: number) => {
        setCheckedTransactions((prev) =>
            prev.map((checked, i) => (i === index ? !checked : checked))
        );

        setSelectedTransactionIds((prevSelected) => {
            if (prevSelected.includes(transactionId)) {
                // If transactionId is already in the list, remove it
                return prevSelected.filter((id) => id !== transactionId);
            } else {
                // Otherwise, add it to the list
                return [...prevSelected, transactionId];
            }
        });

        console.log(selectedTransactionIds)

    };

    const getUserTransaction = async () => {
        try {
            const response = await axios.get('/api/transactions/readAll');
            console.log('User transactions:', response.data.listOfUserTransactions);
            return response.data.listOfUserTransactions

        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    }

    const deleteTransaction = async (transactionIds: number[]) => {
        try {
            const response = await axios.post(`/api/transactions/deleteByIds`, {
                "transactionIds": transactionIds,
            });
            console.log('Transaction deleted:', response.data.message);

            return response.data.message;
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const handleDelete = async (ids: number[]) => {
        const result = await deleteTransaction(ids);
        if (result) {
            console.log('Transaction successfully deleted');
            // Optionally, refresh transaction list or update UI
        }
        fetchTransactions();
    };

    const fetchTransactions = async () => {
        try {
            setTransactions(await getUserTransaction())
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };

    // Function to handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        console.log(selectedTransactionIds)

    }, [selectedTransactionIds]);

    return (

        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-hidden">
                <Header
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate} // Pass the setter function for startDate
                    onEndDateChange={setEndDate} // Pass the setter function for endDate
                />
                <div className="flex flex-row h-screen p-2">
                    <div className="flex flex-row w-full bg-white rounded-2xl shadow">
                        <div className="relative w-full py-2 px-4">
                            <div className="flex flex-col w-full pt-1">
                                <div className="flex w-full">
                                    <input
                                        type="text"
                                        id="searchInput"
                                        className="w-4/5 px-4 py-2 mr-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search..."
                                    />
                                    <TransactionModal
                                        isOpen={isOpen}
                                        onOpen={handleOpen}
                                        onOpenChange={handleOpenChange}
                                    />
                                </div>
                                <div className="flex w-full py-2 px-4 border-t border-x rounded-t-xl mt-4">
                                    <div className="ml-auto flex items-center justify-center space-x-2 pb-1">
                                        <button
                                            className={`p-2 text-white rounded flex items-center ${selectedTransactionIds.length > 1
                                                ? 'bg-gray-400 cursor-not-allowed'  // Gray background and disabled cursor if disabled
                                                : 'bg-purple-500 hover:bg-purple-700' // Purple background when active
                                                }`}
                                        >
                                            <FaEdit />
                                            <span className="ml-1">Edit</span>
                                        </button>
                                        <button className="p-2 bg-red-500 text-white rounded flex items-center hover:bg-red-700" onClick={() => handleDelete(selectedTransactionIds)}
                                        >
                                            <FaTrash />
                                            <span className="ml-1">Delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full border items-center">
                                    <span className="text-lg font-medium border-r ml-2 py-1">
                                        <input type="checkbox" className="mr-2" />
                                    </span>
                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Date</span>
                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Category</span>
                                    <span className="w-2/5 text-lg font-bold border-r ml-2 py-1">Description</span>
                                    <span className="w-1/5 text-lg font-bold border-r ml-2 py-1">Type</span>
                                    <span className="w-1/5 text-lg font-bold ml-2 py-1">Amount</span>
                                </div>

                                <div className="flex flex-col w-full border-x overflow-y-auto">
                                    {/* Render TransactionRow for each transaction in the state */}
                                    <div className="flex-grow overflow-y-auto"> {/* This will fill the space */}
                                        {transactions.slice((currentPage - 1) * 15, currentPage * 15).map((transaction, index) => (
                                            <TransactionRow
                                                key={transaction.transactionId}
                                                date={transaction.dateTimePosted}
                                                description={transaction.transactionDescription}
                                                category={transaction.expenseCategory}
                                                amount={transaction.transactionAmount}
                                                type={transaction.transactionType}
                                                isCheck={checkedTransactions[index]} // Pass the current check state
                                                onCheckToggle={() => toggleCheck(index, transaction.transactionId)} // Pass the toggle function
                                            />
                                        ))}

                                    </div>
                                    {/* Pagination Component */}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col w-1/5 h-full py-2 px-4">
                        <div className="border w-full h-full rounded-xl"> Sidebar</div>
                    </div> */}
                </div>
            </div>
        </div>

    );
}

