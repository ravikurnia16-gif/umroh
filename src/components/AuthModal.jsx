import React, { useState } from 'react';
import { FiX, FiMail, FiUser, FiPhone, FiLoader, FiAlertCircle, FiCheckCircle, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const { requestOTP, verifyOTP } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1); // 1: Email/Info, 2: OTP
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: ''
    });
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await requestOTP(formData);
            if (result.success) {
                setStep(2);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Gagal mengirim kode. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await verifyOTP(formData.phone, otp);
            if (result.success) {
                onClose();
                // Reset state for next time
                setTimeout(() => {
                    setStep(1);
                    setFormData({ email: '', name: '', phone: '' });
                    setOtp('');
                }, 500);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Verifikasi gagal. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
                    >
                        <FiX className="text-xl text-slate-500" />
                    </button>

                    <div className="p-8 sm:p-10">
                        {step === 1 ? (
                            <>
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2 font-serif text-slate-800 dark:text-white">
                                        Selamat Datang di UmrohPedia
                                    </h2>
                                    <p className="text-slate-500 text-sm">
                                        Masuk atau daftar menggunakan Nama & Nomor WhatsApp
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                        <FiAlertCircle className="shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleRequestOTP} className="space-y-4">
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nama Lengkap"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Nomor WhatsApp (Contoh: 08123456789)"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <FiLoader className="animate-spin" /> : 'Kirim Kode OTP WA'}
                                    </button>
                                </form>

                                <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-700">
                                    <p className="text-slate-400 text-xs italic">
                                        *Layanan ini aman dan kode OTP akan dikirim langsung ke nomor WhatsApp Anda.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FiShield className="text-3xl text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Verifikasi Nomor HP</h2>
                                <p className="text-slate-500 text-sm mb-8">
                                    Masukkan 6 digit kode yang dikirim ke <br />
                                    <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>
                                </p>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                        <FiAlertCircle className="shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleVerify} className="space-y-6">
                                    <input
                                        type="text"
                                        maxLength="6"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full text-center text-3xl font-black tracking-[10px] py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-white"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading || otp.length < 6}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <FiLoader className="animate-spin" /> : 'Verifikasi & Masuk'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-slate-500 text-sm font-medium hover:text-emerald-600 transition-colors"
                                    >
                                        Ganti Nomor HP
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
