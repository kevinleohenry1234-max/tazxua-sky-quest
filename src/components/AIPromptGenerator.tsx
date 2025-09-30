import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Copy, RefreshCw, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePromptWithGemini, generateFallbackPrompt } from '@/api/gemini';

interface PromptSuggestion {
  id: string;
  prompt: string;
  category: string;
  createdAt: Date;
}

const AIPromptGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptHistory, setPromptHistory] = useState<PromptSuggestion[]>([]);
  const { toast } = useToast();

  const ethnicInstruments = [
    { value: 'sao-hmong', label: 'Sáo H\'Mông' },
    { value: 'dan-moi', label: 'Đàn Môi' },
    { value: 'kheng', label: 'Khèn' },
    { value: 'trong-com', label: 'Trống Cơm' },
    { value: 'dan-tinh', label: 'Đàn Tính' },
    { value: 'sao-truc', label: 'Sáo Trúc' },
    { value: 'cong-chieng', label: 'Cồng Chiêng' },
    { value: 'dan-bau', label: 'Đàn Bầu' }
  ];

  const moods = [
    { value: 'peaceful', label: 'Bình yên, thư thái' },
    { value: 'mystical', label: 'Huyền bí, ma mị' },
    { value: 'joyful', label: 'Vui tươi, sôi động' },
    { value: 'melancholic', label: 'Buồn man mác, hoài niệm' },
    { value: 'spiritual', label: 'Tâm linh, thiêng liêng' },
    { value: 'romantic', label: 'Lãng mạn, ngọt ngào' },
    { value: 'energetic', label: 'Mạnh mẽ, năng động' },
    { value: 'contemplative', label: 'Suy tư, trầm lặng' }
  ];

  const timesOfDay = [
    { value: 'dawn', label: 'Bình minh' },
    { value: 'morning', label: 'Buổi sáng' },
    { value: 'noon', label: 'Buổi trưa' },
    { value: 'afternoon', label: 'Buổi chiều' },
    { value: 'sunset', label: 'Hoàng hôn' },
    { value: 'evening', label: 'Buổi tối' },
    { value: 'night', label: 'Đêm khuya' },
    { value: 'midnight', label: 'Nửa đêm' }
  ];

  const generatePrompt = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập ý tưởng của bạn",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Construct context for Gemini
      const context = {
        userIdea: userInput.trim(),
        instrument: selectedInstrument ? ethnicInstruments.find(i => i.value === selectedInstrument)?.label : '',
        mood: selectedMood ? moods.find(m => m.value === selectedMood)?.label : '',
        timeOfDay: selectedTimeOfDay ? timesOfDay.find(t => t.value === selectedTimeOfDay)?.label : ''
      };

      const systemPrompt = `You are an AI assistant specialized in creating detailed music prompts for ethnic Vietnamese music generation. Your task is to create rich, descriptive prompts in English that capture the essence of Vietnamese ethnic music, particularly from the mountainous regions like Tà Xùa.

Guidelines:
1. Focus on traditional Vietnamese ethnic instruments and their unique sounds
2. Incorporate natural elements from Vietnamese mountains and forests
3. Use descriptive language that evokes emotions and atmosphere
4. Keep prompts between 50-150 words
5. Always write in English for the music generation API
6. Include specific musical elements like tempo, rhythm, and dynamics

Context provided:
- User's idea: ${context.userIdea}
- Preferred instrument: ${context.instrument || 'any traditional Vietnamese ethnic instrument'}
- Desired mood: ${context.mood || 'peaceful and contemplative'}
- Time of day: ${context.timeOfDay || 'any time'}

Create a detailed English prompt for generating instrumental ethnic Vietnamese music based on this context.`;

      let generatedText = '';

      try {
        // Try Gemini API first
        generatedText = await generatePromptWithGemini(systemPrompt, context);
      } catch (error) {
        console.error('Gemini API failed, using fallback:', error);
        // Use fallback generation if Gemini API fails
        generatedText = generateFallbackPrompt(context);
      }

      setGeneratedPrompt(generatedText);

      // Add to history
      const newPrompt: PromptSuggestion = {
        id: Date.now().toString(),
        prompt: generatedText,
        category: context.mood || 'general',
        createdAt: new Date()
      };

      setPromptHistory(prev => [newPrompt, ...prev.slice(0, 9)]); // Keep last 10

      toast({
        title: "Thành công!",
        description: "Đã tạo prompt cho nhạc dân tộc",
      });

    } catch (error) {
      console.error('Error generating prompt:', error);
      
      // Use fallback generation
      const context = {
        userIdea: userInput.trim(),
        instrument: selectedInstrument ? ethnicInstruments.find(i => i.value === selectedInstrument)?.label : '',
        mood: selectedMood ? moods.find(m => m.value === selectedMood)?.label : '',
        timeOfDay: selectedTimeOfDay ? timesOfDay.find(t => t.value === selectedTimeOfDay)?.label : ''
      };
      const fallbackPrompt = generateFallbackPrompt(context);

      setGeneratedPrompt(fallbackPrompt);

      toast({
        title: "Đã tạo prompt",
        description: "Sử dụng bộ tạo prompt nội bộ",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép",
      description: "Prompt đã được sao chép vào clipboard",
    });
  };

  const clearForm = () => {
    setUserInput('');
    setSelectedInstrument('');
    setSelectedMood('');
    setSelectedTimeOfDay('');
    setGeneratedPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Main Generator Card */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Tạo Prompt Nhạc Dân Tộc
          </CardTitle>
          <p className="text-muted-foreground">
            Sử dụng AI để tạo prompt chi tiết cho việc sáng tác nhạc không lời với nhạc cụ dân tộc Việt Nam
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* User Input Section */}
          <div className="space-y-3">
            <Label htmlFor="user-idea" className="text-base font-medium">
              Ý tưởng của bạn *
            </Label>
            <Textarea
              id="user-idea"
              placeholder="Ví dụ: Âm thanh của núi rừng Tà Xùa vào buổi sáng sớm, tiếng chim hót, gió thổi qua lá cây, sương mù bao phủ đỉnh núi..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
              className="resize-none text-base leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              Mô tả chi tiết cảm xúc, khung cảnh hoặc câu chuyện bạn muốn thể hiện qua âm nhạc
            </p>
          </div>

          {/* Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Nhạc cụ dân tộc</Label>
              <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn nhạc cụ" />
                </SelectTrigger>
                <SelectContent>
                  {ethnicInstruments.map((instrument) => (
                    <SelectItem key={instrument.value} value={instrument.value}>
                      {instrument.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Tâm trạng</Label>
              <Select value={selectedMood} onValueChange={setSelectedMood}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn tâm trạng" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Thời gian trong ngày</Label>
              <Select value={selectedTimeOfDay} onValueChange={setSelectedTimeOfDay}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  {timesOfDay.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={generatePrompt}
              disabled={!userInput.trim() || isGenerating}
              className="flex-1 h-12 text-base font-medium"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Đang tạo prompt...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Tạo Prompt AI
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={clearForm}
              className="h-12 px-6"
              size="lg"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Prompt Display */}
      {generatedPrompt && (
        <Card className="border-green-200 bg-green-50/50 shadow-md">
          <CardHeader className="bg-green-100/50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-green-800">
                <Music className="w-5 h-5" />
                Prompt Đã Tạo
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedPrompt)}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Copy className="w-4 h-4 mr-2" />
                Sao chép
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white border border-green-200 p-6 rounded-lg shadow-sm">
              <p className="text-base leading-relaxed text-gray-800">{generatedPrompt}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 p-3 bg-green-100/50 rounded-lg">
              <Music className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                Prompt này được tối ưu hóa cho việc tạo nhạc không lời với nhạc cụ dân tộc Việt Nam
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompt History */}
      {promptHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Lịch sử Prompt
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Các prompt đã tạo trước đó
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {promptHistory.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed line-clamp-3 mb-3">{item.prompt}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.createdAt.toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(item.prompt)}
                    className="shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIPromptGenerator;