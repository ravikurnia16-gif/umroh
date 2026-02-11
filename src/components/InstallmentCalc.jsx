import React, { useState } from 'react';
import { FiDollarSign, FiCheck } from 'react-icons/fi';

const InstallmentCalc = ({ price }) => {
    const [dp, setDp] = useState(5000000); // Default DP 5jt
    const loanAmount = price - dp;

    // Simple calculation with 0% interest for demo
    const plans = [
        { term: 3, monthly: Math.ceil(loanAmount / 3) },
        { term: 6, monthly: Math.ceil(loanAmount / 6) },
        { term: 12, monthly: Math.ceil(loanAmount / 12) }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
                <FiDollarSign className="text-emerald-600 text-xl" />
                <h3 className="font-bold text-lg">Simulasi Cicilan Syariah</h3>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-500 mb-2">Uang Muka (DP)</label>
                <select
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2"
                    value={dp}
                    onChange={(e) => setDp(Number(e.target.value))}
                >
                    <option value="5000000">Rp 5.000.000</option>
                    <option value="7500000">Rp 7.500.000</option>
                    <option value="10000000">Rp 10.000.000</option>
                    <option value={price * 0.5}>50% (Rp {(price * 0.5).toLocaleString()})</option>
                </select>
            </div>

            <div className="space-y-3">
                {plans.map((plan) => (
                    <div key={plan.term} className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-emerald-500 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="font-medium">{plan.term} Bulan</span>
                        </div>
                        <span className="font-bold text-emerald-600">
                            Rp {plan.monthly.toLocaleString('id-ID')}
                            <span className="text-xs text-slate-400 font-normal">/bln</span>
                        </span>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
                *Simulasi estimasi. Syarat & ketentuan berlaku. Tanpa riba/bunga.
            </p>
        </div>
    );
};

export default InstallmentCalc;
