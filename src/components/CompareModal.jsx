import React from 'react';
import { FiX, FiCheck, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CompareModal = ({ isOpen, onClose, selectedPackages }) => {
    if (!isOpen) return null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white dark:bg-slate-800 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h2 className="text-2xl font-serif font-bold">Bandingkan Paket Umroh</h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="flex-1 overflow-auto p-6">
                        <div className="min-w-[800px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-4 px-4 w-1/4">Fitur</th>
                                        {selectedPackages.map(pkg => (
                                            <th key={pkg.id} className="py-4 px-4 w-1/4 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <img src={pkg.image} alt={pkg.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                                                    <span className="font-bold text-sm line-clamp-2">{pkg.title}</span>
                                                    <span className="text-emerald-600 font-bold">{formatPrice(pkg.price)}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Travel Agent</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center text-sm font-medium">{pkg.travel.name}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Durasi Perjalanan</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center text-sm font-medium">{pkg.duration} Hari</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Rating</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center">
                                                <span className="text-amber-500 font-bold">★ {pkg.rating}</span>
                                                <span className="text-xs text-slate-400 block">({pkg.reviewCount} reviews)</span>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Pesawat</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center text-sm">{pkg.airlines}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Hotel Makkah</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center text-sm">
                                                {pkg.hotel.makkah.name}
                                                <div className="text-amber-500">{'★'.repeat(pkg.hotel.makkah.stars)}</div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Hotel Madinah</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center text-sm">
                                                {pkg.hotel.madinah.name}
                                                <div className="text-amber-500">{'★'.repeat(pkg.hotel.madinah.stars)}</div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-slate-500">Fasilitas</td>
                                        {selectedPackages.map(pkg => (
                                            <td key={pkg.id} className="py-4 px-4 text-center">
                                                <div className="flex flex-wrap justify-center gap-1">
                                                    {pkg.facilities.slice(0, 3).map((f, i) => (
                                                        <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded italic">
                                                            {f}
                                                        </span>
                                                    ))}
                                                    {pkg.facilities.length > 3 && <span className="text-[10px] text-slate-400">+{pkg.facilities.length - 3}</span>}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                        <button onClick={onClose} className="px-6 py-2 rounded-full font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Tutup</button>
                        <button className="btn btn-primary px-8">Pilih Paket Terbaik</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CompareModal;
