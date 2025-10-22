import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Mountain, 
  Leaf, 
  Heart, 
  Trophy, 
  Gift, 
  Users, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Target, 
  ChevronRight, 
  Cloud, 
  Zap,
  Star,
  Award,
  Camera,
  MapPin,
  Smile,
  TreePine,
  Compass,
  Quote
} from 'lucide-react';
import { questModes } from '@/data/skyquest-challenges';
import LazyImage from '@/components/LazyImage';
import Header from '@/components/Header';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [activeSection, setActiveSection] = useState<'hero'|'mode-selection'|'journey-structure'|'common-system'>('hero');

  // Load saved mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('skyquest_preferred_mode');
    if (savedMode) {
      setSelectedMode(savedMode);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    localStorage.setItem('skyquest_preferred_mode', modeId);
    setShowPreview(true);
    
    // Navigate after animation
    setTimeout(() => {
      navigate(`/sky-quest/${modeId}`);
    }, 1500);
  };

  const testimonials = [
    {
      text: "Tôi chưa bao giờ nghĩ việc đi du lịch có thể khiến mình thấy gần thiên nhiên đến vậy",
      author: "Minh Anh",
      mode: "Mây Mây Sương Sương"
    },
    {
      text: "Mỗi thử thách đều giúp tôi đóng góp thật sự cho môi trường Tà Xùa",
      author: "Tuấn Khang", 
      mode: "Hăng Say Săn Thưởng"
    },
    {
      text: "Sky Quest đã biến chuyến đi thành một hành trình ý nghĩa và đáng nhớ",
      author: "Linh Chi",
      mode: "Mây Mây Sương Sương"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Observe sections to highlight active nav
  useEffect(() => {
    const ids = ['hero','mode-selection','journey-structure','common-system'];
    const observers: IntersectionObserver[] = [];
    const handle = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (entry.target as HTMLElement).id) {
          const id = (entry.target as HTMLElement).id as 'hero'|'mode-selection'|'journey-structure'|'common-system';
          setActiveSection(id);
        }
      });
    };
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver((entries) => handle(entries), { root: null, threshold: 0.4 });
        obs.observe(el);
        observers.push(obs);
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = [
    { id: 'hero', label: 'Giới thiệu' },
    { id: 'mode-selection', label: 'Phong cách' },
    { id: 'journey-structure', label: 'Hành trình' },
    { id: 'common-system', label: 'Hệ thống' },
  ];

  const journeySteps = [
    { icon: <Camera className="w-4 h-4" />, label: "Bước 1" },
    { icon: <MapPin className="w-4 h-4" />, label: "Bước 2" },
    { icon: <Smile className="w-4 h-4" />, label: "Bước 3" },
    { icon: <TreePine className="w-4 h-4" />, label: "Bước 4" },
    { icon: <Trophy className="w-4 h-4" />, label: "Bước 5" }
  ];

  return (
    <Layout>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
        
        {/* 3D Background with Natural Gradient */}
        <div className="absolute inset-0">
          {/* Base 3D gradient mimicking Tà Xùa landscape */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-white/60 to-green-100/40" />
          
          {/* Overlay with blue-ivory tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/20 to-transparent" />
          
          {/* Light transition effect from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
        </div>
        
        {/* Hero Section - Realistic Tà Xùa Parallax */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Real Tà Xùa landscape background with parallax */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img 
              src="/hero-taxua-clouds.jpg" 
              alt="Tà Xùa - biển mây, sương len qua dãy núi xanh buổi sớm" 
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${parallaxY * 0.2}px)`, transition: 'transform 0.1s linear' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeInUp">
            {/* Sky Quest Logo image */}
            <img 
              src="/Logo/Official Logo.png" 
              alt="Sky Quest Logo" 
              className="mx-auto w-24 h-24 object-contain drop-shadow-2xl mb-8"
            />
            {/* Title */}
            <h1 className="font-['Inter'] text-6xl md:text-7xl font-bold text-slate-50 drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] mb-4 tracking-tight leading-tight">
              Sky Quest
            </h1>
            {/* Tagline */}
            <p className="font-['Inter'] text-xl md:text-2xl text-slate-100/90 font-normal leading-relaxed tracking-wide">
              Hành trình du lịch xanh tại Tà Xùa
            </p>

            {/* Progress Indicator with light reflection on hover */}
            <div className="mt-10 mb-14">
              <div className="max-w-md mx-auto group">
                <div className="w-full h-3 rounded-full bg-white/50 backdrop-blur-sm shadow-inner border border-white/30 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-3 left-0 w-24 h-10 bg-white/40 blur-md rotate-6 animate-pulse-gentle" />
                  </div>
                  <div className="bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#2563EB] h-3 w-0 group-hover:w-[35%] rounded-full transition-all duration-700" />
                </div>
                <p className="font-['Inter'] text-xs text-slate-100/90 mt-3">0% hoàn thành</p>
              </div>
            </div>

            {/* CTA button */}
            <div className="animate-fadeInUp">
              <Button
                onClick={() => document.getElementById('mode-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 font-['Inter'] font-semibold px-10 py-5 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                Bắt đầu hành trình
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Sub Navigation - Sticky */}
        <nav className="sticky top-[80px] z-40 bg-white/90 backdrop-blur-md border-b border-white/40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-8 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`font-['Inter'] font-medium text-sm md:text-base relative group transition-colors duration-300 ${activeSection === item.id ? 'text-sky-700' : 'text-slate-700 hover:text-sky-600'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-sky-500 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>
        </nav>

        {/* Description Block - Restored with ViViet Styling */}
        <section className="py-16 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-blue-50/60 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/40 animate-slideInUp">
              <h2 className="font-['Inter'] text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center tracking-tight">
                Chọn Phong Cách Trải Nghiệm Của Bạn
              </h2>
              <p className="font-['Inter'] text-lg text-slate-600 text-center leading-relaxed max-w-3xl mx-auto">
                Cả hai mode đều chia sẻ hệ thống điểm thưởng và tiến trình, nhưng mang đến cảm xúc và trải nghiệm khác nhau phù hợp với tâm trạng của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Mode Selection - Enhanced with ViViet Colors */}
        <section id="mode-selection" className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            {/* Mode Cards - Refined Design */}
            <div className="grid md:grid-cols-2 gap-10 mb-20">
              
              {/* Mây Mây Sương Sương Mode - Enhanced */}
              <div 
                className={`group relative overflow-hidden rounded-3xl transition-all duration-700 cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] ${
                  selectedMode === 'calm' ? 'ring-4 ring-blue-300/50 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
                }`}
                onClick={() => handleModeSelect('calm')}
              >
                {/* Background Photo - Misty Calm */}
                <div className="absolute inset-0">
                  <img src="/images/website background/Tà Xùa 10.png" alt="Sương núi Tà Xùa buổi sớm" className="w-full h-full object-cover" />
                </div>
                {/* Blue-lilac tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-800/20 to-purple-900/20 mix-blend-multiply" />
                {/* Subtle glow border on hover */}
                <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-indigo-300/60 transition-colors duration-500" />
                {/* Soft morning light */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.16),transparent_60%)] opacity-60" />
                </div>
                
                <div className="relative z-10 p-10">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <Cloud className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-6 text-center tracking-tight">
                    Mây Mây Sương Sương
                  </h3>

                  {/* Description */}
                  <p className="font-['Inter'] text-slate-600 text-center mb-8 leading-relaxed text-lg">
                    Hành trình cảm xúc – nơi du khách kết nối lại với thiên nhiên bằng sự tĩnh lặng và thả mình trong làn sương.
                  </p>

                  {/* Features (text-only, no flat icons) */}
                  <div className="space-y-3 mb-8 text-slate-600">
                    <p className="font-['Inter'] text-sm">Không yêu cầu xác thực phức tạp</p>
                    <p className="font-['Inter'] text-sm">Tông màu nhẹ nhàng, thư giãn</p>
                    <p className="font-['Inter'] text-sm">Chuyển động sương nhẹ, âm thanh thiên nhiên</p>
                  </div>

                  {/* Enhanced Button */}
                  <Button 
                    className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 font-['Inter'] font-semibold py-4 rounded-2xl text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Bắt đầu hành trình bình yên
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Hăng Say Săn Thưởng Mode - Enhanced */}
              <div 
                className={`group relative overflow-hidden rounded-3xl transition-all duration-700 cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] ${
                  selectedMode === 'energetic' ? 'ring-4 ring-green-300/50 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
                }`}
                onClick={() => handleModeSelect('energetic')}
              >
                {/* Background Photo - Energetic Trekking */}
                <div className="absolute inset-0">
                  <img src="/images/website background/Tà Xùa 6.png" alt="Trekking rừng Tà Xùa, nắng xuyên qua tán lá" className="w-full h-full object-cover" />
                </div>
                {/* Green–orange tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-800/20 to-orange-900/20 mix-blend-multiply" />
                {/* Reflective glow border on hover */}
                <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-yellow-300/60 transition-colors duration-500" />
                {/* Sunlight reflection */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)] opacity-60" />
                </div>
                
                <div className="relative z-10 p-10">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <Zap className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-6 text-center tracking-tight">
                    Hăng Say Săn Thưởng
                  </h3>

                  {/* Description */}
                  <p className="font-['Inter'] text-slate-600 text-center mb-8 leading-relaxed text-lg">
                    Hành trình chinh phục – nơi người tham gia vừa khám phá vừa hành động vì môi trường, ghi dấu những đóng góp thật.
                  </p>

                  {/* Features (text-only, no flat icons) */}
                  <div className="space-y-3 mb-8 text-slate-600">
                    <p className="font-['Inter'] text-sm">Yêu cầu xác thực bằng ảnh, GPS</p>
                    <p className="font-['Inter'] text-sm">Điểm số rõ ràng, thành tựu cụ thể</p>
                    <p className="font-['Inter'] text-sm">Chuyển động phản chiếu dọc mép thẻ khi hover</p>
                  </div>

                  {/* Enhanced Button */}
                  <Button 
                    className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 font-['Inter'] font-semibold py-4 rounded-2xl text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Bắt đầu hành trình năng động
                    <Trophy className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Journey Structure - Ancient Tree 3D */}
            <div id="journey-structure" className="text-center mb-20 animate-slideInUp">
              <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-12 tracking-tight">Cấu Trúc Hành Trình</h3>

              <div className="relative max-w-6xl mx-auto min-h-[700px]">
                {/* Tree trunk */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 lg:w-40 h-[80%] rounded-[999px] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,50,40,0.5),rgba(25,20,15,0.8))]" />
                  <div className="absolute inset-0 bg-[url('/images/website background/Tà Xùa 3.png')] bg-cover bg-center opacity-30 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                </div>

                {/* Energy line along trunk */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[12%] h-[68%] w-[6px] rounded-full overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#60A5FA] via-[#34D399] to-[#34D399] animate-glow-flow" />
                  <div className="absolute inset-0 blur-[6px] bg-gradient-to-b from-[#60A5FA]/70 via-[#34D399]/60 to-[#34D399]/60" />
                </div>

                {/* Dynamic SVG energy path */}
                <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA"/>
                      <stop offset="50%" stopColor="#34D399"/>
                      <stop offset="100%" stopColor="#2563EB"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M600,800 C600,700 620,650 600,600 C580,550 620,500 600,450 C580,400 620,350 600,300"
                    stroke="url(#energyGradient)"
                    strokeWidth="6"
                    fill="none"
                    className="animate-draw-path"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(52,211,153,0.6))' }}
                  />
                </svg>

                {/* Branches and checkpoints */}
                {[
                  { pos: { left: '8%', top: '65%' }, rot: -20 },
                  { pos: { right: '6%', top: '58%' }, rot: 18 },
                  { pos: { left: '10%', top: '45%' }, rot: -22 },
                  { pos: { right: '8%', top: '36%' }, rot: 20 },
                  { pos: { left: '12%', top: '25%' }, rot: -18 },
                ].map((b, i) => (
                  <div key={i} className="absolute" style={b.pos as React.CSSProperties}>
                    <div 
                      className="w-32 md:w-40 h-1.5 bg-gradient-to-r from-stone-700/70 via-stone-600/70 to-stone-500/60 shadow-md"
                      style={{ transform: `rotate(${b.rot}deg)`, transformOrigin: 'left center' }}
                    />
                    <div className="mt-3">
                      <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border-4 border-[#60A5FA] shadow-2xl hover:border-[#34D399] hover:shadow-green-200/60 transition-all duration-300 flex items-center justify-center">
                        <span className="font-['Inter'] text-sm font-semibold text-slate-700">Bước {i + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-['Inter'] text-slate-600 mt-8 max-w-2xl mx-auto leading-relaxed">
                Mỗi nhánh cây là một chặng, checkpoint sẽ phát sáng khi hover hoặc hoàn thành. Dải năng lượng lam–lục chạy dọc thân cây gợi hành trình sống động.
              </p>
            </div>
          </div>
        </section>

        {/* Sky Quest System - Restored with Light Blue Background */}
        <section id="common-system" className="py-24 px-4 relative">
          {/* Light Blue Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-100/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/30" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20 animate-slideInUp">
              <h2 className="font-['Inter'] text-4xl md:text-5xl font-bold text-slate-800 mb-8 tracking-tight">
                Hệ Thống Chung Sky Quest
              </h2>
              <p className="font-['Inter'] text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Khám phá cơ chế điểm thưởng, phần thưởng và cấp bậc được thiết kế để tạo động lực cho hành trình xanh của bạn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Points & Levels */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift border border-white/50 animate-slideInUp">
                <div className="text-center">
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1556157383-13a495f694d2?auto=format&fit=crop&w=1200&q=80" alt="Điểm thưởng chung - Bàn tay cầm huy hiệu" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
                  </div>
                  <h3 className="font-['Inter'] text-2xl font-bold text-slate-800 mb-6 tracking-tight">
                    Điểm Thưởng Chung
                  </h3>
                  <p className="font-['Inter'] text-slate-600 leading-relaxed text-base">
                    Điểm từ cả hai mode cộng dồn vào tài khoản chung. Mỗi cấp độ mở khóa phần thưởng và đặc quyền mới.
                  </p>
                </div>
              </div>

              {/* Real & Virtual Rewards */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift border border-white/50 animate-slideInUp" style={{animationDelay: '0.1s'}}>
                <div className="text-center">
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=1200&q=80" alt="Phần thưởng đa dạng - Hộp quà mở ra ánh sáng" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
                  </div>
                  <h3 className="font-['Inter'] text-2xl font-bold text-slate-800 mb-6 tracking-tight">
                    Phần Thưởng Đa Dạng
                  </h3>
                  <p className="font-['Inter'] text-slate-600 leading-relaxed text-base">
                    Huy hiệu độc quyền, voucher du lịch, quà lưu niệm và quyền truy cập đặc biệt theo từng cấp độ.
                  </p>
                </div>
              </div>

              {/* Flexible Switching */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift border border-white/50 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                <div className="text-center">
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80" alt="Chuyển đổi linh hoạt - Con đường chia nhánh trong rừng" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
                  </div>
                  <h3 className="font-['Inter'] text-2xl font-bold text-slate-800 mb-6 tracking-tight">
                    Chuyển Đổi Linh Hoạt
                  </h3>
                  <p className="font-['Inter'] text-slate-600 leading-relaxed text-base">
                    Đổi phong cách bất cứ lúc nào mà không mất tiến độ. Trải nghiệm đa dạng theo tâm trạng của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - aligned with homepage style */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-indigo-500/20" />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h3 className="font-['Inter'] text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
              Sẵn sàng bắt đầu Sky Quest?
            </h3>
            <p className="font-['Inter'] text-lg text-slate-600 mb-8 leading-relaxed">
              Khám phá lộ trình phù hợp và tạo dấu ấn xanh tại Tà Xùa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => document.getElementById('mode-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-8 py-4 rounded-2xl text-base shadow-xl hover:shadow-2xl"
              >
                Chọn phong cách trải nghiệm
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/sky-quest/journey">
                <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-8 py-4 rounded-2xl text-base shadow-xl hover:shadow-2xl">
                  Khám phá lộ trình
                  <Compass className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Transition Animation Overlay */}
        {showPreview && (
          <div className="fixed inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg z-50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl text-center animate-fadeInScale border border-white/50">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-spin-gentle shadow-xl">
                <Play className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-4 tracking-tight">
                Đang khởi động hành trình...
              </h3>
              <p className="font-['Inter'] text-slate-600 text-lg">
                Chuẩn bị cho trải nghiệm {selectedMode === 'calm' ? 'Mây Mây Sương Sương' : 'Hăng Say Săn Thưởng'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced CSS Animations with ViViet Style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes draw-path {
          from {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
          }
          to {
            stroke-dasharray: 1200;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }

        /* Energy glow flow along the tree trunk */
        @keyframes glow-flow {
          0% { transform: translateY(-10%); filter: drop-shadow(0 0 6px rgba(96,165,250,0.6)); }
          50% { transform: translateY(0%); filter: drop-shadow(0 0 10px rgba(52,211,153,0.6)); }
          100% { transform: translateY(-10%); filter: drop-shadow(0 0 6px rgba(96,165,250,0.6)); }
        }
        .animate-glow-flow { animation: glow-flow 3.6s ease-in-out infinite; }
        
        @keyframes spin-gentle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .animate-draw-path {
          animation: draw-path 4s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-spin-gentle {
          animation: spin-gentle 4s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Scroll-triggered animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </Layout>
  );
};

export default SkyQuest;