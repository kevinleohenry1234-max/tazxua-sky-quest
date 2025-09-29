import { autoOptimizeImage, supportsWebP } from './webpConverter';

/**
 * Image optimization utilities
 */

interface OptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'webp' | 'auto';
}

/**
 * Check if WebP is supported by the browser
 */
export async function checkWebPSupport(): Promise<boolean> {
  return supportsWebP();
}

/**
 * Get optimized image URL with WebP conversion if supported
 */
export async function getOptimizedImageUrl(
  src: string, 
  options: OptimizationOptions = {}
): Promise<string> {
  try {
    // Use the auto optimization from webpConverter
    return await autoOptimizeImage(src, options);
  } catch (error) {
    console.warn('Image optimization failed:', error);
    return src; // Return original URL as fallback
  }
}

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(url => preloadImage(url)));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

/**
 * Create responsive image srcset
 */
export const createResponsiveSrcSet = (
  baseUrl: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
};