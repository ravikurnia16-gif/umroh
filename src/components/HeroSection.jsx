import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        destination: '',
        month: '',
        budget: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/packages', { state: searchParams });
    };

    return (
        <div className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1920&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Wujudkan Ibadah Umroh Impian
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-emerald-50 mb-8 max-w-2xl mx-auto drop-shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Temukan paket Umroh terbaik dari agent travel terpercaya se-Indonesia dengan harga transparan.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl max-w-4xl mx-auto text-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 px-2 py-2">
                            <FiMapPin className="text-emerald-500 text-xl" />
                            <div className="text-left w-full">
                                <label className="block text-xs text-slate-500 font-medium">Tujuan</label>
                                <select
                                    className="w-full bg-transparent font-medium focus:outline-none cursor-pointer"
                                    value={searchParams.destination}
                                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                >
                                    <option value="">Semua Tujuan</option>
                                    <option value="umroh">Umroh Reguler</option>
                                    <option value="plus-turki">Umroh + Turki</option>
                                    <option value="plus-dubai">Umroh + Dubai</option>
                                    <option value="plus-aqsa">Umroh + Aqsa</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 px-2 py-2">
                            <FiCalendar className="text-emerald-500 text-xl" />
                            <div className="text-left w-full">
                                <label className="block text-xs text-slate-500 font-medium">Keberangkatan</label>
                                <select
                                    className="w-full bg-transparent font-medium focus:outline-none cursor-pointer"
                                    value={searchParams.month}
                                    onChange={(e) => setSearchParams({ ...searchParams, month: e.target.value })}
                                >
                                    <option value="">Semua Bulan</option>
                                    <option value="jan">Januari 2024</option>
                                    <option value="feb">Februari 2024</option>
                                    <option value="mar">Maret 2024 (Ramadhan)</option>
                                    <option value="apr">April 2024</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 py-2">
                            <span className="text-emerald-500 font-bold text-sm">Rp</span>
                            <div className="text-left w-full">
                                <label className="block text-xs text-slate-500 font-medium">Budget Maksimal</label>
                                <select
                                    className="w-full bg-transparent font-medium focus:outline-none cursor-pointer"
                                    value={searchParams.budget}
                                    onChange={(e) => setSearchParams({ ...searchParams, budget: e.target.value })}
                                >
                                    <option value="">Semua Budget</option>
                                    <option value="25">Di bawah 25 Juta</option>
                                    <option value="30">25 - 30 Juta</option>
                                    <option value="35">30 - 35 Juta</option>
                                    <option value="40">Di atas 35 Juta</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-3 md:py-0 transition-colors flex items-center justify-center gap-2">
                            <FiSearch /> Cari Paket
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
