import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, Loader2, Upload, X, FileText, Leaf } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
  attachments: File[];
}

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    attachments: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Use useEffect to handle success message timeout
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessPopup(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setShowSuccessPopup(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleInputChange = (field: keyof ContactFormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (isSuccess) setIsSuccess(false);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        return isValidType && isValidSize;
      });
      
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles].slice(0, 5) // Max 5 files
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ và tên');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }
    
    if (!formData.category.trim()) {
      setError('Vui lòng chọn thể loại tin nhắn');
      return false;
    }
    
    if (!formData.subject.trim()) {
      setError('Vui lòng nhập chủ đề');
      return false;
    }
    
    if (!formData.message.trim()) {
      setError('Vui lòng nhập nội dung tin nhắn');
      return false;
    }
    
    return true;
  };

  const sendToTelegram = async (data: ContactFormData): Promise<void> => {
    const botToken = '8347095665:AAEYqeYRoc6qUYMtfr1U8wT9x5S1nQRkM0U';
    const chatId = '-1002908510780';
    
    // Prepare message text
    const messageText = `
🔔 *Tin nhắn mới từ VIVIET Tà Xùa*

👤 *Họ và tên:* ${data.name}
📧 *Email:* ${data.email}
📱 *Số điện thoại:* ${data.phone || 'Không cung cấp'}
📂 *Thể loại:* ${data.category}
📝 *Chủ đề:* ${data.subject}

💬 *Nội dung:*
${data.message}

---
📅 Thời gian: ${new Date().toLocaleString('vi-VN')}
🌐 Nguồn: Website VIVIET Tà Xùa
    `;

    try {
      // Send text message first
      const textResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown'
        })
      });

      const textResult = await textResponse.json();
      
      if (!textResponse.ok) {
        console.error('Telegram API Error:', textResult);
        throw new Error(`Failed to send message to Telegram: ${textResult.description || 'Unknown error'}`);
      }

      // Send attachments if any
      if (data.attachments && data.attachments.length > 0) {
        for (const file of data.attachments) {
          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('document', file);
          formData.append('caption', `📎 File đính kèm từ ${data.name}`);

          const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: formData
          });

          if (!fileResponse.ok) {
            const fileResult = await fileResponse.json();
            console.warn(`Failed to send file ${file.name} to Telegram:`, fileResult);
          }
        }
      }

    } catch (error) {
      console.error('Error sending to Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await sendToTelegram(formData);
      
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        attachments: []
      });
      
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className={`rounded-3xl border-0 bg-white/95 backdrop-blur-sm ${className}`}>
        <CardHeader className="pb-8">
          <CardTitle className="font-inter text-3xl font-bold text-[#0E4F45] flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3CB89E] to-[#0E4F45] rounded-full flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            Gửi Tin Nhắn Cho Chúng Mình
          </CardTitle>
          <p className="text-[#4A5568] font-inter text-lg leading-relaxed mt-4">
            Hãy chia sẻ với chúng mình về chuyến du lịch Tà Xùa của bạn. Chúng mình sẽ phản hồi trong vòng 24 giờ!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 rounded-2xl">
              <AlertDescription className="text-red-800 font-inter">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="font-inter font-semibold text-[#0E4F45] text-base">
                  Họ và tên *
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-4 h-5 w-5 text-[#6B7280] group-focus-within:text-[#3BAA86] transition-colors duration-300" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-12 h-14 rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] placeholder:text-[#9CA3AF] shadow-sm hover:shadow-md"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="font-inter font-semibold text-[#0E4F45] text-base">
                  Email *
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-[#6B7280] group-focus-within:text-[#3BAA86] transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-12 h-14 rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] placeholder:text-[#9CA3AF] shadow-sm hover:shadow-md"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="phone" className="font-inter font-semibold text-[#0E4F45] text-base">
                  Số điện thoại
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-4 h-5 w-5 text-[#6B7280] group-focus-within:text-[#3BAA86] transition-colors duration-300" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0123 456 789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-12 h-14 rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] placeholder:text-[#9CA3AF] shadow-sm hover:shadow-md"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="font-inter font-semibold text-[#0E4F45] text-base">
                  Thể loại tin nhắn *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-14 rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] shadow-sm hover:shadow-md">
                    <SelectValue placeholder="Chọn thể loại tin nhắn" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-[#DDE5E2] shadow-2xl">
                    <SelectItem value="help" className="font-inter">Trợ giúp thông tin</SelectItem>
                    <SelectItem value="complaint" className="font-inter">Khiếu nại</SelectItem>
                    <SelectItem value="feedback" className="font-inter">Đóng góp ý kiến</SelectItem>
                    <SelectItem value="other" className="font-inter">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject" className="font-inter font-semibold text-[#0E4F45] text-base">
                Chủ đề *
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleInputChange('subject', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="h-14 rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] shadow-sm hover:shadow-md">
                  <SelectValue placeholder="Chọn chủ đề tin nhắn" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-[#DDE5E2] shadow-2xl">
                  <SelectItem value="booking" className="font-inter">Đặt phòng homestay</SelectItem>
                  <SelectItem value="tour-guide" className="font-inter">Hướng dẫn viên du lịch</SelectItem>
                  <SelectItem value="transportation" className="font-inter">Phương tiện di chuyển</SelectItem>
                  <SelectItem value="weather" className="font-inter">Thông tin thời tiết</SelectItem>
                  <SelectItem value="safety" className="font-inter">An toàn du lịch</SelectItem>
                  <SelectItem value="local-culture" className="font-inter">Văn hóa địa phương</SelectItem>
                  <SelectItem value="food-drink" className="font-inter">Ẩm thực địa phương</SelectItem>
                  <SelectItem value="trekking" className="font-inter">Trekking và leo núi</SelectItem>
                  <SelectItem value="photography" className="font-inter">Chụp ảnh và quay phim</SelectItem>
                  <SelectItem value="emergency" className="font-inter">Khẩn cấp</SelectItem>
                  <SelectItem value="other" className="font-inter">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="message" className="font-inter font-semibold text-[#0E4F45] text-base">
                Nội dung tin nhắn *
              </Label>
              <Textarea
                id="message"
                placeholder="Hãy chia sẻ với chúng mình về những gì bạn muốn biết về Tà Xùa..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="min-h-[140px] resize-none rounded-xl border-[#DDE5E2] focus:border-[#3BAA86] focus:ring-2 focus:ring-[#3BAA86]/20 transition-all duration-300 font-inter text-[#2E2E2E] placeholder:text-[#9CA3AF] shadow-sm hover:shadow-md"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-inter font-semibold text-[#0E4F45] text-base">
                Đính kèm tệp (Tùy chọn)
              </Label>
              <div className="border-2 border-dashed border-[#C9EBDD] rounded-2xl p-8 hover:border-[#3CB89E] transition-all duration-300 bg-gradient-to-br from-[#F8FDFA] to-[#F0F9F4] group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3CB89E] to-[#0E4F45] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-base text-[#0E4F45] font-semibold mb-2">
                    Kéo thả tệp vào đây hoặc nhấp để chọn
                  </p>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Hỗ trợ hình ảnh và video (tối đa 10MB mỗi tệp, tối đa 5 tệp)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isLoading}
                    className="border-[#3CB89E] text-[#3CB89E] hover:bg-[#3CB89E] hover:text-white transition-all duration-300 rounded-xl font-inter font-medium"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Chọn tệp
                  </Button>
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-3">
                  <p className="text-base font-semibold text-[#0E4F45] font-inter">Tệp đã chọn:</p>
                  <div className="space-y-3">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#F8FDFA] rounded-xl border border-[#E2ECE9] hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#3CB89E] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-[#0E4F45] truncate max-w-[200px] block">{file.name}</span>
                            <span className="text-xs text-[#6B7280]">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          disabled={isLoading}
                          className="text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 bg-gradient-to-r from-[#0F766E] to-[#3BAA86] hover:from-[#0E4F45] hover:to-[#0F766E] text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#3BAA86]/25 transform hover:-translate-y-1 font-inter"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Đang gửi tin nhắn...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-3" />
                  Gửi Tin Nhắn
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#E2ECE9]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-[#4A5568]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#D8F3E7] rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#3BAA86]" />
                </div>
                <span className="font-inter">vivietteam@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#D8F3E7] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#3BAA86]" />
                </div>
                <span className="font-inter">090 394 6185</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3CB89E] to-[#0E4F45] rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-inter text-2xl font-bold text-[#0E4F45] mb-4">
                Cảm ơn bạn!
              </h3>
              <p className="text-[#4A5568] font-inter text-lg leading-relaxed mb-6">
                Đội ngũ ViViet sẽ phản hồi trong 24 giờ tới.
              </p>
              <Button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-gradient-to-r from-[#3CB89E] to-[#0E4F45] hover:from-[#0E4F45] hover:to-[#3CB89E] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ContactForm;