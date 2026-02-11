import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-serif text-emerald-500 font-bold">UmrohPedia</h3>
                    <p className="text-sm">Platform pencarian & perbandingan paket Umroh terpercaya di Indonesia.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-emerald-500 transition-colors"><FiFacebook size={20} /></a>
                        <a href="#" className="hover:text-emerald-500 transition-colors"><FiInstagram size={20} /></a>
                        <a href="#" className="hover:text-emerald-500 transition-colors"><FiTwitter size={20} /></a>
                    </div>
                </div>

                {/* Links 1 */}
                <div>
                    <h4 className="font-bold text-white mb-4">Perusahaan</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Partner Travel</a></li>
                    </ul>
                </div>

                {/* Links 2 */}
                <div>
                    <h4 className="font-bold text-white mb-4">Dukungan</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-white mb-4">Berlangganan</h4>
                    <p className="text-sm mb-4">Dapatkan info promo & artikel terbaru seputar Umroh.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email Anda"
                            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-emerald-500 flex-1"
                        />
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
            <div className="container border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} UmrohPedia. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
