import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
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
  Filter
} from 'lucide-react';
import { loadGoogleMaps } from '@/utils/googleMapsLoader';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'medical' | 'police' | 'rescue';
}

interface ChecklistItem {
  id: string;
  text: string;
  category: 'before' | 'during' | 'gear';
  completed: boolean;
}

interface SafetyLocation {
  id: string;
  name: string;
  address: string;
  type: 'medical' | 'police' | 'shelter' | 'danger';
  lat: number;
  lng: number;
}

// Declare global google variable
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const SafetyCenter: React.FC = () => {
  const [weatherData] = useState<WeatherData>({
    temperature: 18,
    feelsLike: 15,
    humidity: 85,
    windSpeed: 12,
    visibility: 8,
    condition: 'cloudy'
  });

  // Google Maps state
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    medical: true,
    police: true,
    shelter: true,
    danger: true
  });

  // Safety locations data
  const [safetyLocations] = useState<SafetyLocation[]>([
    // Medical facilities
    { id: '1', name: 'Trạm Y tế Tà Xùa', address: 'Xã Tà Xùa, Huyện Bắc Yên, Sơn La', type: 'medical', lat: 21.2122, lng: 104.3635 },
    { id: '2', name: 'Trạm Y tế Bản Ít', address: 'Bản Ít, Xã Tà Xùa, Huyện Bắc Yên', type: 'medical', lat: 21.2089, lng: 104.3598 },
    { id: '3', name: 'Phòng khám tư Tà Xùa', address: 'Thị trấn Tà Xùa, Sơn La', type: 'medical', lat: 21.2156, lng: 104.3672 },
    
    // Police stations
    { id: '4', name: 'Công an Xã Tà Xùa', address: 'Xã Tà Xùa, Huyện Bắc Yên, Sơn La', type: 'police', lat: 21.2134, lng: 104.3645 },
    { id: '5', name: 'Đồn Biên phòng Tà Xùa', address: 'Khu vực biên giới Tà Xùa', type: 'police', lat: 21.2098, lng: 104.3589 },
    
    // Shelters
    { id: '6', name: 'Nhà nghỉ khẩn cấp Đỉnh Phu Sang', address: 'Đỉnh Phu Sang, Tà Xùa', type: 'shelter', lat: 21.2145, lng: 104.3612 },
    { id: '7', name: 'Trạm cứu hộ Tà Xùa', address: 'Km 15, đường lên Tà Xùa', type: 'shelter', lat: 21.2167, lng: 104.3678 },
    { id: '8', name: 'Chòi nghỉ Bản Ít', address: 'Bản Ít, Tà Xùa', type: 'shelter', lat: 21.2078, lng: 104.3567 },
    
    // Danger zones
    { id: '9', name: 'Vách đá dựng đứng', address: 'Phía Bắc đỉnh Phu Sang', type: 'danger', lat: 21.2189, lng: 104.3623 },
    { id: '10', name: 'Khu vực sạt lở', address: 'Km 12-14 đường lên Tà Xùa', type: 'danger', lat: 21.2201, lng: 104.3701 },
    { id: '11', name: 'Đường mòn nguy hiểm', address: 'Lối xuống thác Tà Xùa', type: 'danger', lat: 21.2056, lng: 104.3534 }
  ]);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Before departure
    { id: '1', text: 'Kiểm tra phương tiện di chuyển', category: 'before', completed: false },
    { id: '2', text: 'Báo cho người thân về lịch trình', category: 'before', completed: false },
    { id: '3', text: 'Sạc đầy pin điện thoại', category: 'before', completed: false },
    { id: '4', text: 'Chuẩn bị pin dự phòng', category: 'before', completed: false },
    { id: '5', text: 'Mang theo giấy tờ cá nhân', category: 'before', completed: false },
    
    // During trekking
    { id: '6', text: 'Mang áo mưa mỏng', category: 'during', completed: false },
    { id: '7', text: 'Giữ khoảng cách an toàn', category: 'during', completed: false },
    { id: '8', text: 'Không rời khỏi đoàn', category: 'during', completed: false },
    { id: '9', text: 'Tôn trọng chỉ dẫn hướng dẫn viên', category: 'during', completed: false },
    
    // Essential gear
    { id: '10', text: 'Giày leo núi chống trượt', category: 'gear', completed: false },
    { id: '11', text: 'Gậy trekking', category: 'gear', completed: false },
    { id: '12', text: 'Áo khoác gió', category: 'gear', completed: false },
    { id: '13', text: 'Nước uống đầy đủ', category: 'gear', completed: false },
    { id: '14', text: 'Thuốc y tế cá nhân', category: 'gear', completed: false },
  ]);

  const [emergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Trạm Y tế Tà Xùa', phone: '0274.3871.234', type: 'medical' },
    { id: '2', name: 'Công an Huyện Bắc Yên', phone: '0274.3871.113', type: 'police' },
    { id: '3', name: 'Đội Cứu hộ Sơn La', phone: '0212.3856.115', type: 'rescue' },
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />;
      case 'rainy': return <CloudRain className="w-12 h-12 text-blue-500 animate-bounce" />;
      default: return <Cloud className="w-12 h-12 text-gray-500 animate-pulse" />;
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'medical': return <Heart className="w-6 h-6 text-red-500" />;
      case 'police': return <Shield className="w-6 h-6 text-blue-500" />;
      case 'rescue': return <Phone className="w-6 h-6 text-green-600" />;
      default: return <Phone className="w-6 h-6" />;
    }
  };

  const downloadVCard = () => {
    const vCardData = emergencyContacts.map(contact => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEND:VCARD`
    ).join('\n');
    
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-contacts-ta-xua.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'before': return 'Trước khi khởi hành';
      case 'during': return 'Khi trekking';
      case 'gear': return 'Trang bị cần thiết';
      default: return '';
    }
  };

  // Google Maps functions
  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'medical': return '#22c55e';
      case 'police': return '#3b82f6';
      case 'shelter': return '#facc15';
      case 'danger': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'medical': return 'Trạm y tế';
      case 'police': return 'Đồn công an';
      case 'shelter': return 'Điểm trú ẩn';
      case 'danger': return 'Khu vực nguy hiểm';
      default: return '';
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) {
      console.warn('Map container or Google Maps API not available');
      return;
    }

    try {
       const mapOptions = {
         center: { lat: 21.2122, lng: 104.3635 }, // Ta Xua coordinates
         zoom: 13,
         mapTypeControl: true,
         mapTypeControlOptions: {
           style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
           position: window.google.maps.ControlPosition.TOP_CENTER,
         },
         zoomControl: true,
         zoomControlOptions: {
           position: window.google.maps.ControlPosition.RIGHT_CENTER,
         },
         scaleControl: true,
         streetViewControl: true,
         fullscreenControl: true,
         styles: [
           {
             featureType: 'poi',
             elementType: 'labels',
             stylers: [{ visibility: 'on' }]
           }
         ],
         // Optimize tile loading
         gestureHandling: 'cooperative',
         clickableIcons: false,
         // Reduce tile requests by limiting bounds
         restriction: {
           latLngBounds: {
             north: 21.4,
             south: 21.0,
             east: 104.6,
             west: 104.0
           },
           strictBounds: false
         }
       };

       const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
       setMap(newMap);
       
       // Create markers
       createMarkers(newMap);
     } catch (error) {
       console.error('Error initializing Safety Center map:', error);
     }
  };

  const createMarkers = (mapInstance: any) => {
    const newMarkers: any[] = [];

    safetyLocations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: getMarkerColor(location.type),
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8,
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${location.address}</p>
            <span style="display: inline-block; padding: 2px 8px; background-color: ${getMarkerColor(location.type)}; color: white; border-radius: 12px; font-size: 12px; font-weight: 500;">
              ${getTypeLabel(location.type)}
            </span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });

      newMarkers.push({ marker, location, infoWindow });
    });

    setMarkers(newMarkers);
  };

  const toggleFilter = (filterType: keyof typeof activeFilters) => {
    const newFilters = { ...activeFilters, [filterType]: !activeFilters[filterType] };
    setActiveFilters(newFilters);
    
    // Update marker visibility
    markers.forEach(({ marker, location }) => {
      const shouldShow = newFilters[location.type as keyof typeof activeFilters];
      marker.setVisible(shouldShow);
    });
  };

  // Load Google Maps API
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMaps({
          callback: () => {
            initializeMap();
          }
        });
      } catch (error) {
        console.error('Google Maps failed to load:', error);
      }
    };

    initializeGoogleMaps();
  }, []);

  // Update markers when filters change
  useEffect(() => {
    markers.forEach(({ marker, location }) => {
      const shouldShow = activeFilters[location.type as keyof typeof activeFilters];
      marker.setVisible(shouldShow);
    });
  }, [activeFilters, markers]);

  return (
    <div className="min-h-screen bg-[#fefbf6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Dynamic Content & Alerts */}
          <div className="space-y-6">
            
            {/* Visual Weather Report */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  {getWeatherIcon(weatherData.condition)}
                  Bản Tin Thời Tiết Trực Quan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Temperature Display */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-[#15803d]">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-sm text-gray-600">
                      Cảm giác như {weatherData.feelsLike}°C
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[#15803d] border-[#15803d]">
                      Sương mù nhẹ
                    </Badge>
                  </div>
                </div>

                {/* Weather Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Humidity */}
                  <div className="text-center">
                    <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Độ ẩm</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.humidity}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${weatherData.humidity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Wind Speed */}
                  <div className="text-center">
                    <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Gió</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.windSpeed} km/h</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(weatherData.windSpeed / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="text-center">
                    <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Tầm nhìn</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.visibility} km</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(weatherData.visibility / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Warnings */}
            <Card className="border-amber-200 bg-amber-50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                  Cảnh Báo Quan Trọng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-300 bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="font-inter text-[#1f2937]">
                    <strong>Sương mù dày buổi sáng</strong> – hạn chế di chuyển bằng xe máy từ 5:00-8:00
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-amber-300 bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="font-inter text-[#1f2937]">
                    <strong>Nhiệt độ giảm sâu ban đêm</strong> – mang theo áo ấm và đèn pin
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Tools, Guides & Contacts */}
          <div className="space-y-6">
            
            {/* Safety Handbook - Interactive Checklist */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937]">
                  Cẩm Nang An Toàn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {['before', 'during', 'gear'].map((category) => (
                  <div key={category} className="space-y-3">
                    <h3 className="font-semibold text-[#15803d] text-lg border-b border-[#15803d]/20 pb-2">
                      {getCategoryTitle(category)}
                    </h3>
                    <div className="space-y-2">
                      {checklistItems
                        .filter(item => item.category === category)
                        .map((item) => (
                          <div 
                            key={item.id} 
                            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                              item.completed ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'
                            }`}
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.completed}
                              onCheckedChange={() => toggleChecklistItem(item.id)}
                              className="data-[state=checked]:bg-[#15803d] data-[state=checked]:border-[#15803d]"
                            />
                            <label 
                              htmlFor={item.id} 
                              className={`font-inter text-sm cursor-pointer flex-1 ${
                                item.completed ? 'line-through' : ''
                              }`}
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact List */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937]">
                  Danh Bạ Khẩn Cấp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {emergencyContacts.map((contact) => (
                    <div 
                      key={contact.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#15803d]/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getContactIcon(contact.type)}
                        <div>
                          <div className="font-semibold text-[#1f2937]">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.phone}</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white"
                        onClick={() => window.open(`tel:${contact.phone}`)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={downloadVCard}
                  className="w-full bg-[#15803d] hover:bg-[#15803d]/90 text-white font-inter"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Lưu Danh Bạ Khẩn Cấp
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Interactive Safety Map */}
        <Card className="mt-8 border-[#15803d]/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#15803d]" />
              Bản Đồ An Toàn Tương Tác
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button 
                variant={activeFilters.medical ? "default" : "outline"} 
                size="sm" 
                className={`transition-all duration-200 ${
                  activeFilters.medical 
                    ? 'bg-[#22c55e] hover:bg-[#22c55e]/90 text-white border-[#22c55e]' 
                    : 'border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white'
                }`}
                onClick={() => toggleFilter('medical')}
              >
                <div className="w-3 h-3 rounded-full bg-[#22c55e] mr-2"></div>
                Trạm y tế
              </Button>
              <Button 
                variant={activeFilters.police ? "default" : "outline"} 
                size="sm" 
                className={`transition-all duration-200 ${
                  activeFilters.police 
                    ? 'bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white border-[#3b82f6]' 
                    : 'border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white'
                }`}
                onClick={() => toggleFilter('police')}
              >
                <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
                Đồn công an
              </Button>
              <Button 
                variant={activeFilters.shelter ? "default" : "outline"} 
                size="sm" 
                className={`transition-all duration-200 ${
                  activeFilters.shelter 
                    ? 'bg-[#facc15] hover:bg-[#facc15]/90 text-black border-[#facc15]' 
                    : 'border-[#facc15] text-[#facc15] hover:bg-[#facc15] hover:text-black'
                }`}
                onClick={() => toggleFilter('shelter')}
              >
                <div className="w-3 h-3 rounded-full bg-[#facc15] mr-2"></div>
                Điểm trú ẩn
              </Button>
              <Button 
                variant={activeFilters.danger ? "default" : "outline"} 
                size="sm" 
                className={`transition-all duration-200 ${
                  activeFilters.danger 
                    ? 'bg-[#ef4444] hover:bg-[#ef4444]/90 text-white border-[#ef4444]' 
                    : 'border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white'
                }`}
                onClick={() => toggleFilter('danger')}
              >
                <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
                Khu vực nguy hiểm
              </Button>
            </div>
            
            {/* Google Maps Container */}
            <div className="w-full relative">
              <div 
                ref={mapRef}
                className="w-full h-[500px] md:h-[300px] rounded-lg border border-gray-200 shadow-inner"
                style={{ minHeight: '300px' }}
              />
              {!map && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#15803d]/10 to-[#15803d]/5 rounded-lg border-2 border-dashed border-[#15803d]/30 flex items-center justify-center">
                  <div className="text-center text-[#15803d]">
                    <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="font-inter text-lg">Đang tải bản đồ...</p>
                    <p className="font-inter text-sm opacity-70 mt-2">
                      Vui lòng chờ trong giây lát
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SafetyCenter;