import React, { useState } from 'react';
import { Map, Target, Gift, Leaf, Mountain, Star, Clock, ArrowRight } from 'lucide-react';

interface TabContent {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: {
    title: string;
    description: string;
    features?: string[];
    illustration: React.ReactNode;
  };
}

const InteractiveTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('what-is');

  const tabs: TabContent[] = [
    {
      id: 'what-is',
      title: 'Sky Quest là gì?',
      icon: <Target className="w-5 h-5" />,
      content: {
        title: 'Nền tảng du lịch bền vững gamification đầu tiên tại Việt Nam',
        description: 'Sky Quest biến hành vi du lịch bền vững thành trò chơi tương tác với nhiệm vụ, điểm thưởng và phần quà thật. Tạo tác động tích cực – và nhận lại giá trị thực.',
        illustration: <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
      }
    },
    {
      id: 'journey-tracks',
      title: 'Lựa chọn hành trình',
      icon: <Map className="w-5 h-5" />,
      content: {
        title: '2 track nhiệm vụ phù hợp với mọi phong cách',
        description: 'Chọn hành trình phù hợp với bạn: từ trải nghiệm nhẹ nhàng đến thử thách mạo hiểm.',
        features: [
          'Mây Mây Sương Sương: 15-60 phút, 10-30 điểm',
          'Hăng Say Săn Thưởng: 2-8 giờ, 50-500 điểm'
        ],
        illustration: <div className="flex gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Mountain className="w-4 h-4 text-white" />
          </div>
        </div>
      }
    },
    {
      id: 'points-system',
      title: 'Cách tích điểm',
      icon: <Star className="w-5 h-5" />,
      content: {
        title: 'Hệ thống xác minh minh bạch và nhanh chóng',
        description: 'Tích điểm qua mỗi hoạt động bền vững với 4 phương thức xác minh: ảnh định vị, mã đối tác, peer verification và admin review.',
        features: [
          '90% nhiệm vụ được duyệt trong 24h',
          'Tối đa 72h cho các nhiệm vụ phức tạp'
        ],
        illustration: <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center">
          <Star className="w-8 h-8 text-white" />
        </div>
      }
    },
    {
      id: 'rewards',
      title: 'Phần thưởng có thể nhận',
      icon: <Gift className="w-5 h-5" />,
      content: {
        title: 'Đổi điểm lấy ưu đãi thực tế',
        description: 'Từ Bronze đến Platinum, mỗi cấp độ mang lại những quyền lợi và phần thưởng hấp dẫn.',
        features: [
          'Giảm giá booking 5-25%',
          'Ưu tiên đặt tour hot',
          'Huy hiệu cộng đồng',
          'Báo cáo tác động cá nhân'
        ],
        illustration: <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Gift className="w-8 h-8 text-white" />
        </div>
      }
    }
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-600 shadow-md hover:shadow-lg'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 min-h-[300px] transition-all duration-500">
          {activeTabContent && (
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
                  {activeTabContent.content.title}
                </h3>
                <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 leading-relaxed">
                  {activeTabContent.content.description}
                </p>
                
                {activeTabContent.content.features && (
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {activeTabContent.content.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl md:rounded-2xl hover:from-emerald-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 text-sm md:text-base">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Illustration */}
              <div className="flex-shrink-0 lg:order-first">
                <div className="flex justify-center items-center p-6 md:p-8">
                  {activeTabContent.content.illustration}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTabs;