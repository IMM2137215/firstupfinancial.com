import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <Navbar />
            <main className="flex-grow pt-16 relative w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};
