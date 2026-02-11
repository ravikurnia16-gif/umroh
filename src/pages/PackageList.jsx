import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { packages } from '../data/packages';
import { travels } from '../data/travels';
import PackageCard from '../components/PackageCard';
import ScrollReveal from '../components/ScrollReveal';
import CompareModal from '../components/CompareModal';
import { FiFilter, FiSearch, FiChevronDown, FiBarChart2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const PackageList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // States
    const [priceRange, setPriceRange] = useState(queryParams.get('maxPrice') || 50000000);
    const [selectedDuration, setSelectedDuration] = useState('All');
    const [selectedTravels, setSelectedTravels] = useState([]);
    const [sortBy, setSortBy] = useState('recommended');
    const [searchQuery, setSearchQuery] = useState(queryParams.get('q') || '');
    const [selectedForCompare, setSelectedForCompare] = useState([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // Filter Logic
    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            const matchPrice = pkg.price <= priceRange;
            const matchTravel = selectedTravels.length === 0 || selectedTravels.includes(pkg.travel.id);
            const matchSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pkg.travel.name.toLowerCase().includes(searchQuery.toLowerCase());

            let matchDuration = true;
            if (selectedDuration === '<9') matchDuration = pkg.duration < 9;
            else if (selectedDuration === '9-12') matchDuration = pkg.duration >= 9 && pkg.duration <= 12;
            else if (selectedDuration === '>12') matchDuration = pkg.duration > 12;

            return matchPrice && matchTravel && matchDuration && matchSearch;
        }).sort((a, b) => {
            if (sortBy === 'lowest') return a.price - b.price;
            if (sortBy === 'highest') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0; // recommended
        });
    }, [priceRange, selectedDuration, selectedTravels, sortBy, searchQuery]);

    const toggleTravelFilter = (id) => {
        setSelectedTravels(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleCompareToggle = (pkg) => {
        setSelectedForCompare(prev => {
            if (prev.find(p => p.id === pkg.id)) {
                return prev.filter(p => p.id !== pkg.id);
            }
            if (prev.length >= 3) {
                alert("Maksimal 3 paket untuk dibandingan");
                return prev;
            }
            return [...prev, pkg];
        });
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                                <FiFilter className="text-emerald-600" /> Filter Pencarian
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold mb-3">Budget Maksimal</label>
                                <input
                                    type="range"
                                    min="20000000"
                                    max="60000000"
                                    step="500000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="mt-2 text-emerald-600 font-bold">
                                    Rp {parseInt(priceRange).toLocaleString('id-ID')}
                                </div>
                            </div>

                            {/* Duration Filter */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold mb-3">Durasi Perjalanan</label>
                                <div className="flex flex-wrap gap-2">
                                    {['All', '<9', '9-12', '>12'].map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setSelectedDuration(d)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedDuration === d ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                                        >
                                            {d === 'All' ? 'Semua' : `${d === '<9' ? '< 9' : d} Hari`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Filter */}
                            <div>
                                <label className="block text-sm font-semibold mb-3">Travel Agent</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {travels.map(travel => (
                                        <label key={travel.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                checked={selectedTravels.includes(travel.id)}
                                                onChange={() => toggleTravelFilter(travel.id)}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 transition-colors">
                                                {travel.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header Controls */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="relative flex-1 max-w-md">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari paket atau travel..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-500 whitespace-nowrap">{filteredPackages.length} Paket ditemukan</span>
                                <select
                                    className="bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-2 text-sm font-semibold border-none focus:ring-2 focus:ring-emerald-500"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Rekomendasi</option>
                                    <option value="lowest">Harga Terendah</option>
                                    <option value="highest">Harga Tertinggi</option>
                                    <option value="rating">Rating Terbaik</option>
                                </select>
                            </div>
                        </div>

                        {/* Packages Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                            {filteredPackages.length > 0 ? (
                                filteredPackages.map((pkg, index) => (
                                    <ScrollReveal key={pkg.id} delay={index * 0.05}>
                                        <div className="relative h-full">
                                            <PackageCard packageData={pkg} />
                                            <div className="absolute top-3 left-3 z-10">
                                                <label className={`flex items-center gap-2 cursor-pointer backdrop-blur-sm px-2 py-1.5 rounded-lg text-[10px] font-bold shadow-sm hover:scale-105 transition-all border ${selectedForCompare.find(p => p.id === pkg.id) ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-white/90 dark:bg-slate-800/90 border-slate-100 dark:border-slate-700'}`}>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={!!selectedForCompare.find(p => p.id === pkg.id)}
                                                        onChange={() => handleCompareToggle(pkg)}
                                                    />
                                                    {selectedForCompare.find(p => p.id === pkg.id) ? <FiCheck /> : <FiBarChart2 />}
                                                    {selectedForCompare.find(p => p.id === pkg.id) ? 'Terpilih' : 'Bandingkan'}
                                                </label>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <FiSearch className="text-6xl text-slate-200 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Paket tidak ditemukan</h3>
                                    <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian Anda</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Compare Floating Button */}
            {selectedForCompare.length > 0 && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
                >
                    <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6">
                        <div className="flex items-center gap-2 border-r border-emerald-500/50 pr-6">
                            <FiBarChart2 className="text-xl" />
                            <span className="font-bold">{selectedForCompare.length} Paket Terpilih</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedForCompare([])}
                                className="text-emerald-100 hover:text-white transition-colors text-sm font-semibold"
                            >
                                Reset
                            </button>
                            <button
                                disabled={selectedForCompare.length < 2}
                                onClick={() => setIsCompareOpen(true)}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${selectedForCompare.length >= 2 ? 'bg-white text-emerald-600 hover:shadow-lg scale-105' : 'bg-emerald-500/50 text-emerald-200 cursor-not-allowed'}`}
                            >
                                Bandingkan Sekarang
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Compare Modal */}
            <CompareModal
                isOpen={isCompareOpen}
                onClose={() => setIsCompareOpen(false)}
                selectedPackages={selectedForCompare}
            />
        </div>
    );
};

export default PackageList;
