import React, { useState, useEffect } from 'react';
import { SouvenirCard } from '../../types/narrativeAdventure';
import { ENHANCED_REWARDS } from '../../data/narrativeAdventureData';

interface SouvenirGalleryProps {
  souvenirs: SouvenirCard[];
  userArchetype?: string;
  onSouvenirView?: (souvenir: SouvenirCard) => void;
}

interface SouvenirCardDisplayProps {
  souvenir: SouvenirCard;
  onClick: () => void;
}

const SouvenirCardDisplay: React.FC<SouvenirCardDisplayProps> = ({ souvenir, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          border: '2px solid #6b7280',
          boxShadow: '0 4px 15px rgba(107, 114, 128, 0.2)',
          background: 'linear-gradient(145deg, #f9fafb, #f3f4f6)'
        };
      case 'rare':
        return {
          border: '2px solid #3b82f6',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
          background: 'linear-gradient(145deg, #dbeafe, #bfdbfe)'
        };
      case 'epic':
        return {
          border: '2px solid #8b5cf6',
          boxShadow: '0 4px 25px rgba(139, 92, 246, 0.4)',
          background: 'linear-gradient(145deg, #ede9fe, #ddd6fe)'
        };
      case 'legendary':
        return {
          border: '2px solid #f59e0b',
          boxShadow: '0 4px 30px rgba(245, 158, 11, 0.5)',
          background: 'linear-gradient(145deg, #fef3c7, #fde68a)'
        };
      default:
        return {
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(145deg, #ffffff, #f9fafb)'
        };
    }
  };

  const enhancedSouvenir = ENHANCED_REWARDS.souvenirCards[souvenir.id];

  return (
    <div 
      className={`souvenir-card ${isLoaded ? 'loaded' : ''}`}
      style={getRarityStyle(souvenir.rarity)}
      onClick={onClick}
    >
      <div className="souvenir-image">
        {enhancedSouvenir?.imageUrl ? (
          <img 
            src={enhancedSouvenir.imageUrl} 
            alt={souvenir.title}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="placeholder-image">
            <span className="placeholder-icon">🎴</span>
          </div>
        )}
        <div className="rarity-badge">
          {souvenir.rarity.toUpperCase()}
        </div>
      </div>

      <div className="souvenir-content">
        <h3 className="souvenir-title">{souvenir.title}</h3>
        <p className="souvenir-description">{souvenir.description}</p>
        
        {souvenir.emotionalValue && (
          <div className="emotional-tag">
            <span className="emotion-icon">💝</span>
            <span className="emotion-text">{souvenir.emotionalValue}</span>
          </div>
        )}

        <div className="souvenir-date">
          <span className="date-icon">📅</span>
          <span>{souvenir.dateCollected || 'Hôm nay'}</span>
        </div>
      </div>

      <style>{`
        .souvenir-card {
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          position: relative;
          overflow: hidden;
        }

        .souvenir-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .souvenir-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .souvenir-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .souvenir-card:hover::before {
          transform: translateX(100%);
        }

        .souvenir-image {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
          background: #f3f4f6;
        }

        .souvenir-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .placeholder-icon {
          font-size: 48px;
          opacity: 0.5;
        }

        .rarity-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .souvenir-content {
          position: relative;
          z-index: 1;
        }

        .souvenir-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .souvenir-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .emotional-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.7);
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 12px;
          color: #374151;
          margin-bottom: 8px;
          font-style: italic;
        }

        .souvenir-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

const SouvenirModal: React.FC<{
  souvenir: SouvenirCard | null;
  onClose: () => void;
}> = ({ souvenir, onClose }) => {
  if (!souvenir) return null;

  const enhancedSouvenir = ENHANCED_REWARDS.souvenirCards[souvenir.id];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-image">
          {enhancedSouvenir?.imageUrl ? (
            <img src={enhancedSouvenir.imageUrl} alt={souvenir.title} />
          ) : (
            <div className="modal-placeholder">
              <span>🎴</span>
            </div>
          )}
        </div>

        <div className="modal-info">
          <h2 className="modal-title">{souvenir.title}</h2>
          <p className="modal-description">{souvenir.description}</p>
          
          {enhancedSouvenir?.story && (
            <div className="story-section">
              <h3>Câu chuyện của bạn</h3>
              <p className="story-text">{enhancedSouvenir.story}</p>
            </div>
          )}

          {souvenir.emotionalValue && (
            <div className="modal-emotional">
              <span className="emotion-icon">💝</span>
              <span>{souvenir.emotionalValue}</span>
            </div>
          )}

          <div className="modal-metadata">
            <span className="rarity-tag">{souvenir.rarity.toUpperCase()}</span>
            <span className="date-tag">📅 {souvenir.dateCollected || 'Hôm nay'}</span>
          </div>
        </div>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }

          .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
          }

          .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 18px;
            cursor: pointer;
            z-index: 10;
            transition: background-color 0.2s;
          }

          .close-button:hover {
            background: rgba(0, 0, 0, 0.7);
          }

          .modal-image {
            width: 100%;
            height: 300px;
            border-radius: 20px 20px 0 0;
            overflow: hidden;
            background: #f3f4f6;
          }

          .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .modal-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            color: #9ca3af;
          }

          .modal-info {
            padding: 24px;
          }

          .modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 12px 0;
          }

          .modal-description {
            font-size: 16px;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .story-section {
            background: #f9fafb;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 20px;
          }

          .story-section h3 {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin: 0 0 8px 0;
          }

          .story-text {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
            font-style: italic;
          }

          .modal-emotional {
            display: flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 14px;
            color: #92400e;
            font-style: italic;
            margin-bottom: 20px;
          }

          .modal-metadata {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
          }

          .rarity-tag {
            background: #374151;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }

          .date-tag {
            font-size: 14px;
            color: #6b7280;
          }

          @keyframes modalSlideIn {
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
    </div>
  );
};

const SouvenirGallery: React.FC<SouvenirGalleryProps> = ({ 
  souvenirs, 
  userArchetype = 'observer',
  onSouvenirView 
}) => {
  const [selectedSouvenir, setSelectedSouvenir] = useState<SouvenirCard | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const handleSouvenirClick = (souvenir: SouvenirCard) => {
    setSelectedSouvenir(souvenir);
    onSouvenirView?.(souvenir);
  };

  const filteredSouvenirs = souvenirs.filter(souvenir => {
    if (filter === 'all') return true;
    return souvenir.rarity === filter;
  });

  const getArchetypeMessage = (archetype: string) => {
    const messages = {
      protector: "Những kỷ vật này ghi lại hành trình bảo vệ thiên nhiên của bạn 🌲",
      observer: "Mỗi kỷ vật là một khoảnh khắc đẹp bạn đã ghi lại 👁️",
      storyteller: "Những câu chuyện của bạn được lưu giữ trong từng kỷ vật 📚",
      creator: "Nghệ thuật của bạn được thể hiện qua những kỷ vật này 🎨"
    };
    return messages[archetype as keyof typeof messages] || "Bộ sưu tập kỷ vật của bạn 🎴";
  };

  if (souvenirs.length === 0) {
    return (
      <div className="empty-gallery">
        <div className="empty-icon">🎴</div>
        <h3>Chưa có kỷ vật nào</h3>
        <p>Hoàn thành các hành trình để thu thập những kỷ vật đặc biệt!</p>
      </div>
    );
  }

  return (
    <div className="souvenir-gallery">
      <div className="gallery-header">
        <h2 className="gallery-title">
          <span className="title-icon">🎴</span>
          Kỷ vật hành trình
        </h2>
        <p className="gallery-subtitle">
          {getArchetypeMessage(userArchetype)}
        </p>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tất cả ({souvenirs.length})
        </button>
        {['common', 'rare', 'epic', 'legendary'].map(rarity => {
          const count = souvenirs.filter(s => s.rarity === rarity).length;
          if (count === 0) return null;
          
          return (
            <button
              key={rarity}
              className={`filter-button ${filter === rarity ? 'active' : ''}`}
              onClick={() => setFilter(rarity)}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      <div className="souvenirs-grid">
        {filteredSouvenirs.map((souvenir, index) => (
          <SouvenirCardDisplay
            key={souvenir.id}
            souvenir={souvenir}
            onClick={() => handleSouvenirClick(souvenir)}
          />
        ))}
      </div>

      <SouvenirModal
        souvenir={selectedSouvenir}
        onClose={() => setSelectedSouvenir(null)}
      />

      <style>{`
        .souvenir-gallery {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .gallery-title {
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

        .gallery-subtitle {
          font-size: 16px;
          color: #6b7280;
          font-weight: 500;
        }

        .filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-button {
          background: #f3f4f6;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-button:hover {
          background: #e5e7eb;
        }

        .filter-button.active {
          background: #3b82f6;
          color: white;
        }

        .souvenirs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .empty-gallery {
          text-align: center;
          padding: 80px 20px;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-gallery h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }

        .empty-gallery p {
          font-size: 16px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default SouvenirGallery;