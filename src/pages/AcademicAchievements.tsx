import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, Gavel, Scale, ScrollText, Bookmark, BookOpen } from 'lucide-react';
import ImageGrid from '../components/ImageGrid';
import { usePortfolioContent } from '../lib/content';
import type { Accent } from '../data/content';

const accentStyles: Record<Accent, { card: string; iconBg: string; icon: string }> = {
  amber: {
    card: "bg-white/[0.03] border-amber-500/30 hover:shadow-[0_15px_40px_rgba(251,191,36,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-amber-500/20 border-amber-500/30",
    icon: "text-amber-400",
  },
  yellow: {
    card: "bg-white/[0.03] border-yellow-500/30 hover:shadow-[0_15px_40px_rgba(250,204,21,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-yellow-500/20 border-yellow-500/30",
    icon: "text-yellow-400",
  },
  indigo: {
    card: "bg-white/[0.03] border-indigo-500/30 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-indigo-500/20 border-indigo-500/30",
    icon: "text-indigo-400",
  },
  blue: {
    card: "bg-white/[0.03] border-blue-500/30 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    icon: "text-blue-400",
  },
  emerald: {
    card: "bg-white/[0.03] border-emerald-500/30 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
    icon: "text-emerald-400",
  },
  purple: {
    card: "bg-white/[0.03] border-purple-500/30 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:bg-white/[0.06]",
    iconBg: "bg-purple-500/20 border-purple-500/30",
    icon: "text-purple-400",
  },
  slate: {
    card: "bg-white/[0.03] border-slate-600/50 hover:shadow-[0_15px_40px_rgba(148,163,184,0.1)] hover:bg-white/[0.06]",
    iconBg: "bg-slate-700/50 border-slate-600/50",
    icon: "text-slate-400",
  },
};

const iconCycle = [Gavel, Scale, ScrollText, Bookmark, Trophy, ScrollText, Gavel, BookOpen];

export default function AcademicAchievements() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);
  const { content } = usePortfolioContent();

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/academic_achivements.jpg')" }}
        />
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-amber-900/40 via-[#060B19] to-blue-900/40 animate-gradient-xy opacity-90"
        />

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-amber-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto font-newspaper relative z-10 pt-4 pb-12"
      >
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-typewriter font-bold text-white mt-8 mb-6 title-effect">
            Academic Achievements
          </h1>

          <p className="text-xl text-slate-300 mt-8 italic font-light">Recognition and awards from various legal competitions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.academicAchievements.map((achievement, index) => {
            const style = accentStyles[achievement.accent ?? "indigo"];
            const Icon = iconCycle[index % iconCycle.length];

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-3xl border backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col transition-all duration-500 hover:-translate-y-2 ${style.card}`}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className={`p-4 rounded-2xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] shrink-0 ${style.iconBg}`}>
                    <Icon className={`w-6 h-6 ${style.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{achievement.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">{achievement.event}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <ImageGrid images={achievement.images} heightClass="h-56 sm:h-64" imageFit="cover" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
