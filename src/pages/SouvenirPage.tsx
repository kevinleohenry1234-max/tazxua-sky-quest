import React, { useState } from 'react';
import SkyQuestNavigation from '../components/SkyQuestNavigation';
import JourneySouvenirs from '../components/JourneySouvenirs';
import { Badge, Voucher } from '../types/gamification';
import { SouvenirCard } from '../types/journey';
import { 
  Mountain, 
  Leaf, 
  Gift, 
  Trophy, 
  Star,
  Sparkles,
  Award,
  Crown,
  Gem
} from 'lucide-react';

const SouvenirPage: React.FC = () => {
  // Sample badges data
  const [badges] = useState<Badge[]>([
    {
      id: 'sunrise-hunter',
      name: 'Thợ săn bình minh',
      description: 'Chứng kiến bình minh từ đỉnh Tà Xùa',
      icon: '🌅',
      rarity: 'rare',
      category: 'explorer',
      earnedAt: new Date('2024-01-20')
    },
    {
      id: 'culture-explorer',
      name: 'Nhà khám phá văn hóa',
      description: 'Tìm hiểu sâu về văn hóa H\'Mông',
      icon: '🏛️',
      rarity: 'epic',
      category: 'cultural',
      earnedAt: new Date('2024-01-18')
    },
    {
      id: 'forest-guardian',
      name: 'Người bảo vệ rừng',
      description: 'Hoàn thành thử thách bảo vệ môi trường',
      icon: '🌲',
      rarity: 'legendary',
      category: 'environmental'
    }
  ]);

  // Sample vouchers data
  const [vouchers] = useState<Voucher[]>([
    {
      id: 'homestay-discount',
      title: 'Giảm giá Homestay',
      description: 'Giảm 20% cho đêm nghỉ tại homestay Tà Xùa',
      type: 'homestay',
      value: 20,
      discountPercent: 20,
      pointsCost: 150,
      code: 'TAXUA20',
      isUsed: false,
      expiresAt: new Date('2024-12-31'),
      earnedAt: new Date('2024-01-10')
    },
    {
      id: 'tour-guide',
      title: 'Hướng dẫn viên miễn phí',
      description: 'Dịch vụ hướng dẫn viên địa phương miễn phí 1 ngày',
      type: 'tour',
      value: 100,
      pointsCost: 300,
      code: 'GUIDE1DAY',
      isUsed: true,
      usedAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-12-31'),
      earnedAt: new Date('2024-01-05')
    }
  ]);

  // Sample souvenir cards data
  const [souvenirCards] = useState<SouvenirCard[]>([
    {
      id: 'card-1',
      title: 'Bình minh Tà Xùa',
      description: 'Kỷ niệm lần đầu ngắm bình minh từ đỉnh núi cao nhất Tây Bắc',
      image: '/images/cards/sunrise-card.jpg',
      earnedAt: new Date('2024-01-20'),
      journeyId: 'journey-1',
      journeyTitle: 'Khám phá Tà Xùa',
      message: 'Một khoảnh khắc tuyệt vời không thể nào quên!',
      rarity: 'rare'
    },
    {
      id: 'card-2',
      title: 'Làng H\'Mông cổ',
      description: 'Trải nghiệm cuộc sống truyền thống của người H\'Mông',
      image: '/images/cards/hmong-village.jpg',
      earnedAt: new Date('2024-01-18'),
      journeyId: 'journey-2',
      journeyTitle: 'Văn hóa Tây Bắc',
      message: 'Được học hỏi từ những người dân địa phương thật tuyệt!',
      rarity: 'epic'
    },
    {
      id: 'card-3',
      title: 'Rừng cổ thụ',
      description: 'Khám phá khu rừng cổ thụ ngàn năm tuổi',
      image: '/images/cards/ancient-forest.jpg',
      earnedAt: new Date('2024-01-15'),
      journeyId: 'journey-3',
      journeyTitle: 'Khám phá thiên nhiên',
      message: 'Cảm giác như lạc vào thế giới cổ tích!',
      rarity: 'legendary'
    }
  ]);

  const unlockedBadgeIds = badges.filter(badge => badge.earnedAt).map(badge => badge.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Sky Quest Navigation */}
      <SkyQuestNavigation currentSection="souvenirs" />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Kỷ Vật Tà Xùa</h1>
              <Gem className="w-12 h-12 ml-4" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Bộ sưu tập những kỷ vật đặc biệt từ hành trình khám phá Tà Xùa. 
              Huy hiệu, voucher và thẻ kỷ niệm - những minh chứng cho những trải nghiệm tuyệt vời của bạn.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {badges.filter(b => b.earnedAt).length}
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Trophy className="w-4 h-4 mr-1" />
                  Huy hiệu
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{vouchers.length}</div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Gift className="w-4 h-4 mr-1" />
                  Voucher
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{souvenirCards.length}</div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1" />
                  Thẻ kỷ niệm
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {badges.filter(b => b.rarity === 'legendary').length}
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Crown className="w-4 h-4 mr-1" />
                  Huyền thoại
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="text-center mb-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="text-4xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Bộ Sưu Tập Kỷ Vật Tà Xùa
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Mỗi huy hiệu, voucher và thẻ kỷ niệm đều là minh chứng cho những khoảnh khắc đặc biệt 
                trong hành trình khám phá Tà Xùa của bạn. Hãy tiếp tục khám phá để thu thập thêm 
                nhiều kỷ vật quý giá khác!
              </p>
            </div>
          </div>

          {/* Journey Souvenirs Component */}
          <JourneySouvenirs 
            badges={badges}
            vouchers={vouchers}
            souvenirCards={souvenirCards}
            unlockedBadgeIds={unlockedBadgeIds}
          />
        </div>

        {/* Background Decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SouvenirPage;