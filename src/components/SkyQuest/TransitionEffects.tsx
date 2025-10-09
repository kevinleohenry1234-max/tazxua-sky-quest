import React, { useState, useEffect, useRef } from 'react';

interface TransitionEffectsProps {
  isTransitioning?: boolean;
  transitionType?: 'fade' | 'slide' | 'zoom' | 'particle' | 'nature';
  duration?: number;
  onTransitionComplete?: () => void;
  children?: React.ReactNode;
  sceneContext?: 'forest' | 'mountain' | 'village' | 'journey' | 'reward';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'leaf' | 'star' | 'sparkle' | 'cloud';
}

const TransitionEffects: React.FC<TransitionEffectsProps> = ({
  isTransitioning = false,
  transitionType = 'fade',
  duration = 1000,
  onTransitionComplete,
  children,
  sceneContext = 'journey'
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'exit' | 'idle'>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Particle configurations based on scene context
  const getParticleConfig = (context: string) => {
    switch (context) {
      case 'forest':
        return {
          colors: ['#22c55e', '#16a34a', '#15803d', '#166534'],
          types: ['leaf', 'sparkle'] as const,
          count: 25
        };
      case 'mountain':
        return {
          colors: ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280'],
          types: ['cloud', 'star'] as const,
          count: 20
        };
      case 'village':
        return {
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#b45309'],
          types: ['sparkle', 'star'] as const,
          count: 30
        };
      case 'reward':
        return {
          colors: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6'],
          types: ['sparkle', 'star'] as const,
          count: 40
        };
      default:
        return {
          colors: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'],
          types: ['sparkle', 'cloud'] as const,
          count: 20
        };
    }
  };

  // Generate particles
  const generateParticles = (count: number): Particle[] => {
    const config = getParticleConfig(sceneContext);
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        type: config.types[Math.floor(Math.random() * config.types.length)]
      });
    }

    return newParticles;
  };

  // Animate particles
  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    setParticles(prevParticles => {
      const updatedParticles = prevParticles.map(particle => {
        // Update position
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;

        // Wrap around screen
        const wrappedX = newX < 0 ? canvas.width : newX > canvas.width ? 0 : newX;
        const wrappedY = newY < 0 ? canvas.height : newY > canvas.height ? 0 : newY;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;

        switch (particle.type) {
          case 'leaf':
            drawLeaf(ctx, wrappedX, wrappedY, particle.size);
            break;
          case 'star':
            drawStar(ctx, wrappedX, wrappedY, particle.size);
            break;
          case 'sparkle':
            drawSparkle(ctx, wrappedX, wrappedY, particle.size);
            break;
          case 'cloud':
            drawCloud(ctx, wrappedX, wrappedY, particle.size);
            break;
        }

        ctx.restore();

        return {
          ...particle,
          x: wrappedX,
          y: wrappedY,
          opacity: animationPhase === 'exit' ? particle.opacity * 0.95 : particle.opacity
        };
      });

      return updatedParticles;
    });

    if (animationPhase !== 'idle') {
      animationRef.current = requestAnimationFrame(animateParticles);
    }
  };

  // Drawing functions for different particle types
  const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.6, size, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sparkle lines
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
  };

  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x - size * 0.5, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x, y - size * 0.3, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x + size * 0.5, y, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  };

  // Handle transition start
  useEffect(() => {
    if (isTransitioning) {
      setAnimationPhase('enter');
      
      if (transitionType === 'particle' || transitionType === 'nature') {
        const config = getParticleConfig(sceneContext);
        setParticles(generateParticles(config.count));
      }

      // Set exit phase
      timeoutRef.current = setTimeout(() => {
        setAnimationPhase('exit');
        
        // Complete transition
        setTimeout(() => {
          setAnimationPhase('idle');
          setParticles([]);
          onTransitionComplete?.();
        }, duration / 2);
      }, duration / 2);
    }
  }, [isTransitioning, transitionType, sceneContext, duration]);

  // Start particle animation
  useEffect(() => {
    if (animationPhase !== 'idle' && (transitionType === 'particle' || transitionType === 'nature')) {
      animationRef.current = requestAnimationFrame(animateParticles);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationPhase, transitionType]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTransitionClass = () => {
    if (!isTransitioning) return '';
    
    switch (transitionType) {
      case 'fade':
        return 'transition-fade';
      case 'slide':
        return 'transition-slide';
      case 'zoom':
        return 'transition-zoom';
      case 'particle':
      case 'nature':
        return 'transition-particle';
      default:
        return 'transition-fade';
    }
  };

  const getSceneGradient = () => {
    switch (sceneContext) {
      case 'forest':
        return 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)';
      case 'mountain':
        return 'linear-gradient(135deg, rgba(229, 231, 235, 0.1) 0%, rgba(156, 163, 175, 0.1) 100%)';
      case 'village':
        return 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)';
      case 'reward':
        return 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(139, 92, 246, 0.2) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)';
    }
  };

  return (
    <div className="transition-effects">
      {/* Particle Canvas */}
      {(transitionType === 'particle' || transitionType === 'nature') && (
        <canvas
          ref={canvasRef}
          className="particle-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1000,
            opacity: animationPhase === 'idle' ? 0 : 1
          }}
        />
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <div 
          className={`transition-overlay ${getTransitionClass()}`}
          style={{
            background: getSceneGradient(),
            animationDuration: `${duration}ms`
          }}
        >
          <div className="transition-content">
            {sceneContext === 'forest' && (
              <div className="scene-icon">🌲</div>
            )}
            {sceneContext === 'mountain' && (
              <div className="scene-icon">🏔️</div>
            )}
            {sceneContext === 'village' && (
              <div className="scene-icon">🏘️</div>
            )}
            {sceneContext === 'reward' && (
              <div className="scene-icon">✨</div>
            )}
            {sceneContext === 'journey' && (
              <div className="scene-icon">🗺️</div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="transition-children">
        {children}
      </div>

      <style>{`
        .transition-effects {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .particle-canvas {
          transition: opacity 0.5s ease;
        }

        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          backdrop-filter: blur(10px);
        }

        .transition-content {
          text-align: center;
        }

        .scene-icon {
          font-size: 80px;
          animation: sceneIconPulse 2s ease-in-out infinite;
        }

        @keyframes sceneIconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        /* Fade Transition */
        .transition-fade {
          animation: fadeTransition var(--duration, 1000ms) ease-in-out;
        }

        @keyframes fadeTransition {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        /* Slide Transition */
        .transition-slide {
          animation: slideTransition var(--duration, 1000ms) ease-in-out;
        }

        @keyframes slideTransition {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        /* Zoom Transition */
        .transition-zoom {
          animation: zoomTransition var(--duration, 1000ms) ease-in-out;
        }

        @keyframes zoomTransition {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Particle Transition */
        .transition-particle {
          animation: particleTransition var(--duration, 1000ms) ease-in-out;
        }

        @keyframes particleTransition {
          0% {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          50% {
            opacity: 1;
            backdrop-filter: blur(10px);
          }
          100% {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }

        .transition-children {
          position: relative;
          z-index: 1;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .scene-icon {
            font-size: 60px;
          }
        }

        @media (max-width: 480px) {
          .scene-icon {
            font-size: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default TransitionEffects;