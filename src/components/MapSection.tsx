import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Coffee, Home, Mountain, Camera, Star } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MapSection = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Mock data for map locations
  const locations = [
    {
      id: 1,
      name: 'Sống Lưng Khủng Long',
      type: 'landmark',
      icon: Mountain,
      coordinates: [104.0325, 21.3341],
      rating: 4.9,
      description: 'Điểm check-in nổi tiếng nhất Tà Xùa'
    },
    {
      id: 2,
      name: 'Homestay Tà Xùa Valley',
      type: 'accommodation', 
      icon: Home,
      coordinates: [104.0298, 21.3358],
      rating: 4.7,
      description: 'Homestay view đẹp giữa núi rừng'
    },
    {
      id: 3,
      name: 'Quán Cà Phê Săn Mây',
      type: 'coffee',
      icon: Coffee,
      coordinates: [104.0312, 21.3375],
      rating: 4.8,
      description: 'Thưởng thức cà phê trong mây'
    },
    {
      id: 4,
      name: 'Điểm Chụp Ảnh Bình Minh',
      type: 'photo',
      icon: Camera,
      coordinates: [104.0285, 21.3392],
      rating: 4.9,
      description: 'Điểm săn mây bình minh đẹp nhất'
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      landmark: 'text-red-500',
      accommodation: 'text-blue-500',
      coffee: 'text-amber-500',
      photo: 'text-purple-500'
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      // In a real implementation, this would initialize the Mapbox map
      console.log('Mapbox token set:', mapboxToken);
    }
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Bản Đồ Trải Nghiệm Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá các địa điểm nổi bật, nơi lưu trú và trải nghiệm độc đáo tại Tà Xùa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0 h-[500px]">
              <CardContent className="p-0 h-full">
                {showTokenInput ? (
                  <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center p-8 max-w-md">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="font-playfair text-xl font-bold mb-4">Cần Mapbox Token</h3>
                      <p className="text-muted-foreground mb-6 text-sm">
                        Để hiển thị bản đồ tương tác, vui lòng nhập Mapbox public token của bạn.
                        Bạn có thể lấy token tại{' '}
                        <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          mapbox.com
                        </a>
                      </p>
                      <div className="space-y-4">
                        <Input
                          placeholder="Nhập Mapbox public token..."
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                          className="w-full"
                        />
                        <Button onClick={handleTokenSubmit} className="w-full">
                          Kích Hoạt Bản Đồ
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Bản đồ Mapbox sẽ được hiển thị ở đây với token: <br />
                        <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                          {mapboxToken.substring(0, 20)}...
                        </code>
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowTokenInput(true)}
                        className="mt-4"
                      >
                        Thay Đổi Token
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Locations List */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Địa Điểm Nổi Bật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locations.map((location) => {
                    const Icon = location.icon;
                    return (
                      <div
                        key={location.id}
                        className="p-4 rounded-lg border border-border hover:shadow-medium transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getTypeColor(location.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-inter font-semibold text-foreground group-hover:text-primary transition-colors">
                                {location.name}
                              </h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-muted-foreground">
                                  {location.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {location.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Alert className="mt-6">
                  <MapPin className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Nhấp vào các địa điểm để xem chi tiết trên bản đồ. 
                    Bản đồ sẽ tự động phóng to và hiển thị thông tin về địa điểm đó.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;