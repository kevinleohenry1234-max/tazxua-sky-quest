import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Music, Loader2, Download, Play, Pause } from 'lucide-react';

interface GeneratedMusic {
  id: string;
  prompt: string;
  audioUrl: string;
  status: 'generating' | 'completed' | 'error';
  createdAt: Date;
  errorMessage?: string;
}

const AIMusicGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<GeneratedMusic[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const generateMusic = async () => {
    if (!prompt.trim()) return;

    const tempId = Date.now().toString();
    const newMusic: GeneratedMusic = {
      id: tempId,
      prompt: prompt.trim(),
      audioUrl: '',
      status: 'generating',
      createdAt: new Date()
    };

    setGeneratedMusic(prev => [newMusic, ...prev]);
    setIsGenerating(true);

    try {
      // Step 1: Generate music using Suno API
      const generateResponse = await fetch('https://api.sunoapi.org/api/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 26651566891361849fc9cf844823f64f',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: "Classical",
          title: `AI Generated Music - ${Date.now()}`,
          customMode: true,
          instrumental: true,
          model: "V3_5",
          negativeTags: "Heavy Metal, Upbeat Drums",
          vocalGender: "m",
          styleWeight: 0.65,
          weirdnessConstraint: 0.65,
          audioWeight: 0.65,
          callBackUrl: "https://api.example.com/callback"
        })
      });

      const generateResult = await generateResponse.json();
      
      // Debug logging
      console.log('Suno API Response:', generateResult);
      
      if (!generateResponse.ok || !generateResult.data) {
        throw new Error(`API Error: ${generateResult.msg || 'Failed to generate music'}`);
      }

      // Extract task ID from response
      let taskId;
      if (generateResult.data.taskId) {
        taskId = generateResult.data.taskId;
      } else if (Array.isArray(generateResult.data)) {
        taskId = generateResult.data.join(',');
      } else if (typeof generateResult.data === 'string') {
        taskId = generateResult.data;
      } else if (generateResult.data && generateResult.data.id) {
        taskId = generateResult.data.id;
      } else if (generateResult.data && Array.isArray(generateResult.data) && generateResult.data.length > 0) {
        // Handle case where data is array of objects with id
        taskId = generateResult.data.map(item => item.id).join(',');
      } else {
        console.error('Unexpected response format:', generateResult);
        throw new Error(`Invalid response format from Suno API. Received: ${JSON.stringify(generateResult.data)}`);
      }

      // Step 2: Poll for completion and get audio URL
      let attempts = 0;
      const maxAttempts = 30; // 5 minutes max wait time
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
        
        const statusResponse = await fetch(`https://api.sunoapi.org/api/v1/generate/record-info?taskId=${taskId}`, {
          headers: {
            'Authorization': 'Bearer 26651566891361849fc9cf844823f64f',
            'Content-Type': 'application/json'
          }
        });

        if (!statusResponse.ok) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error(`Status check failed: ${statusResponse.status}`);
          }
          continue; // Try again instead of throwing immediately
        }

        const statusResult = await statusResponse.json();
        console.log('Status check result:', statusResult);
        
        // Handle different response formats
        if (statusResult.data && statusResult.data.status === 'SUCCESS' && statusResult.data.response) {
          const musicData = statusResult.data.response.data || statusResult.data.response.sunoData;
          if (musicData && musicData.length > 0) {
            const track = musicData[0];
            if (track.audio_url || track.audioUrl) {
              // Update the music item with the audio URL
              setGeneratedMusic(prev => 
                prev.map(music => 
                  music.id === tempId 
                    ? { ...music, audioUrl: track.audio_url || track.audioUrl, status: 'completed' }
                    : music
                )
              );
              break;
            }
          }
        } else if (statusResult.data && Array.isArray(statusResult.data) && statusResult.data.length > 0) {
          // Handle direct array response
          const musicData = statusResult.data[0];
          if (musicData.status === 'complete' && (musicData.audio_url || musicData.audioUrl)) {
            setGeneratedMusic(prev => 
              prev.map(music => 
                music.id === tempId 
                  ? { ...music, audioUrl: musicData.audio_url || musicData.audioUrl, status: 'completed' }
                  : music
              )
            );
            break;
          }
        }
        
        attempts++;
      }

      if (attempts >= maxAttempts) {
        throw new Error('Music generation timed out');
      }

    } catch (error) {
      console.error('Error generating music:', error);
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo nhạc';
      setGeneratedMusic(prev => 
        prev.map(music => 
          music.id === tempId 
            ? { ...music, status: 'error', errorMessage }
            : music
        )
      );
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  const togglePlay = (musicId: string, audioUrl: string) => {
    if (playingId === musicId) {
      // Pause current
      const audio = document.getElementById(`audio-${musicId}`) as HTMLAudioElement;
      audio?.pause();
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      if (playingId) {
        const currentAudio = document.getElementById(`audio-${playingId}`) as HTMLAudioElement;
        currentAudio?.pause();
      }
      
      // Play new audio
      const audio = document.getElementById(`audio-${musicId}`) as HTMLAudioElement;
      if (audio) {
        audio.play();
        setPlayingId(musicId);
      }
    }
  };

  const downloadMusic = (audioUrl: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `ai-music-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Tạo Nhạc Cùng Nhạc Cụ Dân Tộc Bằng AI
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Mô tả âm nhạc bạn muốn tạo, AI sẽ sáng tác nhạc với âm thanh nhạc cụ dân tộc H'Mông
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ví dụ: Một bản nhạc du dương với tiếng sáo H'Mông, thể hiện sự bình yên của núi rừng Tà Xùa vào buổi sáng sớm..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button 
            onClick={generateMusic}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang tạo nhạc...
              </>
            ) : (
              <>
                <Music className="w-4 h-4 mr-2" />
                Tạo Nhạc
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Music List */}
      {generatedMusic.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Nhạc Đã Tạo</h3>
          {generatedMusic.map((music) => (
            <Card key={music.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-2">
                      {music.createdAt.toLocaleString('vi-VN')}
                    </p>
                    <p className="text-sm line-clamp-3">{music.prompt}</p>
                    <div className="mt-2">
                      {music.status === 'generating' && (
                        <Badge variant="secondary" className="text-xs">
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Đang tạo...
                        </Badge>
                      )}
                      {music.status === 'completed' && (
                        <Badge variant="default" className="text-xs">
                          Hoàn thành
                        </Badge>
                      )}
                      {music.status === 'error' && (
                        <div>
                          <Badge variant="destructive" className="text-xs">
                            Lỗi
                          </Badge>
                          {music.errorMessage && (
                            <p className="text-xs text-red-600 mt-1">{music.errorMessage}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {music.status === 'completed' && music.audioUrl && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePlay(music.id, music.audioUrl)}
                      >
                        {playingId === music.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadMusic(music.audioUrl, music.prompt)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <audio
                        id={`audio-${music.id}`}
                        src={music.audioUrl}
                        onEnded={() => setPlayingId(null)}
                        preload="metadata"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIMusicGenerator;