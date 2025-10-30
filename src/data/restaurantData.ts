export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  images: string[];
  cuisine: string; // Loại món đặc trưng
  priceRange: 'budget' | 'mid' | 'luxury';
  openHours: string;
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
  isPartner?: boolean;
}

export const restaurantData: Restaurant[] = [
  {
    id: 'rest-001',
    name: 'Nhà Hàng Mây Trắng',
    description: 'Thưởng thức món ăn H\'Mông truyền thống với view núi tuyệt đẹp',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.5,
    images: [
      '/images/restaurant/may-trang-1.jpg',
      '/images/restaurant/may-trang-2.jpg',
      '/images/restaurant/may-trang-3.jpg'
    ],
    cuisine: 'Món H\'Mông truyền thống',
    priceRange: 'mid',
    openHours: '07:00 - 22:00',
    amenities: ['Chỗ đậu xe', 'Wifi miễn phí', 'Phù hợp gia đình', 'View núi'],
    contact: {
      phone: '0987654321',
      email: 'maytrang@restaurant.com'
    },
    features: ['Đặt bàn trước', 'Món chay có sẵn', 'Nhóm lớn'],
    isPartner: true
  },
  {
    id: 'rest-002',
    name: 'Quán Cà Phê Shan Tuyết',
    description: 'Thưởng thức cà phê Shan Tuyết nguyên chất và bánh mì địa phương',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.3,
    images: [
      '/images/restaurant/shan-tuyet-1.jpg',
      '/images/restaurant/shan-tuyet-2.jpg'
    ],
    cuisine: 'Cà phê & Đồ uống',
    priceRange: 'budget',
    openHours: '06:00 - 20:00',
    amenities: ['Wifi miễn phí', 'Chỗ ngồi ngoài trời', 'Takeaway'],
    contact: {
      phone: '0912345678'
    },
    features: ['Cà phê rang xay', 'Bánh tươi hàng ngày'],
    isPartner: false
  },
  {
    id: 'rest-003',
    name: 'Nhà Hàng Núi Xanh',
    description: 'Buffet lẩu nướng với nguyên liệu tươi sống từ núi rừng Tà Xùa',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.7,
    images: [
      '/images/restaurant/nui-xanh-1.jpg',
      '/images/restaurant/nui-xanh-2.jpg',
      '/images/restaurant/nui-xanh-3.jpg'
    ],
    cuisine: 'Lẩu nướng & Hải sản',
    priceRange: 'luxury',
    openHours: '11:00 - 23:00',
    amenities: ['Chỗ đậu xe', 'Wifi miễn phí', 'Phòng riêng', 'Karaoke'],
    contact: {
      phone: '0923456789',
      email: 'nuixanh@restaurant.com'
    },
    features: ['Buffet tự chọn', 'Phòng VIP', 'Tiệc nhóm'],
    isPartner: true
  },
  {
    id: 'rest-004',
    name: 'Quán Ăn Bà Tám',
    description: 'Món ăn dân dã, giá cả phải chăng với hương vị quê nhà',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.2,
    images: [
      '/images/restaurant/ba-tam-1.jpg',
      '/images/restaurant/ba-tam-2.jpg'
    ],
    cuisine: 'Món dân dã',
    priceRange: 'budget',
    openHours: '06:00 - 21:00',
    amenities: ['Chỗ đậu xe', 'Phù hợp gia đình'],
    contact: {
      phone: '0934567890'
    },
    features: ['Món ăn tự nhiên', 'Giá bình dân'],
    isPartner: false
  },
  {
    id: 'rest-005',
    name: 'Nhà Hàng Tà Xùa View',
    description: 'Ẩm thực cao cấp với tầm nhìn panorama toàn cảnh Tà Xùa',
    location: 'Đỉnh Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.8,
    images: [
      '/images/restaurant/ta-xua-view-1.jpg',
      '/images/restaurant/ta-xua-view-2.jpg',
      '/images/restaurant/ta-xua-view-3.jpg'
    ],
    cuisine: 'Ẩm thực cao cấp',
    priceRange: 'luxury',
    openHours: '10:00 - 22:00',
    amenities: ['Chỗ đậu xe', 'Wifi miễn phí', 'View đỉnh núi', 'Phòng riêng', 'Điều hòa'],
    contact: {
      phone: '0945678901',
      email: 'taxuaview@restaurant.com'
    },
    features: ['Fine dining', 'Sunset view', 'Romantic dinner'],
    isPartner: true
  }
];