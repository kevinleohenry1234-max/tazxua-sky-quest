import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart, ZoomIn, ZoomOut, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LightboxProps {
  images: Array<{
    id: number;
    title: string;
    description: string;
    image?: string;
    thumbnail?: string;
    photographer?: string;
    views?: number;
    likes?: number;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentImage = images[currentIndex];
  const imageUrl = currentImage?.image || currentImage?.thumbnail || '';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          break;
        case 'ArrowRight':
          onNext();
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrevClick = () => {
    onPrev();
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleNextClick = () => {
    onNext();
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{currentImage.title}</h2>
            {currentImage.photographer && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Eye className="w-3 h-3 mr-1" />
                {currentImage.photographer}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              aria-label="Thu nhỏ ảnh"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              aria-label="Phóng to ảnh"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              aria-label="Tải xuống ảnh"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              aria-label="Chia sẻ ảnh"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              aria-label="Thích ảnh"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={onClose}
              aria-label="Đóng lightbox"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
        onClick={handlePrevClick}
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
        onClick={handleNextClick}
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Main Image */}
      <div
        className="flex-1 flex items-center justify-center p-16 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={imageUrl}
          alt={currentImage.title}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="text-white text-center">
          <p className="text-sm opacity-80 mb-2">{currentImage.description}</p>
          <div className="flex items-center justify-center gap-4 text-xs opacity-60">
            <span>{currentIndex + 1} / {images.length}</span>
            {currentImage.views && <span>{currentImage.views} views</span>}
            {currentImage.likes && <span>{currentImage.likes} likes</span>}
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2 bg-black/30 rounded-lg p-2 max-w-md overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img.id}
              className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              onClick={() => {
                if (index < currentIndex) {
                  for (let i = 0; i < currentIndex - index; i++) {
                    onPrev();
                  }
                } else if (index > currentIndex) {
                  for (let i = 0; i < index - currentIndex; i++) {
                    onNext();
                  }
                }
                setZoom(1);
                setPosition({ x: 0, y: 0 });
              }}
            >
              <img
                src={img.image || img.thumbnail || ''}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;