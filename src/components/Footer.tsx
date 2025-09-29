import { Mail, Phone, Facebook, MapPin, Instagram, Youtube } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

const Footer = () => {
  const partners = [
    'AI4SD',
    'Tech4Green', 
    'HSU'
  ];

  const services = [
    { name: 'Tour Tà Xùa', href: '/explore' },
    { name: 'Homestay', href: '/accommodation' },
    { name: 'Trải nghiệm văn hóa', href: '/experience' },
    { name: 'Trekking & Hiking', href: '/attractions' }
  ];

  return (
    <footer className="bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-sm border-t border-white/20 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <LazyImage 
                  src="/Logo/IVIET.png" 
                  alt="VIVIET Logo" 
                  className="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="font-playfair font-bold text-2xl lg:text-3xl text-white">
                  VIVIET Tà Xùa
                </div>
                <div className="font-inter text-primary text-sm font-medium">
                  Khám phá thiên nhiên hùng vĩ
                </div>
              </div>
            </div>
            
            <p className="font-inter text-white/85 leading-relaxed mb-8 max-w-lg text-base">
              Khám phá vẻ đẹp hùng vĩ của Tà Xùa, nơi thiên nhiên và văn hóa dân tộc hòa quyện tạo nên những trải nghiệm khó quên. Chúng tôi mang đến cho bạn hành trình khám phá đích thực và ý nghĩa.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-8">
              <a href="#" className="bg-white/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
                <Facebook className="w-5 h-5 text-white hover:text-primary" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
                <Instagram className="w-5 h-5 text-white hover:text-primary" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-primary/20 p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
                <Youtube className="w-5 h-5 text-white hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-white relative">
              Dịch Vụ
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></div>
            </h3>
            <div className="space-y-3">
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="font-inter text-white/80 hover:text-primary flex items-center space-x-3 transition-all duration-300 hover:translate-x-1 group"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform"></div>
                  <span>{service.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Partners */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-white relative">
              Liên Hệ
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></div>
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="mailto:vivietteamgmail.com" 
                  className="font-inter text-white/90 hover:text-primary transition-colors duration-300 text-sm"
                >
                  vivietteam@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="tel:0903946185" 
                  className="font-inter text-white/90 hover:text-primary transition-colors duration-300 text-sm"
                >
                  090 394 6185
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="font-inter text-white/90 text-sm">
                  Tà Xùa, Sơn La, Việt Nam
                </span>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h4 className="font-inter text-sm font-semibold mb-3 text-white/90">Đối Tác</h4>
              <div className="flex flex-wrap gap-2">
                {partners.map((partner) => (
                  <span
                    key={partner}
                    className="bg-white/10 px-3 py-1 rounded-full text-xs font-inter text-white/80 border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-inter text-white/70 text-sm flex items-center space-x-2">
              <span>© 2024 VIVIET Tà Xùa.</span>
              <span className="hidden md:inline">•</span>
              <span>Tất cả quyền được bảo lưu.</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="font-inter text-white/70 hover:text-primary text-sm transition-colors duration-300 hover:underline"
              >
                Chính Sách Bảo Mật
              </a>
              <a
                href="#"
                className="font-inter text-white/70 hover:text-primary text-sm transition-colors duration-300 hover:underline"
              >
                Điều Khoản Sử Dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;