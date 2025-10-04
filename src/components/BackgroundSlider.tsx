import React, { useState, useEffect } from 'react';

interface BackgroundSliderProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ 
  className = '', 
  autoPlay = true, 
  interval = 8000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Danh sách 9 hình ảnh Tà Xùa (thiếu Tà Xùa 2.png)
  const images = [
    '/images/website background/Tà Xùa 1.png',
    '/images/website background/Tà Xùa 3.png',
    '/images/website background/Tà Xùa 4.png',
    '/images/website background/Tà Xùa 5.png',
    '/images/website background/Tà Xùa 6.png',
    '/images/website background/Tà Xùa 7.png',
    '/images/website background/Tà Xùa 8.png',
    '/images/website background/Tà Xùa 9.png',
    '/images/website background/Tà Xùa 10.png',
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            resolve(); // Continue even if image fails to load
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoaded(true); // Still show component even if some images fail
      }
    };

    preloadImages();
  }, []);

  if (!isLoaded) {
    return (
      <div className={`fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60" />
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
      {/* Background Images with Smooth Transitions */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      {/* Hero-inspired Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-slate-900/50" />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white shadow-lg scale-110'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Slide trước"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Slide tiếp theo"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BackgroundSlider;