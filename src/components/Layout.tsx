import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const ThreeBackground = lazy(() => import('./ThreeBackground'));

export default function Layout() {
  const [showAmbientBackground, setShowAmbientBackground] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = 'connection' in navigator && Boolean((navigator.connection as { saveData?: boolean }).saveData);

    if (prefersReducedMotion || saveData) return;

    const timeoutId = window.setTimeout(() => setShowAmbientBackground(true), 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#060B19] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Persistent 3D Background - only on Home Page */}
      {isHomePage && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {showAmbientBackground && (
            <Suspense fallback={null}>
              <ThreeBackground />
            </Suspense>
          )}
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#060B19]/40 backdrop-blur-[1px]"></div>
        </div>
      )}

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
