import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Coffee, Home, Mountain, Camera, Star, Navigation, Phone, Clock, ExternalLink, QrCode, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSection = () => {
  // Sử dụng token mặc định để tự động hóa bản đồ
  const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoidGF4dWEiLCJhIjoiY2x0ZXN0In0.demo_token_for_taxua';
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showMobileDialog, setShowMobileDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

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
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'landmark': return 'text-orange-600';
      case 'accommodation': return 'text-blue-600';
      case 'coffee': return 'text-amber-600';
      case 'photo': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'landmark': return 'Địa danh';
      case 'accommodation': return 'Lưu trú';
      case 'coffee': return 'Cà phê';
      case 'photo': return 'Chụp ảnh';
      default: return 'Khác';
    }
  };

  // Tự động khởi tạo bản đồ khi component mount
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      initializeMap(DEFAULT_MAPBOX_TOKEN);
    }
  }, []);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    // Create map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [104.0312, 21.3358],
      zoom: 13,
      pitch: 45,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add markers for each location
    locations.forEach((location) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="w-10 h-10 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <svg class="w-5 h-5 ${getTypeColor(location.type)}" fill="currentColor" viewBox="0 0 24 24">
            ${location.type === 'landmark' ? '<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>' :
              location.type === 'accommodation' ? '<path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>' :
              location.type === 'coffee' ? '<path d="M2 21V19H20V21H2M20 8V5L18 5V3H4V5H2V8H4V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V8H20M16 10H18V12H16V10Z"/>' :
              '<path d="M4 4H7L9 2H15L17 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 9C13.66 9 15 10.34 15 12S13.66 15 12 15 9 13.66 9 12 10.34 9 12 9Z"/>'}
          </svg>
        </div>
      `;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .addTo(map.current!);

      const popupContent = `
        <div class="p-4 max-w-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg text-gray-900">${location.name}</h3>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span class="text-sm text-gray-600">${location.rating}</span>
            </div>
          </div>
          
          <div class="mb-3">
            <span class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              ${getTypeLabel(location.type)}
            </span>
          </div>
          
          <p class="text-gray-700 text-sm mb-4">${location.description}</p>
          
          <div class="space-y-2 text-sm">
            ${Object.entries(location.details).map(([key, value]) => `
              <div class="flex justify-between">
                <span class="text-gray-600 capitalize">${key}:</span>
                <span class="text-gray-900 font-medium">${value}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="mt-4 flex space-x-2">
            <button onclick="window.open('tel:${location.details.contact || ''}', '_self')" class="flex-1 bg-primary text-white px-3 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
              Liên hệ
            </button>
            <button onclick="navigator.geolocation.getCurrentPosition(pos => window.open(\`https://www.google.com/maps/dir/\${pos.coords.latitude},\${pos.coords.longitude}/${location.coordinates[1]},${location.coordinates[0]}\`, '_blank'))" class="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
              Chỉ đường
            </button>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '320px'
      }).setHTML(popupContent);

      marker.setPopup(popup);

      markerElement.addEventListener('click', () => {
        setSelectedLocation(location.id);
        map.current?.flyTo({
          center: location.coordinates,
          zoom: 15,
          duration: 1000
        });
      });

      markers.current.push(marker);
    });

    // Add terrain and sky layers for 3D effect
    map.current.on('load', () => {
      map.current?.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      
      map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      
      map.current?.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    });
  };

  const handleLocationClick = (locationId: number) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location && map.current) {
      setSelectedLocation(locationId);
      map.current.flyTo({
        center: location.coordinates,
        zoom: 15,
        duration: 1000
      });
      
      const marker = markers.current.find((_, index) => locations[index].id === locationId);
      if (marker) {
        marker.togglePopup();
      }
    }
  };

  const handleSendToPhone = () => {
    const currentUrl = window.location.href;
    
    if (userEmail) {
      // Simulate sending email (in real app, this would call an API)
      alert(`Đã gửi link bản đồ đến ${userEmail}!`);
      setShowMobileDialog(false);
      setUserEmail('');
    }
  };

  const generateQRCode = () => {
    const currentUrl = window.location.href;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Bản Đồ Trải Nghiệm Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá các địa điểm nổi bật, nơi lưu trú và trải nghiệm độc đáo tại Tà Xùa với bản đồ tương tác 3D
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0 h-[600px]">
              <CardContent className="p-0 h-full">
                <div ref={mapContainer} className="h-full w-full rounded-lg" />
              </CardContent>
            </Card>
          </div>

          {/* Locations List */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Địa Điểm Nổi Bật ({locations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {locations.map((location) => {
                    const Icon = location.icon;
                    const isSelected = selectedLocation === location.id;
                    
                    return (
                      <div
                        key={location.id}
                        onClick={() => handleLocationClick(location.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {location.name}
                              </h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-muted-foreground">
                                  {location.rating}
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs mb-2">
                              {getTypeLabel(location.type)}
                            </Badge>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {location.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (map.current) {
                        map.current.flyTo({
                          center: [104.0312, 21.3358],
                          zoom: 13,
                          duration: 1000
                        });
                        setSelectedLocation(null);
                      }
                    }}
                    className="w-full"
                  >
                    Xem Toàn Cảnh
                  </Button>
                  
                  {/* Nút Gửi đến Điện thoại */}
                  <Dialog open={showMobileDialog} onOpenChange={setShowMobileDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="w-4 h-4 mr-2" />
                        Gửi đến Điện thoại
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-playfair">Theo dõi trên Di động</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* QR Code Section */}
                        <div className="text-center">
                          <h3 className="font-medium mb-3">Quét mã QR</h3>
                          <div className="flex justify-center mb-3">
                            <img 
                              src={generateQRCode()} 
                              alt="QR Code" 
                              className="w-48 h-48 border rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Sử dụng camera điện thoại để quét mã QR và mở bản đồ
                          </p>
                        </div>

                        {/* Email Section */}
                        <div className="border-t pt-6">
                          <h3 className="font-medium mb-3">Gửi link qua Email</h3>
                          <div className="space-y-3">
                            <Input
                              type="email"
                              placeholder="Nhập email của bạn"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <Button 
                              onClick={handleSendToPhone}
                              disabled={!userEmail}
                              className="w-full"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Gửi Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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