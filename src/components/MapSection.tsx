import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Coffee, Home, Mountain, Camera, Star, Navigation, Phone, Clock, ExternalLink, QrCode, Send, Filter, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapSection.module.css';
import taxuaMountainBg from '@/assets/taxua-mountain-bg.svg';

const MapSection = () => {
  // Sử dụng token Mapbox công khai hợp lệ
  const DEFAULT_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showMobileDialog, setShowMobileDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['accommodation', 'coffee', 'landmark', 'photo']);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const clusterMarkers = useRef<mapboxgl.Marker[]>([]);

  // Enhanced location data with more details
  const locations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      type: 'landmark',
      icon: Mountain,
      coordinates: [104.0325, 21.3341] as [number, number],
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
      coordinates: [104.0298, 21.3358] as [number, number],
      rating: 4.7,
      description: 'Homestay view đẹp giữa núi rừng với không gian ấm cúng và dịch vụ tận tình',
      details: {
        price: '500.000 - 800.000 VNĐ/đêm',
        capacity: '2-6 người',
        amenities: 'WiFi, Bữa sáng, Xe đưa đón',
        contact: '+84 987 654 321'
      }
    },
    {
      id: 3,
      name: 'Quán Cà Phê Săn Mây',
      type: 'coffee',
      icon: Coffee,
      coordinates: [104.0312, 21.3375] as [number, number],
      rating: 4.8,
      description: 'Thưởng thức cà phê đặc sản trong không gian mây trời bao la',
      details: {
        specialty: 'Cà phê Arabica Tà Xùa',
        openHours: '5:00 - 22:00',
        priceRange: '25.000 - 60.000 VNĐ',
        contact: '+84 456 789 123'
      }
    },
    {
      id: 4,
      name: 'Điểm Chụp Ảnh Bình Minh',
      type: 'photo',
      icon: Camera,
      coordinates: [104.0285, 21.3392] as [number, number],
      rating: 4.9,
      description: 'Điểm săn mây bình minh đẹp nhất với tầm nhìn 360 độ ra biển mây',
      details: {
        bestTime: '4:30 - 6:30 AM',
        equipment: 'Máy ảnh, Tripod khuyến khích',
        difficulty: 'Trung bình',
        contact: 'Hướng dẫn viên: +84 789 123 456'
      }
    },
    {
      id: 5,
      name: 'Đỉnh Phu Sang',
      type: 'landmark',
      icon: Mountain,
      coordinates: [104.0340, 21.3320] as [number, number],
      rating: 4.8,
      description: 'Đỉnh núi cao nhất khu vực với view 360 độ tuyệt đẹp',
      details: {
        altitude: '2096m',
        difficulty: 'Rất khó',
        duration: '6-8 giờ',
        bestTime: 'Tháng 10 - Tháng 3',
        contact: '+84 321 654 987'
      }
    },
    {
      id: 6,
      name: 'Lù Homestay Tà Xùa',
      type: 'accommodation',
      icon: Home,
      coordinates: [104.0290, 21.3345] as [number, number],
      rating: 4.6,
      description: 'Homestay truyền thống với kiến trúc nhà sàn độc đáo',
      details: {
        price: '400.000 - 600.000 VNĐ/đêm',
        capacity: '4-8 người',
        amenities: 'Bữa sáng, Tour guide, Xe máy thuê',
        contact: '+84 234 567 890'
      }
    },
    {
      id: 7,
      name: 'Quán Ăn Đặc Sản H\'Mông',
      type: 'coffee',
      icon: Coffee,
      coordinates: [104.0305, 21.3362] as [number, number],
      rating: 4.5,
      description: 'Thưởng thức các món ăn truyền thống của người H\'Mông',
      details: {
        specialty: 'Thịt nướng, Cơm lam, Rượu cần',
        openHours: '6:00 - 21:00',
        priceRange: '50.000 - 150.000 VNĐ',
        contact: '+84 567 890 123'
      }
    },
    {
      id: 8,
      name: 'Điểm Ngắm Hoàng Hôn',
      type: 'photo',
      icon: Camera,
      coordinates: [104.0318, 21.3355] as [number, number],
      rating: 4.7,
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

  // Get filtered locations
  const filteredLocations = locations.filter(location => 
    activeFilters.includes(location.type)
  );

  // Toggle filter
  const toggleFilter = (filterType: string) => {
    setActiveFilters(prev => 
      prev.includes(filterType) 
        ? prev.filter(f => f !== filterType)
        : [...prev, filterType]
    );
  };

  // Create marker clustering logic
  const createClusterMarkers = (locations: typeof filteredLocations, zoom: number) => {
    // Clear existing cluster markers
    clusterMarkers.current.forEach(marker => marker.remove());
    clusterMarkers.current = [];

    if (zoom > 12) {
      // Show individual markers at high zoom
      return locations;
    }

    // Simple clustering algorithm - group nearby locations
    const clusters: { [key: string]: typeof locations } = {};
    const clusterRadius = zoom < 10 ? 0.01 : 0.005; // Adjust based on zoom

    locations.forEach(location => {
      const clusterKey = `${Math.floor(location.coordinates[0] / clusterRadius)}_${Math.floor(location.coordinates[1] / clusterRadius)}`;
      if (!clusters[clusterKey]) {
        clusters[clusterKey] = [];
      }
      clusters[clusterKey].push(location);
    });

    // Create cluster markers
    Object.values(clusters).forEach(clusterLocations => {
      if (clusterLocations.length > 1) {
        // Calculate cluster center
        const centerLng = clusterLocations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / clusterLocations.length;
        const centerLat = clusterLocations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / clusterLocations.length;

        // Create cluster marker element
        const clusterEl = document.createElement('div');
        clusterEl.className = 'cluster-marker';
        clusterEl.innerHTML = `
          <div class="cluster-marker-inner">
            <span class="cluster-count">${clusterLocations.length}</span>
          </div>
        `;
        clusterEl.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          border: 3px solid white;
        `;

        // Add hover effect
        clusterEl.addEventListener('mouseenter', () => {
          clusterEl.style.transform = 'scale(1.1)';
          clusterEl.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
        });

        clusterEl.addEventListener('mouseleave', () => {
          clusterEl.style.transform = 'scale(1)';
          clusterEl.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        });

        // Add click handler to zoom in
        clusterEl.addEventListener('click', () => {
          if (map.current) {
            map.current.flyTo({
              center: [centerLng, centerLat],
              zoom: Math.min(map.current.getZoom() + 2, 16),
              duration: 1000
            });
          }
        });

        const clusterMarker = new mapboxgl.Marker(clusterEl)
          .setLngLat([centerLng, centerLat])
          .addTo(map.current!);

        clusterMarkers.current.push(clusterMarker);
      }
    });

    // Return individual locations that are not clustered
    return Object.values(clusters).filter(cluster => cluster.length === 1).flat();
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [104.0312, 21.3358],
      zoom: 11,
      pitch: 45,
      bearing: 0,
      antialias: true
    });

    // Add 3D terrain
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });

        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add sky layer
        map.current.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });
      }
    });

    // Handle zoom changes for clustering
    map.current.on('zoom', () => {
      if (map.current) {
        updateMarkers();
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers based on filters and zoom
  const updateMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const currentZoom = map.current.getZoom();
    const locationsToShow = createClusterMarkers(filteredLocations, currentZoom);

    // Create individual markers
    locationsToShow.forEach((location) => {
      const IconComponent = location.icon;
      const filterInfo = filterConfig.find(f => f.type === location.type);
      
      // Create marker element with enhanced styling
       const markerEl = document.createElement('div');
       markerEl.className = styles.customMarker;
       markerEl.innerHTML = `
         <div class="${styles.markerContent} ${hoveredMarker === location.id ? styles.hovered : ''}">
           <div class="${styles.markerIcon} ${filterInfo?.color || 'bg-gray-500'}">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               ${getIconSVG(location.type)}
             </svg>
           </div>
           <div class="${styles.markerLabel} ${hoveredMarker === location.id ? styles.visible : ''}">${location.name}</div>
         </div>
       `;

      // Add styles
      markerEl.style.cssText = `
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      // Add hover effects
      markerEl.addEventListener('mouseenter', () => {
        setHoveredMarker(location.id);
        markerEl.style.transform = 'scale(1.1)';
      });

      markerEl.addEventListener('mouseleave', () => {
        setHoveredMarker(null);
        markerEl.style.transform = 'scale(1)';
      });

      markerEl.addEventListener('click', () => {
        setSelectedLocation(location.id);
        if (map.current) {
          map.current.flyTo({
            center: location.coordinates,
            zoom: 14,
            duration: 1000
          });
        }
        
        // Tạo popup với thông tin chi tiết
        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          maxWidth: '300px',
          className: 'custom-popup'
        })
        .setLngLat(location.coordinates)
        .setHTML(`
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">${location.name}</h3>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                ${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5 - Math.floor(location.rating))}
              </div>
              <span class="ml-2 text-sm">${location.rating}/5</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">${location.description}</p>
            <div class="space-y-1 text-xs">
              ${Object.entries(location.details).map(([key, value]) => 
                `<div><strong>${key}:</strong> ${value}</div>`
              ).join('')}
            </div>
          </div>
        `)
        .addTo(map.current);
      });

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .addTo(map.current);

      markers.current.push(marker);
    });
  };

  // Helper function to get SVG paths for icons
  const getIconSVG = (type: string) => {
    switch (type) {
      case 'accommodation':
        return '<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 14.2 0L21 21"/><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>';
      case 'coffee':
        return '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>';
      case 'landmark':
        return '<path d="m8 3 4 8 5-5v11H3V6l5 5 4-8Z"/>';
      case 'photo':
        return '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>';
      default:
        return '<circle cx="12" cy="12" r="10"/>';
    }
  };

  // Update markers when filters change
  useEffect(() => {
    updateMarkers();
  }, [activeFilters, hoveredMarker]);

  // Generate QR code data
  const generateQRData = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/explore?location=${selectedLocation}`;
  };

  // Send to email
  const sendToEmail = () => {
    if (!userEmail || !selectedLocation) return;
    
    const location = locations.find(l => l.id === selectedLocation);
    if (!location) return;

    const subject = encodeURIComponent(`Địa điểm thú vị tại Tà Xùa: ${location.name}`);
    const body = encodeURIComponent(`
