import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Phone, Mail, User, MessageSquare, TreePine, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemLocation?: string;
  itemPrice?: string;
  itemType?: 'homestay' | 'tour' | 'service';
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemLocation,
  itemPrice,
  itemType = 'homestay'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTreeAnimation, setShowTreeAnimation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return formData.fullName.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.email.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowTreeAnimation(true);
    
    // Show tree animation for 3 seconds
    setTimeout(() => {
      setShowTreeAnimation(false);
      setShowSuccess(true);
    }, 3000);
  };

  const resetModal = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      notes: ''
    });
    setShowSuccess(false);
    setShowTreeAnimation(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {itemType === 'homestay' ? 'Đặt phòng' : 
             itemType === 'tour' ? 'Đặt tour' : 'Đặt dịch vụ'}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Item Info */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-800 mb-1">{itemName}</h3>
            {itemLocation && (
              <p className="text-gray-600 text-sm mb-1">{itemLocation}</p>
            )}
            {itemPrice && (
              <p className="text-lg font-bold text-green-600">{itemPrice}</p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {showTreeAnimation ? (
              <motion.div
                key="tree-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="flex justify-center items-end space-x-2 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    🌱
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    🌿
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    🌳
                  </motion.div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="text-green-700 font-medium text-lg"
                >
                  Mỗi chuyến đi là một cây được trồng
                </motion.p>
              </motion.div>
            ) : showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Đặt chỗ thành công!
                </h3>
                <p className="text-green-700 font-medium mb-4">
                  Chị Hường đang chờ đón bạn!
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút để xác nhận chi tiết.
                </p>
                <Button 
                  onClick={handleClose}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Hoàn tất
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Simplified Form - Only required fields */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Họ và tên *</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên của bạn"
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Số điện thoại *</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email *</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ email"
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Ghi chú</span>
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Yêu cầu đặc biệt hoặc ghi chú (không bắt buộc)"
                    rows={3}
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Green Impact Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TreePine className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Tác động xanh của bạn
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Mỗi lần đặt chỗ, bạn đóng góp vào việc trồng 1 cây xanh và hỗ trợ cộng đồng bản địa.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !validateForm()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Đặt ngay'
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Bằng cách đặt chỗ, bạn đồng ý với điều khoản sử dụng và chính sách bảo mật của chúng tôi.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;