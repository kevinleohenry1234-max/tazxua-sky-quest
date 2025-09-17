import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Users, 
  MessageSquare, 
  Phone, 
  Cloud, 
  MapPin, 
  QrCode,
  Share2,
  Facebook,
  MessageCircle,
  Instagram
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription } from '@/components/ui/alert';

const InteractiveSafety = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generateEmergencyMessage = () => {
    const message = `Chào bạn, tôi đang chuẩn bị cho chuyến đi khám phá Tà Xùa từ ngày mai đến cuối tuần. Đây là thông tin chi tiết về hành trình của tôi để bạn có thể tiện theo dõi.

Lộ trình chi tiết: Khám phá Sống Lưng Khủng Long - Cây Cô Đơn - Homestay bản Púng
Số điện thoại khẩn cấp của tôi: ${emergencyContact || '[Số điện thoại]'}
Bạn có thể theo dõi vị trí trực tuyến của tôi tại đây: [Link theo dõi sẽ được cung cấp]

Chuyến đi được hỗ trợ bởi Tà Xùa Tourism Platform.`;
    
    setEmergencyMessage(message);
  };

  const weatherData = {
    temperature: '18°C',
    wind: '12 km/h',
    humidity: '78%',
    aqi: '45 (Tốt)',
    rain: '5mm',
    uv: '3 (Thấp)'
  };

  const guides = [
    {
      id: 1,
      name: 'Vàng Seo Chứ',
      experience: '8 năm',
      languages: ['Tiếng Việt', 'H\'Mông', 'Tiếng Anh'],
      rating: 4.9,
      specialty: 'Trekking & Văn hóa'
    },
    {
      id: 2,
      name: 'Lý Văn Dũng',
      experience: '12 năm',
      languages: ['Tiếng Việt', 'H\'Mông'],
      rating: 4.8,
      specialty: 'Săn mây & Nhiếp ảnh'
    }
  ];

  const tourPackages = [
    {
      id: 1,
      name: 'Tà Xùa Săn Mây 2N1Đ',
      price: '1.200.000 VNĐ',
      departure: 'Thứ 7 hàng tuần',
      includes: ['Xe đưa đón', 'Homestay', 'Hướng dẫn viên', '3 bữa ăn']
    },
    {
      id: 2,
      name: 'Khám Phá Văn Hóa H\'Mông 3N2Đ',
      price: '1.800.000 VNĐ',
      departure: 'Chủ Nhật hàng tuần',
      includes: ['Xe đưa đón', 'Homestay', 'Trải nghiệm văn hóa', 'Toàn bộ bữa ăn']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
          Trung Tâm An Toàn Tương Tác
        </h2>
        <p className="font-inter text-lg text-muted-foreground">
          Các công cụ thông minh giúp bạn chuẩn bị và di chuyển an toàn
        </p>
      </div>

      {/* Travel Companion Finder */}
      <Collapsible open={openSections.companion} onOpenChange={() => toggleSection('companion')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Tìm Bạn Đồng Hành</span>
                </div>
                {openSections.companion ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  Tính năng này cần kết nối Supabase để lưu trữ thông tin người dùng và tạo hệ thống ghép nhóm.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <MessageSquare className="w-6 h-6 mb-2" />
                  <span>Đăng Tin Tìm Nhóm</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Users className="w-6 h-6 mb-2" />
                  <span>Xem Các Nhóm Có Sẵn</span>
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Emergency Contact Generator */}
      <Collapsible open={openSections.emergency} onOpenChange={() => toggleSection('emergency')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Tạo Thông Báo Hành Trình</span>
                </div>
                {openSections.emergency ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại khẩn cấp</label>
                  <Input
                    placeholder="Nhập số điện thoại của bạn"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>
                
                <Button onClick={generateEmergencyMessage} className="w-full">
                  Tạo Thông Báo Tự Động
                </Button>
                
                {emergencyMessage && (
                  <div className="space-y-3">
                    <Textarea
                      value={emergencyMessage}
                      onChange={(e) => setEmergencyMessage(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>SMS</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Facebook className="w-4 h-4" />
                        <span>Messenger</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>Zalo</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Instagram className="w-4 h-4" />
                        <span>Instagram</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Weather Widget */}
      <Collapsible open={openSections.weather} onOpenChange={() => toggleSection('weather')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-primary" />
                  <span>Thời Tiết Tà Xùa Trực Tiếp</span>
                </div>
                {openSections.weather ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <Alert className="mb-4">
                <Cloud className="h-4 w-4" />
                <AlertDescription>
                  Tích hợp API thời tiết cần kết nối Supabase Edge Functions để bảo mật API key.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-2xl text-primary">{weatherData.temperature}</div>
                  <div className="text-sm text-muted-foreground">Nhiệt độ</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg">{weatherData.wind}</div>
                  <div className="text-sm text-muted-foreground">Tốc độ gió</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg">{weatherData.humidity}</div>
                  <div className="text-sm text-muted-foreground">Độ ẩm</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg">{weatherData.aqi}</div>
                  <div className="text-sm text-muted-foreground">Chất lượng không khí</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg">{weatherData.rain}</div>
                  <div className="text-sm text-muted-foreground">Lượng mưa dự báo</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg">{weatherData.uv}</div>
                  <div className="text-sm text-muted-foreground">Chỉ số UV</div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Guide Booking */}
      <Collapsible open={openSections.guides} onOpenChange={() => toggleSection('guides')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Thuê Hướng Dẫn Viên</span>
                </div>
                {openSections.guides ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-16 flex flex-col items-center justify-center">
                  <span className="font-semibold">Hướng Dẫn Viên Cá Nhân</span>
                  <span className="text-sm opacity-80">Linh hoạt theo yêu cầu</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <span className="font-semibold">Tour Theo Đoàn</span>
                  <span className="text-sm opacity-80">Giá tốt, lịch trình cố định</span>
                </Button>
              </div>

              {/* Local Guides */}
              <div>
                <h4 className="font-semibold mb-3">Hướng Dẫn Viên Địa Phương</h4>
                <div className="space-y-3">
                  {guides.map((guide) => (
                    <div key={guide.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold">{guide.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Kinh nghiệm: {guide.experience} • {guide.specialty}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                          ⭐ {guide.rating}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        Liên Hệ Đặt Lịch
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Packages */}
              <div>
                <h4 className="font-semibold mb-3">Gói Tour Có Sẵn</h4>
                <div className="space-y-3">
                  {tourPackages.map((tour) => (
                    <div key={tour.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold">{tour.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Khởi hành: {tour.departure}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">{tour.price}</div>
                          <div className="text-sm text-muted-foreground">/người</div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground">Bao gồm:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tour.includes.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Đặt Tour Ngay
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* GPS Tracking */}
      <Collapsible open={openSections.gps} onOpenChange={() => toggleSection('gps')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Đồng Bộ Bản Đồ & Theo Dõi Lộ Trình</span>
                </div>
                {openSections.gps ? <ChevronUp /> : <ChevronDown />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  Tính năng theo dõi GPS thời gian thực cần Supabase Realtime và location API.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-6 border border-border rounded-lg">
                  <QrCode className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-2">Quét Mã QR</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quét để mở bản đồ số trên điện thoại
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    {showQRCode ? 'Ẩn Mã QR' : 'Hiển Thị Mã QR'}
                  </Button>
                  {showQRCode && (
                    <div className="mt-3 p-4 bg-muted/30 rounded">
                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded flex items-center justify-center">
                        QR Code
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center p-6 border border-border rounded-lg">
                  <Share2 className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-2">Chia Sẻ Vị Trí</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tạo link theo dõi cho người thân
                  </p>
                  <Button size="sm">
                    Tạo Link Theo Dõi
                  </Button>
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Xem Bản Đồ Số Tà Xùa
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default InteractiveSafety;