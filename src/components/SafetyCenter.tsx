import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  AlertTriangle,
  Phone,
  Shield,
  Heart,
  MapPin,
  Download,
  Filter,
  RefreshCw,
  Clock,
  Navigation,
  Users,
  MessageSquare,
  Send,
  CheckCircle,
  Star,
  Calendar,
  Zap,
  Target,
  FileText,
  ExternalLink,
  WifiOff,
  Database
} from 'lucide-react';
import { loadGoogleMaps } from '@/utils/googleMapsLoader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { offlineManager } from '@/utils/offlineManager';
import OfflineNotification from '@/components/OfflineNotification';
import ConnectionStatusChip from '@/components/ConnectionStatusChip';
import FallbackMap from '@/components/FallbackMap';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import offlineHandbook from '@/data/offlineHandbook.json';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  lastUpdated: string;
}

interface AlertData {
  id: string;
  level: 'yellow' | 'orange' | 'red';
  title: string;
  description: string;
  action?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'medical' | 'police' | 'rescue';
  status: 'available' | 'busy' | 'offline';
}

interface ChecklistItem {
  id: string;
  text: string;
  category: 'before' | 'during' | 'gear';
  completed: boolean;
}

interface LocalTip {
  id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
}

interface SafetyLocation {
  id: string;
  name: string;
  address: string;
  type: 'medical' | 'police' | 'shelter' | 'danger';
  lat: number;
  lng: number;
  phone?: string;
  status?: 'open' | 'closed' | 'emergency';
}

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: 'warning' | 'tip' | 'update';
  image?: string;
  timestamp: string;
  likes: number;
}

// Extend the global Window interface
declare global {
  interface Window {
    google: any;
  }
}

