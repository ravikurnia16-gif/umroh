import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PackageCard from '../components/PackageCard';
import PromoCard from '../components/PromoCard';
import StatCounter from '../components/StatCounter';
import ScrollReveal from '../components/ScrollReveal';
import { packages } from '../data/packages'; // Assumes you have this
import { promos } from '../data/promos';    // Assumes you have this
import { reviews } from '../data/reviews';  // Assumes you have this
import { travels } from '../data/travels';  // Assumes you have this
import { FiCheckCircle } from 'react-icons/fi';

const Home = () => {
    // Get top 3 popular packages
    const popularPackages = packages.slice(0, 3);

    return (
        <div className="min-h-screen pb-20">
            <HeroSection />

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatCounter from="0" to="50000" suffix="+" label="Jamaah Terlayani" />
                    <StatCounter from="0" to="100" suffix="+" label="Travel Partner" />
                    <StatCounter from="0" to="98" suffix="%" label="Tingkat Kepuasan" />
                    <StatCounter from="0" to="12" suffix=" Tahun" label="Pengalaman" />
                </div>
            </section>

            {/* Popular Packages */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Paket Umroh Populer</h2>
                            <p className="text-slate-500 max-w-xl">
                                Pilihan paket terbaik yang paling banyak diminati oleh jamaah Indonesia.
                                Harga transparan dan fasilitas terjamin.
                            </p>
                        </div>
                        <Link to="/packages" className="hidden md:inline-flex btn btn-primary">
                            Lihat Semua Paket
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularPackages.map((pkg, index) => (
                            <ScrollReveal key={pkg.id} delay={index * 0.1} width="100%">
                                <PackageCard packageData={pkg} />
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/packages" className="btn btn-primary w-full">Lihat Semua Paket</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal width="100%">
                            <img
                                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop"
                                alt="Umroh Experience"
                                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                            />
                        </ScrollReveal>

                        <ScrollReveal width="100%" delay={0.2}>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Mengapa Memilih UmrohPedia?</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 h-fit">
                                        <FiCheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Travel Resmi Kemenag</h3>
                                        <p className="text-slate-500 text-sm">Semua partner travel kami telah terverifikasi dan memiliki izin resmi PPIU dari Kementerian Agama.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 h-fit">
                                        <FiCheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Jaminan Harga Transparan</h3>
                                        <p className="text-slate-500 text-sm">Harga yang Anda lihat adalah harga final. Tidak ada biaya tersembunyi saat keberangkatan.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 h-fit">
                                        <FiCheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Pembayaran Aman & Mudah</h3>
                                        <p className="text-slate-500 text-sm">Didukung berbagai metode pembayaran resmi dan opsi cicilan syariah.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Promos */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Promo Spesial</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {promos.map((promo, index) => (
                            <ScrollReveal key={promo.id} delay={index * 0.1} width="100%">
                                <PromoCard promo={promo} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                <div className="container relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Kata Mereka</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.slice(0, 3).map((review, index) => (
                            <ScrollReveal key={review.id} delay={index * 0.1} width="100%">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-emerald-700/50 text-left h-full">
                                    <div className="flex gap-1 text-amber-400 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-emerald-800'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="italic mb-6 opacity-90">"{review.comment}"</p>
                                    <div className="flex items-center gap-3">
                                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full bg-emerald-200" />
                                        <div>
                                            <h4 className="font-bold text-sm">{review.name}</h4>
                                            <p className="text-xs opacity-70">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Travel Partners Grid */}
            <section className="py-16 bg-white dark:bg-slate-800">
                <div className="container text-center">
                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-8">Partner Travel Resmi Kami</h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {travels.map(travel => (
                            <img key={travel.id} src={travel.logo} alt={travel.name} className="h-12 w-auto object-contain mix-blend-multiply dark:mix-blend-screen" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
