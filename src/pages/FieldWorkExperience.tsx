import { motion } from 'motion/react';
import { Landmark } from 'lucide-react';
import ImageGrid from '../components/ImageGrid';
import { usePortfolioContent } from '../lib/content';

export default function FieldWorkExperience() {
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
                style={{ backgroundImage: "url('/field_work.jpg')" }}
            />
            <section>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">Field Work Experience</h1>
                    <p className="text-lg text-slate-400">Direct engagement and research initiatives.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.fieldWork.map((work) => (
                        <div key={work.id} className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.15),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                        <Landmark className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg">{work.title}</h3>
                                </div>
                                {work.period && (
                                    <span className="text-xs font-medium text-slate-300 bg-slate-700/50 border border-slate-600/50 px-2 py-1 rounded-md">
                                        {work.period}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">{work.description}</p>
                            <div className="mt-auto">
                                <ImageGrid images={work.images} heightClass="h-56 sm:h-64" imageFit="cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
