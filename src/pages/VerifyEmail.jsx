import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }

        const verify = async () => {
            try {
                const response = await fetch(`/api/auth/verify?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Network error. Please try again.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100 dark:border-slate-700">
                <div className="flex justify-center mb-6">
                    {status === 'loading' && <FiLoader className="animate-spin text-4xl text-primary-500" />}
                    {status === 'success' && <FiCheckCircle className="text-5xl text-emerald-500" />}
                    {status === 'error' && <FiXCircle className="text-5xl text-red-500" />}
                </div>

                <h2 className="text-2xl font-bold mb-4">
                    {status === 'loading' ? 'Memverifikasi...' : status === 'success' ? 'Email Terverifikasi!' : 'Verifikasi Gagal'}
                </h2>

                <p className="text-slate-500 mb-8">
                    {message}
                </p>

                {status === 'success' && (
                    <button
                        onClick={() => window.location.href = '/?login=true'}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30"
                    >
                        Login Sekarang
                    </button>
                )}

                {status === 'error' && (
                    <Link to="/" className="text-primary-500 font-semibold hover:underline">
                        Kembali ke Beranda
                    </Link>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
