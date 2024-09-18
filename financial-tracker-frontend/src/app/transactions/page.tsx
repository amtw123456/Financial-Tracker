
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import TransactionRow from "../components/transactionRow";

export default function Transactions() {

    // useEffect()

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 overflow-y-hidden">
                <Header></Header >
                <div className="flex flex-col h-screen p-2">
                    <div className="flex flex-row w-full h-full bg-green-400">
                        <div className="relative w-4/5 bg-purple-400 py-2 px-4 flex items-center justify-center h-full">
                            <div className="flex flex-col w-full h-full">
                                <div className="flex w-full">
                                    <input
                                        type="text"
                                        id="searchInput"
                                        className="w-4/5 px-4 py-2 mr-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search..."
                                    />
                                    <button
                                        id="searchBtn"
                                        className="w-1/5 px-4 py-2 bg-purple-500 border-purple-500 border-1 text-white hover:bg-purple-600"
                                    >
                                        ADD TRANSACTION
                                    </button>
                                </div>
                                <div className="mt-2  flex-col flex-grow w-full h-full border">
                                    <div className="flex flex-row w-full">
                                        <span className="w-1/5 text-lg font-medium border-r ml-2">Date</span>
                                        <span className="w-2/5 text-lg font-medium border-r ml-2">Description</span>
                                        <span className="w-1/5 text-lg font-medium border-r ml-2">Category</span>
                                        <span className="w-1/5 text-lg font-medium ml-2">Amount</span>
                                    </div>
                                    <TransactionRow
                                        date="2024-09-17"
                                        description="Grocery shopping"
                                        category="Food"
                                        amount={150.00}
                                    />
                                    <TransactionRow
                                        date="2024-09-17"
                                        description="Grocery shopping"
                                        category="Food"
                                        amount={150.00}
                                    />
                                    <TransactionRow
                                        date="2024-09-17"
                                        description="Grocery shopping"
                                        category="Food"
                                        amount={150.00}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col bg-yellow-400 w-1/5 h-full">
                            Sidebar
                        </div>
                    </div>
                </div>



            </div>
        </div >
    );
}
