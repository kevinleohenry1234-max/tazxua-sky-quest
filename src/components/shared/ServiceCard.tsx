import React from 'react';
import { Star, MapPin, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  images: string[];
  price?: string;
  amenities: string[];
  features: string[];
  isPartner?: boolean;
  onViewDetails: (id: string) => void;
  children?: React.ReactNode; // For custom content specific to service type
  customBadges?: React.ReactNode; // For service-specific badges
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  location,
  rating,
  images,
  price,
  amenities,
  features,
  isPartner,
  onViewDetails,
  children,
  customBadges
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {images.length > 0 ? (
          <>
            <LazyImage
              src={images[currentImageIndex]}
              alt={`${name} - ${location}`}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  →
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-300 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Ảnh đang được cập nhật</p>
              <p className="text-xs text-gray-500 mt-1">Vui lòng quay lại sau</p>
            </div>
          </div>
        )}

        {/* Partner Badge */}
        {isPartner && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-emerald-500 text-white">Sky Quest Partner</Badge>
          </div>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          {price && (
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-emerald-600">{price}</div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating})</span>
          </div>
        </div>

        {/* Custom Badges */}
        {customBadges && (
          <div className="mb-3">
            {customBadges}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Custom Content */}
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{amenities.length - 3} khác
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={() => onViewDetails(id)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;