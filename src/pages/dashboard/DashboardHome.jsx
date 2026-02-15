import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiTrendingUp, FiPackage, FiUsers, FiAward } from 'react-icons/fi';

const DashboardHome = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    const stats = isAdmin ? [
        { label: 'Total Agen', value: '12', icon: <FiUsers className="text-blue-500" />, trend: '+2 bulan ini' },
        { label: 'Total Paket', value: '84', icon: <FiPackage className="text-purple-500" />, trend: '+5 minggu ini' },
        { label: 'Pendaftar Baru', value: '156', icon: <FiTrendingUp className="text-green-500" />, trend: '+12% hari ini' },
        { label: 'Agen Terverifikasi', value: '8', icon: <FiAward className="text-amber-500" />, trend: '80% dari total' },
    ] : [
        { label: 'Paket Aktif', value: '15', icon: <FiPackage className="text-blue-500" />, trend: '3 baru tayang' },
        { label: 'Total Klik', value: '1.2k', icon: <FiTrendingUp className="text-purple-500" />, trend: '+15% minggu ini' },
        { label: 'Peminat Baru', value: '42', icon: <FiUsers className="text-green-500" />, trend: 'Menunggu respon' },
        { label: 'Rating Agen', value: '4.8', icon: <FiAward className="text-amber-500" />, trend: 'Sangat baik' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Halo, {user?.name}! 👋</h2>
                <p className="text-slate-500">Selamat datang di panel kendali {isAdmin ? 'Super Admin' : 'Travel Agent'} UmrohPedia.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-2xl">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Placeholder for real content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-6">Aktivitas Terbaru</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 shrink-0" />
                                <div>
                                    <p className="text-sm">
                                        <span className="font-semibold text-primary-500">
                                            {isAdmin ? 'Agen Shafira' : 'Bapak Jamaah'}
                                        </span>
                                        {isAdmin ? ' baru saja mengupdate paket Umroh Hemat.' : ' melakukan reservasi Paket Umroh Turki.'}
                                    </p>
                                    <span className="text-xs text-slate-500">2 jam yang lalu</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 rounded-3xl text-white">
                    <h3 className="text-xl font-bold mb-4">Tips Hari Ini 💡</h3>
                    <p className="text-primary-100 mb-6 leading-relaxed">
                        {isAdmin ?
                            "Gunakan fitur verifikasi untuk memastikan seluruh agen mematuhi standar pelayanan Kemenag. Agen yang terverifikasi mendapatkan klik 3x lebih banyak!" :
                            "Foto hotel yang jernih dan deskripsi jadwal harian yang lengkap dapat meningkatkan kepercayaan calon jamaah hingga 50%."
                        }
                    </p>
                    <button className="px-6 py-2 bg-white text-primary-600 rounded-xl font-semibold shadow-lg shadow-black/10 transition-transform active:scale-95">
                        Lihat Selengkapnya
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
