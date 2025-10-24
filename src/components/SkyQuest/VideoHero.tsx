import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SparkleParticles from './SparkleParticles';

interface VideoHeroProps {
  parallaxY: number;
  onStartJourney: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({ parallaxY, onStartJourney }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
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

  // Handle scroll opacity effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newOpacity = Math.max(0.7, 1 - (currentScrollY / windowHeight) * 0.3);
      setScrollY(currentScrollY);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video event handlers
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.warn('Video failed to load:', e);
    setIsVideoLoaded(false);
  }, []);

  // Auto-play video when loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setIsVideoPlaying(true);
      } catch (error) {
        console.warn('Video autoplay failed:', error);
        // Fallback: try to play on user interaction
        const handleUserInteraction = async () => {
          try {
            await video.play();
            setIsVideoPlaying(true);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          } catch (err) {
            console.warn('Video play on interaction failed:', err);
          }
        };
        
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });
      }
    };

    if (isVideoLoaded) {
      playVideo();
    }
  }, [isVideoLoaded]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 -z-20">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/textures/skyquest-poster.svg"
          onLoadStart={() => setIsVideoLoading(true)}
          onCanPlay={() => setIsVideoLoading(false)}
          onError={() => setVideoError(true)}
          style={{
            filter: scrollY > 100 ? 'brightness(0.7)' : 'brightness(1)',
            transition: 'filter 0.3s ease-out'
          }}
        >
          <source src="/textures/sky quest.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback Background Gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-amber-700 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            transform: `translateY(${parallaxY * 0.1}px)`,
          }}
        />
      </div>

      {/* Gradient Overlay for Text Visibility */}
      <div className="absolute inset-0 -z-10">
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Center gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-radial from-black/20 via-transparent to-transparent" />
        
        {/* Subtle color overlay to maintain brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-blue-900/20 mix-blend-overlay" />
      </div>

      {/* Sparkle Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <SparkleParticles />
        </div>
      )}

      {/* Volumetric Light Effects */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96"
            style={{
              background: 'conic-gradient(from 45deg, transparent 0deg, rgba(251, 191, 36, 0.3) 60deg, transparent 120deg)',
              transform: `rotate(${Math.sin(Date.now() * 0.0005) * 10}deg)`,
              filter: 'blur(60px)',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-1/3 left-1/4 w-80 h-80"
            style={{
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse 6s ease-in-out infinite reverse'
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Title with Enhanced Glass Morphism */}
        <div className="relative mb-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 -m-6 shadow-2xl" />
          <h1 
            className="relative font-['Manrope'] text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent tracking-tight leading-tight"
            style={{
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.8))',
              mixBlendMode: 'soft-light'
            }}
          >
            Sky Quest
            {/* Enhanced Shimmer Effect */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-1000" />
            )}
          </h1>
          
          {/* Decorative Light Rays */}
          {!prefersReducedMotion && (
            <>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/60 to-transparent blur-sm animate-pulse-gentle" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-emerald-300/50 to-transparent blur-sm animate-pulse-slow" />
            </>
          )}
        </div>
        
        {/* Enhanced Tagline with Soft Light Blend */}
        <p 
          className="font-['Inter'] text-xl md:text-2xl text-white/95 font-light leading-relaxed tracking-wide mb-12 animate-fadeInUp relative"
          style={{ 
            animationDelay: '0.5s',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))',
            mixBlendMode: 'soft-light'
          }}
        >
          Hành trình du lịch xanh tại Tà Xùa
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent animate-pulse"></span>
        </p>
        
        {/* Enhanced CTA Button */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={onStartJourney}
            className="group relative bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 hover:from-emerald-500 hover:via-blue-500 hover:to-emerald-500 text-white font-semibold px-12 py-6 rounded-full text-lg shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 border border-white/30 backdrop-blur-sm overflow-visible min-w-[280px]"
          >
            {/* Enhanced Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/70 via-blue-400/70 to-emerald-400/70 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center justify-center gap-3 z-10">
              Bắt đầu hành trình
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Enhanced Shimmer */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast rounded-full transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      {/* Video Loading Indicator */}
      {!isVideoLoaded && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white/70 text-sm">
            Loading video...
          </div>
        </div>
      )}

      {/* Performance Optimization: Preload hint */}
      <link rel="preload" href="/textures/sky quest.mp4" as="video" type="video/mp4" />
    </section>
  );
};

export default VideoHero;