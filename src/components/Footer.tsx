import { Mail, Phone, Shield, Info, Leaf, MessageCircle } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

const Footer = () => {
  const footerLinks = [
    { name: 'Kết nối với chúng mình', href: '/contact', icon: Mail },
    { name: 'Trung tâm An toàn', href: '/safety', icon: Shield },
    { name: 'Câu chuyện của chúng mình', href: '/about', icon: Info },
    { name: 'Cam kết xanh', href: '/sustainability', icon: Leaf },
    { name: 'Cộng đồng Telegram', href: 'https://t.me/viviet_taxua', icon: MessageCircle, external: true }
  ];

  return (
    <footer 
      className="text-white animate-fade-in"
      style={{
        background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Footer Content */}
        <div className="text-center">
          {/* Brand */}
          <div className="flex items-center justify-center space-x-3 mb-12">
            <LazyImage 
              src="/Logo/IVIET.png" 
              alt="VIVIET Logo" 
              className="w-16 h-16 object-cover rounded-xl shadow-lg border-2 border-white/20 opacity-90"
            />
            <div className="font-playfair font-bold text-3xl text-white">
              VIVIET Tà Xùa
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {footerLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 text-[#E2E8F0] hover:text-[#93C5FD] transition-all duration-300 group hover:underline"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-base font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8">
            <p className="text-[#E2E8F0] text-base">
              © 2024 VIVIET Tà Xùa. Cùng nhau tạo nên những hành trình ý nghĩa 💚
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;