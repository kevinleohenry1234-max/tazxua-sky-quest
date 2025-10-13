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
  Compass,
  Play,
  Wind,
  Cloud
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TaXuaGreenModel = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollMessage, setShowScrollMessage] = useState(false);
  const [scrollMessageText, setScrollMessageText] = useState('');
  const [celebrationBubbles, setCelebrationBubbles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Enhanced scroll animation effect with microinteractions
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          showScrollCompletionMessage("Tuyệt vời! Bạn đã khám phá thêm một phần của Tà Xùa.");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Enhanced scene progression with microinteractions
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      const newScene = Math.floor(scrollProgress * 3);
      if (newScene !== activeScene && newScene >= 0 && newScene < 3) {
        setActiveScene(newScene);
        
        // Show different messages for each scene
        const sceneMessages = [
          "Hành trình bắt đầu từ đây...",
          "Cảm nhận sự kết nối với thiên nhiên",
          "Để lại dấu ấn tích cực cho Tà Xùa"
        ];
        showScrollCompletionMessage(sceneMessages[newScene]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeScene]);

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

  // Show scroll completion message
  const showScrollCompletionMessage = (message: string) => {
    setScrollMessageText(message);
    setShowScrollMessage(true);
    setTimeout(() => setShowScrollMessage(false), 4000);
  };

  // Create celebration bubbles
  const createCelebrationBubbles = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    const newBubbles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
      y: rect.top + rect.height / 2,
      color: colors[i % colors.length]
    }));
    
    setCelebrationBubbles(prev => [...prev, ...newBubbles]);
    
    // Remove bubbles after animation
    setTimeout(() => {
      setCelebrationBubbles(prev => prev.filter(bubble => !newBubbles.some(nb => nb.id === bubble.id)));
    }, 2000);
  };

  // Handle enhanced button clicks with celebrations
  const handleEnhancedClick = (event: React.MouseEvent, message: string) => {
    createCelebrationBubbles(event);
    showScrollCompletionMessage(message);
  };

  // Storytelling scenes
  const storyScenes = [
    {
      id: 'departure',
      title: 'Khởi Hành',
      subtitle: 'Bước chân đầu tiên',
      description: 'Bạn đặt chân lên Tà Xùa với trái tim đầy háo hức. Chiếc ba lô không chỉ chứa đồ dùng cá nhân, mà còn mang theo ước mơ trở thành một phần của thiên nhiên này.',
      character: '🎒',
      background: 'from-blue-600/20 to-purple-600/20',
      border: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      id: 'action',
      title: 'Hành Động',
      subtitle: 'Mỗi bước chân có ý nghĩa',
      description: 'Từng hành động nhỏ - nhặt một mảnh rác, trồng một cây non, bảo vệ một sinh vật - đều góp phần viết nên câu chuyện xanh của Tà Xùa. Bạn không chỉ là khách du lịch, mà là người bảo vệ.',
      character: '🌱',
      background: 'from-green-600/20 to-emerald-600/20',
      border: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    {
      id: 'return',
      title: 'Nhận Lại',
      subtitle: 'Kho báu không chỉ là voucher',
      description: 'Bạn mang về không chỉ những tấm ảnh đẹp và voucher ưu đãi, mà còn cảm giác tự hào đã góp phần tạo nên một Tà Xùa xanh hơn. Trái tim bạn giờ đây gắn liền với núi rừng này.',
      character: '🏆',
      background: 'from-yellow-600/20 to-orange-600/20',
      border: 'border-yellow-500/30',
      textColor: 'text-yellow-400'
    }
  ];

  return (
    <section ref={sectionRef} id="skyquest-section" className="py-24 relative overflow-hidden">
      {/* Enhanced Background with Animated Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-blue-950/90 to-slate-950/95 backdrop-blur-sm"></div>
      
      {/* Floating Cloud Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud className="absolute top-20 left-10 w-16 h-16 text-white/10 animate-float-slow" />
        <Cloud className="absolute top-40 right-20 w-12 h-12 text-white/5 animate-float-slower" />
        <Cloud className="absolute bottom-32 left-1/4 w-20 h-20 text-white/8 animate-float-medium" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Scroll Completion Message */}
        {showScrollMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500/90 to-blue-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
            {scrollMessageText}
          </div>
        )}

        {/* Celebration Bubbles */}
        {celebrationBubbles.map(bubble => (
          <div
            key={bubble.id}
            className="fixed w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping z-50"
            style={{
              left: bubble.x,
              top: bubble.y,
              animationDuration: '2s'
            }}
          />
        ))}
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Mô hình Tà Xùa Xanh</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Sky Quest: Du lịch <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Xanh</span> - 
            Chill <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">An Lành</span>
          </h2>
        </div>

        {/* Journey Map Section - Redesigned */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Bản Đồ Hành Trình</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hành Trình Của <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Bạn</span>
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ba trạm dừng chân trên con đường khám phá và bảo vệ Tà Xùa
            </p>
          </div>

          {/* Journey Path */}
          <div className="relative max-w-5xl mx-auto">
            {/* Curved Path Line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M 100 200 Q 400 100 700 200"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeDasharray="10,5"
                fill="none"
                className="animate-pulse"
              />
            </svg>

            {/* Journey Stations */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              {/* Station 1: Khởi Hành */}
              <div className="relative group">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 pt-12 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-green-400/50">
                  <h4 className="text-2xl font-bold text-green-300 mb-4">
                    Khởi Hành
                  </h4>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Bắt đầu hành trình khám phá Tà Xùa với tinh thần bảo vệ môi trường. 
                    Tham gia các hoạt động xanh như thu gom rác, trồng cây, bảo vệ động vật hoang dã.
                  </p>
                  
                  {/* Activities Preview */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="text-green-400 text-sm font-semibold">🌱 Trồng cây</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="text-green-400 text-sm font-semibold">♻️ Thu gom rác</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station 2: Hành Động */}
              <div className="relative group">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 pt-12 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50">
                  <h4 className="text-2xl font-bold text-blue-300 mb-4">
                    Hành Động
                  </h4>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Thực hiện các thử thách môi trường, chụp ảnh xác minh hoạt động và nhận điểm xanh 
                    từ hệ thống tự động. Mỗi hành động đều được ghi nhận và đánh giá.
                  </p>
                  
                  {/* Action Steps */}
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-200 text-sm font-medium">Chụp ảnh hoạt động</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-slate-200 text-sm font-medium">Nhận điểm xanh</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station 3: Nhận Lại */}
              <div className="relative group">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                
                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 pt-12 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400/50">
                  <h4 className="text-2xl font-bold text-yellow-300 mb-4">
                    Nhận Lại
                  </h4>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Đổi điểm lấy voucher du lịch, ưu đãi dịch vụ và chia sẻ trải nghiệm 
                    để lan tỏa tinh thần xanh đến cộng đồng rộng lớn hơn.
                  </p>
                  
                  {/* Rewards Preview */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                      <div className="text-yellow-400 text-sm font-semibold">🎫 Voucher 20%</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                      <div className="text-yellow-400 text-sm font-semibold">🏆 Danh hiệu</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video/Animation Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Cùng Xem Hành Trình Thực Tế
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Khám phá những khoảnh khắc đẹp của du khách tham gia Sky Quest tại Tà Xùa
            </p>
            
            {/* Video Placeholder */}
            <div className="relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-12 border border-blue-500/30 group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Sky Quest: Hành Trình Xanh</h4>
                <p className="text-slate-300">30 giây • Trải nghiệm thực tế</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Sẵn sàng bắt đầu hành trình của bạn?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Mỗi hành động của bạn là một mảnh ghép của Tà Xùa xanh
            </p>
            
            <Button 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              onClick={(e) => handleEnhancedClick(e, "Hành trình Sky Quest của bạn sắp bắt đầu!")}
            >
              Hãy bắt đầu hành trình của bạn
              <div className="ml-2 group-hover:animate-pulse">
                <Wind className="w-5 h-5" />
              </div>
            </Button>
          </div>
        </div>

        {/* Sky Quest Guide Cards - Redesigned */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Compass className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Hướng Dẫn Phiêu Lưu</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hướng Dẫn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sky Quest</span>
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ba bước đơn giản để trở thành người bảo vệ Tà Xùa
            </p>
          </div>

          {/* Three Clear Cards Side by Side */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Bắt đầu hành trình */}
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-green-400/50">
              {/* Large Icon */}
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              
              {/* Step Title */}
              <h4 className="text-2xl font-bold text-green-300 mb-6">
                Bắt đầu hành trình
              </h4>
              
              {/* Full Description */}
              <div className="text-left space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Tham gia các hoạt động xanh như thu gom rác, trồng cây, bảo vệ động vật hoang dã tại Tà Xùa.
                </p>
                
                <div className="space-y-3">
                  <h5 className="text-green-400 font-semibold text-sm uppercase tracking-wide">Hoạt động có sẵn:</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-400">🌱</span>
                        <span className="text-slate-200 text-sm font-medium">Trồng cây</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">+50 điểm</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-400">♻️</span>
                        <span className="text-slate-200 text-sm font-medium">Thu gom rác</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">+30 điểm</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-400">🦋</span>
                        <span className="text-slate-200 text-sm font-medium">Bảo vệ động vật</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">+40 điểm</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-400">🌿</span>
                        <span className="text-slate-200 text-sm font-medium">Làm sạch suối</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">+60 điểm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Tham gia thử thách */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50">
              {/* Large Icon */}
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              {/* Step Title */}
              <h4 className="text-2xl font-bold text-blue-300 mb-6">
                Tham gia thử thách
              </h4>
              
              {/* Full Description */}
              <div className="text-left space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Chụp ảnh, xác minh hoạt động và nhận điểm xanh từ hệ thống tự động. Mỗi hành động đều được ghi nhận và đánh giá.
                </p>
                
                <div className="space-y-3">
                  <h5 className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Quy trình xác minh:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-200 text-sm font-medium">Chụp ảnh hoạt động</div>
                        <div className="text-slate-400 text-xs">Ghi lại khoảnh khắc thực hiện</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-200 text-sm font-medium">Xác minh bởi staff</div>
                        <div className="text-slate-400 text-xs">Kiểm tra và phê duyệt</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Coins className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-200 text-sm font-medium">Nhận điểm xanh</div>
                        <div className="text-slate-400 text-xs">Tự động cộng vào tài khoản</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Nhận thưởng */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400/50">
              {/* Large Icon */}
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Gift className="w-12 h-12 text-white" />
              </div>
              
              {/* Step Title */}
              <h4 className="text-2xl font-bold text-yellow-300 mb-6">
                Nhận thưởng
              </h4>
              
              {/* Full Description */}
              <div className="text-left space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Đổi điểm lấy voucher du lịch, ưu đãi dịch vụ và chia sẻ trải nghiệm để lan tỏa tinh thần xanh đến cộng đồng.
                </p>
                
                <div className="space-y-3">
                  <h5 className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">Phần thưởng hấp dẫn:</h5>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">🎫</span>
                          <span className="text-slate-200 text-sm font-medium">Voucher giảm giá</span>
                        </div>
                        <span className="text-yellow-400 text-xs font-bold">20-50%</span>
                      </div>
                      <div className="text-slate-400 text-xs">Áp dụng cho tour, khách sạn</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">🏆</span>
                          <span className="text-slate-200 text-sm font-medium">Danh hiệu xanh</span>
                        </div>
                        <span className="text-yellow-400 text-xs font-bold">VIP</span>
                      </div>
                      <div className="text-slate-400 text-xs">Eco Warrior, Green Guardian</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">🎁</span>
                          <span className="text-slate-200 text-sm font-medium">Quà tặng đặc biệt</span>
                        </div>
                        <span className="text-yellow-400 text-xs font-bold">FREE</span>
                      </div>
                      <div className="text-slate-400 text-xs">Sản phẩm thủ công địa phương</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Stories Section - Enhanced */}
        <div className="mb-20 bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Cộng Đồng Xanh</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Câu Chuyện <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Cộng Đồng</span>
              </h3>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Những trải nghiệm thật từ cộng đồng du khách yêu thiên nhiên
              </p>
            </div>

            {/* Community Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                <div className="text-3xl font-bold text-green-400 mb-2">2,847</div>
                <div className="text-slate-300 text-sm">Thành viên tham gia</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                <div className="text-3xl font-bold text-blue-400 mb-2">15,632</div>
                <div className="text-slate-300 text-sm">Hoạt động xanh</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                <div className="text-3xl font-bold text-yellow-400 mb-2">89,420</div>
                <div className="text-slate-300 text-sm">Điểm xanh tích lũy</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">1,234</div>
                <div className="text-slate-300 text-sm">Voucher đã đổi</div>
              </div>
            </div>

            {/* Testimonial Cards with Light Borders */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Minh Anh</div>
                    <div className="text-green-400 text-sm font-medium">Sky ID: #GreenWarrior2024</div>
                  </div>
                </div>
                <p className="text-slate-200 leading-relaxed mb-4">
                  "Tham gia Sky Quest đã thay đổi cách tôi nhìn nhận du lịch. Mỗi chuyến đi không chỉ là trải nghiệm mà còn là cơ hội để bảo vệ thiên nhiên."
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">Eco Warrior</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Thùy Linh</div>
                    <div className="text-blue-400 text-sm font-medium">Sky ID: #NatureLover2024</div>
                  </div>
                </div>
                <p className="text-slate-200 leading-relaxed mb-4">
                  "Hệ thống điểm xanh rất thú vị! Tôi đã đổi được voucher giảm 30% cho chuyến du lịch tiếp theo chỉ sau 2 tuần tham gia."
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">Green Guardian</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-slate-400/30 rounded-3xl p-8 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    H
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Hoàng Nam</div>
                    <div className="text-yellow-400 text-sm font-medium">Sky ID: #EcoExplorer2024</div>
                  </div>
                </div>
                <p className="text-slate-200 leading-relaxed mb-4">
                  "Cảm giác tuyệt vời khi biết rằng mỗi hành động nhỏ của mình đều góp phần bảo vệ Tà Xùa. Đây là trải nghiệm du lịch ý nghĩa nhất!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">Eco Explorer</span>
                </div>
              </div>
            </div>

            {/* Community Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Tham Gia Cộng Đồng Ngay Hôm Nay
                </h4>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Kết nối với hàng nghìn du khách cùng chung tâm huyết bảo vệ môi trường
                </p>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Gia nhập cộng đồng
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaXuaGreenModel;