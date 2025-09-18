import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Camera, Mountain, Filter, Search, Calendar, Users, Star } from 'lucide-react';
import { useState } from 'react';
import dragonSpineImage from '@/assets/dragon-spine.jpg';

const Attractions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  const attractions = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      description: 'Dãy núi hùng vĩ với hình dáng giống như sống lưng khủng long khổng lồ, là điểm đến không thể bỏ qua khi đến Tà Xùa.',
      image: dragonSpineImage,
      duration: '3-4 giờ',
      difficulty: 'Trung bình',
      bestTime: 'Sáng sớm (5-7h)',
      coordinates: [21.3099, 104.4569],
      rating: 4.8,
      category: 'Núi đá',
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
      coordinates: [21.3199, 104.4669],
      rating: 4.9,
      category: 'Đỉnh núi',
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
      coordinates: [21.2999, 104.4469],
      rating: 4.7,
      category: 'Cảnh quan',
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
      coordinates: [21.3049, 104.4519],
      rating: 4.6,
      category: 'Nông nghiệp',
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
      coordinates: [21.2899, 104.4369],
      rating: 4.5,
      category: 'Thác nước',
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
      coordinates: [21.3149, 104.4619],
      rating: 4.4,
      category: 'Văn hóa',
      highlights: ['Văn hóa H\'Mông', 'Làng bản truyền thống', 'Ẩm thực địa phương']
    }
  ];

  const itineraries = [
    {
      id: 1,
      title: 'Hành Trình Săn Mây 2 Ngày 1 Đêm',
      duration: '2 ngày 1 đêm',
      difficulty: 'Trung bình',
      price: '1.200.000 VNĐ',
      rating: 4.8,
      image: dragonSpineImage,
      highlights: ['Săn mây bình minh', 'Cắm trại trên núi', 'Sống Lưng Khủng Long'],
      schedule: [
        { day: 'Ngày 1', activities: ['Khởi hành sáng sớm', 'Leo Sống Lưng Khủng Long', 'Cắm trại qua đêm'] },
        { day: 'Ngày 2', activities: ['Săn mây bình minh', 'Thăm Cây Cô Đơn', 'Về lại thị trấn'] }
      ]
    },
    {
      id: 2,
      title: 'Khám Phá Văn Hóa H\'Mông 3 Ngày 2 Đêm',
      duration: '3 ngày 2 đêm',
      difficulty: 'Dễ',
      price: '1.800.000 VNĐ',
      rating: 4.7,
      image: dragonSpineImage,
      highlights: ['Homestay bản làng', 'Học làm thủ công', 'Ẩm thực truyền thống'],
      schedule: [
        { day: 'Ngày 1', activities: ['Đến Bản Púng', 'Tham quan làng bản', 'Nghỉ đêm homestay'] },
        { day: 'Ngày 2', activities: ['Học hái chè Shan Tuyết', 'Làm thủ công truyền thống', 'Tiệc văn hóa tối'] },
        { day: 'Ngày 3', activities: ['Thăm chợ phiên', 'Mua sắm đặc sản', 'Trở về'] }
      ]
    },
    {
      id: 3,
      title: 'Chinh Phục Đỉnh Phu Sang 4 Ngày 3 Đêm',
      duration: '4 ngày 3 đêm',
      difficulty: 'Khó',
      price: '2.500.000 VNĐ',
      rating: 4.9,
      image: dragonSpineImage,
      highlights: ['Đỉnh cao nhất Tà Xùa', 'Trekking thử thách', 'Cảnh quan hùng vĩ'],
      schedule: [
        { day: 'Ngày 1', activities: ['Chuẩn bị và khởi hành', 'Trekking đến trạm 1', 'Nghỉ đêm trạm 1'] },
        { day: 'Ngày 2', activities: ['Tiếp tục trekking', 'Đến trạm 2', 'Nghỉ đêm trạm 2'] },
        { day: 'Ngày 3', activities: ['Chinh phục đỉnh Phu Sang', 'Ngắm cảnh từ đỉnh', 'Xuống trạm 1'] },
        { day: 'Ngày 4', activities: ['Trở về thị trấn', 'Nghỉ ngơi và chia sẻ'] }
      ]
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

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || attraction.difficulty === difficultyFilter;
    const matchesDuration = durationFilter === 'all' || 
                           (durationFilter === 'short' && attraction.duration.includes('1-2')) ||
                           (durationFilter === 'medium' && (attraction.duration.includes('3-4') || attraction.duration.includes('2-3'))) ||
                           (durationFilter === 'long' && (attraction.duration.includes('5-6') || attraction.duration.includes('Nửa ngày')));
    
    return matchesSearch && matchesDifficulty && matchesDuration;
  });

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
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Lên kế hoạch cho chuyến phiêu lưu hoàn hảo của bạn
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="attractions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="attractions" className="flex items-center gap-2">
                <Mountain className="w-4 h-4" />
                Địa Điểm
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Bản Đồ
              </TabsTrigger>
              <TabsTrigger value="itineraries" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Lịch Trình
              </TabsTrigger>
            </TabsList>

            {/* Attractions Tab */}
            <TabsContent value="attractions" className="space-y-8">
              {/* Filters */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex items-center gap-2 flex-1">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm địa điểm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Độ khó" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả độ khó</SelectItem>
                        <SelectItem value="Dễ">Dễ</SelectItem>
                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                        <SelectItem value="Khó">Khó</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả thời gian</SelectItem>
                        <SelectItem value="short">Ngắn (1-2h)</SelectItem>
                        <SelectItem value="medium">Trung bình (2-4h)</SelectItem>
                        <SelectItem value="long">Dài (5h+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Attractions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAttractions.map((attraction) => (
                  <Card key={attraction.id} className="group overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={getDifficultyColor(attraction.difficulty)}>
                          {attraction.difficulty}
                        </Badge>
                        <Badge variant="secondary">{attraction.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold">{attraction.rating}</span>
                        </div>
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
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-8">
              <div className="bg-muted/30 p-8 rounded-lg text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  Bản Đồ Tương Tác Tà Xùa
                </h3>
                <p className="font-inter text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Khám phá vị trí các địa điểm nổi bật trên bản đồ tương tác. 
                  Nhấp vào các điểm đánh dấu để xem thông tin chi tiết và lên kế hoạch tuyến đường.
                </p>
                <div className="bg-white rounded-lg p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-inter text-muted-foreground">
                      Bản đồ Mapbox sẽ được tích hợp tại đây
                    </p>
                    <p className="font-inter text-sm text-muted-foreground mt-2">
                      Cần cấu hình Mapbox Access Token
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Itineraries Tab */}
            <TabsContent value="itineraries" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Lịch Trình Gợi Ý
                </h2>
                <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                  Những hành trình được thiết kế đặc biệt để bạn trải nghiệm trọn vẹn vẻ đẹp của Tà Xùa
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {itineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={itinerary.image}
                        alt={itinerary.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getDifficultyColor(itinerary.difficulty)}>
                          {itinerary.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold">{itinerary.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="font-playfair text-xl text-foreground">
                        {itinerary.title}
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {itinerary.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            2-8 người
                          </div>
                        </div>
                        <div className="font-inter font-bold text-primary">
                          {itinerary.price}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Highlights */}
                      <div className="space-y-2">
                        <h4 className="font-inter font-semibold text-foreground">Điểm nổi bật:</h4>
                        <div className="flex flex-wrap gap-2">
                          {itinerary.highlights.map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Schedule Preview */}
                      <div className="space-y-2">
                        <h4 className="font-inter font-semibold text-foreground">Lịch trình:</h4>
                        <div className="space-y-2">
                          {itinerary.schedule.slice(0, 2).map((day, index) => (
                            <div key={index} className="text-sm">
                              <div className="font-semibold text-primary">{day.day}:</div>
                              <div className="text-muted-foreground ml-2">
                                {day.activities.slice(0, 2).join(', ')}
                                {day.activities.length > 2 && '...'}
                              </div>
                            </div>
                          ))}
                          {itinerary.schedule.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{itinerary.schedule.length - 2} ngày khác...
                            </div>
                          )}
                        </div>
                      </div>

                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Xem Chi Tiết & Đặt Tour
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Planning Tips */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Lưu Ý Khi Khám Phá
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">Chuẩn Bị</h3>
                  <ul className="space-y-2 font-inter text-muted-foreground">
                    <li>• Giày trekking chống trượt</li>
                    <li>• Áo ấm (nhiệt độ có thể xuống dưới 10°C)</li>
                    <li>• Đèn pin và pin dự phòng</li>
                    <li>• Nước uống và thức ăn nhẹ</li>
                    <li>• Thuốc men cá nhân</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">An Toàn</h3>
                  <ul className="space-y-2 font-inter text-muted-foreground">
                    <li>• Di chuyển theo nhóm, không đi một mình</li>
                    <li>• Thông báo lịch trình cho người thân</li>
                    <li>• Kiểm tra thời tiết trước khi khởi hành</li>
                    <li>• Thuê hướng dẫn viên địa phương</li>
                    <li>• Mang theo máy GPS hoặc bản đồ</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Attractions;