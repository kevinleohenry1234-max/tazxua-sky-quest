import React from 'react';
import { MapPin } from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  description: string;
  image?: string;
  type: 'viewpoint' | 'attraction' | 'accommodation' | 'trail';
}

interface GoogleMapsComponentProps {
  locations: MapLocation[];
  selectedLocation?: string;
  onLocationSelect?: (locationId: string) => void;
  className?: string;
}

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  className = ""
}) => {
  const handleLocationClick = (locationId: string) => {
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
  };

  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Placeholder for Google Maps */}
      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
        <div className="text-center p-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Bản đồ Tà Xùa</p>
          <p className="text-sm text-gray-500">Google Maps sẽ được tích hợp tại đây</p>
        </div>
        
        {/* Location markers overlay */}
        <div className="absolute inset-0 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`bg-white/80 backdrop-blur-sm rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 ${
                  selectedLocation === location.id ? 'ring-2 ring-blue-500 bg-white/95' : ''
                }`}
                onClick={() => handleLocationClick(location.id)}
                style={{
                  gridColumn: index % 3 === 0 ? '1' : index % 3 === 1 ? '2' : '3',
                  gridRow: Math.floor(index / 3) + 1
                }}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {location.name}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {location.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsComponent;