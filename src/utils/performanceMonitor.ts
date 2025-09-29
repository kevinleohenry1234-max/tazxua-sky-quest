/**
 * Performance monitoring utilities for tracking optimization improvements
 */

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

interface ImageLoadMetrics {
  url: string;
  loadTime: number;
  size?: number;
  format?: string;
}

/**
 * Performance monitor class for tracking various metrics
 */
class PerformanceMonitor {
  private imageMetrics: ImageLoadMetrics[] = [];
  private startTime: number = performance.now();

  /**
   * Get basic page performance metrics
   */
  getPageMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstContentfulPaint: this.getFirstContentfulPaint(),
      largestContentfulPaint: this.getLargestContentfulPaint(),
      cumulativeLayoutShift: this.getCumulativeLayoutShift(),
      firstInputDelay: this.getFirstInputDelay(),
    };
  }

  /**
   * Track image loading performance
   */
  trackImageLoad(url: string, startTime: number, endTime: number, size?: number): void {
    const loadTime = endTime - startTime;
    const format = this.getImageFormat(url);
    
    this.imageMetrics.push({
      url,
      loadTime,
      size,
      format,
    });

    console.log(`Image loaded: ${url} in ${(loadTime || 0).toFixed(2)}ms (${format})`);
  }

  /**
   * Get image loading statistics
   */
  getImageStats(): {
    totalImages: number;
    averageLoadTime: number;
    webpImages: number;
    totalSize: number;
  } {
    const totalImages = this.imageMetrics.length;
    const averageLoadTime = totalImages > 0 
      ? this.imageMetrics.reduce((sum, metric) => sum + metric.loadTime, 0) / totalImages 
      : 0;
    const webpImages = this.imageMetrics.filter(metric => metric.format === 'webp').length;
    const totalSize = this.imageMetrics.reduce((sum, metric) => sum + (metric.size || 0), 0);

    return {
      totalImages,
      averageLoadTime,
      webpImages,
      totalSize,
    };
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const pageMetrics = this.getPageMetrics();
    const imageStats = this.getImageStats();
    
    return `
Performance Report:
==================
Page Load Time: ${Number(pageMetrics.loadTime || 0).toFixed(2)}ms
DOM Content Loaded: ${Number(pageMetrics.domContentLoaded || 0).toFixed(2)}ms
First Contentful Paint: ${Number(pageMetrics.firstContentfulPaint || 0).toFixed(2)}ms
Largest Contentful Paint: ${Number(pageMetrics.largestContentfulPaint || 0).toFixed(2)}ms

Image Statistics:
================
Total Images: ${imageStats.totalImages}
Average Load Time: ${imageStats.averageLoadTime.toFixed(2)}ms
WebP Images: ${imageStats.webpImages}/${imageStats.totalImages} (${((imageStats.webpImages / imageStats.totalImages) * 100).toFixed(1)}%)
Total Size: ${(imageStats.totalSize / 1024).toFixed(2)}KB
    `.trim();
  }

  /**
   * Log performance metrics to console
   */
  logMetrics(): void {
    console.group('🚀 Performance Metrics');
    console.log(this.generateReport());
    console.groupEnd();
  }

  /**
   * Get First Contentful Paint metric
   */
  private getFirstContentfulPaint(): number | undefined {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    return fcpEntry?.startTime;
  }

  /**
   * Get Largest Contentful Paint metric
   */
  private getLargestContentfulPaint(): number | undefined {
    return new Promise<number | undefined>((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry?.startTime);
          observer.disconnect();
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Timeout after 5 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(undefined);
        }, 5000);
      } else {
        resolve(undefined);
      }
    }) as any;
  }

  /**
   * Get Cumulative Layout Shift metric
   */
  private getCumulativeLayoutShift(): number | undefined {
    return new Promise<number | undefined>((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Return CLS value after 5 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 5000);
      } else {
        resolve(undefined);
      }
    }) as any;
  }

  /**
   * Get First Input Delay metric
   */
  private getFirstInputDelay(): number | undefined {
    return new Promise<number | undefined>((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const firstEntry = list.getEntries()[0];
          resolve((firstEntry as any)?.processingStart - firstEntry?.startTime);
          observer.disconnect();
        });
        observer.observe({ entryTypes: ['first-input'] });
        
        // Timeout after 10 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(undefined);
        }, 10000);
      } else {
        resolve(undefined);
      }
    }) as any;
  }

  /**
   * Determine image format from URL
   */
  private getImageFormat(url: string): string {
    if (url.includes('data:image/webp')) return 'webp';
    if (url.includes('.webp')) return 'webp';
    if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpeg';
    if (url.includes('.png')) return 'png';
    if (url.includes('.svg')) return 'svg';
    return 'unknown';
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.imageMetrics = [];
    this.startTime = performance.now();
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Enhanced image load tracking function
 */
export function trackImageLoad(url: string): {
  onLoad: () => void;
  onError: () => void;
} {
  const startTime = performance.now();
  
  return {
    onLoad: () => {
      const endTime = performance.now();
      performanceMonitor.trackImageLoad(url, startTime, endTime);
    },
    onError: () => {
      console.warn(`Failed to load image: ${url}`);
    }
  };
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  // Log metrics when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 1000);
  });

  // Log metrics before page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.logMetrics();
  });
}

export default performanceMonitor;