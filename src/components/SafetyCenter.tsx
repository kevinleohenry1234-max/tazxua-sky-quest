import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer,
  Eye,
  Mountain,
  Heart,
  Wifi,
  Battery,
  Navigation,
  Zap,
  Droplets,
  MessageSquare,
  ShoppingCart,
  Share2,
  Signal,
  BatteryLow,
  X,
  Check,
  ExternalLink,
  Map,
  Store
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: any;
}

interface EmergencyContact {
  name: string;
  phone: string;
  type: 'police' | 'medical' | 'rescue' | 'local';
  available24h: boolean;
}

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: any;
  category: 'weather' | 'hiking' | 'health' | 'communication';
}

const SafetyCenter = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    temperature: 18,
    condition: 'Có mây',
    humidity: 75,
    windSpeed: 12,
    visibility: 8,
    icon: Cloud
  });

  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'Dự báo mưa nhỏ vào chiều tối. Nên mang theo áo mưa khi trekking.',
      timestamp: '2 giờ trước'
    }
  ]);

  // States for dialogs and features
  const [weatherDialogOpen, setWeatherDialogOpen] = useState(false);
  const [waterDialogOpen, setWaterDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false);
  const [shareLocationDialogOpen, setShareLocationDialogOpen] = useState(false);
  const [findSignalDialogOpen, setFindSignalDialogOpen] = useState(false);
  const [batterySaveDialogOpen, setBatterySaveDialogOpen] = useState(false);
  
  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    phone: '',
    startDate: '',
    endDate: '',
    route: '',
    emergencyContact: '',
    notes: ''
  });

  const [locationShared, setLocationShared] = useState(false);
  const [batterySaveMode, setBatterySaveMode] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'Cảnh sát Bắc Yên',
      phone: '113',
      type: 'police',
      available24h: true
    },
    {
      name: 'Cấp cứu 115',
      phone: '115', 
      type: 'medical',
      available24h: true
    },
    {
      name: 'Cứu hộ miền núi',
      phone: '0987 654 321',
      type: 'rescue',
      available24h: true
    },
    {
      name: 'Hướng dẫn viên địa phương',
      phone: '0912 345 678',
      type: 'local',
      available24h: false
    }
  ];

  const safetyTips: SafetyTip[] = [
    {
      id: '1',
      title: 'Kiểm tra thời tiết',
      description: 'Luôn theo dõi dự báo thời tiết trước khi khởi hành. Tránh leo núi khi có mưa to hoặc sương mù dày đặc.',
      priority: 'high',
      icon: Cloud,
      category: 'weather'
    },
    {
      id: '2',
      title: 'Mang theo đủ nước',
      description: 'Chuẩn bị ít nhất 2-3 lít nước/người cho chuyến trekking. Có thể bổ sung nước tại các suối trên đường.',
      priority: 'high',
      icon: Heart,
      category: 'health'
    },
    {
      id: '3',
      title: 'Thông báo lịch trình',
      description: 'Chia sẻ kế hoạch di chuyển với gia đình/bạn bè. Cập nhật vị trí định kỳ khi có sóng.',
      priority: 'medium',
      icon: Navigation,
      category: 'communication'
    },
    {
      id: '4',
      title: 'Trang bị an toàn',
      description: 'Mang theo đèn pin, pin dự phòng, áo ấm và giày trekking chống trượt.',
      priority: 'medium',
      icon: Mountain,
      category: 'hiking'
    }
  ];

  // Handler functions for safety tips
  const handleSafetyTipClick = (tipId: string) => {
    switch (tipId) {
      case '1':
        setWeatherDialogOpen(true);
        break;
      case '2':
        setWaterDialogOpen(true);
        break;
      case '3':
        setScheduleDialogOpen(true);
        break;
      case '4':
        setEquipmentDialogOpen(true);
        break;
    }
  };

  // Handler functions for quick actions
  const handleShareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 3000);
  };

  const handleBatterySave = () => {
    setBatterySaveMode(true);
    // Simulate sending location to government station
    setTimeout(() => {
      alert('Vị trí cuối cùng đã được gửi đến trạm kiểm soát. Hãy tìm nơi trú ẩn an toàn và chờ cứu hộ.');
    }, 2000);
  };

  const handleScheduleSubmit = () => {
    // Simulate sending schedule
    alert('Lịch trình đã được gửi thành công!');
    setScheduleDialogOpen(false);
    setScheduleForm({
      name: '',
      phone: '',
      startDate: '',
      endDate: '',
      route: '',
      emergencyContact: '',
      notes: ''
    });
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'police': return Shield;
      case 'medical': return Heart;
      case 'rescue': return Mountain;
      case 'local': return Phone;
      default: return Phone;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const WeatherIcon = currentWeather.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          Trung Tâm An Toàn
        </h2>
        <p className="font-inter text-muted-foreground text-lg max-w-2xl mx-auto">
          Thông tin quan trọng để đảm bảo an toàn trong chuyến khám phá Tà Xùa của bạn
        </p>
      </div>

      {/* Weather Widget */}
      <Card className="shadow-soft border-0 card-hover">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center gap-2">
            <WeatherIcon className="w-5 h-5 text-primary pulse-on-hover" />
            Thời Tiết Hiện Tại
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="w-6 h-6 text-orange-500 mr-2" />
                <span className="text-2xl font-bold text-foreground">{currentWeather.temperature}°C</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentWeather.condition}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Cloud className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-lg font-semibold text-foreground">{currentWeather.humidity}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Độ ẩm</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Wind className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-lg font-semibold text-foreground">{currentWeather.windSpeed} km/h</span>
              </div>
              <p className="text-sm text-muted-foreground">Tốc độ gió</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-lg font-semibold text-foreground">{currentWeather.visibility} km</span>
              </div>
              <p className="text-sm text-muted-foreground">Tầm nhìn</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-playfair text-xl font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Cảnh Báo & Thông Tin Quan Trọng
          </h3>
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-orange-200 bg-orange-50 card-hover">
              <AlertTriangle className="h-4 w-4 text-orange-600 pulse-on-hover" />
              <AlertDescription className="text-orange-800">
                <div className="flex justify-between items-start">
                  <span>{alert.message}</span>
                  <span className="text-xs text-orange-600 ml-4">{alert.timestamp}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <Card className="shadow-soft border-0 card-hover">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary pulse-on-hover" />
              Liên Hệ Khẩn Cấp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => {
              const IconComponent = getContactIcon(contact.type);
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-inter font-semibold text-foreground">{contact.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{contact.phone}</span>
                        {contact.available24h && (
                          <Badge variant="secondary" className="text-xs pulse-on-hover">24/7</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="btn-primary focus-ring">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="shadow-soft border-0 card-hover">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary pulse-on-hover" />
              Lời Khuyên An Toàn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {safetyTips.map((tip) => {
              const IconComponent = tip.icon;
              return (
                <div 
                  key={tip.id} 
                  className={`p-4 rounded-lg border transition-all duration-300 card-hover cursor-pointer hover:shadow-md ${getPriorityColor(tip.priority)}`}
                  onClick={() => handleSafetyTipClick(tip.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-inter font-semibold text-foreground">{tip.title}</h4>
                        <Badge 
                          variant={tip.priority === 'high' ? 'destructive' : tip.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs pulse-on-hover"
                        >
                          {tip.priority === 'high' ? 'Quan trọng' : tip.priority === 'medium' ? 'Lưu ý' : 'Tham khảo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                      <p className="text-xs text-primary mt-2 font-medium">👆 Nhấn để xem chi tiết</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft border-0 card-hover">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Hành Động Nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog open={shareLocationDialogOpen} onOpenChange={setShareLocationDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-auto p-4 flex flex-col items-center gap-2 btn-primary focus-ring">
                  <MapPin className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold">Chia Sẻ Vị Trí</div>
                    <div className="text-xs opacity-80">Gửi tọa độ hiện tại</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chia Sẻ Vị Trí Hiện Tại</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <MapPin className="h-4 w-4" />
                    <AlertDescription>
                      Tính năng này sẽ chia sẻ vị trí GPS hiện tại của bạn với các liên hệ khẩn cấp và dịch vụ cứu hộ.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Button onClick={handleShareLocation} className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Bắt Đầu Chia Sẻ
                    </Button>
                    <Button variant="outline" onClick={() => setShareLocationDialogOpen(false)}>
                      Hủy
                    </Button>
                  </div>
                  {locationShared && (
                    <Alert className="border-green-200 bg-green-50">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Vị trí đã được chia sẻ thành công!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={findSignalDialogOpen} onOpenChange={setFindSignalDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 btn-primary focus-ring">
                  <Wifi className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold">Tìm Sóng</div>
                    <div className="text-xs opacity-80">Vị trí có sóng gần nhất</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    Tìm Sóng Điện Thoại & WiFi
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Signal className="w-4 h-4 text-green-500" />
                        Sóng Điện Thoại
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <div>
                            <div className="font-medium">Viettel</div>
                            <div className="text-sm text-muted-foreground">4G LTE</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-300 rounded-sm"></div>
                            <span className="text-xs ml-1">Mạnh</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <div>
                            <div className="font-medium">Vinaphone</div>
                            <div className="text-sm text-muted-foreground">3G</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <span className="text-xs ml-1">Trung bình</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <div>
                            <div className="font-medium">Mobifone</div>
                            <div className="text-sm text-muted-foreground">2G</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <span className="text-xs ml-1">Yếu</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-blue-500" />
                        Mạng WiFi
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <div>
                            <div className="font-medium">TaXua_Homestay</div>
                            <div className="text-sm text-muted-foreground">Có bảo mật</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                            <span className="text-xs ml-1">Mạnh</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <div>
                            <div className="font-medium">Valley_Guest</div>
                            <div className="text-sm text-muted-foreground">Mở</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <span className="text-xs ml-1">Tốt</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <div>
                            <div className="font-medium">Mountain_View</div>
                            <div className="text-sm text-muted-foreground">Có bảo mật</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-gray-300 rounded-sm"></div>
                            <span className="text-xs ml-1">Trung bình</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <Alert>
                    <Wifi className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Khuyến nghị:</strong> Sử dụng mạng Viettel 4G hoặc WiFi TaXua_Homestay để có kết nối tốt nhất. Tránh sử dụng mạng yếu khi ở vùng núi cao.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={() => setFindSignalDialogOpen(false)} className="w-full">
                    <Map className="w-4 h-4 mr-2" />
                    Xem Bản Đồ Chi Tiết
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={batterySaveDialogOpen} onOpenChange={setBatterySaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 btn-primary focus-ring">
                  <Battery className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-semibold">Tiết Kiệm Pin</div>
                    <div className="text-xs opacity-80">Bật chế độ khẩn cấp</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="w-5 h-5" />
                    Chế Độ Tiết Kiệm Pin Khẩn Cấp
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Cảnh báo:</strong> Chế độ này sẽ ngắt kết nối internet và gửi vị trí cuối cùng của bạn đến trạm kiểm soát.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Khi kích hoạt chế độ này:</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Vị trí hiện tại sẽ được gửi đến trạm kiểm soát chính phủ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Tất cả kết nối mạng sẽ bị ngắt để tiết kiệm pin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Điện thoại chuyển sang chế độ máy bay</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Đội cứu hộ sẽ được thông báo về vị trí của bạn</span>
                      </li>
                    </ul>
                  </div>

                  <Alert className="border-red-200 bg-red-50">
                    <Heart className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Quan trọng:</strong> Sau khi kích hoạt, hãy tìm nơi trú ẩn an toàn, hạn chế di chuyển và chờ đợi đội cứu hộ.
                    </AlertDescription>
                  </Alert>

                  {batterySaveMode ? (
                    <div className="space-y-3">
                      <Alert className="border-green-200 bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          <strong>Đã kích hoạt:</strong> Vị trí của bạn đã được gửi đến trạm kiểm soát. Đội cứu hộ đang trên đường đến.
                        </AlertDescription>
                      </Alert>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">✓ Hoàn tất</div>
                        <p className="text-sm text-muted-foreground">
                          Hãy giữ bình tĩnh và chờ đợi cứu hộ tại vị trí hiện tại
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleBatterySave} 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        <Battery className="w-4 h-4 mr-2" />
                        Xác Nhận Kích Hoạt
                      </Button>
                      <Button variant="outline" onClick={() => setBatterySaveDialogOpen(false)}>
                        Hủy
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Components for Safety Tips */}
      
      {/* Weather Dialog */}
      <Dialog open={weatherDialogOpen} onOpenChange={setWeatherDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              Bảng Theo Dõi Thời Tiết Khu Vực
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  Hôm Nay
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nhiệt độ:</span>
                    <span className="font-medium">15°C - 22°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Độ ẩm:</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tầm nhìn:</span>
                    <span className="font-medium">8km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gió:</span>
                    <span className="font-medium">12 km/h</span>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  Ngày Mai
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nhiệt độ:</span>
                    <span className="font-medium">12°C - 18°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mưa:</span>
                    <span className="font-medium text-blue-600">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tầm nhìn:</span>
                    <span className="font-medium">5km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gió:</span>
                    <span className="font-medium">18 km/h</span>
                  </div>
                </div>
              </Card>
            </div>
            <Alert className="border-blue-200 bg-blue-50">
              <Cloud className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Khuyến nghị:</strong> Thời tiết thuận lợi cho trekking hôm nay. Ngày mai có khả năng mưa, nên chuẩn bị áo mưa.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      {/* Water Sources Dialog */}
      <Dialog open={waterDialogOpen} onOpenChange={setWaterDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Địa Điểm Mua Nước & Suối Tự Nhiên
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Store className="w-4 h-4 text-green-500" />
                  Cửa Hàng & Homestay
                </h4>
                <div className="space-y-3">
                  <Card className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Cửa hàng Tà Xùa</div>
                        <div className="text-sm text-muted-foreground">Cách 500m</div>
                        <div className="text-xs text-green-600">Mở cửa: 6:00 - 22:00</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Homestay Valley</div>
                        <div className="text-sm text-muted-foreground">Cách 800m</div>
                        <div className="text-xs text-green-600">24/7</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  Suối Nước Tự Nhiên
                </h4>
                <div className="space-y-3">
                  <Card className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Suối Tà Xùa</div>
                        <div className="text-sm text-muted-foreground">Cách 1.2km</div>
                        <div className="text-xs text-blue-600">Nước trong, an toàn</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Map className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Suối Bản Tà</div>
                        <div className="text-sm text-muted-foreground">Cách 2km</div>
                        <div className="text-xs text-blue-600">Trên đường trekking</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Map className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <Alert>
              <Droplets className="h-4 w-4" />
              <AlertDescription>
                <strong>Lưu ý:</strong> Luôn mang theo viên lọc nước hoặc đun sôi nước suối trước khi uống để đảm bảo an toàn.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Notification Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Thông Báo Lịch Trình
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                  placeholder="Nhập họ tên của bạn"
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={scheduleForm.phone}
                  onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={scheduleForm.startDate}
                  onChange={(e) => setScheduleForm({...scheduleForm, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={scheduleForm.endDate}
                  onChange={(e) => setScheduleForm({...scheduleForm, endDate: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="route">Lộ trình dự kiến</Label>
              <Select value={scheduleForm.route} onValueChange={(value) => setScheduleForm({...scheduleForm, route: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lộ trình" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dragon-spine">Sống lưng khủng long - 1 ngày</SelectItem>
                  <SelectItem value="phu-sang">Đỉnh Phu Sang - 2 ngày</SelectItem>
                  <SelectItem value="full-trek">Trekking toàn bộ - 3 ngày</SelectItem>
                  <SelectItem value="custom">Lộ trình tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
              <Input
                id="emergencyContact"
                value={scheduleForm.emergencyContact}
                onChange={(e) => setScheduleForm({...scheduleForm, emergencyContact: e.target.value})}
                placeholder="Tên và SĐT người thân"
              />
            </div>
            <div>
              <Label htmlFor="notes">Ghi chú thêm</Label>
              <Textarea
                id="notes"
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                placeholder="Thông tin bổ sung, tình trạng sức khỏe..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleScheduleSubmit} className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Gửi Thông Báo
              </Button>
              <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Equipment Store Dialog */}
      <Dialog open={equipmentDialogOpen} onOpenChange={setEquipmentDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Cửa Hàng Trang Bị An Toàn
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Mountain className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Giày Trekking</h4>
                <p className="text-sm text-muted-foreground mb-2">Giày chống trượt chuyên dụng</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">1.200.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Đèn Pin LED</h4>
                <p className="text-sm text-muted-foreground mb-2">Đèn pin siêu sáng, chống nước</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">350.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Battery className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Pin Dự Phòng</h4>
                <p className="text-sm text-muted-foreground mb-2">Pin sạc dự phòng 20.000mAh</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">450.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Áo Mưa</h4>
                <p className="text-sm text-muted-foreground mb-2">Áo mưa chống thấm cao cấp</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">180.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Túi Y Tế</h4>
                <p className="text-sm text-muted-foreground mb-2">Bộ sơ cứu cơ bản</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">250.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Navigation className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold">Máy GPS</h4>
                <p className="text-sm text-muted-foreground mb-2">Thiết bị định vị chuyên dụng</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">2.500.000đ</span>
                  <Button size="sm">Mua</Button>
                </div>
              </Card>
            </div>
            <Alert>
              <ShoppingCart className="h-4 w-4" />
              <AlertDescription>
                <strong>Giao hàng:</strong> Miễn phí ship đến homestay trong khu vực Tà Xùa. Giao hàng trong 2-4 giờ.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SafetyCenter;