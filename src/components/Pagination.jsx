import React,{memo} from 'react'
import { motion } from 'framer-motion';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {    

    return (
        <div className="flex justify-end mt-4">
            <motion.button
                className={`text-white px-2 py-1 rounded-l-full transition-colors duration-300 
                            ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#15283c] hover:bg-[#1a3a52]'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                name='prev'
            >
                Prev
            </motion.button>

            <span className="mx-2 self-center text-md text-gray-700">
                Page {currentPage} of {totalPages}
            </span>

            <motion.button
                className={`text-white px-2 py-1 rounded-r-full transition-colors duration-300 
                            ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#15283c] hover:bg-[#1a3a52]'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                name='next'
            >
                Next
            </motion.button>
        </div>
    );
}

export default memo(Pagination);
