import Header from '@/components/Header';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Camera, Mountain, Filter, Search, Calendar, Users, Star, Share2 } from 'lucide-react';
import { useState } from 'react';
import LazyImage from '@/components/LazyImage';
import dragonSpineImage from '@/assets/dragon-spine.jpg';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import RatingSystem from '@/components/RatingSystem';
import SocialShare from '@/components/SocialShare';

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
      highlights: ['Thác cao 100m', 'Cảnh quan hùng vĩ', 'Tắm thác tự nhiên']
    }
  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attraction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || attraction.difficulty === difficultyFilter;
    
    const matchesDuration = durationFilter === 'all' || 
                           (durationFilter === 'short' && attraction.duration.includes('1-2')) ||
                           (durationFilter === 'medium' && (attraction.duration.includes('2-3') || attraction.duration.includes('3-4'))) ||
                           (durationFilter === 'long' && (attraction.duration.includes('4-5') || attraction.duration.includes('5-6')));
    
    return matchesSearch && matchesDifficulty && matchesDuration;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Khó':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <MainNavigation />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              Điểm Tham Quan
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
              Khám phá những địa điểm tuyệt đẹp và độc đáo của Tà Xùa
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <Tabs defaultValue="attractions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="attractions" className="flex items-center gap-2">
                <Mountain className="w-4 h-4" />
                Địa Điểm
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Bản Đồ
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Đánh Giá
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
                  <div className="flex-1">
                    <SearchAutocomplete
                      placeholder="Tìm kiếm địa điểm..."
                      onSearch={setSearchTerm}
                      showFilters={true}
                      filters={[
                        {
                          id: 'category',
                          label: 'Danh mục',
                          value: '',
                          onChange: () => {},
                          options: [
                            { value: 'nui-da', label: 'Núi đá' },
                            { value: 'dinh-nui', label: 'Đỉnh núi' },
                            { value: 'canh-quan', label: 'Cảnh quan' },
                            { value: 'nong-nghiep', label: 'Nông nghiệp' },
                            { value: 'thac-nuoc', label: 'Thác nước' }
                          ]
                        },
                        {
                          id: 'difficulty',
                          label: 'Độ khó',
                          value: '',
                          onChange: () => {},
                          options: [
                            { value: 'de', label: 'Dễ' },
                            { value: 'trung-binh', label: 'Trung bình' },
                            { value: 'kho', label: 'Khó' }
                          ]
                        }
                      ]}
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
                      <LazyImage
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

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-primary focus-ring">
                          Xem Chi Tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle share action
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
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
                  Bản Đồ Tương Tác
                </h3>
                <p className="font-inter text-muted-foreground max-w-md mx-auto">
                  Bản đồ tương tác với các điểm đến sẽ được tích hợp trong phiên bản tiếp theo.
                </p>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <RatingSystem
                    locationId="ta-xua-general"
                    locationName="Tà Xùa"
                    averageRating={4.7}
                    totalReviews={156}
                    reviews={[
                      {
                        id: '1',
                        userName: 'Minh Anh',
                        rating: 5,
                        comment: 'Tà Xùa thực sự là một thiên đường! Cảnh quan hùng vĩ, không khí trong lành. Đặc biệt là khoảnh khắc săn mây lúc bình minh, thật không thể nào quên được.',
                        date: '2024-01-15',
                        location: 'Hà Nội',
                        helpful: 12,
                        verified: true
                      },
                      {
                        id: '2',
                        userName: 'Thanh Hương',
                        rating: 4,
                        comment: 'Địa điểm rất đẹp nhưng đường đi khá khó khăn. Nên chuẩn bị kỹ lưỡng và đi theo nhóm. Cảnh quan xứng đáng với công sức bỏ ra.',
                        date: '2024-01-10',
                        location: 'TP.HCM',
                        helpful: 8,
                        verified: false
                      },
                      {
                        id: '3',
                        userName: 'Đức Minh',
                        rating: 5,
                        comment: 'Lần đầu tiên đến Tà Xùa và đã bị mê hoặc hoàn toàn. Sống lưng khủng long thật sự ấn tượng. Sẽ quay lại vào mùa khác để trải nghiệm.',
                        date: '2024-01-05',
                        location: 'Đà Nẵng',
                        helpful: 15,
                        verified: true
                      }
                    ]}
                    onSubmitReview={(review) => {
                      console.log('New review:', review);
                      // Handle review submission
                    }}
                  />
                </div>
                <div className="space-y-6">
                  <SocialShare
                    title="Khám phá Tà Xùa - Thiên đường săn mây"
                    description="Trải nghiệm những điểm đến tuyệt vời tại Tà Xùa cùng Sky Quest"
                    showTitle={true}
                  />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Thống kê đánh giá</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Cảnh quan</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="text-sm">4.8</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Dịch vụ</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm">4.3</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tiện ích</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="text-sm">3.8</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Giá trị</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                          <span className="text-sm">4.5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Itineraries Tab */}
            <TabsContent value="itineraries" className="space-y-8">
              <div className="bg-muted/30 p-8 rounded-lg text-center">
                <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                  Lịch Trình Sắp Ra Mắt
                </h3>
                <p className="font-inter text-muted-foreground max-w-md mx-auto">
                  Chúng tôi đang phát triển tính năng lập lịch trình tự động để giúp bạn có những chuyến đi hoàn hảo.
                </p>
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
    </Layout>
  );
};

export default Attractions;