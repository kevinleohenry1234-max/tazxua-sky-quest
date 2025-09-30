import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Download, Play, Pause, Loader2, Sparkles, Wand2 } from 'lucide-react';
import AIPromptGenerator from './AIPromptGenerator';

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
  const [generationProgress, setGenerationProgress] = useState(0);

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
    setGenerationProgress(0);

    try {
      // Step 1: Generate music using Suno API
      const generateResponse = await fetch('https://api.sunoapi.org/api/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer cf27cde4b79cf21c2a515bd4e1ccbd49',
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
        attempts++;
        setGenerationProgress(attempts * 10000); // Update progress (10 seconds per attempt)
        
        const statusResponse = await fetch(`https://api.sunoapi.org/api/v1/generate/record-info?taskId=${taskId}`, {
          headers: {
            'Authorization': 'Bearer cf27cde4b79cf21c2a515bd4e1ccbd49',
            'Content-Type': 'application/json'
          }
        });

        if (!statusResponse.ok) {
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
      setGenerationProgress(0);
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
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="generator" className="flex items-center gap-2 text-base">
            <Music className="w-5 h-5" />
            Tạo Nhạc
          </TabsTrigger>
          <TabsTrigger value="prompt-ai" className="flex items-center gap-2 text-base">
            <Wand2 className="w-5 h-5" />
            AI Tạo Prompt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-6 h-6 text-primary" />
                Tạo Nhạc Dân Tộc Bằng AI
              </CardTitle>
              <p className="text-muted-foreground">
                Nhập mô tả để tạo nhạc không lời với nhạc cụ dân tộc Việt Nam
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <label htmlFor="prompt" className="text-base font-medium">
                  Mô tả nhạc bạn muốn tạo
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Ví dụ: A peaceful instrumental piece featuring traditional Vietnamese ethnic instruments that captures the essence of Tà Xùa mountains at dawn..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none text-base leading-relaxed"
                />
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-blue-700">
                    Mẹo: Sử dụng tab "AI Tạo Prompt" để tạo mô tả chi tiết bằng AI
                  </p>
                </div>
              </div>

              <Button 
                 onClick={generateMusic}
                 disabled={!prompt.trim() || isGenerating}
                 className="w-full h-12 text-base font-medium"
                 size="lg"
               >
                 {isGenerating ? (
                   <>
                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                     Đang tạo nhạc... ({Math.floor(generationProgress / 1000)}s)
                   </>
                 ) : (
                   <>
                     <Music className="w-5 h-5 mr-2" />
                     Tạo Nhạc AI
                   </>
                 )}
               </Button>

               {isGenerating && (
                 <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                   <div className="flex justify-between text-sm font-medium">
                     <span>Tiến độ tạo nhạc</span>
                     <span className="text-primary">{Math.floor(generationProgress / 1000)}s / 300s</span>
                   </div>
                   <div className="w-full bg-secondary rounded-full h-3">
                     <div 
                       className="bg-primary h-3 rounded-full transition-all duration-1000 shadow-sm"
                       style={{ width: `${Math.min((generationProgress / 300000) * 100, 100)}%` }}
                     />
                   </div>
                   <p className="text-xs text-muted-foreground text-center">
                     Quá trình tạo nhạc có thể mất vài phút. Vui lòng chờ đợi...
                   </p>
                 </div>
               )}
             </CardContent>
           </Card>

          {/* Generated Music List */}
          {generatedMusic.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Nhạc Đã Tạo ({generatedMusic.length})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Danh sách các bản nhạc đã được tạo bởi AI
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedMusic.map((music) => (
                  <Card key={music.id} className="border-l-4 border-l-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs text-muted-foreground">
                              {music.createdAt.toLocaleString('vi-VN')}
                            </p>
                            {music.status === 'generating' && (
                              <Badge variant="secondary" className="text-xs">
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Đang tạo...
                              </Badge>
                            )}
                            {music.status === 'completed' && (
                              <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                                Hoàn thành
                              </Badge>
                            )}
                            {music.status === 'error' && (
                              <Badge variant="destructive" className="text-xs">
                                Lỗi
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm leading-relaxed line-clamp-3 mb-3">{music.prompt}</p>
                          
                          {music.status === 'error' && music.errorMessage && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                              {music.errorMessage}
                            </div>
                          )}
                        </div>
                        
                        {music.status === 'completed' && music.audioUrl && (
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => togglePlay(music.id, music.audioUrl)}
                              className="h-10 w-10 p-0"
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
                              className="h-10 w-10 p-0"
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
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prompt-ai">
          <AIPromptGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIMusicGenerator;