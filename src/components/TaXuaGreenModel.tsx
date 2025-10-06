import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Award, 
  Users, 
  Camera, 
  Gift, 
  Recycle,
  TreePine,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Coins,
  Share2,
  Target,
  Globe
} from 'lucide-react';
import { useState } from 'react';

const TaXuaGreenModel = () => {
  const [activeStep, setActiveStep] = useState(1);

  const greenActions = [
    {
      id: 1,
      title: 'Thu gom rác thải',
      points: 10,
      icon: <Recycle className="w-5 h-5" />,
      description: 'Thu gom và phân loại rác thải trên đường trekking'
    },
    {
      id: 2,
      title: 'Trồng cây xanh',
      points: 25,
      icon: <TreePine className="w-5 h-5" />,
      description: 'Tham gia trồng cây bản địa tại các khu vực được chỉ định'
    },
    {
      id: 3,
      title: 'Bảo vệ động vật',
      points: 15,
      icon: <Heart className="w-5 h-5" />,
      description: 'Báo cáo và bảo vệ động vật hoang dã địa phương'
    },
    {
      id: 4,
      title: 'Giáo dục môi trường',
      points: 20,
      icon: <Users className="w-5 h-5" />,
      description: 'Chia sẻ kiến thức bảo vệ môi trường với cộng đồng'
    }
  ];

  const vouchers = [
    { points: 50, discount: '10%', service: 'Homestay' },
    { points: 100, discount: '15%', service: 'Tour trekking' },
    { points: 150, discount: '20%', service: 'Ẩm thực địa phương' },
    { points: 200, discount: '25%', service: 'Combo trải nghiệm' }
  ];

  const benefits = [
    {
      category: 'Du khách',
      icon: <Users className="w-6 h-6" />,
      items: [
        'Nhận voucher giảm giá cho dịch vụ du lịch',
        'Trải nghiệm du lịch có ý nghĩa và bền vững',
        'Kết nối với cộng đồng yêu thiên nhiên',
        'Học hỏi kiến thức về bảo vệ môi trường'
      ]
    },
    {
      category: 'Doanh nghiệp địa phương',
      icon: <Globe className="w-6 h-6" />,
      items: [
        'Tăng lượng khách hàng thông qua chương trình voucher',
        'Xây dựng thương hiệu du lịch bền vững',
        'Tạo việc làm cho cộng đồng địa phương',
        'Phát triển kinh tế xanh tại Tà Xùa'
      ]
    },
    {
      category: 'Môi trường',
      icon: <Leaf className="w-6 h-6" />,
      items: [
        'Giảm thiểu rác thải và ô nhiễm môi trường',
        'Bảo tồn hệ sinh thái núi rừng Tà Xùa',
        'Tăng độ che phủ rừng qua việc trồng cây',
        'Nâng cao ý thức bảo vệ môi trường'
      ]
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background với gradient đồng bộ */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-blue-950/90 to-slate-950/95 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Mô hình Tà Xùa Xanh</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Du lịch <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Xanh</span> - 
            Chill <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">An Lành</span>
          </h2>
          
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Khuyến khích du khách tham gia bảo vệ môi trường tại Tà Xùa và nhận thưởng bằng voucher du lịch. 
            Cùng nhau xây dựng một Tà Xùa xanh, sạch và bền vững cho thế hệ tương lai.
          </p>
        </div>

        {/* Ba bước chính */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <Target className="w-8 h-8 inline-block mr-3 text-green-400" />
            Ba Bước Thực Hiện
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bước 1: Hành động xanh */}
            <Card className={`bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border-green-500/30 transition-all duration-300 hover:scale-105 cursor-pointer ${activeStep === 1 ? 'ring-2 ring-green-400' : ''}`}
                  onClick={() => setActiveStep(1)}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Bước 1: Hành Động Xanh</h4>
                <p className="text-gray-100 mb-6 font-medium">
                  Du khách tham gia các hoạt động bảo vệ môi trường như thu gom rác, trồng cây, bảo vệ động vật hoang dã.
                </p>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 font-semibold">
                  Hành động cụ thể
                </Badge>
              </CardContent>
            </Card>

            {/* Bước 2: Ghi nhận hệ thống */}
            <Card className={`bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer ${activeStep === 2 ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setActiveStep(2)}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Bước 2: Ghi Nhận Hệ Thống</h4>
                <p className="text-gray-100 mb-6 font-medium">
                  Hành động được xác minh bởi staff hoặc cộng đồng, sau đó hệ thống tự động cộng điểm xanh vào tài khoản.
                </p>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-semibold">
                  Xác minh & Cộng điểm
                </Badge>
              </CardContent>
            </Card>

            {/* Bước 3: Nhận thưởng */}
            <Card className={`bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border-yellow-500/30 transition-all duration-300 hover:scale-105 cursor-pointer ${activeStep === 3 ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => setActiveStep(3)}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Bước 3: Nhận Thưởng</h4>
                <p className="text-gray-100 mb-6 font-medium">
                  Đổi điểm xanh lấy voucher giảm giá cho homestay, tour, ẩm thực và các dịch vụ du lịch tại Tà Xùa.
                </p>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-semibold">
                  Voucher & Ưu đãi
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chi tiết bước được chọn */}
        <div className="mb-16">
          {activeStep === 1 && (
            <Card className="bg-gradient-to-br from-green-600/10 to-emerald-700/10 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-green-400" />
                  Các Hoạt Động Xanh
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {greenActions.map((action) => (
                    <div key={action.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          {action.icon}
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">{action.title}</h5>
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">+{action.points} điểm</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-100 text-sm font-medium">{action.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeStep === 2 && (
            <Card className="bg-gradient-to-br from-blue-600/10 to-purple-700/10 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                  Cơ Chế Tích Điểm
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-4">Quy trình xác minh:</h5>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Chụp ảnh hoạt động</p>
                          <p className="text-gray-100 text-sm font-medium">Ghi lại hình ảnh thực hiện hoạt động xanh</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Xác minh bởi staff</p>
                          <p className="text-gray-100 text-sm font-medium">Nhân viên hoặc cộng đồng xác nhận hoạt động</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Cộng điểm tự động</p>
                          <p className="text-gray-100 text-sm font-medium">Hệ thống cập nhật điểm vào tài khoản</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-4">Thang điểm:</h5>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100 font-medium">Hoạt động cơ bản</span>
                          <span className="text-green-400 font-medium">5-15 điểm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100 font-medium">Hoạt động nâng cao</span>
                          <span className="text-blue-400 font-medium">20-30 điểm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100 font-medium">Dự án lớn</span>
                          <span className="text-purple-400 font-medium">50+ điểm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeStep === 3 && (
            <Card className="bg-gradient-to-br from-yellow-600/10 to-orange-700/10 backdrop-blur-sm border-yellow-500/20">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Gift className="w-6 h-6 text-yellow-400" />
                  Quy Đổi Voucher
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vouchers.map((voucher, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-400 mb-2">{voucher.discount}</div>
                        <div className="text-white font-medium mb-2">{voucher.service}</div>
                        <div className="text-gray-100 text-sm mb-4 font-medium">{voucher.points} điểm xanh</div>
                        <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0">
                          Đổi ngay
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lợi ích cho các bên */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <Star className="w-8 h-8 inline-block mr-3 text-yellow-400" />
            Lợi Ích Cho Mọi Bên
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white">{benefit.category}</h4>
                  </div>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cộng đồng xanh */}
        <Card className="bg-gradient-to-br from-green-600/10 to-blue-700/10 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Share2 className="w-8 h-8 text-green-400" />
                Cộng Đồng Xanh Tà Xùa
              </h3>
              <p className="text-xl text-gray-100 max-w-2xl mx-auto font-medium">
                Chia sẻ hành trình bảo vệ môi trường của bạn và kết nối với cộng đồng yêu thiên nhiên
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Chia sẻ hình ảnh</h4>
                <p className="text-gray-100 text-sm font-medium">Đăng ảnh hoạt động xanh với hashtag #TaXuaXanh</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Kết nối cộng đồng</h4>
                <p className="text-gray-100 text-sm font-medium">Tham gia nhóm và sự kiện bảo vệ môi trường</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Nhận danh hiệu</h4>
                <p className="text-gray-100 text-sm font-medium">Đạt các cấp độ: Người bạn xanh, Đại sứ môi trường</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Truyền cảm hứng</h4>
                <p className="text-gray-100 text-sm font-medium">Lan tỏa tinh thần bảo vệ môi trường</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg">
                Tham gia ngay
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TaXuaGreenModel;