import React, { useState, useEffect } from 'react';
import { MiniQuest, MiniQuestContent } from '../../types/narrativeAdventure';

interface MiniQuestSystemProps {
  userArchetype?: string;
  currentLocation?: string;
  isStationary?: boolean;
  onQuestComplete?: (questId: string, reward: any) => void;
  onQuestStart?: (questId: string) => void;
}

interface ActiveQuest extends MiniQuest {
  startTime: number;
  progress: number;
  currentStep: number;
  isCompleted: boolean;
}

const MINI_QUESTS: MiniQuest[] = [
  {
    id: 'mindful-breathing',
    title: 'Hơi Thở Chánh Niệm',
    description: 'Thực hành hít thở sâu và cảm nhận khoảnh khắc hiện tại',
    type: 'mindfulness',
    duration: 300, // 5 minutes
    difficulty: 'easy',
    archetype: 'observer',
    location: 'any',
    rewards: {
      points: 50,
      badge: 'mindful-observer',
      title: 'Người Quan Sát Tĩnh Lặng'
    },
    content: {
      steps: [
        'Tìm một vị trí thoải mái để ngồi hoặc đứng',
        'Nhắm mắt và tập trung vào hơi thở',
        'Hít vào sâu trong 4 giây',
        'Giữ hơi thở trong 4 giây',
        'Thở ra chậm trong 6 giây',
        'Lặp lại 10 lần và cảm nhận sự bình yên'
      ],
      tips: [
        'Không cần hoàn hảo, chỉ cần tập trung',
        'Nếu tâm trí lang thang, nhẹ nhàng đưa về hơi thở',
        'Cảm nhận không khí trong lành của Tà Xùa'
      ],
      guidance: 'Hãy để tâm trí được nghỉ ngơi và kết nối với thiên nhiên xung quanh bạn.'
    }
  },
  {
    id: 'photo-storytelling',
    title: 'Kể Chuyện Qua Ảnh',
    description: 'Chụp 3 bức ảnh kể một câu chuyện về khoảnh khắc này',
    type: 'creative',
    duration: 600, // 10 minutes
    difficulty: 'medium',
    archetype: 'storyteller',
    location: 'any',
    rewards: {
      points: 75,
      badge: 'visual-storyteller',
      title: 'Người Kể Chuyện Bằng Hình Ảnh'
    },
    content: {
      steps: [
        'Quan sát xung quanh và tìm chủ đề câu chuyện',
        'Chụp ảnh đầu tiên: "Khởi đầu" - điều gì thu hút bạn?',
        'Chụp ảnh thứ hai: "Phát triển" - chi tiết thú vị',
        'Chụp ảnh thứ ba: "Kết thúc" - cảm xúc hoặc thông điệp',
        'Viết một đoạn ngắn kết nối 3 bức ảnh',
        'Chia sẻ câu chuyện của bạn'
      ],
      tips: [
        'Tìm kiếm ánh sáng và góc độ thú vị',
        'Chú ý đến chi tiết nhỏ: lá cây, đá, mây',
        'Hãy kể câu chuyện từ góc nhìn cá nhân'
      ],
      guidance: 'Mỗi bức ảnh là một chương trong câu chuyện của bạn về Tà Xùa.'
    }
  },
  {
    id: 'nature-protection',
    title: 'Hành Động Bảo Vệ Nhỏ',
    description: 'Thực hiện một hành động nhỏ để bảo vệ môi trường',
    type: 'action',
    duration: 900, // 15 minutes
    difficulty: 'easy',
    archetype: 'protector',
    location: 'any',
    rewards: {
      points: 100,
      badge: 'eco-guardian',
      title: 'Người Bảo Vệ Thiên Nhiên'
    },
    content: {
      steps: [
        'Nhìn xung quanh và tìm rác thải (nếu có)',
        'Thu gom rác vào túi mang theo',
        'Chụp ảnh trước và sau khi dọn dẹp',
        'Quan sát và ghi chú về đa dạng sinh học',
        'Cam kết một hành động bảo vệ môi trường',
        'Chia sẻ thông điệp bảo vệ thiên nhiên'
      ],
      tips: [
        'An toàn là ưu tiên hàng đầu',
        'Không làm tổn hại đến thực vật tự nhiên',
        'Mỗi hành động nhỏ đều có ý nghĩa'
      ],
      guidance: 'Bạn là người bảo vệ của Tà Xùa. Hành động nhỏ hôm nay tạo nên tương lai xanh.'
    }
  },
  {
    id: 'creative-sketch',
    title: 'Phác Thảo Sáng Tạo',
    description: 'Vẽ hoặc phác thảo cảnh quan xung quanh bằng cách của riêng bạn',
    type: 'creative',
    duration: 1200, // 20 minutes
    difficulty: 'medium',
    archetype: 'creator',
    location: 'any',
    rewards: {
      points: 80,
      badge: 'nature-artist',
      title: 'Nghệ Sĩ Thiên Nhiên'
    },
    content: {
      steps: [
        'Chọn một góc nhìn yêu thích',
        'Bắt đầu với những đường nét cơ bản',
        'Thêm chi tiết dần dần',
        'Sử dụng màu sắc (nếu có) hoặc tạo bóng',
        'Thêm cảm xúc cá nhân vào tác phẩm',
        'Viết vài dòng về cảm hứng sáng tạo'
      ],
      tips: [
        'Không cần hoàn hảo, hãy thể hiện cảm xúc',
        'Quan sát ánh sáng và bóng đổ',
        'Thử nghiệm với các phong cách khác nhau'
      ],
      guidance: 'Nghệ thuật là cách bạn nhìn thế giới. Hãy để Tà Xùa truyền cảm hứng cho bạn.'
    }
  },
  {
    id: 'gratitude-reflection',
    title: 'Tĩnh Tâm Biết Ơn',
    description: 'Dành thời gian suy ngẫm và ghi lại những điều biết ơn',
    type: 'reflection',
    duration: 450, // 7.5 minutes
    difficulty: 'easy',
    archetype: 'observer',
    location: 'any',
    rewards: {
      points: 60,
      badge: 'grateful-heart',
      title: 'Trái Tim Biết Ơn'
    },
    content: {
      steps: [
        'Tìm một chỗ ngồi yên tĩnh',
        'Nghĩ về 3 điều bạn biết ơn hôm nay',
        'Viết chi tiết về từng điều',
        'Cảm nhận sự biết ơn trong lòng',
        'Nghĩ về người bạn muốn cảm ơn',
        'Gửi lời cảm ơn (tin nhắn hoặc trong tâm)'
      ],
      tips: [
        'Bắt đầu từ những điều nhỏ nhất',
        'Cảm nhận thật sự, không chỉ nghĩ',
        'Biết ơn cả những thử thách đã vượt qua'
      ],
      guidance: 'Lòng biết ơn là chìa khóa của hạnh phúc. Hãy để nó lan tỏa từ Tà Xùa.'
    }
  },
  {
    id: 'sound-meditation',
    title: 'Thiền Âm Thanh Tự Nhiên',
    description: 'Lắng nghe và ghi nhận các âm thanh tự nhiên xung quanh',
    type: 'mindfulness',
    duration: 600, // 10 minutes
    difficulty: 'easy',
    archetype: 'observer',
    location: 'any',
    rewards: {
      points: 70,
      badge: 'sound-listener',
      title: 'Người Lắng Nghe Thiên Nhiên'
    },
    content: {
      steps: [
        'Ngồi hoặc nằm thoải mái, nhắm mắt',
        'Lắng nghe âm thanh gần nhất (hơi thở, tim đập)',
        'Mở rộng ra âm thanh xung quanh (gió, lá)',
        'Chú ý âm thanh xa hơn (chim, côn trùng)',
        'Ghi nhận từng âm thanh mà không phán xét',
        'Viết lại trải nghiệm âm thanh của bạn'
      ],
      tips: [
        'Không cố gắng tìm kiếm âm thanh',
        'Để âm thanh đến với bạn tự nhiên',
        'Mỗi âm thanh đều có câu chuyện riêng'
      ],
      guidance: 'Thiên nhiên luôn đang nói chuyện. Hãy trở thành người lắng nghe tốt.'
    }
  }
];

