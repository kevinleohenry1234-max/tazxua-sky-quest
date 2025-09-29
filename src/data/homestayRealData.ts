export interface HomestayReal {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: string;
  images: string[];
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
  folder: string;
}

export const homestayRealData: HomestayReal[] = [
  {
    id: '1',
    name: '1941M Homestay Tà Xùa',
    description: 'Homestay cao cấp với view núi tuyệt đẹp, nằm ở độ cao 1941m so với mực nước biển. Không gian hiện đại hòa quyện với thiên nhiên hoang sơ.',
    location: 'Đỉnh Tà Xùa, Sơn La',
    rating: 4.8,
    price: '500.000 - 800.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/1%20(1).webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/2%20(1).webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/2.webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/3%20(1).webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/3%20(2).webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/4.webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/5.webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/6.webp',
      '/cơ%20sở%20lưu%20trú/1._1941M_Homestay_Tà_Xùa/HINH_ANH/7.webp'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Nhà hàng', 'View núi', 'Phòng VIP'],
    contact: {
      phone: '0987654321',
      email: 'contact@1941homestay.com'
    },
    features: ['Gần đỉnh núi', 'Ngắm bình minh', 'Không khí trong lành', 'Thiết kế hiện đại'],
    folder: '1.%201941M Homestay Tà Xùa'
  },
  {
    id: '2',
    name: 'Mayhome Tà Xùa',
    description: 'Homestay ấm cúng với phong cách truyền thống, phù hợp cho gia đình. Không gian rộng rãi với nhiều loại phòng khác nhau.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.6,
    price: '400.000 - 600.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/khu-phong-may-hill-moi-va-dep.jpg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/khu-phong-stone-hien-dai.jpg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/khu-phong-wood-co-kinh.jpg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/nha-hang-cua-may-home-ta-xua-rong-rai-va-sach-se.jpg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/phong-tap-the-voi-khu-ve-sinh-ben-ngoai.jpg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/67860701-18d18be4c6b120f8ca5f0e0d411757e0.jpeg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/67860701-60387cfba1b9871745e7a323b965fe7f.jpeg',
      '/cơ%20sở%20lưu%20trú/2.%20Mayhome Tà Xùa/HÌNH%20ẢNH%20/67860701-682e754fb162a6b32f39bb7c4fe54f88.jpeg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Bữa sáng miễn phí', 'Nhà hàng rộng rãi'],
    contact: {
      phone: '0912345678'
    },
    features: ['Phong cách truyền thống', 'Thân thiện với gia đình', 'Giá cả hợp lý', 'Nhiều loại phòng'],
    folder: '2.%20Mayhome Tà Xùa'
  },
  {
    id: '3',
    name: 'Tà Xùa Ecolodge',
    description: 'Khu nghỉ dưỡng sinh thái với thiết kế hiện đại, hòa mình với thiên nhiên. Dịch vụ cao cấp trong không gian xanh mát.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.9,
    price: '800.000 - 1.200.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/3.%20Tà Xùa Ecolodge/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Spa', 'Nhà hàng cao cấp', 'Hồ bơi', 'Dịch vụ phòng 24/7'],
    contact: {
      phone: '0901234567',
      email: 'info@taxuaecolodge.com'
    },
    features: ['Thiết kế sinh thái', 'Dịch vụ cao cấp', 'Hòa mình với thiên nhiên', 'Resort 5 sao'],
    folder: '3.%20Tà Xùa Ecolodge'
  },
  {
    id: '4',
    name: 'Xoè Homestay',
    description: 'Homestay mang đậm bản sắc văn hóa dân tộc với không gian ấm cúng, gần gũi. Trải nghiệm văn hóa bản địa độc đáo.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.5,
    price: '350.000 - 500.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/4.%20Xoè Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Trải nghiệm văn hóa', 'Ẩm thực dân tộc'],
    contact: {
      phone: '0923456789'
    },
    features: ['Văn hóa dân tộc', 'Gần gũi thiên nhiên', 'Giá cả phải chăng', 'Trải nghiệm độc đáo'],
    folder: '4.%20Xoè Homestay'
  },
  {
    id: '5',
    name: 'Tà Xùa Cloud Homestay',
    description: 'Homestay trên mây với view tuyệt đẹp, không gian thơ mộng giữa biển mây bồng bềnh. Trải nghiệm sống giữa mây trời.',
    location: 'Đỉnh Tà Xùa, Sơn La',
    rating: 4.7,
    price: '450.000 - 700.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/5.%20Tà Xùa Cloud Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'View mây', 'Bãi đỗ xe', 'Café sáng'],
    contact: {
      phone: '0934567890'
    },
    features: ['Sống giữa mây', 'View tuyệt đẹp', 'Không gian thơ mộng', 'Gần đỉnh núi'],
    folder: '5.%20Tà Xùa Cloud Homestay'
  },
  {
    id: '6',
    name: 'Mùa Homestay Tà Xùa',
    description: 'Homestay theo phong cách rustic với không gian mở, hòa quyện với thiên nhiên. Cảm giác như về nhà giữa núi rừng.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.4,
    price: '380.000 - 550.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/6.%20Mùa Homestay Tà Xùa/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Khu vườn', 'BBQ ngoài trời'],
    contact: {
      phone: '0945678901'
    },
    features: ['Phong cách rustic', 'Không gian mở', 'Gần gũi thiên nhiên', 'BBQ ngoài trời'],
    folder: '6.%20Mùa Homestay Tà Xùa'
  },
  {
    id: '7',
    name: 'Mando Homestay Tà Xùa',
    description: 'Homestay hiện đại với thiết kế độc đáo, kết hợp giữa truyền thống và hiện đại. Dịch vụ chuyên nghiệp, thân thiện.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.6,
    price: '420.000 - 650.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/7.%20Mando Homestay Tà Xùa/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Nhà hàng', 'Dịch vụ tour'],
    contact: {
      phone: '0956789012'
    },
    features: ['Thiết kế độc đáo', 'Dịch vụ chuyên nghiệp', 'Kết hợp truyền thống-hiện đại', 'Tour du lịch'],
    folder: '7.%20Mando Homestay Tà Xùa'
  },
  {
    id: '8',
    name: 'Tà Xùa Mây Homestay',
    description: 'Homestay nằm giữa biển mây, mang đến trải nghiệm sống ảo diệu. Không gian yên tĩnh, thích hợp nghỉ dưỡng.',
    location: 'Đỉnh Tà Xùa, Sơn La',
    rating: 4.8,
    price: '480.000 - 750.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/8.%20Tà Xùa Mây Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'View biển mây', 'Bãi đỗ xe', 'Không gian yên tĩnh'],
    contact: {
      phone: '0967890123'
    },
    features: ['Giữa biển mây', 'Trải nghiệm ảo diệu', 'Yên tĩnh', 'Nghỉ dưỡng lý tưởng'],
    folder: '8.%20Tà Xùa Mây Homestay'
  },
  {
    id: '9',
    name: 'Mây Mơ Màng Homestay Tà Xùa',
    description: 'Homestay thơ mộng với tên gọi đầy chất thơ, mang đến không gian lãng mạn giữa núi rừng Tà Xùa.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.5,
    price: '400.000 - 600.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/9.%20Mây Mơ Màng Homestay Tà Xùa/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Không gian lãng mạn', 'Café sáng'],
    contact: {
      phone: '0978901234'
    },
    features: ['Thơ mộng', 'Lãng mạn', 'Chất thơ', 'Không gian đẹp'],
    folder: '9.%20Mây Mơ Màng Homestay Tà Xùa'
  },
  {
    id: '10',
    name: 'Tà Xùa Hills Homestay',
    description: 'Homestay nằm trên đồi với view panoramic tuyệt đẹp, không gian rộng rãi và thoáng mát.',
    location: 'Đồi Tà Xùa, Sơn La',
    rating: 4.7,
    price: '460.000 - 720.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/10.%20Tà Xùa HillsHomestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'View panoramic', 'Bãi đỗ xe', 'Không gian rộng rãi'],
    contact: {
      phone: '0989012345'
    },
    features: ['Trên đồi cao', 'View panoramic', 'Rộng rãi', 'Thoáng mát'],
    folder: '10.%20Tà Xùa HillsHomestay'
  },
  {
    id: '11',
    name: 'Táo Homestay',
    description: 'Homestay mang tên loại quả đặc sản của vùng, không gian giản dị nhưng ấm cúng, gần gũi với thiên nhiên.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.3,
    price: '320.000 - 480.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/11.%20Táo Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Vườn táo', 'Ẩm thực địa phương'],
    contact: {
      phone: '0990123456'
    },
    features: ['Đặc sản táo', 'Giản dị', 'Ấm cúng', 'Gần thiên nhiên'],
    folder: '11.%20Táo Homestay'
  },
  {
    id: '12',
    name: 'Ngỗng Tà Xùa Homestay',
    description: 'Homestay độc đáo với tên gọi thú vị, mang đến trải nghiệm khác biệt giữa núi rừng Tà Xùa.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.4,
    price: '360.000 - 520.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/12.%20Ngỗng Tà Xùa Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Trải nghiệm độc đáo', 'Ẩm thực đặc sắc'],
    contact: {
      phone: '0901234567'
    },
    features: ['Tên gọi độc đáo', 'Trải nghiệm khác biệt', 'Thú vị', 'Đặc sắc'],
    folder: '12.%20Ngỗng Tà Xùa Homestay'
  },
  {
    id: '13',
    name: 'Tú Mỉ Homestay',
    description: 'Homestay mang tên đậm chất dân gian, không gian truyền thống với lòng hiếu khách của người dân bản địa.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.2,
    price: '300.000 - 450.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/13.%20Tú Mỉ/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Văn hóa truyền thống', 'Lòng hiếu khách'],
    contact: {
      phone: '0912345678'
    },
    features: ['Chất dân gian', 'Truyền thống', 'Hiếu khách', 'Bản địa'],
    folder: '13.%20Tú Mỉ'
  },
  {
    id: '14',
    name: 'Homestay Coffee Đỉnh Núi Tà Xùa',
    description: 'Homestay kết hợp quán cà phê trên đỉnh núi, thưởng thức cà phê thơm ngon giữa không gian núi rừng hùng vĩ.',
    location: 'Đỉnh Tà Xùa, Sơn La',
    rating: 4.6,
    price: '440.000 - 680.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/14.%20Homestay Coffee Đỉnh Núi Tà Xùa/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Quán cà phê', 'View đỉnh núi', 'Cà phê đặc sản'],
    contact: {
      phone: '0923456789'
    },
    features: ['Kết hợp cà phê', 'Trên đỉnh núi', 'Cà phê thơm ngon', 'Không gian hùng vĩ'],
    folder: '14.%20Homestay Coffee Đỉnh Núi Tà Xùa'
  },
  {
    id: '15',
    name: 'Anh Tài Mây Homestay',
    description: 'Homestay mang tên chủ nhân với không gian ấm áp, thân thiện. Dịch vụ tận tình như người thân trong gia đình.',
    location: 'Tà Xùa, Sơn La',
    rating: 4.5,
    price: '390.000 - 580.000 VNĐ/đêm',
    images: [
      '/cơ%20sở%20lưu%20trú/15.%20Anh Tài Mây Homestay/HÌNH%20ẢNH%20/1.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Bãi đỗ xe', 'Dịch vụ tận tình', 'Không gian ấm áp'],
    contact: {
      phone: '0934567890'
    },
    features: ['Thân thiện', 'Ấm áp', 'Tận tình', 'Như gia đình'],
    folder: '15.%20Anh Tài Mây Homestay'
  }
];