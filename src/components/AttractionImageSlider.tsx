import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

interface AttractionImageSliderProps {
  images: string[];
  attractionName: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const AttractionImageSlider: React.FC<AttractionImageSliderProps> = ({
  images,
  attractionName,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`relative h-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-600 font-inter">Không có hình ảnh</span>
      </div>
    );
  }

  return (
    <div 
      className={`relative h-48 rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <LazyImage
          src={images[currentIndex]}
          alt={`${attractionName} - Hình ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Attraction Name */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-playfair text-xl font-bold mb-1">{attractionName}</h3>
          <p className="font-inter text-sm opacity-90">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Play/Pause Button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Loading Indicator - Simplified version without Date.now() */}
      {isPlaying && images.length > 1 && (
        <div className="absolute top-0 left-0 h-1 bg-white/30 w-full">
          <div 
            className="h-full bg-white animate-pulse"
          />
        </div>
      )}
    </div>
  );
};

export default AttractionImageSlider;