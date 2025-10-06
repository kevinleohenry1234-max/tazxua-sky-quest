import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation,
  Clock,
  Users,
  Star,
  Mountain,
  TreePine,
  Coffee,
  Home,
  Filter,
  Calendar,
  Compass
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taxuaMountainBg from '@/assets/taxua-mountain-bg.svg';
import AttractionImageSlider from '@/components/AttractionImageSlider';

const ExploreSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const locations = [
    {
      id: 1,
      name: 'Cây Cô Đơn',
      category: 'mountain',
      description: 'Cây cô đơn Tà Xùa là một cây thông cổ thụ mọc lẻ loi trên đỉnh núi, trở thành biểu tượng nổi tiếng của vùng đất này.',
      images: [
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-1.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-3.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-4.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-5.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-6.png',
        '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-san-may-1699831582.png'
      ],
      difficulty: 'Trung bình',
      duration: '3-4 giờ',
      rating: 4.8,
      coordinates: '21.3167°N, 103.7667°E',
      highlights: ['Biểu tượng Tà Xùa', 'Điểm check-in nổi tiếng', 'Cảnh hoàng hôn tuyệt đẹp'],
      bestTime: 'Sáng sớm và chiều tà',
      information: {
        introduction: 'Cây cô đơn Tà Xùa là một cây thông cổ thụ mọc lẻ loi trên đỉnh núi cao 2.865m, đã trở thành biểu tượng nổi tiếng và là điểm đến không thể bỏ qua khi đến với Tà Xùa.',
        whyFamous: 'Nổi tiếng với vẻ đẹp cô đơn, kiêu hãnh giữa biển mây bồng bềnh và là điểm chụp ảnh "sống ảo" được yêu thích nhất tại Tà Xùa.',
        bestTimeToVisit: 'Thời điểm đẹp nhất là vào sáng sớm (5-7h) để ngắm bình minh và chiều tà (16-18h) để thưởng ngoạn hoàng hôn.',
        tips: 'Nên mang theo áo ấm, giày trekking và máy ảnh. Thời tiết có thể thay đổi nhanh chóng.'
      }
    },
    {
      id: 2,
      name: 'Đỉnh Gió Tà Xùa',
      category: 'mountain',
      description: 'Đỉnh Gió là một trong những điểm ngắm mây đẹp nhất Tà Xùa, nơi có thể chiêm ngưỡng toàn cảnh dãy núi hùng vĩ.',
      images: [
        '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-1.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-2.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/065127cce66edb405cbeaff03a3a23cb.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/585f1a8ed209574c1ddbe1546376d356.png',
        '/Attractions/Dinh_Gio_Ta_Xua/images/8091de567e214f83dd98f3c8e4e8f5e2.png'
      ],
      difficulty: 'Dễ',
      duration: '2-3 giờ',
      rating: 4.7,
      coordinates: '21.3200°N, 103.7700°E',
      highlights: ['Điểm ngắm mây tuyệt đẹp', 'Gần các điểm tham quan khác', 'Thích hợp chụp ảnh'],
      bestTime: 'Sáng sớm',
      information: {
        location: 'Đỉnh Gió nằm ở độ cao khoảng 2.400m, là một trong những điểm cao thuận tiện để tiếp cận từ khu vực trung tâm Tà Xùa.',
        attractions: 'Điểm ngắm mây lý tưởng, cơ hội chụp ảnh tuyệt vời và gần với các điểm tham quan khác như Cây Cô Đơn.',
        experience: 'Thưởng thức trà, cà phê địa phương, chụp ảnh với cảnh quan núi non hùng vĩ và ngắm hoa theo mùa.'
      }
    },
    {
      id: 3,
      name: 'Mỏm Cá Heo',
      category: 'mountain',
      description: 'Mỏm đá có hình dáng giống như một chú cá heo khổng lồ nhô ra từ sườn núi, tạo nên cảnh quan độc đáo và hùng vĩ.',
      images: [
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155507.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155532.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155618.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155644.png',
        '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155707.png'
      ],
      difficulty: 'Khó',
      duration: '4-5 giờ',
      rating: 4.6,
      coordinates: '21.3150°N, 103.7650°E',
      highlights: ['Hình dáng độc đáo', 'Thử thách leo núi', 'Cảnh quan hùng vĩ'],
      bestTime: 'Sáng sớm đến trưa',
      information: {
        location: 'Mỏm Cá Heo nằm ở độ cao khoảng 2.700m, có hình dáng đặc biệt giống như một chú cá heo khổng lồ.',
        characteristics: 'Được hình thành từ quá trình phong hóa tự nhiên, tạo nên hình dáng độc đáo và ấn tượng.',
        attractions: 'Điểm tham quan độc đáo với cảnh quan hùng vĩ, thích hợp cho những ai yêu thích thử thách và khám phá.',
        bestTimeToVisit: 'Mùa khô từ tháng 10 đến tháng 4 năm sau, thời tiết ổn định và tầm nhìn tốt.'
      }
    },
    {
      id: 4,
      name: 'Rừng Nguyên Sinh Tà Xùa',
      category: 'forest',
      description: 'Hệ sinh thái rừng nguyên sinh đa dạng với thực vật phong phú và khí hậu mát mẻ quanh năm.',
      images: [
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-1.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-2.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-3.png',
        '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-4.png'
      ],
      difficulty: 'Trung bình',
      duration: '4-6 giờ',
      rating: 4.5,
      coordinates: '21.3100°N, 103.7600°E',
      highlights: ['Hệ sinh thái đa dạng', 'Trekking và cắm trại', 'Vương quốc rêu'],
      bestTime: 'Cả ngày',
      information: {
        ecosystem: 'Hệ sinh thái rừng nguyên sinh với thực vật và động vật đa dạng, khí hậu mát mẻ quanh năm.',
        experience: 'Trekking khám phá rừng, cắm trại qua đêm, khám phá vương quốc rêu độc đáo.',
        importantNotes: 'Cần có hướng dẫn viên địa phương, chuẩn bị đầy đủ trang thiết bị, mùa tốt nhất từ tháng 10-4, bảo vệ môi trường.'
      }
    },
    {
      id: 5,
      name: 'Sống Lưng Khủng Long',
      category: 'mountain',
      description: 'Dãy núi hùng vĩ với hình dáng giống như sống lưng khủng long khổng lồ, điểm đến không thể bỏ qua khi đến Tà Xùa.',
      images: [
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-02-1662440259.png',
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-03-1662440259.png',
        '/Attractions/Song_lung_khung_long/images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-04-1662440259.png',
        '/Attractions/Song_lung_khung_long/images/164b376e3b27d2798b36.png',
        '/Attractions/Song_lung_khung_long/images/3d432566292fc071993e.png',
        '/Attractions/Song_lung_khung_long/images/IMG-6630.png'
      ],
      difficulty: 'Khó',
      duration: '6-8 giờ',
      rating: 4.9,
      coordinates: '21.3167°N, 103.7667°E',
      highlights: ['Hình dáng độc đáo', 'Cảnh quan hùng vĩ', 'Điểm check-in nổi tiếng'],
      bestTime: 'Sáng sớm đến chiều',
      information: {
        uniqueShape: 'Dãy núi có hình dáng độc đáo giống như sống lưng của một con khủng long khổng lồ.',
        scenery: 'Cảnh quan hùng vĩ, tráng lệ với tầm nhìn bao quát toàn bộ vùng núi Tây Bắc.',
        popularity: 'Là điểm đến nổi tiếng cho việc check-in và chụp ảnh "sống ảo".',
        challenge: 'Đòi hỏi thể lực tốt và kinh nghiệm trekking do địa hình khó khăn.',
        bestTimeToVisit: 'Mùa khô từ tháng 10 đến tháng 4, thời tiết ổn định và tầm nhìn tốt.'
      }
    }
  ];

  const itineraries = [
    {
      id: 1,
      title: 'Tà Xùa 2 Ngày 1 Đêm - Người Mới',
      description: 'Lịch trình hoàn hảo cho những ai đến Tà Xùa lần đầu',
      duration: '2 ngày 1 đêm',
      difficulty: 'Dễ - Trung bình',
      price: '1,200,000đ',
      image: 'bg-gradient-to-r from-green-400 to-blue-500',
      activities: [
        'Check-in homestay',
        'Thăm quan Bản Tà Xùa', 
        'Săn mây hoàng hôn',
        'Đêm văn hóa bản làng',
        'Săn mây bình minh',
        'Trekking Đỉnh Phu Sang'
      ]
    },
    {
      id: 2,
      title: 'Hành Trình Săn Mây 3 Ngày 2 Đêm',
      description: 'Trải nghiệm săn mây chuyên sâu với nhiều địa điểm',
      duration: '3 ngày 2 đêm',
      difficulty: 'Trung bình - Khó',
      price: '2,100,000đ',
      image: 'bg-gradient-to-r from-purple-400 to-pink-500',
      activities: [
        'Trekking Sống Lưng Khủng Long',
        'Cắm trại qua đêm trên núi',
        'Săn mây 4 buổi khác nhau',
        'Thác Bạc Tà Xùa',
        'Ẩm thực bản địa',
        'Mua sắm đặc sản'
      ]
    },
    {
      id: 3,
      title: 'Khám Phá Tà Xùa Bằng Xe Máy',
      description: 'Phượt xe máy khám phá toàn bộ khu vực Tà Xùa',
      duration: '4 ngày 3 đêm',
      difficulty: 'Trung bình',
      price: '1,800,000đ',
      image: 'bg-gradient-to-r from-orange-400 to-red-500',
      activities: [
        'Thuê xe máy địa hình',
        'Khám phá các bản làng xa',
        'Cung đường uốn lượn',
        'Chụp ảnh cảnh quan',
        'Trải nghiệm thực tế',
        'Tự do khám phá'
      ]
    }
  ];

  const categoryFilters = [
    { id: 'all', name: 'Tất Cả', icon: Filter },
    { id: 'mountain', name: 'Đỉnh Núi', icon: Mountain },
    { id: 'forest', name: 'Rừng Nguyên Sinh', icon: TreePine }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations // Hiển thị tất cả 5 địa điểm
    : locations.filter(location => location.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewMore = () => {
    navigate('/explore');
  };

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, 
            rgba(30, 58, 138, 0.25) 0%, 
            rgba(79, 70, 229, 0.20) 25%, 
            rgba(147, 51, 234, 0.15) 50%, 
            rgba(30, 41, 59, 0.30) 75%, 
            rgba(15, 23, 42, 0.40) 100%
          ),
          url(${taxuaMountainBg})
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-blue-950/20 to-slate-900/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Khám Phá Tà Xùa
          </h2>
          <p className="font-inter text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Khám phá các địa điểm nổi bật và lịch trình du lịch tuyệt vời tại Tà Xùa
          </p>
        </div>

        <Tabs defaultValue="locations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Địa Điểm Nổi Bật
            </TabsTrigger>
            <TabsTrigger value="itineraries" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Lịch Trình Gợi Ý
            </TabsTrigger>
          </TabsList>

          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categoryFilters.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <AttractionImageSlider
                    images={location.images}
                    attractionName={location.name}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    className="h-48"
                  />
                  
                  <CardContent className="p-6 space-y-4">
                    <p className="font-inter text-muted-foreground text-sm">
                      {location.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-inter">{location.duration}</span>
                      </div>
                      <Badge className={getDifficultyColor(location.difficulty)}>
                        {location.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="font-inter">{location.bestTime}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-inter text-sm font-semibold">{location.rating}</span>
                      <span className="font-inter text-xs text-muted-foreground">({location.coordinates})</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="font-inter font-semibold text-foreground text-sm">Điểm nổi bật:</h4>
                      <div className="flex flex-wrap gap-1">
                        {location.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Navigation className="w-4 h-4 mr-2" />
                        Chỉ Đường
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Chi Tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <Button 
                onClick={handleViewMore}
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Compass className="w-4 h-4 mr-2" />
                Xem Tất Cả Địa Điểm
              </Button>
            </div>
          </TabsContent>

          {/* Itineraries Tab */}
          <TabsContent value="itineraries" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                Lịch Trình Được Thiết Kế Sẵn
              </h3>
              <p className="font-inter text-muted-foreground max-w-2xl mx-auto">
                Các lịch trình du lịch được thiết kế chuyên nghiệp, phù hợp với từng loại du khách
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary) => (
                <Card key={itinerary.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-48 ${itinerary.image} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <h3 className="font-playfair text-xl font-bold mb-2">{itinerary.title}</h3>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {itinerary.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <p className="font-inter text-muted-foreground text-sm">
                      {itinerary.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-inter">{itinerary.difficulty}</span>
                      </div>
                      <div className="font-inter font-bold text-primary">
                        {itinerary.price}
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-2">
                      <h4 className="font-inter font-semibold text-foreground text-sm">Hoạt động bao gồm:</h4>
                      <ul className="space-y-1">
                        {itinerary.activities.slice(0, 3).map((activity, index) => (
                          <li key={index} className="font-inter text-xs text-muted-foreground flex items-center">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                            {activity}
                          </li>
                        ))}
                        {itinerary.activities.length > 3 && (
                          <li className="font-inter text-xs text-muted-foreground">
                            +{itinerary.activities.length - 3} hoạt động khác...
                          </li>
                        )}
                      </ul>
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt Lịch Trình
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <Button 
                onClick={handleViewMore}
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Xem Tất Cả Lịch Trình
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExploreSection;