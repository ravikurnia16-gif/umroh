import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const PackageCard = ({ packageData }) => {
    const { id, title, travel, price, duration, rating, reviewCount, departureDate, hotel, image } = packageData;
    const { theme } = useTheme();
    const [isWishlist, setIsWishlist] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    };

    return (
        <div className="card group h-full flex flex-col relative">
            {/* Image & Wishlist */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsWishlist(!isWishlist);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                >
                    <FiHeart className={`${isWishlist ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                    <div className="flex items-center gap-2">
                        <img src={travel.logo} alt={travel.name} className="w-6 h-6 rounded-full bg-white p-0.5" />
                        <span className="text-xs font-medium truncate">{travel.name}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><FiClock /> {duration} Hari</span>
                    <span className="flex items-center gap-1"><FiMapPin /> {departureDate}</span>
                </div>

                <Link to={`/packages/${id}`} className="font-bold text-lg mb-2 hover:text-emerald-600 transition-colors line-clamp-2" title={title}>
                    {title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                    <FiStar className="fill-current" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">{rating}</span>
                    <span className="text-slate-400">({reviewCount})</span>
                </div>

                {/* Hotel Info (Optional - Simplified) */}
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
                    🏨 {hotel.makkah} &bull; {hotel.madinah}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">Mulai dari</span>
                        <span className="text-emerald-600 font-bold text-lg">{formatPrice(price)}</span>
                    </div>
                    <Link to={`/packages/${id}`} className="btn btn-primary text-sm py-2 px-4">
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
