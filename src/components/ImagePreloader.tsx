import { useEffect } from 'react';
import { preloadImage } from '@/utils/imageOptimizer';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

/**
 * Component to preload critical images for better performance
 */
const ImagePreloader = ({ images, priority = false }: ImagePreloaderProps) => {
  useEffect(() => {
    const preloadImages = async () => {
      if (priority) {
        // Preload priority images immediately
        for (const image of images) {
          try {
            await preloadImage(image);
          } catch (error) {
            console.warn('Failed to preload priority image:', image, error);
          }
        }
      } else {
        // Preload non-priority images with a slight delay
        setTimeout(() => {
          images.forEach(image => {
            preloadImage(image).catch(error => {
              console.warn('Failed to preload image:', image, error);
            });
          });
        }, 100);
      }
    };

    if (images.length > 0) {
      preloadImages();
    }
  }, [images, priority]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;