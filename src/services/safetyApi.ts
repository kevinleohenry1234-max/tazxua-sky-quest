// Safety API Service - Xử lý tất cả các tương tác API cho hệ thống an toàn
import { toast } from '@/hooks/use-toast';

// Types cho dữ liệu API
export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  alerts?: WeatherAlert[];
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  startTime: string;
  endTime: string;
}

export interface CommunityReport {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  status: 'đã xử lý' | 'đang xử lý';
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  image?: string;
  type: 'safety' | 'infrastructure' | 'environment' | 'emergency';
}

export interface WasteLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  type: 'recycling' | 'general' | 'organic';
  capacity: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Enhanced API call function with better error handling
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.warn(`API returned non-JSON response for ${endpoint}:`, text.substring(0, 200));
      throw new Error(`API returned non-JSON response: ${contentType || 'text/html'}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn(`Network error for ${endpoint}: API server may be unavailable`);
      throw new Error(`Network error: API server unavailable`);
    }
    
    console.warn(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Weather API Functions
export const weatherApi = {
  // Lấy thông tin thời tiết hiện tại
  async getCurrentWeather(): Promise<WeatherData> {
    try {
      return await apiCall<WeatherData>('/weather/current');
    } catch (error) {
      console.info('Weather API unavailable, using fallback data');
      // Return fallback weather data when API is unavailable
      return {
        temperature: 22,
        humidity: 75,
        description: 'Sương mù nhẹ',
        windSpeed: 5,
        visibility: 8,
        pressure: 1013,
        uvIndex: 3,
        alerts: [
          {
            id: 'fog-advisory',
            type: 'advisory',
            title: 'Cảnh báo sương mù',
            description: 'Sương mù có thể ảnh hưởng đến tầm nhìn khi leo núi vào sáng sớm',
            severity: 'low',
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
          }
        ]
      };
    }
  },

  // Lấy dự báo thời tiết
  async getWeatherForecast(): Promise<WeatherData[]> {
    try {
      return await apiCall<WeatherData[]>('/weather/forecast');
    } catch (error) {
      console.info('Weather forecast API unavailable, using fallback data');
      // Return basic forecast fallback data
      const baseWeather = {
        temperature: 20,
        humidity: 70,
        description: 'Có mây',
        windSpeed: 3,
        visibility: 10,
        pressure: 1015,
        uvIndex: 4
      };
      
      return [
        { ...baseWeather, temperature: 22 },
        { ...baseWeather, temperature: 25 },
        { ...baseWeather, temperature: 18 }
      ];
    }
  }
};

// Community Reports API Functions
export const reportsApi = {
  // Gửi báo cáo mới
  async submitReport(reportData: {
    content: string;
    image?: File;
    location?: { lat: number; lng: number };
    type: CommunityReport['type'];
  }): Promise<{ success: boolean; reportId?: string }> {
    try {
      const formData = new FormData();
      formData.append('content', reportData.content);
      formData.append('type', reportData.type);
      
      if (reportData.image) {
        formData.append('image', reportData.image);
      }
      
      if (reportData.location) {
        formData.append('location', JSON.stringify(reportData.location));
      }

      const response = await fetch(`${API_BASE_URL}/report`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      const result = await response.json();
      
      toast({
        title: "Báo cáo đã được gửi thành công",
        description: "Cảm ơn bạn đã đóng góp cho cộng đồng Tà Xùa",
      });

      return { success: true, reportId: result.id };
    } catch (error) {
      console.error('Failed to submit report:', error);
      
      toast({
        title: "Không thể gửi báo cáo",
        description: "Vui lòng kiểm tra kết nối mạng và thử lại",
        variant: "destructive",
      });

      return { success: false };
    }
  },

  // Lấy danh sách báo cáo
  async getReports(limit: number = 20): Promise<CommunityReport[]> {
    try {
      return await apiCall<CommunityReport[]>(`/report?limit=${limit}`);
    } catch (error) {
      console.info('Reports API unavailable, using fallback data');
      // Return fallback community reports when API is unavailable
      return [
        {
          id: '1',
          content: 'Đường lên đỉnh Tà Xùa có đoạn sạt lở nhỏ, cần chú ý khi di chuyển',
          author: 'Nguyễn Văn A',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'đang xử lý',
          type: 'safety',
          location: { lat: 21.3099, lng: 103.7758 }
        },
        {
          id: '2',
          content: 'Phát hiện rác thải nhựa tại khu vực cắm trại, đã dọn dẹp',
          author: 'Trần Thị B',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          status: 'đã xử lý',
          type: 'environment',
          location: { lat: 21.3089, lng: 103.7768 }
        }
      ];
    }
  }
};

// Waste Location API Functions
export const wasteLocationApi = {
  // Tìm điểm bỏ rác gần nhất
  async findNearestWasteLocations(
    lat: number, 
    lng: number, 
    limit: number = 3
  ): Promise<WasteLocation[]> {
    try {
      return await apiCall<WasteLocation[]>(
        `/waste-location?lat=${lat}&lng=${lng}&limit=${limit}`
      );
    } catch (error) {
      console.warn('Waste location API unavailable, using fallback data');
      // Fallback data với tính toán khoảng cách giả lập
      const fallbackLocations: WasteLocation[] = [
        {
          id: '1',
          name: 'Thùng rác tại Trạm Y tế Tà Xùa',
          address: 'Xã Tà Xùa, Bắc Yên, Sơn La',
          lat: 21.3095,
          lng: 103.7755,
          distance: 0.5,
          type: 'general',
          capacity: 'medium',
          lastUpdated: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Điểm thu gom rác tái chế',
          address: 'Bản Phình Hồ, Tà Xùa',
          lat: 21.3105,
          lng: 103.7765,
          distance: 1.2,
          type: 'recycling',
          capacity: 'high',
          lastUpdated: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Thùng rác hữu cơ tại Homestay',
          address: 'Khu vực Homestay Tà Xùa',
          lat: 21.3085,
          lng: 103.7745,
          distance: 0.8,
          type: 'organic',
          capacity: 'low',
          lastUpdated: new Date().toISOString()
        }
      ];

      return fallbackLocations.slice(0, limit);
    }
  },

  // Tạo link Google Maps
  generateGoogleMapsLink(location: WasteLocation): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=walking`;
  }
};

// GPS Utilities
export const gpsUtils = {
  // Lấy vị trí hiện tại
  async getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('GPS Error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Tính khoảng cách giữa 2 điểm (Haversine formula)
  calculateDistance(
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  }
};

// Export tất cả APIs
export default {
  weather: weatherApi,
  reports: reportsApi,
  wasteLocation: wasteLocationApi,
  gps: gpsUtils
};