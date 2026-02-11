import React, { useState, useEffect } from 'react';
import { FiClock, FiTag } from 'react-icons/fi';

const PromoCard = ({ promo }) => {
    const { title, discount, code, endDate, image, description } = promo;
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(endDate) - +new Date();
            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return {};
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700 flex flex-col h-full">
            <div className="relative h-40">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Promo Terbatas
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
                <p className="text-emerald-600 font-bold mb-2">{discount}</p>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{description}</p>

                <div className="mt-auto">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><FiClock /> Berakhir dalam:</span>
                        <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-red-500 font-bold">
                            {timeLeft.days}h {timeLeft.hours}j {timeLeft.minutes}m
                        </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded border border-dashed border-slate-300 dark:border-slate-600 flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-500">Kode: <span className="text-slate-800 dark:text-slate-200 font-bold">{code}</span></span>
                        <button
                            onClick={() => navigator.clipboard.writeText(code)}
                            className="text-xs text-emerald-600 font-bold hover:underline"
                        >
                            Salin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoCard;
