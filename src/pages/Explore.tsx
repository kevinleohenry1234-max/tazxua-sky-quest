import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const locations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      category: 'mountain',
      description: 'Địa điểm trekking nổi tiếng nhất Tà Xùa với cảnh quan hùng vĩ',
      image: 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700',
      difficulty: 'Khó',
      duration: '6-8 giờ',
      rating: 4.9,
      coordinates: '21.3167°N, 103.7667°E',
      highlights: ['Trekking đỉnh cao', 'View 360°', 'Săn mây']
    },
    {
      id: 2,
      name: 'Đỉnh Phu Sang',
      category: 'mountain',
      description: 'Đỉnh núi thứ hai cao nhất với độ khó vừa phải',
      image: 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700',
      difficulty: 'Trung bình',
      duration: '4-5 giờ',
      rating: 4.7,
      coordinates: '21.3200°N, 103.7700°E',
      highlights: ['Phù hợp mọi lứa tuổi', 'An toàn', 'Cảnh đẹp']
    },
    {
      id: 3,
      name: 'Thác Bạc Tà Xùa',
      category: 'waterfall',
      description: 'Thác nước tuyệt đẹp giữa rừng nguyên sinh',
      image: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600',
      difficulty: 'Dễ',
      duration: '2-3 giờ',
      rating: 4.5,
      coordinates: '21.3100°N, 103.7600°E',
      highlights: ['Nước trong xanh', 'Tắm thác', 'Thư giãn']
    },
    {
      id: 4,
      name: 'Bản Tà Xùa',
      category: 'village',
      description: 'Làng bản H\'Mông truyền thống với văn hóa đặc sắc',
      image: 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-600',
      difficulty: 'Dễ',
      duration: '1-2 giờ',
      rating: 4.6,
      coordinates: '21.3050°N, 103.7550°E',
      highlights: ['Văn hóa bản địa', 'Ẩm thực truyền thống', 'Homestay']
    },
    {
      id: 5,
      name: 'Cafe Săn Mây',
      category: 'cafe',
      description: 'Quán cà phê với view săn mây tuyệt đẹp',
      image: 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600',
      difficulty: 'Dễ',
      duration: '1 giờ',
      rating: 4.8,
      coordinates: '21.3180°N, 103.7650°E',
      highlights: ['View đẹp', 'Cà phê ngon', 'Check-in']
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
    { id: 'waterfall', name: 'Thác Nước', icon: TreePine },
    { id: 'village', name: 'Bản Làng', icon: Home },
    { id: 'cafe', name: 'Quán Cà Phê', icon: Coffee }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Khám Phá Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto">
              Bản đồ tương tác và hướng dẫn chi tiết về tất cả địa điểm nổi bật tại Tà Xùa
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="locations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="locations" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Địa Điểm
              </TabsTrigger>
              <TabsTrigger value="itineraries" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Lịch Trình Gợi Ý
              </TabsTrigger>
            </TabsList>

            {/* Locations Tab */}
            <TabsContent value="locations" className="space-y-8">
              {/* Interactive Map Placeholder */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-96 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center relative">
                    <div className="text-center">
                      <Compass className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                        Bản Đồ Tương Tác Tà Xùa
                      </h3>
                      <p className="font-inter text-muted-foreground mb-4">
                        Khám phá các địa điểm nổi bật với bản đồ tương tác chi tiết
                      </p>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Navigation className="w-4 h-4 mr-2" />
                        Xem Bản Đồ Đầy Đủ
                      </Button>
                    </div>
                    
                    {/* Map Pins Simulation */}
                    <div className="absolute top-20 left-32 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-32 left-20 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-32 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>

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
                    <div className={`h-48 ${location.image} flex items-end p-6`}>
                      <div className="text-white">
                        <h3 className="font-playfair text-xl font-bold mb-2">{location.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-inter text-sm">{location.rating}</span>
                        </div>
                      </div>
                    </div>
                    
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
                        <span className="font-inter">{location.coordinates}</span>
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
            </TabsContent>

            {/* Itineraries Tab */}
            <TabsContent value="itineraries" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
                  Lịch Trình Được Thiết Kế Sẵn
                </h2>
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

              {/* Custom Itinerary CTA */}
              <Card className="bg-muted/30">
                <CardContent className="p-8 text-center">
                  <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                    Tạo Lịch Trình Riêng
                  </h3>
                  <p className="font-inter text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Bạn có ý tưởng riêng? Hãy để chúng tôi giúp bạn tạo một lịch trình độc đáo phù hợp với sở thích và thời gian của bạn
                  </p>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Tùy Chỉnh Lịch Trình
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;