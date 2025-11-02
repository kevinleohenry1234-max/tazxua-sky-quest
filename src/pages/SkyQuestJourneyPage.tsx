import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkyQuest } from '../contexts/SkyQuestContext';
import { 
  Mountain, 
  Leaf, 
  Play, 
  BookOpen, 
  Trophy, 
  Star,
  MapPin,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Target,
  ArrowLeft,
  CheckCircle,
  Circle,
  Lock,
  Camera,
  FileText,
  Loader2,
  Cloud,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SkyQuestJourneyPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateProgress, switchMode, clearSession } = useSkyQuest();
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  // Redirect if no active session
  useEffect(() => {
    if (!state.sessionData || !state.sessionId) {
      navigate('/skyquest');
    }
  }, [state.sessionData, state.sessionId, navigate]);

  if (!state.sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-slate-600">Đang tải hành trình...</p>
        </div>
      </div>
    );
  }

  const { session, mode, steps, totals } = state.sessionData;
  const progressPercentage = (totals.completed / totals.total) * 100;
  const handleStepAction = async (stepId: string, action: 'start' | 'complete' | 'view') => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    if (action === 'start') {
      await updateProgress(stepId, 'in_progress');
    } else if (action === 'complete') {
      await updateProgress(stepId, 'done');
    } else if (action === 'view') {
      setSelectedStep(stepId);
    }
  };

  const handleSwitchMode = async () => {
    const newMode = mode.key === 'calm' ? 'energetic' : 'calm';
    if (confirm(`Bạn có chắc muốn chuyển sang mode ${newMode === 'calm' ? 'Mây Mây Sương Sương' : 'Hăng Say Săn Thưởng'}? Tiến độ hiện tại sẽ được lưu lại.`)) {
      await switchMode(newMode);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'journal': return FileText;
      case 'photo': return Camera;
      case 'action': return Target;
      case 'interview': return Users;
      case 'social': return Sparkles;
      default: return Circle;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
      case 'verified': return CheckCircle;
      case 'in_progress':
      case 'available': return Circle;
      case 'locked':
      default: return Lock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="pb-20 md:pb-0">
        {/* Progress Header */}
        <div className={`relative py-16 overflow-hidden ${
          mode.key === 'calm' 
            ? 'bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500' 
            : 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/10" />
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Button
                onClick={() => navigate('/skyquest')}
                variant="ghost"
                className="text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </Button>
              
              <Button
                onClick={handleSwitchMode}
                variant="ghost"
                className="text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Đổi mode
              </Button>
            </div>
            
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                  {mode.key === 'calm' ? <Cloud className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                </div>
                <h1 className="text-4xl font-bold">
                  {mode.name}
                </h1>
              </div>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {mode.description}
              </p>
              
              {/* Progress Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold">{totals.points}</div>
                  <div className="text-sm text-white/80">Điểm</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold">{totals.exp}</div>
                  <div className="text-sm text-white/80">EXP</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold">{totals.completed}</div>
                  <div className="text-sm text-white/80">Hoàn thành</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-white/80">Tiến độ</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-white/20 rounded-full h-4 backdrop-blur-sm">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Hành trình của bạn
          </h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(step.type);
              const StatusIcon = getStepStatusIcon(step.status);
              const isLocked = step.status === 'locked';
              const isCompleted = step.status === 'done' || step.status === 'verified';
              
              return (
                <div
                  key={step.id}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isLocked
                      ? 'bg-gray-100 border-gray-200 opacity-60'
                      : isCompleted
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    {/* Step Number */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isLocked
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-indigo-500 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Step Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : isLocked
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      <StepIcon className="w-6 h-6" />
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        isLocked ? 'text-gray-500' : 'text-slate-800'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mb-3 ${
                        isLocked ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        {step.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`flex items-center ${
                          isLocked ? 'text-gray-400' : 'text-indigo-600'
                        }`}>
                          <Trophy className="w-4 h-4 mr-1" />
                          {step.points} điểm
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isCompleted
                            ? 'bg-green-100 text-green-800'
                            : isLocked
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {step.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Icon */}
                    <div className={`w-8 h-8 ${
                      isCompleted
                        ? 'text-green-500'
                        : isLocked
                        ? 'text-gray-400'
                        : 'text-indigo-500'
                    }`}>
                      <StatusIcon className="w-8 h-8" />
                    </div>
                    
                    {/* Action Button */}
                    {!isLocked && (
                      <Button
                        onClick={() => handleStepAction(step.id, isCompleted ? 'view' : step.status === 'available' ? 'start' : 'complete')}
                        variant={isCompleted ? 'outline' : 'default'}
                        className={isCompleted ? 'border-green-300 text-green-700 hover:bg-green-50' : ''}
                      >
                        {isCompleted ? 'Xem chi tiết' : step.status === 'available' ? 'Bắt đầu' : 'Hoàn thành'}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyQuestJourneyPage;