import React from 'react';
import { Quest } from '@/data/questsData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onStart?: (questId: string) => void;
  isCompleted?: boolean;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ 
  quest, 
  onStart, 
  isCompleted = false,
  className = ""
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Khó':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartQuest = () => {
    if (onStart && !isCompleted) {
      onStart(quest.id);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group ${className}`}>
      {/* Quest Icon & Category */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-full border border-blue-100">
              {quest.icon}
            </div>
            <div>
              <Badge variant="outline" className="text-xs font-medium text-gray-600 bg-gray-50">
                {quest.category}
              </Badge>
            </div>
          </div>
          {isCompleted && (
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              ✓
            </div>
          )}
        </div>

        {/* Quest Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {quest.title}
        </h3>

        {/* Quest Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {quest.description}
        </p>

        {/* Quest Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{quest.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-yellow-600">{quest.point} điểm</span>
            </div>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center justify-between">
          <Badge 
            className={`${getDifficultyColor(quest.difficulty)} border font-medium`}
            variant="outline"
          >
            {quest.difficulty}
          </Badge>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <Button 
          onClick={handleStartQuest}
          disabled={isCompleted}
          className={`w-full ${
            isCompleted 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
          } transition-all duration-200`}
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? (
            <div className="flex items-center space-x-2">
              <span>✓ Đã hoàn thành</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Bắt đầu thử thách</span>
            </div>
          )}
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default QuestCard;