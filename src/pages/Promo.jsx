import React, { useState, useEffect } from 'react';
import PromoCard from '../components/PromoCard';
import { api } from '../services/api';
import { promos as staticPromos } from '../data/promos';
import { FiLoader, FiTag } from 'react-icons/fi';

const Promo = () => {
    const [promosData, setPromosData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromos = async () => {
            setLoading(true);
            try {
                const data = await api.getPromos();
                if (data && data.length > 0) {
                    setPromosData(data);
                } else {
                    setPromosData(staticPromos);
                }
            } catch (error) {
                console.error("Failed to fetch promos:", error);
                setPromosData(staticPromos);
            } finally {
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Promo Spesial Umroh</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">Dapatkan penawaran terbaik untuk perjalanan ibadah Anda. Hemat lebih banyak dengan kode promo eksklusif kami.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <FiLoader className="animate-spin text-4xl text-emerald-600" />
                    </div>
                ) : (
                    <>
                        {promosData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {promosData.map((promo) => (
                                    <PromoCard key={promo.id} promo={promo} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                <FiTag className="text-5xl text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Belum ada promo saat ini</h3>
                                <p className="text-slate-500">Nantikan penawaran menarik kami selanjutnya.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Promo;
