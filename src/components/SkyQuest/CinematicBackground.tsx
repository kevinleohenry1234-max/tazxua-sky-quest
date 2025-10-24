import React from 'react';

interface CinematicBackgroundProps {
  variant: 'forest' | 'mist' | 'sunset' | 'fog';
  className?: string;
  children?: React.ReactNode;
}

const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ 
  variant, 
  className = "", 
  children 
}) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'forest':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(6, 78, 59, 0.9) 0%, 
              rgba(6, 95, 70, 0.8) 25%, 
              rgba(4, 120, 87, 0.7) 50%, 
              rgba(16, 185, 129, 0.6) 75%, 
              rgba(52, 211, 153, 0.5) 100%
            ),
            radial-gradient(ellipse 1200px 800px at 20% 30%, 
              rgba(34, 197, 94, 0.15) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse 800px 600px at 80% 70%, 
              rgba(5, 150, 105, 0.12) 0%, 
              transparent 50%
            )
          `,
          filter: 'contrast(1.1) saturate(1.2) brightness(0.8)'
        };
      
      case 'mist':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(248, 250, 252, 0.95) 0%, 
              rgba(226, 232, 240, 0.9) 25%, 
              rgba(203, 213, 225, 0.85) 50%, 
              rgba(148, 163, 184, 0.8) 75%, 
              rgba(100, 116, 139, 0.75) 100%
            ),
            radial-gradient(ellipse 1000px 600px at 40% 20%, 
              rgba(255, 255, 255, 0.3) 0%, 
              transparent 60%
            ),
            radial-gradient(ellipse 800px 400px at 60% 80%, 
              rgba(226, 232, 240, 0.2) 0%, 
              transparent 50%
            )
          `,
          filter: 'blur(0.5px) brightness(0.9) contrast(1.05)'
        };
      
      case 'sunset':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(245, 158, 11, 0.9) 0%, 
              rgba(217, 119, 6, 0.8) 25%, 
              rgba(180, 83, 9, 0.7) 50%, 
              rgba(146, 64, 14, 0.6) 75%, 
              rgba(120, 53, 15, 0.5) 100%
            ),
            radial-gradient(ellipse 1200px 800px at 70% 30%, 
              rgba(251, 191, 36, 0.2) 0%, 
              transparent 50%
            ),
            radial-gradient(ellipse 600px 400px at 30% 70%, 
              rgba(245, 158, 11, 0.15) 0%, 
              transparent 50%
            )
          `,
          filter: 'contrast(1.15) saturate(1.3) brightness(0.85)'
        };
      
      case 'fog':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(241, 245, 249, 0.95) 0%, 
              rgba(226, 232, 240, 0.9) 25%, 
              rgba(203, 213, 225, 0.85) 50%, 
              rgba(148, 163, 184, 0.8) 75%, 
              rgba(71, 85, 105, 0.75) 100%
            ),
            radial-gradient(ellipse 1400px 900px at 50% 50%, 
              rgba(255, 255, 255, 0.25) 0%, 
              transparent 70%
            ),
            radial-gradient(ellipse 800px 500px at 20% 80%, 
              rgba(203, 213, 225, 0.18) 0%, 
              transparent 60%
            )
          `,
          filter: 'blur(1px) brightness(0.92) contrast(1.08)'
        };
      
      default:
        return {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)'
        };
    }
  };

  const getOverlayEffects = () => {
    switch (variant) {
      case 'forest':
        return (
          <>
            {/* Forest Light Rays */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-emerald-300/20 via-green-400/10 to-transparent blur-3xl animate-pulse-gentle" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-lime-200/15 via-emerald-300/8 to-transparent blur-2xl animate-float-slow" />
            
            {/* Dappled Light Effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-radial from-white/20 to-transparent blur-xl animate-pulse-slow" />
              <div className="absolute top-2/3 right-1/3 w-24 h-24 bg-gradient-radial from-emerald-100/25 to-transparent blur-lg animate-pulse-gentle" />
              <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-radial from-white/15 to-transparent blur-md animate-pulse-slow" />
            </div>
          </>
        );
      
      case 'mist':
        return (
          <>
            {/* Mist Layers */}
            <div className="absolute top-1/4 left-0 w-full h-40 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl animate-drift-right" />
            <div className="absolute top-1/2 right-0 w-full h-32 bg-gradient-to-l from-transparent via-slate-100/15 to-transparent blur-xl animate-drift-left" />
            <div className="absolute bottom-1/3 left-0 w-full h-36 bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl animate-drift-right-slow" />
          </>
        );
      
      case 'sunset':
        return (
          <>
            {/* Sunset Glow */}
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-amber-300/30 via-orange-400/15 to-transparent blur-3xl animate-pulse-gentle" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-200/25 via-amber-300/12 to-transparent blur-2xl animate-float-slow" />
            
            {/* Golden Hour Rays */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/3 right-1/4 w-2 h-32 bg-gradient-to-b from-amber-200/60 to-transparent blur-sm rotate-12 animate-pulse-slow" />
              <div className="absolute top-1/2 right-1/3 w-1 h-24 bg-gradient-to-b from-yellow-300/50 to-transparent blur-sm rotate-45 animate-pulse-gentle" />
            </div>
          </>
        );
      
      case 'fog':
        return (
          <>
            {/* Fog Layers */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/4 left-0 w-full h-48 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-3xl animate-drift-right" />
              <div className="absolute top-1/2 right-0 w-full h-40 bg-gradient-to-l from-transparent via-slate-200/20 to-transparent blur-2xl animate-drift-left" />
              <div className="absolute bottom-1/3 left-0 w-full h-44 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-3xl animate-drift-right-slow" />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={getBackgroundStyle()}
      />
      
      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {getOverlayEffects()}
      </div>
      
      {/* Oil Painting Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
          `,
          backgroundSize: '100px 100px, 150px 150px, 20px 20px'
        }}
      />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CinematicBackground;