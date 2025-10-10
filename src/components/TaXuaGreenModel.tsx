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
  const [celebrationBubbles, setCelebrationBubbles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const newBubbles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
      y: rect.top + rect.height / 2
    }));
    
    setCelebrationBubbles(prev => [...prev, ...newBubbles]);
    
    // Remove bubbles after animation
    setTimeout(() => {
      setCelebrationBubbles(prev => prev.filter(bubble => !newBubbles.find(nb => nb.id === bubble.id)));
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

        {/* Scroll Storytelling Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hành Trình Của <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Bạn</span>
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Theo chân một du khách trẻ khám phá Tà Xùa và trở thành người bảo vệ thiên nhiên
            </p>
          </div>

          {/* Character-Driven Story Scenes */}
          <div className="space-y-16">
            {storyScenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`transition-all duration-1000 transform ${
                  activeScene >= index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-30 translate-y-8'
                }`}
              >
                <div className={`bg-gradient-to-r ${scene.background} backdrop-blur-sm rounded-3xl p-8 md:p-12 border ${scene.border} relative overflow-hidden`}>
                  {/* Scene Number */}
                  <div className="absolute top-6 right-6">
                    <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${scene.textColor} font-bold text-lg`}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Character Illustration */}
                    <div className="text-center">
                      <div className="text-8xl mb-4 animate-gentle-sway">
                        {scene.character}
                      </div>
                      <div className={`text-2xl font-bold ${scene.textColor} mb-2`}>
                        {scene.title}
                      </div>
                      <div className="text-slate-300 text-lg font-medium">
                        {scene.subtitle}
                      </div>
                    </div>

                    {/* Story Content */}
                    <div>
                      <p className="text-lg text-slate-200 leading-relaxed font-medium">
                        {scene.description}
                      </p>
                      
                      {/* Scene-specific Actions */}
                      {index === 1 && (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          {greenActions.slice(0, 4).map((action) => (
                            <div key={action.id} className="bg-white/10 rounded-lg p-3 text-center">
                              <div className="text-green-400 mb-2">{action.icon}</div>
                              <div className="text-sm text-slate-300 font-medium">{action.title}</div>
                              <div className="text-xs text-green-400">+{action.points} điểm</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

        {/* Enhanced Adventure Guide Section - Horizontal Timeline */}
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

          {/* Horizontal Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 transform -translate-y-1/2 rounded-full"></div>
            
            {/* Timeline Steps */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1: Bắt đầu hành trình */}
              <div className="group">
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-green-400/50 relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-10 h-10 text-white group-hover:animate-bounce" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-green-300 transition-colors duration-300">
                    Bắt đầu hành trình
                  </h4>
                  <p className="text-slate-300 mb-6 font-medium leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Tham gia các hoạt động xanh như thu gom rác, trồng cây, bảo vệ động vật hoang dã tại Tà Xùa.
                  </p>
                  
                  {/* Hover Illustration */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {greenActions.slice(0, 4).map((action) => (
                        <div key={action.id} className="bg-white/10 rounded-lg p-3 border border-green-300/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center text-white">
                              {action.icon}
                            </div>
                            <span className="text-slate-200 text-sm font-semibold">{action.title}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Coins className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400 text-xs font-medium">+{action.points} điểm</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Tham gia thử thách */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50 relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    2
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white group-hover:animate-pulse" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    Tham gia thử thách
                  </h4>
                  <p className="text-slate-300 mb-6 font-medium leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Chụp ảnh, xác minh hoạt động và nhận điểm xanh từ hệ thống tự động.
                  </p>
                  
                  {/* Hover Illustration */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">Chụp ảnh hoạt động</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">Xác minh bởi staff</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-blue-300/20">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Coins className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">Cộng điểm tự động</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Nhận thưởng và chia sẻ */}
              <div className="group">
                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400/50 relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    3
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Gift className="w-10 h-10 text-white group-hover:animate-bounce" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                    Nhận thưởng và chia sẻ
                  </h4>
                  <p className="text-slate-300 mb-6 font-medium leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    Đổi điểm lấy voucher và chia sẻ trải nghiệm để lan tỏa tinh thần xanh.
                  </p>
                  
                  {/* Hover Illustration */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {vouchers.map((voucher, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-3 border border-yellow-300/20">
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-400 mb-1">{voucher.discount}</div>
                            <div className="text-slate-200 text-xs font-medium mb-1">{voucher.service}</div>
                            <div className="text-slate-300 text-xs">{voucher.points} điểm</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Storytelling Tagline */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 max-w-2xl mx-auto">
              <p className="text-xl text-slate-200 font-medium italic">
                "Mỗi hành động của bạn là một mảnh ghép của Tà Xùa xanh."
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="text-slate-400 text-sm">Cùng nhau xây dựng tương lai bền vững</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Community Stories Section */}
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
                
                {/* Enhanced Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-green-400 mb-2">127</div>
                    <div className="text-sm text-gray-300">Người tham gia tuần này</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2.3k</div>
                    <div className="text-sm text-gray-300">Ảnh #TaXuaXanh</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                    <div className="text-sm text-gray-300">Cây xanh đã trồng</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2.1</div>
                    <div className="text-sm text-gray-300">Tấn rác đã thu gom</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Testimonials with Sky IDs and Authentic Feel */}
              <div className="mb-12">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Authentic Avatar with Local Style */}
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/80 to-blue-500/80 animate-pulse"></div>
                        <span className="relative z-10">MA</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Minh Anh</div>
                        <div className="text-gray-400 text-sm">Hà Nội • Sky ID: #Sky12847</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                      "Chuyến đi Tà Xùa không chỉ cho tôi những bức ảnh đẹp mà còn cảm giác tự hào khi góp phần bảo vệ môi trường. Sky Quest thật sự ý nghĩa!"
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded-full">#TaXuaXanh</div>
                      <div className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">#DuLichXanh</div>
                    </div>
                    {/* Mini Video Testimonial Placeholder */}
                    <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-lg p-3 border border-blue-500/30 cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-white" />
                        <span className="text-xs text-slate-300">Video chia sẻ • 12s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/80 to-pink-500/80 animate-pulse"></div>
                        <span className="relative z-10">TN</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Thảo Nguyên</div>
                        <div className="text-gray-400 text-sm">TP.HCM • Sky ID: #Sky09156</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                      "Tham gia Sky Quest giúp tôi kết nối với những người cùng chí hướng. Cùng nhau trồng cây, dọn rác và tạo ra những kỷ niệm đẹp!"
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-purple-400 text-xs bg-purple-500/20 px-2 py-1 rounded-full">#CộngĐồngXanh</div>
                      <div className="text-pink-400 text-xs bg-pink-500/20 px-2 py-1 rounded-full">#TàXùa</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-3 border border-purple-500/30 cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-white" />
                        <span className="text-xs text-slate-300">Video chia sẻ • 15s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/80 to-orange-500/80 animate-pulse"></div>
                        <span className="relative z-10">DM</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Đức Minh</div>
                        <div className="text-gray-400 text-sm">Đà Nẵng • Sky ID: #Sky03472</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                      "Từ khi tham gia Sky Quest, tôi hiểu rằng du lịch có thể vừa vui vừa có ý nghĩa. Mỗi chuyến đi đều để lại dấu ấn tích cực!"
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full">#SkyQuest</div>
                      <div className="text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded-full">#BảoVệMôiTrường</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-3 border border-yellow-500/30 cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-white" />
                        <span className="text-xs text-slate-300">Video chia sẻ • 10s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Activities */}
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
              
              {/* Enhanced CTAs */}
              <div className="text-center space-y-4">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mr-4"
                  onClick={(e) => handleEnhancedClick(e, "Chào mừng bạn đến với cộng đồng Sky Quest!")}
                >
                  Tham gia cộng đồng
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                {/* Story Sharing CTA */}
                <Button 
                  variant="outline" 
                  className="border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => handleEnhancedClick(e, "Cảm ơn bạn đã muốn chia sẻ câu chuyện!")}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Chia sẻ hành trình của bạn
                </Button>
                
                <p className="text-sm text-slate-400 mt-4">
                  Gửi ảnh và câu chuyện của bạn để truyền cảm hứng cho cộng đồng
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TaXuaGreenModel;