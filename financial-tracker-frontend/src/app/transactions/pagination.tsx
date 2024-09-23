import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon
import { FaArrowRight } from 'react-icons/fa'; // Import the left arrow icon

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center pt-3 border-b border-x rounded-b-xl">
            <button
                className="mx-2 p-2 flex items-center"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <FaArrowLeft className="mr-2" /> {/* Add the icon here */}
                Previous
            </button>

            <span className="mx-2">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="mx-2 p-2 flex items-center mr-2"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <FaArrowRight className="ml-2" /> {/* Add the icon here */}
            </button>
        </div>
    );
};

export default Pagination;
