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
            title: 'Profil Saya',
            path: '/dashboard/profile',
            icon: <FiUser />,
            roles: ['ADMIN', 'TRAVEL_AGENT']
        },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            {/* Sidebar Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-6 flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                            UmrohPedia Admin
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4 space-y-2 mt-4">
                        {filteredMenu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Info */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                            <p className="text-sm font-semibold truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all font-medium"
                        >
                            <FiLogOut />
                            Logout
                        </button>
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
            <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : ''}`}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 h-16 flex items-center px-4 lg:px-8">
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="mr-4 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <FiMenu size={20} />
                        </button>
                    )}
                    <h1 className="text-lg font-semibold capitalize">
                        {location.pathname.split('/').pop() || 'Overview'}
                    </h1>
                </header>

                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
