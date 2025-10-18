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
      setCelebrationBubbles(prev => 
        prev.filter(bubble => !newBubbles.some(nb => nb.id === bubble.id))
      );
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-950/95 backdrop-blur-sm"></div>
      
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
      </div>
    </section>
  );
};

export default TaXuaGreenModel;