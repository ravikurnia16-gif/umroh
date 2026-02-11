import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReviewCard from './ReviewCard';

const TestimonialCarousel = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    return (
        <div className="relative max-w-4xl mx-auto px-12">
            <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ReviewCard review={reviews[currentIndex]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
            >
                <FiChevronLeft />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
            >
                <FiChevronRight />
            </button>

            <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
