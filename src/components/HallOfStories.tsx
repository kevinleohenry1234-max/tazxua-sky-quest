import React, { useState } from 'react';
import { Cloud, Heart, MessageCircle, Filter, Search, Calendar, User, MapPin, Badge } from 'lucide-react';
import { StoryCard, StoryWish } from '../types/journey';

interface HallOfStoriesProps {
  stories: StoryCard[];
  onCloudLike: (storyId: string) => void;
  onSendWish: (storyId: string, wish: Omit<StoryWish, 'id' | 'createdAt'>) => void;
}

const HallOfStories: React.FC<HallOfStoriesProps> = ({ stories, onCloudLike, onSendWish }) => {
  const [filter, setFilter] = useState<'all' | 'journey' | 'badge' | 'archetype'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState<StoryCard | null>(null);
  const [wishText, setWishText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💙');

  const wishEmojis = ['💙', '🌟', '🌸', '🍀', '🌈', '✨', '🦋', '🌺'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'journey': return story.journeyId;
      case 'badge': return story.badge;
      case 'archetype': return story.archetype;
      default: return true;
    }
  });

  const handleSendWish = (storyId: string) => {
    if (wishText.trim()) {
      onSendWish(storyId, {
        authorId: 'current-user',
        authorName: 'Bạn',
        content: wishText.trim(),
        emoji: selectedEmoji
      });
      setWishText('');
      setSelectedEmoji('💙');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Cloud className="w-8 h-8 text-blue-500 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Hall of Stories</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          "Nơi lưu giữ những câu chuyện nhỏ giữa mây trời Tà Xùa"
        </p>
        <p className="text-gray-500 mt-2">
          Chia sẻ khoảnh khắc đáng nhớ và kết nối với cộng đồng yêu thiên nhiên
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm câu chuyện, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Tất cả
            </button>
            <button
              onClick={() => setFilter('journey')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filter === 'journey' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Hành trình
            </button>
            <button
              onClick={() => setFilter('badge')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filter === 'badge' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Badge className="w-4 h-4 inline mr-2" />
              Huy hiệu
            </button>
          </div>
        </div>
      </div>

      {/* Stories Timeline */}
      <div className="space-y-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Story Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    {story.authorAvatar ? (
                      <img src={story.authorAvatar} alt={story.authorName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.authorName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{story.createdAt.toLocaleDateString('vi-VN')}</span>
                      <span>•</span>
                      <span>{story.journeyTitle}</span>
                    </div>
                  </div>
                </div>
                {story.badge && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    🏆 Huy hiệu mới
                  </div>
                )}
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h4>
              <p className="text-gray-700 leading-relaxed mb-4">{story.content}</p>
              
              {story.image && (
                <div className="mb-4">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Tags */}
              {story.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Story Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => onCloudLike(story.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Cloud className="w-5 h-5" />
                    <span className="font-medium">{story.cloudLikes}</span>
                    <span className="text-sm">Thả mây</span>
                  </button>
                  <button
                    onClick={() => setSelectedStory(selectedStory?.id === story.id ? null : story)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{story.wishes.length}</span>
                    <span className="text-sm">Lời chúc</span>
                  </button>
                </div>
              </div>

              {/* Wishes Section */}
              {selectedStory?.id === story.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {/* Send Wish */}
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                      {wishEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`text-2xl p-2 rounded-lg transition-colors ${
                            selectedEmoji === emoji ? 'bg-purple-100' : 'hover:bg-gray-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Gửi lời chúc tốt đẹp..."
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendWish(story.id)}
                      />
                      <button
                        onClick={() => handleSendWish(story.id)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Gửi
                      </button>
                    </div>
                  </div>

                  {/* Existing Wishes */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {story.wishes.map((wish) => (
                      <div key={wish.id} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-lg">{wish.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{wish.authorName}</span>
                            <span className="text-xs text-gray-500">
                              {wish.createdAt.toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{wish.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có câu chuyện nào</h3>
          <p className="text-gray-400">Hãy là người đầu tiên chia sẻ câu chuyện của bạn!</p>
        </div>
      )}
    </div>
  );
};

export default HallOfStories;