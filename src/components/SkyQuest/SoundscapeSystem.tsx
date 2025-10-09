import React, { useState, useEffect, useRef } from 'react';
import { SOUNDSCAPE_MAPPING } from '../../data/narrativeAdventureData';

interface SoundscapeSystemProps {
  userArchetype?: string;
  currentJourneyId?: string;
  isActive?: boolean;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
}

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  archetype?: string;
}

const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'forest-protection',
    name: 'Rừng Xanh Bảo Vệ',
    url: '/audio/forest-protection.mp3',
    icon: '🌲',
    description: 'Âm thanh rừng xanh với tiếng chim hót và lá xào xạc',
    archetype: 'protector'
  },
  {
    id: 'mountain-meditation',
    name: 'Thiền Định Núi Rừng',
    url: '/audio/mountain-meditation.mp3',
    icon: '🏔️',
    description: 'Nhạc thiền yên tĩnh với tiếng gió núi',
    archetype: 'observer'
  },
  {
    id: 'village-stories',
    name: 'Câu Chuyện Làng Bản',
    url: '/audio/village-stories.mp3',
    icon: '🏘️',
    description: 'Âm thanh làng quê với tiếng trẻ em cười đùa',
    archetype: 'storyteller'
  },
  {
    id: 'creative-inspiration',
    name: 'Cảm Hứng Sáng Tạo',
    url: '/audio/creative-inspiration.mp3',
    icon: '🎨',
    description: 'Nhạc nền sáng tạo với giai điệu nhẹ nhàng',
    archetype: 'creator'
  },
  {
    id: 'taxua-ambient',
    name: 'Tà Xùa Tổng Hợp',
    url: '/audio/taxua-ambient.mp3',
    icon: '🌄',
    description: 'Âm thanh tổng hợp của Tà Xùa',
  }
];

