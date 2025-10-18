import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useGamification } from '../hooks/useGamification';
import { Voucher } from '../types/gamification';
import { SAMPLE_VOUCHERS } from '../data/gamificationData';
import { 
  Gift, 
  Star, 
  Home, 
  Utensils, 
  Camera, 
  MapPin,
  Clock,
  ShoppingCart,
  Check,
  Mountain,
  Leaf,
  Sparkles,
  Crown,
  Zap,
  Heart,
  TreePine,
  Sun,
  Award,
  Target,
  Users
} from 'lucide-react';

const RewardShop: React.FC = () => {
  const { userProfile, spendPoints, addVoucher } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'homestay' | 'food' | 'activity' | 'tour'>('all');
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const availableVouchers = SAMPLE_VOUCHERS.filter(voucher => 
    selectedCategory === 'all' || voucher.type === selectedCategory
  );

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'homestay': return <Home className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'activity': return <Camera className="w-4 h-4" />;
      case 'tour': return <MapPin className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getCategoryName = (type: string) => {
    switch (type) {
      case 'homestay': return 'Homestay';
      case 'food': return 'Ẩm thực';
      case 'activity': return 'Hoạt động';
      case 'tour': return 'Tour';
      default: return 'Khác';
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'homestay': return 'bg-blue-100 text-blue-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'activity': return 'bg-green-100 text-green-800';
      case 'tour': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePurchase = (voucher: Voucher) => {
    if (userProfile.totalPoints >= voucher.pointsCost) {
      spendPoints(voucher.pointsCost, `Đổi voucher: ${voucher.title}`);
      addVoucher(voucher);
      setPurchaseSuccess(voucher.title);
      setTimeout(() => setPurchaseSuccess(null), 3000);
    }
  };

  const VoucherCard: React.FC<{ voucher: Voucher }> = ({ voucher }) => {
    const canAfford = userProfile.totalPoints >= voucher.pointsCost;
    
    return (
      <div className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        canAfford ? 'border-gray-200' : 'border-gray-300 opacity-60'
      }`}>
        {/* Voucher Header with Gradient */}
        <div className={`h-32 bg-gradient-to-br ${
          voucher.type === 'homestay' ? 'from-blue-400 to-blue-600' :
          voucher.type === 'food' ? 'from-orange-400 to-red-500' :
          voucher.type === 'activity' ? 'from-green-400 to-emerald-600' :
          voucher.type === 'tour' ? 'from-purple-400 to-indigo-600' :
          'from-gray-400 to-gray-600'
        } relative overflow-hidden`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-1">
                {voucher.discountPercent ? `${voucher.discountPercent}%` : `${voucher.value.toLocaleString()}đ`}
              </div>
              <div className="text-sm opacity-90">Giảm giá</div>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white flex items-center space-x-1">
              {getCategoryIcon(voucher.type)}
              <span>{getCategoryName(voucher.type)}</span>
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{voucher.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{voucher.description}</p>

          {voucher.partnerName && (
            <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Đối tác: {voucher.partnerName}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{voucher.pointsCost} điểm</span>
            </div>
            
            <button
              onClick={() => handlePurchase(voucher)}
              disabled={!canAfford}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                canAfford
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{canAfford ? 'Đổi ngay' : 'Không đủ điểm'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Add padding for mobile bottom navigation */}
      <div className="pb-20 md:pb-0">
        {/* Hero Section with Ta Xua Theme */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/website background/mountain-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-12 h-12 mr-4 animate-bounce" />
              <h1 className="text-5xl font-bold">Cửa Hàng Đổi Thưởng</h1>
              <Sparkles className="w-12 h-12 ml-4 animate-bounce" />
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Sử dụng điểm tích lũy để đổi lấy những phần thưởng hấp dẫn từ các đối tác Tà Xùa
            </p>
            
            {/* User Points Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Crown className="w-10 h-10" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-bold mb-2">{userProfile.totalPoints.toLocaleString()} điểm</h2>
                    <p className="text-white/90 text-lg">Điểm có thể sử dụng</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{userProfile.currentLevel.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold mb-1">{userProfile.vouchers?.length || 0}</div>
                  <div className="text-white/90">Voucher đã có</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {purchaseSuccess && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg animate-pulse">
            <div className="flex items-center space-x-3">
              <Check className="w-6 h-6" />
              <span className="font-semibold text-lg">
                Đã đổi thành công voucher "{purchaseSuccess}"! Kiểm tra trong hồ sơ của bạn.
              </span>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TreePine className="w-6 h-6 mr-2 text-green-600" />
            Danh mục phần thưởng
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'Tất cả', icon: Gift, count: SAMPLE_VOUCHERS.length, color: 'from-gray-500 to-gray-600' },
              { key: 'homestay', label: 'Homestay', icon: Home, count: SAMPLE_VOUCHERS.filter(v => v.type === 'homestay').length, color: 'from-blue-500 to-blue-600' },
              { key: 'food', label: 'Ẩm thực', icon: Utensils, count: SAMPLE_VOUCHERS.filter(v => v.type === 'food').length, color: 'from-orange-500 to-red-500' },
              { key: 'activity', label: 'Hoạt động', icon: Camera, count: SAMPLE_VOUCHERS.filter(v => v.type === 'activity').length, color: 'from-green-500 to-emerald-600' },
              { key: 'tour', label: 'Tour', icon: MapPin, count: SAMPLE_VOUCHERS.filter(v => v.type === 'tour').length, color: 'from-purple-500 to-indigo-600' }
            ].map(({ key, label, icon: Icon, count, color }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label} ({count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableVouchers.map(voucher => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>

        {availableVouchers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Không có voucher nào</h3>
            <p className="text-gray-600 text-lg">Hiện tại không có voucher nào trong danh mục này.</p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 mr-3" />
              <h3 className="text-3xl font-bold">Mẹo tích điểm nhanh</h3>
              <Sun className="w-8 h-8 ml-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold mb-2">Thử thách hàng ngày</div>
                <div className="text-sm text-white/80">Hoàn thành để nhận điểm thưởng</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center">
                <Heart className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold mb-2">Chia sẻ trải nghiệm</div>
                <div className="text-sm text-white/80">Trên mạng xã hội để nhận điểm</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold mb-2">Sự kiện cộng đồng</div>
                <div className="text-sm text-white/80">Tham gia để tích điểm nhanh</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center">
                <Gift className="w-8 h-8 mx-auto mb-3" />
                <div className="font-semibold mb-2">Giới thiệu bạn bè</div>
                <div className="text-sm text-white/80">Nhận thưởng cho mỗi lời mời</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Rewards Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Phần thưởng nổi bật
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Voucher VIP</h4>
                <p className="text-gray-600 text-sm mb-4">Giảm giá đặc biệt cho các dịch vụ cao cấp</p>
                <div className="text-2xl font-bold text-yellow-600">500+ điểm</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Tour độc quyền</h4>
                <p className="text-gray-600 text-sm mb-4">Trải nghiệm những địa điểm chưa được khám phá</p>
                <div className="text-2xl font-bold text-green-600">1000+ điểm</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Quà tặng đặc biệt</h4>
                <p className="text-gray-600 text-sm mb-4">Sản phẩm thủ công từ cộng đồng địa phương</p>
                <div className="text-2xl font-bold text-purple-600">300+ điểm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RewardShop;