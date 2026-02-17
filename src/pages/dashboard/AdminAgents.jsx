import React, { useState, useEffect } from 'react';
import { FiUsers, FiCheckCircle, FiXCircle, FiMoreVertical, FiSearch, FiExternalLink, FiPlus, FiMapPin, FiMail, FiLock, FiUser, FiPhone, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({
        agencyName: '',
        name: '',
        email: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/travels');
            if (response.ok) {
                const data = await response.json();
                setAgents(data);
            }
        } catch (error) {
            console.error('Error fetching agents:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVerify = async (id, currentStatus) => {
        try {
            const response = await fetch(`/api/travels/${id}/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ verified: !currentStatus })
            });
            if (response.ok) {
                setAgents(agents.map(a => a.id === id ? { ...a, verified: !currentStatus } : a));
            }
        } catch (error) {
            console.error('Error toggling verification:', error);
        }
    };

    const handleCreateAgent = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const response = await fetch('/api/admin/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Biro Perjalanan & Akun Agen berhasil dibuat!');
                setIsModalOpen(false);
                setFormData({ agencyName: '', name: '', email: '', phone: '', location: '' });
                fetchAgents();
            } else {
                const err = await response.json();
                alert(err.message || 'Gagal menambahkan agen');
            }
        } catch (error) {
            console.error('Error creating agent:', error);
            alert('Terjadi kesalahan koneksi');
        } finally {
            setSubmitLoading(false);
        }
    };

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Kelola Agen Travel</h2>
                    <p className="text-slate-500 text-sm">Monitor dan kelola status mitra biro perjalanan.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30"
                >
                    <FiPlus /> Tambah Agen
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 text-sm">Total Agen</p>
                    <h4 className="text-2xl font-bold">{agents.length}</h4>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 text-sm italic">Menunggu Verifikasi</p>
                    <h4 className="text-2xl font-bold text-amber-500">
                        {agents.filter(a => !a.verified).length}
                    </h4>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 text-sm">Agen Verifikasi</p>
                    <h4 className="text-2xl font-bold text-emerald-500">
                        {agents.filter(a => a.verified).length}
                    </h4>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari agen berdasarkan nama..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Agen Travel</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Lokasi</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-center">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-6 py-8 bg-slate-50/50 dark:bg-slate-800/50" />
                                    </tr>
                                ))
                            ) : filteredAgents.length > 0 ? (
                                filteredAgents.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                                                    {agent.logo ? <img src={agent.logo} alt="" className="w-full h-full object-cover" /> : <FiUsers className="text-slate-400" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm flex items-center gap-1">
                                                        {agent.name}
                                                        {agent.verified && <FiCheckCircle className="text-blue-500 text-xs" />}
                                                    </p>
                                                    <p className="text-xs text-slate-500">{agent.totalPackages} Paket Aktif</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{agent.location}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => toggleVerify(agent.id, agent.verified)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${agent.verified
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                    }`}
                                            >
                                                {agent.verified ? 'Verified' : 'Unverified'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/travel/${agent.id}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-primary-500 transition-colors"
                                                    title="Lihat Profil Publik"
                                                >
                                                    <FiExternalLink size={18} />
                                                </a>
                                                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                                                    <FiMoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                                        Tidak ada agen ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Agent Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Tambah Biro Travel Baru</h3>
                                <button onClick={() => setIsModalOpen(false)}><FiX size={20} /></button>
                            </div>

                            <form onSubmit={handleCreateAgent} className="space-y-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-4 border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-500">Informasi Biro Perjalanan</p>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Nama Biro / Agency</label>
                                        <div className="relative">
                                            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" required placeholder="Contoh: Al-Haramain Travel"
                                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                                value={formData.agencyName} onChange={e => setFormData({ ...formData, agencyName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Lokasi (Kota)</label>
                                        <div className="relative">
                                            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" required placeholder="Contoh: Jakarta Selatan"
                                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                                value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-4 border border-slate-100 dark:border-slate-700">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Informasi Pemilik / Admin Agen</p>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Nama Personal</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input type="text" required placeholder="Nama lengkap pengelola"
                                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Nomor WhatsApp</label>
                                            <div className="relative">
                                                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="tel" required placeholder="0812..."
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Email (Opsional)</label>
                                            <div className="relative">
                                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="email" placeholder="email@travel.com"
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold">Batal</button>
                                    <button type="submit" disabled={submitLoading} className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30">
                                        {submitLoading ? 'Memproses...' : 'Daftarkan Agen'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminAgents;
