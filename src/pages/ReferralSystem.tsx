import React, { useState, useEffect } from 'react';
import { useGamification } from '../hooks/useGamification';
import { 
  Users, 
  Gift, 
  Copy, 
  Share2, 
  UserPlus, 
  Star,
  Trophy,
  Heart,
  CheckCircle,
  ExternalLink,
  QrCode
} from 'lucide-react';

interface ReferralStats {
  totalReferrals: number;
  totalPointsEarned: number;
  activeReferrals: number;
  pendingReferrals: number;
}

interface ReferredUser {
  id: string;
  username: string;
  joinDate: Date;
  pointsEarned: number;
  status: 'active' | 'pending';
  level: string;
}

const ReferralSystem: React.FC = () => {
  const { userProfile, awardPoints } = useGamification();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalPointsEarned: 0,
    activeReferrals: 0,
    pendingReferrals: 0
  });
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate referral code based on user profile
  useEffect(() => {
    const generateReferralCode = () => {
      const username = userProfile.username.replace(/\s+/g, '').toLowerCase();
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `TAXUA${username.substring(0, 4).toUpperCase()}${randomSuffix}`;
    };

    setReferralCode(generateReferralCode());

    // Mock referral data
    const mockReferredUsers: ReferredUser[] = [
      {
        id: '1',
        username: 'Nguyễn Thị Lan',
        joinDate: new Date('2024-01-15'),
        pointsEarned: 150,
        status: 'active',
        level: 'Lữ khách xanh'
      },
      {
        id: '2',
        username: 'Trần Văn Minh',
        joinDate: new Date('2024-01-20'),
        pointsEarned: 80,
        status: 'pending',
        level: 'Du khách mới'
      },
      {
        id: '3',
        username: 'Lê Thị Hoa',
        joinDate: new Date('2024-01-25'),
        pointsEarned: 220,
        status: 'active',
        level: 'Đại sứ xanh'
      }
    ];

    setReferredUsers(mockReferredUsers);

    const stats: ReferralStats = {
      totalReferrals: mockReferredUsers.length,
      totalPointsEarned: mockReferredUsers.reduce((sum, user) => sum + user.pointsEarned, 0),
      activeReferrals: mockReferredUsers.filter(user => user.status === 'active').length,
      pendingReferrals: mockReferredUsers.filter(user => user.status === 'pending').length
    };

    setReferralStats(stats);
  }, [userProfile.username]);

  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy referral code:', err);
    }
  };

  const handleShareReferral = () => {
    const referralUrl = `${window.location.origin}/register?ref=${referralCode}`;
    const shareText = `🌿 Tham gia cùng tôi khám phá Tà Xùa Xanh! Sử dụng mã giới thiệu ${referralCode} để nhận 100 điểm miễn phí khi đăng ký. Cùng nhau xây dựng cộng đồng du lịch xanh! ${referralUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'Tham gia Tà Xùa Xanh',
        text: shareText,
        url: referralUrl
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Đã sao chép link giới thiệu!');
    }
  };

  const generateQRCode = () => {
    const referralUrl = `${window.location.origin}/register?ref=${referralCode}`;
    // In a real app, you would use a QR code library like qrcode.js
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralUrl)}`;
  };

  const ReferredUserCard: React.FC<{ user: ReferredUser }> = ({ user }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            user.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {user.status === 'active' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <UserPlus className="w-5 h-5 text-yellow-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{user.username}</h4>
            <p className="text-sm text-gray-600">{user.level}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-green-600">+{user.pointsEarned} điểm</div>
          <div className="text-xs text-gray-500">
            {user.joinDate.toLocaleDateString('vi-VN')}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Users className="w-8 h-8 text-blue-500 mr-3" />
          Hệ thống giới thiệu
        </h1>
        <p className="text-gray-600 text-lg">
          Mời bạn bè tham gia và cùng nhau khám phá Tà Xùa. Cả hai đều nhận được điểm thưởng!
        </p>
      </div>

      {/* Referral Code Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Mã giới thiệu của bạn</h2>
          <div className="bg-white/20 rounded-lg p-6 mb-6">
            <div className="text-4xl font-mono font-bold mb-4 tracking-wider">
              {referralCode}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleCopyReferralCode}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {copySuccess ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copySuccess ? 'Đã sao chép!' : 'Sao chép'}</span>
              </button>
              
              <button
                onClick={handleShareReferral}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </button>
              
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {showQRCode && (
            <div className="bg-white rounded-lg p-4 inline-block">
              <img 
                src={generateQRCode()} 
                alt="QR Code giới thiệu" 
                className="mx-auto"
              />
              <p className="text-gray-600 text-sm mt-2">Quét để tham gia</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {referralStats.totalReferrals}
          </div>
          <div className="text-gray-600">Tổng giới thiệu</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <Gift className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {referralStats.totalPointsEarned.toLocaleString()}
          </div>
          <div className="text-gray-600">Điểm đã nhận</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {referralStats.activeReferrals}
          </div>
          <div className="text-gray-600">Đã kích hoạt</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <UserPlus className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {referralStats.pendingReferrals}
          </div>
          <div className="text-gray-600">Đang chờ</div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          Cách thức hoạt động
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Chia sẻ mã</h4>
            <p className="text-gray-600 text-sm">
              Gửi mã giới thiệu của bạn cho bạn bè qua tin nhắn, mạng xã hội hoặc QR code
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Bạn bè tham gia</h4>
            <p className="text-gray-600 text-sm">
              Khi bạn bè đăng ký bằng mã của bạn, họ nhận 100 điểm khởi đầu
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Nhận thưởng</h4>
            <p className="text-gray-600 text-sm">
              Bạn nhận 150 điểm cho mỗi người bạn giới thiệu thành công
            </p>
          </div>
        </div>
      </div>

      {/* Referred Users List */}
      {referredUsers.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            Danh sách người đã giới thiệu ({referredUsers.length})
          </h3>
          
          <div className="space-y-4">
            {referredUsers.map(user => (
              <ReferredUserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* Motivation Section */}
      <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
        <Heart className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Cùng nhau xây dựng cộng đồng!</h3>
        <p className="text-lg opacity-90 mb-6">
          Mỗi người bạn giới thiệu không chỉ mang lại điểm thưởng mà còn giúp 
          mở rộng cộng đồng yêu thiên nhiên và du lịch bền vững.
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Kết nối bạn bè</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Nhận điểm thưởng</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Bảo vệ môi trường</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;