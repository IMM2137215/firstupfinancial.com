import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Partner {
    id: string;
    name: string;
    type: string;
    status: string;
}

export const Partners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/partners')
            .then(res => res.json())
            .then(data => {
                setPartners(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleApply = async () => {
        const businessName = prompt("Enter Business Name for KYB Check Simulation:");
        if (!businessName) return;

        // Visual feedback would be better as a modal, but keeping it simple for MVP
        const res = await fetch('http://localhost:3001/api/partners/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, ein: '12-3456789' })
        });
        const data = await res.json();
        alert(`Status: ${data.status}\nID: ${data.decision_id}`);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Strategic Partners</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Access a curated network of institutional lenders and fintech infrastructure providers.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Add Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all"
                        onClick={handleApply}
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Verify Your Business</h3>
                        <p className="text-slate-500 mb-6 text-sm">Run a real-time KYB check to unlock partner applications.</p>
                        <button className="btn-primary w-full">Start New Application</button>
                    </motion.div>

                    {/* Existing Partners */}
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-slate-900 rounded-lg">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    {partner.status.toUpperCase()}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{partner.name}</h3>
                            <p className="text-sm font-medium text-slate-500 mb-6">{partner.type}</p>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Integration Level</span>
                                    <span className="font-semibold text-slate-700">Native API</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
