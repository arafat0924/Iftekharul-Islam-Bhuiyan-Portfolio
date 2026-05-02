import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { usePortfolioContent } from '../lib/content';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, category: string, index: number } | null>(null);
  const { content } = usePortfolioContent();

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto relative"
    >
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/gallery.jpg')" }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect drop-shadow-md">Gallery</h1>
        <p className="text-lg text-slate-400">A visual journey of my academic and professional life.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.gallery.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-slate-700/50 cursor-pointer transition-all duration-300 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] hover:-translate-y-1"
            onClick={() => setSelectedImage({ src: img.src, category: img.category, index })}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = "true";
                  target.src = `https://picsum.photos/seed/${img.category}${index}/600/600`;
                }
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B19]/90 via-[#060B19]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1 drop-shadow-md">{img.category}</span>
              <h3 className="text-white font-medium text-lg drop-shadow-md">{img.alt}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060B19]/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-700/50"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = "true";
                    target.src = `https://picsum.photos/seed/${selectedImage.category}${selectedImage.index}/1200/800`;
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
