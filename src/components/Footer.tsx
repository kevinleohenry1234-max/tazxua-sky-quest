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
    <footer className="bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-sm border-t border-white/20 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Simplified Footer Content */}
        <div className="text-center">
          {/* Brand */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <LazyImage 
              src="/Logo/IVIET.png" 
              alt="VIVIET Logo" 
              className="w-12 h-12 object-cover rounded-xl shadow-lg border-2 border-white/20"
            />
            <div className="font-playfair font-bold text-2xl text-white">
              VIVIET Tà Xùa
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {footerLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors duration-300 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/60 text-sm">
              © 2024 VIVIET Tà Xùa. Cùng nhau tạo nên những hành trình ý nghĩa 💚
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;