import React from 'react';
import PromoCard from '../components/PromoCard';
import { promos } from '../data/promos';

const Promo = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Promo Spesial Umroh</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promos.map((promo) => (
                        <PromoCard key={promo.id} promo={promo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Promo;
