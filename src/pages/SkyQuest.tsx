import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/SkyQuest/HeroSection';

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
    <div className="min-h-screen">
      {/* Global Cinematic Effects */}
      <div className="cinematic-lighting" />
      <div className="atmospheric-fog" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 cinematic-section">
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
    </div>
  );
};

export default SkyQuest;