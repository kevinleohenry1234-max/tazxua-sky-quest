import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Phone, 
  Shield, 
  MapPin, 
  AlertTriangle,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Droplets,
  Navigation,
  Users,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Heart,
  Zap,
  FileText,
  Camera,
  Trash2,
  WifiOff
} from 'lucide-react';

// SOS & Emergency Contacts Module
const SOSModule = () => {
  const [sosPressed, setSosPressed] = useState(false);
  const [sosTimer, setSosTimer] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleSOSPress = () => {
    setSosPressed(true);
    const timer = setInterval(() => {
      setSosTimer(prev => {
        if (prev >= 3) {
          // Send SOS SMS with GPS coordinates
          sendSOSAlert();
          clearInterval(timer);
          setSosPressed(false);
          setSosTimer(0);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    setTimeout(() => {
      if (sosPressed) {
        clearInterval(timer);
        setSosPressed(false);
        setSosTimer(0);
      }
    }, 3000);
  };

  const sendSOSAlert = () => {
    // Get GPS coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const message = `🚨 KHẨN CẤP! Tôi cần hỗ trợ tại Tà Xùa. Vị trí: ${latitude}, ${longitude}. Vui lòng liên hệ ngay!`;
        
        // In real app, this would send SMS to emergency contacts
        alert(`SOS đã được gửi!\nTọa độ: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      });
    }
  };

  const emergencyContacts = [
    { name: 'Cứu hộ 115', phone: '115', type: 'rescue', available: true },
    { name: 'Công an 113', phone: '113', type: 'police', available: true },
    { name: 'Trạm Y tế Tà Xùa', phone: '0123456789', type: 'medical', available: true },
    { name: 'Homestay Chủ nhà', phone: '0987654321', type: 'homestay', available: true }
  ];

  return (
    <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Phone className="w-5 h-5" />
          SOS & Liên hệ khẩn cấp
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* SOS Button */}
        <div className="text-center">
          <button
            onMouseDown={handleSOSPress}
            onMouseUp={() => {setSosPressed(false); setSosTimer(0);}}
            onTouchStart={handleSOSPress}
            onTouchEnd={() => {setSosPressed(false); setSosTimer(0);}}
            className={`w-24 h-24 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-200 ${
              sosPressed 
                ? 'bg-red-600 scale-110 shadow-xl' 
                : 'bg-red-500 hover:bg-red-600 hover:scale-105'
            }`}
          >
            {sosPressed ? `${(3 - sosTimer).toFixed(1)}s` : 'SOS'}
          </button>
          <p className="text-sm text-gray-600 mt-2">Nhấn giữ 3 giây để gửi cảnh báo</p>
        </div>

        {/* Check-in Button */}
        <Button
          onClick={() => setCheckedIn(!checkedIn)}
          variant={checkedIn ? "default" : "outline"}
          className="w-full"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {checkedIn ? 'Đã check-in an toàn' : 'Check-in an toàn'}
        </Button>

        {/* Emergency Contacts */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Số điện thoại khẩn cấp</h4>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${contact.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium">{contact.name}</span>
              </div>
              <a href={`tel:${contact.phone}`} className="text-blue-600 font-mono text-sm">
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Real-time Alerts Module
const AlertsModule = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      level: 'yellow' as const,
      title: 'Sương mù dày đặc',
      description: 'Tầm nhìn giảm xuống dưới 50m từ 6:00-9:00 sáng',
      time: '5 phút trước'
    },
    {
      id: 2,
      level: 'orange' as const,
      title: 'Đường trơn trượt',
      description: 'Cung Sống lưng Khủng long có độ ẩm cao, cẩn thận khi di chuyển',
      time: '15 phút trước'
    }
  ]);

  const weatherData = {
    temperature: 18,
    feelsLike: 16,
    humidity: 85,
    windSpeed: 12,
    visibility: 2.5,
    condition: 'cloudy' as const
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'yellow': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'orange': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'red': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-yellow-700">
          <AlertTriangle className="w-5 h-5" />
          Cảnh báo thời gian thực
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weather Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Nhiệt độ</span>
            </div>
            <p className="text-lg font-bold">{weatherData.temperature}°C</p>
            <p className="text-xs text-gray-500">Cảm giác như {weatherData.feelsLike}°C</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Độ ẩm</span>
            </div>
            <p className="text-lg font-bold">{weatherData.humidity}%</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Gió</span>
            </div>
            <p className="text-lg font-bold">{weatherData.windSpeed} km/h</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Tầm nhìn</span>
            </div>
            <p className="text-lg font-bold">{weatherData.visibility} km</p>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Cảnh báo hiện tại</h4>
          {alerts.map((alert) => (
            <Alert key={alert.id} className={getLevelColor(alert.level)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-sm">{alert.description}</p>
                  </div>
                  <span className="text-xs opacity-75">{alert.time}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive Safety Map Module
const SafetyMapModule = () => {
  const [activeFilters, setActiveFilters] = useState(['medical', 'rescue']);
  const [offlineMode, setOfflineMode] = useState(false);

  const mapLayers = [
    { id: 'medical', name: 'Y tế', icon: Heart, color: 'text-red-500' },
    { id: 'rescue', name: 'Cứu hộ', icon: Shield, color: 'text-blue-500' },
    { id: 'danger', name: 'Nguy hiểm', icon: AlertTriangle, color: 'text-orange-500' },
    { id: 'water', name: 'Nguồn nước', icon: Droplets, color: 'text-cyan-500' }
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Navigation className="w-5 h-5" />
          Bản đồ An toàn tương tác
          {offlineMode && <WifiOff className="w-4 h-4 text-gray-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Filters */}
        <div className="flex flex-wrap gap-2">
          {mapLayers.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeFilters.includes(layer.id);
            return (
              <button
                key={layer.id}
                onClick={() => toggleFilter(layer.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                  isActive 
                    ? 'bg-white border-2 border-green-300 shadow-sm' 
                    : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? layer.color : 'text-gray-500'}`} />
                {layer.name}
              </button>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Bản đồ tương tác</p>
            <p className="text-xs text-gray-400">Hiển thị các điểm an toàn và nguy hiểm</p>
          </div>
        </div>

        {/* Offline Toggle */}
        <Button
          onClick={() => setOfflineMode(!offlineMode)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <WifiOff className="w-4 h-4 mr-2" />
          {offlineMode ? 'Chế độ offline' : 'Bật chế độ offline'}
        </Button>
      </CardContent>
    </Card>
  );
};

// Green Travel Guides Module
const GuidesModule = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const personalSafetyGuides = [
    { title: 'Sơ cứu cơ bản', content: 'Xử lý vết thương, bong gân, sốc nhiệt' },
    { title: 'Xử lý khi lạc đường', content: 'Giữ bình tĩnh, tìm điểm cao, báo hiệu' },
    { title: 'Giữ ấm cơ thể', content: 'Mặc đồ nhiều lớp, tránh ướt, uống nước ấm' }
  ];

  const environmentalGuides = [
    { title: 'Bảo vệ môi trường', content: 'Không xả rác, không hái hoa lá' },
    { title: 'Tôn trọng văn hóa', content: 'Chào hỏi lịch sự, không chụp ảnh tùy tiện' },
    { title: 'Du lịch có trách nhiệm', content: 'Hỗ trợ kinh tế địa phương, mua sản phẩm local' }
  ];

  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-emerald-700">
          <FileText className="w-5 h-5" />
          Hướng dẫn & Quy tắc du lịch xanh
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">An toàn cá nhân</TabsTrigger>
            <TabsTrigger value="environmental">Văn hóa & Môi trường</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-3 mt-4">
            {personalSafetyGuides.map((guide, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm mb-1">{guide.title}</h4>
                <p className="text-sm text-gray-600">{guide.content}</p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="environmental" className="space-y-3 mt-4">
            {environmentalGuides.map((guide, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm mb-1">{guide.title}</h4>
                <p className="text-sm text-gray-600">{guide.content}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Find Trash Disposal */}
        <Button className="w-full mt-4" variant="outline">
          <Trash2 className="w-4 h-4 mr-2" />
          Tìm điểm bỏ rác gần nhất
        </Button>
      </CardContent>
    </Card>
  );
};

// Community & Reporting Module
const CommunityModule = () => {
  const [reportText, setReportText] = useState('');
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'landslide',
      title: 'Sạt lở tại Km3 cung Sống lưng Khủng long',
      author: 'Du khách A',
      time: '2 giờ trước',
      status: 'verified'
    },
    {
      id: 2,
      type: 'trash',
      title: 'Bãi rác tự phát gần điểm săn mây',
      author: 'Hướng dẫn viên B',
      time: '5 giờ trước',
      status: 'pending'
    }
  ]);

  const submitReport = () => {
    if (reportText.trim()) {
      // In real app, this would submit to backend
      alert('Báo cáo đã được gửi! Cảm ơn bạn đã góp phần bảo vệ Tà Xùa.');
      setReportText('');
    }
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Users className="w-5 h-5" />
          Cộng đồng & Báo cáo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Report */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Báo cáo nhanh</h4>
          <div className="flex gap-2">
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Mô tả vấn đề bạn gặp phải..."
              className="flex-1 p-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
            <div className="flex flex-col gap-1">
              <Button size="sm" variant="outline">
                <Camera className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={submitReport} size="sm" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Gửi báo cáo
          </Button>
        </div>

        {/* Community Reports */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Bảng tin cộng đồng</h4>
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-3 rounded-lg border">
              <div className="flex justify-between items-start mb-1">
                <h5 className="font-semibold text-sm">{report.title}</h5>
                <Badge variant={report.status === 'verified' ? 'default' : 'secondary'}>
                  {report.status === 'verified' ? 'Đã xác minh' : 'Đang xử lý'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Bởi {report.author} • {report.time}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Smart Safety Hub Component
const SmartSafetyHub = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Smart Safety Hub</h2>
        <p className="text-gray-600">Hệ thống an toàn thông minh cho du khách Tà Xùa</p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div id="sos-section">
          <SOSModule />
        </div>
        
        <div id="weather-alerts-section">
          <AlertsModule />
        </div>
        
        <div id="safety-map-section">
          <SafetyMapModule />
        </div>
        
        <GuidesModule />
        
        <CommunityModule />
      </div>
    </div>
  );
};

export default SmartSafetyHub;