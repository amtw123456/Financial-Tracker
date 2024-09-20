"use client"

import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import TransactionRow from "../components/transactionRow";
import TransactionModal from "./addTransactionModal";
import Pagination from "./pagination";




export default function Transactions() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleOpenChange = () => setIsOpen(!isOpen);

    const [transactions, setTransactions] = useState([
        {
            date: "2024-09-17",
            description: "Grocery shopping",
            category: "Food",
            amount: 150.00,
        },
        {
            date: "2024-09-17",
            description: "Electricity bill",
            category: "Utilities",
            amount: 100.00,
        },
        {
            date: "2024-09-17",
            description: "Gym membership",
            category: "Others",
            amount: 50.00,
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
        setCurrentPage(page);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-hidden">
                <Header></Header >
                <div className="flex flex-col h-screen p-2">
                    <div className="flex flex-row w-full h-full bg-white rounded-2xl shadow">
                        <div className="relative w-4/5 py-2 px-4 flex items-center justify-center h-full">
                            <div className="flex flex-col w-full h-full">
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

                                <div className="flex flex-col flex-grow w-full border rounded-xl mt-2">
                                    <div className="flex flex-row w-full border-b items-center">
                                        <span className="w-1/5 text-lg font-medium border-r ml-2 py-1">Date</span>
                                        <span className="w-1/5 text-lg font-medium border-r ml-2 py-1">Category</span>
                                        <span className="w-2/5 text-lg font-medium border-r ml-2 py-1">Description</span>
                                        <span className="w-1/5 text-lg font-medium ml-2 py-1">Amount</span>
                                    </div>

                                    {/* Render TransactionRow for each transaction in the state */}
                                    <div className="flex-grow overflow-y-auto"> {/* This will fill the space */}
                                        {transactions.map((transaction, index) => (
                                            <TransactionRow
                                                key={index}
                                                date={transaction.date}
                                                description={transaction.description}
                                                category={transaction.category}
                                                amount={transaction.amount}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination Component */}

                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-1/5 h-full py-2 px-4">
                            <div className="border w-full h-full"> Sidebar</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
