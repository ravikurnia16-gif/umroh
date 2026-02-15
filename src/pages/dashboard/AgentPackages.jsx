import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPackage, FiImage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AgentPackages = () => {
    const { user } = useAuth();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);

    // Mock initial data if API fails or for demo
    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/packages?travel_id=${user?.travelId}`);
            if (response.ok) {
                const data = await response.json();
                setPackages(data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) return;

        try {
            const response = await fetch(`/api/packages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setPackages(packages.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Manajemen Paket</h2>
                    <p className="text-slate-500 text-sm">Kelola daftar paket umroh yang Anda tawarkan.</p>
                </div>
                <button
                    onClick={() => { setCurrentPackage(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95"
                >
                    <FiPlus /> Tambah Paket Baru
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari paket berdasarkan nama..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Paket</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Durasi</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Harga (Mulai dari)</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-6 py-8 bg-slate-50/50 dark:bg-slate-800/50" />
                                    </tr>
                                ))
                            ) : filteredPackages.length > 0 ? (
                                filteredPackages.map((pkg) => (
                                    <tr key={pkg.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center text-slate-400">
                                                    <FiPackage size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{pkg.title}</p>
                                                    <p className="text-xs text-slate-500">{pkg.hotelMakkah && `🏨 ${pkg.hotelMakkah}`}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">{pkg.duration} Hari</td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                Rp {(pkg.price / 1000000).toFixed(1)} jt
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                Aktif
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => { setCurrentPackage(pkg); setIsModalOpen(true); }}
                                                className="p-2 text-slate-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                            >
                                                <FiEdit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pkg.id)}
                                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FiPackage size={48} className="opacity-20" />
                                            <p>Belum ada paket yang dibuat.</p>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-primary-500 font-semibold hover:underline"
                                            >
                                                Buat paket pertama Anda
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal placeholder - We will implement form in next step */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl p-8 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-6">{currentPackage ? 'Edit Paket' : 'Tambah Paket Baru'}</h3>
                        <p className="text-slate-500 mb-8 italic text-sm">Modul formulir sedang disiapkan...</p>
                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 text-slate-500 font-semibold"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-8 py-2 bg-primary-600 text-white rounded-xl font-semibold"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentPackages;
