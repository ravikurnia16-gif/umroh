import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { travels } from '../data/travels';
import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import ScrollReveal from '../components/ScrollReveal';
import { FiCheckCircle, FiStar, FiMapPin } from 'react-icons/fi';

const TravelProfile = () => {
    const { id } = useParams();
    const travel = travels.find(t => t.id === parseInt(id));
    const travelPackages = packages.filter(p => p.travel.id === parseInt(id));

    if (!travel) {
        return <div className="pt-24 container text-center">Travel Agent tidak ditemukan</div>;
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                {/* Profile Header */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <img
                        src={travel.logo}
                        alt={travel.name}
                        className="w-32 h-32 object-contain rounded-full border-4 border-slate-100 dark:border-slate-700 bg-white"
                    />
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-3xl font-serif font-bold">{travel.name}</h1>
                            {travel.verified && (
                                <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">
                                    <FiCheckCircle /> Verified Partner
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><FiStar className="text-amber-400 fill-current" /> {travel.rating} Rating</span>
                            <span className="flex items-center gap-1"><FiMapPin /> {travel.location}</span>
                            <span>{travel.totalPackages} Paket Aktif</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">{travel.description}</p>
                    </div>

                    <button className="btn btn-primary self-center md:self-start">Hubungi Agent</button>
                </div>

                {/* Packages Grid */}
                <h2 className="text-2xl font-serif font-bold mb-6">Paket dari {travel.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travelPackages.length > 0 ? (
                        travelPackages.map((pkg, index) => (
                            <ScrollReveal key={pkg.id} delay={index * 0.1}>
                                <PackageCard packageData={pkg} />
                            </ScrollReveal>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-slate-500 py-12">Belum ada paket aktif saat ini.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TravelProfile;
