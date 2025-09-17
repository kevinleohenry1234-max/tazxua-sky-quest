import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Camera, Mountain } from 'lucide-react';
import dragonSpineImage from '@/assets/dragon-spine.jpg';
import ShoppingAssistant from '@/components/ShoppingAssistant';
import InteractiveSafety from '@/components/InteractiveSafety';

const Attractions = () => {
  const attractions = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      description: 'Dãy núi hùng vĩ với hình dáng giống như sống lưng khủng long khổng lồ, là điểm đến không thể bỏ qua khi đến Tà Xùa.',
      image: dragonSpineImage,
      duration: '3-4 giờ',
      difficulty: 'Trung bình',
      bestTime: 'Sáng sớm (5-7h)',
      highlights: ['Điểm săn mây tuyệt đẹp', 'View toàn cảnh Tà Xùa', 'Chụp ảnh sống ảo']
    },
    {
      id: 2,
      name: 'Đỉnh Phu Sang',
      description: 'Đỉnh núi cao nhất khu vực với độ cao 2.865m, nơi có thể ngắm nhìn toàn cảnh vùng núi Tây Bắc.',
      image: dragonSpineImage,
      duration: '5-6 giờ',
      difficulty: 'Khó',
      bestTime: 'Cả ngày',
      highlights: ['Đỉnh cao nhất', 'Thử thách leo núi', 'Cảnh quan hùng vĩ']
    },
    {
      id: 3,
      name: 'Cây Cô Đơn',
      description: 'Cây thông cô đơn đứng giữa đồi chè, biểu tượng nổi tiếng của Tà Xùa với vẻ đẹp thơ mộng.',
      image: dragonSpineImage,
      duration: '1-2 giờ',
      difficulty: 'Dễ',
      bestTime: 'Chiều tà (16-18h)',
      highlights: ['Biểu tượng Tà Xùa', 'Dễ dàng tiếp cận', 'Ảnh đẹp hoàng hôn']
    },
    {
      id: 4,
      name: 'Đồi Chè Shan Tuyết',
      description: 'Những đồi chè cổ thụ hàng trăm năm tuổi với hương vị đặc biệt và cảnh quan xanh mướt.',
      image: dragonSpineImage,
      duration: '2-3 giờ',
      difficulty: 'Dễ',
      bestTime: 'Buổi sáng',
      highlights: ['Chè cổ thụ', 'Trải nghiệm hái chè', 'Thưởng thức trà tươi']
    },
    {
      id: 5,
      name: 'Thác Dải Yếm',
      description: 'Thác nước hùng vĩ với độ cao gần 100m, tạo thành những dải nước trắng như yếm đào.',
      image: dragonSpineImage,
      duration: '4-5 giờ',
      difficulty: 'Trung bình',
      bestTime: 'Mùa mưa (6-9)',
      highlights: ['Thác nước hùng vĩ', 'Tắm thác', 'Không khí trong lành']
    },
    {
      id: 6,
      name: 'Bản Púng',
      description: 'Bản làng người H\'Mông truyền thống với những ngôi nhà sàn và nét văn hóa độc đáo.',
      image: dragonSpineImage,
      duration: 'Nửa ngày',
      difficulty: 'Dễ',
      bestTime: 'Cả ngày',
      highlights: ['Văn hóa H\'Mông', 'Làng bản truyền thống', 'Ẩm thực địa phương']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-700';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-700';
      case 'Khó': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              Địa Điểm Nổi Bật
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Khám phá những danh lam thắng cảnh tuyệt đẹp của Tà Xùa
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Những Điểm Đến Không Thể Bỏ Qua
            </h2>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              Tà Xùa sở hữu những cảnh quan thiên nhiên hùng vĩ và đa dạng. Từ những đỉnh núi cao vút 
              đến những thác nước hùng vĩ, từ những đồi chè xanh mướt đến những bản làng truyền thống, 
              mỗi điểm đến đều mang một vẻ đẹp riêng biệt và những trải nghiệm khó quên.
            </p>
          </div>
        </section>

        {/* Attractions Grid */}
        <section className="pb-20 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(attraction.difficulty)}`}>
                      {attraction.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Camera className="w-4 h-4 text-gray-700" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-foreground flex items-center">
                    <Mountain className="w-5 h-5 mr-2 text-primary" />
                    {attraction.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {attraction.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-inter text-xs text-muted-foreground">Thời gian</div>
                        <div className="font-inter text-sm font-semibold">{attraction.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-inter text-xs text-muted-foreground">Thời điểm tốt nhất</div>
                        <div className="font-inter text-sm font-semibold">{attraction.bestTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-inter font-semibold text-foreground">Điểm nổi bật:</h4>
                    <div className="space-y-1">
                      {attraction.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="font-inter text-sm text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Xem Chi Tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shopping Assistant */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ShoppingAssistant />
          </div>
        </section>

        {/* Interactive Safety Hub */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <InteractiveSafety />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Attractions;