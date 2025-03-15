import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion'; 

const NotFoundPage = () => {
    console.log('notFound page render');
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-700">
            <div className="text-center">
                <motion.img 
                    src="../src/assets/404.png" 
                    alt="404"
                    className="mx-auto mb-8 max-w-[80%] md:max-w-md mask-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.h1 
                    className="text-white text-6xl font-extrabold mb-4 font-sans"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Oops! Page Not Found
                </motion.h1>
                <motion.p 
                    className="text-white text-lg mb-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </motion.p>
                <motion.div 
                    className="text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link 
                        to="/" 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition duration-300"
                    >
                        Go Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
