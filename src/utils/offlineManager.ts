// Offline Manager - Quản lý trạng thái offline và lưu trữ dữ liệu
export interface WeatherCache {
  temperature: number;
  humidity: number;
  wind: number;
  visibility: number;
  condition: string;
  updatedAt: string;
}

export interface AlertCache {
  id: string;
  level: 'yellow' | 'orange' | 'red';
  title: string;
  description: string;
  action?: string;
}

export interface MapPoint {
  id: string;
  type: 'tram_y_te' | 'don_cong_an' | 'khu_tru_an' | 'khu_nguy_hiem';
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
}

export interface OfflineMeta {
  lastWeatherAt?: string;
  lastAlertsAt?: string;
  lastMapSyncAt?: string;
}

export interface SafetyChecklistState {
  [sectionId: string]: {
    [itemId: string]: boolean;
  };
}

class OfflineManager {
  private dbName = 'viviet_safety_db';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  
  // Connection state
  private isOnline = navigator.onLine;
  private connectionListeners: ((isOnline: boolean) => void)[] = [];
  
  constructor() {
    this.initDB();
    this.setupConnectionListeners();
  }

  // Initialize IndexedDB
  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => {
        console.error('[OfflineManager] IndexedDB error:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('[OfflineManager] IndexedDB initialized successfully');
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create weather_cache object store
        if (!db.objectStoreNames.contains('weather_cache')) {
          const weatherStore = db.createObjectStore('weather_cache');
          console.log('[OfflineManager] Created weather_cache store');
        }
        
        // Create alerts_cache object store
        if (!db.objectStoreNames.contains('alerts_cache')) {
          const alertsStore = db.createObjectStore('alerts_cache');
          console.log('[OfflineManager] Created alerts_cache store');
        }
        
        // Create map_points object store
        if (!db.objectStoreNames.contains('map_points')) {
          const mapStore = db.createObjectStore('map_points', { keyPath: 'id' });
          console.log('[OfflineManager] Created map_points store');
        }
      };
    });
  }

  // Setup connection listeners
  private setupConnectionListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('[OfflineManager] Connection restored');
      this.notifyConnectionChange(true);
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('[OfflineManager] Connection lost');
      this.notifyConnectionChange(false);
    });
  }

  // Add connection listener
  public addConnectionListener(callback: (isOnline: boolean) => void): void {
    this.connectionListeners.push(callback);
  }

  // Remove connection listener
  public removeConnectionListener(callback: (isOnline: boolean) => void): void {
    this.connectionListeners = this.connectionListeners.filter(cb => cb !== callback);
  }

  // Notify connection change
  private notifyConnectionChange(isOnline: boolean): void {
    this.connectionListeners.forEach(callback => callback(isOnline));
  }

  // Get connection status
  public getConnectionStatus(): boolean {
    return this.isOnline;
  }

  // Weather cache methods
  public async cacheWeatherData(data: WeatherCache): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['weather_cache'], 'readwrite');
      const store = transaction.objectStore('weather_cache');
      
      const request = store.put(data, 'latest');
      
      request.onsuccess = () => {
        console.log('[OfflineManager] Weather data cached successfully');
        this.updateOfflineMeta({ lastWeatherAt: new Date().toISOString() });
        resolve();
      };
      
      request.onerror = () => {
        console.error('[OfflineManager] Error caching weather data:', request.error);
        reject(request.error);
      };
    });
  }

  public async getCachedWeatherData(): Promise<WeatherCache | null> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['weather_cache'], 'readonly');
      const store = transaction.objectStore('weather_cache');
      
      const request = store.get('latest');
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = () => {
        console.error('[OfflineManager] Error getting cached weather data:', request.error);
        reject(request.error);
      };
    });
  }

  // Alerts cache methods
  public async cacheAlertsData(alerts: AlertCache[]): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['alerts_cache'], 'readwrite');
      const store = transaction.objectStore('alerts_cache');
      
      const data = {
        alerts,
        updatedAt: new Date().toISOString()
      };
      
      const request = store.put(data, 'latest');
      
      request.onsuccess = () => {
        console.log('[OfflineManager] Alerts data cached successfully');
        this.updateOfflineMeta({ lastAlertsAt: new Date().toISOString() });
        resolve();
      };
      
      request.onerror = () => {
        console.error('[OfflineManager] Error caching alerts data:', request.error);
        reject(request.error);
      };
    });
  }

  public async getCachedAlertsData(): Promise<{ alerts: AlertCache[], updatedAt: string } | null> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['alerts_cache'], 'readonly');
      const store = transaction.objectStore('alerts_cache');
      
      const request = store.get('latest');
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = () => {
        console.error('[OfflineManager] Error getting cached alerts data:', request.error);
        reject(request.error);
      };
    });
  }

  // Map points cache methods
  public async cacheMapPoints(points: MapPoint[]): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['map_points'], 'readwrite');
      const store = transaction.objectStore('map_points');
      
      // Clear existing data
      const clearRequest = store.clear();
      
      clearRequest.onsuccess = () => {
        // Add new points
        let completed = 0;
        const total = points.length;
        
        if (total === 0) {
          this.updateOfflineMeta({ lastMapSyncAt: new Date().toISOString() });
          resolve();
          return;
        }
        
        points.forEach(point => {
          const addRequest = store.add(point);
          
          addRequest.onsuccess = () => {
            completed++;
            if (completed === total) {
              console.log('[OfflineManager] Map points cached successfully');
              this.updateOfflineMeta({ lastMapSyncAt: new Date().toISOString() });
              resolve();
            }
          };
          
          addRequest.onerror = () => {
            console.error('[OfflineManager] Error caching map point:', addRequest.error);
            reject(addRequest.error);
          };
        });
      };
      
      clearRequest.onerror = () => {
        console.error('[OfflineManager] Error clearing map points:', clearRequest.error);
        reject(clearRequest.error);
      };
    });
  }

  public async getCachedMapPoints(): Promise<MapPoint[]> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['map_points'], 'readonly');
      const store = transaction.objectStore('map_points');
      
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => {
        console.error('[OfflineManager] Error getting cached map points:', request.error);
        reject(request.error);
      };
    });
  }

  // LocalStorage methods for lightweight data
  public saveChecklistState(state: SafetyChecklistState): void {
    try {
      localStorage.setItem('safetyChecklistState', JSON.stringify(state));
      console.log('[OfflineManager] Checklist state saved to localStorage');
    } catch (error) {
      console.error('[OfflineManager] Error saving checklist state:', error);
    }
  }

  public getChecklistState(): SafetyChecklistState {
    try {
      const saved = localStorage.getItem('safetyChecklistState');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('[OfflineManager] Error getting checklist state:', error);
      return {};
    }
  }

  public updateOfflineMeta(meta: Partial<OfflineMeta>): void {
    try {
      const current = this.getOfflineMeta();
      const updated = { ...current, ...meta };
      localStorage.setItem('offlineMeta', JSON.stringify(updated));
      console.log('[OfflineManager] Offline meta updated:', updated);
    } catch (error) {
      console.error('[OfflineManager] Error updating offline meta:', error);
    }
  }

  public getOfflineMeta(): OfflineMeta {
    try {
      const saved = localStorage.getItem('offlineMeta');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('[OfflineManager] Error getting offline meta:', error);
      return {};
    }
  }

  // Utility methods
  public async clearAllCache(): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['weather_cache', 'alerts_cache', 'map_points'], 'readwrite');
      
      let completed = 0;
      const stores = ['weather_cache', 'alerts_cache', 'map_points'];
      
      stores.forEach(storeName => {
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        
        request.onsuccess = () => {
          completed++;
          if (completed === stores.length) {
            localStorage.removeItem('safetyChecklistState');
            localStorage.removeItem('offlineMeta');
            console.log('[OfflineManager] All cache cleared');
            resolve();
          }
        };
        
        request.onerror = () => {
          console.error(`[OfflineManager] Error clearing ${storeName}:`, request.error);
          reject(request.error);
        };
      });
    });
  }

  public async getCacheSize(): Promise<{ weather: number, alerts: number, mapPoints: number }> {
    if (!this.db) await this.initDB();
    
    const weather = await this.getCachedWeatherData();
    const alerts = await this.getCachedAlertsData();
    const mapPoints = await this.getCachedMapPoints();
    
    return {
      weather: weather ? 1 : 0,
      alerts: alerts ? alerts.alerts.length : 0,
      mapPoints: mapPoints.length
    };
  }

  // Debug mode for testing
  public setOfflineMode(offline: boolean): void {
    this.isOnline = !offline;
    this.notifyConnectionChange(this.isOnline);
    console.log(`[OfflineManager] Debug mode: ${offline ? 'OFFLINE' : 'ONLINE'}`);
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager();

// Export utility functions
export const isOffline = () => !offlineManager.getConnectionStatus();
export const isOnline = () => offlineManager.getConnectionStatus();

// Format timestamp for display
export const formatCacheTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Không xác định';
  }
};