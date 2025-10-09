import React, { useState } from 'react';
import { Badge, Gift, BookOpen, Star, Calendar, MapPin, Award, Sparkles, Lock } from 'lucide-react';
import { Badge as BadgeType, Voucher } from '../types/gamification';
import { SouvenirCard } from '../types/journey';

interface JourneySouvenirsProps {
  badges: BadgeType[];
  vouchers: Voucher[];
  souvenirCards: SouvenirCard[];
  unlockedBadgeIds: string[];
}

const JourneySouvenirs: React.FC<JourneySouvenirsProps> = ({ 
  badges, 
  vouchers, 
  souvenirCards, 
  unlockedBadgeIds 
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'vouchers' | 'cards'>('badges');
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [selectedCard, setSelectedCard] = useState<SouvenirCard | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-indigo-500';
      case 'common': return 'from-gray-400 to-gray-500';
      default: return 'from-green-400 to-teal-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-200';
      case 'epic': return 'border-purple-400 shadow-purple-200';
      case 'rare': return 'border-blue-400 shadow-blue-200';
      case 'common': return 'border-gray-400 shadow-gray-200';
      default: return 'border-green-400 shadow-green-200';
    }
  };

  const tabs = [
    { id: 'badges', label: 'Huy hiệu', icon: Badge, count: unlockedBadgeIds.length },
    { id: 'vouchers', label: 'Voucher', icon: Gift, count: vouchers.length },
    { id: 'cards', label: 'Thẻ truyện', icon: BookOpen, count: souvenirCards.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-purple-500 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Kỷ vật hành trình</h2>
        </div>
        <p className="text-gray-600">Bộ sưu tập những kỷ niệm đáng nhớ từ hành trình của bạn</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    isUnlocked ? 'hover:scale-105' : 'opacity-50'
                  }`}
                  onClick={() => isUnlocked && setSelectedBadge(badge)}
                >
                  <div className={`bg-white rounded-2xl p-6 border-2 shadow-lg ${
                    isUnlocked ? getRarityBorder(badge.rarity) : 'border-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                        isUnlocked 
                          ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-lg`
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isUnlocked ? badge.icon : <Lock className="w-8 h-8" />}
                      </div>
                      <h3 className={`font-bold mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {isUnlocked ? badge.description : 'Chưa mở khóa'}
                      </p>
                      {isUnlocked && (
                        <div className="mt-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                            badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                            badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {badge.rarity === 'legendary' ? 'Huyền thoại' :
                             badge.rarity === 'epic' ? 'Sử thi' :
                             badge.rarity === 'rare' ? 'Hiếm' : 'Thông thường'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {isUnlocked && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Vouchers Tab */}
        {activeTab === 'vouchers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <Gift className="w-8 h-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {voucher.discountPercent || voucher.value}% OFF
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{voucher.title}</h3>
                  <p className="text-gray-600 mb-4">{voucher.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Hết hạn: {voucher.expiresAt.toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{voucher.partnerName || 'Đối tác địa phương'}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
                    Sử dụng voucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Souvenir Cards Tab */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {souvenirCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group min-h-[400px] flex flex-col"
                onClick={() => setSelectedCard(card)}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{card.rarity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">{card.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">{card.message}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-2 border-t border-gray-100">
                    <span className="font-medium truncate mr-2">{card.journeyTitle}</span>
                    <span className="flex-shrink-0">{card.earnedAt.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty States */}
        {activeTab === 'badges' && unlockedBadgeIds.length === 0 && (
          <div className="text-center py-12">
            <Badge className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có huy hiệu nào</h3>
            <p className="text-gray-400">Hoàn thành các thử thách để mở khóa huy hiệu đầu tiên!</p>
          </div>
        )}

        {activeTab === 'vouchers' && vouchers.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có voucher nào</h3>
            <p className="text-gray-400">Tham gia các hoạt động để nhận voucher ưu đãi!</p>
          </div>
        )}

        {activeTab === 'cards' && souvenirCards.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có thẻ truyện nào</h3>
            <p className="text-gray-400">Hoàn thành hành trình để nhận thẻ truyện lưu niệm!</p>
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)} text-white shadow-lg`}>
                {selectedBadge.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBadge.name}</h3>
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>Danh mục: {selectedBadge.category}</div>
                <div>Độ hiếm: {
                  selectedBadge.rarity === 'legendary' ? 'Huyền thoại' :
                  selectedBadge.rarity === 'epic' ? 'Sử thi' :
                  selectedBadge.rarity === 'rare' ? 'Hiếm' : 'Thông thường'
                }</div>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-6 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
            <img 
              src={selectedCard.image} 
              alt={selectedCard.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCard.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedCard.message}</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>Hành trình: {selectedCard.journeyTitle}</div>
                <div>Nhận được: {selectedCard.earnedAt.toLocaleDateString('vi-VN')}</div>
                <div>Độ hiếm: {selectedCard.rarity}</div>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                className="w-full py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneySouvenirs;