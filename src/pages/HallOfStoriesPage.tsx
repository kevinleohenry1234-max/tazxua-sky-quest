import React, { useState } from 'react';
import HallOfStories from '../components/HallOfStories';
import { StoryCard, StoryWish } from '../types/journey';
import { 
  Mountain, 
  Leaf, 
  BookOpen, 
  Heart, 
  MessageCircle,
  Sparkles,
  Users,
  Calendar,
  Coffee,
  Sun
} from 'lucide-react';

const HallOfStoriesPage: React.FC = () => {
  // Sample stories data with more authentic, heartfelt content
  const [stories] = useState<StoryCard[]>([
    {
      id: '1',
      title: 'Lần đầu tiên thấy biển mây từ đỉnh Tà Xùa',
      content: 'Mình nhớ mãi cảm giác run run khi leo lên đỉnh lúc 4h sáng. Lạnh cắt da cắt thịt, nhưng khi mặt trời ló dạng và biển mây trắng xóa trải dài dưới chân, mình đã khóc. Không phải vì lạnh, mà vì cảm động trước vẻ đẹp mà thiên nhiên ban tặng.',
      image: '/images/sunrise-ta-xua.jpg',
      journeyId: 'journey-1',
      journeyTitle: 'Khám phá Tà Xùa',
      authorId: 'user-1',
      authorName: 'Minh Anh',
      authorAvatar: '/images/avatars/user1.jpg',
      createdAt: new Date('2024-01-20'),
      cloudLikes: 24,
      wishes: [
        {
          id: 'wish-1',
          authorId: 'user-2',
          authorName: 'Thu Hà',
          content: 'Đọc mà mình cũng muốn khóc theo. Cảm ơn bạn đã chia sẻ khoảnh khắc đẹp này!',
          emoji: '🌟',
          createdAt: new Date('2024-01-21')
        }
      ],
      tags: ['bình minh', 'biển mây', 'cảm động'],
      archetype: 'explorer',
      badge: 'sunrise-hunter'
    },
    {
      id: '2',
      title: 'Bữa cơm với gia đình H\'Mông',
      content: 'Cô Sủa mời mình vào nhà ăn cơm khi thấy mình đi lạc đường. Bữa cơm đơn giản với rau rừng, thịt lợn hun khói, nhưng ấm áp đến lạ. Cô kể về cuộc sống trên núi, về những mùa hoa tam giác mạch, về con cháu đi học xa. Mình hiểu rằng, du lịch không chỉ là ngắm cảnh, mà còn là kết nối với con người.',
      image: '/images/hmong-culture.jpg',
      journeyId: 'journey-2',
      journeyTitle: 'Văn hóa Tây Bắc',
      authorId: 'user-3',
      authorName: 'Văn Đức',
      authorAvatar: '/images/avatars/user3.jpg',
      createdAt: new Date('2024-01-18'),
      cloudLikes: 18,
      wishes: [],
      tags: ['văn hóa', 'H\'Mông', 'ấm áp'],
      archetype: 'cultural',
      badge: 'culture-explorer'
    },
    {
      id: '3',
      title: 'Đêm ngủ trong rừng cổ thụ',
      content: 'Lều mình dựng ngay dưới gốc cây cổ thụ hàng trăm năm tuổi. Đêm đó, mình nằm nghe tiếng gió thổi qua lá, tiếng côn trùng ru ngủ, và cảm thấy mình nhỏ bé đến thế nào trước thiên nhiên. Sáng dậy, ánh nắng lọt qua tán lá tạo thành những vệt sáng ma thuật. Mình hiểu tại sao người xưa nói rừng có hồn.',
      image: '/images/ancient-forest.jpg',
      journeyId: 'journey-3',
      journeyTitle: 'Khám phá thiên nhiên',
      authorId: 'user-4',
      authorName: 'Lan Phương',
      authorAvatar: '/images/avatars/user4.jpg',
      createdAt: new Date('2024-01-15'),
      cloudLikes: 31,
      wishes: [
        {
          id: 'wish-2',
          authorId: 'user-5',
          authorName: 'Hoàng Nam',
          content: 'Đọc xong muốn bỏ việc lên rừng luôn! Cảm ơn bạn đã chia sẻ trải nghiệm tuyệt vời này.',
          emoji: '🌲',
          createdAt: new Date('2024-01-16')
        },
        {
          id: 'wish-3',
          authorId: 'user-6',
          authorName: 'Mai Linh',
          content: 'Rừng thật sự có hồn, mình cũng từng cảm nhận được điều đó!',
          emoji: '💚',
          createdAt: new Date('2024-01-17')
        }
      ],
      tags: ['rừng cổ thụ', 'cắm trại', 'thiền định'],
      archetype: 'environmental',
      badge: 'forest-guardian'
    }
  ]);

  const handleCloudLike = (storyId: string) => {

    // Implement cloud like functionality
  };

  const handleSendWish = (storyId: string, wish: Omit<StoryWish, 'id' | 'createdAt'>) => {

    // Implement send wish functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section - Warm and inviting */}
        <div className="relative bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 text-amber-900 py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-orange-200/20 to-yellow-200/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-5" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Coffee className="w-10 h-10 mr-3 text-amber-700" />
              <h1 className="text-4xl md:text-5xl font-light text-amber-800">Góc Chia Sẻ Tà Xùa</h1>
              <Sun className="w-10 h-10 ml-3 text-amber-600" />
            </div>
            <p className="text-lg md:text-xl text-amber-700 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              Nơi những câu chuyện thật, những cảm xúc chân thành từ hành trình khám phá Tà Xùa được lưu giữ. 
              <br className="hidden md:block" />
              Mỗi câu chuyện đều mang trong mình một phần hồn của núi rừng Tây Bắc.
            </p>
            
            {/* Warm Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-amber-200/50">
                <div className="text-2xl md:text-3xl font-light mb-2 text-amber-800">{stories.length}</div>
                <div className="text-xs md:text-sm text-amber-700 flex items-center justify-center">
                  <BookOpen className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Câu chuyện
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-amber-200/50">
                <div className="text-2xl md:text-3xl font-light mb-2 text-amber-800">
                  {stories.reduce((total, story) => total + story.cloudLikes, 0)}
                </div>
                <div className="text-xs md:text-sm text-amber-700 flex items-center justify-center">
                  <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Yêu thích
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-amber-200/50">
                <div className="text-2xl md:text-3xl font-light mb-2 text-amber-800">
                  {stories.reduce((total, story) => total + story.wishes.length, 0)}
                </div>
                <div className="text-xs md:text-sm text-amber-700 flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Lời nhắn
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-amber-200/50">
                <div className="text-2xl md:text-3xl font-light mb-2 text-amber-800">
                  {new Set(stories.map(story => story.authorId)).size}
                </div>
                <div className="text-xs md:text-sm text-amber-700 flex items-center justify-center">
                  <Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Người bạn
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Warm Introduction */}
          <div className="text-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-amber-100 p-8 max-w-4xl mx-auto">
              <div className="text-4xl mb-4">☕</div>
              <h2 className="text-2xl font-light text-amber-900 mb-4">
                Chào mừng bạn đến với góc chia sẻ ấm cúng của chúng mình
              </h2>
              <p className="text-amber-800 leading-relaxed font-light">
                Đây không chỉ là nơi kể chuyện, mà còn là nơi kết nối những tâm hồn yêu thiên nhiên. 
                Mỗi câu chuyện ở đây đều được viết bằng trái tim, mang theo những cảm xúc chân thật 
                từ những chuyến hành trình khám phá Tà Xùa. Hãy ngồi xuống, pha một tách trà, 
                và cùng chúng mình lắng nghe những câu chuyện đẹp nhé.
              </p>
            </div>
          </div>

          {/* Hall of Stories Component */}
          <HallOfStories 
            stories={stories}
            onCloudLike={handleCloudLike}
            onSendWish={handleSendWish}
          />
        </div>

        {/* Warm Background Decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/30 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-yellow-200/30 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-amber-300/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default HallOfStoriesPage;