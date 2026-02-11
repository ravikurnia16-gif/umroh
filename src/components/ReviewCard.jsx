import React from 'react';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

const ReviewCard = ({ review }) => {
    const { name, rating, comment, date, avatar, verified } = review;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                <div>
                    <h4 className="font-bold text-sm flex items-center gap-1.5">
                        {name}
                        {verified && <FiCheckCircle className="text-blue-500" size={12} title="Verified Jamaah" />}
                    </h4>
                    <div className="flex text-amber-500 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={12} className={i < rating ? 'fill-current' : ''} />
                        ))}
                    </div>
                </div>
                <span className="ml-auto text-[10px] text-slate-400">{date}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed flex-1">
                "{comment}"
            </p>
        </div>
    );
};

export default ReviewCard;
