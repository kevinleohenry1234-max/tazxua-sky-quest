import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Coffee, Home, Mountain, Camera, Star, Navigation, Phone, Clock, Filter, Eye, EyeOff } from 'lucide-react';
import { loadGoogleMaps } from '@/utils/googleMapsLoader';

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(['accommodation', 'coffee', 'landmark', 'photo']);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const infoWindow = useRef<any>(null);

  // Enhanced location data with real Tà Xùa coordinates
  const locations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      type: 'landmark',
      icon: Mountain,
      coordinates: { lat: 21.3341, lng: 104.0325 },
      rating: 4.9,
      description: 'Điểm check-in nổi tiếng nhất Tà Xùa với hình dáng độc đáo như sống lưng khủng long',
      details: {
        altitude: '1865m',
        difficulty: 'Khó',
        duration: '3-4 giờ',
        bestTime: '5:00 - 7:00 AM',
        contact: '+84 123 456 789'
      }
    },
    {
      id: 2,
      name: 'Homestay Tà Xùa Valley',
      type: 'accommodation',
      icon: Home,
      coordinates: { lat: 21.3358, lng: 104.0298 },
      rating: 4.7,
      description: 'Homestay ấm cúng với view núi tuyệt đẹp và dịch vụ chuyên nghiệp',
      details: {
        price: '500.000 - 800.000 VNĐ/đêm',
        amenities: 'Wifi, Bữa sáng, Xe đưa đón',
        capacity: '2-4 người/phòng',
        contact: '+84 987 654 321'
      }
    },
    {
      id: 3,
      name: 'Cafe Săn Mây',
      type: 'coffee',
      icon: Coffee,
      coordinates: { lat: 21.3365, lng: 104.0310 },
      rating: 4.6,
      description: 'Quán cà phê với view ngắm mây tuyệt đẹp, phục vụ cà phê đặc sản vùng cao',
      details: {
        openTime: '5:00 - 22:00',
        specialty: 'Cà phê Arabica Tà Xùa',
        price: '25.000 - 50.000 VNĐ',
        contact: '+84 456 789 123'
      }
    },
    {
      id: 4,
      name: 'Đỉnh Phu Sang',
      type: 'landmark',
      icon: Mountain,
      coordinates: { lat: 21.3199, lng: 104.4669 },
      rating: 4.8,
      description: 'Đỉnh núi cao nhất khu vực với độ cao 2.865m, nơi có thể ngắm nhìn toàn cảnh',
      details: {
        altitude: '2865m',
        difficulty: 'Rất khó',
        duration: '6-8 giờ',
        bestTime: 'Cả ngày',
        contact: '+84 789 123 456'
      }
    },
    {
      id: 5,
      name: 'Điểm Chụp Ảnh Hoàng Hôn',
      type: 'photo',
      icon: Camera,
      coordinates: { lat: 21.3380, lng: 104.0340 },
      rating: 4.5,
      description: 'Vị trí tuyệt vời để ngắm hoàng hôn và chụp ảnh lưu niệm',
      details: {
        bestTime: '17:00 - 18:30 PM',
        equipment: 'Máy ảnh, Ghế dã ngoại',
        difficulty: 'Dễ',
        contact: 'Hướng dẫn viên: +84 890 123 456'
      }
    }
  ];

  // Filter configuration
  const filterConfig = [
    { type: 'accommodation', label: 'Lưu trú', icon: Home, color: 'bg-blue-500' },
    { type: 'coffee', label: 'Ăn uống', icon: Coffee, color: 'bg-orange-500' },
    { type: 'landmark', label: 'Điểm Check-in', icon: Mountain, color: 'bg-green-500' },
    { type: 'photo', label: 'Chụp ảnh', icon: Camera, color: 'bg-purple-500' }
  ];

  // Get filtered locations - memoized để tránh re-render không cần thiết
  const filteredLocations = useMemo(() => 
    locations.filter(location => activeFilters.includes(location.type)),
    [activeFilters]
  );

  // Toggle filter
  const toggleFilter = (filterType: string) => {
    setActiveFilters(prev => 
      prev.includes(filterType) 
        ? prev.filter(f => f !== filterType)
        : [...prev, filterType]
    );
  };

  // Load Google Maps API
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMaps({
          callback: () => {
            setMapLoaded(true);
          }
        });
      } catch (error) {
        console.error('Google Maps failed to load:', error);
        setMapLoaded(true); // Still set to true to show fallback
      }
    };

    initializeGoogleMaps();
  }, []);

  // Initialize Google Map
  const initializeMap = () => {
    if (!mapContainer.current || !window.google?.maps) {
      console.warn('Map container or Google Maps API not available');
      return;
    }

    try {
       map.current = new window.google.maps.Map(mapContainer.current, {
         center: { lat: 21.3358, lng: 104.0312 },
         zoom: 13,
         mapTypeId: 'hybrid', // Satellite view with labels
         tilt: 45,
         styles: [
           {
             featureType: 'poi',
             elementType: 'labels',
             stylers: [{ visibility: 'off' }]
           }
         ],
         // Optimize tile loading
         gestureHandling: 'cooperative',
         clickableIcons: false,
         disableDefaultUI: false,
         // Reduce tile requests
         restriction: {
           latLngBounds: {
             north: 21.5,
             south: 21.1,
             east: 104.3,
             west: 103.8
           },
           strictBounds: false
         }
       });

       infoWindow.current = new window.google.maps.InfoWindow();
       updateMarkers();
     } catch (error) {
       console.error('Error initializing Google Map:', error);
     }
  };

  // Update markers based on filters
  const updateMarkers = useCallback(() => {
    if (!map.current || !window.google) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Create new markers
    filteredLocations.forEach((location) => {
      const filterInfo = filterConfig.find(f => f.type === location.type);
      
      // Create custom marker icon
      const markerIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="${getMarkerColor(location.type)}" stroke="white" stroke-width="3"/>
            <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">${getMarkerSymbol(location.type)}</text>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20)
      };

      const marker = new window.google.maps.Marker({
        position: location.coordinates,
        map: map.current,
        title: location.name,
        icon: markerIcon,
        animation: window.google.maps.Animation.DROP
      });

      // Add click listener
      marker.addListener('click', () => {
        setSelectedLocation(location.id);
        
        const content = `
          <div style="max-width: 300px; padding: 16px;">
            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #1f2937;">${location.name}</h3>
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="display: flex; color: #fbbf24;">
                ${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5 - Math.floor(location.rating))}
              </div>
              <span style="margin-left: 8px; font-size: 14px; color: #6b7280;">${location.rating}/5</span>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">${location.description}</p>
            <div style="font-size: 12px; line-height: 1.5;">
              ${Object.entries(location.details).map(([key, value]) => 
                `<div style="margin-bottom: 4px;"><strong>${key}:</strong> ${value}</div>`
              ).join('')}
            </div>
            <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}', '_blank')" 
                    style="margin-top: 12px; background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
              Chỉ đường
            </button>
          </div>
        `;

        if (!infoWindow.current) {
          infoWindow.current = new window.google.maps.InfoWindow();
        }
        
        infoWindow.current.setContent(content);
        infoWindow.current.open(map.current, marker);
      });

      // Add hover listeners
      marker.addListener('mouseover', () => setHoveredMarker(location.id));
      marker.addListener('mouseout', () => setHoveredMarker(null));

      markers.current.push(marker);
    });
  }, [filteredLocations]);

  // Update markers when filters change
  useEffect(() => {
    if (mapLoaded && map.current && filteredLocations.length >= 0) {
      updateMarkers();
    }
  }, [filteredLocations, mapLoaded, updateMarkers]);

  // Helper functions
  const getMarkerColor = (type: string) => {
    const colors = {
      accommodation: '#3b82f6',
      coffee: '#f97316',
      landmark: '#10b981',
      photo: '#8b5cf6'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getMarkerSymbol = (type: string) => {
    const symbols = {
      accommodation: '🏠',
      coffee: '☕',
      landmark: '⛰️',
      photo: '📷'
    };
    return symbols[type as keyof typeof symbols] || '📍';
  };

  const selectedLocationData = selectedLocation ? locations.find(l => l.id === selectedLocation) : null;

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bản Đồ Google Maps Tà Xùa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các địa điểm thú vị với bản đồ Google Maps chính xác và chi tiết
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mr-4">
              <Filter className="w-4 h-4" />
              Bộ lọc:
            </div>
            {filterConfig.map((filter) => {
              const IconComponent = filter.icon;
              const isActive = activeFilters.includes(filter.type);
              return (
                <Button
                  key={filter.type}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter.type)}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive 
                      ? `${filter.color} text-white hover:opacity-90` 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {filter.label}
                  {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>
              );
            })}
          </div>
          <div className="text-center mt-3 text-sm text-gray-500">
            Hiển thị {filteredLocations.length} địa điểm
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl">
              <div className="relative">
                <div 
                  ref={mapContainer} 
                  className="w-full h-[600px] rounded-lg bg-gray-100 flex items-center justify-center"
                  style={{ minHeight: '600px' }}
                >
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Bản đồ Tà Xùa</h3>
                    <p className="text-gray-500 mb-4">
                      Để xem bản đồ tương tác, vui lòng cấu hình Google Maps API key hợp lệ
                    </p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium mb-2">Tọa độ chính:</h4>
                      <p className="text-sm text-gray-600">
                        📍 Sống Lưng Khủng Long: 21.3341°N, 104.0325°E<br/>
                        🏠 Khu vực lưu trú: 21.3358°N, 104.0298°E<br/>
                        ☕ Khu ẩm thực: 21.3365°N, 104.0315°E
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Chú thích</h4>
                  <div className="space-y-1">
                    {filterConfig.map((filter) => {
                      const IconComponent = filter.icon;
                      return (
                        <div key={filter.type} className="flex items-center gap-2 text-xs">
                          <div className={`w-3 h-3 rounded-full ${filter.color}`}></div>
                          <span>{filter.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocationData ? (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {selectedLocationData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(selectedLocationData.rating))}
                      {'☆'.repeat(5 - Math.floor(selectedLocationData.rating))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedLocationData.rating}/5
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {selectedLocationData.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Thông tin chi tiết:</h4>
                    {Object.entries(selectedLocationData.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocationData.coordinates.lat},${selectedLocationData.coordinates.lng}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Chỉ đường đến đây
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Chọn một địa điểm</h3>
                  <p className="text-muted-foreground">
                    Nhấp vào các marker trên bản đồ để xem thông tin chi tiết
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Thống kê nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filterConfig.map((filter) => {
                  const count = locations.filter(l => l.type === filter.type).length;
                  const IconComponent = filter.icon;
                  return (
                    <div key={filter.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm">{filter.label}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;