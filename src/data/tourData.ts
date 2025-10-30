export interface Tour {
  id: string;
  name: string;
  description: string;
  duration: string; // VD: "2 ngày 1 đêm", "nửa ngày"
  tourType: 'trekking' | 'cultural' | 'eco' | 'camping' | 'sunrise' | 'village';
  difficulty: 'easy' | 'medium' | 'challenging';
  startPoint: string;
  mainDestination: string;
  rating: number;
  images: string[];
  guide: {
    included: boolean;
    name?: string;
    language: string[];
  };
  includes: string[]; // Bao gồm ăn uống, nghỉ ngơi
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
  isPartner?: boolean;
  price?: string;
}

export const tourData: Tour[] = [
  {
    id: 'tour-001',
    name: 'Trekking Đỉnh Tà Xùa - Săn Mây Bình Minh',
    description: 'Chinh phục đỉnh Tà Xùa cao 2865m, ngắm bình minh trên biển mây',
    duration: '2 ngày 1 đêm',
    tourType: 'trekking',
    difficulty: 'challenging',
    startPoint: 'Trung tâm Tà Xùa',
    mainDestination: 'Đỉnh Tà Xùa',
    rating: 4.8,
    images: [
      '/images/tour/ta-xua-trekking-1.jpg',
      '/images/tour/ta-xua-trekking-2.jpg',
      '/images/tour/ta-xua-trekking-3.jpg'
    ],
    guide: {
      included: true,
      name: 'Anh Sùng - Hướng dẫn viên địa phương',
      language: ['Tiếng Việt', 'Tiếng H\'Mông']
    },
    includes: ['Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Lều cắm trại', 'Túi ngủ'],
    amenities: ['Hướng dẫn viên', 'Thiết bị cắm trại', 'Bảo hiểm', 'Xe đưa đón'],
    contact: {
      phone: '0987123456',
      email: 'trekking@taxua.com'
    },
    features: ['Cắm trại đỉnh núi', 'Ngắm bình minh', 'Nhiếp ảnh'],
    isPartner: true,
    price: '1.200.000đ'
  },
  {
    id: 'tour-002',
    name: 'Tour Văn Hóa Bản H\'Mông',
    description: 'Khám phá văn hóa, phong tục tập quán của đồng bào H\'Mông',
    duration: '1 ngày',
    tourType: 'cultural',
    difficulty: 'easy',
    startPoint: 'Trung tâm Tà Xùa',
    mainDestination: 'Bản Hua Tạt',
    rating: 4.5,
    images: [
      '/images/tour/hmong-culture-1.jpg',
      '/images/tour/hmong-culture-2.jpg',
      '/images/tour/hmong-culture-3.jpg'
    ],
    guide: {
      included: true,
      name: 'Chị Sú - Người H\'Mông địa phương',
      language: ['Tiếng Việt', 'Tiếng H\'Mông']
    },
    includes: ['Ăn trưa truyền thống', 'Trà Shan Tuyết', 'Quà lưu niệm'],
    amenities: ['Hướng dẫn viên', 'Xe đưa đón', 'Bảo hiểm'],
    contact: {
      phone: '0912345678',
      email: 'culture@taxua.com'
    },
    features: ['Thăm gia đình H\'Mông', 'Học làm thổ cẩm', 'Thưởng thức ẩm thực'],
    isPartner: true,
    price: '500.000đ'
  },
  {
    id: 'tour-003',
    name: 'Eco Tour Rừng Nguyên Sinh',
    description: 'Khám phá hệ sinh thái rừng nguyên sinh Tà Xùa',
    duration: 'nửa ngày',
    tourType: 'eco',
    difficulty: 'medium',
    startPoint: 'Trạm kiểm lâm Tà Xùa',
    mainDestination: 'Rừng nguyên sinh Tà Xùa',
    rating: 4.3,
    images: [
      '/images/tour/eco-forest-1.jpg',
      '/images/tour/eco-forest-2.jpg'
    ],
    guide: {
      included: true,
      name: 'Anh Vàng - Kiểm lâm viên',
      language: ['Tiếng Việt']
    },
    includes: ['Nước uống', 'Snack'],
    amenities: ['Hướng dẫn viên chuyên môn', 'Thiết bị quan sát', 'Bảo hiểm'],
    contact: {
      phone: '0923456789'
    },
    features: ['Quan sát động vật hoang dã', 'Tìm hiểu thực vật', 'Giáo dục môi trường'],
    isPartner: false,
    price: '300.000đ'
  },
  {
    id: 'tour-004',
    name: 'Camping Dưới Sao Trời Tà Xùa',
    description: 'Trải nghiệm cắm trại, ngắm sao và thưởng thức BBQ trên núi',
    duration: '1 đêm',
    tourType: 'camping',
    difficulty: 'easy',
    startPoint: 'Trung tâm Tà Xùa',
    mainDestination: 'Khu cắm trại Tà Xùa',
    rating: 4.6,
    images: [
      '/images/tour/camping-1.jpg',
      '/images/tour/camping-2.jpg',
      '/images/tour/camping-3.jpg'
    ],
    guide: {
      included: true,
      name: 'Team Sky Quest',
      language: ['Tiếng Việt', 'English']
    },
    includes: ['BBQ dinner', 'Lều cắm trại', 'Túi ngủ', 'Ăn sáng'],
    amenities: ['Thiết bị cắm trại', 'Lửa trại', 'Âm thanh', 'Bảo hiểm'],
    contact: {
      phone: '0934567890',
      email: 'camping@skyquest.com'
    },
    features: ['Ngắm sao đêm', 'Lửa trại', 'Âm nhạc acoustic'],
    isPartner: true,
    price: '800.000đ'
  },
  {
    id: 'tour-005',
    name: 'Sunrise Tour - Bình Minh Trên Mây',
    description: 'Khởi hành sớm để ngắm bình minh tuyệt đẹp trên biển mây',
    duration: 'nửa ngày',
    tourType: 'sunrise',
    difficulty: 'medium',
    startPoint: 'Trung tâm Tà Xùa (4:30 AM)',
    mainDestination: 'Điểm ngắm bình minh Tà Xùa',
    rating: 4.9,
    images: [
      '/images/tour/sunrise-1.jpg',
      '/images/tour/sunrise-2.jpg',
      '/images/tour/sunrise-3.jpg'
    ],
    guide: {
      included: true,
      name: 'Anh Thành - Nhiếp ảnh gia',
      language: ['Tiếng Việt', 'English']
    },
    includes: ['Ăn sáng nhẹ', 'Cà phê nóng', 'Hỗ trợ chụp ảnh'],
    amenities: ['Hướng dẫn viên', 'Xe đưa đón', 'Chăn ấm', 'Bảo hiểm'],
    contact: {
      phone: '0945678901',
      email: 'sunrise@taxua.com'
    },
    features: ['Golden hour photography', 'Ngắm biển mây', 'Trải nghiệm độc đáo'],
    isPartner: true,
    price: '400.000đ'
  }
];