import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatCounter from '../components/StatCounter';
import PackageCard from '../components/PackageCard';
import PromoCard from '../components/PromoCard';
import ScrollReveal from '../components/ScrollReveal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { api } from '../services/api';
// Keep static data as fallback initial state or for error handling
import { packages as staticPackages } from '../data/packages';
import { promos as staticPromos } from '../data/promos';
import { reviews as staticReviews } from '../data/reviews';
import { FiArrowRight, FiCheckCircle, FiShield, FiHeart } from 'react-icons/fi';

const Home = () => {
    const [popularPackages, setPopularPackages] = useState(staticPackages.slice(0, 3));
    const [activePromos, setActivePromos] = useState(staticPromos.slice(0, 4));
    const [reviewsData, setReviewsData] = useState(staticReviews);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [packagesRes, promosRes, reviewsRes] = await Promise.all([
                    api.getPackages({ sort: 'rating' }), // Fetch packages sorted by rating for "Popular"
                    api.getPromos(),
                    api.getReviews()
                ]);

                // Update state if API returns data, otherwise keep static fallback
                if (packagesRes && packagesRes.length > 0) {
                    setPopularPackages(packagesRes.slice(0, 3));
                }
                if (promosRes && promosRes.length > 0) {
                    setActivePromos(promosRes.slice(0, 4));
                }
                if (reviewsRes && reviewsRes.length > 0) {
                    setReviewsData(reviewsRes);
                }
            } catch (error) {
                console.error("Failed to fetch home data:", error);
                // Fallback is already set in initial state
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <HeroSection />

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCounter end={50000} suffix="+" label="Jamaah Terlayani" />
                        <StatCounter end={100} suffix="+" label="Travel Partner" />
                        <StatCounter end={4.9} label="Rating Kepuasan" />
                        <StatCounter end={12} suffix="th" label="Pengalaman" />
                    </div>
                </div>
            </section>

            {/* Popular Packages */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-2">Paket Umroh Pilihan</h2>
                                <p className="text-slate-500">Pilihan paket terbaik untuk keberangkatan terdekat</p>
                            </div>
                            <Link to="/packages" className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
                                Lihat Semua <FiArrowRight />
                            </Link>
                        </div>
                    </ScrollReveal>

                    {loading ? (
                        <div className="text-center py-12">Loading paket...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {popularPackages.map((pkg, index) => (
                                <ScrollReveal key={pkg.id} delay={index * 0.1}>
                                    <PackageCard packageData={pkg} />
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800"
                                    alt="Umroh Journey"
                                    className="rounded-3xl shadow-2xl"
                                />
                                <div className="absolute -bottom-8 -right-8 bg-emerald-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                                    <p className="text-3xl font-bold mb-1">99%</p>
                                    <p className="text-sm text-emerald-100">Jamaah Puas</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <div>
                            <ScrollReveal>
                                <h2 className="text-3xl font-serif font-bold mb-8">Mengapa Memilih Kami?</h2>
                                <div className="space-y-6">
                                    {[
                                        { icon: <FiShield />, title: 'Pasti Berangkat', desc: 'Kami hanya bekerja sama dengan travel agent resmi dan berizin Kemenag.' },
                                        { icon: <FiCheckCircle />, title: 'Harga Terverifikasi', desc: 'Semua harga paket adalah jujur dan telah melewati verifikasi tim kami.' },
                                        { icon: <FiHeart />, title: 'Layanan 24/7', desc: 'Tim Customer Support kami siap membantu Anda kapan pun dibutuhkan.' }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">{feature.title}</h4>
                                                <p className="text-sm text-slate-500">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promos */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold mb-2">Promo Spesial</h2>
                    <p className="text-slate-500">Manfaatkan penawaran menarik untuk menghemat ongkos ibadah</p>
                </div>
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activePromos.map((promo, index) => (
                        <ScrollReveal key={promo.id} delay={index * 0.1}>
                            <PromoCard promo={promo} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white dark:bg-slate-800">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold mb-2">Apa Kata Mereka?</h2>
                        <p className="text-slate-500">Ribuan jamaah telah mempercayakan perjalanan mereka kepada kami</p>
                    </div>
                    <TestimonialCarousel reviews={reviewsData} />
                </div>
            </section>

            {/* Travel Partners */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                <div className="container text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-12">Bekerja sama dengan Travel Terpercaya</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 contrast-0 hover:contrast-100 hover:opacity-100 transition-all duration-500">
                        {/* Mocking logo placeholders with text-based logos */}
                        <span className="text-2xl font-bold font-serif italic">Haramain</span>
                        <span className="text-2xl font-bold font-serif italic">Afiah Tour</span>
                        <span className="text-2xl font-bold font-serif italic">Naba Tour</span>
                        <span className="text-2xl font-bold font-serif italic">Al Hijaz</span>
                        <span className="text-2xl font-bold font-serif italic">Maktour</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
