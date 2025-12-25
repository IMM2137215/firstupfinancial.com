import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink for active states
import { Shield, LayoutDashboard, Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Waiver', path: '/waiver', icon: Shield },
        { name: 'Protection Hub', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Partners', path: '/partners', icon: Building2 },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <span className="text-amber-400 font-bold text-xl">F</span>
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">First Up Financial</span>
                        </div>
                        <div className="hidden md:flex ml-10 space-x-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => cn(
                                        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                        isActive
                                            ? "bg-slate-50 text-slate-900 shadow-sm border border-slate-100"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon className="w-4 h-4 mr-2" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => cn(
                                        "block px-3 py-2 rounded-md text-base font-medium flex items-center",
                                        isActive
                                            ? "bg-slate-50 text-slate-900"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
