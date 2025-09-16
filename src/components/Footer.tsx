import { Mail, Phone, Facebook, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Trang Chủ', href: '#home' },
    { label: 'Khám Phá', href: '#discover' },
    { label: 'Trải Nghiệm', href: '#experience' },
    { label: 'Văn Hóa', href: '#culture' },
  ];

  const partners = [
    'AI4SD',
    'Tech4Green', 
    'HSU'
  ];

  return (
    <footer className="bg-gradient-to-br from-tertiary via-tertiary/90 to-tertiary text-tertiary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div className="font-playfair font-bold text-2xl">
                Lovable Tà Xùa
              </div>
            </div>
            <p className="font-inter text-tertiary-foreground/80 leading-relaxed mb-6 max-w-md">
              Khám phá vẻ đẹp hùng vĩ của Tà Xùa, nơi thiên nhiên và văn hóa dân tộc hòa quyện tạo nên những trải nghiệm khó quên.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:vivietteam.gmail.com" 
                  className="font-inter hover:text-primary transition-colors duration-300"
                >
                  vivietteam.gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:0903946185" 
                  className="font-inter hover:text-primary transition-colors duration-300"
                >
                  090 394 6185
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Facebook className="w-5 h-5 text-primary" />
                <a 
                  href="#" 
                  className="font-inter hover:text-primary transition-colors duration-300"
                >
                  Lovable Tà Xùa
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-inter">
                  Tà Xùa, Sơn La, Việt Nam
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Liên Kết Nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-inter text-tertiary-foreground/80 hover:text-primary transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Đối Tác Đồng Hành</h3>
            <div className="space-y-3">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="font-inter text-tertiary-foreground/80 flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{partner}</span>
                </div>
              ))}
              <div className="mt-4 text-sm text-tertiary-foreground/60 font-inter">
                * Logo đối tác sẽ được cập nhật sớm
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tertiary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-inter text-tertiary-foreground/60 text-sm">
              © 2024 Lovable Tà Xùa. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="font-inter text-tertiary-foreground/60 hover:text-primary text-sm transition-colors duration-300"
              >
                Chính Sách Bảo Mật
              </a>
              <a
                href="#"
                className="font-inter text-tertiary-foreground/60 hover:text-primary text-sm transition-colors duration-300"
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