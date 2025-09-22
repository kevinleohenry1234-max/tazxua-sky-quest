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
      description: 'Homestay hiện đại với view núi rừng tuyệt đẹp, nằm ở độ cao 1941m so với mực nước biển. Không gian thoáng mát với thiết kế hiện đại, phù hợp cho những ai yêu thích sự tiện nghi và muốn trải nghiệm săn mây tại Tà Xùa.',
      image: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Ngoại thất /1.webp',
      gallery: [
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Ngoại thất /1.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Ngoại thất /2.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Phòng /1.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Phòng /2.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Phòng /3.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Phòng /KHU ĂN UỐNG_.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /1.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /2.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /3.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /4.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /5.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /6.webp',
        '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /7.webp'
      ],
      rating: 4.9,
      price: '1.200.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      contact: {
        phone: '+84 987 654 321',
        email: '1941m@taxua.com',
        address: 'Bản Tà Xùa, Xã Tà Xùa, Huyện Bắc Yên, Tỉnh Sơn La'
      },
      amenities: ['Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Quầy lễ tân 24/24', 'Dịch vụ giữ hành lý', 'Khu ăn uống', 'View núi rừng', 'Điều hòa', 'Tivi', 'Tủ lạnh mini'],
      features: ['Độ cao 1941m', 'View biển mây', 'Thiết kế hiện đại', 'Gần điểm săn mây', 'Phòng rộng rãi', 'Nội thất cao cấp'],
      roomTypes: [
        { name: 'Phòng Standard', capacity: '2 người', price: '1.000.000', amenities: ['Giường đôi', 'Phòng tắm riêng', 'View núi'] },
        { name: 'Phòng Deluxe', capacity: '2-3 người', price: '1.200.000', amenities: ['Giường đôi + giường đơn', 'Phòng tắm riêng', 'Ban công view biển mây'] },
        { name: 'Phòng Family', capacity: '4-5 người', price: '1.500.000', amenities: ['2 giường đôi', 'Phòng tắm riêng', 'Khu vực sinh hoạt chung'] }
      ],
      policies: {
        checkIn: '14:00',
        checkOut: '12:00',
        cancellation: 'Miễn phí hủy trước 24h',
        deposit: '50% tổng tiền phòng'
      }
    },
    {
      id: 2,
      name: 'May Home Tà Xùa',
      description: 'Homestay ấm cúng với không gian thoáng mát và dịch vụ chu đáo. Được thiết kế theo phong cách hiện đại nhưng vẫn giữ được nét truyền thống, tạo cảm giác gần gũi và thân thiện cho du khách.',
      image: '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may2.webp',
      gallery: [
        '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may2.webp',
        '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may3.webp',
        '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may4.webp',
        '/Địa điểm lưu trú/May Home Tà Xùa /Photo/Phòng /may5.webp'
      ],
      rating: 4.8,
      price: '900.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      contact: {
        phone: '+84 976 543 210',
        email: 'mayhome@taxua.com',
        address: 'Bản Tà Xùa, Xã Tà Xùa, Huyện Bắc Yên, Tỉnh Sơn La'
      },
      amenities: ['Ăn sáng miễn phí', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Khu ăn chung', 'Dịch vụ giặt ủi', 'Tư vấn tour', 'Cho thuê xe máy', 'Bếp chung'],
      features: ['Không gian ấm cúng', 'Dịch vụ chu đáo', 'Giá cả hợp lý', 'Gần trung tâm', 'Chủ nhà thân thiện', 'Môi trường sạch sẽ'],
      roomTypes: [
        { name: 'Phòng đơn', capacity: '1-2 người', price: '700.000', amenities: ['Giường đôi', 'Phòng tắm chung', 'Tủ quần áo'] },
        { name: 'Phòng đôi', capacity: '2-3 người', price: '900.000', amenities: ['Giường đôi', 'Phòng tắm riêng', 'Ban công nhỏ'] },
        { name: 'Phòng gia đình', capacity: '4 người', price: '1.200.000', amenities: ['2 giường đôi', 'Phòng tắm riêng', 'Khu vực ngồi'] }
      ],
      policies: {
        checkIn: '14:00',
        checkOut: '11:00',
        cancellation: 'Miễn phí hủy trước 48h',
        deposit: '30% tổng tiền phòng'
      }
    },
    {
      id: 3,
      name: 'Tà Xùa Ecolodge',
      description: 'Ecolodge cao cấp với thiết kế hiện đại giữa thiên nhiên hoang sơ. Kết hợp hoàn hảo giữa sự tiện nghi hiện đại và vẻ đẹp tự nhiên của núi rừng Tà Xùa, mang đến trải nghiệm nghỉ dưỡng đẳng cấp.',
      image: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Xung quanh /Tà Xùa Ecolodge.jpg',
      gallery: [
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Ngoại thất /1.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Ngoại thất /2.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Phòng /1.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Phòng /2.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Phòng /3.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Khu vực công cộng /1.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Khu vực công cộng /2.webp',
        '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Xung quanh /Tà Xùa Ecolodge.jpg'
      ],
      rating: 4.9,
      price: '1.500.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      contact: {
        phone: '+84 965 432 109',
        email: 'ecolodge@taxua.com',
        address: 'Đỉnh Tà Xùa, Xã Tà Xùa, Huyện Bắc Yên, Tỉnh Sơn La'
      },
      amenities: ['Bể bơi', 'Ăn sáng miễn phí', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Quầy lễ tân 24/24', 'Dịch vụ giữ hành lý', 'Spa', 'Nhà hàng', 'Bar', 'Gym'],
      features: ['Thiết kế cao cấp', 'View biển mây', 'Gần điểm săn mây', 'Dịch vụ 5 sao', 'Kiến trúc sinh thái', 'Không gian riêng tư'],
      roomTypes: [
        { name: 'Superior Room', capacity: '2 người', price: '1.200.000', amenities: ['Giường king size', 'Phòng tắm cao cấp', 'Ban công view núi'] },
        { name: 'Deluxe Room', capacity: '2-3 người', price: '1.500.000', amenities: ['Giường king size', 'Phòng tắm jacuzzi', 'Ban công view biển mây'] },
        { name: 'Suite Room', capacity: '4 người', price: '2.000.000', amenities: ['Phòng khách riêng', 'Phòng tắm cao cấp', 'Sân hiên rộng'] }
      ],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        cancellation: 'Miễn phí hủy trước 72h',
        deposit: '50% tổng tiền phòng'
      }
    },
    {
      id: 4,
      name: 'Xoè Homestay',
      description: 'Homestay truyền thống với phong cách kiến trúc địa phương độc đáo. Được xây dựng theo lối kiến trúc nhà sàn truyền thống của người H\'Mông, mang đến trải nghiệm văn hóa chân thật và gần gũi với thiên nhiên.',
      image: '/Địa điểm lưu trú/Xoè Homestay /Photo /10.webp',
      gallery: [
        '/Địa điểm lưu trú/Xoè Homestay /Photo /10.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /12.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /13.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /14.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /15.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /16.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /18.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /19.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /20.webp',
        '/Địa điểm lưu trú/Xoè Homestay /Photo /22.webp'
      ],
      rating: 4.7,
      price: '700.000',
      location: 'Tà Xùa, Bắc Yên, Sơn La',
      contact: {
        phone: '+84 954 321 098',
        email: 'xoe@taxua.com',
        address: 'Bản Tà Xùa, Xã Tà Xùa, Huyện Bắc Yên, Tỉnh Sơn La'
      },
      amenities: ['Bữa ăn truyền thống', 'Wi-Fi miễn phí', 'Chỗ đậu xe miễn phí', 'Hoạt động văn hóa', 'Trekking guide', 'Trải nghiệm địa phương', 'Lửa trại', 'Nhạc dân gian'],
      features: ['Kiến trúc truyền thống', 'Văn hóa bản địa', 'Trải nghiệm chân thật', 'Giá cả phải chăng', 'Nhà sàn H\'Mông', 'Không gian cộng đồng'],
      roomTypes: [
        { name: 'Phòng nhà sàn', capacity: '2-3 người', price: '600.000', amenities: ['Giường truyền thống', 'Phòng tắm chung', 'Không gian mở'] },
        { name: 'Phòng gia đình', capacity: '4-6 người', price: '700.000', amenities: ['Nhiều giường', 'Phòng tắm riêng', 'Khu vực sinh hoạt'] },
        { name: 'Nhà sàn riêng', capacity: '6-8 người', price: '1.000.000', amenities: ['Toàn bộ nhà sàn', 'Bếp riêng', 'Sân hiên rộng'] }
      ],
      policies: {
        checkIn: '14:00',
        checkOut: '11:00',
        cancellation: 'Miễn phí hủy trước 24h',
        deposit: '20% tổng tiền phòng'
      }
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
              <Card key={place.id} className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] card-hover">
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary/90 text-white border-0 backdrop-blur-sm pulse-on-hover px-3 py-1 rounded-full flex items-center space-x-1">
                      ⭐ {place.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {place.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{place.location}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Tiện ích nổi bật</h4>
                      <div className="flex flex-wrap gap-2">
                        {place.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs bg-secondary/10 text-secondary border-secondary/20 stagger-animation px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Dịch vụ</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {place.amenities.slice(0, 4).map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-600 stagger-animation">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary gradient-text">
                        {parseInt(place.price).toLocaleString()}₫
                      </p>
                      <p className="text-xs text-gray-500">/ đêm</p>
                    </div>
                    
                    <Button 
                      onClick={handleBookingClick}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 btn-primary focus-ring"
                    >
                      Đặt phòng
                    </Button>
                  </div>
                </div>
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