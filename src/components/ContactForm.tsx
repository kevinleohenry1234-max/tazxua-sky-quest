import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, Loader2, Upload, X, FileText } from 'lucide-react';
import { useErrorToast } from '@/hooks/useErrorToast';

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
  const { showNetworkError, showError: showErrorToast } = useErrorToast();

  // Use useEffect to handle success message timeout
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
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
      console.error('Error sending message:', err);
      const errorMessage = 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.';
      setError(errorMessage);
      
      // Show user-friendly error toast
      if (err instanceof Error && err.message.includes('fetch')) {
        showNetworkError();
      } else {
        showErrorToast('Không thể gửi tin nhắn. Vui lòng kiểm tra kết nối và thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`shadow-soft border-0 ${className}`}>
      <CardHeader>
        <CardTitle className="font-playfair text-2xl flex items-center">
          <Mail className="w-6 h-6 mr-3 text-primary" />
          Liên Hệ Với Chúng Tôi
        </CardTitle>
        <p className="text-muted-foreground font-inter">
          Gửi tin nhắn cho chúng tôi và nhận phản hồi sớm nhất
        </p>
      </CardHeader>
      
      <CardContent>
        {isSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất có thể.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-inter font-medium">
                Họ và tên *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-inter font-medium">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-inter font-medium">
                Số điện thoại
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0123456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="font-inter font-medium">
                Thể loại tin nhắn *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thể loại tin nhắn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="help">Trợ giúp thông tin</SelectItem>
                  <SelectItem value="complaint">Khiếu nại</SelectItem>
                  <SelectItem value="feedback">Đóng góp ý kiến</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="font-inter font-medium">
              Chủ đề *
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange('subject', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn chủ đề tin nhắn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booking">Đặt phòng homestay</SelectItem>
                <SelectItem value="tour-guide">Hướng dẫn viên du lịch</SelectItem>
                <SelectItem value="transportation">Phương tiện di chuyển</SelectItem>
                <SelectItem value="weather">Thông tin thời tiết</SelectItem>
                <SelectItem value="safety">An toàn du lịch</SelectItem>
                <SelectItem value="local-culture">Văn hóa địa phương</SelectItem>
                <SelectItem value="food-drink">Ẩm thực địa phương</SelectItem>
                <SelectItem value="trekking">Trekking và leo núi</SelectItem>
                <SelectItem value="photography">Chụp ảnh và quay phim</SelectItem>
                <SelectItem value="emergency">Khẩn cấp</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-inter font-medium">
              Nội dung tin nhắn *
            </Label>
            <Textarea
              id="message"
              placeholder="Nhập nội dung tin nhắn của bạn..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="min-h-[120px] resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-inter font-medium">
              Đính kèm tệp (Tùy chọn)
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Kéo thả tệp vào đây hoặc nhấp để chọn
                </p>
                <p className="text-xs text-muted-foreground mb-3">
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
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn tệp
                </Button>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Tệp đã chọn:</p>
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        disabled={isLoading}
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
            className="w-full font-inter font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Gửi tin nhắn
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>vivietteam@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>090 394 6185</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;