import React from 'react';

interface EmeraldDiamondProps {
  className?: string;
}

const EmeraldDiamond: React.FC<EmeraldDiamondProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Diamond Glow */}
      <div className="absolute inset-0 animate-pulse-gentle">
        <div className="w-full h-full bg-gradient-radial from-emerald-400/60 via-emerald-500/30 to-transparent blur-3xl scale-150" />
      </div>
      
      {/* Secondary Glow */}
      <div className="absolute inset-0 animate-pulse-slow">
        <div className="w-full h-full bg-gradient-radial from-blue-300/40 via-emerald-300/20 to-transparent blur-2xl scale-125" />
      </div>
      
      {/* Diamond SVG */}
      <svg 
        viewBox="0 0 200 200" 
        className="relative z-10 w-full h-full drop-shadow-2xl animate-float-gentle"
        style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))' }}
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#34d399" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="1" />
            <stop offset="75%" stopColor="#34d399" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
          
          <radialGradient id="centerGlow" cx="50%" cy="40%" r="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        
        {/* Diamond Shape */}
        <path
          d="M100 20 L160 80 L100 180 L40 80 Z"
          fill="url(#emeraldGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          className="animate-pulse-subtle"
        />
        
        {/* Top Facet Highlights */}
        <path
          d="M100 20 L130 50 L100 80 L70 50 Z"
          fill="url(#highlightGradient)"
          opacity="0.7"
        />
        
        {/* Side Facets */}
        <path
          d="M70 50 L100 80 L40 80 Z"
          fill="rgba(16, 185, 129, 0.6)"
          opacity="0.8"
        />
        <path
          d="M130 50 L160 80 L100 80 Z"
          fill="rgba(16, 185, 129, 0.4)"
          opacity="0.9"
        />
        
        {/* Bottom Facets */}
        <path
          d="M40 80 L100 80 L100 180 Z"
          fill="rgba(5, 150, 105, 0.8)"
          opacity="0.9"
        />
        <path
          d="M100 80 L160 80 L100 180 Z"
          fill="rgba(5, 150, 105, 0.6)"
          opacity="0.8"
        />
        
        {/* Center Glow */}
        <ellipse
          cx="100"
          cy="90"
          rx="25"
          ry="35"
          fill="url(#centerGlow)"
          className="animate-pulse-gentle"
        />
        
        {/* Sparkle Points */}
        <circle cx="85" cy="45" r="2" fill="white" opacity="0.9" className="animate-twinkle-1" />
        <circle cx="115" cy="55" r="1.5" fill="white" opacity="0.8" className="animate-twinkle-2" />
        <circle cx="100" cy="35" r="1" fill="white" opacity="1" className="animate-twinkle-3" />
        <circle cx="75" cy="70" r="1.5" fill="white" opacity="0.7" className="animate-twinkle-4" />
        <circle cx="125" cy="75" r="1" fill="white" opacity="0.9" className="animate-twinkle-1" />
      </svg>
      
      {/* Sparkle Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/80 rounded-full blur-sm animate-sparkle-1" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-emerald-200/90 rounded-full blur-sm animate-sparkle-2" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-200/80 rounded-full blur-sm animate-sparkle-3" />
      <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/70 rounded-full blur-sm animate-sparkle-4" />
      <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-emerald-300/80 rounded-full blur-sm animate-sparkle-1" />
      
      {/* Lens Flare Effect */}
      <div className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-white/80 to-transparent blur-sm rotate-45 animate-lens-flare-1" />
      <div className="absolute top-1/3 right-1/4 w-1 h-16 bg-gradient-to-b from-emerald-200/70 to-transparent blur-sm rotate-12 animate-lens-flare-2" />
    </div>
  );
};

export default EmeraldDiamond;