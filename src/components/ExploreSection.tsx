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
import { ATTRACTIONS_DATA, type Attraction } from '@/data/attractionsData';

const ExploreSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  // Sử dụng dữ liệu từ file attractionsData.ts
  const locations = ATTRACTIONS_DATA.map(attraction => ({
    id: attraction.id,
    name: attraction.name,
    category: attraction.category,
    description: attraction.description,
    images: attraction.images,
    difficulty: attraction.difficulty === 'easy' ? 'Dễ' : 
                attraction.difficulty === 'medium' ? 'Trung bình' : 'Khó',
    duration: attraction.duration,
    rating: 4.8, // Giá trị mặc định
    coordinates: attraction.coordinates ? 
      `${attraction.coordinates.lat}°N, ${attraction.coordinates.lng}°E` : 
      'Chưa có tọa độ',
    highlights: attraction.highlights,
    bestTime: attraction.bestTime,
    information: {
      introduction: attraction.description,
      location: attraction.location,
      highlights: attraction.highlights.join(', '),
      tips: attraction.tips.join(', ')
    }
  }));

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
            rgba(71, 85, 105, 0.25) 0%, 
            rgba(100, 116, 139, 0.20) 25%, 
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/50"></div>
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