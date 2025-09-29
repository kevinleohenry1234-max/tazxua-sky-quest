import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Users, 
  Phone,
  Wifi,
  Coffee,
  Car,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { homestayData, HomestayData } from '@/data/homestayData';

const HomestayShowcase = () => {
  const [selectedHomestay, setSelectedHomestay] = useState<HomestayData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewDetails = (homestay: HomestayData) => {
    setSelectedHomestay(homestay);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedHomestay(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedHomestay) {
      setCurrentImageIndex((prev) => 
        prev === selectedHomestay.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedHomestay) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedHomestay.images.length - 1 : prev - 1
      );
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <section id="homestay-showcase" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Địa Điểm Lưu Trú Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Khám phá những homestay và resort tuyệt đẹp với đầy đủ tiện nghi, 
            mang đến trải nghiệm nghỉ dưỡng hoàn hảo giữa lòng núi rừng Tà Xùa
          </p>
        </div>

        {/* Homestay Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homestayData.map((homestay) => (
            <Card key={homestay.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={homestay.images[0]}
                  alt={homestay.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className={`w-3 h-3 mr-1 ${getRatingColor(homestay.rating)} fill-current`} />
                    {homestay.rating}
                  </Badge>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-playfair text-xl font-bold mb-2 line-clamp-2">
                    {homestay.name}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-inter">{homestay.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <p className="font-inter text-muted-foreground text-sm line-clamp-3">
                  {homestay.description}
                </p>

                {/* Price and Capacity */}
                <div className="flex justify-between items-center text-sm">
                  <div className="font-inter font-semibold text-primary">
                    {homestay.priceRange}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="font-inter">{homestay.capacity}</span>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-1">
                  {homestay.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {homestay.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{homestay.amenities.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="font-inter font-semibold text-foreground text-sm">Điểm nổi bật:</h4>
                  <div className="flex flex-wrap gap-1">
                    {homestay.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleViewDetails(homestay)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem Chi Tiết
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Liên Hệ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              const element = document.getElementById('homestay-showcase');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Xem Tất Cả Homestay
          </Button>
        </div>
      </div>

      {/* Modal for Homestay Details */}
      {selectedHomestay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close Button */}
              <Button
                onClick={handleCloseModal}
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              >
                ✕
              </Button>

              {/* Image Gallery */}
              <div className="relative h-96">
                <LazyImage
                  src={selectedHomestay.images[currentImageIndex]}
                  alt={selectedHomestay.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {selectedHomestay.images.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextImage}
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedHomestay.images.length}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {selectedHomestay.name}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <Star className={`w-4 h-4 mr-1 ${getRatingColor(selectedHomestay.rating)} fill-current`} />
                      <span className="font-inter">{selectedHomestay.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-inter">{selectedHomestay.location}</span>
                    </div>
                  </div>
                </div>

                <p className="font-inter text-muted-foreground">
                  {selectedHomestay.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-inter font-semibold text-foreground mb-3">Thông tin cơ bản</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giá:</span>
                        <span className="font-semibold text-primary">{selectedHomestay.priceRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sức chứa:</span>
                        <span className="font-inter">{selectedHomestay.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Liên hệ:</span>
                        <span className="font-inter">{selectedHomestay.contact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-inter font-semibold text-foreground mb-3">Tiện nghi</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHomestay.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-inter font-semibold text-foreground mb-3">Điểm nổi bật</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHomestay.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Liên Hệ Đặt Phòng
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Xem Bản Đồ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomestayShowcase;