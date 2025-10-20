import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MapPoint {
  id: string;
  name: string;
  address: string;
  type: 'tram_y_te' | 'don_cong_an' | 'khu_tru_an' | 'khu_nguy_hiem';
  lat: number;
  lng: number;
  phone?: string;
}

interface FallbackMapProps {
  mapPoints: MapPoint[];
  className?: string;
}

interface MapConfig {
  boundingBox: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  imageSize: {
    width: number;
    height: number;
  };
}

const FallbackMap: React.FC<FallbackMapProps> = ({ mapPoints, className = '' }) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [mapConfig, setMapConfig] = useState<MapConfig | null>(null);

  useEffect(() => {
    // Load map configuration
    fetch('/fallback-map.json')
      .then(response => response.json())
      .then(config => setMapConfig(config))
      .catch(error => {
        console.error('Error loading map config:', error);
        // Fallback config
        setMapConfig({
          boundingBox: {
            north: 21.42,
            south: 21.25,
            east: 104.23,
            west: 104.03
          },
          imageSize: {
            width: 1600,
            height: 900
          }
        });
      });
  }, []);

  const convertLatLngToPixel = (lat: number, lng: number): { x: number; y: number } => {
    if (!mapConfig) return { x: 0, y: 0 };

    const { boundingBox, imageSize } = mapConfig;
    
    // Convert lat/lng to pixel coordinates
    const x = ((lng - boundingBox.west) / (boundingBox.east - boundingBox.west)) * imageSize.width;
    const y = ((boundingBox.north - lat) / (boundingBox.north - boundingBox.south)) * imageSize.height;
    
    return { x, y };
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'tram_y_te':
        return { icon: '🏥', color: '#15803d', label: 'Trạm Y tế' };
      case 'don_cong_an':
        return { icon: '👮', color: '#1d4ed8', label: 'Đồn Công an' };
      case 'khu_tru_an':
        return { icon: '🏠', color: '#059669', label: 'Khu trú ẩn' };
      case 'khu_nguy_hiem':
        return { icon: '⚠️', color: '#dc2626', label: 'Khu nguy hiểm' };
      default:
        return { icon: '📍', color: '#6b7280', label: 'Điểm khác' };
    }
  };

  const handleMarkerClick = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const handleCallPhone = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (!mapConfig) {
    return (
      <div className={`relative w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Đang tải bản đồ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden ${className}`}>
      {/* Background Map Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/taxua-map-fallback.jpg')`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B1A99] to-[#0B1B1A66]" />
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <h3 className="font-semibold text-[#0E4F45] text-sm">Bản đồ ngoại tuyến – Tà Xùa</h3>
          <p className="text-xs text-gray-600">Marker là vị trí tham khảo</p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <h4 className="font-medium text-xs text-[#0E4F45] mb-2">Chú thích</h4>
          <div className="space-y-1">
            {Object.entries({
              'tram_y_te': 'Trạm Y tế',
              'don_cong_an': 'Đồn Công an', 
              'khu_tru_an': 'Khu trú ẩn',
              'khu_nguy_hiem': 'Khu nguy hiểm'
            }).map(([type, label]) => {
              const marker = getMarkerIcon(type);
              return (
                <div key={type} className="flex items-center gap-2 text-xs">
                  <span className="text-sm">{marker.icon}</span>
                  <span className="text-gray-700">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Markers */}
      {mapPoints.map(point => {
        const { x, y } = convertLatLngToPixel(point.lat, point.lng);
        const marker = getMarkerIcon(point.type);
        
        // Only render if coordinates are within bounds
        if (x < 0 || x > mapConfig.imageSize.width || y < 0 || y > mapConfig.imageSize.height) {
          return null;
        }

        const percentX = (x / mapConfig.imageSize.width) * 100;
        const percentY = (y / mapConfig.imageSize.height) * 100;

        return (
          <div
            key={point.id}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${percentX}%`,
              top: `${percentY}%`
            }}
            onClick={() => handleMarkerClick(point)}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: marker.color }}
            >
              <span className="text-white text-sm">{marker.icon}</span>
            </div>
            
            {/* Pulse animation for danger zones */}
            {point.type === 'khu_nguy_hiem' && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: marker.color, opacity: 0.3 }}
              />
            )}
          </div>
        );
      })}

      {/* Selected Point Tooltip */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getMarkerIcon(selectedPoint.type).icon}</span>
                    <h4 className="font-semibold text-[#0E4F45]">{selectedPoint.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPoint(null)}
                      className="ml-auto p-1 h-auto"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPoint.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {getMarkerIcon(selectedPoint.type).label}
                      </span>
                    </div>
                  </div>
                  
                  {selectedPoint.phone && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        onClick={() => handleCallPhone(selectedPoint.phone!)}
                        size="sm"
                        className="bg-[#15803d] hover:bg-[#166534] text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi ngay
                      </Button>
                      <span className="text-sm text-gray-600 flex items-center">
                        {selectedPoint.phone}
                      </span>
                    </div>
                  )}
                  
                  {selectedPoint.type === 'khu_nguy_hiem' && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Cảnh báo: Khu vực nguy hiểm</span>
                      </div>
                      <p className="text-xs text-red-600 mt-1">
                        Tránh xa khu vực này, đặc biệt trong điều kiện thời tiết xấu
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Offline Indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-[#9CA3AF]/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          📍 Chế độ ngoại tuyến
        </div>
      </div>
    </div>
  );
};

export default FallbackMap;