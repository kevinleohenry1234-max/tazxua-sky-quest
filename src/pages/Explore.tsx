import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Star, Mountain, Utensils, TreePine, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import dragonSpineImage from '@/assets/dragon-spine.jpg';
import heroTaxuaImage from '@/assets/hero-taxua-clouds.jpg';
import localCuisineImage from '@/assets/local-cuisine.jpg';
import hmongCultureImage from '@/assets/hmong-culture.jpg';

const Explore = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const locations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      type: 'Đỉnh núi',
      icon: Mountain,
      coordinates: [104.5, 21.3],
      rating: 4.8,
      description: 'Dãy núi hùng vĩ với hình dáng độc đáo như sống lưng khủng long',
      image: dragonSpineImage,
      difficulty: 'Trung bình',
      duration: '3-4 giờ'
    },
    {
      id: 2,
      name: 'Cây Cô Đơn',
      type: 'Địa điểm chụp ảnh',
      icon: TreePine,
      coordinates: [104.48, 21.28],
      rating: 4.7,
      description: 'Cây thông cô đơn giữa đồi chè, biểu tượng của Tà Xùa',
      image: heroTaxuaImage,
      difficulty: 'Dễ',
      duration: '1-2 giờ'
    },
    {
      id: 3,
      name: 'Bản Púng',
      type: 'Làng bản',
      icon: Home,
      coordinates: [104.52, 21.32],
      rating: 4.6,
      description: 'Bản làng H\'Mông truyền thống với văn hóa đặc sắc',
      image: hmongCultureImage,
      difficulty: 'Dễ',
      duration: 'Nửa ngày'
    },
    {
      id: 4,
      name: 'Quán Cà Phê Săn Mây',
      type: 'Ẩm thực',
      icon: Utensils,
      coordinates: [104.49, 21.29],
      rating: 4.5,
      description: 'Thưởng thức cà phê trong không gian mây mù',
      image: localCuisineImage,
      difficulty: 'Dễ',
      duration: '1 giờ'
    }
  ];

  const itineraries = [
    {
      id: 1,
      title: 'Tà Xùa 2 Ngày 1 Đêm Cho Người Đi Lần Đầu',
      duration: '2N1Đ',
      highlights: ['Sống lưng khủng long', 'Cây cô đơn', 'Homestay truyền thống'],
      schedule: [
        'Ngày 1: Đến Tà Xùa - Check-in homestay - Chinh phục cây cô đơn',
        'Ngày 2: Săn mây tại sống lưng khủng long - Trở về'
      ]
    },
    {
      id: 2,
      title: 'Hành Trình Săn Mây 3 Ngày 2 Đêm',
      duration: '3N2Đ',
      highlights: ['Cắm trại qua đêm', 'Săn mây bình minh', 'Đỉnh Phu Sang'],
      schedule: [
        'Ngày 1: Di chuyển - Khám phá sơ bộ - Cắm trại',
        'Ngày 2: Săn mây bình minh - Leo đỉnh Phu Sang',
        'Ngày 3: Thả hồn với thiên nhiên - Trở về'
      ]
    },
    {
      id: 3,
      title: 'Khám Phá Tà Xùa Bằng Xe Máy',
      duration: '1-2 ngày',
      highlights: ['Tự do di chuyển', 'Khám phá nhiều điểm', 'Trải nghiệm phượt'],
      schedule: [
        'Linh hoạt theo sở thích',
        'Ghé thăm các điểm nổi bật',
        'Tương tác với người dân địa phương'
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Đỉnh núi': 'bg-blue-100 text-blue-700',
      'Địa điểm chụp ảnh': 'bg-purple-100 text-purple-700',
      'Làng bản': 'bg-green-100 text-green-700',
      'Ẩm thực': 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const handleTokenSubmit = () => {
    setShowTokenInput(false);
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
            <p className="font-inter text-xl md:text-2xl max-w-2xl mx-auto">
              Bản đồ tương tác và hướng dẫn chi tiết cho hành trình của bạn
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-foreground flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    Bản Đồ Tương Tác Tà Xùa
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center">
                  {showTokenInput ? (
                    <div className="text-center space-y-4 max-w-md">
                      <p className="text-muted-foreground">
                        Để hiển thị bản đồ tương tác, vui lòng nhập Mapbox token của bạn:
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Nhập Mapbox token..."
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                        />
                        <Button onClick={handleTokenSubmit}>
                          Kích Hoạt
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lấy token miễn phí tại{' '}
                        <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          mapbox.com
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Bản đồ sẽ được hiển thị ở đây</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Locations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-foreground">
                    Danh Sách Địa Điểm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {locations.map((location) => {
                    const IconComponent = location.icon;
                    return (
                      <div 
                        key={location.id} 
                        className="p-4 border border-border rounded-lg hover:shadow-soft transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-foreground truncate">
                                {location.name}
                              </h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold">{location.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className={`text-xs mb-2 ${getTypeColor(location.type)}`}>
                              {location.type}
                            </Badge>
                            <p className="text-sm text-muted-foreground mb-2">
                              {location.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <span>⏱ {location.duration}</span>
                              <span>📍 {location.difficulty}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <Alert>
                    <MapPin className="h-4 w-4" />
                    <AlertDescription>
                      Nhấp vào địa điểm trên bản đồ để xem thông tin chi tiết và ảnh.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Suggested Itineraries */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                Lịch Trình Gợi Ý
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Các hành trình được thiết kế sẵn cho trải nghiệm hoàn hảo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {itineraries.map((itinerary) => (
                <Card key={itinerary.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {itinerary.duration}
                      </Badge>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="font-playfair text-lg text-foreground">
                      {itinerary.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Điểm nổi bật:</h4>
                      <div className="space-y-1">
                        {itinerary.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Lịch trình:</h4>
                      <div className="space-y-1">
                        {itinerary.schedule.map((day, index) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            {day}
                          </p>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Chi Tiết Lịch Trình
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;