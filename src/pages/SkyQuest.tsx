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
} from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import Header from '@/components/Header';
import HeroSection from '@/components/SkyQuest/HeroSection';
import ModeCard from '@/components/SkyQuest/ModeCard';
import SystemOverview from '@/components/SkyQuest/SystemOverview';
import CinematicBackground from '@/components/SkyQuest/CinematicBackground';
import SparkleParticles from '@/components/SkyQuest/SparkleParticles';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'calm' | 'energetic' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartJourney = () => {
    if (selectedMode) {
      setShowPreview(true);
      setIsLoading(true);
      
      setTimeout(() => {
        navigate('/sky-quest/journey');
      }, 2000);
    } else {
      document.getElementById('mode-selection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModeSelect = (mode: 'calm' | 'energetic') => {
    setSelectedMode(mode);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Global Cinematic Effects */}
      <div className="cinematic-lighting" />
      <div className="atmospheric-fog" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 cinematic-section">
        {/* Global Sparkle Particles */}
        <SparkleParticles particleCount={30} />
        
        {/* Floating Mist Particles */}
        <div className="mist-particles fixed inset-0 z-10">
          <div className="mist-particle" />
          <div className="mist-particle" />
          <div className="mist-particle" />
          <div className="mist-particle" />
        </div>

        {/* Hero Section */}
        <HeroSection 
          parallaxY={parallaxY}
          onStartJourney={handleStartJourney}
        />

        {/* Mode Selection - Enhanced Cinematic Style */}
        <CinematicBackground variant="forest" className="py-24 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header with cinematic styling */}
            <div className="text-center mb-20">
              <h2 className="font-['Manrope'] text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-blue-200 via-white to-emerald-200 bg-clip-text text-transparent animate-shimmer">
                  Chọn Phong Cách Trải Nghiệm
                </span>
              </h2>
              <p className="font-['Inter'] text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                Hai cách khám phá Tà Xùa, mỗi cách mang đến những trải nghiệm độc đáo và ý nghĩa riêng
              </p>
              
              {/* Decorative line */}
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
              </div>
            </div>

            {/* Mode Cards Grid - Vertical Layout */}
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <ModeCard
                mode="calm"
                isSelected={selectedMode === 'calm'}
                onSelect={() => handleModeSelect('calm')}
                isLoading={isLoading && selectedMode === 'calm'}
              />
              <ModeCard
                mode="energetic"
                isSelected={selectedMode === 'energetic'}
                onSelect={() => handleModeSelect('energetic')}
                isLoading={isLoading && selectedMode === 'energetic'}
              />
            </div>

            {/* Additional atmospheric elements */}
            <div className="mt-16 text-center">
              <p className="font-['Inter'] text-white/70 text-lg italic drop-shadow-md">
                "Như thể bạn đang đứng giữa mây, nghe tiếng gió, và chuẩn bị khởi hành một hành trình thật."
              </p>
            </div>
          </div>
        </CinematicBackground>

        {/* Sky Quest System */}
        <div className="section-transition-forest-to-mist"></div>
        <SystemOverview />
        <div className="section-transition-mist-to-sunset"></div>

        {/* Final CTA - Cinematic Tây Bắc Style */}
        <CinematicBackground variant="sunset" className="py-32 px-4">
          <section className="relative overflow-hidden">

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            {/* Main Title with Tây Bắc styling */}
            <h3 className="font-['Manrope'] text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 tracking-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-emerald-700 via-slate-800 to-blue-700 bg-clip-text text-transparent">
                Sẵn sàng bắt đầu Sky Quest?
              </span>
            </h3>
            
            {/* Subtitle with natural spacing */}
            <p className="font-['Inter'] text-xl md:text-2xl text-slate-700 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
              Khám phá lộ trình phù hợp và tạo dấu ấn xanh tại Tà Xùa.
            </p>

            {/* Decorative separator */}
            <div className="mb-12 flex justify-center items-center gap-6">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent rounded-full" />
              <Sparkles className="w-6 h-6 text-emerald-600/70" />
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full" />
            </div>
            
            {/* Two Buttons Side by Side */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
              {/* Outline Button - Chọn phong cách trải nghiệm */}
              <Button
                onClick={() => document.getElementById('mode-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-emerald-600/60 text-emerald-700 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-emerald-500/20 hover:scale-105 overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative flex items-center justify-center gap-3">
                  Chọn phong cách trải nghiệm
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast" />
              </Button>

              {/* Solid Button - Khám phá lộ trình */}
              <Link to="/sky-quest/journey" className="w-full sm:w-auto">
                <Button className="group relative w-full px-10 py-5 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 hover:from-emerald-500 hover:via-blue-500 hover:to-emerald-500 text-white transition-all duration-500 rounded-full text-lg font-semibold shadow-xl hover:shadow-emerald-500/30 hover:scale-105 border border-white/20 overflow-hidden">
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
                  
                  <span className="relative flex items-center justify-center gap-3 drop-shadow-lg">
                    Khám phá lộ trình
                    <Compass className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast" />
                </Button>
              </Link>
            </div>

            {/* Inspirational quote */}
            <div className="mt-16">
              <p className="font-['Inter'] text-slate-600/80 text-lg italic leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                "Mỗi bước chân trên đất Tà Xùa là một dấu ấn xanh, mỗi hành trình là một câu chuyện đáng nhớ."
              </p>
            </div>
          </div>

          {/* Atmospheric bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </section>
        </CinematicBackground>

        {/* Enhanced Transition Animation Overlay */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <h3 className="font-['Inter'] text-xl font-semibold text-slate-800 mb-2">
                Đang khởi tạo hành trình...
              </h3>
              <p className="font-['Inter'] text-slate-600">
                {isLoading ? `Chuẩn bị chế độ ${selectedMode === 'calm' ? 'Mây Mây Sương Sương' : 'Hăng Say Săn Thưởng'}` : 'Đang tải...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SkyQuest;