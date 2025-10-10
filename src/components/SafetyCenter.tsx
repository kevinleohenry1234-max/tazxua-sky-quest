import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  AlertTriangle,
  Phone,
  Shield,
  Heart,
  MapPin,
  Download,
  Filter
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'medical' | 'police' | 'rescue';
}

interface ChecklistItem {
  id: string;
  text: string;
  category: 'before' | 'during' | 'gear';
  completed: boolean;
}

const SafetyCenter: React.FC = () => {
  const [weatherData] = useState<WeatherData>({
    temperature: 18,
    feelsLike: 15,
    humidity: 85,
    windSpeed: 12,
    visibility: 8,
    condition: 'cloudy'
  });

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Before departure
    { id: '1', text: 'Kiểm tra phương tiện di chuyển', category: 'before', completed: false },
    { id: '2', text: 'Báo cho người thân về lịch trình', category: 'before', completed: false },
    { id: '3', text: 'Sạc đầy pin điện thoại', category: 'before', completed: false },
    { id: '4', text: 'Chuẩn bị pin dự phòng', category: 'before', completed: false },
    { id: '5', text: 'Mang theo giấy tờ cá nhân', category: 'before', completed: false },
    
    // During trekking
    { id: '6', text: 'Mang áo mưa mỏng', category: 'during', completed: false },
    { id: '7', text: 'Giữ khoảng cách an toàn', category: 'during', completed: false },
    { id: '8', text: 'Không rời khỏi đoàn', category: 'during', completed: false },
    { id: '9', text: 'Tôn trọng chỉ dẫn hướng dẫn viên', category: 'during', completed: false },
    
    // Essential gear
    { id: '10', text: 'Giày leo núi chống trượt', category: 'gear', completed: false },
    { id: '11', text: 'Gậy trekking', category: 'gear', completed: false },
    { id: '12', text: 'Áo khoác gió', category: 'gear', completed: false },
    { id: '13', text: 'Nước uống đầy đủ', category: 'gear', completed: false },
    { id: '14', text: 'Thuốc y tế cá nhân', category: 'gear', completed: false },
  ]);

  const [emergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Trạm Y tế Tà Xùa', phone: '0274.3871.234', type: 'medical' },
    { id: '2', name: 'Công an Huyện Bắc Yên', phone: '0274.3871.113', type: 'police' },
    { id: '3', name: 'Đội Cứu hộ Sơn La', phone: '0212.3856.115', type: 'rescue' },
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />;
      case 'rainy': return <CloudRain className="w-12 h-12 text-blue-500 animate-bounce" />;
      default: return <Cloud className="w-12 h-12 text-gray-500 animate-pulse" />;
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'medical': return <Heart className="w-6 h-6 text-red-500" />;
      case 'police': return <Shield className="w-6 h-6 text-blue-500" />;
      case 'rescue': return <Phone className="w-6 h-6 text-green-600" />;
      default: return <Phone className="w-6 h-6" />;
    }
  };

  const downloadVCard = () => {
    const vCardData = emergencyContacts.map(contact => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEND:VCARD`
    ).join('\n');
    
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-contacts-ta-xua.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'before': return 'Trước khi khởi hành';
      case 'during': return 'Khi trekking';
      case 'gear': return 'Trang bị cần thiết';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#fefbf6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Dynamic Content & Alerts */}
          <div className="space-y-6">
            
            {/* Visual Weather Report */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  {getWeatherIcon(weatherData.condition)}
                  Bản Tin Thời Tiết Trực Quan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Temperature Display */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-[#15803d]">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-sm text-gray-600">
                      Cảm giác như {weatherData.feelsLike}°C
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[#15803d] border-[#15803d]">
                      Sương mù nhẹ
                    </Badge>
                  </div>
                </div>

                {/* Weather Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Humidity */}
                  <div className="text-center">
                    <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Độ ẩm</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.humidity}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${weatherData.humidity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Wind Speed */}
                  <div className="text-center">
                    <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Gió</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.windSpeed} km/h</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(weatherData.windSpeed / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="text-center">
                    <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Tầm nhìn</div>
                    <div className="font-semibold text-[#1f2937]">{weatherData.visibility} km</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(weatherData.visibility / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Warnings */}
            <Card className="border-amber-200 bg-amber-50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                  Cảnh Báo Quan Trọng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-300 bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="font-inter text-[#1f2937]">
                    <strong>Sương mù dày buổi sáng</strong> – hạn chế di chuyển bằng xe máy từ 5:00-8:00
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-amber-300 bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="font-inter text-[#1f2937]">
                    <strong>Nhiệt độ giảm sâu ban đêm</strong> – mang theo áo ấm và đèn pin
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Tools, Guides & Contacts */}
          <div className="space-y-6">
            
            {/* Safety Handbook - Interactive Checklist */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937]">
                  Cẩm Nang An Toàn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {['before', 'during', 'gear'].map((category) => (
                  <div key={category} className="space-y-3">
                    <h3 className="font-semibold text-[#15803d] text-lg border-b border-[#15803d]/20 pb-2">
                      {getCategoryTitle(category)}
                    </h3>
                    <div className="space-y-2">
                      {checklistItems
                        .filter(item => item.category === category)
                        .map((item) => (
                          <div 
                            key={item.id} 
                            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                              item.completed ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'
                            }`}
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.completed}
                              onCheckedChange={() => toggleChecklistItem(item.id)}
                              className="data-[state=checked]:bg-[#15803d] data-[state=checked]:border-[#15803d]"
                            />
                            <label 
                              htmlFor={item.id} 
                              className={`font-inter text-sm cursor-pointer flex-1 ${
                                item.completed ? 'line-through' : ''
                              }`}
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact List */}
            <Card className="border-[#15803d]/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-[#1f2937]">
                  Danh Bạ Khẩn Cấp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {emergencyContacts.map((contact) => (
                    <div 
                      key={contact.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#15803d]/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getContactIcon(contact.type)}
                        <div>
                          <div className="font-semibold text-[#1f2937]">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.phone}</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white"
                        onClick={() => window.open(`tel:${contact.phone}`)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={downloadVCard}
                  className="w-full bg-[#15803d] hover:bg-[#15803d]/90 text-white font-inter"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Lưu Danh Bạ Khẩn Cấp
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Interactive Safety Map */}
        <Card className="mt-8 border-[#15803d]/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="font-playfair text-2xl text-[#1f2937] flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#15803d]" />
              Bản Đồ An Toàn Tương Tác
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-[#15803d] text-[#15803d]">
                <Filter className="w-4 h-4 mr-2" />
                Trạm y tế
              </Button>
              <Button variant="outline" size="sm" className="border-[#15803d] text-[#15803d]">
                <Filter className="w-4 h-4 mr-2" />
                Đồn công an
              </Button>
              <Button variant="outline" size="sm" className="border-[#15803d] text-[#15803d]">
                <Filter className="w-4 h-4 mr-2" />
                Điểm trú ẩn
              </Button>
              <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                <Filter className="w-4 h-4 mr-2" />
                Khu vực nguy hiểm
              </Button>
            </div>
            
            {/* Placeholder for Google Maps */}
            <div className="w-full h-96 bg-gradient-to-br from-[#15803d]/10 to-[#15803d]/5 rounded-lg border-2 border-dashed border-[#15803d]/30 flex items-center justify-center">
              <div className="text-center text-[#15803d]">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="font-inter text-lg">Bản đồ tương tác sẽ được tích hợp tại đây</p>
                <p className="font-inter text-sm opacity-70 mt-2">
                  Hiển thị các điểm y tế, công an, trú ẩn và khu vực nguy hiểm
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SafetyCenter;