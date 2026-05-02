import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import ScrollToTop from './src/components/ScrollToTop';

export default function Layout() {
    const location = useLocation();

    const getBackgroundImage = () => {
        switch (location.pathname) {
            case '/': return '/homeImage.jpg';
            case '/education': return '/educationImage.jpg';
            case '/achievements/academic': return '/academicImage.jpg';
            case '/achievements/professional': return '/professionalImage.jpg';
            case '/achievements/fieldwork': return '/fieldworkImage.jpg';
            case '/achievements/extracurricular': return '/extracurricularImage.jpg';
            case '/references': return '/referencesImage.jpg';
            case '/gallery': return '/galleryImage.jpg';
            case '/contact': return '/contact image.jpg';
            default: return '/homeImage.jpg';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#060B19] text-slate-200 font-sans selection:bg-indigo-500/30">
            {/* Dynamic Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        src={getBackgroundImage()}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.opacity = '0';
                        }}
                    />
                </AnimatePresence>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-[#060B19]/80 backdrop-blur-[2px]"></div>
            </div>

            {/* 3D Ambient Background Glows */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <ScrollToTop />
                <Header />
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
