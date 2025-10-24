import React, { useEffect, useRef, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  twinklePhase: number;
}

interface SparkleParticlesProps {
  className?: string;
  particleCount?: number;
  concentrated?: boolean; // Tập trung nhiều hơn quanh viên kim cương
}

const SparkleParticles: React.FC<SparkleParticlesProps> = ({ 
  className = '', 
  particleCount = 50,
  concentrated = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const animationRef = useRef<number>();

  // Tạo hạt sparkle
  const createParticle = (id: number): SparkleParticle => {
    const container = containerRef.current;
    if (!container) return { id, x: 0, y: 0, size: 1, opacity: 0.2, speed: 0.5, direction: 0, twinklePhase: 0 };

    const rect = container.getBoundingClientRect();
    
    let x, y;
    if (concentrated) {
      // Tập trung quanh trung tâm (viên kim cương)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.4;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      
      x = centerX + Math.cos(angle) * distance;
      y = centerY + Math.sin(angle) * distance;
    } else {
      // Phân bố ngẫu nhiên toàn màn hình
      x = Math.random() * rect.width;
      y = Math.random() * rect.height;
    }

    return {
      id,
      x,
      y,
      size: Math.random() * 3 + 1, // 1-4px
      opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
      speed: Math.random() * 0.5 + 0.2, // Chậm vừa phải
      direction: Math.random() * Math.PI * 2,
      twinklePhase: Math.random() * Math.PI * 2
    };
  };

  // Khởi tạo hạt
  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, i) => createParticle(i));
    setParticles(initialParticles);
  }, [particleCount]);

  // Animation loop với performance optimization
  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 30; // Giảm FPS để tăng performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Cập nhật vị trí
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Wrap around edges
          if (newX < 0) newX = rect.width;
          if (newX > rect.width) newX = 0;
          if (newY < 0) newY = rect.height;
          if (newY > rect.height) newY = 0;

          // Cập nhật twinkle phase
          const newTwinklePhase = particle.twinklePhase + 0.02;

          return {
            ...particle,
            x: newX,
            y: newY,
            twinklePhase: newTwinklePhase,
            opacity: (Math.sin(newTwinklePhase) + 1) * 0.3 + 0.2 // 0.2-0.8
          };
        })
      );

      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-20 overflow-hidden sparkle-particles ${className}`}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.8}), 
                       0 0 ${particle.size * 4}px rgba(255, 255, 255, ${particle.opacity * 0.4})`,
            filter: `blur(${particle.size * 0.1}px)`,
            transform: `scale(${0.8 + Math.sin(particle.twinklePhase) * 0.4})`,
          }}
        />
      ))}
      
      {/* Lens flare effects - chỉ hiện khi concentrated */}
      {concentrated && (
        <>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-opacity"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              animation: 'pulse-gentle 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-opacity"
            style={{
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 60%)',
              animation: 'pulse-gentle 3s ease-in-out infinite reverse'
            }}
          />
        </>
      )}
    </div>
  );
};

export default SparkleParticles;