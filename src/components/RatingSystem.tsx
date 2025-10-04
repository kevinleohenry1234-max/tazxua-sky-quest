import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Star, User, ThumbsUp, MessageCircle, Calendar, MapPin } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  helpful: number;
  images?: string[];
  verified: boolean;
}

interface RatingSystemProps {
  locationId: string;
  locationName: string;
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
  onSubmitReview?: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  locationId,
  locationName,
  averageRating = 0,
  totalReviews = 0,
  reviews = [],
  onSubmitReview
}) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleSubmitReview = async () => {
    if (!userName.trim() || !comment.trim() || userRating === 0) {
      alert('Vui lòng điền đầy đủ thông tin và chọn số sao!');
      return;
    }

    setIsSubmitting(true);
    
    const newReview = {
      userName: userName.trim(),
      rating: userRating,
      comment: comment.trim(),
      location: userLocation.trim() || 'Không xác định',
      helpful: 0,
      verified: false
    };

    try {
      if (onSubmitReview) {
        await onSubmitReview(newReview);
      }
      
      // Reset form
      setUserRating(0);
      setComment('');
      setUserName('');
      setUserLocation('');
      setShowReviewForm(false);
      alert('Cảm ơn bạn đã đánh giá!');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, size: string = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoverRating || userRating) : rating)
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => handleStarClick(star) : undefined}
            onMouseEnter={interactive ? () => handleStarHover(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Xuất sắc';
    if (rating >= 4) return 'Rất tốt';
    if (rating >= 3.5) return 'Tốt';
    if (rating >= 3) return 'Khá';
    if (rating >= 2) return 'Trung bình';
    return 'Cần cải thiện';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Đánh giá từ du khách
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(averageRating)}
              <div className="text-sm text-muted-foreground mt-1">
                {getRatingText(averageRating)}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold mb-2">
                {totalReviews} đánh giá
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-8">{star} ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add Review Button */}
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="w-full"
            variant={showReviewForm ? "outline" : "default"}
          >
            {showReviewForm ? 'Ẩn form đánh giá' : 'Viết đánh giá'}
          </Button>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Chia sẻ trải nghiệm của bạn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName" className="block text-sm font-medium mb-2">
                  Tên của bạn *
                </Label>
                <Input
                  id="userName"
                  placeholder="Nhập tên của bạn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="userLocation" className="block text-sm font-medium mb-2">
                  Đến từ
                </Label>
                <Input
                  id="userLocation"
                  placeholder="Thành phố, tỉnh"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Đánh giá của bạn *
              </label>
              <div className="flex items-center gap-2">
                {renderStars(userRating, true, 'w-8 h-8')}
                <span className="text-sm text-muted-foreground ml-2">
                  {userRating > 0 && `${userRating}/5 - ${getRatingText(userRating)}`}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Chia sẻ trải nghiệm *
              </label>
              <Textarea
                placeholder="Hãy chia sẻ những trải nghiệm thú vị của bạn tại đây..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Đánh giá từ du khách</h3>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ trải nghiệm!
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Đã xác thực
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {review.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.rating, false, 'w-4 h-4')}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {review.comment}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Hữu ích ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RatingSystem;