import React, { useState, useEffect, useCallback } from 'react';
import { Pause, Play } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
  autoplayInterval?: number;
  className?: string;
  children?: React.ReactNode;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  autoplayInterval = 6000, // 6 seconds default
  className = '',
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  // Preload images for better performance
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImageLoadStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      };
      img.src = src;
    });
  }, [images]);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoplayActive || isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoplayActive, isHovered, images.length, autoplayInterval]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplayActive(prev => !prev);
  }, []);

  if (images.length === 0) {
    return (
      <div className={`relative min-h-[70vh] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">Không có ảnh để hiển thị</p>
          <p className="text-sm text-slate-300 mt-1">Vui lòng kiểm tra lại đường dẫn ảnh</p>
        </div>
      </div>
    );
  }

  return (
    <section 
      className={`relative min-h-[70vh] sm:min-h-[60vh] flex items-center justify-center text-white overflow-hidden transition-all duration-500 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.6) 50%, rgba(51, 65, 85, 0.5) 100%), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'scroll'
            }}
          />
        ))}
      </div>

      {/* Enhanced gradient overlays for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30"></div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          {/* Autoplay Control */}
          <button
            onClick={toggleAutoplay}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label={isAutoplayActive ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoplayActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Loading indicator for current image */}
      {!imageLoadStates[currentIndex] && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center z-5">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-sm text-slate-300">Đang tải ảnh...</p>
          </div>
        </div>
      )}

      {/* Scroll fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9FAF9] opacity-0 transition-opacity duration-500" id="scroll-overlay"></div>
    </section>
  );
};

export default HeroCarousel;