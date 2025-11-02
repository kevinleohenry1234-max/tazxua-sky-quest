import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SkyQuestIntroProps {
  onLearnMoreClick: () => void;
}

const SkyQuestIntro: React.FC<SkyQuestIntroProps> = ({ onLearnMoreClick }) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Live Counter */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            247 người đang tham gia Sky Quest
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-emerald-500 mr-3" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                Sky Quest là gì?
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Hệ thống gamification độc đáo giúp bạn khám phá Tà Xùa một cách có ý nghĩa - 
              vừa trải nghiệm vẻ đẹp thiên nhiên, vừa nhận phần thưởng thực sự.
            </p>

            {/* Key Features - Simple Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">500+</div>
                <div className="text-sm text-slate-600">Điểm đến</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-slate-600">Nhiệm vụ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-sm text-slate-600">Phần thưởng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">Bền vững</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onLearnMoreClick}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Tìm hiểu chi tiết
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyQuestIntro;