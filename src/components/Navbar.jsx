import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiMoon, FiSun, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
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
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors font-medium">
                        <FiUser /> Masuk
                    </button>
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
                    <button className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium">
                        Masuk / Daftar
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
