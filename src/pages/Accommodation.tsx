import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import homestayImage from '@/assets/homestay-taxua.jpg';
import luHomestayImage from '@/assets/lu-homestay-taxua.jpg';

const Accommodation = () => {
  // Hàm xử lý mở chatbot
  const handleBookingClick = () => {
    // Kiểm tra xem chatbot widget đã load chưa
    if (typeof window !== 'undefined') {
      // Tìm button chatbot và click vào nó
      const chatButton = document.getElementById('phechat-chat-button');
      if (chatButton) {
        chatButton.click();
        return;
      }
      
      // Nếu không tìm thấy button, thử tìm theo class hoặc selector khác
      const chatWidget = document.querySelector('[id*="phechat"]') || 
                        document.querySelector('[class*="phechat"]') ||
                        document.querySelector('[class*="chat"]');
      
      if (chatWidget && chatWidget instanceof HTMLElement) {
        chatWidget.click();
        return;
      }
      
      // Fallback: thử gọi trực tiếp API nếu có
      const pheChat = (window as any).PheChat;
      if (pheChat && typeof pheChat.open === 'function') {
        pheChat.open();
        return;
      }
      
      // Nếu tất cả đều thất bại, hiển thị thông báo
      console.log('Chatbot đang được khởi tạo, vui lòng thử lại sau giây lát...');
      
      // Thử lại sau 2 giây
      setTimeout(() => {
        const retryButton = document.getElementById('phechat-chat-button');
        if (retryButton) {
          retryButton.click();
        } else {
          const retryPheChat = (window as any).PheChat;
          if (retryPheChat && typeof retryPheChat.open === 'function') {
            retryPheChat.open();
          }
        }
      }, 2000);
    }
  };

  const accommodations = [
    {
      id: 1,
      name: '1941M Homestay Tà Xùa',
      description: 'Homestay hiện đại với view núi rừng tuyệt đẹp, nằm ở độ cao 1941m so với mực nước biển',
      image: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Ngoại thất /1.webp',
      rating: 4.9,
      price: '1.200.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      amenities: ['Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Quầy lễ tân 24/24', 'Dịch vụ giữ hành lý', 'Khu ăn uống', 'View núi rừng'],
      features: ['Độ cao 1941m', 'View biển mây', 'Thiết kế hiện đại', 'Gần điểm săn mây']
    },
    {
      id: 2,
      name: 'May Home Tà Xùa',
      description: 'Homestay ấm cúng với không gian thoáng mát và dịch vụ chu đáo',
      image: '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may2.webp',
      rating: 4.8,
      price: '900.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      amenities: ['Ăn sáng miễn phí', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Khu ăn chung', 'Dịch vụ giặt ủi', 'Tư vấn tour'],
      features: ['Không gian ấm cúng', 'Dịch vụ chu đáo', 'Giá cả hợp lý', 'Gần trung tâm']
    },
    {
      id: 3,
      name: 'Tà Xùa Ecolodge',
      description: 'Ecolodge cao cấp với thiết kế hiện đại giữa thiên nhiên hoang sơ',
      image: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Xung quanh /Tà Xùa Ecolodge.jpg',
      rating: 4.9,
      price: '1.500.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      amenities: ['Bể bơi', 'Ăn sáng miễn phí', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Quầy lễ tân 24/24', 'Dịch vụ giữ hành lý'],
      features: ['Thiết kế cao cấp', 'View biển mây', 'Gần điểm săn mây', 'Dịch vụ 5 sao']
    },
    {
      id: 4,
      name: 'Xoè Homestay',
      description: 'Homestay truyền thống với phong cách kiến trúc địa phương độc đáo',
      image: '/Địa điểm lưu trú/Xoè Homestay /Photo /10.webp',
      rating: 4.7,
      price: '700.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      amenities: ['Bữa ăn truyền thống', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Hoạt động văn hóa', 'Trekking guide', 'Trải nghiệm địa phương'],
      features: ['Kiến trúc truyền thống', 'Văn hóa bản địa', 'Trải nghiệm chân thật', 'Giá cả phải chăng']
    },
    {
      id: 5,
      name: 'Lù Homestay Tà Xùa',
      description: 'Homestay giữa lòng núi rừng với view săn mây tuyệt đẹp',
      image: '/Địa điểm lưu trú/Lù Homestay Tà Xùa.jpg',
      rating: 4.8,
      price: '800.000',
      location: 'Bản Tà Xùa, Xã Tà Xùa, Sơn La',
      amenities: ['Ăn sáng miễn phí', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Quầy lễ tân 24/24', 'Dịch vụ giữ hành lý', 'View săn mây'],
      features: ['View biển mây', 'Gần điểm săn mây', 'Trải nghiệm văn hóa H\'Mông', 'Không gian yên tĩnh']
    }
  ];

  const amenityIcons = {
    'Bể bơi': Star,
    'Ăn sáng miễn phí': Coffee,
    'Wi-Fi miễn phí': Wifi,
    'Chỗ đậu xe miễn phí': Car,
    'Quầy lễ tân 24/24': Star,
    'Dịch vụ giữ hành lý': Star,
    'Bữa ăn truyền thống': Utensils,
    'Hoạt động văn hóa': Star,
    'Trekking guide': MapPin,
    'Khu ăn uống': Utensils,
    'View núi rừng': MapPin,
    'Khu ăn chung': Utensils,
    'Dịch vụ giặt ủi': Star,
    'Tư vấn tour': MapPin,
    'View săn mây': MapPin,
    'Trải nghiệm địa phương': Star
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
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleBookingClick}
                    >
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