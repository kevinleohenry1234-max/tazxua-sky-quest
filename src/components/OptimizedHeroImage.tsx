import React, { useState, useEffect } from 'react';

interface OptimizedHeroImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

const OptimizedHeroImage: React.FC<OptimizedHeroImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  style = {},
  onLoad
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    console.error('Failed to load image:', src);
    setImageError(true);
  };

  // Determine which image source to use
  const imageSrc = supportsWebP && webpSrc && !imageError ? webpSrc : src;

  return (
    <div className={`relative ${className}`}>
      {/* Fallback background color - always visible */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-emerald-800/30 to-blue-900/40"
        style={style}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-emerald-800/20 to-blue-900/20 animate-pulse"
          style={style}
        />
      )}
      
      {/* Optimized background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...style,
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll',
        }}
        role="img"
        aria-label={alt}
      />
      
      {/* Preload image */}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="sr-only"
        loading="eager"
        decoding="async"
      />
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/50 text-white p-2 text-xs rounded">
          <div>Image: {imageLoaded ? '✅ Loaded' : imageError ? '❌ Error' : '⏳ Loading'}</div>
          <div>WebP: {supportsWebP ? '✅ Supported' : '❌ Not supported'}</div>
          <div>Source: {imageSrc}</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedHeroImage;