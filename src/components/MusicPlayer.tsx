import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  category: string;
  description: string;
  backgroundImage?: string;
  audioUrl?: string;
}

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackId: number | null;
  onTrackChange: (trackId: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const MusicPlayer = ({ 
  tracks, 
  currentTrackId, 
  onTrackChange, 
  isPlaying, 
  onPlayPause 
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks.find(track => track.id === currentTrackId);
  const currentIndex = tracks.findIndex(track => track.id === currentTrackId);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrackId]);

  // Effect to handle play/pause when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackId]);

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    onTrackChange(tracks[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    onTrackChange(tracks[nextIndex].id);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    // Show track list when no track is selected
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {tracks.map((track) => (
          <Card key={track.id} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full w-12 h-12"
                    onClick={() => {
                      onTrackChange(track.id);
                      onPlayPause();
                    }}
                    aria-label={`Phát ${track.title}`}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  {track.backgroundImage && (
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 bg-cover bg-center -z-10"
                      style={{ backgroundImage: `url(${track.backgroundImage})` }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-md">
                    {track.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">{track.category}</Badge>
                <div className="text-sm text-muted-foreground">{track.duration}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/95 to-black/80 text-white">
      {/* Background Image */}
      {currentTrack.backgroundImage && (
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentTrack.backgroundImage})` }}
        />
      )}
      
      <div className="relative p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{currentTrack.title}</h3>
            <p className="text-white/80 text-sm truncate">{currentTrack.artist}</p>
            <p className="text-white/60 text-xs mt-1 line-clamp-2">{currentTrack.description}</p>
            <Badge variant="outline" className="mt-2 text-xs border-white/30 text-white/80">
              {currentTrack.category}
            </Badge>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mx-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="text-white hover:bg-white/20"
              aria-label="Bài trước"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={onPlayPause}
              className="text-white hover:bg-white/20 rounded-full w-12 h-12"
              aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="text-white hover:bg-white/20"
              aria-label="Bài tiếp theo"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(false);
              }}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || '/audio/demo.mp3'}
        preload="metadata"
      />
    </div>
  );
};

export default MusicPlayer;