import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '../components/ui/button';
import { 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Circle,
  Camera,
  MapPin,
  Users,
  Share2,
  Edit3,
  Trophy,
  RefreshCw,
  Upload,
  Star
} from 'lucide-react';
import { questModes } from '../data/skyquest-challenges';

interface ChallengeProgress {
  id: string;
  completed: boolean;
  completedAt?: Date;
  proof?: {
    type: 'photo' | 'gps' | 'social' | 'text';
    data: string;
  };
  score: number;
}

export const SkyQuestEnergetic: React.FC = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [progress, setProgress] = useState<ChallengeProgress[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [proofData, setProofData] = useState('');
  const [expPoints, setExpPoints] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const energeticMode = questModes.find(mode => mode.id === 'energetic');
  const challenges = energeticMode?.challenges || [];

  useEffect(() => {
    // Initialize progress for all challenges
    const initialProgress = challenges.map(challenge => ({
      id: challenge.id,
      completed: false,
      score: 0
    }));
    setProgress(initialProgress);
  }, [challenges]);

  const handleCompleteChallenge = () => {
    const challengePoints = challenges[currentChallenge].points;
    const bonusScore = Math.floor(Math.random() * 21) + 80; // 80-100 bonus score
    
    const updatedProgress = [...progress];
    updatedProgress[currentChallenge] = {
      ...updatedProgress[currentChallenge],
      completed: true,
      completedAt: new Date(),
      proof: {
        type: getProofType(currentChallenge),
        data: proofData
      },
      score: bonusScore
    };
    setProgress(updatedProgress);
    setExpPoints(prev => prev + challengePoints);
    setTotalScore(prev => prev + bonusScore);
    
    // Show completion animation
    setShowCompletion(true);
    setTimeout(() => {
      setShowCompletion(false);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
      }
    }, 3000);
    
    setProofData('');
  };

  const getProofType = (challengeIndex: number): 'photo' | 'gps' | 'social' | 'text' => {
    switch (challengeIndex) {
      case 0: return 'photo';
      case 1: return 'gps';
      case 2: return 'text';
      case 3: return 'social';
      case 4: return 'text';
      default: return 'photo';
    }
  };

  const handleSwitchMode = () => {
    navigate('/sky-quest/calm');
  };

  const completedChallenges = progress.filter(p => p.completed).length;
  const progressPercentage = (completedChallenges / challenges.length) * 100;
  const isAllCompleted = completedChallenges === challenges.length;

  const getChallengeIcon = (index: number) => {
    switch (index) {
      case 0: return <Camera className="w-6 h-6" />;
      case 1: return <MapPin className="w-6 h-6" />;
      case 2: return <Users className="w-6 h-6" />;
      case 3: return <Share2 className="w-6 h-6" />;
      case 4: return <Edit3 className="w-6 h-6" />;
      default: return <Circle className="w-6 h-6" />;
    }
  };

  const getProofPlaceholder = (challengeIndex: number) => {
    switch (challengeIndex) {
      case 0: return 'Tải lên ảnh minh chứng việc nhặt rác...';
      case 1: return 'Chia sẻ tọa độ GPS nơi trồng cây...';
      case 2: return 'Ghi lại nội dung phỏng vấn người dân...';
      case 3: return 'Đường link bài đăng trên mạng xã hội...';
      case 4: return 'Viết lại điều bạn tự hào nhất...';
      default: return 'Nhập thông tin xác thực...';
    }
  };

  if (isAllCompleted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="animate-bounce mb-8">
              <Trophy className="w-24 h-24 mx-auto text-yellow-600 mb-6" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              🎉 Xuất sắc!
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Bạn đã hoàn thành xuất sắc hành trình "Hăng Say Săn Thưởng"!
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-yellow-200 mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                🏆 Voucher Đặc Biệt Mở Khóa!
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Tổng điểm: {totalScore}/500 | EXP: {expPoints} điểm
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Thành tựu đạt được:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Đóng góp tích cực cho môi trường</li>
                    <li>• Kết nối với cộng đồng địa phương</li>
                    <li>• Lan tỏa thông điệp du lịch xanh</li>
                    <li>• Hoàn thành {completedChallenges} thử thách</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Phần thưởng:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• {expPoints} điểm EXP</li>
                    <li>• Voucher giảm giá 25%</li>
                    <li>• Huy hiệu "Chiến Binh Xanh"</li>
                    <li>• Quyền truy cập VIP</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-700">
                  Điểm số xuất sắc! Bạn đã đạt {Math.round((totalScore/500) * 100)}% hiệu suất
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleSwitchMode}
                className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Thử "Mây Mây Sương Sương"
                <RefreshCw className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => navigate('/sky-quest')}
                variant="outline"
                className="border-green-300 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-xl"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-green-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => navigate('/sky-quest')}
                variant="outline"
                className="border-green-200 text-green-600 hover:bg-green-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800">Hăng Say Săn Thưởng</h1>
                <p className="text-green-600 font-medium">Hành trình năng động</p>
              </div>
              
              <Button
                onClick={handleSwitchMode}
                className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white"
              >
                Đổi phong cách
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar & Score */}
        <div className="bg-white/70 py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600">
                  Tiến độ: {completedChallenges}/{challenges.length}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {expPoints} EXP
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-orange-600">
                  {totalScore}/500 điểm
                </span>
              </div>
            </div>
            <div className="w-full bg-green-100 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-yellow-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 10 && (
                  <Zap className="w-3 h-3 text-white" />
                )}
              </div>
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
                      ? 'bg-green-100 border-green-400 shadow-lg'
                      : index === currentChallenge
                      ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-200 shadow-md'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      progress[index]?.completed
                        ? 'bg-green-500 text-white'
                        : index === currentChallenge
                        ? 'bg-yellow-500 text-white'
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
                    <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                      {challenge.title}
                    </p>
                    {progress[index]?.completed && (
                      <div className="text-xs font-bold text-green-600">
                        {progress[index].score}/100
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Challenge */}
            {currentChallenge < challenges.length && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {getChallengeIcon(currentChallenge)}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    {challenges[currentChallenge].title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-4">
                    {challenges[currentChallenge].description}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full">
                    <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-700">
                      {challenges[currentChallenge].points} điểm EXP
                    </span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Xác thực hoàn thành (bắt buộc):
                    </label>
                    <div className="relative">
                      <textarea
                        value={proofData}
                        onChange={(e) => setProofData(e.target.value)}
                        placeholder={getProofPlaceholder(currentChallenge)}
                        className="w-full p-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                        rows={4}
                        required
                      />
                      <div className="absolute top-2 right-2">
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      * Yêu cầu xác thực để hoàn thành thử thách và nhận điểm
                    </p>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleCompleteChallenge}
                      disabled={!proofData.trim()}
                      className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-semibold px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Hoàn thành & Nhận điểm
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
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Xuất sắc!
              </h3>
              <p className="text-slate-600 mb-2">
                +{challenges[currentChallenge]?.points} EXP
              </p>
              <p className="text-lg font-bold text-green-600">
                +{progress[currentChallenge]?.score || 0} điểm thành tích
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-30px); }
          70% { transform: translateY(-15px); }
          90% { transform: translateY(-4px); }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
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

export default SkyQuestEnergetic;