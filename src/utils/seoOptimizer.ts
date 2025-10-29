/**
 * SEO Optimizer Utility
 * Provides functions to optimize SEO and Core Web Vitals
 */

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
}

export class SEOOptimizer {
  private static instance: SEOOptimizer;

  static getInstance(): SEOOptimizer {
    if (!SEOOptimizer.instance) {
      SEOOptimizer.instance = new SEOOptimizer();
    }
    return SEOOptimizer.instance;
  }

  /**
   * Update page meta tags for SEO
   */
  updateMetaTags(config: SEOConfig): void {
    // Update title
    document.title = config.title;

    // Update or create meta tags
    const metaTags: MetaTag[] = [
      { name: 'description', content: config.description },
      { name: 'keywords', content: config.keywords || '' },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:url', content: config.url || window.location.href },
      { property: 'og:locale', content: config.locale || 'vi_VN' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
    ];

    if (config.image) {
      metaTags.push(
        { property: 'og:image', content: config.image },
        { name: 'twitter:image', content: config.image }
      );
    }

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.name = tag.name;
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      
      element.content = tag.content;
    });
  }

  /**
   * Add structured data (JSON-LD) to page
   */
  addStructuredData(data: object): void {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(data);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources(resources: string[]): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // Determine resource type
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
        link.as = 'image';
      } else if (resource.match(/\.(woff|woff2|ttf|otf)$/)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize images for better Core Web Vitals
   */
  optimizeImages(): void {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" for images below the fold
      if (!img.hasAttribute('loading')) {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.loading = 'lazy';
        }
      }

      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }

      // Ensure images have proper dimensions to prevent layout shift
      if (!img.width && !img.height && !img.style.width && !img.style.height) {
        console.warn('Image without dimensions detected:', img.src);
      }
    });
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
          
          // Send to analytics if needed
          if (lastEntry.startTime > 2500) {
            console.warn('LCP is slower than recommended (2.5s)');
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const fidEntry = entry as any; // Cast to any for FID properties
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            
            if (fidEntry.processingStart - fidEntry.startTime > 100) {
              console.warn('FID is slower than recommended (100ms)');
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const clsEntry = entry as any; // Cast to any for CLS properties
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          });
          console.log('CLS:', clsValue);
          
          if (clsValue > 0.1) {
            console.warn('CLS is higher than recommended (0.1)');
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    }
  }

  /**
   * Optimize fonts loading
   */
  optimizeFonts(): void {
    // Add font-display: swap to existing font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Add breadcrumb structured data
   */
  addBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): void {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };

    this.addStructuredData(breadcrumbData);
  }

  /**
   * Initialize all SEO optimizations
   */
  initialize(): void {
    // Run optimizations when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.optimizeImages();
        this.optimizeFonts();
        this.monitorCoreWebVitals();
      });
    } else {
      this.optimizeImages();
      this.optimizeFonts();
      this.monitorCoreWebVitals();
    }
  }
}

// Export singleton instance
export const seoOptimizer = SEOOptimizer.getInstance();

// Auto-initialize
seoOptimizer.initialize();