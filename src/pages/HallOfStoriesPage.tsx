import React, { useState } from 'react';
import Header from '../components/Header';
import SkyQuestNavigation from '../components/SkyQuestNavigation';
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
  Calendar
} from 'lucide-react';

const HallOfStoriesPage: React.FC = () => {
  // Sample stories data
  const [stories] = useState<StoryCard[]>([
    {
      id: '1',
      title: 'Bình minh trên đỉnh Tà Xùa',
      content: 'Một trải nghiệm tuyệt vời khi được chứng kiến bình minh từ đỉnh núi cao nhất Tây Bắc. Những tia nắng đầu tiên xuyên qua lớp sương mù, tạo nên khung cảnh như trong tranh.',
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
          content: 'Chúc bạn có thêm nhiều hành trình đẹp như vậy!',
          emoji: '🌟',
          createdAt: new Date('2024-01-21')
        }
      ],
      tags: ['bình minh', 'đỉnh núi', 'thiên nhiên'],
      archetype: 'explorer',
      badge: 'sunrise-hunter'
    },
    {
      id: '2',
      title: 'Khám phá văn hóa H\'Mông',
      content: 'Được tham gia vào cuộc sống hàng ngày của người H\'Mông tại Tà Xùa, học cách dệt vải và nấu những món ăn truyền thống.',
      image: '/images/hmong-culture.jpg',
      journeyId: 'journey-2',
      journeyTitle: 'Văn hóa Tây Bắc',
      authorId: 'user-3',
      authorName: 'Văn Đức',
      authorAvatar: '/images/avatars/user3.jpg',
      createdAt: new Date('2024-01-18'),
      cloudLikes: 18,
      wishes: [],
      tags: ['văn hóa', 'H\'Mông', 'truyền thống'],
      archetype: 'cultural',
      badge: 'culture-explorer'
    },
    {
      id: '3',
      title: 'Rừng cổ thụ ngàn năm',
      content: 'Bước chân vào khu rừng cổ thụ với những cây cổ thụ hàng trăm năm tuổi. Cảm giác như lạc vào một thế giới cổ tích.',
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
          content: 'Mong được đi cùng bạn lần sau!',
          emoji: '🌲',
          createdAt: new Date('2024-01-16')
        },
        {
          id: 'wish-3',
          authorId: 'user-6',
          authorName: 'Mai Linh',
          content: 'Thiên nhiên thật tuyệt vời!',
          emoji: '💚',
          createdAt: new Date('2024-01-17')
        }
      ],
      tags: ['rừng cổ thụ', 'thiên nhiên', 'khám phá'],
      archetype: 'environmental',
      badge: 'forest-guardian'
    }
  ]);

  const handleCloudLike = (storyId: string) => {
    console.log('Cloud like for story:', storyId);
    // Implement cloud like functionality
  };

  const handleSendWish = (storyId: string, wish: Omit<StoryWish, 'id' | 'createdAt'>) => {
    console.log('Send wish for story:', storyId, wish);
    // Implement send wish functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Main Website Navigation */}
      <Header />
      
      {/* Sky Quest Navigation */}
      <SkyQuestNavigation currentSection="hall-of-stories" />
      
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Điện Chuyện Tà Xùa</h1>
              <Sparkles className="w-12 h-12 ml-4" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Nơi lưu giữ những câu chuyện đẹp nhất từ hành trình khám phá Tà Xùa. 
              Chia sẻ trải nghiệm, gửi lời chúc và kết nối với cộng đồng yêu thiên nhiên.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{stories.length}</div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Câu chuyện
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {stories.reduce((total, story) => total + story.cloudLikes, 0)}
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Thả mây
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {stories.reduce((total, story) => total + story.wishes.length, 0)}
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Lời chúc
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {new Set(stories.map(story => story.authorId)).size}
                </div>
                <div className="text-sm text-white/80 flex items-center justify-center">
                  <Users className="w-4 h-4 mr-1" />
                  Người kể
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
              <div className="text-4xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Chào mừng đến với Điện Chuyện Tà Xùa
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Đây là nơi những câu chuyện từ hành trình khám phá Tà Xùa được lưu giữ và chia sẻ. 
                Mỗi câu chuyện đều mang trong mình những cảm xúc chân thật và những trải nghiệm độc đáo 
                từ vùng núi rừng Tây Bắc tuyệt đẹp này.
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

export default HallOfStoriesPage;