import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mountain, Camera, Navigation } from 'lucide-react';
import { ATTRACTIONS_DATA, Attraction } from '@/data/attractionsData';
import LazyImage from '@/components/LazyImage';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different categories
const createCustomIcon = (category: string) => {
  const iconColors = {
    mountain: '#ef4444', // red
    forest: '#22c55e',   // green
    viewpoint: '#3b82f6', // blue
    cultural: '#f59e0b'   // amber
  };

  const color = iconColors[category as keyof typeof iconColors] || '#6b7280';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to fit map bounds to all markers
const FitBounds: React.FC<{ attractions: Attraction[] }> = ({ attractions }) => {
  const map = useMap();

  useEffect(() => {
    if (attractions.length > 0) {
      const validAttractions = attractions.filter(attraction => 
        attraction.coordinates && 
        attraction.coordinates.lat && 
        attraction.coordinates.lng
      );

      if (validAttractions.length > 0) {
        const bounds = L.latLngBounds(
          validAttractions.map(attraction => [
            attraction.coordinates!.lat,
            attraction.coordinates!.lng
          ])
        );
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [map, attractions]);

  return null;
};

interface InteractiveMapProps {
  selectedAttraction?: string;
  onAttractionSelect?: (attractionId: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  selectedAttraction, 
  onAttractionSelect 
}) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Filter attractions that have coordinates
  const attractionsWithCoords = ATTRACTIONS_DATA.filter(attraction => 
    attraction.coordinates && 
    attraction.coordinates.lat && 
    attraction.coordinates.lng
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mountain':
        return <Mountain className="w-4 h-4" />;
      case 'forest':
        return <Camera className="w-4 h-4" />;
      case 'viewpoint':
        return <Navigation className="w-4 h-4" />;
      case 'cultural':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const handleMarkerClick = (attractionId: string) => {
    setSelectedMarker(attractionId);
    onAttractionSelect?.(attractionId);
  };

  // Center coordinates for Tà Xùa region
  const center: [number, number] = [21.315, 104.415];

  return (
    <div className="w-full space-y-6">
      {/* Map Header */}
      <div className="text-center">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
          Bản Đồ Tương Tác Tà Xùa
        </h3>
        <p className="font-inter text-muted-foreground">
          Khám phá các điểm tham quan trên bản đồ. Click vào marker để xem chi tiết.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[500px] w-full relative">
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <FitBounds attractions={attractionsWithCoords} />

                {attractionsWithCoords.map((attraction) => (
                  <Marker
                    key={attraction.id}
                    position={[attraction.coordinates!.lat, attraction.coordinates!.lng]}
                    icon={createCustomIcon(attraction.category)}
                    eventHandlers={{
                      click: () => handleMarkerClick(attraction.id),
                    }}
                  >
                    <Popup className="custom-popup" maxWidth={300}>
                      <div className="p-2 space-y-3">
                        {/* Attraction Image */}
                        {attraction.images && attraction.images.length > 0 && (
                          <div className="relative h-32 w-full overflow-hidden rounded-lg">
                            <LazyImage
                              src={attraction.images[0]}
                              alt={attraction.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Attraction Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(attraction.category)}
                            <h4 className="font-playfair font-bold text-lg text-foreground">
                              {attraction.name}
                            </h4>
                          </div>

                          <p className="font-inter text-sm text-muted-foreground line-clamp-2">
                            {attraction.shortDescription}
                          </p>

                          {/* Badges */}
                          <div className="flex gap-2 flex-wrap">
                            <Badge className={getDifficultyColor(attraction.difficulty)}>
                              {attraction.difficulty === 'easy' ? 'Dễ' : 
                               attraction.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {attraction.duration}
                            </Badge>
                          </div>

                          {/* Best Time */}
                          <div className="text-xs text-muted-foreground">
                            <strong>Thời điểm tốt nhất:</strong> {attraction.bestTime}
                          </div>

                          {/* Action Button */}
                          <Button 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => {
                              // Scroll to attraction in the main list or show details
                              const element = document.getElementById(`attraction-${attraction.id}`);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            Xem Chi Tiết
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Map Legend */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Chú Thích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                <span className="text-sm">Núi đá</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                <span className="text-sm">Rừng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                <span className="text-sm">Điểm ngắm cảnh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md"></div>
                <span className="text-sm">Văn hóa</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{attractionsWithCoords.length}</div>
            <div className="text-sm text-muted-foreground">Điểm tham quan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {attractionsWithCoords.filter(a => a.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-muted-foreground">Điểm dễ tiếp cận</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {attractionsWithCoords.filter(a => a.category === 'viewpoint').length}
            </div>
            <div className="text-sm text-muted-foreground">Điểm ngắm cảnh</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;