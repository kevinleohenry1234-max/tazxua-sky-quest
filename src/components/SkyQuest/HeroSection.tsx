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
      {/* Enhanced Cinematic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary Gradient - Teal to Emerald to Sunlight */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-amber-700"
          style={{ 
            transform: `translateY(${parallaxY * 0.1}px)`, 
            transition: 'transform 0.1s linear'
          }}
        />
        
        {/* Secondary Atmospheric Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-sky-900/40"
          style={{ 
            transform: `translateY(${parallaxY * 0.15}px)`
          }}
        />

        {/* Noise Texture Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ 
            transform: `translateY(${parallaxY * 0.05}px)`
          }}
        />

        {/* Mountain Layer 1 - Furthest */}
        <div 
          className="absolute bottom-0 left-0 w-full h-4/5"
          style={{ 
            transform: `translateY(${parallaxY * 0.2}px)`,
            background: 'linear-gradient(to top, #1e293b 0%, #334155 40%, transparent 100%)'
          }}
        >
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,800 L0,400 Q150,350 300,380 Q450,320 600,360 Q750,300 900,340 Q1050,280 1200,320 L1200,800 Z"
              fill="url(#mountain1Gradient)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="mountain1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9"/>
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#334155" stopOpacity="0.5"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mountain Layer 2 - Middle */}
        <div 
          className="absolute bottom-0 left-0 w-full h-3/5"
          style={{ 
            transform: `translateY(${parallaxY * 0.35}px)`
          }}
        >
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path
              d="M0,600 L0,300 Q100,250 200,280 Q350,200 500,240 Q650,180 800,220 Q950,160 1100,200 Q1150,180 1200,190 L1200,600 Z"
              fill="url(#mountain2Gradient)"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="mountain2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95"/>
                <stop offset="50%" stopColor="#334155" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#475569" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mountain Layer 3 - Nearest */}
        <div 
          className="absolute bottom-0 left-0 w-full h-2/5"
          style={{ 
            transform: `translateY(${parallaxY * 0.5}px)`
          }}
        >
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path
              d="M0,400 L0,200 Q80,150 160,170 Q280,120 400,150 Q520,100 640,130 Q760,80 880,110 Q1000,60 1120,90 L1200,100 L1200,400 Z"
              fill="url(#mountain3Gradient)"
            />
            <defs>
              <linearGradient id="mountain3Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" stopOpacity="1"/>
                <stop offset="40%" stopColor="#475569" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#64748b" stopOpacity="0.7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Volumetric Light Rays */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 opacity-30"
            style={{
              background: 'conic-gradient(from 45deg, transparent 0deg, rgba(251, 191, 36, 0.4) 60deg, transparent 120deg)',
              transform: `rotate(${Math.sin(Date.now() * 0.0005) * 10}deg)`,
              filter: 'blur(40px)'
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-80 h-80 opacity-20"
            style={{
              background: 'conic-gradient(from 135deg, transparent 0deg, rgba(255, 255, 255, 0.3) 45deg, transparent 90deg)',
              transform: `rotate(${Math.sin(Date.now() * 0.0003) * 15}deg)`,
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Sunset Glow with Breathing Effect */}
        <div 
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-amber-300/40 via-orange-400/20 to-transparent blur-3xl"
          style={{
            opacity: 0.3 + Math.sin(Date.now() * 0.001) * 0.1,
            transform: `scale(${1 + Math.sin(Date.now() * 0.0008) * 0.1})`
          }}
        />
      </div>

      {/* Enhanced Mist Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mist Layer 1 */}
        <div 
          className="absolute top-1/4 left-0 w-full h-32 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl opacity-60"
          style={{
            transform: `translateX(${Math.sin(Date.now() * 0.0002) * 100}px)`
          }}
        />
        
        {/* Mist Layer 2 */}
        <div 
          className="absolute top-1/2 right-0 w-full h-24 bg-gradient-to-l from-transparent via-blue-100/20 to-transparent blur-xl opacity-50"
          style={{
            transform: `translateX(${Math.cos(Date.now() * 0.0003) * -80}px)`
          }}
        />
        
        {/* Mist Layer 3 */}
        <div 
          className="absolute bottom-1/3 left-0 w-full h-28 bg-gradient-to-r from-transparent via-emerald-100/12 to-transparent blur-xl opacity-40"
          style={{
            transform: `translateX(${Math.sin(Date.now() * 0.0001) * 60}px)`
          }}
        />
      </div>

      {/* Global Sparkle Particles */}
      <SparkleParticles particleCount={30} concentrated={false} className="absolute inset-0" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Emerald Diamond - Central Icon */}
        <div className="relative mb-12 animate-fadeInUp flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Concentrated Sparkle Particles around Diamond */}
            {!prefersReducedMotion && (
              <SparkleParticles particleCount={25} concentrated={true} className="absolute inset-0" />
            )}
            
            <div 
              className="relative"
              style={!prefersReducedMotion && isVisible ? {
                transform: `translateY(${Math.sin(Date.now() * 0.001) * 6}px) rotate(${Math.sin(Date.now() * 0.0008) * 4}deg)`,
                filter: `brightness(${1 + Math.sin(Date.now() * 0.0005) * 0.2})`
              } : {}}
            >
              <EmeraldDiamond className="w-full h-full" />
            </div>
            
            {/* Enhanced Sun Alignment Effect */}
            {!prefersReducedMotion && (
              <>
                <div 
                  className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-radial from-amber-200/60 via-yellow-300/30 to-transparent blur-xl"
                  style={isVisible ? {
                    opacity: 0.6 + Math.sin(Date.now() * 0.0007) * 0.3
                  } : { opacity: 0.6 }}
                />
                <div 
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-radial from-white/40 via-blue-200/20 to-transparent blur-lg"
                  style={isVisible ? {
                    opacity: 0.4 + Math.cos(Date.now() * 0.0009) * 0.2
                  } : { opacity: 0.4 }}
                />
              </>
            )}
          </div>
        </div>
        
        {/* Title with Glass Morphism Background */}
        <div className="relative mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 -m-4" />
          <h1 className="relative font-['Manrope'] text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)] tracking-tight leading-tight">
            Sky Quest
            {/* Enhanced Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-1000" />
          </h1>
          
          {/* Decorative Light Rays */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-white/60 to-transparent blur-sm animate-pulse-gentle" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-emerald-300/50 to-transparent blur-sm animate-pulse-slow" />
        </div>
        
        {/* Enhanced Tagline */}
        <p className="font-['Inter'] text-xl md:text-2xl text-white/95 font-light leading-relaxed tracking-wide mb-12 animate-fadeInUp drop-shadow-lg relative" style={{ animationDelay: '0.4s' }}>
          Hành trình du lịch xanh tại Tà Xùa
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"></span>
        </p>
        
        {/* Enhanced CTA Button with proper padding */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={onStartJourney}
            className="group relative bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 hover:from-emerald-500 hover:via-blue-500 hover:to-emerald-500 text-white font-semibold px-12 py-6 rounded-full text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-105 border border-white/30 backdrop-blur-sm overflow-visible min-w-[280px]"
          >
            {/* Enhanced Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/60 via-blue-400/60 to-emerald-400/60 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center justify-center gap-3 z-10">
              Bắt đầu hành trình
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Enhanced Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast rounded-full transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </div>
      </div>

      {/* Enhanced Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/50" />
      
      {/* Atmospheric Depth Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 via-transparent to-emerald-900/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900/10 via-transparent to-amber-900/10" />
      </div>
    </section>
  );
};

export default HeroSection;