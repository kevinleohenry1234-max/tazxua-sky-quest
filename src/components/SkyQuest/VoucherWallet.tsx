import React, { useState } from 'react';
import { 
  Gift, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Share2, 
  Copy,
  Calendar,
  Tag,
  Star,
  Zap
} from 'lucide-react';
import { Voucher, VoucherType } from '../../types/xpEngine';
import { XP_ENGINE_CONFIG } from '../../data/xpEngineConfig';

interface VoucherWalletProps {
  vouchers: Voucher[];
  availableVouchers: Voucher[];
  usedVouchers: Voucher[];
  expiredVouchers: Voucher[];
  onUseVoucher: (voucherId: string) => Promise<{ success: boolean; message: string }>;
  onExchangeXP: (xpAmount: number, exchangeRateIndex: number) => Promise<any>;
  usingVoucher?: string | null;
  userXP?: number;
  loading?: boolean;
}

const VoucherWallet: React.FC<VoucherWalletProps> = ({
  vouchers,
  availableVouchers,
  usedVouchers,
  expiredVouchers,
  onUseVoucher,
  onExchangeXP,
  usingVoucher,
  userXP = 0,
  loading
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'used' | 'expired' | 'exchange'>('available');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyVoucherCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy voucher code:', error);
    }
  };

  const getVoucherTypeIcon = (type: VoucherType) => {
    switch (type) {
      case VoucherType.LEVEL_UP:
        return Star;
      case VoucherType.XP_EXCHANGE:
        return Zap;
      case VoucherType.SPECIAL_EVENT:
        return Gift;
      case VoucherType.ADMIN_GRANTED:
        return Tag;
      default:
        return Gift;
    }
  };

  const getVoucherTypeColor = (type: VoucherType) => {
    switch (type) {
      case VoucherType.LEVEL_UP:
        return 'from-yellow-400 to-orange-500';
      case VoucherType.XP_EXCHANGE:
        return 'from-blue-400 to-indigo-500';
      case VoucherType.SPECIAL_EVENT:
        return 'from-purple-400 to-pink-500';
      case VoucherType.ADMIN_GRANTED:
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const VoucherCard: React.FC<{ voucher: Voucher; status: 'available' | 'used' | 'expired' }> = ({ voucher, status }) => {
    const Icon = getVoucherTypeIcon(voucher.voucherType);
    const gradientColor = getVoucherTypeColor(voucher.voucherType);
    const daysUntilExpiry = getDaysUntilExpiry(voucher.expiryDate);
    const isUsing = usingVoucher === voucher.id;

    return (
      <div className={`relative bg-white rounded-xl shadow-lg border overflow-hidden transition-all hover:shadow-xl ${
        status === 'expired' ? 'opacity-60' : status === 'used' ? 'opacity-80' : ''
      }`}>
        {/* Voucher Header */}
        <div className={`bg-gradient-to-r ${gradientColor} p-4 text-white relative`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {voucher.voucherType === VoucherType.LEVEL_UP ? 'Level Up Reward' :
                 voucher.voucherType === VoucherType.XP_EXCHANGE ? 'XP Exchange' :
                 voucher.voucherType === VoucherType.SPECIAL_EVENT ? 'Special Event' :
                 'Admin Grant'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{voucher.discountPercentage}%</div>
              <div className="text-xs opacity-90">OFF</div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            {status === 'available' && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Khả dụng
              </div>
            )}
            {status === 'used' && (
              <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Đã dùng
              </div>
            )}
            {status === 'expired' && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Hết hạn
              </div>
            )}
          </div>
        </div>

        {/* Voucher Body */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">
              Giảm giá {voucher.discountPercentage}% tại {voucher.linkedPartner}
            </h3>
            <p className="text-sm text-gray-600">
              Áp dụng cho tất cả dịch vụ tại {voucher.linkedPartner}
            </p>
          </div>

          {/* Voucher Code */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mã voucher</p>
                <p className="font-mono font-bold text-gray-800">{voucher.code}</p>
              </div>
              <button
                onClick={() => copyVoucherCode(voucher.code)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">
                  {copiedCode === voucher.code ? 'Đã sao chép!' : 'Sao chép'}
                </span>
              </button>
            </div>
          </div>

          {/* Expiry Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Hết hạn: {formatDate(voucher.expiryDate)}</span>
            </div>
            {status === 'available' && (
              <div className={`flex items-center space-x-1 ${
                daysUntilExpiry <= 3 ? 'text-red-600' : daysUntilExpiry <= 7 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                <Clock className="w-4 h-4" />
                <span>Còn {daysUntilExpiry} ngày</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {status === 'available' && (
              <>
                <button
                  onClick={() => onUseVoucher(voucher.id)}
                  disabled={isUsing}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUsing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang sử dụng...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Dùng ngay</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => copyVoucherCode(voucher.code)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </>
            )}
            {status === 'used' && voucher.usedAt && (
              <div className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Đã sử dụng ngày {formatDate(voucher.usedAt)}</span>
                </div>
              </div>
            )}
            {status === 'expired' && (
              <div className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2">
                  <XCircle className="w-4 h-4" />
                  <span>Đã hết hạn</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ExchangeSection: React.FC = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Quy đổi XP thành Voucher</h3>
        <p className="opacity-90">
          Sử dụng XP của bạn để đổi lấy voucher giảm giá hấp dẫn
        </p>
        <div className="mt-4 bg-white/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">XP hiện tại: {userXP.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {XP_ENGINE_CONFIG.voucherExchangeRates.map((rate, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="text-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">{rate.discountPercentage}%</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800">
                Voucher {rate.discountPercentage}%
              </h3>
              <p className="text-sm text-gray-600">
                Tại {rate.partner}
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Chi phí:</span>
                <span className="font-semibold text-gray-800">{rate.xpCost} XP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Thời hạn:</span>
                <span className="font-semibold text-gray-800">{rate.expiryDays} ngày</span>
              </div>
            </div>

            <button
              onClick={() => onExchangeXP(rate.xpCost, index)}
              disabled={userXP < rate.xpCost}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                userXP >= rate.xpCost
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {userXP >= rate.xpCost ? 'Đổi ngay' : 'Không đủ XP'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex space-x-2 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-24"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'available'
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Khả dụng ({availableVouchers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('used')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'used'
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Đã dùng ({usedVouchers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('expired')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'expired'
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Hết hạn ({expiredVouchers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('exchange')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'exchange'
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Đổi XP</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'exchange' ? (
        <ExchangeSection />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'available' && availableVouchers.map(voucher => (
            <VoucherCard key={voucher.id} voucher={voucher} status="available" />
          ))}
          {activeTab === 'used' && usedVouchers.map(voucher => (
            <VoucherCard key={voucher.id} voucher={voucher} status="used" />
          ))}
          {activeTab === 'expired' && expiredVouchers.map(voucher => (
            <VoucherCard key={voucher.id} voucher={voucher} status="expired" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {activeTab !== 'exchange' && (
        (activeTab === 'available' && availableVouchers.length === 0) ||
        (activeTab === 'used' && usedVouchers.length === 0) ||
        (activeTab === 'expired' && expiredVouchers.length === 0)
      ) && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Không có voucher nào
          </h3>
          <p className="text-gray-500">
            {activeTab === 'available' && 'Bạn chưa có voucher khả dụng nào. Hoàn thành nhiệm vụ để nhận voucher!'}
            {activeTab === 'used' && 'Bạn chưa sử dụng voucher nào.'}
            {activeTab === 'expired' && 'Không có voucher nào hết hạn.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoucherWallet;