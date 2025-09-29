/**
 * WebP conversion utilities for automatic image optimization
 */

interface ConversionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Check if the browser supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Convert image to WebP format using Canvas API
 */
export async function convertToWebP(
  imageUrl: string, 
  options: ConversionOptions = {}
): Promise<string> {
  const { quality = 0.8, maxWidth, maxHeight } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate dimensions
        let { width, height } = img;
        
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and convert
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP
        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(webpDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}

/**
 * Batch convert multiple images to WebP
 */
export async function batchConvertToWebP(
  imageUrls: string[],
  options: ConversionOptions = {}
): Promise<{ url: string; webp: string }[]> {
  const results = await Promise.allSettled(
    imageUrls.map(async (url) => ({
      url,
      webp: await convertToWebP(url, options)
    }))
  );

  return results
    .filter((result): result is PromiseFulfilledResult<{ url: string; webp: string }> => 
      result.status === 'fulfilled'
    )
    .map(result => result.value);
}

/**
 * Create a WebP cache for frequently used images
 */
class WebPCache {
  private cache = new Map<string, string>();
  private maxSize = 50; // Maximum number of cached images

  async get(url: string, options?: ConversionOptions): Promise<string> {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const webpUrl = await convertToWebP(url, options);
      
      // Manage cache size
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      
      this.cache.set(cacheKey, webpUrl);
      return webpUrl;
    } catch (error) {
      console.warn('WebP conversion failed for:', url, error);
      return url; // Return original URL as fallback
    }
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const webpCache = new WebPCache();

/**
 * Automatically optimize image based on browser support and file size
 */
export async function autoOptimizeImage(
  url: string,
  options: ConversionOptions = {}
): Promise<string> {
  try {
    // Check WebP support
    const hasWebPSupport = await supportsWebP();
    
    if (!hasWebPSupport) {
      return url; // Return original if WebP not supported
    }

    // Use cache for optimization
    return await webpCache.get(url, options);
  } catch (error) {
    console.warn('Auto optimization failed:', error);
    return url;
  }
}