import { useState } from 'react';
import { Mail, Phone, Shield, Info, Leaf, MessageCircle, Facebook, Instagram, Send } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  // Cấu trúc 4 cột liên kết theo yêu cầu
  const footerSections = [
    {
      title: 'Về chúng tôi',
      links: [
        { name: 'Về ViViet', href: '/about' },
        { name: 'Liên hệ', href: '/contact' },
        { name: 'Câu chuyện của chúng tôi', href: '/stories' }
      ]
    },
    {
      title: 'Dịch vụ & Trải nghiệm',
      links: [
        { name: 'Khám phá', href: '/explore' },
        { name: 'Sky Quest', href: '/skyquest' },
        { name: 'Dịch vụ du lịch', href: '/services' }
      ]
    },
    {
      title: 'Cam kết & An toàn',
      links: [
        { name: 'Trung tâm An toàn', href: '/safety' },
        { name: 'Quy tắc du lịch xanh', href: '/green-travel' },
        { name: 'Báo cáo môi trường', href: '/environmental-report' }
      ]
    },
    {
      title: 'Kết nối & Cộng đồng',
      links: [
        { name: 'Cộng đồng Telegram', href: 'https://t.me/viviet_taxua', external: true, icon: MessageCircle },
        { name: 'Fanpage Facebook', href: 'https://facebook.com/viviet.taxua', external: true, icon: Facebook },
        { name: 'Instagram', href: 'https://instagram.com/viviet.taxua', external: true, icon: Instagram }
      ]
    }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Cảm ơn bạn đã đăng ký! 🌿",
        description: "Chúng tôi sẽ gửi những tin tức mới nhất về ViViet đến email của bạn.",
        duration: 4000,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer 
      className="text-white border-t border-[#1D4F3A] border-opacity-30"
      style={{
        background: 'linear-gradient(180deg, #0F2A21 0%, #1B3D31 100%)'
      }}
    >
      {/* Phần trên cùng - Khu vực kết nối thương hiệu */}
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-8">
          <div className="text-center">
            {/* Logo và tên thương hiệu */}
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4">
                <LazyImage 
                  src="/Logo/IVIET.png" 
                  alt="ViViet Logo" 
                  className="w-12 h-12 object-contain rounded-lg border border-[#E0E0E0] border-opacity-20 p-2 bg-white/5"
                />
              </div>
              <h2 
                className="text-white text-lg tracking-wider mb-3"
                style={{ 
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: 700, 
                  fontSize: '18px',
                  letterSpacing: '1px'
                }}
              >
                VIVIET TÀ XÙA
              </h2>
              <p 
                className="text-[#B8D8C2] max-w-md mx-auto"
                style={{ 
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: 400, 
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
              >
                Cùng nhau tạo nên những hành trình ý nghĩa
              </p>
            </div>

            {/* Form đăng ký nhận tin */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn để nhận tin mới từ ViViet"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-[#B8D8C2] focus:outline-none focus:ring-2 focus:ring-[#00A47A] focus:border-transparent"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#00A47A] hover:bg-[#008C66] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Đăng ký
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Phần giữa - Khu vực liên kết nhanh */}
      <div className="py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {footerSections.map((section, index) => (
              <div key={index} className="text-center lg:text-left">
                <h3 
                  className="text-white mb-3"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 600, 
                    fontSize: '16px',
                    marginBottom: '12px'
                  }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={linkIndex}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B8D8C2] hover:text-[#00A47A] hover:underline transition-colors duration-200 flex items-center justify-center lg:justify-start gap-2"
                            style={{ 
                              fontFamily: 'Inter, sans-serif', 
                              fontWeight: 400, 
                              fontSize: '14px'
                            }}
                          >
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-[#B8D8C2] hover:text-[#00A47A] hover:underline transition-colors duration-200 block"
                            style={{ 
                              fontFamily: 'Inter, sans-serif', 
                              fontWeight: 400, 
                              fontSize: '14px'
                            }}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần dưới cùng - Bản quyền & liên hệ */}
      <div 
        className="py-6"
        style={{ backgroundColor: '#0C1B17' }}
      >
        <div className="container mx-auto px-8">
          <div className="text-center">
            <p 
              className="text-[#99B2A6] mb-2"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 400, 
                fontSize: '13px'
              }}
            >
              © {new Date().getFullYear()} VIVIET Tà Xùa. Cùng nhau tạo nên những hành trình ý nghĩa 💚
            </p>
            <p 
              className="text-[#99B2A6] flex items-center justify-center gap-2"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 400, 
                fontSize: '13px'
              }}
            >
              Hành trình xanh – Kết nối con người – Vì một Tà Xùa bền vững
              <Leaf className="w-4 h-4 text-[#00A47A]" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;