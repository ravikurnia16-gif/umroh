import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-serif font-bold text-emerald-600 flex items-center gap-2">
                        <span>UmrohPedia</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="font-medium hover:text-emerald-600 transition-colors">Beranda</Link>
                        <Link to="/packages" className="font-medium hover:text-emerald-600 transition-colors">Paket Umroh</Link>
                        <Link to="/promo" className="font-medium hover:text-emerald-600 transition-colors">Promo</Link>
                        <Link to="/guide" className="font-medium hover:text-emerald-600 transition-colors">Panduan</Link>
                        <Link to="/blog" className="font-medium hover:text-emerald-600 transition-colors">Blog</Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon className="text-slate-600" />}
                        </button>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-sm max-w-[100px] truncate">{user.name}</span>
                                    <FiChevronDown className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 overflow-hidden">
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                                            <p className="text-xs text-slate-500">Masuk sebagai</p>
                                            <p className="text-sm font-bold truncate">{user.name}</p>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                                                {user.role}
                                            </span>
                                        </div>
                                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <FiUser className="text-slate-400" /> Profil Saya
                                        </button>
                                        <button
                                            onClick={() => { logout(); setIsProfileOpen(false); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <FiLogOut /> Keluar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-medium"
                            >
                                <FiUser /> Masuk
                            </button>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2">
                            {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-4">
                        <Link to="/" className="py-2 border-b border-slate-100 dark:border-slate-800">Beranda</Link>
                        <Link to="/packages" className="py-2 border-b border-slate-100 dark:border-slate-800">Paket Umroh</Link>
                        <Link to="/promo" className="py-2 border-b border-slate-100 dark:border-slate-800">Promo</Link>
                        <Link to="/guide" className="py-2 border-b border-slate-100 dark:border-slate-800">Panduan</Link>
                        <Link to="/blog" className="py-2 border-b border-slate-100 dark:border-slate-800">Blog</Link>

                        {user ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full py-3 text-red-600 font-medium flex items-center justify-center gap-2"
                                >
                                    <FiLogOut /> Keluar
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setIsAuthModalOpen(true); setIsOpen(false); }}
                                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium"
                            >
                                Masuk / Daftar
                            </button>
                        )}
                    </div>
                )}
            </nav>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;