const SoundscapeSystem: React.FC<SoundscapeSystemProps> = ({
  userArchetype = 'observer',
  currentJourneyId,
  isActive = false,
  volume = 0.3,
  onVolumeChange
}) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get recommended track based on archetype
  const getRecommendedTrack = (archetype: string): AudioTrack => {
    const archetypeTrack = AUDIO_TRACKS.find(track => track.archetype === archetype);
    return archetypeTrack || AUDIO_TRACKS.find(track => track.id === 'taxua-ambient')!;
  };

  // Initialize audio
  useEffect(() => {
    if (isActive && !currentTrack) {
      const recommendedTrack = getRecommendedTrack(userArchetype);
      setCurrentTrack(recommendedTrack);
    }
  }, [isActive, userArchetype, currentTrack]);

  // Handle track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.volume = currentVolume;
      audioRef.current.loop = true;
      
      if (isActive && isPlaying) {
        playAudio();
      }
    }
  }, [currentTrack]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
    onVolumeChange?.(currentVolume);
  }, [currentVolume, onVolumeChange]);

  const playAudio = async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      setIsLoading(true);
      setError(null);
      
      await audioRef.current.play();
      setIsPlaying(true);
      fadeIn();
    } catch (err) {
      console.warn('Audio playback failed:', err);
      setError('Không thể phát âm thanh. Hãy thử lại sau.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      fadeOut(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
    }
  };

  const fadeIn = () => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = 0;
    const targetVolume = currentVolume;
    const step = targetVolume / 20;
    
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < targetVolume) {
        audioRef.current.volume = Math.min(audioRef.current.volume + step, targetVolume);
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 50);
  };

  const fadeOut = (callback?: () => void) => {
    if (!audioRef.current) return;
    
    const startVolume = audioRef.current.volume;
    const step = startVolume / 20;
    
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(audioRef.current.volume - step, 0);
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        callback?.();
      }
    }, 50);
  };

  const changeTrack = (track: AudioTrack) => {
    if (isPlaying) {
      fadeOut(() => {
        setCurrentTrack(track);
        setTimeout(() => {
          if (isActive) {
            playAudio();
          }
        }, 100);
      });
    } else {
      setCurrentTrack(track);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setCurrentVolume(newVolume);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div className="soundscape-system">
      <audio ref={audioRef} preload="metadata" />
      
      <div className="soundscape-widget">
        <button 
          className="soundscape-toggle"
          onClick={() => setShowControls(!showControls)}
          title="Điều khiển âm thanh"
        >
          <span className="sound-icon">
            {isPlaying ? '🔊' : '🔇'}
          </span>
          <span className="sound-waves">
            {isPlaying && (
              <>
                <span className="wave wave-1"></span>
                <span className="wave wave-2"></span>
                <span className="wave wave-3"></span>
              </>
            )}
          </span>
        </button>

        {showControls && (
          <div className="soundscape-controls">
            <div className="controls-header">
              <h3>🎵 Âm thanh nền</h3>
              <button 
                className="close-controls"
                onClick={() => setShowControls(false)}
              >
                ×
              </button>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="current-track">
              {currentTrack && (
                <>
                  <div className="track-info">
                    <span className="track-icon">{currentTrack.icon}</span>
                    <div className="track-details">
                      <h4>{currentTrack.name}</h4>
                      <p>{currentTrack.description}</p>
                    </div>
                  </div>
                  
                  <div className="playback-controls">
                    <button 
                      className="play-pause-btn"
                      onClick={togglePlayPause}
                      disabled={isLoading}
                    >
                      {isLoading ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="volume-slider"
              />
              <span className="volume-value">{Math.round(currentVolume * 100)}%</span>
            </div>

            <div className="track-selection">
              <h4>Chọn âm thanh khác:</h4>
              <div className="track-grid">
                {AUDIO_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    className={`track-option ${currentTrack?.id === track.id ? 'active' : ''}`}
                    onClick={() => changeTrack(track)}
                    title={track.description}
                  >
                    <span className="track-icon">{track.icon}</span>
                    <span className="track-name">{track.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="archetype-recommendation">
              <p className="recommendation-text">
                💡 Được đề xuất cho <strong>{userArchetype === 'protector' ? 'Người Bảo Vệ' : 
                  userArchetype === 'observer' ? 'Người Quan Sát' : 
                  userArchetype === 'storyteller' ? 'Người Kể Chuyện' : 
                  'Người Sáng Tạo'}</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .soundscape-system {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }

        .soundscape-widget {
          position: relative;
        }

        .soundscape-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .soundscape-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
        }

        .sound-icon {
          font-size: 24px;
          z-index: 2;
        }

        .sound-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wave {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: wave-pulse 2s infinite;
        }

        .wave-1 {
          width: 40px;
          height: 40px;
          animation-delay: 0s;
        }

        .wave-2 {
          width: 60px;
          height: 60px;
          animation-delay: 0.5s;
        }

        .wave-3 {
          width: 80px;
          height: 80px;
          animation-delay: 1s;
        }

        @keyframes wave-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        .soundscape-controls {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 320px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          padding: 20px;
          animation: slideUp 0.3s ease-out;
        }

        .controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .controls-header h3 {
          margin: 0;
          font-size: 16px;
          color: #1f2937;
        }

        .close-controls {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          color: #dc2626;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .current-track {
          margin-bottom: 16px;
        }

        .track-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .track-icon {
          font-size: 24px;
        }

        .track-details h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }

        .track-details p {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.3;
        }

        .playback-controls {
          display: flex;
          justify-content: center;
        }

        .play-pause-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .play-pause-btn:hover {
          transform: scale(1.1);
        }

        .play-pause-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .volume-icon {
          font-size: 16px;
        }

        .volume-slider {
          flex: 1;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #667eea;
          border-radius: 50%;
          cursor: pointer;
        }

        .volume-value {
          font-size: 12px;
          color: #6b7280;
          min-width: 35px;
          text-align: right;
        }

        .track-selection h4 {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .track-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .track-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
        }

        .track-option:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .track-option.active {
          background: #dbeafe;
          border-color: #3b82f6;
          color: #1e40af;
        }

        .track-option .track-icon {
          font-size: 20px;
        }

        .track-option .track-name {
          text-align: center;
          line-height: 1.2;
        }

        .archetype-recommendation {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          color: #92400e;
        }

        .recommendation-text {
          margin: 0;
          text-align: center;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SoundscapeSystem;