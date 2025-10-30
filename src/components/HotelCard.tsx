import React, { useState, useEffect, useRef } from 'react';
import { HomestayReal } from '../data/homestayRealData';
import { Star, MapPin, Phone, Wifi, Car, Coffee, Users, Play, Pause } from 'lucide-react';
import LazyImage from './LazyImage';

interface HotelCardProps {
  hotel: HomestayReal;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleImageError = () => {
    setImageError(true);
  };

  // Auto slideshow effect
  useEffect(() => {
    if (hotel.images.length > 1 && isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
      }, 4000); // 4 seconds for smooth slideshow
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hotel.images.length, isAutoPlaying]);

  // Pause auto slideshow on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Resume auto slideshow on mouse leave
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextImage = () => {
    if (hotel.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    }
  };

  const prevImage = () => {
    if (hotel.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('xe') || amenity.toLowerCase().includes('đậu')) return <Car className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('cà phê') || amenity.toLowerCase().includes('coffee')) return <Coffee className="w-4 h-4" />;
    if (amenity.toLowerCase().includes('lễ tân') || amenity.toLowerCase().includes('24')) return <Users className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-blue-500 rounded-full" />;
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div 
        className="relative h-64 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hotel.images.length > 0 && !imageError ? (
          <>
            <LazyImage
              src={hotel.images[currentImageIndex]}
              alt={`${hotel.name} - Homestay tại ${hotel.location}, Tà Xùa`}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            {hotel.images.length > 1 && (
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
                
                {/* Auto-play control button */}
                <button
                  onClick={toggleAutoPlay}
                  className="absolute top-3 left-3 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                  title={isAutoPlaying ? 'Tạm dừng slideshow' : 'Phát slideshow'}
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {hotel.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-300 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Ảnh đang được cập nhật</p>
              <p className="text-xs text-gray-500 mt-1">Vui lòng quay lại sau</p>
            </div>
          </div>
        )}
        
        {/* Rating Badge */}
        {hotel.rating > 0 && (
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Hotel Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {hotel.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {hotel.description}
        </p>

        {/* Amenities */}
        {hotel.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Tiện nghi:</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {hotel.amenities.length > 4 && (
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  +{hotel.amenities.length - 4} khác
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {hotel.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Điểm nổi bật:</h4>
            <div className="space-y-1">
              {hotel.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="text-xs text-gray-600 flex items-center">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Contact */}
          {hotel.contact.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-sm">{hotel.contact.phone}</span>
            </div>
          )}

          {/* Price */}
          {hotel.price && (
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">{hotel.price}</div>
              <div className="text-xs text-gray-500">/ đêm</div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default HotelCard;