import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface TransactionModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onOpen: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onOpenChange, onOpen }) => {

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
            >
                <ModalContent>
                    {(onClose: any) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Transaction</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full border-b items-start">
                                    <div className="flex flex-row w-full items-center mb-2">
                                        <input
                                            type="date"
                                            className="border p-2 ml-2"
                                            placeholder="Date"
                                        />
                                    </div>
                                    <div className="flex flex-row w-full items-center mb-2">
                                        <input
                                            type="text"
                                            className="border p-2 ml-2"
                                            placeholder="Category"
                                        />
                                    </div>
                                    <div className="flex flex-row w-full items-center mb-2">
                                        <input
                                            type="text"
                                            className="border p-2 ml-2"
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="flex flex-row w-full items-center mb-2">
                                        <input
                                            type="number"
                                            className="border p-2 ml-2"
                                            placeholder="Amount"
                                        />
                                    </div>
                                </div>

                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={onClose}>
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
