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
    name: 'Nhà Hàng A Phủ',
    description: 'Tinh hoa ẩm thực Tà Xùa với đặc sản gà bản, gà đen, lợn đen, thịt gác bếp và rau rừng. View biển mây tuyệt đẹp.',
    location: 'Trung tâm xã Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.6,
    images: [
      '/Restaurants/A Phu/images/Screenshot 2025-10-03 011500.png',
      '/Restaurants/A Phu/images/Screenshot 2025-10-03 011541.png',
      '/Restaurants/A Phu/images/Screenshot 2025-10-03 011625.png'
    ],
    cuisine: 'Đặc sản Tây Bắc',
    priceRange: 'mid',
    openHours: 'Cả ngày',
    amenities: ['Chỗ đậu xe', 'View biển mây', 'Phù hợp gia đình', 'Sức chứa 300 người'],
    contact: {
      phone: '0978 426 813'
    },
    features: ['Đặc sản núi rừng', 'View panorama', 'Tiệc nhóm lớn'],
    isPartner: true
  },
  {
    id: 'rest-002',
    name: 'Bếp Tấm',
    description: 'Nhà hàng nổi tiếng với lẩu cá tầm và lẩu gà đen. Phục vụ nhiệt tình, giá cả phải chăng.',
    location: 'Trung tâm xã Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.3,
    images: [
      '/Restaurants/Bep Tam/images/FB_IMG_1708699363083.png',
      '/Restaurants/Bep Tam/images/FB_IMG_1708699375305.png',
      '/Restaurants/Bep Tam/images/FB_IMG_1708699476233.png',
      '/Restaurants/Bep Tam/images/Screenshot 2025-10-03 010804.png'
    ],
    cuisine: 'Lẩu & Đặc sản Tây Bắc',
    priceRange: 'budget',
    openHours: '07:00 - 22:00',
    amenities: ['Chỗ đậu xe', 'Phù hợp gia đình', 'Đặt bàn trước'],
    contact: {
      phone: '0846 951 111'
    },
    features: ['Lẩu cá tầm', 'Lẩu gà đen', 'Cơm suất'],
    isPartner: true
  },
  {
    id: 'rest-003',
    name: 'Cơm Nhà Namiya',
    description: 'Quán cơm gia đình với món ăn dân dã, hương vị truyền thống và giá cả bình dân.',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.2,
    images: [
      '/Restaurants/Com nha Namiya/images/quan-an-ngon-o-ta-xua-7.png',
      '/Restaurants/Com nha Namiya/images/quan_an_ngon_tai_ta_xua_11.png',
      '/Restaurants/Com nha Namiya/images/quan_an_ngon_tai_ta_xua_12.png'
    ],
    cuisine: 'Cơm gia đình',
    priceRange: 'budget',
    openHours: '06:00 - 21:00',
    amenities: ['Chỗ đậu xe', 'Phù hợp gia đình', 'Takeaway'],
    contact: {
      phone: '0912 345 678'
    },
    features: ['Món ăn gia đình', 'Giá bình dân', 'Cơm suất'],
    isPartner: false
  },
  {
    id: 'rest-004',
    name: 'Đồi Mây Tà Xùa',
    description: 'Nhà hàng với view đồi mây tuyệt đẹp, chuyên các món nướng và đặc sản địa phương.',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.4,
    images: [
      '/Restaurants/Doi May Ta Xua/images/quan_an_ngon_tai_ta_xua_1.png',
      '/Restaurants/Doi May Ta Xua/images/quan_an_ngon_tai_ta_xua_2.png',
      '/Restaurants/Doi May Ta Xua/images/quan_an_ngon_tai_ta_xua_3.png'
    ],
    cuisine: 'Nướng & Đặc sản',
    priceRange: 'mid',
    openHours: '08:00 - 22:00',
    amenities: ['Chỗ đậu xe', 'View đồi mây', 'Phù hợp gia đình'],
    contact: {
      phone: '0923 456 789'
    },
    features: ['View đồi mây', 'Món nướng', 'Đặc sản địa phương'],
    isPartner: true
  },
  {
    id: 'rest-005',
    name: 'H\'Mông Tà Xùa',
    description: 'Nhà hàng chuyên phục vụ ẩm thực H\'Mông truyền thống với không gian văn hóa đặc trưng.',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.5,
    images: [
      '/Restaurants/HMong Ta Xua/images/307365177_130325713086282_4084973883464542559_n-1536x1536 (1).png',
      '/Restaurants/HMong Ta Xua/images/312608538_138358285616358_4059554333681470247_n-1536x1152.png'
    ],
    cuisine: 'Ẩm thực H\'Mông',
    priceRange: 'mid',
    openHours: '07:00 - 21:00',
    amenities: ['Chỗ đậu xe', 'Không gian văn hóa', 'Phù hợp gia đình'],
    contact: {
      phone: '0934 567 890'
    },
    features: ['Ẩm thực H\'Mông', 'Văn hóa dân tộc', 'Trải nghiệm độc đáo'],
    isPartner: true
  },
  {
    id: 'rest-006',
    name: 'Tiệm Nướng Cánh Cam',
    description: 'Chuyên các món nướng thơm ngon với gia vị đặc trưng và không gian ấm cúng.',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.3,
    images: [
      '/Restaurants/Tiem nuong Canh Cam/images/quan_an_ngon_tai_ta_xua_4.png',
      '/Restaurants/Tiem nuong Canh Cam/images/quan_an_ngon_tai_ta_xua_5.png',
      '/Restaurants/Tiem nuong Canh Cam/images/quan_an_ngon_tai_ta_xua_6.png'
    ],
    cuisine: 'Nướng & BBQ',
    priceRange: 'budget',
    openHours: '16:00 - 23:00',
    amenities: ['Chỗ đậu xe', 'Không gian ấm cúng', 'Phù hợp nhóm bạn'],
    contact: {
      phone: '0945 678 901'
    },
    features: ['Món nướng đặc sắc', 'Gia vị truyền thống', 'Không gian thân thiện'],
    isPartner: false
  },
  {
    id: 'rest-007',
    name: 'Vua Lẩu Nướng',
    description: 'Nhà hàng chuyên lẩu nướng với nguyên liệu tươi sống và không gian rộng rãi.',
    location: 'Tà Xùa, Bắc Yên, Sơn La',
    rating: 4.4,
    images: [
      '/Restaurants/Vua Lau Nuong/images/FB_IMG_1708699717014.png',
      '/Restaurants/Vua Lau Nuong/images/FB_IMG_1708699721678.png'
    ],
    cuisine: 'Lẩu nướng',
    priceRange: 'mid',
    openHours: '11:00 - 23:00',
    amenities: ['Chỗ đậu xe', 'Không gian rộng rãi', 'Phù hợp gia đình'],
    contact: {
      phone: '0956 789 012'
    },
    features: ['Lẩu nướng tự chọn', 'Nguyên liệu tươi sống', 'Phục vụ nhóm lớn'],
    isPartner: true
  }
];