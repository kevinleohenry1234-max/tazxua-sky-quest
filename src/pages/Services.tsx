import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Camera, Utensils, Car, Bed, Shield } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: "Hướng dẫn du lịch",
      description: "Dịch vụ hướng dẫn viên chuyên nghiệp với kiến thức sâu về văn hóa địa phương",
      features: ["Hướng dẫn viên bản địa", "Kiến thức văn hóa", "Lịch trình linh hoạt"]
    },
    {
      icon: <Camera className="h-8 w-8 text-green-600" />,
      title: "Chụp ảnh kỷ niệm",
      description: "Dịch vụ chụp ảnh chuyên nghiệp tại các điểm đẹp nhất Tà Xùa",
      features: ["Nhiếp ảnh gia chuyên nghiệp", "Chỉnh sửa ảnh miễn phí", "Giao ảnh nhanh chóng"]
    },
    {
      icon: <Utensils className="h-8 w-8 text-green-600" />,
      title: "Ẩm thực địa phương",
      description: "Trải nghiệm các món ăn đặc sản của vùng núi Tà Xùa",
      features: ["Món ăn truyền thống", "Nguyên liệu tươi sạch", "Không gian ấm cúng"]
    },
    {
      icon: <Car className="h-8 w-8 text-green-600" />,
      title: "Vận chuyển",
      description: "Dịch vụ đưa đón và thuê xe máy, ô tô tại khu vực",
      features: ["Xe máy địa hình", "Ô tô 4-7 chỗ", "Tài xế kinh nghiệm"]
    },
    {
      icon: <Bed className="h-8 w-8 text-green-600" />,
      title: "Lưu trú",
      description: "Các lựa chọn lưu trú từ homestay đến resort cao cấp",
      features: ["Homestay gia đình", "Resort view núi", "Cắm trại an toàn"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Bảo hiểm du lịch",
      description: "Dịch vụ bảo hiểm toàn diện cho chuyến du lịch an toàn",
      features: ["Bảo hiểm y tế", "Bảo hiểm hành lý", "Hỗ trợ 24/7"]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Dịch vụ du lịch
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Trải nghiệm trọn vẹn vẻ đẹp Tà Xùa với các dịch vụ chuyên nghiệp và tận tâm
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {service.icon}
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Đặt dịch vụ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Cần tư vấn thêm?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn dịch vụ phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Gọi ngay: 0123 456 789
              </Button>
              <Button size="lg" variant="outline">
                Chat với tư vấn viên
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;