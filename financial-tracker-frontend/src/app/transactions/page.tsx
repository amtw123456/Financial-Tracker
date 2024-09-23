"use client"

import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import TransactionRow from "../components/transactionRow";
import TransactionModal from "./addTransactionModal";
import Pagination from "./pagination";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Transaction {
    dateTimePosted: string; // or Date, depending on how you handle dates
    transactionAmount: number;
    expenseCategory: string;
    transactionDescription: string;
    // Add any other properties that are relevant
}

export default function Transactions() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleOpenChange = () => setIsOpen(!isOpen);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of items to display per page

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const [checkedTransactions, setCheckedTransactions] = useState(
        transactions.map(() => false) // Start with all unchecked
    );

    // Function to toggle the checked state
    const toggleCheck = (index: any) => {
        setCheckedTransactions((prev) =>
            prev.map((checked, i) => (i === index ? !checked : checked))
        );
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

    // Function to handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setTransactions(await getUserTransaction())
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
        console.log(transactions)
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-hidden">
                <Header></Header >
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
                                        <button className="p-2 bg-purple-500 text-white rounded flex items-center hover:bg-purple-700">
                                            <FaEdit />
                                            <span className="ml-1">Edit</span>
                                        </button>
                                        <button className="p-2 bg-red-500 text-white rounded flex items-center hover:bg-red-700">
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
                                    <span className="w-1/5 text-lg font-bold ml-2 py-1">Amount</span>
                                </div>

                                <div className="flex flex-col w-full border-x overflow-y-auto">
                                    {/* Render TransactionRow for each transaction in the state */}
                                    <div className="flex-grow overflow-y-auto"> {/* This will fill the space */}
                                        {transactions.slice((currentPage - 1) * 15, currentPage * 15).map((transaction, index) => (
                                            <TransactionRow
                                                key={index}
                                                date={transaction.dateTimePosted}
                                                description={transaction.transactionDescription}
                                                category={transaction.expenseCategory}
                                                amount={transaction.transactionAmount}
                                                isCheck={checkedTransactions[index]} // Pass the current check state
                                                onCheckToggle={() => toggleCheck(index)} // Pass the toggle function
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
                    <div className="flex flex-col w-1/5 h-full py-2 px-4">
                        <div className="border w-full h-full rounded-xl"> Sidebar</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

