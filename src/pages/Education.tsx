import { motion } from 'motion/react';
import { BookOpenText, BookOpen, ScrollText } from 'lucide-react';
import { usePortfolioContent } from '../lib/content';
import type { Accent } from '../data/content';

const accentClasses: Record<Accent, { glow: string; icon: string; metric: string }> = {
  indigo: {
    glow: "bg-indigo-500/10",
    icon: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    metric: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  emerald: {
    glow: "bg-emerald-500/10",
    icon: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    metric: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  amber: {
    glow: "bg-amber-500/10",
    icon: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    metric: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  blue: {
    glow: "bg-blue-500/10",
    icon: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    metric: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  purple: {
    glow: "bg-purple-500/10",
    icon: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    metric: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  slate: {
    glow: "bg-slate-500/10",
    icon: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    metric: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  },
  yellow: {
    glow: "bg-yellow-500/10",
    icon: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    metric: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
};

export default function Education() {
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
        style={{ backgroundImage: "url('/education.jpg')" }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">Education</h1>
        <p className="text-lg text-slate-400">My academic background and qualifications.</p>
      </div>

      <div className="space-y-8">
        {content.education.map((item, index) => {
          const accent = accentClasses[item.accent ?? "indigo"];
          const Icon = index === 0 ? BookOpenText : BookOpen;

          return (
            <div
              key={item.id}
              className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] border border-slate-700/50 p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${accent.glow} rounded-bl-full -z-10 blur-xl`}></div>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ${accent.icon}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-white mb-2">{item.institution}</h2>
                  <p className="text-lg text-indigo-300 font-medium mb-1">{item.degree}</p>
                  {item.location && <p className="text-slate-400 mb-4">{item.location}</p>}

                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {item.metrics.map((metric) => (
                        <div
                          key={`${item.id}-${metric.label}`}
                          className="bg-slate-700/50 p-4 rounded-xl flex items-center gap-3 border border-slate-600/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        >
                          <ScrollText className="w-5 h-5 text-indigo-400" />
                          <div>
                            <p className="text-sm text-slate-400">{metric.label}</p>
                            <p className="font-semibold text-white">{metric.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.note && <p className="text-sm text-slate-500 mt-4">{item.note}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
