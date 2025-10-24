import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import EmeraldDiamond from './EmeraldDiamond';
import SparkleParticles from './SparkleParticles';

interface HeroSectionProps {
  parallaxY: number;
  onStartJourney: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ parallaxY, onStartJourney }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle visibility change (pause animations when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Noise texture animation
    let animationId: number;
    let time = 0;

    const drawNoise = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(drawNoise);
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 0.05 + Math.sin(time * 0.001) * 0.02;
        data[i] = noise * 255;     // R
        data[i + 1] = noise * 255; // G
        data[i + 2] = noise * 255; // B
        data[i + 3] = noise * 15;  // A
      }

      ctx.putImageData(imageData, 0, 0);
      time += 1;
      animationId = requestAnimationFrame(drawNoise);
    };

    drawNoise();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - Full Viewport Coverage */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/textures/sky quest hero section.jpeg"
        onError={(e) => {
          // Fallback to poster image if video fails to load
          const target = e.target as HTMLVideoElement;
          target.style.display = 'none';
          const fallbackDiv = document.createElement('div');
          fallbackDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/textures/sky quest hero section.jpeg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 1;
          `;
          target.parentNode?.insertBefore(fallbackDiv, target);
        }}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ 
          zIndex: 1,
          filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
        }}
      >
        <source src="/textures/sky quest.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/textures/sky quest hero section.jpeg')",
            zIndex: 1
          }}
        />
      </video>

      {/* Cinematic Background Overlays - Refined */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Primary Overlay - Emerald to Mist Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-emerald-900/15 via-emerald-800/8 to-transparent" />
        
        {/* Secondary Overlay - Text Contrast Enhancement */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-transparent to-slate-800/15" />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
        
        {/* Brand Color Integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-blue-900/8 mix-blend-overlay" />

        {/* Noise Texture Canvas - Subtle Film Grain */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-8 mix-blend-overlay pointer-events-none"
        />
      </div>

      {/* Hero Content - Preserved Layout */}
      <div className="relative text-center px-4 max-w-4xl mx-auto" style={{ zIndex: 10 }}>
        {/* Emerald Diamond - Central Icon */}
        <div className="relative mb-12 animate-fadeInUp flex justify-center">
          <EmeraldDiamond 
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 filter brightness-110 drop-shadow-2xl" 
          />
        </div>
        
        {/* Enhanced Title with Glass Morphism */}
        <div className="relative mb-8 animate-fadeInUp animation-delay-200">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 relative">
            <span 
              className="relative z-10 bg-gradient-to-br from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(16, 185, 129, 0.3)'
              }}
            >
              Sky Quest
            </span>
          </h1>
        </div>
        
        {/* Enhanced Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fadeInUp animation-delay-400 max-w-2xl mx-auto leading-relaxed">
          Khám phá vẻ đẹp huyền bí của núi rừng Tà Xùa, nơi biển mây bồng bềnh và ánh bình minh rực rỡ
        </p>

        {/* Enhanced CTA Button */}
        <div className="animate-fadeInUp animation-delay-600">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Bắt đầu hành trình</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;