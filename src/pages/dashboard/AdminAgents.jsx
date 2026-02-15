import React, { useState, useEffect } from 'react';
import { FiUsers, FiCheckCircle, FiXCircle, FiMoreVertical, FiSearch, FiExternalLink } from 'react-icons/fi';

const AdminAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
        </div>
    );
};

export default AdminAgents;
