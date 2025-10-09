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
  Globe,
  MapPin,
  Compass
} from 'lucide-react';
import { useState } from 'react';

const TaXuaGreenModel = () => {
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

  return (
    <section id="skyquest-section" className="py-16 relative">
      {/* Background với gradient đồng bộ */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-blue-950/90 to-slate-950/95 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Mô hình Tà Xùa Xanh</span>
          </div>
          
          <h2 className="text-heading-1 text-white mb-8">
            Sky Quest: Du lịch <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Xanh</span> - 
            Chill <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">An Lành</span>
          </h2>
          
          {/* Storytelling Introduction */}
          <div className="max-w-4xl mx-auto space-y-8 mb-12">
            {/* Sky Quest là gì? */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
              <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center justify-center gap-2">
                <Target className="w-6 h-6" />
                Sky Quest là gì?
              </h3>
              <p className="text-lg text-gray-100 leading-relaxed font-medium">
                Sky Quest không chỉ là một thử thách, mà là một hành trình biến mỗi du khách thành người đồng sáng tạo nên vẻ đẹp của Tà Xùa. 
                Bạn không chỉ đến để chiêm ngưỡng, mà để kết nối – với thiên nhiên, với cộng đồng, và với chính mình. 
                Mỗi bước chân của bạn sẽ để lại dấu ấn tích cực, góp phần xây dựng một Tà Xùa xanh và bền vững.
              </p>
            </div>

            {/* Mục đích của Sky Quest */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center justify-center gap-2">
                <Heart className="w-6 h-6" />
                Mục đích của Sky Quest
              </h3>
              <p className="text-lg text-gray-100 leading-relaxed font-medium">
                Sky Quest ra đời nhằm khơi dậy ý thức du lịch bền vững, biến từng hành động nhỏ thành đóng góp lớn. 
                Thông qua các thử thách đơn giản, bạn góp phần giữ gìn cảnh quan, lan tỏa tinh thần "du lịch xanh" 
                và cùng xây dựng một cộng đồng gắn kết quanh giá trị tốt đẹp này.
              </p>
            </div>

            {/* Tại sao bạn nên tham gia Sky Quest? */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" />
                Tại sao bạn nên tham gia Sky Quest?
              </h3>
              <p className="text-lg text-gray-100 leading-relaxed font-medium">
                Mỗi bước chân của bạn, mỗi thử thách hoàn thành không chỉ đem lại điểm thưởng và quà tặng, mà còn tạo nên ký ức đáng nhớ. 
                Hãy bước vào một cuộc phiêu lưu đầy ý nghĩa – nơi phần thưởng không chỉ nằm ở voucher, 
                mà ở cảm giác được trở thành một phần của điều tốt đẹp hơn, để lại di sản xanh cho thế hệ tương lai.
              </p>
            </div>
          </div>

          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Khuyến khích du khách tham gia bảo vệ môi trường tại Tà Xùa và nhận thưởng bằng voucher du lịch. 
            Cùng nhau xây dựng một Tà Xùa xanh, sạch và bền vững cho thế hệ tương lai.
          </p>
        </div>

        {/* Ba bước chính - Hiển thị đồng thời */}
        <div className="mb-16">
          <h3 className="text-heading-2 text-white text-center mb-12">
            <Compass className="w-8 h-8 inline-block mr-3 text-green-400" />
            Hướng Dẫn Phiêu Lưu Sky Quest
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bước 1: Bắt đầu hành trình */}
            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-400/50 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-10 h-10 text-white group-hover:animate-bounce" />
                </div>
                <h4 className="text-heading-3 text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">Bắt đầu hành trình</h4>
                <p className="text-body text-gray-700 mb-6 font-medium leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Tham gia các hoạt động xanh như thu gom rác, trồng cây, bảo vệ động vật hoang dã tại Tà Xùa.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {greenActions.slice(0, 4).map((action) => (
                    <div key={action.id} className="bg-white/80 rounded-lg p-3 border border-green-200 hover:bg-green-50 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                          {action.icon}
                        </div>
                        <span className="text-gray-800 text-sm font-semibold">{action.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        <span className="text-yellow-600 text-xs font-medium">+{action.points} điểm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bước 2: Tham gia thử thách */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-white group-hover:animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Tham gia thử thách</h4>
                <p className="text-gray-700 mb-6 font-medium text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Chụp ảnh, xác minh hoạt động và nhận điểm xanh từ hệ thống tự động.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/80 rounded-lg p-3 border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">Chụp ảnh hoạt động</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 rounded-lg p-3 border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">Xác minh bởi staff</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 rounded-lg p-3 border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span className="text-gray-800 text-sm font-medium">Cộng điểm tự động</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bước 3: Nhận thưởng và chia sẻ */}
            <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border-yellow-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-400/50 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-10 h-10 text-white group-hover:animate-bounce" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">Nhận thưởng và chia sẻ</h4>
                <p className="text-gray-700 mb-6 font-medium text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Đổi điểm lấy voucher và chia sẻ trải nghiệm để lan tỏa tinh thần xanh.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {vouchers.map((voucher, index) => (
                    <div key={index} className="bg-white/80 rounded-lg p-3 border border-yellow-200 hover:bg-yellow-50 transition-colors duration-200">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600 mb-1">{voucher.discount}</div>
                        <div className="text-gray-800 text-xs font-medium mb-1">{voucher.service}</div>
                        <div className="text-gray-600 text-xs">{voucher.points} điểm</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cộng đồng Sky Quest - Thay thế phần "Lợi Ích Cho Mọi Bên" */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Cộng Đồng Sky Quest</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Câu Chuyện Của <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Cộng Đồng</span>
                </h3>
                
                {/* Thống kê động */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">127</div>
                    <div className="text-sm text-gray-300">Người tham gia tuần này</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.3k</div>
                    <div className="text-sm text-gray-300">Ảnh #TaXuaXanh</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                    <div className="text-sm text-gray-300">Cây xanh đã trồng</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2.1</div>
                    <div className="text-sm text-gray-300">Tấn rác đã thu gom</div>
                  </div>
                </div>
              </div>

              {/* Testimonials với ảnh thật */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <div className="text-white font-semibold">Minh Anh</div>
                      <div className="text-gray-400 text-sm">Hà Nội</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic mb-3">
                    "Chuyến đi Tà Xùa không chỉ cho tôi những bức ảnh đẹp mà còn cảm giác tự hào khi góp phần bảo vệ môi trường. Sky Quest thật sự ý nghĩa!"
                  </p>
                  <div className="text-blue-400 text-xs">#TaXuaXanh #DuLichXanh</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      T
                    </div>
                    <div>
                      <div className="text-white font-semibold">Thảo Nguyên</div>
                      <div className="text-gray-400 text-sm">TP.HCM</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic mb-3">
                    "Tham gia Sky Quest giúp tôi kết nối với những người cùng chí hướng. Cùng nhau trồng cây, dọn rác và tạo ra những kỷ niệm đẹp!"
                  </p>
                  <div className="text-blue-400 text-xs">#CộngĐồngXanh #TàXùa</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      D
                    </div>
                    <div>
                      <div className="text-white font-semibold">Đức Minh</div>
                      <div className="text-gray-400 text-sm">Đà Nẵng</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic mb-3">
                    "Từ khi tham gia Sky Quest, tôi hiểu rằng du lịch có thể vừa vui vừa có ý nghĩa. Mỗi chuyến đi đều để lại dấu ấn tích cực!"
                  </p>
                  <div className="text-blue-400 text-xs">#SkyQuest #BảoVệMôiTrường</div>
                </div>
              </div>

              {/* Hoạt động cộng đồng */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/25">
                    <Share2 className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Chia sẻ trải nghiệm</h4>
                  <p className="text-gray-300 text-sm font-medium">Đăng ảnh với #TaXuaXanh</p>
                </div>
                
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                    <Users className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Kết nối cộng đồng</h4>
                  <p className="text-gray-300 text-sm font-medium">Tham gia sự kiện xanh</p>
                </div>
                
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/25">
                    <Award className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Nhận danh hiệu</h4>
                  <p className="text-gray-300 text-sm font-medium">Đại sứ môi trường</p>
                </div>
                
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                    <Heart className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Truyền cảm hứng</h4>
                  <p className="text-gray-300 text-sm font-medium">Lan tỏa tinh thần xanh</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Tham gia cộng đồng
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TaXuaGreenModel;