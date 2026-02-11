import React from 'react';
import { FiChevronRight, FiHelpCircle } from 'react-icons/fi';
import { faqData } from '../data/faq';
import ScrollReveal from '../components/ScrollReveal';
import FAQ from '../components/FAQ';

const Guide = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <ScrollReveal>
                        <h1 className="text-4xl font-serif font-bold mb-4">Panduan Ibadah Umroh</h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Segala informasi yang Anda butuhkan untuk mempersiapkan perjalanan ibadah ke Tanah Suci,
                            mulai dari persyaratan dokumen hingga tata cara ibadah.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Quick Guides */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-lg flex items-center justify-center text-sm">1</span>
                            Persiapan Dasar
                        </h3>
                        <div className="space-y-3">
                            {[
                                'Persyaratan Paspor & Visa',
                                'Vaksinasi Meningitis',
                                'Perlengkapan yang Wajib Dibawa',
                                'Persiapan Fisik & Mental'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                                    <span className="text-sm font-medium">{item}</span>
                                    <FiChevronRight className="text-slate-400" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 rounded-lg flex items-center justify-center text-sm">2</span>
                                Tata Cara Ibadah
                            </h3>
                            <div className="bg-emerald-600 rounded-2xl p-6 text-white text-center">
                                <h4 className="font-bold mb-2">E-Book Panduan Gratis</h4>
                                <p className="text-xs text-emerald-100 mb-6">Unduh panduan lengkap doa & tata cara Umroh dalam format PDF.</p>
                                <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm shadow-lg hover:bg-emerald-50 transition-colors">
                                    Download Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <FiHelpCircle className="text-emerald-600 text-2xl" />
                            <h2 className="text-2xl font-serif font-bold">Frequently Asked Questions</h2>
                        </div>

                        <FAQ data={faqData} />

                        <div className="mt-12 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-600 dark:text-slate-400 mb-4">Masih punya pertanyaan lain?</p>
                            <button className="btn btn-primary">Hubungi Tim Support</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;
