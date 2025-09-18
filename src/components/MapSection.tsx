import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Coffee, Home, Mountain, Camera, Star, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSection = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
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
      },
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400'
      ]
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
      },
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'
      ]
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
      },
      images: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      ]
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
      },
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
      ]
    },
    {
      id: 5,
      name: 'Đỉnh Phu Sang',
      type: 'landmark',
      icon: Mountain,
      coordinates: [104.0340, 21.3320] as [number, number],
      rating: 4.8,
      description: 'Đỉnh núi cao thứ hai của Tà Xùa với cảnh quan hùng vĩ',
      details: {
        altitude: '1840m',
        difficulty: 'Khó',
        duration: '4-5 giờ',
        bestTime: 'Cả ngày',
        contact: '+84 321 654 987'
      },
      images: [
        'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      ]
    },
    {
      id: 6,
      name: 'Thác Dải Yếm',
      type: 'landmark',
      icon: Mountain,
      coordinates: [104.0270, 21.3410] as [number, number],
      rating: 4.6,
      description: 'Thác nước đẹp với dòng chảy trong vắt giữa rừng nguyên sinh',
      details: {
        height: '50m',
        difficulty: 'Dễ',
        duration: '1-2 giờ',
        bestTime: 'Mùa mưa (6-10)',
        contact: '+84 654 321 789'
      },
      images: [
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      landmark: 'text-red-500',
      accommodation: 'text-blue-500',
      coffee: 'text-amber-500',
      photo: 'text-purple-500'
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      landmark: 'Danh lam',
      accommodation: 'Lưu trú',
      coffee: 'Ẩm thực',
      photo: 'Chụp ảnh'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    // Create map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Outdoor style suitable for mountain terrain
      center: [104.0312, 21.3358], // Center on Tà Xùa
      zoom: 13,
      pitch: 45, // 3D effect
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add markers for each location
    locations.forEach((location) => {
      const Icon = location.icon;
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="w-10 h-10 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <svg class="w-5 h-5 ${getTypeColor(location.type)}" fill="currentColor" viewBox="0 0 24 24">
            ${location.type === 'landmark' ? '<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>' :
              location.type === 'accommodation' ? '<path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>' :
              location.type === 'coffee' ? '<path d="M2 21V19H20V21H2M20 8V5L18 5V8H20M20 3A2 2 0 0 1 22 5V8A2 2 0 0 1 20 10H18V13A4 4 0 0 1 14 17H8A4 4 0 0 1 4 13V3H18V3H20Z"/>' :
              '<path d="M4 4H7L9 2H15L17 4H20A2 2 0 0 1 22 6V18A2 2 0 0 1 20 20H4A2 2 0 0 1 2 18V6A2 2 0 0 1 4 4M12 7A5 5 0 0 0 7 12A5 5 0 0 0 12 17A5 5 0 0 0 17 12A5 5 0 0 0 12 7M12 9A3 3 0 0 1 15 12A3 3 0 0 1 12 15A3 3 0 0 1 9 12A3 3 0 0 1 12 9Z"/>'}
          </svg>
        </div>
      `;

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .addTo(map.current!);

      // Create popup content
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

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '320px'
      }).setHTML(popupContent);

      // Add popup to marker
      marker.setPopup(popup);

      // Add click event to marker element
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

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
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
      
      // Open popup for the selected location
      const marker = markers.current.find((_, index) => locations[index].id === locationId);
      if (marker) {
        marker.togglePopup();
      }
    }
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
                {showTokenInput ? (
                  <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center p-8 max-w-md">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="font-playfair text-xl font-bold mb-4">Kích Hoạt Bản Đồ Tương Tác</h3>
                      <p className="text-muted-foreground mb-6 text-sm">
                        Để hiển thị bản đồ 3D với địa hình thực tế, vui lòng nhập Mapbox public token.
                        Bạn có thể lấy token miễn phí tại{' '}
                        <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Mapbox Account
                        </a>
                      </p>
                      <div className="space-y-4">
                        <Input
                          placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV..."
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                          className="w-full font-mono text-xs"
                        />
                        <Button onClick={handleTokenSubmit} className="w-full" disabled={!mapboxToken.trim()}>
                          Kích Hoạt Bản Đồ
                        </Button>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                        <strong>Demo Token:</strong> Bạn có thể sử dụng token demo để test: pk.eyJ1IjoidGF4dWEiLCJhIjoiY2x0ZXN0In0...
                      </div>
                    </div>
                  </div>
                ) : (
                  <div ref={mapContainer} className="h-full w-full rounded-lg" />
                )}
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
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {locations.map((location) => {
                    const Icon = location.icon;
                    const isSelected = selectedLocation === location.id;
                    return (
                      <div
                        key={location.id}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer group ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:shadow-medium hover:border-primary/50'
                        }`}
                        onClick={() => handleLocationClick(location.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getTypeColor(location.type)} ${
                            isSelected ? 'bg-primary/10' : ''
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-inter font-semibold transition-colors truncate ${
                                isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                              }`}>
                                {location.name}
                              </h4>
                              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-muted-foreground">
                                  {location.rating}
                                </span>
                              </div>
                            </div>
                            <div className="mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {getTypeLabel(location.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {location.description}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                              {location.details.contact && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>Liên hệ</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Navigation className="w-3 h-3" />
                                <span>Chỉ đường</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Alert className="mt-6">
                  <MapPin className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Nhấp vào các địa điểm để xem chi tiết trên bản đồ 3D. 
                    Bản đồ sẽ tự động bay đến vị trí và hiển thị thông tin chi tiết.
                  </AlertDescription>
                </Alert>

                {!showTokenInput && (
                  <div className="mt-4 space-y-2">
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
                    <Button 
                      variant="outline" 
                      onClick={() => setShowTokenInput(true)}
                      className="w-full"
                      size="sm"
                    >
                      Thay Đổi Token
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;