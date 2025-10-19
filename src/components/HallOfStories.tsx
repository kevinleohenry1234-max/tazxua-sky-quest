import React, { useState } from 'react';
import { Cloud, Heart, MessageCircle, Filter, Search, Calendar, User, MapPin, Badge, Coffee, Feather } from 'lucide-react';
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
      {/* Header Banner - Warm and cozy */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Coffee className="w-6 h-6 text-amber-600 mr-2" />
          <h2 className="text-2xl md:text-3xl font-light text-amber-900">Những Câu Chuyện Từ Trái Tim</h2>
          <Feather className="w-6 h-6 text-amber-600 ml-2" />
        </div>
        <p className="text-base md:text-lg text-amber-700 max-w-2xl mx-auto font-light">
          "Nơi mỗi câu chuyện đều mang theo hơi thở của núi rừng Tà Xùa"
        </p>
        <p className="text-amber-600 mt-2 text-sm font-light">
          Chia sẻ khoảnh khắc đáng nhớ và kết nối với những người bạn cùng chung tình yêu thiên nhiên
        </p>
      </div>

      {/* Search and Filter - Warm design */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm câu chuyện, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90 text-amber-900 placeholder-amber-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-xl font-light transition-colors ${
                filter === 'all' ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Tất cả
            </button>
            <button
              onClick={() => setFilter('journey')}
              className={`px-4 py-3 rounded-xl font-light transition-colors ${
                filter === 'journey' ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Hành trình
            </button>
            <button
              onClick={() => setFilter('badge')}
              className={`px-4 py-3 rounded-xl font-light transition-colors ${
                filter === 'badge' ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <Badge className="w-4 h-4 inline mr-2" />
              Huy hiệu
            </button>
          </div>
        </div>
      </div>

      {/* Stories Grid - Warm card design */}
      <div className="grid gap-6 md:gap-8">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            {/* Story Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">{story.authorName}</h3>
                    <p className="text-sm text-amber-600 font-light">
                      {story.createdAt.toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-light">
                    {story.journeyTitle}
                  </span>
                </div>
              </div>

              {/* Story Title */}
              <h2 className="text-xl md:text-2xl font-light text-amber-900 mb-3 leading-relaxed">
                {story.title}
              </h2>

              {/* Story Content */}
              <p className="text-amber-800 leading-relaxed mb-4 font-light">
                {story.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs border border-amber-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Story Image */}
            {story.image && (
              <div className="px-6 mb-4">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Interaction Bar */}
            <div className="px-6 py-4 bg-amber-50/50 border-t border-amber-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onCloudLike(story.id)}
                    className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-light">{story.cloudLikes}</span>
                  </button>
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-light">{story.wishes.length}</span>
                  </button>
                </div>
                <button
                  onClick={() => setSelectedStory(story)}
                  className="px-4 py-2 bg-amber-200 text-amber-800 rounded-xl hover:bg-amber-300 transition-colors text-sm font-light"
                >
                  Gửi lời nhắn
                </button>
              </div>

              {/* Wishes Preview */}
              {story.wishes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <div className="space-y-2">
                    {story.wishes.slice(0, 2).map((wish) => (
                      <div key={wish.id} className="flex items-start space-x-2">
                        <span className="text-lg">{wish.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm text-amber-800 font-light">
                            <span className="font-medium text-amber-900">{wish.authorName}:</span> {wish.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    {story.wishes.length > 2 && (
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="text-sm text-amber-600 hover:text-amber-700 font-light"
                      >
                        Xem thêm {story.wishes.length - 2} lời nhắn khác...
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Story Detail Modal - Warm design */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-amber-900">Gửi lời nhắn đến {selectedStory.authorName}</h3>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Story Preview */}
              <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">{selectedStory.title}</h4>
                <p className="text-sm text-amber-700 font-light line-clamp-3">{selectedStory.content}</p>
              </div>

              {/* Existing Wishes */}
              {selectedStory.wishes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-amber-900 mb-3">Những lời nhắn đã gửi</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {selectedStory.wishes.map((wish) => (
                      <div key={wish.id} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <span className="text-xl">{wish.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm text-amber-800 font-light">
                            <span className="font-medium text-amber-900">{wish.authorName}:</span> {wish.content}
                          </p>
                          <p className="text-xs text-amber-600 mt-1">
                            {wish.createdAt.toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Send Wish Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Chọn biểu tượng cảm xúc</label>
                  <div className="flex flex-wrap gap-2">
                    {wishEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${
                          selectedEmoji === emoji ? 'bg-amber-200 ring-2 ring-amber-400' : 'bg-amber-100 hover:bg-amber-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Lời nhắn của bạn</label>
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Chia sẻ cảm xúc của bạn về câu chuyện này..."
                    className="w-full p-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none h-24 bg-white/90 text-amber-900 placeholder-amber-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSendWish(selectedStory.id)}
                    disabled={!wishText.trim()}
                    className="flex-1 bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors font-light"
                  >
                    Gửi lời nhắn
                  </button>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-6 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors font-light"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-xl font-light text-amber-900 mb-2">Không tìm thấy câu chuyện nào</h3>
          <p className="text-amber-600 font-light">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}
    </div>
  );
};

export default HallOfStories;