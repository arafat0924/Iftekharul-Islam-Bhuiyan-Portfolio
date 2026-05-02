import { motion } from 'motion/react';
import { Mail, GraduationCap } from 'lucide-react';
import { usePortfolioContent } from '../lib/content';

export default function References() {
  const { content } = usePortfolioContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto relative"
    >
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/references.jpg')" }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">References</h1>
        <p className="text-lg text-slate-400">Professional and academic recommendations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
        {content.references.map((ref, index) => (
          <motion.div
            key={ref.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group bg-slate-800/50 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] border border-slate-700/50 p-8 pt-14 relative hover:shadow-[0_15px_40px_rgba(99,102,241,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 transition-all duration-300 mt-10"
          >
            {/* DP Material Layout */}
            <div className="absolute -top-12 left-8">
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 shadow-[0_10px_25px_rgba(99,102,241,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0F172A] bg-[#0F172A]">
                  <img
                    src={ref.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(ref.name)}&background=1e293b&color=818cf8&size=256&font-size=0.33`}
                    alt={ref.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to professional initials if image doesn't exist
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ref.name)}&background=1e293b&color=818cf8&size=256&font-size=0.33`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-2xl font-bold text-white">{ref.name}</h2>
              <p className="text-indigo-400 font-medium text-lg mb-6">{ref.title}</p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 text-slate-300">
                  <div className="p-2.5 bg-slate-700/50 rounded-xl shrink-0 border border-slate-600/50 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-slate-200">{ref.department}</p>
                    {ref.education && (
                      <p className="text-sm mt-1.5 leading-relaxed text-slate-400">{ref.education}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="p-2.5 bg-slate-700/50 rounded-xl shrink-0 border border-slate-600/50 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <a href={`mailto:${ref.email}`} className="text-slate-300 hover:text-indigo-400 hover:underline font-medium transition-colors">
                    {ref.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
