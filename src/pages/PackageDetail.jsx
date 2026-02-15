import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiMapPin, FiStar, FiCalendar, FiCheck, FiInfo, FiLoader } from 'react-icons/fi';
import { api } from '../services/api';
import { packages as staticPackages } from '../data/packages';
import InstallmentCalc from '../components/InstallmentCalc';
import ScrollReveal from '../components/ScrollReveal';

const PackageDetail = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('itinerary');

    useEffect(() => {
        const fetchPackage = async () => {
            setLoading(true);
            try {
                const data = await api.getPackageById(id);
                if (data) {
                    setPkg(data);
                } else {
                    // Fallback to static if API returns nothing
                    const staticPkg = staticPackages.find(p => p.id === parseInt(id));
                    setPkg(staticPkg);
                }
            } catch (error) {
                console.error("Failed to fetch package detail:", error);
                const staticPkg = staticPackages.find(p => p.id === parseInt(id));
                setPkg(staticPkg);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-slate-900 flex justify-center items-start">
                <FiLoader className="animate-spin text-4xl text-emerald-600" />
            </div>
        );
    }

    if (!pkg) {
        return <div className="pt-32 container text-center dark:text-white">Paket tidak ditemukan</div>;
    }

    return (
        <div className="pt-24 pb-20 bg-white dark:bg-slate-900 min-h-screen">
            <div className="container">

                {/* Breadcrumb & Back */}
                <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                    <Link to="/" className="hover:text-emerald-600">Beranda</Link>
                    <span>/</span>
                    <Link to="/packages" className="hover:text-emerald-600">Paket Umroh</Link>
                    <span>/</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{pkg.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <ScrollReveal width="100%">
                            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{pkg.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                                <div className="flex items-center gap-1 text-amber-400">
                                    <FiStar className="fill-current" />
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{pkg.rating}</span>
                                    <span className="text-slate-500">({pkg.reviewCount} Review)</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-500">
                                    <FiClock /> {pkg.duration} Hari
                                </div>
                                <div className="flex items-center gap-1 text-slate-500">
                                    <FiMapPin /> {pkg.departureDate}
                                </div>
                            </div>

                            {/* Image Gallery (Simplified) */}
                            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg aspect-video">
                                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
                                <div className="flex gap-8 overflow-x-auto pb-2">
                                    <button
                                        onClick={() => setActiveTab('itinerary')}
                                        className={`pb-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'itinerary' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
                                    >
                                        Jadwal Perjalanan
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('facilities')}
                                        className={`pb-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'facilities' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
                                    >
                                        Fasilitas & Hotel
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('terms')}
                                        className={`pb-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'terms' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
                                    >
                                        Syarat & Ketentuan
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[300px]">
                                {activeTab === 'itinerary' && (
                                    <div className="space-y-8 pl-4 border-l-2 border-emerald-100 dark:border-emerald-900/30">
                                        {pkg.itinerary && pkg.itinerary.map((item, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900"></div>
                                                <h4 className="font-bold text-lg mb-1">Hari ke-{item.day}: {item.title}</h4>
                                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'facilities' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="font-bold text-lg mb-4">Akomodasi Hotel</h4>
                                            <div className="space-y-4">
                                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                                                    <span className="text-xs text-emerald-600 block mb-1">Makkah</span>
                                                    <span className="font-bold block">{pkg.hotel?.makkah}</span>
                                                </div>
                                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                                                    <span className="text-xs text-emerald-600 block mb-1">Madinah</span>
                                                    <span className="font-bold block">{pkg.hotel?.madinah}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-4">Fasilitas Termasuk</h4>
                                            <ul className="space-y-2">
                                                {pkg.facilities && pkg.facilities.map((fac, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                        <FiCheck className="text-emerald-500" /> {fac}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'terms' && (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800/30">
                                        <div className="flex items-start gap-3 mb-4">
                                            <FiInfo className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Syarat & Ketentuan</h4>
                                                <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
                                                    {pkg.terms && pkg.terms.map((term, idx) => (
                                                        <li key={idx}>{term}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Booking Card */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                                    <img src={pkg.travel?.logo || ''} alt={pkg.travel?.name || ''} className="w-12 h-12 rounded-full border p-1" />
                                    <div>
                                        <span className="text-xs text-slate-500 block">Diselenggarakan oleh</span>
                                        <h4 className="font-bold text-sm">{pkg.travel?.name}</h4>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <span className="text-sm text-slate-500 block mb-1">Mulai dari</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-emerald-600 text-3xl font-bold font-serif">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pkg.price)}
                                        </span>
                                        <span className="text-xs text-slate-400">/pax</span>
                                    </div>
                                </div>

                                <button className="w-full btn btn-primary py-3 mb-3 text-lg shadow-emerald-200 dark:shadow-none shadow-lg">
                                    Pesan Sekarang
                                </button>
                                <button className="w-full btn border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                                    Hubungi via WhatsApp
                                </button>
                            </div>

                            {/* Installment Calculator */}
                            <InstallmentCalc price={pkg.price} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
