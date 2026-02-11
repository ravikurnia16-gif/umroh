import React, { useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        className="mb-4 bg-white dark:bg-slate-800 w-80 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <FiMessageCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Customer Support</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                        <span className="text-[10px] text-emerald-100">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                                <FiX />
                            </button>
                        </div>

                        {/* Chat Content */}
                        <div className="h-64 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm mb-4 max-w-[85%] border border-slate-100 dark:border-slate-700">
                                Halo! Ada yang bisa kami bantu mengenai rencana ibadah Umroh Anda?
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl">
                                <input
                                    type="text"
                                    placeholder="Ketik pesan..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
                                />
                                <button className="text-emerald-600 p-1 hover:scale-110 transition-transform">
                                    <FiSend />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative group"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <FiX size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>
                            <FiMessageCircle size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isOpen && (
                    <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Tanya CS Kami
                    </span>
                )}
            </button>
        </div>
    );
};

export default LiveChat;