Xin chào!

Tôi muốn chia sẻ với bạn một địa điểm tuyệt vời tại Tà Xùa:

📍 ${location.name}
⭐ Đánh giá: ${location.rating}/5
📝 ${location.description}

🔗 Xem chi tiết: ${generateQRData()}

Hẹn gặp bạn tại Tà Xùa!
    `);

    window.open(`mailto:${userEmail}?subject=${subject}&body=${body}`);
    setShowMobileDialog(false);
    setUserEmail('');
  };

  const selectedLocationData = selectedLocation ? locations.find(l => l.id === selectedLocation) : null;

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${taxuaMountainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Khám Phá Bản Đồ Tương Tác
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Tìm hiểu các địa điểm thú vị, homestay chất lượng và trải nghiệm độc đáo tại Tà Xùa
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
                  className="w-full h-[600px] rounded-lg"
                  style={{ minHeight: '600px' }}
                />
                
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

                {/* Zoom Info */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-600">
                  💡 Thu nhỏ để xem cụm marker, phóng to để xem chi tiết
                </div>
              </div>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocationData ? (
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{selectedLocationData.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedLocationData.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{selectedLocationData.rating}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {filterConfig.find(f => f.type === selectedLocationData.type)?.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{selectedLocationData.description}</p>
                  
                  <div className="space-y-3">
                    {Object.entries(selectedLocationData.details).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Send to Phone Button */}
                  <Dialog open={showMobileDialog} onOpenChange={setShowMobileDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Phone className="w-4 h-4 mr-2" />
                        Gửi đến điện thoại
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Gửi thông tin đến điện thoại</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                            <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">QR Code sẽ hiển thị ở đây</p>
                            <p className="text-xs text-gray-500 mt-1">Quét để mở trên điện thoại</p>
                          </div>
                        </div>
                        
                        <div className="text-center text-gray-500">hoặc</div>
                        
                        <div className="space-y-3">
                          <Input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                          <Button 
                            onClick={sendToEmail}
                            disabled={!userEmail}
                            className="w-full"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Gửi qua Email
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl">
                <CardContent className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Chọn một địa điểm
                  </h3>
                  <p className="text-gray-500">
                    Nhấp vào marker trên bản đồ để xem thông tin chi tiết
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {filterConfig.map((filter) => {
                    const count = locations.filter(l => l.type === filter.type).length;
                    const IconComponent = filter.icon;
                    return (
                      <div key={filter.type} className="text-center p-3 bg-gray-50 rounded-lg">
                        <IconComponent className={`w-6 h-6 mx-auto mb-2 text-gray-600`} />
                        <div className="font-bold text-lg">{count}</div>
                        <div className="text-xs text-gray-600">{filter.label}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </section>
  );
};

export default MapSection;