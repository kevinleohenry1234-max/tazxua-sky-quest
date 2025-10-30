export interface Transport {
  id: string;
  name: string;
  description: string;
  serviceType: 'bus' | 'motorbike_rental' | 'shuttle' | 'private_driver' | 'taxi';
  route: {
    from: string;
    to: string;
  };
  price?: string;
  rating: number;
  images: string[];
  amenities: string[];
  supportsForeigner: boolean;
  paymentMethods: string[];
  contact: {
    phone?: string;
    email?: string;
    hotline?: string;
  };
  features: string[];
  isPartner?: boolean;
  schedule?: string;
}

export const transportData: Transport[] = [
  {
    id: 'trans-001',
    name: 'Xe Khách Tà Xùa Express',
    description: 'Dịch vụ xe khách chất lượng cao từ Hà Nội đến Tà Xùa',
    serviceType: 'bus',
    route: {
      from: 'Hà Nội',
      to: 'Tà Xùa'
    },
    price: '350.000đ',
    rating: 4.5,
    images: [
      '/images/transport/bus-express-1.jpg',
      '/images/transport/bus-express-2.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Điều hòa', 'Ghế nằm', 'Nước uống'],
    supportsForeigner: true,
    paymentMethods: ['Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng'],
    contact: {
      phone: '0987654321',
      hotline: '1900-TAXUA',
      email: 'booking@taxuaexpress.com'
    },
    features: ['Đón tận nơi', 'Hành lý lớn', 'Lịch trình cố định'],
    isPartner: true,
    schedule: 'Khởi hành: 22:00 hàng ngày'
  },
  {
    id: 'trans-002',
    name: 'Thuê Xe Máy Tà Xùa',
    description: 'Cho thuê xe máy tự lái khám phá Tà Xùa tự do',
    serviceType: 'motorbike_rental',
    route: {
      from: 'Trung tâm Tà Xùa',
      to: 'Các điểm du lịch'
    },
    price: '150.000đ/ngày',
    rating: 4.3,
    images: [
      '/images/transport/motorbike-1.jpg',
      '/images/transport/motorbike-2.jpg'
    ],
    amenities: ['Mũ bảo hiểm', 'Áo mưa', 'Bản đồ', 'Hỗ trợ 24/7'],
    supportsForeigner: true,
    paymentMethods: ['Tiền mặt', 'Chuyển khoản'],
    contact: {
      phone: '0912345678',
      email: 'rental@taxua.com'
    },
    features: ['Xe mới', 'Bảo hiểm', 'Giao xe tận nơi'],
    isPartner: false
  },
  {
    id: 'trans-003',
    name: 'Shuttle Bus Sky Quest',
    description: 'Dịch vụ đưa đón từ sân bay Nội Bài đến Tà Xùa',
    serviceType: 'shuttle',
    route: {
      from: 'Sân bay Nội Bài',
      to: 'Tà Xùa'
    },
    price: '500.000đ/người',
    rating: 4.7,
    images: [
      '/images/transport/shuttle-1.jpg',
      '/images/transport/shuttle-2.jpg'
    ],
    amenities: ['Wifi miễn phí', 'Điều hòa', 'Nước uống', 'Hành lý miễn phí'],
    supportsForeigner: true,
    paymentMethods: ['Tiền mặt', 'Chuyển khoản', 'PayPal'],
    contact: {
      phone: '0923456789',
      email: 'shuttle@skyquest.com',
      hotline: '1900-SKYQUEST'
    },
    features: ['Đón tại sân bay', 'Hướng dẫn viên', 'Lịch trình linh hoạt'],
    isPartner: true,
    schedule: 'Theo yêu cầu, đặt trước 24h'
  },
  {
    id: 'trans-004',
    name: 'Tài Xế Riêng Anh Dũng',
    description: 'Dịch vụ tài xế riêng, hướng dẫn địa phương nhiệt tình',
    serviceType: 'private_driver',
    route: {
      from: 'Tà Xùa',
      to: 'Các điểm du lịch'
    },
    price: '800.000đ/ngày',
    rating: 4.8,
    images: [
      '/images/transport/private-driver-1.jpg',
      '/images/transport/private-driver-2.jpg'
    ],
    amenities: ['Xe 7 chỗ', 'Điều hòa', 'Hướng dẫn địa phương', 'Nước uống'],
    supportsForeigner: true,
    paymentMethods: ['Tiền mặt', 'Chuyển khoản'],
    contact: {
      phone: '0934567890',
      email: 'dungdriver@gmail.com'
    },
    features: ['Kinh nghiệm 10 năm', 'Biết tiếng Anh cơ bản', 'Linh hoạt lịch trình'],
    isPartner: false
  },
  {
    id: 'trans-005',
    name: 'Taxi Tà Xùa 24/7',
    description: 'Dịch vụ taxi địa phương, hoạt động 24/7',
    serviceType: 'taxi',
    route: {
      from: 'Trong khu vực Tà Xùa',
      to: 'Các điểm lân cận'
    },
    price: '15.000đ/km',
    rating: 4.2,
    images: [
      '/images/transport/taxi-1.jpg',
      '/images/transport/taxi-2.jpg'
    ],
    amenities: ['Điều hòa', 'Đồng hồ tính cước', 'Hóa đơn'],
    supportsForeigner: false,
    paymentMethods: ['Tiền mặt'],
    contact: {
      phone: '0945678901',
      hotline: '1900-TAXI'
    },
    features: ['Hoạt động 24/7', 'Giá cố định', 'Phục vụ nhanh'],
    isPartner: false
  },
  {
    id: 'trans-006',
    name: 'Xe Limousine Sapa - Tà Xùa',
    description: 'Dịch vụ xe limousine cao cấp tuyến Sapa - Tà Xùa',
    serviceType: 'bus',
    route: {
      from: 'Sapa',
      to: 'Tà Xùa'
    },
    price: '250.000đ',
    rating: 4.6,
    images: [
      '/images/transport/limousine-1.jpg',
      '/images/transport/limousine-2.jpg'
    ],
    amenities: ['Ghế massage', 'Wifi miễn phí', 'Điều hòa', 'Nước uống', 'Snack'],
    supportsForeigner: true,
    paymentMethods: ['Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng'],
    contact: {
      phone: '0956789012',
      email: 'limousine@taxua.com'
    },
    features: ['Ghế VIP', 'Phục vụ đồ uống', 'Wifi tốc độ cao'],
    isPartner: true,
    schedule: 'Khởi hành: 08:00, 14:00, 20:00'
  }
];