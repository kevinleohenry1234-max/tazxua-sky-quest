import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useGamification } from '../hooks/useGamification';
import { Challenge, ChallengeType, ChallengeSource, ChallengeVariant } from '../types/gamification';
import { EXPANDED_CHALLENGES } from '../data/gamificationData';
import { 
  Target, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Camera, 
  QrCode, 
  CheckCircle,
  Star,
  Trophy,
  Filter,
  Play,
  Award,
  Sparkles,
  Mountain,
  Leaf,
  Search,
  Navigation,
  Building2,
  Heart,
  TrendingUp,
  Gift,
  Badge,
  Zap,
  Globe
} from 'lucide-react';

const ChallengesPage: React.FC = () => {
  const { challenges, userChallenges, joinChallenge, completeChallenge, awardPoints } = useGamification();
  const [selectedType, setSelectedType] = useState<ChallengeType | 'all'>('all');
  const [selectedSource, setSelectedSource] = useState<ChallengeSource | 'all'>('all');
  const [selectedVariant, setSelectedVariant] = useState<ChallengeVariant | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNearMe, setShowNearMe] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Challenges are already loaded from the hook
  }, []);

  // Thêm hàm gợi ý thông minh
  const getSmartSuggestions = () => {
    const currentHour = new Date().getHours();
    const isWeekend = [0, 6].includes(new Date().getDay());
    const suggestions = [];

    // Gợi ý theo thời gian
    if (currentHour >= 6 && currentHour <= 10) {
      suggestions.push({
        title: "Buổi sáng tuyệt vời!",
        description: "Thời điểm lý tưởng để tham gia các thử thách ngoài trời",
        challenges: challenges.filter(c => c.tags?.includes('outdoor') || c.tags?.includes('morning'))
      });
    } else if (currentHour >= 17 && currentHour <= 19) {
      suggestions.push({
        title: "Hoàng hôn Tà Xùa",
        description: "Khám phá vẻ đẹp hoàng hôn qua các thử thách nhiếp ảnh",
        challenges: challenges.filter(c => c.tags?.includes('photography') || c.tags?.includes('sunset'))
      });
    }

    // Gợi ý theo cuối tuần
    if (isWeekend) {
      suggestions.push({
        title: "Cuối tuần khám phá",
        description: "Thử thách cộng đồng phù hợp cho ngày nghỉ",
        challenges: challenges.filter(c => c.type === 'community')
      });
    }

    return suggestions.slice(0, 2);
  };

  const smartSuggestions = getSmartSuggestions();

  const filteredChallenges = challenges.filter(challenge => {
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    const matchesSource = selectedSource === 'all' || challenge.source === selectedSource;
    const matchesVariant = selectedVariant === 'all' || challenge.variant === selectedVariant;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (challenge.tags && challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesNearMe = !showNearMe || challenge.nearMe;
    const matchesFeatured = !showFeatured || challenge.featured;

    return matchesType && matchesSource && matchesVariant && matchesDifficulty && 
           matchesSearch && matchesNearMe && matchesFeatured;
  });

  const getSourceInfo = (source: ChallengeSource) => {
    switch (source) {
      case 'management':
        return {
          name: 'Đại sứ Xanh',
          icon: Mountain,
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          description: 'Thử thách chính thức từ đội vận hành hệ thống - những người bảo vệ thiên nhiên Tà Xùa'
        };
      case 'brand':
        return {
          name: 'Nhà tài trợ',
          icon: Building2,
          color: 'from-blue-500 to-indigo-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          description: 'Thử thách từ các doanh nghiệp đầu tư và nhà tài trợ - cùng xây dựng du lịch bền vững'
        };
      case 'local':
        return {
          name: 'Doanh nghiệp địa phương',
          icon: Heart,
          color: 'from-purple-500 to-pink-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          description: 'Thử thách từ homestay, quán cà phê và doanh nghiệp Tà Xùa - trải nghiệm văn hóa địa phương'
        };
    }
  };

  const getChallengeTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case 'individual': return <Target className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      case 'event': return <Calendar className="w-5 h-5" />;
    }
  };

  const getChallengeTypeColor = (type: ChallengeType) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
    }
  };

  const getChallengeTypeName = (type: ChallengeType) => {
    switch (type) {
      case 'individual': return 'Cá nhân';
      case 'community': return 'Cộng đồng';
      case 'event': return 'Sự kiện';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyName = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return difficulty;
    }
  };

  const getRequirementIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'gps': 
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'qr': 
      case 'qr_scan': return <QrCode className="w-4 h-4" />;
      case 'checkin':
      case 'check_in': return <CheckCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getUserChallengeStatus = (challengeId: string) => {
    return userChallenges.find(uc => uc.challengeId === challengeId);
  };

  const handleJoinChallenge = (challengeId: string) => {
    joinChallenge(challengeId);
    awardPoints('community_contribution', 10);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    completeChallenge(challengeId);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const userChallenge = getUserChallengeStatus(challenge.id);
    const isJoined = !!userChallenge;
    const isCompleted = userChallenge?.status === 'completed';
    const sourceInfo = getSourceInfo(challenge.source);
    
    // Tính toán tiến trình
    const progress = Number(userChallenge?.progress) || 0;
    const progressPercentage = Math.min((progress / 100) * 100, 100);

    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative ${sourceInfo.bgColor}`}>
        {/* Featured Badge */}
        {challenge.featured && (
          <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>Nổi bật</span>
          </div>
        )}

        {/* Trending Badge */}
        {challenge.trending && (
          <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-pink-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Xu hướng</span>
          </div>
        )}

        {/* Progress Bar for joined challenges */}
        {isJoined && !isCompleted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20">
            <div 
              className={`h-full bg-gradient-to-r ${sourceInfo.color} transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}

        <div className="relative">
          <img 
            src={challenge.imageUrl} 
            alt={challenge.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${sourceInfo.color} opacity-60`} />
          
          {/* Source Badge với mô tả chi tiết */}
          <div className="absolute top-4 left-4">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 backdrop-blur-sm bg-white/90 ${sourceInfo.textColor} shadow-lg group-hover:bg-white transition-all duration-300`}>
              <sourceInfo.icon className="w-4 h-4" />
              <span>{sourceInfo.name}</span>
            </div>
            {/* Tooltip mô tả nguồn */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
              <p className="text-xs text-gray-600">{sourceInfo.description}</p>
            </div>
          </div>

          {/* Points Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{challenge.pointReward}</span>
            </div>
          </div>

          {/* Status Badge */}
          {isCompleted && (
            <div className="absolute bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Trophy className="w-5 h-5" />
            </div>
          )}

          {/* Progress Badge for joined challenges */}
          {isJoined && !isCompleted && (
            <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg text-sm font-semibold">
              {Math.round(progressPercentage)}%
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-20">
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
              {challenge.title}
            </h3>
            <div className="flex items-center space-x-4 text-white/90 text-sm">
               <div className="flex items-center space-x-1">
                 <Clock className="w-4 h-4" />
                 <span>{challenge.timeLimit ? `${challenge.timeLimit}h` : 'Không giới hạn'}</span>
               </div>
               <div className="flex items-center space-x-1">
                 <Users className="w-4 h-4" />
                 <span>{challenge.currentParticipants || 0} tham gia</span>
               </div>
             </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getChallengeTypeColor(challenge.type)}`}>
              {getChallengeTypeName(challenge.type)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
              {getDifficultyName(challenge.difficulty)}
            </span>
          </div>

          {/* Mô tả chi tiết hơn */}
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {challenge.shortDescription || challenge.description}
          </p>

          {/* Hiển thị tiến trình chi tiết cho thử thách đã tham gia */}
          {isJoined && !isCompleted && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-700">Tiến trình của bạn</span>
                <span className="text-sm text-blue-600">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {progressPercentage < 25 ? "Vừa bắt đầu - Cố lên!" : 
                 progressPercentage < 50 ? "Đang tiến bộ tốt!" :
                 progressPercentage < 75 ? "Sắp hoàn thành rồi!" :
                 "Chỉ còn một chút nữa thôi!"}
              </p>
            </div>
          )}

          {/* Requirements */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Yêu cầu:</h4>
            <div className="flex flex-wrap gap-2">
              {challenge.requirements.slice(0, 3).map((req, index) => (
                <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {getRequirementIcon(req.type)}
                  <span>{req.description}</span>
                </span>
              ))}
              {challenge.requirements.length > 3 && (
                <span className="text-xs text-gray-500">+{challenge.requirements.length - 3} khác</span>
              )}
            </div>
          </div>

          {/* Rewards Preview */}
          {challenge.rewards && challenge.rewards.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Phần thưởng:</h4>
              <div className="flex flex-wrap gap-2">
                {challenge.rewards.slice(0, 2).map((reward, index) => (
                  <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs">
                    <span>{reward.icon}</span>
                    <span>{reward.description}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {challenge.endDate && (
                <span>Kết thúc: {new Date(challenge.endDate).toLocaleDateString('vi-VN')}</span>
              )}
            </div>
            
            {!isJoined ? (
              <button
                onClick={() => handleJoinChallenge(challenge.id)}
                className={`bg-gradient-to-r ${sourceInfo.color} text-white px-6 py-2 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 shadow-lg`}
                aria-label={`Bắt đầu thử thách ${challenge.title}`}
              >
                <Play className="w-4 h-4" />
                <span>Bắt đầu</span>
              </button>
            ) : isCompleted ? (
              <div className="flex items-center space-x-2 text-green-600 font-semibold">
                <Trophy className="w-5 h-5" />
                <span>Hoàn thành</span>
              </div>
            ) : (
              <button
                onClick={() => handleCompleteChallenge(challenge.id)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                aria-label={`Hoàn thành thử thách ${challenge.title}`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Hoàn thành</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Main Website Navigation */}
      <Header />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section with Ta Xua Theme */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Mountain className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Thử Thách Tà Xùa</h1>
              <Leaf className="w-12 h-12 ml-4" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Khám phá vẻ đẹp thiên nhiên Tà Xùa qua những thử thách thú vị từ 3 nguồn khác nhau. 
              Tích lũy điểm, nhận huy hiệu và trở thành Đại sứ xanh của núi rừng Tây Bắc!
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{challenges.length}</div>
                <div className="text-white/80">Thử thách</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {challenges.reduce((sum, c) => sum + (c.currentParticipants || 0), 0)}
                </div>
                <div className="text-white/80">Người tham gia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {challenges.reduce((sum, c) => sum + c.pointReward, 0)}
                </div>
                <div className="text-white/80">Tổng điểm thưởng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-white/80">Nguồn thử thách</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Advanced Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Filter className="w-6 h-6 mr-2 text-green-600" />
                Bộ lọc thông minh
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNearMe(!showNearMe)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    showNearMe
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={showNearMe ? "Tắt bộ lọc gần tôi" : "Bật bộ lọc gần tôi"}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Gần tôi</span>
                </button>
                <button
                  onClick={() => setShowFeatured(!showFeatured)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    showFeatured
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={showFeatured ? "Tắt bộ lọc nổi bật" : "Bật bộ lọc nổi bật"}
                >
                  <Star className="w-4 h-4" />
                  <span>Nổi bật</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thử thách..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Source Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Nguồn thử thách:</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'all', label: 'Tất cả', icon: Globe },
                  { key: 'management', label: 'Tà Xùa Hub', icon: Mountain },
                  { key: 'brand', label: 'Đối tác', icon: Building2 },
                  { key: 'local', label: 'Cộng đồng', icon: Heart }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSource(key as ChallengeSource | 'all')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedSource === key
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type & Variant Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Loại thử thách:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'Tất cả', icon: Target },
                    { key: 'individual', label: 'Cá nhân', icon: Target },
                    { key: 'community', label: 'Cộng đồng', icon: Users },
                    { key: 'event', label: 'Sự kiện', icon: Calendar }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key as ChallengeType | 'all')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedType === key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Độ khó:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'easy', label: 'Dễ' },
                    { key: 'medium', label: 'Trung bình' },
                    { key: 'hard', label: 'Khó' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDifficulty(key as 'easy' | 'medium' | 'hard' | 'all')}
                      className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedDifficulty === key
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Hiển thị {filteredChallenges.length} thử thách
            </div>
          </div>

          {/* Smart Suggestions Section */}
          {smartSuggestions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                Gợi ý thông minh cho bạn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {smartSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{suggestion.title}</h3>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600 font-semibold">
                        {suggestion.challenges.length} thử thách phù hợp
                      </span>
                      <button 
                        onClick={() => {
                          // Lọc theo gợi ý
                          if (suggestion.title.includes('cộng đồng')) {
                            setSelectedType('community');
                          } else if (suggestion.title.includes('nhiếp ảnh')) {
                            setSearchQuery('photography');
                          } else if (suggestion.title.includes('ngoài trời')) {
                            setSearchQuery('outdoor');
                          }
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Khám phá ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          {/* Empty State */}
          {filteredChallenges.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không có thử thách nào
              </h3>
              <p className="text-gray-600">
                Hiện tại không có thử thách nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh bộ lọc.
              </p>
            </div>
          )}
        </div>

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Chúc mừng!
              </h3>
              <p className="text-gray-600">
                Bạn đã hoàn thành thử thách thành công!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;