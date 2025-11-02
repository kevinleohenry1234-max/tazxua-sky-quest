import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '../components/ui/button';
import { 
  Cloud, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Circle,
  Camera,
  Wind,
  Sunrise,
  Heart,
  Leaf,
  Award,
  RefreshCw
} from 'lucide-react';
import { questModes } from '../data/skyquest-challenges';

interface ChallengeProgress {
  id: string;
  completed: boolean;
  completedAt?: Date;
  reflection?: string;
}

export const SkyQuestCalm: React.FC = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [progress, setProgress] = useState<ChallengeProgress[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [expPoints, setExpPoints] = useState(0);

  const calmMode = questModes.find(mode => mode.id === 'calm');
  const challenges = calmMode?.challenges || [];

  useEffect(() => {
    // Initialize progress for all challenges
    const initialProgress = challenges.map(challenge => ({
      id: challenge.id,
      completed: false
    }));
    setProgress(initialProgress);
  }, [challenges]);

  const handleCompleteChallenge = () => {
    const updatedProgress = [...progress];
    updatedProgress[currentChallenge] = {
      ...updatedProgress[currentChallenge],
      completed: true,
      completedAt: new Date(),
        reflection: userReflection
      };
      setProgress(updatedProgress);
      setExpPoints(prev => prev + challenges[currentChallenge].points);
    
    // Show completion animation
    setShowCompletion(true);
    setTimeout(() => {
      setShowCompletion(false);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
      }
    }, 2000);
    
    setUserReflection('');
  };

  const handleSwitchMode = () => {
    navigate('/sky-quest/energetic');
  };

  const completedChallenges = progress.filter(p => p.completed).length;
  const progressPercentage = (completedChallenges / challenges.length) * 100;
  const isAllCompleted = completedChallenges === challenges.length;

  const getChallengeIcon = (index: number) => {
    switch (index) {
      case 0: return <Cloud className="w-6 h-6" />;
      case 1: return <Sunrise className="w-6 h-6" />;
      case 2: return <Wind className="w-6 h-6" />;
      case 3: return <Heart className="w-6 h-6" />;
      case 4: return <Leaf className="w-6 h-6" />;
      default: return <Circle className="w-6 h-6" />;
    }
  };

  if (isAllCompleted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-violet-50 to-white">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="animate-float mb-8">
              <Award className="w-24 h-24 mx-auto text-violet-600 mb-6" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              🌸 Chúc mừng bạn!
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Cảm ơn bạn đã cùng Tà Xùa thả mình trong bình yên
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-violet-200 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                🏆 Huy hiệu Bình An
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Bạn đã hoàn thành hành trình "Mây Mây Sương Sương" và nhận được {expPoints} điểm kinh nghiệm
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Thành tựu đạt được:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Kết nối sâu sắc với thiên nhiên</li>
                    <li>• Tìm thấy sự bình yên nội tâm</li>
                    <li>• Ghi lại những khoảnh khắc đáng nhớ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Phần thưởng:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• {expPoints} điểm EXP</li>
                    <li>• Huy hiệu "Bình An"</li>
                    <li>• Voucher giảm giá 15%</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleSwitchMode}
                className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Thử "Hăng Say Săn Thưởng"
                <RefreshCw className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => navigate('/sky-quest')}
                variant="outline"
                className="border-violet-300 text-violet-600 hover:bg-violet-50 font-semibold px-8 py-3 rounded-xl"
              >
                Về trang chủ Sky Quest
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-violet-50 to-white">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-violet-100">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => navigate('/sky-quest')}
                variant="outline"
                className="border-violet-200 text-violet-600 hover:bg-violet-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800">Mây Mây Sương Sương</h1>
                <p className="text-violet-600">Hành trình bình yên</p>
              </div>
              
              <Button
                onClick={handleSwitchMode}
                className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white"
              >
                Đổi phong cách
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/50 py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">
                Tiến độ: {completedChallenges}/{challenges.length}
              </span>
              <span className="text-sm font-medium text-violet-600">
                {expPoints} EXP
              </span>
            </div>
            <div className="w-full bg-violet-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-sky-400 to-violet-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quest Line */}
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {challenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    progress[index]?.completed
                      ? 'bg-violet-100 border-violet-300'
                      : index === currentChallenge
                      ? 'bg-sky-100 border-sky-300 ring-2 ring-sky-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      progress[index]?.completed
                        ? 'bg-violet-500 text-white'
                        : index === currentChallenge
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress[index]?.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        getChallengeIcon(index)
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800 mb-1">
                      Thử thách {index + 1}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {challenge.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Challenge */}
            {currentChallenge < challenges.length && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-violet-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {getChallengeIcon(currentChallenge)}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    {challenges[currentChallenge].title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    {challenges[currentChallenge].description}
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Chia sẻ cảm nhận của bạn (tùy chọn):
                    </label>
                    <textarea
                      value={userReflection}
                      onChange={(e) => setUserReflection(e.target.value)}
                      placeholder="Hãy ghi lại những suy nghĩ, cảm xúc hoặc trải nghiệm của bạn..."
                      className="w-full p-4 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-300 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleCompleteChallenge}
                      className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl"
                    >
                      Hoàn thành thử thách
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completion Animation */}
        {showCompletion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center animate-pulse">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Thử thách hoàn thành!
              </h3>
              <p className="text-slate-600">
                +{challenges[currentChallenge]?.points} điểm kinh nghiệm
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
};

export default SkyQuestCalm;