import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getOptimizedImageUrl, preloadImage } from '@/utils/imageOptimizer';
import { trackImageLoad } from '@/utils/performanceMonitor';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onClick?: () => void;
  priority?: boolean; // For above-the-fold images
  quality?: number; // WebP quality
}

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/api/placeholder/400/300',
  onLoad,
  onClick,
  priority = false,
  quality = 0.8
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images start as "in view"
  const [hasError, setHasError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Optimize image source
    const optimizeImage = async () => {
      try {
        const optimized = await getOptimizedImageUrl(src, { quality });
        setOptimizedSrc(optimized);
      } catch (error) {
        console.warn('LazyImage: Image optimization failed, using original:', error);
        setOptimizedSrc(src);
      }
    };

    optimizeImage();
  }, [src, quality]);

  useEffect(() => {
    // Skip intersection observer for priority images
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Preload critical images
  useEffect(() => {
    if (priority && optimizedSrc) {
      preloadImage(optimizedSrc);
    }
  }, [priority, optimizedSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
    
    // Track performance
    const tracker = trackImageLoad(optimizedSrc);
    tracker.onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    
    // Track performance
    const tracker = trackImageLoad(optimizedSrc);
    tracker.onError();
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? placeholder : optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Error state */}
      {hasError && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          Không thể tải ảnh
        </div>
      )}
    </div>
  );
};

export default LazyImage;