import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FiHome,
    FiPackage,
    FiUsers,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiCheckCircle,
    FiBarChart2,
    FiUser
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Overview',
            path: '/dashboard',
            icon: <FiBarChart2 />,
            roles: ['ADMIN', 'TRAVEL_AGENT']
        },
        {
            title: 'Manajemen Paket',
            path: '/dashboard/packages',
            icon: <FiPackage />,
            roles: ['TRAVEL_AGENT', 'ADMIN']
        },
        {
            title: 'Kelola Agen',
            path: '/dashboard/agents',
            icon: <FiUsers />,
            roles: ['ADMIN']
        },
        {
            title: 'Verifikasi',
            path: '/dashboard/verify',
            icon: <FiCheckCircle />,
            roles: ['ADMIN']
        },
        {
            title: 'Kelola Jamaah',
            path: '/dashboard/users',
            icon: <FiUsers />, // Reuse FiUsers or import another if needed
            roles: ['ADMIN']
        },
        {
            title: 'Profil Saya',
            path: '/dashboard/profile',
            icon: <FiUser />,
            roles: ['ADMIN', 'TRAVEL_AGENT']
        },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

    // Get friendly page title
    const currentPage = menuItems.find(item => item.path === location.pathname) || { title: 'Dashboard' };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
            {/* Sidebar Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transition-all duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-none'}`}
                style={{ boxShadow: isSidebarOpen ? '20px 0 50px rgba(0,0,0,0.02)' : 'none' }}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-8 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                                <FiHome className="text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
                                UmrohPedia
                            </span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-6 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 mb-4 px-4">Menu Utama</p>
                        {filteredMenu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${location.pathname === item.path
                                    ? 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-xl shadow-primary-500/25 ring-4 ring-primary-500/10'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className={`text-xl transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-primary-500'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-semibold tracking-wide">{item.title}</span>
                                {location.pathname === item.path && (
                                    <motion.div layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Info */}
                    <div className="p-6">
                        <div className="bg-slate-900 dark:bg-slate-800 p-5 rounded-[2rem] relative overflow-hidden group border border-slate-800 dark:border-slate-700">
                            {/* Decorative background circle */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all duration-500" />

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-indigo-400 flex items-center justify-center font-bold text-white shadow-inner">
                                    {user?.name?.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                                    <p className="text-[10px] text-primary-300 font-bold uppercase tracking-wider">{user?.role?.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-bold border border-red-500/20 hover:border-red-500/50"
                            >
                                <FiLogOut size={14} />
                                Keluar Sistem
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className={`flex-grow transition-all duration-500 w-full ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 h-20 flex items-center px-6 lg:px-12">
                    <div className="flex items-center gap-4 w-full">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2.5 text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                                <FiMenu size={22} />
                            </button>
                        )}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">
                                <span>Dashboard</span>
                                <span>/</span>
                                <span className="text-primary-500 font-black">{currentPage.title}</span>
                            </div>
                            <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                {currentPage.title}
                            </h1>
                        </div>

                        {/* Right side header actions */}
                        <div className="ml-auto flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-xs font-bold">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                <span className="text-[10px] text-slate-400">Status Sistem: <span className="text-emerald-500 font-bold">Stabil</span></span>
                            </div>
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 lg:p-12 max-w-[1600px] mx-auto"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default DashboardLayout;
