import React, { useState } from 'react';
import { 
  MapPin, 
  Share2, 
  TreePine, 
  BookOpen, 
  Star, 
  Clock, 
  CheckCircle, 
  Play,
  Repeat,
  Lock
} from 'lucide-react';
import { Quest, QuestCategory, ActionType } from '../../types/xpEngine';

interface QuestListProps {
  quests: Quest[];
  completedQuests?: string[];
  onCompleteQuest: (questId: string, metadata?: Record<string, any>) => Promise<void>;
  completingQuest?: string | null;
  loading?: boolean;
}

const QuestList: React.FC<QuestListProps> = ({ 
  quests, 
  completedQuests = [], 
  onCompleteQuest, 
  completingQuest,
  loading 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | 'all'>('all');

  // Category icons and colors
  const getCategoryIcon = (actionType: ActionType) => {
    switch (actionType) {
      case ActionType.CHECKIN_LOCATION:
      case ActionType.AR_VR_EXPERIENCE:
        return MapPin;
      case ActionType.SHARE_POST:
      case ActionType.RECEIVE_LIKE:
      case ActionType.RECEIVE_COMMENT:
        return Share2;
      case ActionType.PLANT_TREE:
      case ActionType.CLEAN_ENVIRONMENT:
      case ActionType.DONATE:
        return TreePine;
      case ActionType.COMPLETE_QUIZ:
        return BookOpen;
      default:
        return Star;
    }
  };

  const getCategoryColor = (actionType: ActionType) => {
    switch (actionType) {
      case ActionType.CHECKIN_LOCATION:
      case ActionType.AR_VR_EXPERIENCE:
        return 'emerald';
      case ActionType.SHARE_POST:
      case ActionType.RECEIVE_LIKE:
      case ActionType.RECEIVE_COMMENT:
        return 'blue';
      case ActionType.PLANT_TREE:
      case ActionType.CLEAN_ENVIRONMENT:
      case ActionType.DONATE:
        return 'green';
      case ActionType.COMPLETE_QUIZ:
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getActionTypeLabel = (actionType: ActionType) => {
    const labels = {
      [ActionType.CHECKIN_LOCATION]: 'Check-in',
      [ActionType.AR_VR_EXPERIENCE]: 'AR/VR Experience',
      [ActionType.SHARE_POST]: 'Chia sẻ',
      [ActionType.RECEIVE_LIKE]: 'Nhận like',
      [ActionType.RECEIVE_COMMENT]: 'Nhận comment',
      [ActionType.PLANT_TREE]: 'Trồng cây',
      [ActionType.CLEAN_ENVIRONMENT]: 'Dọn rác',
      [ActionType.DONATE]: 'Quyên góp',
      [ActionType.COMPLETE_QUIZ]: 'Quiz',
      [ActionType.LEVEL_UP]: 'Level Up',
      [ActionType.VOUCHER_EXCHANGE]: 'Đổi voucher'
    };
    return labels[actionType] || actionType;
  };

  // Filter quests by category
  const filteredQuests = quests.filter(quest => {
    if (selectedCategory === 'all') return true;
    return quest.category === selectedCategory;
  });

  // Categories for filter
  const categories = [
    { key: 'all' as const, label: 'Tất cả', icon: Star },
    { key: QuestCategory.EXPLORATION, label: 'Khám phá', icon: MapPin },
    { key: QuestCategory.COMMUNITY, label: 'Cộng đồng', icon: Share2 },
    { key: QuestCategory.CONSERVATION, label: 'Bảo tồn', icon: TreePine },
    { key: QuestCategory.LEARNING, label: 'Học hỏi', icon: BookOpen }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex space-x-2 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-20"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.key;
          
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map(quest => {
          const Icon = getCategoryIcon(quest.actionType);
          const color = getCategoryColor(quest.actionType);
          const isCompleted = completedQuests.includes(quest.id);
          const isCompleting = completingQuest === quest.id;
          
          return (
            <div
              key={quest.id}
              className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl ${
                isCompleted ? 'opacity-75' : ''
              }`}
            >
              {/* Quest Header */}
              <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {getActionTypeLabel(quest.actionType)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="font-bold">{quest.xpReward}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg">{quest.title}</h3>
              </div>

              {/* Quest Body */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {quest.description}
                </p>

                {/* Quest Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    {quest.isRepeatable && (
                      <div className="flex items-center space-x-1">
                        <Repeat className="w-3 h-3" />
                        <span>Lặp lại</span>
                      </div>
                    )}
                    {quest.maxCompletionsPerDay && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{quest.maxCompletionsPerDay}/ngày</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onCompleteQuest(quest.id)}
                  disabled={isCompleting || (!quest.isRepeatable && isCompleted)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    isCompleted && !quest.isRepeatable
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isCompleting
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : `bg-${color}-500 hover:bg-${color}-600 text-white shadow-md hover:shadow-lg`
                  }`}
                >
                  {isCompleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : isCompleted && !quest.isRepeatable ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Đã hoàn thành</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Bắt đầu</span>
                    </>
                  )}
                </button>
              </div>

              {/* Completion Status */}
              {isCompleted && (
                <div className="bg-green-50 border-t border-green-100 p-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {quest.isRepeatable ? 'Có thể làm lại' : 'Hoàn thành'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredQuests.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Không có nhiệm vụ nào
          </h3>
          <p className="text-gray-500">
            {selectedCategory === 'all' 
              ? 'Hiện tại chưa có nhiệm vụ nào khả dụng.'
              : `Không có nhiệm vụ nào trong danh mục này.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestList;