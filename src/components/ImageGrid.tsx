import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ImageGridProps {
    images?: string[];
    singleImageAspectRatio?: string;
    heightClass?: string;
    imageFit?: "cover" | "contain";
}

export default function ImageGrid({
    images,
    singleImageAspectRatio = "aspect-auto",
    heightClass = "h-56 sm:h-64",
    imageFit = "cover"
}: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Prevent scrolling when modal is open
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

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* 3D Fixed-Height Masonry Grid */}
            <div
                className={cn("relative w-full mt-6 grid gap-3 perspective-1000", heightClass)}
                style={{
                    gridTemplateColumns: images.length === 1 ? '1fr' : images.length === 2 ? '1fr 1fr' : '2fr 1fr',
                    gridTemplateRows: images.length > 2 ? '1fr 1fr' : '1fr'
                }}
            >
                {images.slice(0, 3).map((src, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative rounded-xl overflow-hidden cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:z-10 group bg-black/20 backdrop-blur-sm",
                            images.length > 2 && idx === 0 ? "row-span-2" : ""
                        )}
                        onClick={() => setSelectedImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Gallery image ${idx + 1}`}
                            className={cn(
                                "w-full h-full transition-transform duration-700 group-hover:scale-110",
                                (images.length === 1 && singleImageAspectRatio === "aspect-auto") ? "object-contain" : `object-${imageFit}`
                            )}
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                if (!target.dataset.fallback) {
                                    target.dataset.fallback = "true";
                                    const seed = src.replace(/[^a-zA-Z0-9]/g, '');
                                    target.src = `https://picsum.photos/seed/${seed}/800/600`;
                                }
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {images.length > 3 && idx === 2 && (
                            <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center backdrop-blur-sm transition-colors group-hover:bg-slate-900/80">
                                <span className="text-white font-bold text-2xl tracking-tight drop-shadow-lg">+{images.length - 2}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {typeof document !== 'undefined' && createPortal(
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
                                    src={selectedImage}
                                    alt="Full size"
                                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-700/50"
                                    decoding="async"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        if (!target.dataset.fallback) {
                                            target.dataset.fallback = "true";
                                            const seed = selectedImage.replace(/[^a-zA-Z0-9]/g, '');
                                            target.src = `https://picsum.photos/seed/${seed}/1200/800`;
                                        }
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
