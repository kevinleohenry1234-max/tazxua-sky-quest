import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import homestayImage from '@/assets/homestay-taxua.jpg';

const Accommodation = () => {
  const accommodations = [
    {
      id: 1,
      name: 'Tà Xùa Cloud Homestay',
      description: 'Homestay giữa lòng núi rừng với view săn mây tuyệt đẹp',
      image: homestayImage,
      rating: 4.8,
      price: '800.000',
      location: 'Tà Xùa, Sơn La',
      amenities: ['Wifi miễn phí', 'Bãi đậu xe', 'Quán cà phê', 'Nhà hàng'],
      features: ['View biển mây', 'Gần điểm săn mây', 'Trải nghiệm văn hóa H\'Mông']
    },
    {
      id: 2,
      name: 'Dragon Spine Resort',
      description: 'Resort cao cấp với thiết kế hiện đại giữa thiên nhiên hoang sơ',
      image: homestayImage,
      rating: 4.9,
      price: '1.500.000',
      location: 'Sống Lưng Khủng Long, Tà Xùa',
      amenities: ['Spa & Wellness', 'Hồ bơi', 'Nhà hàng sang trọng', 'Tour guide'],
      features: ['Vị trí độc đáo', 'Dịch vụ cao cấp', 'Trải nghiệm thiên nhiên']
    },
    {
      id: 3,
      name: 'H\'Mông Village Stay',
      description: 'Trải nghiệm đích thực cuộc sống người H\'Mông tại bản làng',
      image: homestayImage,
      rating: 4.7,
      price: '500.000',
      location: 'Bản Púng, Tà Xùa',
      amenities: ['Bữa ăn truyền thống', 'Hoạt động văn hóa', 'Trekking guide'],
      features: ['Văn hóa bản địa', 'Giá cả phải chăng', 'Trải nghiệm chân thật']
    }
  ];

  const amenityIcons = {
    'Wifi miễn phí': Wifi,
    'Bãi đậu xe': Car,
    'Quán cà phê': Coffee,
    'Nhà hàng': Utensils,
    'Spa & Wellness': Star,
    'Hồ bơi': Star,
    'Nhà hàng sang trọng': Utensils,
    'Tour guide': MapPin,
    'Bữa ăn truyền thống': Utensils,
    'Hoạt động văn hóa': Star,
    'Trekking guide': MapPin
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Địa Điểm Lưu Trú
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Khám phá những nơi nghỉ dưỡng tuyệt vời giữa lòng núi rừng Tà Xùa
            </p>
          </div>
        </section>

        {/* Accommodations Grid */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {accommodations.map((place) => (
              <Card key={place.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-inter text-sm font-semibold">{place.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-foreground">
                    {place.name}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-inter text-sm">{place.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {place.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-inter font-semibold text-foreground">Đặc điểm nổi bật:</h4>
                    <div className="flex flex-wrap gap-2">
                      {place.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <h4 className="font-inter font-semibold text-foreground">Tiện ích:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {place.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star;
                        return (
                          <div key={index} className="flex items-center space-x-2">
                            <IconComponent className="w-4 h-4 text-primary" />
                            <span className="font-inter text-sm text-muted-foreground">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price and Booking */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="font-inter text-2xl font-bold text-primary">
                        {parseInt(place.price).toLocaleString()}đ
                      </span>
                      <span className="font-inter text-sm text-muted-foreground">/đêm</span>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Đặt Ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Không Tìm Thấy Nơi Phù Hợp?
            </h2>
            <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Liên hệ với chúng tôi để được tư vấn và hỗ trợ tìm kiếm địa điểm lưu trú phù hợp với nhu cầu của bạn
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accommodation;