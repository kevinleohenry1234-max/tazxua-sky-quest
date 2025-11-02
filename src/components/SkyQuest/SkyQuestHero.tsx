import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import EmeraldDiamond3D from './EmeraldDiamond3D';

interface SkyQuestHeroProps {
  onExploreClick: () => void;
}

const SkyQuestHero: React.FC<SkyQuestHeroProps> = ({ onExploreClick }) => {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Sky Quest - Hành trình du lịch bền vững có thưởng"
    >
      {/* Background with enhanced glow effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/skyquest/herosection.png')",
          transform: `translateY(${parallaxY * 0.3}px) scale(1.05)`,
          filter: 'brightness(0.7) contrast(1.2) saturate(1.2)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-emerald-800/40 to-blue-900/60" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          {/* 3D Diamond */}
          <div className="mb-8 animate-fadeInUp">
            <EmeraldDiamond3D 
              size={320}
              className="relative drop-shadow-2xl"
            />
          </div>
          
          {/* Headlines */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fadeInUp animation-delay-200">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Sky Quest
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light animate-fadeInUp animation-delay-400 mb-8">
            Hành trình du lịch bền vững có thưởng
          </p>

          {/* CTA Button */}
          <button
            onClick={onExploreClick}
            className="group bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeInUp animation-delay-600 flex items-center gap-3"
          >
            Khám phá chế độ chơi
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkyQuestHero;