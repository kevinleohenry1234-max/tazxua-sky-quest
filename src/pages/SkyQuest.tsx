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

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Load saved mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('skyquest_preferred_mode');
    if (savedMode) {
      setSelectedMode(savedMode);
    }
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

  const journeySteps = [
    { icon: <Camera className="w-4 h-4" />, label: "Bước 1" },
    { icon: <MapPin className="w-4 h-4" />, label: "Bước 2" },
    { icon: <Smile className="w-4 h-4" />, label: "Bước 3" },
    { icon: <TreePine className="w-4 h-4" />, label: "Bước 4" },
    { icon: <Trophy className="w-4 h-4" />, label: "Bước 5" }
  ];

  return (
    <Layout>
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
        
        {/* Hero Section - Refined ViViet Style */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeInUp">
            {/* Sky Quest Logo - Enhanced Typography */}
            <div className="mb-12 animate-float">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-white/95 backdrop-blur-md rounded-full shadow-2xl mb-8 border border-white/50">
                <div className="relative">
                  <Mountain className="w-12 h-12 text-green-600" />
                  <Leaf className="w-7 h-7 text-green-500 absolute -top-1 -right-1" />
                </div>
              </div>
              
              {/* Enhanced Title with ViViet Typography */}
              <h1 className="font-['Inter'] text-6xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight leading-tight">
                Sky Quest
              </h1>
              
              {/* Refined Tagline */}
              <p className="font-['Inter'] text-xl md:text-2xl text-slate-700/80 font-medium leading-relaxed tracking-wide">
                Hành trình du lịch xanh tại Tà Xùa
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-16">
              <div className="max-w-md mx-auto">
                <p className="font-['Inter'] text-sm text-slate-600/90 mb-4 font-medium">Hành trình của bạn sắp bắt đầu</p>
                <div className="w-full bg-white/60 backdrop-blur-sm rounded-full h-3 shadow-inner border border-white/30">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full w-0 transition-all duration-1000 animate-pulse-gentle" />
                </div>
                <p className="font-['Inter'] text-xs text-slate-500/80 mt-3">0% hoàn thành</p>
              </div>
            </div>

            {/* Call to Action - Enhanced Button */}
            <div className="animate-fadeInUp">
              <Button 
                onClick={() => document.getElementById('mode-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-['Inter'] font-semibold px-10 py-5 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
              >
                Bắt đầu hành trình
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Floating Elements - Enhanced */}
          <div className="absolute top-24 left-12 animate-float-delayed opacity-60">
            <Cloud className="w-10 h-10 text-blue-400/70" />
          </div>
          <div className="absolute bottom-40 right-20 animate-float opacity-70">
            <Sparkles className="w-8 h-8 text-yellow-400/80" />
          </div>
          <div className="absolute top-1/3 right-12 animate-float-slow opacity-50">
            <Mountain className="w-6 h-6 text-green-500/60" />
          </div>
        </section>

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
                {/* Background Gradient - Mây Mây Sương Sương */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
                
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-purple-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Soft Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
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

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-slate-600">
                      <Heart className="w-5 h-5 text-blue-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Không yêu cầu xác thực phức tạp</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Sparkles className="w-5 h-5 text-indigo-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Tông màu nhẹ nhàng, thư giãn</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Smile className="w-5 h-5 text-purple-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Animation mềm mại, âm thanh thiên nhiên</span>
                    </div>
                  </div>

                  {/* Enhanced Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-['Inter'] font-semibold py-4 rounded-2xl text-base transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
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
                {/* Background Gradient - Hăng Say Săn Thưởng */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50" />
                
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 via-yellow-100/40 to-orange-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Radiant Light Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
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

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-slate-600">
                      <Camera className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Yêu cầu xác thực bằng ảnh, GPS</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Target className="w-5 h-5 text-yellow-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Điểm số rõ ràng, thành tựu cụ thể</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Zap className="w-5 h-5 text-orange-500 mr-4 flex-shrink-0" />
                      <span className="font-['Inter'] text-sm font-medium">Animation năng động, màu sắc tươi sáng</span>
                    </div>
                  </div>

                  {/* Enhanced Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-['Inter'] font-semibold py-4 rounded-2xl text-base transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
                  >
                    Bắt đầu hành trình năng động
                    <Trophy className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Journey Structure - Enhanced */}
            <div className="text-center mb-20 animate-slideInUp">
              <h3 className="font-['Inter'] text-3xl font-bold text-slate-800 mb-12 tracking-tight">Cấu Trúc Hành Trình</h3>
              
              {/* Journey Path */}
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between relative">
                  {/* Enhanced Curved Path SVG */}
                  <svg className="absolute inset-0 w-full h-20" viewBox="0 0 500 80" fill="none">
                    <path 
                      d="M25 40 Q125 20 250 40 T475 40" 
                      stroke="url(#enhancedGradient)" 
                      strokeWidth="4" 
                      fill="none"
                      className="animate-draw-path"
                    />
                    <defs>
                      <linearGradient id="enhancedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#16A34A" />
                        <stop offset="25%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="75%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Journey Steps */}
                  {journeySteps.map((step, index) => (
                    <div key={index} className="relative z-10 flex flex-col items-center group">
                      <div className="w-16 h-16 bg-white border-4 border-green-400 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl">
                        {step.icon}
                      </div>
                      <span className="font-['Inter'] text-sm text-slate-600 mt-3 font-medium group-hover:text-slate-800 transition-colors">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="font-['Inter'] text-slate-600 mt-8 max-w-2xl mx-auto leading-relaxed">
                Mỗi bước trong hành trình đều mang ý nghĩa riêng, dẫn dắt bạn khám phá vẻ đẹp Tà Xùa theo cách của riêng mình.
              </p>
            </div>
          </div>
        </section>

        {/* Sky Quest System - Restored with Light Blue Background */}
        <section className="py-24 px-4 relative">
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
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 animate-slideInUp">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Star className="w-10 h-10 text-white" />
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
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 animate-slideInUp" style={{animationDelay: '0.1s'}}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Gift className="w-10 h-10 text-white" />
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
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
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

        {/* Inspiration Corner - Enhanced */}
        <section className="py-24 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slideInUp">
              <h2 className="font-['Inter'] text-4xl md:text-5xl font-bold text-slate-800 mb-8 tracking-tight">
                Góc Cảm Hứng Sky Quest
              </h2>
              <p className="font-['Inter'] text-xl text-slate-600 leading-relaxed">
                Những chia sẻ chân thật từ cộng đồng Sky Quest
              </p>
            </div>

            {/* Enhanced Testimonial Slider */}
            <div className="relative animate-slideInUp">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-white/50">
                <div className="text-center">
                  <Quote className="w-16 h-16 text-green-400 mx-auto mb-8" />
                  
                  <blockquote className="font-['Inter'] text-2xl md:text-3xl text-slate-700 font-medium leading-relaxed mb-10 tracking-wide">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-['Inter'] font-bold text-slate-800 text-lg">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="font-['Inter'] text-slate-500 text-base">
                        {testimonials[currentTestimonial].mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 scale-125' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
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