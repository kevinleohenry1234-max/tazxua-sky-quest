export interface Attraction {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  highlights: string[];
  bestTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  tips: string[];
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  category: 'mountain' | 'forest' | 'viewpoint' | 'cultural';
}

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: 'cay-co-don',
    name: 'Cây Cô Đơn',
    description: 'Một cây đứng lẻ loi giữa khoảng đất trống, xung quanh là mây núi mênh mông. Hình ảnh cây nhỏ bé giữa không gian rộng lớn tạo cảm giác vừa hùng vĩ vừa trữ tình.',
    shortDescription: 'Biểu tượng săn mây nổi tiếng với góc check-in huyền thoại',
    location: 'Sườn núi cao thuộc ngã 3 Xím Vàng xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Biểu tượng "săn mây" nổi tiếng',
      'Góc check-in huyền thoại với nền biển mây trắng xóa',
      'Cảnh sắc thay đổi theo mùa',
      'Điểm chụp ảnh cưới, ảnh kỷ niệm lý tưởng'
    ],
    bestTime: 'Tháng 11 - tháng 4 (mùa khô), sáng sớm 5h30-7h và chiều muộn 16h30-17h30',
    difficulty: 'medium',
    duration: '2-3 giờ',
    tips: [
      'Chuẩn bị áo khoác vì sáng sớm trời lạnh',
      'Đi giày bám tốt khi leo lên sườn dốc',
      'Tránh chen lấn, đứng quá sát mép vực để an toàn',
      'Giữ vệ sinh, không khắc tên lên thân cây'
    ],
    images: [
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-1.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-3.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-4.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-5.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-6.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-check-in-1699831558.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-hoang-hon-1699831558.png',
      '/Attractions/Cay_Co_Don/images/cay-co-don-ta-xua-san-may-1699831582.png'
    ],
    coordinates: {
      lat: 21.3167,
      lng: 104.4167
    },
    category: 'viewpoint'
  },
  {
    id: 'dinh-gio-ta-xua',
    name: 'Đỉnh Gió Tà Xùa',
    description: 'Một điểm cao giữa núi rừng, nơi gió lộng thổi quanh năm. Từ đây có thể phóng tầm mắt ngắm nhìn biển mây bồng bềnh cuồn cuộn dưới thung lũng, đặc biệt vào sáng sớm.',
    shortDescription: 'Cửa ngõ săn mây của Tà Xùa với khung cảnh núi non trùng điệp',
    location: 'Trên đường đi vào trung tâm xã Tà Xùa, cách thị trấn Bắc Yên khoảng 10km',
    highlights: [
      'Điểm ngắm biển mây lý tưởng',
      'Khung cảnh núi non trùng điệp, bầu trời trong xanh',
      'Gió thổi lồng lộng tạo cảm giác tự do và hùng vĩ',
      'Điểm dừng chân đầu tiên trước khi chinh phục các địa điểm khác'
    ],
    bestTime: 'Tháng 10 - tháng 4, sáng sớm để săn mây',
    difficulty: 'easy',
    duration: '1-2 giờ',
    tips: [
      'Dừng lại uống trà, cà phê tại các quán nhỏ ven đường',
      'Chụp ảnh với background tự nhiên tuyệt đẹp',
      'Mùa hoa (tháng 12-3) có thêm sắc hồng của hoa đào, hoa mận',
      'Mang áo ấm vì trên núi khá lạnh'
    ],
    images: [
      '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-1.png',
      '/Attractions/Dinh_Gio_Ta_Xua/images/Dinh-gio-Ta-Xua-2.png',
      '/Attractions/Dinh_Gio_Ta_Xua/images/065127cce66edb405cbeaff03a3a23cb.png',
      '/Attractions/Dinh_Gio_Ta_Xua/images/1753765285.png',
      '/Attractions/Dinh_Gio_Ta_Xua/images/585f1a8ed209574c1ddbe1546376d356.png'
    ],
    coordinates: {
      lat: 21.3200,
      lng: 104.4200
    },
    category: 'viewpoint'
  },
  {
    id: 'mom-ca-heo',
    name: 'Mỏm Cá Heo',
    description: 'Một mỏm đá nhô ra khỏi vách núi, hình dáng giống đầu cá heo. Nổi bật trên vùng núi cao, tạo cảm giác "lơ lửng giữa trời" khi đứng trên mỏm đá.',
    shortDescription: 'Mỏm đá hình cá heo độc đáo, điểm check-in nổi tiếng của giới trẻ',
    location: 'Xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Hình dáng tự nhiên kỳ thú như "cá heo vươn mình giữa biển mây"',
      'Cảnh quan xung quanh hùng vĩ với nhiều mây vào buổi sáng',
      'Điểm check-in được giới trẻ yêu thích',
      'Cảm giác "lơ lửng giữa trời" khi đứng trên mỏm đá'
    ],
    bestTime: 'Tháng 11 - tháng 4, sáng sớm 5h30-7h để săn mây',
    difficulty: 'medium',
    duration: '2-3 giờ',
    tips: [
      'Mang giày thể thao đế bám tốt, trang phục gọn nhẹ',
      'Mang áo ấm vì sáng sớm trên núi lạnh',
      'Cẩn thận khi chụp ảnh ở mép mỏm đá, không tạo dáng mạo hiểm',
      'Mang theo đồ ăn nhẹ, nước uống',
      'Giữ vệ sinh, không xả rác'
    ],
    images: [
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155507.png',
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155532.png',
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155618.png',
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155644.png',
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155707.png',
      '/Attractions/Mom_Ca_Heo/images/Screenshot 2025-09-29 155733.png'
    ],
    coordinates: {
      lat: 21.3150,
      lng: 104.4150
    },
    category: 'viewpoint'
  },
  {
    id: 'rung-nguyen-sinh',
    name: 'Rừng Nguyên Sinh Tà Xùa',
    description: 'Khu rừng nguyên sinh với hệ sinh thái đa dạng, nhiều loài gỗ quý, cây dương xỉ, phong lan rừng. Được mệnh danh là "vương quốc rêu xanh" với thảm rêu phủ kín thân cây.',
    shortDescription: 'Vương quốc rêu xanh với hệ sinh thái nguyên sinh độc đáo',
    location: 'Khu vực núi cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Hệ sinh thái nguyên sinh đa dạng với nhiều loài gỗ quý',
      'Vương quốc rêu xanh độc đáo hiếm thấy ở Việt Nam',
      'Khí hậu mát mẻ 18-25°C, nhiều sương mù huyền bí',
      'Trải nghiệm trekking và cắm trại giữa núi rừng'
    ],
    bestTime: 'Tháng 9 - tháng 3 (mùa khô) để hạn chế mưa trơn trượt',
    difficulty: 'hard',
    duration: '1-2 ngày',
    tips: [
      'Bắt buộc có người dẫn đường bản địa (người Mông)',
      'Chuẩn bị giày leo núi chống trơn, áo mưa, găng tay',
      'Mang đèn pin, thuốc chống côn trùng',
      'Giữ gìn môi trường, tuyệt đối không xả rác hay phá cây rừng'
    ],
    images: [
      '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-1.png',
      '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-2.png',
      '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-3.png',
      '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua-4.png',
      '/Attractions/Rung_Nguyen_Sinh/images/rung-ta-xua.png'
    ],
    coordinates: {
      lat: 21.3100,
      lng: 104.4100
    },
    category: 'forest'
  },
  {
    id: 'song-lung-khung-long',
    name: 'Sống Lưng Khủng Long',
    description: 'Dải núi nhọn kéo dài với hình dáng giống sống lưng khủng long khổng lồ. Hai bên là vực sâu hun hút, đi trên cảm giác như đang bước trên lưng khủng long.',
    shortDescription: 'Dải núi hình sống lưng khủng long với trải nghiệm mạo hiểm',
    location: 'Khu vực xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Hình dáng độc đáo như sống lưng khủng long khổng lồ',
      'Cảnh quan kỳ vĩ với biển mây bao quanh buổi sáng',
      'Trải nghiệm thử thách với con đường hẹp chỉ đủ một người đi',
      'Điểm check-in nổi tiếng của phượt thủ và dân trekking'
    ],
    bestTime: 'Tháng 11 - tháng 4, sáng sớm để săn mây và chiều muộn ngắm hoàng hôn',
    difficulty: 'hard',
    duration: '3-4 giờ',
    tips: [
      'Trang phục thoải mái, gọn nhẹ với giày leo núi có độ bám tốt',
      'Chuẩn bị gậy trekking để giữ thăng bằng',
      'Không nên đi vào ngày mưa to vì dễ trơn trượt',
      'Cẩn trọng khi chụp ảnh vì hai bên là vực sâu',
      'Mang theo áo khoác, nước uống, đồ ăn nhẹ'
    ],
    images: [
      '/Attractions/Song_lung_khung_long/Images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-02-1662440259.png',
      '/Attractions/Song_lung_khung_long/Images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-03-1662440259.png',
      '/Attractions/Song_lung_khung_long/Images/song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-04-1662440259.png',
      '/Attractions/Song_lung_khung_long/Images/0cb8876c721ea240fb0f5.png',
      '/Attractions/Song_lung_khung_long/Images/164b376e3b27d2798b36.png',
      '/Attractions/Song_lung_khung_long/Images/IMG-6630.png'
    ],
    coordinates: {
      lat: 21.3080,
      lng: 104.4080
    },
    category: 'mountain'
  }
];

export const getAttractionById = (id: string): Attraction | undefined => {
  return ATTRACTIONS_DATA.find(attraction => attraction.id === id);
};

export const getAttractionsByCategory = (category: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.category === category);
};

export const getAttractionsByDifficulty = (difficulty: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.difficulty === difficulty);
};