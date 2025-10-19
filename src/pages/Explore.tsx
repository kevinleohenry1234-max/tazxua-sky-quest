import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import GoogleMapSection from '@/components/GoogleMapSection';
import { AttractionGrid } from '@/components/AttractionGrid';
import SafetyHub from '@/components/SafetyHub';
import { Attraction } from '@/data/attractionsData';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, TreePine, Mountain, Users, Leaf, ArrowRight, Info } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const navigate = useNavigate();

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    console.log('Selected attraction:', attraction);
  };

  // Điểm đến nổi bật với dữ liệu thật
  const featuredDestinations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      description: 'Đỉnh núi hùng vĩ với tầm nhìn 360° tuyệt đẹp',
      image: '/images/dragon-spine.jpg',
      rating: 4.9,
      reviews: 127,
      greenBadge: 'Địa điểm xanh xác thực',
      greenInfo: 'Đã trồng 45 cây, dùng năng lượng mặt trời 80%, thuê 12 người bản địa',
      difficulty: 'Khó',
      duration: '4-5 giờ'
    },
    {
      id: 2,
      name: 'Rừng Thông Tà Xùa',
      description: 'Rừng thông nguyên sinh với không khí trong lành',
      image: '/images/pine-forest.jpg',
      rating: 4.8,
      reviews: 89,
      greenBadge: 'Địa điểm xanh xác thực',
      greenInfo: 'Đã trồng 32 cây, dùng năng lượng mặt trời 75%, thuê 8 người bản địa',
      difficulty: 'Trung bình',
      duration: '2-3 giờ'
    },
    {
      id: 3,
      name: 'Bản H\'Mông Tà Xùa',
      description: 'Trải nghiệm văn hóa bản địa đích thực',
      image: '/images/hmong-village.jpg',
      rating: 4.7,
      reviews: 156,
      greenBadge: 'Địa điểm xanh xác thực',
      greenInfo: 'Đã trồng 28 cây, dùng năng lượng mặt trời 60%, thuê 15 người bản địa',
      difficulty: 'Dễ',
      duration: '3-4 giờ'
    }
  ];

  // Hoạt động xanh gợi ý
  const greenActivities = [
    {
      id: 1,
      name: 'Trồng cây bản địa',
      description: 'Tham gia trồng cây thông và cây quế bản địa',
      icon: TreePine,
      impact: 'Mỗi cây trồng hấp thụ ~22kg CO2/năm',
      participants: 234
    },
    {
      id: 2,
      name: 'Thu gom rác thải',
      description: 'Làm sạch đường mòn và khu vực cắm trại',
      icon: Leaf,
      impact: 'Đã thu gom 1.2 tấn rác trong 6 tháng qua',
      participants: 189
    },
    {
      id: 3,
      name: 'Tham quan bản làng',
      description: 'Học hỏi văn hóa và hỗ trợ kinh tế bản địa',
      icon: Users,
      impact: 'Tạo thu nhập cho 45 gia đình bản địa',
      participants: 312
    },
    {
      id: 4,
      name: 'Thưởng thức trà Shan Tuyết',
      description: 'Trải nghiệm trà cổ thụ từ người H\'Mông',
      icon: Mountain,
      impact: 'Bảo tồn 120 cây trà cổ thụ trên 100 tuổi',
      participants: 278
    }
  ];

  return (
    <Layout>
      <Header />
      <main className="min-h-screen">
        {/* Hero Banner với ảnh thật */}
        <section 
          className="relative h-[75vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.2)), url('/images/taxua-mist-mountain.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-teal-50/20 to-cyan-50/40" />
          
          {/* Floating elements for airy feeling */}
          <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-300/60 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-cyan-300/40 rounded-full animate-pulse delay-700"></div>
          
          <div className="relative z-10 text-center px-4">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800 leading-tight">
                Những Câu Chuyện Đang Chờ Bạn
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-700 leading-relaxed">
                Mỗi con đường, mỗi ngọn núi đều có những điều kỳ diệu để kể
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2 bg-white/30 rounded-full px-4 py-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Hình ảnh chân thật</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/30 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Câu chuyện từ người dân</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/30 rounded-full px-4 py-2">
                  <Mountain className="w-4 h-4 text-cyan-600" />
                  <span>Trải nghiệm thật</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Điểm đến nổi bật */}
        <section className="py-20 bg-gradient-to-b from-emerald-50/50 via-white to-teal-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Những Nơi Đáng Tin Cậy
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Được xác thực bởi cộng đồng du khách và người dân địa phương
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="relative h-56 overflow-hidden">
                    <LazyImage
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-600 backdrop-blur-sm border-0 shadow-lg">
                        <Leaf className="w-3 h-3 mr-1" />
                        Xác thực xanh
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-slate-800">{destination.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-amber-400 fill-current" />
                        <span className="text-lg font-semibold text-slate-700">{destination.rating}</span>
                        <span className="text-sm text-slate-500">({destination.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">{destination.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-3">
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">{destination.difficulty}</Badge>
                        <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">{destination.duration}</Badge>
                      </div>
                    </div>

                    {/* Tooltip thông tin xanh */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 mb-6 group">
                      <div className="flex items-center space-x-2 mb-2">
                        <Info className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-800">Minh bạch 100%</span>
                      </div>
                      <p className="text-sm text-emerald-700 leading-relaxed">{destination.greenInfo}</p>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-medium"
                      onClick={() => handleAttractionClick(destination as any)}
                    >
                      Khám phá câu chuyện
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hoạt động xanh gợi ý */}
        <section className="py-20 bg-gradient-to-b from-teal-50/30 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Hành Động Có Ý Nghĩa
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Mỗi trải nghiệm đều góp phần làm Tà Xùa xanh hơn. Cùng nhau tạo nên những thay đổi tích cực.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {greenActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <Card key={activity.id} className="text-center hover:shadow-2xl transition-all duration-500 group bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4">{activity.name}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{activity.description}</p>
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 mb-6">
                        <p className="text-sm text-emerald-700 font-medium">{activity.impact}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-slate-500 mb-6">
                        <Users className="w-5 h-5" />
                        <span className="text-sm">{activity.participants} người cùng hành động</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
                      >
                        Tham gia ngay
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA to Sky Quest */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-12 max-w-4xl mx-auto border border-emerald-200">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Sẵn sàng cho hành trình lớn hơn?</h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Tham gia Sky Quest - nơi mỗi thử thách đều mang lại giá trị thật cho Tà Xùa
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => navigate('/sky-quest/journey')}
                  >
                    Hành động vì Tà Xùa
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-medium"
                    onClick={() => navigate('/about')}
                  >
                    Tìm hiểu thêm về Tà Xùa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bản Đồ Các Địa Điểm
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Xem vị trí chính xác của các địa điểm du lịch trên bản đồ để lên kế hoạch hành trình của bạn
              </p>
            </div>
            <GoogleMapSection />
          </div>
        </section>
      </main>
      
      {/* Safety Hub */}
      <SafetyHub />
      
      <Footer />
    </Layout>
  );
};

export default Explore;