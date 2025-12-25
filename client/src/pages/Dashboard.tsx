import React, { useEffect, useState } from 'react';
import { FreezeCard } from '../components/FreezeCard';
import { Link } from 'react-router-dom';
import { Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Agency {
    id: string;
    name: string;
    type: 'Primary' | 'Secondary';
    freezeUrl: string;
    description: string;
}

export const Dashboard: React.FC = () => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/services/agencies')
            .then(res => res.json())
            .then(data => {
                setAgencies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch agencies', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Securing connection...</p>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto space-y-12">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-6 h-6 text-green-500" />
                        <span className="text-sm font-bold text-green-600 tracking-wide uppercase">Identity Guard Active</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Protection Hub</h1>
                    <p className="mt-3 text-lg text-slate-500 max-w-2xl">
                        Centralized control for all your credit endpoints. Manage freezes across all bureaus instantly.
                    </p>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between gap-6 min-w-[300px]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-400/20 rounded-lg">
                            <Crown className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-semibold uppercase">Current Plan</div>
                            <div className="font-bold">Premium Enterprise</div>
                        </div>
                    </div>
                    <Link to="/partners" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ArrowRight className="w-5 h-5 text-slate-300" />
                    </Link>
                </div>
            </header>

            {/* Primary Agencies */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">The Big 3</h2>
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md">CRITICAL</span>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {agencies.filter(a => a.type === 'Primary').map(agency => (
                        <FreezeCard
                            key={agency.id}
                            name={agency.name}
                            description={agency.description}
                            url={agency.freezeUrl}
                            type={agency.type}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Secondary Agencies */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Secondary Bureaus</h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {agencies.filter(a => a.type === 'Secondary').map(agency => (
                        <FreezeCard
                            key={agency.id}
                            name={agency.name}
                            description={agency.description}
                            url={agency.freezeUrl}
                            type={agency.type}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Partner Teaser */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Need Business Funding?</h2>
                    <p className="text-slate-300 max-w-xl">
                        Leverage your protected credit profile to access pre-vetted financial partners.
                    </p>
                </div>
                <Link to="/partners" className="btn-accent whitespace-nowrap">
                    View Partners
                </Link>
            </div>
        </div>
    );
};
