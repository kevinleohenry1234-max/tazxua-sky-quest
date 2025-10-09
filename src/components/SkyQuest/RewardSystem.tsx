import React, { useState, useEffect } from 'react';
import { JourneyReward, SouvenirCard } from '../../types/narrativeAdventure';
import { ENHANCED_REWARDS } from '../../data/narrativeAdventureData';

interface RewardSystemProps {
  rewards: JourneyReward[];
  onRewardClaim?: (reward: JourneyReward) => void;
  userArchetype?: string;
}

interface RewardDisplayProps {
  reward: JourneyReward;
  isNew?: boolean;
  onClaim?: () => void;
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ reward, isNew = false, onClaim }) => {
  const [isRevealed, setIsRevealed] = useState(!isNew);
  const [showDetails, setShowDetails] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    onClaim?.();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6b7280';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return '0 0 10px rgba(107, 114, 128, 0.3)';
      case 'rare': return '0 0 15px rgba(59, 130, 246, 0.4)';
      case 'epic': return '0 0 20px rgba(139, 92, 246, 0.5)';
      case 'legendary': return '0 0 25px rgba(245, 158, 11, 0.6)';
      default: return 'none';
    }
  };

  return (
    <div className={`reward-card ${isNew ? 'new-reward' : ''} ${isRevealed ? 'revealed' : 'hidden'}`}>
      {!isRevealed ? (
        <div className="reward-mystery" onClick={handleReveal}>
          <div className="mystery-box">
            <span className="mystery-icon">🎁</span>
            <p className="mystery-text">Nhấn để mở phần thưởng!</p>
          </div>
        </div>
      ) : (
        <div className="reward-content" onClick={() => setShowDetails(!showDetails)}>
          <div className="reward-header">
            <span className="reward-icon" style={{ fontSize: '32px' }}>{reward.icon}</span>
            <div className="reward-info">
              <h3 className="reward-name">{reward.name}</h3>
              <span 
                className="reward-rarity" 
                style={{ 
                  color: getRarityColor(reward.rarity),
                  textShadow: getRarityGlow(reward.rarity)
                }}
              >
                {reward.rarity.toUpperCase()}
              </span>
            </div>
          </div>
          
          <p className="reward-description">{reward.description}</p>
          
          {reward.emotionalValue && (
            <div className="emotional-value">
              <span className="emotion-icon">💝</span>
              <span className="emotion-text">{reward.emotionalValue}</span>
            </div>
          )}

          {showDetails && (
            <div className="reward-details">
              {reward.type === 'souvenir_card' && ENHANCED_REWARDS.souvenirCards[reward.value] && (
                <div className="souvenir-story">
                  <h4>Câu chuyện của bạn:</h4>
                  <p>{ENHANCED_REWARDS.souvenirCards[reward.value].story}</p>
                </div>
              )}
              
              {reward.type === 'title' && ENHANCED_REWARDS.titles[reward.value] && (
                <div className="title-unlock">
                  <p className="unlock-message">
                    {ENHANCED_REWARDS.titles[reward.value].unlockMessage}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        .reward-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 16px;
          padding: 20px;
          margin: 12px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .reward-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .new-reward {
          animation: rewardAppear 1s ease-out;
          border-color: #fbbf24;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        }

        .reward-mystery {
          text-align: center;
          padding: 40px 20px;
        }

        .mystery-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .mystery-icon {
          font-size: 48px;
          animation: bounce 2s infinite;
        }

        .mystery-text {
          font-size: 16px;
          color: #6b7280;
          font-weight: 500;
        }

        .reward-content {
          position: relative;
        }

        .reward-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .reward-info {
          flex: 1;
        }

        .reward-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1f2937;
        }

        .reward-rarity {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .reward-description {
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .emotional-value {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #92400e;
          font-style: italic;
        }

        .reward-details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          animation: slideDown 0.3s ease-out;
        }

        .souvenir-story h4,
        .title-unlock h4 {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .souvenir-story p,
        .unlock-message {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
          font-style: italic;
        }

        .unlock-message {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          padding: 12px;
          border-radius: 8px;
          color: #1e40af;
          text-align: center;
          font-weight: 500;
        }

        @keyframes rewardAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const RewardSystem: React.FC<RewardSystemProps> = ({ 
  rewards, 
  onRewardClaim, 
  userArchetype = 'observer' 
}) => {
  const [newRewards, setNewRewards] = useState<string[]>([]);
  const [showRewardModal, setShowRewardModal] = useState(false);

  useEffect(() => {
    // Simulate new rewards being unlocked
    const timer = setTimeout(() => {
      if (rewards.length > 0) {
        setNewRewards([rewards[0].value]);
        setShowRewardModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [rewards]);

  const handleRewardClaim = (reward: JourneyReward) => {
    setNewRewards(prev => prev.filter(id => id !== reward.value));
    onRewardClaim?.(reward);
  };

  const getArchetypeRewardMessage = (archetype: string) => {
    const messages = {
      protector: "Bạn đã chứng minh tình yêu với thiên nhiên! 🌲",
      observer: "Sự kiên nhẫn của bạn đã được đền đáp! 👁️",
      storyteller: "Câu chuyện của bạn sẽ được lưu truyền! 📚",
      creator: "Tài năng nghệ thuật của bạn thật tuyệt vời! 🎨"
    };
    return messages[archetype as keyof typeof messages] || "Chúc mừng bạn! 🎉";
  };

  if (rewards.length === 0) {
    return (
      <div className="no-rewards">
        <span className="no-rewards-icon">🏆</span>
        <p>Hoàn thành các thử thách để nhận phần thưởng!</p>
      </div>
    );
  }

  return (
    <div className="reward-system">
      <div className="reward-header">
        <h2 className="reward-title">
          <span className="title-icon">🏆</span>
          Phần thưởng của bạn
        </h2>
        <p className="reward-subtitle">
          {getArchetypeRewardMessage(userArchetype)}
        </p>
      </div>

      <div className="rewards-grid">
        {rewards.map((reward) => (
          <RewardDisplay
            key={reward.value}
            reward={reward}
            isNew={newRewards.includes(reward.value)}
            onClaim={() => handleRewardClaim(reward)}
          />
        ))}
      </div>

      {showRewardModal && newRewards.length > 0 && (
        <div className="reward-modal-overlay" onClick={() => setShowRewardModal(false)}>
          <div className="reward-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎉 Phần thưởng mới!</h3>
              <button 
                className="close-button"
                onClick={() => setShowRewardModal(false)}
              >
                ×
              </button>
            </div>
            <p>Bạn vừa mở khóa phần thưởng mới! Hãy kiểm tra danh sách phần thưởng của bạn.</p>
          </div>
        </div>
      )}

      <style>{`
        .reward-system {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .reward-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .reward-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .title-icon {
          font-size: 32px;
        }

        .reward-subtitle {
          font-size: 16px;
          color: #6b7280;
          font-weight: 500;
        }

        .rewards-grid {
          display: grid;
          gap: 16px;
        }

        .no-rewards {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-rewards-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }

        .reward-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .reward-modal {
          background: white;
          border-radius: 16px;
          padding: 24px;
          max-width: 400px;
          margin: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalAppear 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
          color: #1f2937;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .close-button:hover {
          background-color: #f3f4f6;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RewardSystem;