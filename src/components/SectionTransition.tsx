import React from 'react';

interface SectionTransitionProps {
  variant?: 'wave1' | 'wave2' | 'wave3' | 'curve';
  fromColor?: string;
  toColor?: string;
  height?: string;
  className?: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant = 'wave1',
  fromColor = 'from-transparent',
  toColor = 'to-white',
  height = 'h-16',
  className = ''
}) => {
  const waveVariants = {
    wave1: "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,96L1392,96C1344,96,1248,96,1152,96C1056,96,960,96,864,96C768,96,672,96,576,96C480,96,384,96,288,96C192,96,96,96,48,96L0,96Z",
    wave2: "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,69.3C1248,75,1344,85,1392,90.7L1440,96L1440,96L1392,96C1344,96,1248,96,1152,96C1056,96,960,96,864,96C768,96,672,96,576,96C480,96,384,96,288,96C192,96,96,96,48,96L0,96Z",
    wave3: "M0,48L48,53.3C96,59,192,69,288,64C384,59,480,37,576,32C672,27,768,37,864,42.7C960,48,1056,48,1152,53.3C1248,59,1344,69,1392,74.7L1440,80L1440,96L1392,96C1344,96,1248,96,1152,96C1056,96,960,96,864,96C768,96,672,96,576,96C480,96,384,96,288,96C192,96,96,96,48,96L0,96Z",
    curve: "M0,64L1440,32L1440,96L0,96Z"
  };

  return (
    <div className={`relative w-full ${height} ${className} overflow-hidden`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${fromColor} ${toColor}`} />
      
      {/* SVG Wave */}
      <svg 
        className="absolute bottom-0 w-full h-full" 
        viewBox="0 0 1440 96" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`waveGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0.1)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <path 
          d={waveVariants[variant]}
          fill={`url(#waveGradient-${variant})`}
          className="animate-wave-gentle"
        />
      </svg>

      {/* Subtle Sparkle Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-twinkle" />
        <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-teal-200 rounded-full animate-twinkle-delay" />
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-twinkle-slow" />
      </div>
    </div>
  );
};

export default SectionTransition;