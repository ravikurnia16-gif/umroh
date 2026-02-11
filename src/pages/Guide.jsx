import React, { useState } from 'react';
import { faqs } from '../data/faq';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Guide = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
            <div className="container max-w-3xl">
                <h1 className="text-3xl font-serif font-bold mb-4 text-center">Panduan & FAQ Umroh</h1>
                <p className="text-slate-500 text-center mb-12">Temukan jawaban atas pertanyaan umum seputar ibadah Umroh.</p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                            >
                                <span className="font-bold">{faq.question}</span>
                                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                            {openIndex === index && (
                                <div className="p-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Guide;
