import { motion } from 'motion/react';
import { Briefcase, Users, Scale, FileText } from 'lucide-react';
import ImageGrid from '../components/ImageGrid';
import { usePortfolioContent } from '../lib/content';
import type { ProfessionalAchievementItem } from '../data/content';

const iconMap: Record<NonNullable<ProfessionalAchievementItem["icon"]>, typeof FileText> = {
  file: FileText,
  scale: Scale,
  users: Users,
  briefcase: Briefcase,
};

export default function ProfessionalExperience() {
  const { content } = usePortfolioContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-16 relative"
    >
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/professional_achievements.jpg')" }}
      />
      <section>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">Professional Experience</h1>
          <p className="text-lg text-slate-400">Roles at Government & Non-Government Organizations.</p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {content.professionalAchievements.map((exp, index) => {
            const Icon = iconMap[exp.icon ?? "file"];

            return (
              <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-300 shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    {exp.period && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <h4 className="text-indigo-400 font-medium mb-3">{exp.organization}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <ImageGrid images={exp.images} heightClass="h-64 sm:h-80" imageFit="cover" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
