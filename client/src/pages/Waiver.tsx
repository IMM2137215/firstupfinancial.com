import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSignature, ShieldCheck, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Waiver: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [signature, setSignature] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('http://localhost:3001/api/services/sign-waiver', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName,
                    signature,
                    date: new Date().toLocaleDateString()
                })
            });

            if (res.ok) {
                setCompleted(true);
            } else {
                alert('Failed to generate waiver. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (completed) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Agreement Secured</h2>
                    <p className="text-slate-500 mb-8">Your Hold Harmless Agreement has been securely filed. You now have full access.</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn-primary w-full flex items-center justify-center group"
                    >
                        Enter Protection Hub
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
            >
                {/* Left Panel: Context */}
                <div className="bg-slate-900 p-10 flex flex-col justify-between text-white">
                    <div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                            <Lock className="w-6 h-6 text-amber-400" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Secure Access Protocol</h1>
                        <p className="text-slate-300 leading-relaxed">
                            First Up Financial provides institutional-grade tools.
                            To proceed, we require a standard Hold Harmless liability release.
                        </p>
                    </div>
                    <div className="mt-8 space-y-4 text-sm text-slate-400">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            <span>AES-256 Encrypted Filing</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                            <span>Instant Verification</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center mb-8">
                        <FileSignature className="w-6 h-6 text-indigo-600 mr-3" />
                        <h2 className="text-xl font-semibold text-slate-900">Liability Waiver</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Legal Full Name</label>
                            <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="input-field"
                                placeholder="e.g. Jonathan Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Digital Signature</label>
                            <input
                                type="text"
                                required
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                className="input-field font-serif italic text-lg"
                                placeholder="/s/ Jonathan Doe"
                            />
                            <p className="mt-2 text-xs text-slate-400">
                                By typing your name, you agree to the Indemnification Clause.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full flex items-center justify-center mt-4"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Sign & Proceed'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