const SafetyCenter: React.FC = () => {
  // Animation hooks
  const weatherAnimation = useScrollAnimation();
  const checklistAnimation = useScrollAnimation();
  const mapAnimation = useScrollAnimation();
  const communityAnimation = useScrollAnimation();

  // Offline state management
  const [isOffline, setIsOffline] = useState(!offlineManager.getConnectionStatus());
  const [isDebugOffline, setIsDebugOffline] = useState(false);
  const [cachedWeatherData, setCachedWeatherData] = useState<WeatherData | null>(null);
  const [cachedAlerts, setCachedAlerts] = useState<AlertData[]>([]);
  const [cachedMapPoints, setCachedMapPoints] = useState<any[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Weather data state
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 18,
    feelsLike: 16,
    humidity: 85,
    windSpeed: 12,
    visibility: 8,
    condition: 'cloudy',
    lastUpdated: '10 phút trước'
  });

  // Alerts state
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      level: 'yellow',
      title: 'Sương mù dày đặc',
      description: 'Tầm nhìn hạn chế dưới 50m từ 5:00-8:00 sáng',
      action: 'Hoãn di chuyển sớm'
    },
    {
      id: '2',
      level: 'orange',
      title: 'Gió mạnh cấp 6',
      description: 'Gió Tây Nam 40-50km/h, giật cấp 8 từ 14:00-18:00',
      action: 'Tránh leo núi cao'
    }
  ]);

  // Emergency contacts
  const [emergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Trạm Y tế Tà Xùa', phone: '0274.3871.234', type: 'medical', status: 'available' },
    { id: '2', name: 'Công an Huyện Bắc Yên', phone: '0274.3871.113', type: 'police', status: 'available' },
    { id: '3', name: 'Đội Cứu hộ Sơn La', phone: '0212.3856.115', type: 'rescue', status: 'available' },
    { id: '4', name: 'Hướng dẫn viên Tà Xùa', phone: '090.394.6185', type: 'rescue', status: 'available' }
  ]);

  // Emergency form state
  const [emergencyForm, setEmergencyForm] = useState({
    name: '',
    phone: '',
    situation: '',
    location: ''
  });

  // Community posts
  const [communityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      title: 'Cập nhật tuyến đường mới an toàn hơn',
      content: 'Tuyến đường mới qua Bản Ít đã được tu sửa, an toàn hơn cho việc di chuyển bằng xe máy.',
      author: 'Ban quản lý Tà Xùa',
      date: '2 giờ trước',
      type: 'update',
      image: '/images/new-route.jpg',
      timestamp: '2 giờ trước',
      likes: 12
    },
    {
      id: '2',
      title: 'Tránh di chuyển khi gió mạnh tại Khu A',
      content: 'Khu vực đỉnh Phu Sang có gió mạnh từ 14:00-18:00 hôm nay. Khuyến cáo hoãn lịch leo núi.',
      author: 'Đội cứu hộ địa phương',
      date: '1 giờ trước',
      type: 'warning',
      timestamp: '1 giờ trước',
      likes: 8
    },
    {
      id: '3',
      title: 'Mẹo giữ ấm khi ngủ trời lạnh',
      content: 'Đặt chai nước nóng trong túi ngủ 30 phút trước khi ngủ để giữ ấm cả đêm.',
      author: 'Cộng đồng ViViet',
      date: '3 giờ trước',
      type: 'tip',
      timestamp: '3 giờ trước',
      likes: 15
    }
  ]);

  // Checklist items
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Kiểm tra dự báo thời tiết 24h', category: 'before', completed: false },
    { id: '2', text: 'Thông báo lịch trình cho người thân', category: 'before', completed: false },
    { id: '3', text: 'Chuẩn bị thuốc cá nhân', category: 'before', completed: false },
    { id: '4', text: 'Giữ liên lạc định kỳ mỗi 2 giờ', category: 'during', completed: false },
    { id: '5', text: 'Không đi một mình vào rừng sâu', category: 'during', completed: false },
    { id: '6', text: 'Đèn pin + pin dự phòng', category: 'gear', completed: false },
    { id: '7', text: 'Áo mưa và quần áo ấm', category: 'gear', completed: false },
    { id: '8', text: 'Thực phẩm khô và nước uống', category: 'gear', completed: false }
  ]);

  // Local tips
  const [localTips] = useState<LocalTip[]>([
    {
      id: '1',
      title: 'Thời điểm tốt nhất để leo núi',
      content: 'Từ 6:00-10:00 sáng và 15:00-17:00 chiều, tránh thời gian có sương mù dày.',
      author: 'Hướng dẫn viên địa phương',
      image: '🌄'
    },
    {
      id: '2',
      title: 'Nhận biết đường đi an toàn',
      content: 'Đi theo đường mòn có dấu hiệu người đi thường xuyên, tránh đường mới mở.',
      author: 'Đội cứu hộ Tà Xùa',
      image: '🥾'
    },
    {
      id: '3',
      title: 'Xử lý khi gặp động vật hoang dã',
      content: 'Giữ khoảng cách, không chạy, từ từ lùi lại và tạo tiếng động nhẹ.',
      author: 'Kiểm lâm Sơn La',
      image: '🐻'
    }
  ]);

  // Safety locations for map
  const [safetyLocations] = useState<SafetyLocation[]>([
    { id: '1', name: 'Trạm Y tế Tà Xùa', address: 'Bản Áng, Tà Xùa', type: 'medical', lat: 21.3099, lng: 103.6137, phone: '0274.3871.234', status: 'open' },
    { id: '2', name: 'Công an Huyện Bắc Yên', address: 'Thị trấn Bắc Yên', type: 'police', lat: 21.2845, lng: 103.6234, phone: '0274.3871.113', status: 'open' },
    { id: '3', name: 'Nhà nghỉ An toàn Tà Xùa', address: 'Bản Ít, Tà Xùa', type: 'shelter', lat: 21.3156, lng: 103.6089, phone: '090.394.6185', status: 'open' },
    { id: '4', name: 'Khu vực nguy hiểm - Vách đá dựng', address: 'Đỉnh Phu Sang', type: 'danger', lat: 21.3234, lng: 103.6045 }
  ]);

  // Functions
  const refreshWeatherData = async () => {
    if (isOffline || isDebugOffline) {
      // Load from cache when offline
      const cached = await offlineManager.getCachedWeatherData();
      if (cached) {
        // Convert cached data to WeatherData format
        const weatherFromCache: WeatherData = {
          temperature: cached.temperature,
          feelsLike: cached.temperature - 2, // Approximate feels like
          humidity: cached.humidity,
          windSpeed: cached.wind,
          visibility: cached.visibility,
          condition: cached.condition as 'sunny' | 'cloudy' | 'rainy',
          lastUpdated: `Đã lưu lúc ${new Date(cached.updatedAt).toLocaleTimeString('vi-VN')}`
        };
        setWeatherData(weatherFromCache);
        // Don't set cached data to state, just keep it for reference
      }
      return;
    }

    try {
      // Simulate API call
      const newData: WeatherData = {
        ...weatherData,
        lastUpdated: 'Vừa xong',
        temperature: weatherData.temperature + Math.floor(Math.random() * 3) - 1
      };
      setWeatherData(newData);
      
      // Convert to cache format and cache the data
      const cacheData: import('@/utils/offlineManager').WeatherCache = {
        temperature: newData.temperature,
        humidity: newData.humidity,
        wind: newData.windSpeed,
        visibility: newData.visibility,
        condition: newData.condition,
        updatedAt: new Date().toISOString()
      };
      await offlineManager.cacheWeatherData(cacheData);
    } catch (error) {
      console.error('Failed to refresh weather data:', error);
    }
  };

  const syncDataWhenOnline = async () => {
    if (isOffline || isDebugOffline) return;

    try {
      // Refresh weather data
      await refreshWeatherData();
      
      // Simulate alerts API call and cache
      const alertsData = alerts.map(alert => ({
        id: alert.id,
        level: alert.level,
        title: alert.title,
        description: alert.description,
        action: alert.action
      }));
      await offlineManager.cacheAlertsData(alertsData);
      setCachedAlerts(alertsData);

      // Cache map points from current safetyLocations
      const points: import('@/utils/offlineManager').MapPoint[] = safetyLocations.map(loc => ({
        id: loc.id,
        name: loc.name,
        address: loc.address,
        type: loc.type === 'medical' ? 'tram_y_te' as const :
              loc.type === 'police' ? 'don_cong_an' as const :
              loc.type === 'shelter' ? 'khu_tru_an' as const : 'khu_nguy_hiem' as const,
        lat: loc.lat,
        lng: loc.lng,
        phone: loc.phone || undefined
      }));
      await offlineManager.cacheMapPoints(points);
      
      // Update sync time
      const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(now);
      
      // Show success toast
      // This would be implemented with a toast library

    } catch (error) {
      console.error('Sync failed:', error);
      // Show error toast

    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      
      // Save to localStorage for offline persistence
      const checklistState = updated.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = {};
        acc[item.category][item.id] = item.completed;
        return acc;
      }, {} as any);
      
      offlineManager.saveChecklistState(checklistState);
      return updated;
    });
  };

  const handleEmergencySubmit = () => {
    // Simulate emergency request
    alert('Yêu cầu khẩn cấp đã được gửi! Đội cứu hộ sẽ liên hệ trong vòng 5 phút.');
    setEmergencyForm({ name: '', phone: '', situation: '', location: '' });
  };

  const sendGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        alert(`Định vị GPS đã được gửi: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      });
    }
  };

  const downloadChecklistPDF = () => {
    // Simulate PDF download
    alert('Đang tải xuống bản checklist PDF...');
  };

  // Helper functions
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'yellow': return 'border-yellow-400 bg-yellow-50';
      case 'orange': return 'border-orange-400 bg-orange-50';
      case 'red': return 'border-red-400 bg-red-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'before': return 'Trước khi khởi hành';
      case 'during': return 'Trong quá trình di chuyển';
      case 'gear': return 'Trang bị cần thiết';
      default: return category;
    }
  };

  // Connection status and offline functionality
  useEffect(() => {
    // Check for debug offline mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('offline') === '1') {
      setIsDebugOffline(true);
      offlineManager.setOfflineMode(true);
    } else if (urlParams.get('offline') === '0') {
      setIsDebugOffline(false);
      offlineManager.setOfflineMode(false);
    }

    // Listen for connection changes
    const handleConnectionChange = (isOnline: boolean) => {
      setIsOffline(!isOnline);
      if (isOnline && !isDebugOffline) {
        // Sync data when coming back online
        syncDataWhenOnline();
      }
    };

    offlineManager.addConnectionListener(handleConnectionChange);
    
    // Load cached data on component mount
    const loadCachedData = async () => {
      if (isOffline || isDebugOffline) {
        // Load cached weather
        const cachedWeather = await offlineManager.getCachedWeatherData();
        if (cachedWeather) {
          const weatherFromCache: WeatherData = {
            temperature: cachedWeather.temperature,
            feelsLike: cachedWeather.temperature - 2,
            humidity: cachedWeather.humidity,
            windSpeed: cachedWeather.wind,
            visibility: cachedWeather.visibility,
            condition: cachedWeather.condition as 'sunny' | 'cloudy' | 'rainy',
            lastUpdated: `Đã lưu lúc ${new Date(cachedWeather.updatedAt).toLocaleTimeString('vi-VN')}`
          };
          setWeatherData(weatherFromCache);
        }

        // Load cached alerts
        const cachedAlertsData = await offlineManager.getCachedAlertsData();
        if (cachedAlertsData) {
          setCachedAlerts(cachedAlertsData.alerts);
        }

        // Load cached map points
        const cachedPoints = await offlineManager.getCachedMapPoints();
        setCachedMapPoints(cachedPoints);
      }
    };

    loadCachedData();

    return () => {
      offlineManager.removeConnectionListener(handleConnectionChange);
    };
  }, [isDebugOffline]);

  // Google Maps integration
  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMaps();
        
        const mapElement = document.getElementById('safety-map');
        if (mapElement && window.google && window.google.maps && window.google.maps.Map) {
          const map = new window.google.maps.Map(mapElement, {
            center: { lat: 21.3099, lng: 103.6137 },
            zoom: 13,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Add markers for safety locations
          safetyLocations.forEach(location => {
            if (!window.google?.maps?.Marker) return;
            
            const marker = new window.google.maps.Marker({
              position: { lat: location.lat, lng: location.lng },
              map: map,
              title: location.name,
              icon: {
                url: location.type === 'danger' ? 
                  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#ef4444"/>
                      <path d="M12 8v4M12 16h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  `) :
                  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#15803d"/>
                      <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  `),
                scaledSize: window.google.maps.Size ? new window.google.maps.Size(24, 24) : undefined
              }
            });

            if (window.google?.maps?.InfoWindow) {
              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div class="p-2">
                    <h3 class="font-bold text-sm">${location.name}</h3>
                    <p class="text-xs text-gray-600">${location.address}</p>
                    ${location.phone ? `<p class="text-xs text-blue-600">${location.phone}</p>` : ''}
                    ${location.type === 'danger' ? 
                      '<p class="text-xs text-red-600 font-medium">⚠️ Khu vực nguy hiểm</p>' : 
                      '<p class="text-xs text-green-600 font-medium">✅ An toàn</p>'
                    }
                  </div>
                `
              });

              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });
            }
          });
        } else {
          console.warn('Google Maps API not fully loaded or Map constructor not available');
          // Fallback: Show a simple message in the map container
          const mapElement = document.getElementById('safety-map');
          if (mapElement) {
            mapElement.innerHTML = `
              <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                <div class="text-center p-4">
                  <MapPin class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p class="text-gray-600 text-sm">Bản đồ đang được tải...</p>
                  <p class="text-gray-500 text-xs mt-1">Vui lòng kiểm tra kết nối mạng</p>
                </div>
              </div>
            `;
          }
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        // Fallback UI for map loading error
        const mapElement = document.getElementById('safety-map');
        if (mapElement) {
          mapElement.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div class="text-center p-4">
                <MapPin class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p class="text-gray-600 text-sm">Không thể tải bản đồ</p>
                <p class="text-gray-500 text-xs mt-1">Vui lòng thử lại sau</p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();
  }, [safetyLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#fefbf6] to-[#f0fdf4] py-8">
      {/* Offline Notification */}
      <OfflineNotification />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Section with Connection Status */}
        <div className="relative bg-gradient-to-r from-[#0E4F45] via-[#15803d] to-[#059669] rounded-2xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold font-playfair mb-2">
                  Trung Tâm An Toàn Tà Xùa
                </h1>
                <p className="text-xl text-green-100">
                  Hệ thống giám sát và hỗ trợ an toàn toàn diện
                </p>
              </div>
              <ConnectionStatusChip className="shrink-0" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">Giám sát 24/7</h3>
                <p className="text-sm text-green-100">Theo dõi thời tiết và cảnh báo</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Heart className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">Hỗ trợ khẩn cấp</h3>
                <p className="text-sm text-green-100">Liên hệ cứu hộ nhanh chóng</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">Cộng đồng</h3>
                <p className="text-sm text-green-100">Chia sẻ kinh nghiệm an toàn</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 1. Dynamic Weather & Alerts Section */}
        <div 
          id="weather-alerts-section"
          className={`transition-all duration-1000 ${weatherAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          ref={weatherAnimation.elementRef as React.RefObject<HTMLDivElement>}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 3D Weather Widget */}
            <Card className="border-[#15803d]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#15803d]/40 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  {getWeatherIcon(weatherData.condition)}
                  Bản Tin Thời Tiết Trực Quan
                  {(isOffline || isDebugOffline) && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                      <Database className="w-3 h-3 mr-1" />
                      Ngoại tuyến
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {(isOffline || isDebugOffline) ? (
                    <span className="text-gray-500">
                      {weatherData.lastUpdated}
                    </span>
                  ) : (
                    <>
                      Cập nhật {weatherData.lastUpdated}
                      <Button 
                        onClick={refreshWeatherData}
                        variant="ghost" 
                        size="sm"
                        className="ml-auto p-1 h-auto hover:bg-blue-100"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Temperature Display */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#1f2937] mb-2">
                    {weatherData.temperature}°C
                  </div>
                  <div className="text-sm text-gray-600">
                    Cảm giác như {weatherData.feelsLike}°C
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">Độ ẩm</span>
                    </div>
                    <div className="text-lg font-bold text-[#1f2937]">{weatherData.humidity}%</div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">Gió</span>
                    </div>
                    <div className="text-lg font-bold text-[#1f2937]">{weatherData.windSpeed} km/h</div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">Tầm nhìn</span>
                    </div>
                    <div className="text-lg font-bold text-[#1f2937]">{weatherData.visibility} km</div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">Điều kiện</span>
                    </div>
                    <div className="text-sm font-bold text-[#1f2937] capitalize">
                      {weatherData.condition === 'sunny' ? 'Nắng' : 
                       weatherData.condition === 'cloudy' ? 'Nhiều mây' : 'Mưa'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Alert System */}
            <Card className="border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <Zap className="w-8 h-8 text-amber-600" />
                  Cảnh Báo Quan Trọng
                  {(isOffline || isDebugOffline) && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                      <Database className="w-3 h-3 mr-1" />
                      Ngoại tuyến
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <Alert key={alert.id} className={`${getAlertColor(alert.level)} border-l-4`}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-semibold text-[#1f2937]">{alert.title}</div>
                          <div className="text-sm text-gray-700">{alert.description}</div>
                          {alert.action && (
                            <div className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                              💡 {alert.action}
                            </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {(isOffline || isDebugOffline) ? (
                      <div className="space-y-2">
                        <WifiOff className="w-12 h-12 text-gray-400 mx-auto" />
                        <p>Chưa có cảnh báo đã lưu để hiển thị ngoại tuyến.</p>
                        <p className="text-xs">Kết nối mạng để cập nhật cảnh báo mới nhất.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <p>Hiện tại không có cảnh báo nào</p>
                        <p className="text-xs">Tình hình an toàn ổn định</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 2. Smart Safety Checklist Section */}
        <div 
          id="safety-checklist-section"
          className={`transition-all duration-1000 delay-200 ${checklistAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          ref={checklistAnimation.elementRef as React.RefObject<HTMLDivElement>}
        >
          <Card className="border-[#15803d]/20 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-[#15803d]" />
                  Danh Sách An Toàn Thông Minh
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={downloadChecklistPDF}
                    variant="outline"
                    size="sm"
                    className="border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white font-inter"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {['before', 'during', 'gear'].map((category) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-[#15803d] text-lg border-b border-[#15803d]/20 pb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {getCategoryTitle(category)}
                  </h3>
                  <div className="space-y-2">
                    {checklistItems
                      .filter(item => item.category === category)
                      .map((item) => (
                        <div 
                          key={item.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md ${
                            item.completed 
                              ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleChecklistItem(item.id)}
                        >
                          <Checkbox 
                            checked={item.completed}
                            onChange={() => toggleChecklistItem(item.id)}
                            className="data-[state=checked]:bg-[#15803d] data-[state=checked]:border-[#15803d]"
                          />
                          <label 
                            className={`flex-1 text-sm cursor-pointer transition-all duration-300 ${
                              item.completed 
                                ? 'text-green-700 line-through' 
                                : 'text-gray-700 hover:text-[#15803d]'
                            }`}
                          >
                            {item.text}
                          </label>
                          {item.completed && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Local Tips Section */}
              <div className="border-t border-[#15803d]/20 pt-6">
                <h3 className="font-semibold text-[#15803d] text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Mẹo Hay Từ Địa Phương
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {localTips.map((tip) => (
                    <div key={tip.id} className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      {tip.image && (
                        <div className="w-full h-24 bg-gradient-to-r from-amber-100 to-orange-100 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-2xl">{tip.image}</span>
                        </div>
                      )}
                      <h4 className="font-semibold text-[#1f2937] text-sm mb-2">{tip.title}</h4>
                      <p className="text-xs text-gray-700 mb-2">{tip.content}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span className="text-xs text-gray-600">Từ {tip.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Interactive Safety Map Section */}
        <div 
          className={`transition-all duration-1000 delay-400 ${mapAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          ref={mapAnimation.elementRef as React.RefObject<HTMLDivElement>}
        >
          <Card className="border-[#15803d]/20 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#15803d]" />
                Bản Đồ An Toàn Tương Tác
              </CardTitle>
              <p className="text-sm text-gray-600 font-inter">
                Xem vị trí các trạm cứu hộ, khu vực nguy hiểm và đường đi an toàn
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Map Container */}
              <div className="relative">
                {(isOffline || isDebugOffline) ? (
                  <FallbackMap 
                    mapPoints={safetyLocations.map(loc => ({
                      id: loc.id,
                      name: loc.name,
                      address: loc.address,
                      type: loc.type === 'medical' ? 'tram_y_te' : 
                            loc.type === 'police' ? 'don_cong_an' :
                            loc.type === 'shelter' ? 'khu_tru_an' : 'khu_nguy_hiem',
                      lat: loc.lat,
                      lng: loc.lng,
                      phone: loc.phone
                    }))}
                    className="w-full h-[400px] rounded-lg border border-[#15803d]/20"
                  />
                ) : (
                  <div 
                    id="safety-map" 
                    className="w-full h-[400px] rounded-lg border border-[#15803d]/20 bg-gray-100"
                  ></div>
                )}
                
                {/* Map Legend */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                  <h4 className="font-semibold text-sm mb-2 text-[#1f2937]">Chú thích</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Trạm cứu hộ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Khu vực nguy hiểm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div id="emergency-contacts-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="bg-white/80 backdrop-blur-sm border border-[#15803d]/20 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        contact.type === 'medical' ? 'bg-red-100 text-red-600' :
                        contact.type === 'police' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {contact.type === 'medical' ? <Heart className="w-4 h-4" /> :
                         contact.type === 'police' ? <Shield className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        contact.status === 'available' ? 'bg-green-500' :
                        contact.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <h4 className="font-semibold text-[#1f2937] text-sm mb-1">{contact.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{contact.phone}</p>
                    <Button 
                      onClick={() => window.open(`tel:${contact.phone}`)}
                      size="sm"
                      className="w-full bg-[#15803d] hover:bg-[#15803d]/90 text-white font-inter py-1 text-xs"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Gọi ngay
                    </Button>
                  </div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => window.open('tel:115')}
                  className="bg-red-600 hover:bg-red-700 text-white font-inter py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Gọi Cứu Hộ (115)
                </Button>
                <Button 
                  onClick={sendGPSLocation}
                  variant="outline"
                  className="border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white font-inter py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Gửi Định Vị GPS
                </Button>
                <Button 
                  onClick={() => window.open('https://maps.google.com/maps?q=21.3099,103.6137', '_blank')}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-inter py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Đường An Toàn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. Emergency Response & Community Support Section */}
        <div 
          className={`transition-all duration-1000 delay-600 ${communityAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          ref={communityAnimation.elementRef as React.RefObject<HTMLDivElement>}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Emergency Response Form */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  Trợ Giúp Khẩn Cấp
                </CardTitle>
                <p className="text-sm text-gray-600 font-inter">
                  Gửi yêu cầu hỗ trợ khẩn cấp với định vị GPS tự động
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Họ và tên
                    </label>
                    <Input
                      placeholder="Nhập họ tên của bạn"
                      value={emergencyForm.name}
                      onChange={(e) => setEmergencyForm(prev => ({ ...prev, name: e.target.value }))}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Số điện thoại
                    </label>
                    <Input
                      placeholder="Số điện thoại liên lạc"
                      value={emergencyForm.phone}
                      onChange={(e) => setEmergencyForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tình huống khẩn cấp
                    </label>
                    <Textarea
                      placeholder="Mô tả chi tiết tình huống và vị trí hiện tại..."
                      value={emergencyForm.situation}
                      onChange={(e) => setEmergencyForm(prev => ({ ...prev, situation: e.target.value }))}
                      className="border-red-200 focus:border-red-400 focus:ring-red-400 min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-800 text-sm font-medium mb-2">
                    <Navigation className="w-4 h-4" />
                    Định vị GPS sẽ được gửi kèm
                  </div>
                  <div className="text-xs text-red-700">
                    Thông tin vị trí của bạn sẽ được gửi tự động để hỗ trợ cứu hộ nhanh chóng
                  </div>
                </div>
                
                <Button 
                  onClick={handleEmergencySubmit}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-inter py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!emergencyForm.name || !emergencyForm.situation}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Gửi Yêu Cầu Khẩn Cấp
                </Button>
                
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">Hoặc gọi trực tiếp:</div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => window.open('tel:115')}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Cứu hộ 115
                    </Button>
                    <Button 
                      onClick={() => window.open('tel:113')}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Công an 113
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Support Feed */}
            <Card className="border-[#15803d]/20 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <Users className="w-8 h-8 text-[#15803d]" />
                  Cộng Đồng Hỗ Trợ
                </CardTitle>
                <p className="text-sm text-gray-600 font-inter">
                  Cập nhật mới nhất từ cộng đồng du lịch Tà Xùa
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="bg-white/80 backdrop-blur-sm border border-[#15803d]/20 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#15803d] to-[#22c55e] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-[#1f2937] text-sm">{post.author}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                post.type === 'warning' ? 'border-red-300 text-red-700 bg-red-50' :
                                post.type === 'tip' ? 'border-blue-300 text-blue-700 bg-blue-50' :
                                'border-green-300 text-green-700 bg-green-50'
                              }`}
                            >
                              {post.type === 'warning' ? '⚠️ Cảnh báo' : 
                               post.type === 'tip' ? '💡 Mẹo hay' : '✅ Cập nhật'}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-[#1f2937] text-sm mb-2">{post.title}</h4>
                          <p className="text-xs text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.timestamp}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {post.likes} thích
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-[#15803d] hover:text-[#15803d] hover:bg-[#15803d]/10 p-1 h-auto"
                            >
                              <Star className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white font-inter"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Xem Thêm Cập Nhật
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SafetyCenter;