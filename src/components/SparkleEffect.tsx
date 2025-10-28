import React from 'react';

interface SparkleEffectProps {
  className?: string;
}

const SparkleEffect: React.FC<SparkleEffectProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Sparkle elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-200/50 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-teal-200/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1500"></div>
      <div className="absolute bottom-1/4 right-2/3 w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>
    </div>
  );
};

export default SparkleEffect;