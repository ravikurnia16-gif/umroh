import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiInfo, FiClock, FiAlertCircle } from 'react-icons/fi';

const AdminVerify = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/travels');
            if (response.ok) {
                const data = await response.json();
                // Only show unverified for the verification queue
                setQueue(data.filter(a => !a.verified));
            }
        } catch (error) {
            console.error('Error fetching verification queue:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        if (!window.confirm('Verifikasi agen ini sekarang?')) return;

        try {
            const response = await fetch(`/api/travels/${id}/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ verified: true })
            });
            if (response.ok) {
                setQueue(queue.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error('Error verifying agent:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-200 dark:border-amber-700/30 flex gap-4 items-start">
                <FiInfo className="text-amber-500 text-2xl shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-amber-800 dark:text-amber-400">Antrean Verifikasi Agen</h3>
                    <p className="text-amber-700/80 dark:text-amber-400/70 text-sm">
                        Halaman ini menampilkan agen-agen baru yang memerlukan peninjauan. Klik tombol verifikasi jika data sudah sesuai dengan standar Kemenag.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2].map(i => (
                        <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                    ))
                ) : queue.length > 0 ? (
                    queue.map((agent) => (
                        <div key={agent.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-xl hover:border-primary-500/30">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 overflow-hidden font-bold">
                                        {agent.logo ? <img src={agent.logo} alt="" className="w-full h-full object-cover" /> : agent.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{agent.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <FiClock /> Terdaftar Baru
                                        </div>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    Pending
                                </span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
                                    <span className="text-slate-500">Lokasi</span>
                                    <span className="font-medium">{agent.location}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
                                    <span className="text-slate-500">Total Paket</span>
                                    <span className="font-medium">{agent.totalPackages}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleVerify(agent.id)}
                                    className="flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95"
                                >
                                    <FiCheckCircle size={20} /> Verifikasi Agen
                                </button>
                                <button className="p-3 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-900 rounded-2xl transition-colors">
                                    <FiAlertCircle size={24} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
                        <FiCheckCircle size={64} className="mx-auto text-emerald-500 opacity-20" />
                        <div>
                            <p className="text-xl font-bold">Antrean Kosong</p>
                            <p className="text-slate-500 text-sm">Semua agen sudah terverifikasi dengan benar.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminVerify;
