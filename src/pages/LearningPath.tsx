import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Lock, Play, Clock, Star, Trophy, Target, ArrowRight, ChevronRight, ChevronDown, ChevronUp, Users, Calendar, Award, Zap, Mountain, Leaf, Camera, Music, Palette, Heart, Gift, Sparkles, TrendingUp, Eye, Download, Share2, MapPin, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'article' | 'interactive' | 'quiz';
  completed: boolean;
  path?: string;
}

const LearningPath = () => {
  const navigate = useNavigate();
  const [userInterest, setUserInterest] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interest = localStorage.getItem('userInterest') || 'nature';
    setUserInterest(interest);
    
    const completed = JSON.parse(localStorage.getItem('completedLearningSteps') || '[]');
    setCompletedSteps(completed);
  }, []);

  const getLearningSteps = (interest: string): LearningStep[] => {
    const baseSteps = [
      {
        id: 'intro',
        title: 'Giới thiệu về Tà Xùa',
        description: 'Tìm hiểu lịch sử và vị trí địa lý của Tà Xùa',
        duration: '5 phút',
        type: 'video' as const,
        completed: completedSteps.includes('intro'),
        path: '/about'
      },
      {
        id: 'weather',
        title: 'Thời tiết và mùa du lịch',
        description: 'Hiểu về khí hậu và thời điểm tốt nhất để ghé thăm',
        duration: '3 phút',
        type: 'article' as const,
        completed: completedSteps.includes('weather')
      }
    ];

    const interestSpecificSteps: Record<string, LearningStep[]> = {
      nature: [
        {
          id: 'flora',
          title: 'Hệ thực vật đặc trưng',
          description: 'Khám phá các loài cây đặc hữu của Tà Xùa',
          duration: '4 phút',
          type: 'interactive' as const,
          completed: completedSteps.includes('flora')
        },
        {
          id: 'peaks',
          title: 'Các đỉnh núi nổi tiếng',
          description: 'Tìm hiểu về đỉnh Phu Sang và các đỉnh khác',
          duration: '6 phút',
          type: 'video' as const,
          completed: completedSteps.includes('peaks')
        }
      ],
      culture: [
        {
          id: 'hmong',
          title: 'Văn hóa H\'Mông',
          description: 'Tìm hiểu về đời sống và truyền thống của người H\'Mông',
          duration: '7 phút',
          type: 'video' as const,
          completed: completedSteps.includes('hmong')
        },
        {
          id: 'festivals',
          title: 'Lễ hội truyền thống',
          description: 'Khám phá các lễ hội và phong tục địa phương',
          duration: '5 phút',
          type: 'article' as const,
          completed: completedSteps.includes('festivals')
        }
      ],
      adventure: [
        {
          id: 'trekking',
          title: 'Các tuyến trekking',
          description: 'Hướng dẫn chi tiết các tuyến đường leo núi',
          duration: '8 phút',
          type: 'interactive' as const,
          completed: completedSteps.includes('trekking')
        },
        {
          id: 'safety',
          title: 'An toàn khi leo núi',
          description: 'Những điều cần biết để đảm bảo an toàn',
          duration: '6 phút',
          type: 'article' as const,
          completed: completedSteps.includes('safety'),
          path: '/safety'
        }
      ],
      photography: [
        {
          id: 'spots',
          title: 'Điểm chụp ảnh đẹp',
          description: 'Khám phá các góc chụp ảnh tuyệt vời nhất',
          duration: '5 phút',
          type: 'interactive' as const,
          completed: completedSteps.includes('spots')
        },
        {
          id: 'techniques',
          title: 'Kỹ thuật chụp ảnh núi',
          description: 'Mẹo chụp ảnh phong cảnh và săn mây',
          duration: '7 phút',
          type: 'video' as const,
          completed: completedSteps.includes('techniques')
        }
      ]
    };

    const finalSteps = [
      {
        id: 'planning',
        title: 'Lập kế hoạch chuyến đi',
        description: 'Hướng dẫn lập kế hoạch chi tiết cho chuyến du lịch',
        duration: '10 phút',
        type: 'interactive' as const,
        completed: completedSteps.includes('planning')
      },
      {
        id: 'quiz',
        title: 'Kiểm tra kiến thức',
        description: 'Hoàn thành bài kiểm tra để nhận phần thưởng',
        duration: '5 phút',
        type: 'quiz' as const,
        completed: completedSteps.includes('quiz')
      }
    ];

    return [...baseSteps, ...(interestSpecificSteps[interest] || []), ...finalSteps];
  };

  const steps = getLearningSteps(userInterest);
  const progress = (completedSteps.length / steps.length) * 100;

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      const newCompleted = [...completedSteps, stepId];
      setCompletedSteps(newCompleted);
      localStorage.setItem('completedLearningSteps', JSON.stringify(newCompleted));
    }
  };

  const handleStepClick = (step: LearningStep, index: number) => {
    if (step.path) {
      navigate(step.path);
    } else {
      // Simulate completing the step
      handleStepComplete(step.id);
      setCurrentStep(index + 1);
    }
  };

  const handleFinishLearning = () => {
    localStorage.setItem('learningPathCompleted', 'true');
    navigate('/explore');
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return BookOpen;
      case 'interactive': return MapPin;
      case 'quiz': return Award;
      default: return Circle;
    }
  };

  const interestTitles: Record<string, string> = {
    nature: 'Thiên nhiên & Phong cảnh',
    culture: 'Văn hóa & Con người',
    adventure: 'Phiêu lưu & Thể thao',
    photography: 'Nhiếp ảnh & Sáng tạo'
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Lộ Trình Học Tập</h1>
            </div>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Khám phá Tà Xùa qua hành trình học tập có hệ thống và thú vị
            </p>
          </div>
        </div>

        <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Hành trình học tập của bạn
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {interestTitles[userInterest] || 'Khám phá Tà Xùa'}
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>Tiến độ</span>
                <span>{completedSteps.length}/{steps.length} bước</span>
              </div>
              <Progress value={progress} className="h-3 bg-white/20" />
            </div>
          </div>

          {/* Learning Steps */}
          <div className="space-y-4 mb-12">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(step.type);
              const isCompleted = step.completed;
              const isCurrent = index === currentStep && !isCompleted;
              const isLocked = index > currentStep && !isCompleted;

              return (
                <Card
                  key={step.id}
                  className={`transition-all duration-300 cursor-pointer ${
                    isCompleted 
                      ? 'bg-green-500/20 border-green-400/50' 
                      : isCurrent
                      ? 'bg-blue-500/20 border-blue-400/50 ring-2 ring-blue-400/30'
                      : isLocked
                      ? 'bg-gray-500/10 border-gray-400/30 opacity-60'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                  onClick={() => !isLocked && handleStepClick(step, index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : isCurrent
                          ? 'bg-blue-500'
                          : 'bg-white/20'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <StepIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-2">
                          {step.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.duration}
                          </span>
                          <span className="capitalize">{step.type}</span>
                        </div>
                      </div>
                      
                      {!isLocked && (
                        <ArrowRight className="w-5 h-5 text-white/60" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {progress === 100 ? (
              <Button
                onClick={handleFinishLearning}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Hoàn thành và khám phá Tà Xùa
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/explore')}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                Bỏ qua và khám phá ngay
              </Button>
            )}
            
            <div className="text-white/70 text-sm">
              <p>💡 Hoàn thành hành trình học tập để nhận điểm thưởng Sky Quest!</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </Layout>
  );
};

export default LearningPath;