import React, { useState, useEffect } from 'react';
import { Journey, JourneyChapter, DiaryEntry } from '../../types/narrativeAdventure';

interface JourneyExperienceProps {
  journey: Journey;
  onChapterComplete: (chapterId: string, diaryEntry?: string) => void;
  onJourneyComplete: () => void;
  onGoBack: () => void;
  completedChapters: string[];
}

const JourneyExperience: React.FC<JourneyExperienceProps> = ({
  journey,
  onChapterComplete,
  onJourneyComplete,
  onGoBack,
  completedChapters
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showChapterDetail, setShowChapterDetail] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [showReflectionModal, setShowReflectionModal] = useState(false);

  const currentChapter = journey.chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === journey.chapters.length - 1;
  const progress = (completedChapters.length / journey.chapters.length) * 100;

  // Auto-advance to next incomplete chapter
  useEffect(() => {
    const nextIncompleteIndex = journey.chapters.findIndex(
      chapter => !completedChapters.includes(chapter.id)
    );
    if (nextIncompleteIndex !== -1) {
      setCurrentChapterIndex(nextIncompleteIndex);
    }
  }, [completedChapters, journey.chapters]);

  const handleChapterComplete = () => {
    setShowReflectionModal(true);
  };

  const submitChapterCompletion = () => {
    setIsCompleting(true);
    
    // Generate auto diary entry
    const autoDiaryEntry = generateDiaryEntry(currentChapter, userReflection);
    
    setTimeout(() => {
      onChapterComplete(currentChapter.id, autoDiaryEntry);
      setIsCompleting(false);
      setShowReflectionModal(false);
      setUserReflection('');
      
      if (isLastChapter) {
        setTimeout(() => onJourneyComplete(), 1000);
      } else {
        setCurrentChapterIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const generateDiaryEntry = (chapter: JourneyChapter, reflection: string): string => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('vi-VN');
    
    const templates = [
      `${dateStr}, ${timeStr} - Hôm nay tôi đã hoàn thành "${chapter.title}". ${reflection || 'Đây là một trải nghiệm đáng nhớ trong hành trình khám phá Tà Xùa của tôi.'}`,
      `Chặng "${chapter.title}" - ${dateStr}: ${reflection || 'Một khoảnh khắc đẹp trong hành trình của tôi tại Tà Xùa. Thiên nhiên nơi đây thật sự kỳ diệu.'}`,
      `${timeStr}, ${dateStr} - Vừa trải qua "${chapter.title}". ${reflection || 'Cảm giác thật tuyệt vời khi được kết nối với thiên nhiên và văn hóa địa phương.'}`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const isChapterCompleted = (chapterId: string) => completedChapters.includes(chapterId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onGoBack}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-1 mx-4">
              <h1 className="text-xl font-bold text-gray-800">{journey.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {completedChapters.length}/{journey.chapters.length}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Chặng hiện tại</div>
              <div className="font-medium text-gray-800">{currentChapterIndex + 1}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Journey Map */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bản đồ hành trình</h2>
          <div className="flex flex-wrap gap-4">
            {journey.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  index === currentChapterIndex
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white scale-105'
                    : isChapterCompleted(chapter.id)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setCurrentChapterIndex(index)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === currentChapterIndex
                    ? 'bg-white text-green-600'
                    : isChapterCompleted(chapter.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {isChapterCompleted(chapter.id) ? '✓' : index + 1}
                </div>
                <span className="font-medium">{chapter.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Chapter */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Chapter Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentChapter.title}</h2>
                <p className="text-green-100">{currentChapter.description}</p>
              </div>
              <div className="text-right">
                <div className="text-green-100 text-sm">Chặng</div>
                <div className="text-3xl font-bold">{currentChapterIndex + 1}</div>
              </div>
            </div>
          </div>

          {/* Chapter Content */}
          <div className="p-6">
            {/* Story Text */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">Câu chuyện</h3>
              <p className="text-gray-700 leading-relaxed italic">
                "{currentChapter.storyText}"
              </p>
            </div>

            {/* Guidance */}
            <div className="mb-6 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Hướng dẫn
              </h3>
              <p className="text-gray-700">{currentChapter.guidanceText}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!isChapterCompleted(currentChapter.id) ? (
                <>
                  <button
                    onClick={handleChapterComplete}
                    className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Hoàn thành chặng này
                  </button>
                  <button
                    onClick={() => setShowChapterDetail(true)}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Xem chi tiết
                  </button>
                </>
              ) : (
                <div className="flex-1 py-4 bg-green-100 text-green-800 font-bold rounded-xl text-center">
                  ✓ Đã hoàn thành
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Journey Progress Summary */}
        {completedChapters.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Nhật ký hành trình</h3>
            <div className="space-y-3">
              {journey.chapters
                .filter(chapter => isChapterCompleted(chapter.id))
                .map((chapter, index) => (
                  <div key={chapter.id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{chapter.title}</h4>
                      <p className="text-sm text-gray-600">Đã hoàn thành</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Reflection Modal */}
      {showReflectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Chia sẻ cảm nhận</h3>
            <p className="text-gray-600 mb-4">
              Hãy chia sẻ cảm nhận của bạn về chặng hành trình vừa trải qua. 
              Điều này sẽ được lưu vào nhật ký cá nhân của bạn.
            </p>
            
            <textarea
              value={userReflection}
              onChange={(e) => setUserReflection(e.target.value)}
              placeholder="Ví dụ: Tôi cảm thấy thật bình yên khi ngắm nhìn cảnh núi rừng Tà Xùa..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowReflectionModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={submitChapterCompletion}
                disabled={isCompleting}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
              >
                {isCompleting ? 'Đang lưu...' : 'Hoàn thành'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Audio Control */}
      {journey.soundscapeUrl && (
        <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3">
          <button className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 106 0v-6a3 3 0 00-6 0v6z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default JourneyExperience;