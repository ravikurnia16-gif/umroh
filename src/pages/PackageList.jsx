import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import ScrollReveal from '../components/ScrollReveal';
import { packages } from '../data/packages';
import { travels } from '../data/travels';
import { FiFilter, FiChevronDown, FiSearch } from 'react-icons/fi';

const PackageList = () => {
    const location = useLocation();
    const [filteredPackages, setFilteredPackages] = useState(packages);
    const [sortBy, setSortBy] = useState('recommended');

    // Filters state
    const [priceRange, setPriceRange] = useState(50000000);
    const [selectedTravels, setSelectedTravels] = useState([]);
    const [durationFilter, setDurationFilter] = useState('all');

    useEffect(() => {
        // Apply filters
        let result = packages.filter(pkg => {
            // Price filter
            if (pkg.price > priceRange) return false;

            // Travel filter
            if (selectedTravels.length > 0 && !selectedTravels.includes(pkg.travel.id)) return false;

            // Duration filter
            if (durationFilter !== 'all') {
                if (durationFilter === '<9' && pkg.duration >= 9) return false;
                if (durationFilter === '9-12' && (pkg.duration < 9 || pkg.duration > 12)) return false;
                if (durationFilter === '>12' && pkg.duration <= 12) return false;
            }

            return true;
        });

        // Apply sorting
        if (sortBy === 'lowest') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highest') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredPackages(result);
    }, [priceRange, selectedTravels, durationFilter, sortBy]);

    const toggleTravel = (id) => {
        if (selectedTravels.includes(id)) {
            setSelectedTravels(selectedTravels.filter(t => t !== id));
        } else {
            setSelectedTravels([...selectedTravels, id]);
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-2">Paket Umroh Tersedia</h1>
                        <p className="text-slate-500">Menampilkan {filteredPackages.length} paket perjalanan ibadah terbaik</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-500">Urutkan:</span>
                        <select
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="recommended">Rekomendasi</option>
                            <option value="lowest">Harga Terendah</option>
                            <option value="highest">Harga Tertinggi</option>
                            <option value="rating">Rating Tertinggi</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                                <FiFilter className="text-emerald-600" />
                                <h3 className="font-bold text-lg">Filter</h3>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <h4 className="font-bold text-sm mb-4">Budget Maksimal</h4>
                                <input
                                    type="range"
                                    min="20000000"
                                    max="50000000"
                                    step="500000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="mt-2 text-emerald-600 font-bold text-sm">
                                    Rp {priceRange.toLocaleString('id-ID')}
                                </div>
                            </div>

                            {/* Duration Filter */}
                            <div className="mb-8">
                                <h4 className="font-bold text-sm mb-4">Durasi Perjalanan</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="duration"
                                            checked={durationFilter === 'all'}
                                            onChange={() => setDurationFilter('all')}
                                            className="accent-emerald-600"
                                        />
                                        <span className="text-sm">Semua Durasi</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="duration"
                                            checked={durationFilter === '<9'}
                                            onChange={() => setDurationFilter('<9')}
                                            className="accent-emerald-600"
                                        />
                                        <span className="text-sm">Kurang dari 9 Hari</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="duration"
                                            checked={durationFilter === '9-12'}
                                            onChange={() => setDurationFilter('9-12')}
                                            className="accent-emerald-600"
                                        />
                                        <span className="text-sm">9 - 12 Hari</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="duration"
                                            checked={durationFilter === '>12'}
                                            onChange={() => setDurationFilter('>12')}
                                            className="accent-emerald-600"
                                        />
                                        <span className="text-sm">Lebih dari 12 Hari</span>
                                    </label>
                                </div>
                            </div>

                            {/* Travel Filter */}
                            <div>
                                <h4 className="font-bold text-sm mb-4">Travel Agent</h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {travels.map(travel => (
                                        <label key={travel.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedTravels.includes(travel.id)}
                                                onChange={() => toggleTravel(travel.id)}
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-sm group-hover:text-emerald-600 transition-colors">{travel.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Package Grid */}
                    <div className="lg:col-span-3">
                        {filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPackages.map((pkg, index) => (
                                    <ScrollReveal key={pkg.id} delay={index * 0.05} width="100%">
                                        <PackageCard packageData={pkg} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl">
                                <FiSearch className="text-6xl text-slate-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Tidak ada paket ditemukan</h3>
                                <p className="text-slate-500">Coba atur ulang filter pencarian Anda.</p>
                                <button
                                    onClick={() => {
                                        setPriceRange(50000000);
                                        setDurationFilter('all');
                                        setSelectedTravels([]);
                                    }}
                                    className="mt-6 btn btn-secondary text-sm"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageList;
