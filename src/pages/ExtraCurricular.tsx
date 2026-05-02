import { motion } from 'motion/react';
import { Activity, Medal } from 'lucide-react';
import ImageGrid from '../components/ImageGrid';
import { usePortfolioContent } from '../lib/content';

export default function ExtraCurricular() {
  const { content } = usePortfolioContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto relative"
    >
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/extra_curricular.jpg')" }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">Extra Curricular Activities</h1>
        <p className="text-lg text-slate-400">Sports and other non-academic pursuits.</p>
      </div>

      <div className="space-y-8">
        {content.extraCurricular.map((item) => (
          <div key={item.id} className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] border border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 shrink-0 border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <Activity className="w-8 h-8" />
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Medal className="w-6 h-6 text-amber-400 sm:hidden" />
                    <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                  </div>
                  <h3 className="text-xl text-indigo-400 font-medium mb-4">{item.subtitle}</h3>

                  {item.period && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50 mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      {item.period}
                    </div>
                  )}

                  <p className="text-slate-300 leading-relaxed mb-8">{item.description}</p>

                  <ImageGrid images={item.images} heightClass="h-56 sm:h-64" imageFit="cover" />
                </div>
              </div>
            </div>
            {item.quote && (
              <div className="bg-slate-900/50 px-8 py-4 border-t border-slate-700/50">
                <p className="text-sm text-slate-400 italic">"{item.quote}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
