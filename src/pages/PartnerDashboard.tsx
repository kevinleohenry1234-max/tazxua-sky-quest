import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Eye, 
  BarChart3, 
  Users, 
  Gift, 
  Target,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  DollarSign,
  Settings,
  Bell,
  Download
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: 'homestay' | 'restaurant' | 'tour' | 'activity';
  email: string;
  phone: string;
  address: string;
  joinDate: Date;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalChallenges: number;
  totalVouchers: number;
  totalRedemptions: number;
}

interface PartnerChallenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community' | 'event';
  pointReward: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed' | 'paused';
  participants: number;
  completions: number;
}

interface PartnerVoucher {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  pointCost: number;
  totalQuantity: number;
  usedQuantity: number;
  expiryDate: Date;
  status: 'active' | 'inactive' | 'expired';
}

interface PartnerStats {
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  totalRevenue: number;
  challengeCompletions: number;
  voucherRedemptions: number;
}

const PartnerDashboard: React.FC = () => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [challenges, setChallenges] = useState<PartnerChallenge[]>([]);
  const [vouchers, setVouchers] = useState<PartnerVoucher[]>([]);
  const [stats, setStats] = useState<PartnerStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'vouchers' | 'analytics'>('overview');
  const [showCreateModal, setShowCreateModal] = useState<'challenge' | 'voucher' | null>(null);

  // Mock data initialization
  useEffect(() => {
    // Mock partner data
    const mockPartner: Partner = {
      id: 'partner-1',
      name: 'Homestay Tà Xùa View',
      type: 'homestay',
      email: 'contact@taxuaview.com',
      phone: '0987654321',
      address: 'Thôn Tà Xùa, Xã Tà Xùa, Huyện Bắc Yên, Sơn La',
      joinDate: new Date('2024-01-01'),
      status: 'active',
      rating: 4.8,
      totalChallenges: 12,
      totalVouchers: 8,
      totalRedemptions: 156
    };

    const mockChallenges: PartnerChallenge[] = [
      {
        id: 'challenge-1',
        title: 'Chụp ảnh bình minh tại Homestay',
        description: 'Chụp ảnh bình minh từ ban công homestay và chia sẻ',
        type: 'individual',
        pointReward: 200,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        status: 'active',
        participants: 45,
        completions: 32
      },
      {
        id: 'challenge-2',
        title: 'Trải nghiệm ẩm thực H\'Mông',
        description: 'Thử món ăn truyền thống và đánh giá',
        type: 'individual',
        pointReward: 150,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
        status: 'active',
        participants: 28,
        completions: 21
      }
    ];

    const mockVouchers: PartnerVoucher[] = [
      {
        id: 'voucher-1',
        title: 'Giảm 20% phòng nghỉ',
        description: 'Áp dụng cho đặt phòng từ 2 đêm trở lên',
        discountType: 'percentage',
        discountValue: 20,
        pointCost: 500,
        totalQuantity: 100,
        usedQuantity: 67,
        expiryDate: new Date('2024-12-31'),
        status: 'active'
      },
      {
        id: 'voucher-2',
        title: 'Miễn phí bữa sáng',
        description: 'Bữa sáng truyền thống miễn phí',
        discountType: 'fixed',
        discountValue: 50000,
        pointCost: 300,
        totalQuantity: 50,
        usedQuantity: 23,
        expiryDate: new Date('2024-08-31'),
        status: 'active'
      }
    ];

    const mockStats: PartnerStats = {
      totalUsers: 234,
      activeUsers: 89,
      totalPoints: 45600,
      totalRevenue: 12500000,
      challengeCompletions: 53,
      voucherRedemptions: 90
    };

    setPartner(mockPartner);
    setChallenges(mockChallenges);
    setVouchers(mockVouchers);
    setStats(mockStats);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-orange-600 bg-orange-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homestay': return <Building2 className="w-5 h-5" />;
      case 'restaurant': return <Gift className="w-5 h-5" />;
      case 'tour': return <MapPin className="w-5 h-5" />;
      case 'activity': return <Target className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ReactNode; 
    color: string;
    change?: string;
  }> = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ChallengeCard: React.FC<{ challenge: PartnerChallenge }> = ({ challenge }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {challenge.participants} tham gia
            </span>
            <span className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {challenge.completions} hoàn thành
            </span>
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {challenge.pointReward} điểm
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
            {challenge.status === 'active' ? 'Đang hoạt động' : 
             challenge.status === 'draft' ? 'Nháp' :
             challenge.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
          </span>
          <div className="flex space-x-1">
            <button 
              className="p-1 text-gray-600 hover:text-blue-600"
              aria-label="Xem chi tiết thử thách"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              className="p-1 text-gray-600 hover:text-green-600"
              aria-label="Chỉnh sửa thử thách"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${(challenge.completions / challenge.participants) * 100}%` }}
        />
      </div>
    </div>
  );

  const VoucherCard: React.FC<{ voucher: PartnerVoucher }> = ({ voucher }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{voucher.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{voucher.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {voucher.discountType === 'percentage' 
                ? `${voucher.discountValue}%` 
                : `${voucher.discountValue.toLocaleString()}đ`}
            </span>
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {voucher.pointCost} điểm
            </span>
            <span className="flex items-center">
              <Gift className="w-4 h-4 mr-1" />
              {voucher.usedQuantity}/{voucher.totalQuantity} đã dùng
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voucher.status)}`}>
            {voucher.status === 'active' ? 'Đang hoạt động' : 
             voucher.status === 'inactive' ? 'Không hoạt động' : 'Hết hạn'}
          </span>
          <div className="flex space-x-1">
            <button className="p-1 text-gray-400 hover:text-blue-600">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-green-600">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-600 h-2 rounded-full" 
          style={{ width: `${(voucher.usedQuantity / voucher.totalQuantity) * 100}%` }}
        />
      </div>
    </div>
  );

  if (!partner || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {getTypeIcon(partner.type)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{partner.name}</h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {partner.address}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
                {partner.status === 'active' ? 'Hoạt động' : 
                 partner.status === 'pending' ? 'Chờ duyệt' : 'Tạm ngưng'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'challenges', label: 'Thử thách', icon: Target },
              { id: 'vouchers', label: 'Voucher', icon: Gift },
              { id: 'analytics', label: 'Phân tích', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Tổng người dùng"
                value={stats.totalUsers}
                icon={<Users className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                change="+12% tháng này"
              />
              <StatCard
                title="Người dùng hoạt động"
                value={stats.activeUsers}
                icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                color="bg-green-100"
                change="+8% tháng này"
              />
              <StatCard
                title="Tổng điểm thưởng"
                value={stats.totalPoints}
                icon={<Star className="w-6 h-6 text-yellow-600" />}
                color="bg-yellow-100"
                change="+15% tháng này"
              />
              <StatCard
                title="Doanh thu"
                value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
                icon={<DollarSign className="w-6 h-6 text-purple-600" />}
                color="bg-purple-100"
                change="+20% tháng này"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thử thách gần đây</h3>
                <div className="space-y-4">
                  {challenges.slice(0, 3).map(challenge => (
                    <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{challenge.title}</p>
                        <p className="text-sm text-gray-600">{challenge.completions} hoàn thành</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                        {challenge.status === 'active' ? 'Hoạt động' : 'Khác'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Voucher phổ biến</h3>
                <div className="space-y-4">
                  {vouchers.slice(0, 3).map(voucher => (
                    <div key={voucher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{voucher.title}</p>
                        <p className="text-sm text-gray-600">{voucher.usedQuantity} đã sử dụng</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((voucher.usedQuantity / voucher.totalQuantity) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý thử thách</h2>
              <button
                onClick={() => setShowCreateModal('challenge')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo thử thách mới</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vouchers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý voucher</h2>
              <button
                onClick={() => setShowCreateModal('voucher')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo voucher mới</span>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vouchers.map(voucher => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Phân tích & Báo cáo</h2>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Xuất báo cáo</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tính năng đang phát triển</h3>
              <p className="text-gray-600">
                Chức năng phân tích chi tiết sẽ được cập nhật trong phiên bản tiếp theo.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {showCreateModal === 'challenge' ? 'Tạo thử thách mới' : 'Tạo voucher mới'}
            </h3>
            <p className="text-gray-600 mb-6">
              Tính năng này sẽ được phát triển trong giai đoạn tiếp theo.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerDashboard;