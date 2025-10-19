import React, { useState } from 'react';
import { Shield, X, Phone, MapPin, Cloud, AlertTriangle, Navigation } from 'lucide-react';

const SafetyHub = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Cứu hộ 115', phone: '115', type: 'emergency' },
    { name: 'Công an 113', phone: '113', type: 'police' },
    { name: 'Cứu hỏa 114', phone: '114', type: 'fire' },
    { name: 'Hướng dẫn viên', phone: '090 394 6185', type: 'guide' }
  ];

  const safetyTips = [
    'Luôn di chuyển theo nhóm, không tách khỏi đoàn',
    'Mang theo đủ nước uống và thức ăn nhẹ',
    'Kiểm tra thời tiết trước khi khởi hành',
    'Thông báo lịch trình cho người thân'
  ];

  return (
    <>
      {/* Floating Safety Icon */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white/20"
          title="Trung tâm An toàn"
        >
          <Shield className="w-6 h-6" />
        </button>
      </div>

      {/* Safety Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="bg-red-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <h2 className="text-lg font-bold">Trung tâm An toàn</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Weather Alert */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cloud className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">Thời tiết hiện tại</h3>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Nhiệt độ: 18°C - 25°C<br />
                    Độ ẩm: 85%<br />
                    Tầm nhìn: Tốt (có sương nhẹ buổi sáng)
                  </p>
                </div>

                {/* Emergency Contacts */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-red-500" />
                    <span>Danh bạ khẩn cấp</span>
                  </h3>
                  <div className="space-y-2">
                    {emergencyContacts.map((contact, index) => (
                      <a
                        key={index}
                        href={`tel:${contact.phone}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{contact.name}</span>
                        <span className="text-red-500 font-bold">{contact.phone}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Safety Tips */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Lưu ý an toàn</span>
                  </h3>
                  <div className="space-y-2">
                    {safetyTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Map */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span>Vị trí an toàn</span>
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 text-sm mb-2">
                      Trạm cứu hộ gần nhất: Bản Áng, Tà Xùa
                    </p>
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium">
                      <Navigation className="w-4 h-4" />
                      <span>Xem trên bản đồ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4 bg-gray-50">
                <p className="text-center text-gray-600 text-sm">
                  Trong trường hợp khẩn cấp, hãy gọi ngay <strong>115</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SafetyHub;