const MiniQuestSystem: React.FC<MiniQuestSystemProps> = ({
  userArchetype = 'observer',
  currentLocation = 'any',
  isStationary = true,
  onQuestComplete,
  onQuestStart
}) => {
  const [availableQuests, setAvailableQuests] = useState<MiniQuest[]>([]);
  const [activeQuest, setActiveQuest] = useState<ActiveQuest | null>(null);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [showQuestDetails, setShowQuestDetails] = useState<string | null>(null);
  const [questTimer, setQuestTimer] = useState<number>(0);

  // Filter quests based on user archetype and location
  useEffect(() => {
    const filtered = MINI_QUESTS.filter(quest => 
      (quest.archetype === userArchetype || quest.archetype === 'any') &&
      (quest.location === currentLocation || quest.location === 'any') &&
      !completedQuests.includes(quest.id)
    );
    setAvailableQuests(filtered);
  }, [userArchetype, currentLocation, completedQuests]);

  // Timer for active quest
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeQuest && !activeQuest.isCompleted) {
      interval = setInterval(() => {
        setQuestTimer(prev => {
          const newTime = prev + 1;
          const progress = Math.min((newTime / activeQuest.duration) * 100, 100);
          
          setActiveQuest(current => 
            current ? { ...current, progress } : null
          );
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeQuest]);

  const startQuest = (quest: MiniQuest) => {
    const newActiveQuest: ActiveQuest = {
      ...quest,
      startTime: Date.now(),
      progress: 0,
      currentStep: 0,
      isCompleted: false
    };
    
    setActiveQuest(newActiveQuest);
    setQuestTimer(0);
    setShowQuestDetails(null);
    onQuestStart?.(quest.id);
  };

  const completeQuest = () => {
    if (!activeQuest) return;

    const completedQuest = { ...activeQuest, isCompleted: true, progress: 100 };
    setActiveQuest(completedQuest);
    setCompletedQuests(prev => [...prev, activeQuest.id]);
    
    onQuestComplete?.(activeQuest.id, activeQuest.rewards);

    // Auto-close after showing completion
    setTimeout(() => {
      setActiveQuest(null);
      setQuestTimer(0);
    }, 3000);
  };

  const abandonQuest = () => {
    setActiveQuest(null);
    setQuestTimer(0);
  };

  const nextStep = () => {
    if (!activeQuest || activeQuest.currentStep >= activeQuest.content.steps.length - 1) return;
    
    setActiveQuest(prev => 
      prev ? { ...prev, currentStep: prev.currentStep + 1 } : null
    );
  };

  const previousStep = () => {
    if (!activeQuest || activeQuest.currentStep <= 0) return;
    
    setActiveQuest(prev => 
      prev ? { ...prev, currentStep: prev.currentStep - 1 } : null
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'mindfulness': return '🧘';
      case 'creative': return '🎨';
      case 'action': return '🌱';
      case 'reflection': return '💭';
      default: return '✨';
    }
  };

  if (!isStationary) {
    return null;
  }

  return (
    <div className="mini-quest-system">
      {/* Active Quest */}
      {activeQuest && (
        <div className="active-quest-overlay">
          <div className="active-quest-container">
            <div className="quest-header">
              <div className="quest-title">
                <span className="quest-icon">{getTypeIcon(activeQuest.type)}</span>
                <h3>{activeQuest.title}</h3>
              </div>
              <div className="quest-controls">
                <div className="quest-timer">
                  {formatTime(questTimer)} / {formatTime(activeQuest.duration)}
                </div>
                <button 
                  className="abandon-btn"
                  onClick={abandonQuest}
                  title="Dừng nhiệm vụ"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="quest-progress">
              <div 
                className="progress-bar"
                style={{ width: `${activeQuest.progress}%` }}
              />
            </div>

            {activeQuest.isCompleted ? (
              <div className="quest-completed">
                <div className="completion-icon">🎉</div>
                <h4>Hoàn thành xuất sắc!</h4>
                <p>Bạn đã nhận được:</p>
                <div className="rewards-list">
                  <div className="reward-item">
                    <span className="reward-icon">⭐</span>
                    <span>{activeQuest.rewards.points} điểm</span>
                  </div>
                  <div className="reward-item">
                    <span className="reward-icon">🏆</span>
                    <span>{activeQuest.rewards.title}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="quest-content">
                <div className="current-step">
                  <h4>Bước {activeQuest.currentStep + 1}/{activeQuest.content.steps.length}</h4>
                  <p>{activeQuest.content.steps[activeQuest.currentStep]}</p>
                </div>

                <div className="step-navigation">
                  <button 
                    className="step-btn"
                    onClick={previousStep}
                    disabled={activeQuest.currentStep === 0}
                  >
                    ← Trước
                  </button>
                  
                  {activeQuest.currentStep === activeQuest.content.steps.length - 1 ? (
                    <button 
                      className="complete-btn"
                      onClick={completeQuest}
                    >
                      Hoàn thành ✓
                    </button>
                  ) : (
                    <button 
                      className="step-btn"
                      onClick={nextStep}
                    >
                      Tiếp →
                    </button>
                  )}
                </div>

                <div className="quest-guidance">
                  <h5>💡 Hướng dẫn:</h5>
                  <p>{activeQuest.content.guidance}</p>
                </div>

                {activeQuest.content.tips && (
                  <div className="quest-tips">
                    <h5>📝 Mẹo hữu ích:</h5>
                    <ul>
                      {activeQuest.content.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quest Selection */}
      {!activeQuest && (
        <div className="quest-selection">
          <div className="selection-header">
            <h3>🎯 Mini Quest - Thử thách tĩnh tại</h3>
            <p>Khám phá và trải nghiệm ngay tại chỗ bạn đang đứng</p>
          </div>

          <div className="quests-grid">
            {availableQuests.map((quest) => (
              <div key={quest.id} className="quest-card">
                <div className="quest-card-header">
                  <span className="quest-type-icon">{getTypeIcon(quest.type)}</span>
                  <div className="quest-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(quest.difficulty) }}
                    >
                      {quest.difficulty === 'easy' ? 'Dễ' : 
                       quest.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                    </span>
                    <span className="duration-badge">
                      {Math.round(quest.duration / 60)} phút
                    </span>
                  </div>
                </div>

                <h4>{quest.title}</h4>
                <p>{quest.description}</p>

                <div className="quest-rewards">
                  <span className="reward">⭐ {quest.rewards.points}</span>
                  <span className="reward">🏆 {quest.rewards.title}</span>
                </div>

                <div className="quest-actions">
                  <button 
                    className="details-btn"
                    onClick={() => setShowQuestDetails(
                      showQuestDetails === quest.id ? null : quest.id
                    )}
                  >
                    {showQuestDetails === quest.id ? 'Ẩn' : 'Chi tiết'}
                  </button>
                  <button 
                    className="start-btn"
                    onClick={() => startQuest(quest)}
                  >
                    Bắt đầu
                  </button>
                </div>

                {showQuestDetails === quest.id && (
                  <div className="quest-details">
                    <h5>Các bước thực hiện:</h5>
                    <ol>
                      {quest.content.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                    
                    <h5>Hướng dẫn:</h5>
                    <p>{quest.content.guidance}</p>
                    
                    {quest.content.tips && (
                      <>
                        <h5>Mẹo hữu ích:</h5>
                        <ul>
                          {quest.content.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {availableQuests.length === 0 && (
            <div className="no-quests">
              <div className="no-quests-icon">🎯</div>
              <h4>Tất cả nhiệm vụ đã hoàn thành!</h4>
              <p>Bạn đã hoàn thành tất cả Mini Quest có sẵn. Hãy tiếp tục hành trình khám phá!</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .mini-quest-system {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Active Quest Overlay */
        .active-quest-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .active-quest-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .quest-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .quest-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .quest-title h3 {
          margin: 0;
          font-size: 18px;
          color: #1f2937;
        }

        .quest-icon {
          font-size: 24px;
        }

        .quest-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quest-timer {
          font-family: monospace;
          font-size: 14px;
          color: #6b7280;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .abandon-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quest-progress {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          transition: width 0.3s ease;
        }

        .quest-completed {
          text-align: center;
          padding: 20px 0;
        }

        .completion-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .quest-completed h4 {
          color: #059669;
          margin: 0 0 8px 0;
        }

        .rewards-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 16px;
        }

        .reward-item {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          padding: 8px 16px;
          background: #f0fdf4;
          border-radius: 8px;
          color: #166534;
        }

        .quest-content {
          space-y: 16px;
        }

        .current-step {
          margin-bottom: 20px;
        }

        .current-step h4 {
          color: #1f2937;
          margin: 0 0 8px 0;
          font-size: 16px;
        }

        .current-step p {
          color: #4b5563;
          line-height: 1.5;
          margin: 0;
        }

        .step-navigation {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .step-btn {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .step-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .step-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .complete-btn {
          background: #059669;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .complete-btn:hover {
          background: #047857;
        }

        .quest-guidance {
          background: #eff6ff;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .quest-guidance h5 {
          margin: 0 0 8px 0;
          color: #1e40af;
          font-size: 14px;
        }

        .quest-guidance p {
          margin: 0;
          color: #1e3a8a;
          font-size: 14px;
          line-height: 1.4;
        }

        .quest-tips {
          background: #fefce8;
          padding: 12px;
          border-radius: 8px;
        }

        .quest-tips h5 {
          margin: 0 0 8px 0;
          color: #a16207;
          font-size: 14px;
        }

        .quest-tips ul {
          margin: 0;
          padding-left: 16px;
          color: #a16207;
        }

        .quest-tips li {
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 4px;
        }

        /* Quest Selection */
        .quest-selection {
          padding: 20px;
        }

        .selection-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .selection-header h3 {
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .selection-header p {
          color: #6b7280;
          margin: 0;
        }

        .quests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .quest-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .quest-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .quest-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .quest-type-icon {
          font-size: 24px;
        }

        .quest-meta {
          display: flex;
          gap: 8px;
        }

        .difficulty-badge, .duration-badge {
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
        }

        .duration-badge {
          background: #6b7280;
        }

        .quest-card h4 {
          color: #1f2937;
          margin: 0 0 8px 0;
          font-size: 16px;
        }

        .quest-card p {
          color: #6b7280;
          margin: 0 0 16px 0;
          font-size: 14px;
          line-height: 1.4;
        }

        .quest-rewards {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .reward {
          font-size: 12px;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 6px;
          color: #374151;
        }

        .quest-actions {
          display: flex;
          gap: 8px;
        }

        .details-btn {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 14px;
          flex: 1;
        }

        .start-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          flex: 1;
        }

        .start-btn:hover {
          background: #2563eb;
        }

        .quest-details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
        }

        .quest-details h5 {
          color: #374151;
          margin: 12px 0 6px 0;
          font-size: 13px;
          font-weight: 600;
        }

        .quest-details ol, .quest-details ul {
          margin: 0 0 12px 0;
          padding-left: 16px;
        }

        .quest-details li {
          margin-bottom: 4px;
          line-height: 1.4;
          color: #4b5563;
        }

        .no-quests {
          text-align: center;
          padding: 40px 20px;
          color: #6b7280;
        }

        .no-quests-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .no-quests h4 {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .no-quests p {
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .active-quest-container {
            margin: 10px;
            padding: 16px;
          }

          .quests-grid {
            grid-template-columns: 1fr;
          }

          .quest-meta {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default MiniQuestSystem;