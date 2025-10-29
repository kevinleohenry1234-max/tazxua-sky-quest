// Google Maps API Loader Utility
// Đảm bảo Google Maps API chỉ được load một lần duy nhất

interface GoogleMapsLoaderOptions {
  apiKey?: string;
  libraries?: string[];
  callback?: () => void;
}

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private isLoading = false;
  private isLoaded = false;
  private callbacks: (() => void)[] = [];
  private script: HTMLScriptElement | null = null;

  private constructor() {}

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  public async load(options: GoogleMapsLoaderOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      // Nếu đã load thành công
      if (this.isLoaded && window.google?.maps) {
        if (options.callback) options.callback();
        resolve();
        return;
      }

      // Thêm callback vào queue
      const wrappedCallback = () => {
        if (options.callback) options.callback();
        resolve();
      };
      this.callbacks.push(wrappedCallback);

      // Nếu đang load, chờ
      if (this.isLoading) {
        return;
      }

      // Kiểm tra xem script đã tồn tại chưa
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript && window.google?.maps) {
        this.isLoaded = true;
        this.executeCallbacks();
        return;
      }

      // Bắt đầu load
      this.isLoading = true;
      
      const {
        apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries = ['places']
      } = options;

      // Tạo script element
      this.script = document.createElement('script');
      
      // Validate API key
      if (!apiKey || apiKey.trim() === '') {
        console.error('Google Maps API key is missing or empty');
        reject(new Error('Google Maps API key is required'));
        return;
      }

      this.script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&v=3.55&loading=async`;
      this.script.async = true;
      this.script.defer = true;

      // Xử lý khi load thành công
      this.script.onload = () => {
        this.isLoading = false;
        
        // Kiểm tra xem Google Maps đã sẵn sàng chưa
        if (window.google?.maps) {
          this.isLoaded = true;

          this.executeCallbacks();
        } else {
          // Đợi một chút để Google Maps khởi tạo
          setTimeout(() => {
            if (window.google?.maps) {
              this.isLoaded = true;

              this.executeCallbacks();
            } else {
              console.error('Google Maps API loaded but not available');
              reject(new Error('Google Maps API loaded but not available'));
            }
          }, 100);
        }
      };

      // Xử lý khi load thất bại
      this.script.onerror = () => {
        this.isLoading = false;
        console.error('Failed to load Google Maps API');
        reject(new Error('Failed to load Google Maps API'));
      };

      // Thêm script vào document
      document.head.appendChild(this.script);
    });
  }

  private executeCallbacks(): void {
    this.callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error executing Google Maps callback:', error);
      }
    });
    this.callbacks = [];
  }

  public isGoogleMapsLoaded(): boolean {
    return this.isLoaded && !!window.google?.maps;
  }

  public cleanup(): void {
    if (this.script && this.script.parentNode) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }
    this.isLoading = false;
    this.isLoaded = false;
    this.callbacks = [];
  }
}

// Export singleton instance
export const googleMapsLoader = GoogleMapsLoader.getInstance();

// Export convenience function
export const loadGoogleMaps = (options?: GoogleMapsLoaderOptions): Promise<void> => {
  return googleMapsLoader.load(options);
};

// Export type check function
export const isGoogleMapsAvailable = (): boolean => {
  return googleMapsLoader.isGoogleMapsLoaded();
};