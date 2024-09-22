import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

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
import axios from 'axios';

interface TransactionModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onOpen: () => void;
}

const iconMap: { [key: string]: JSX.Element } = {
    House: <FaHouse className="text-gray-600" />,
    Utilities: <FaHandHoldingWater className="text-gray-600" />,
    Bills: <FaMoneyBills className="text-gray-600" />,
    Clothes: <GiClothes className="text-gray-600" />,
    Transportation: <FaCarSide className="text-gray-600" />,
    Healthcare: <MdHealthAndSafety className="text-gray-600" />,
    Food: <IoFastFood className="text-gray-600" />,
    Shopping: <MdShoppingCart className="text-gray-600" />,
    Others: <HiDotsCircleHorizontal className="text-gray-600" />,
    Insurance: <FaShieldAlt className="text-gray-600" />,
};

const categories = Object.keys(iconMap);


const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onOpenChange, onOpen }) => {




    const createTransaction = async (transactionData: any) => {
        console.log(transactionData)
        try {
            const response = await axios.post('/api/transactions/create', {
                "transactionAmount": transactionData.amount,
                "dateTimePosted": transactionData.date,
                "expenseCategory": transactionData.category,
                "transactionType": transactionData.type,
                "transactionDescription": transactionData.description,
            });

            const result = await response;

            // if (response.ok) {
            //     console.log('Transaction created successfully:', result.data);
            // } else {
            //     console.error('Failed to create transaction:', result.message);
            // }
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    }

    const [formData, setFormData] = useState({
        date: "",
        transactionType: "",
        category: "",
        amount: "",
        description: ""
    });

    // Handle changes for all inputs
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const isFormIncomplete = !formData.amount || !formData.date || !formData.category || !formData.transactionType || !formData.description;

    return (
        <>
            <Button
                className="w-1/5 px-4 py-2 bg-purple-500 border-purple-500 rounded-xl border-1 text-white hover:bg-purple-600"
                onClick={onOpen}
            >
                ADD TRANSACTION
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size={'xl'}
            >
                <ModalContent>
                    {(onClose: any) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Transaction</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full items-start">
                                    <div className="flex flex-row w-full items-center mb-2 justify-between">
                                        <div className="flex flex-col w-2/4">
                                            <label className="mb-1">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className="border p-2"
                                                placeholder="Date"
                                            />
                                        </div>
                                        <div className="flex flex-col w-2/4 ml-2">
                                            <label className="mb-1">Transaction Type</label>
                                            <select
                                                name="transactionType"
                                                value={formData.transactionType}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 p-2"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Expense">Expense</option>
                                                <option value="Income">Income</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full items-center justify-between mb-2">
                                        <div className="flex flex-col w-2/4">
                                            <label className="mb-1">Another Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 p-2"
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col w-2/4 ml-2">
                                            <label className="mb-1">Amount</label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleInputChange}
                                                className="border p-2"
                                                placeholder="Amount"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full items-center mb-2 justify-center">
                                        <div className="flex flex-col w-full">
                                            <label className="mb-1">Description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg p-3 w-full"
                                                placeholder="Description"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button
                                    onClick={() => createTransaction(formData)}
                                    disabled={isFormIncomplete}
                                    className={`p-2 rounded ${isFormIncomplete
                                        ? 'bg-gray-400 text-white cursor-not-allowed' // Disabled state styles
                                        : 'bg-blue-500 text-white hover:bg-blue-700'  // Enabled state styles
                                        }`}
                                >
                                    Submit
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TransactionModal;
