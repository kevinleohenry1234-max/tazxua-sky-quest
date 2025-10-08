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
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
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
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <Compass className="w-8 h-8 inline-block mr-3 text-green-400" />
            Hướng Dẫn Phiêu Lưu Sky Quest
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bước 1: Bắt đầu hành trình */}
            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border-green-500/30 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Bắt đầu hành trình</h4>
                <p className="text-gray-100 mb-6 font-medium text-lg leading-relaxed">
                  Tham gia các hoạt động xanh như thu gom rác, trồng cây, bảo vệ động vật hoang dã tại Tà Xùa.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {greenActions.slice(0, 4).map((action) => (
                    <div key={action.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                          {action.icon}
                        </div>
                        <span className="text-white text-sm font-semibold">{action.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-medium">+{action.points} điểm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bước 2: Tham gia thử thách */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border-blue-500/30 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Tham gia thử thách</h4>
                <p className="text-gray-100 mb-6 font-medium text-lg leading-relaxed">
                  Chụp ảnh, xác minh hoạt động và nhận điểm xanh từ hệ thống tự động.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span className="text-white text-sm font-medium">Chụp ảnh hoạt động</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span className="text-white text-sm font-medium">Xác minh bởi staff</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span className="text-white text-sm font-medium">Cộng điểm tự động</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bước 3: Nhận thưởng và chia sẻ */}
            <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border-yellow-500/30 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Nhận thưởng và chia sẻ</h4>
                <p className="text-gray-100 mb-6 font-medium text-lg leading-relaxed">
                  Đổi điểm lấy voucher và chia sẻ trải nghiệm để lan tỏa tinh thần xanh.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {vouchers.map((voucher, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-lg p-3 border border-yellow-500/30">
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400 mb-1">{voucher.discount}</div>
                        <div className="text-white text-xs font-medium mb-1">{voucher.service}</div>
                        <div className="text-gray-100 text-xs">{voucher.points} điểm</div>
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
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Cộng Đồng Sky Quest</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Câu Chuyện Của Chúng Ta Tại <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Tà Xùa</span>
              </h3>
              
              <div className="text-lg text-gray-100 leading-relaxed font-medium space-y-6">
                <p>
                  Sky Quest không chỉ là một chương trình - đó là một cộng đồng đang lớn lên từng ngày, nơi mỗi người góp một phần nhỏ để tạo nên sự thay đổi lớn cho Tà Xùa. 
                  Từ những bước chân đầu tiên, chúng ta đã cùng nhau viết nên câu chuyện về tình yêu thiên nhiên và trách nhiệm với môi trường.
                </p>
                
                <p>
                  Hàng trăm du khách đã cùng nhau thu gom hơn <span className="text-green-400 font-bold">2 tấn rác thải</span>, 
                  trồng <span className="text-blue-400 font-bold">500+ cây xanh</span> bản địa, và chia sẻ hàng nghìn hình ảnh 
                  tuyệt đẹp trên mạng xã hội với hashtag <span className="text-purple-400 font-bold">#TaXuaXanh</span>. 
                  Mỗi hành động nhỏ đều để lại dấu ấn cá nhân trong bức tranh lớn về du lịch xanh của địa phương.
                </p>
                
                <p>
                  Hãy trở thành một phần của câu chuyện này - nơi những ký ức đẹp được tạo ra không chỉ từ cảnh quan hùng vĩ, 
                  mà còn từ niềm tự hào khi biết rằng chuyến đi của bạn đã góp phần làm cho Tà Xùa trở nên xanh hơn, 
                  sạch hơn và bền vững hơn cho những thế hệ tương lai.
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Chia sẻ trải nghiệm</h4>
                  <p className="text-gray-300 text-sm font-medium">Đăng ảnh hoạt động xanh với hashtag #TaXuaXanh</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Kết nối cộng đồng</h4>
                  <p className="text-gray-300 text-sm font-medium">Tham gia nhóm và sự kiện bảo vệ môi trường</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Nhận danh hiệu</h4>
                  <p className="text-gray-300 text-sm font-medium">Đạt các cấp độ: Người bạn xanh, Đại sứ môi trường</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Truyền cảm hứng</h4>
                  <p className="text-gray-300 text-sm font-medium">Lan tỏa tinh thần bảo vệ môi trường</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Tham gia ngay
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