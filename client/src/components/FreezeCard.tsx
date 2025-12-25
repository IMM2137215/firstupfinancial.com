import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink, Activity } from 'lucide-react';

interface FreezeCardProps {
    name: string;
    description: string;
    url: string;
    type: 'Primary' | 'Secondary';
}

export const FreezeCard: React.FC<FreezeCardProps> = ({ name, description, url, type }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card-premium h-full flex flex-col justify-between p-6 bg-white"
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg">
                        {type === 'Primary' ? (
                            <Shield className="w-6 h-6 text-indigo-600" />
                        ) : (
                            <Activity className="w-6 h-6 text-slate-500" />
                        )}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${type === 'Primary'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-slate-100 text-slate-600'
                        }`}>
                        {type}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>
            </div>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-slate-200 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors duration-200 group"
            >
                Start Freeze
                <ExternalLink className="w-4 h-4 ml-2 text-slate-400 group-hover:text-slate-600" />
            </a>
        </motion.div>
    );
};
