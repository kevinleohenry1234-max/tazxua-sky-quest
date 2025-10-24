import React, { useState } from 'react';
import { X, Waves, Zap, Sparkles, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'calm' | 'energetic') => void;
  isLoading?: boolean;
}

const ModeSelectionModal: React.FC<ModeSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  isLoading = false
}) => {
  const [selectedMode, setSelectedMode] = useState<'calm' | 'energetic' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSelectMode = async (mode: 'calm' | 'energetic') => {
    setIsSubmitting(true);
    await onSelectMode(mode);
    setIsSubmitting(false);
    onClose();
  };

  const modes = [
    {
      id: 'calm' as const,
      title: 'Calm - Bình Yên',
      description: 'Hành trình nhẹ nhàng, tập trung vào sự tĩnh lặng và cân bằng nội tâm',
      icon: Waves,
      gradient: 'from-blue-400 via-cyan-300 to-blue-200',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      features: [
        'Thiền định và thở sâu',
        'Quan sát thiên nhiên',
        'Ghi nhật ký cảm xúc',
        'Yoga nhẹ nhàng'
      ]
    },
    {
      id: 'energetic' as const,
      title: 'Energetic - Năng Động',
      description: 'Hành trình sôi động, khơi dậy năng lượng và sự sáng tạo',
      icon: Zap,
      gradient: 'from-yellow-400 via-orange-300 to-green-300',
      bgGradient: 'from-yellow-50 to-green-50',
      borderColor: 'border-yellow-200',
      features: [
        'Hoạt động ngoài trời',
        'Thử thách sáng tạo',
        'Kết nối cộng đồng',
        'Khám phá mới mẻ'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-['Inter'] text-2xl font-bold text-slate-800">
                  Chọn Phong Cách Hành Trình
                </h2>
                <p className="font-['Inter'] text-slate-600">
                  Hãy chọn phong cách phù hợp với tâm trạng của bạn
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              
              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                    ${isSelected 
                      ? `${mode.borderColor} bg-gradient-to-br ${mode.bgGradient} shadow-lg` 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}

                  {/* Icon and title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-['Inter'] text-xl font-bold text-slate-800">
                        {mode.title}
                      </h3>
                      <p className="font-['Inter'] text-sm text-slate-600 mt-1">
                        {mode.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-['Inter'] text-sm font-semibold text-slate-700 mb-3">
                      Hoạt động chính:
                    </h4>
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="font-['Inter'] text-sm text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Select button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMode(mode.id);
                    }}
                    disabled={isSubmitting || isLoading}
                    className={`
                      w-full mt-6 py-3 rounded-xl font-medium transition-all duration-200
                      ${isSelected
                        ? `bg-gradient-to-r ${mode.gradient} text-white hover:shadow-lg`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }
                    `}
                  >
                    {isSubmitting || isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Đang khởi tạo...</span>
                      </div>
                    ) : (
                      `Chọn ${mode.title.split(' - ')[0]}`
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Info section */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-['Inter'] text-sm font-semibold text-slate-800 mb-1">
                  Lưu ý quan trọng
                </h4>
                <p className="font-['Inter'] text-xs text-slate-600 leading-relaxed">
                  Bạn có thể thay đổi phong cách bất cứ lúc nào trong hành trình. 
                  Mỗi phong cách sẽ mang đến những trải nghiệm và thử thách khác nhau, 
                  phù hợp với tâm trạng và mục tiêu cá nhân của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionModal;