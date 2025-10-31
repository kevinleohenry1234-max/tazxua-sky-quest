const fs = require('fs');
const path = require('path');

// Đường dẫn
const LOCATIONS_DIR = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Locations';
const ATTRACTIONS_DIR = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Attractions';
const ATTRACTIONS_DATA_FILE = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/src/data/attractionsData.ts';

// Mapping tên địa điểm sang thông tin chi tiết
const LOCATION_INFO = {
  'BẢN BẸ TÀ XÙA': {
    name: 'Bản Bẹ Tà Xùa',
    description: 'Bản làng của người Mông nằm giữa núi rừng Tà Xùa, nơi du khách có thể trải nghiệm văn hóa bản địa độc đáo và thưởng thức cảnh quan thiên nhiên hùng vĩ.',
    shortDescription: 'Bản làng Mông truyền thống với văn hóa bản địa độc đáo',
    location: 'Xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Trải nghiệm văn hóa người Mông truyền thống',
      'Kiến trúc nhà sàn đặc trưng vùng núi cao',
      'Cảnh quan thiên nhiên hùng vĩ xung quanh bản làng',
      'Thưởng thức ẩm thực địa phương đặc sắc'
    ],
    bestTime: 'Quanh năm, tốt nhất từ tháng 10 - tháng 4',
    difficulty: 'easy',
    duration: '2-3 giờ',
    tips: [
      'Tôn trọng văn hóa và phong tục địa phương',
      'Mang theo quà nhỏ cho trẻ em bản địa',
      'Học vài câu chào hỏi bằng tiếng Mông',
      'Không chụp ảnh người dân mà không xin phép'
    ],
    coordinates: { lat: 21.3180, lng: 104.4180 },
    category: 'cultural'
  },
  'CÂY CÔ ĐƠN': {
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
    coordinates: { lat: 21.3167, lng: 104.4167 },
    category: 'viewpoint'
  },
  'CỘT MỐC TÀ XÙA': {
    name: 'Cột Mốc Tà Xùa',
    description: 'Cột mốc đánh dấu ranh giới địa lý quan trọng của vùng Tà Xùa, nơi du khách có thể chụp ảnh lưu niệm và ngắm nhìn cảnh quan núi non hùng vĩ xung quanh.',
    shortDescription: 'Cột mốc địa lý quan trọng với tầm nhìn panorama tuyệt đẹp',
    location: 'Khu vực đỉnh cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Điểm đánh dấu địa lý quan trọng của Tà Xùa',
      'Tầm nhìn panorama 360 độ ra núi non',
      'Điểm check-in với ý nghĩa đặc biệt',
      'Cảnh quan núi rừng hùng vĩ xung quanh'
    ],
    bestTime: 'Tháng 10 - tháng 4, sáng sớm để tránh sương mù',
    difficulty: 'medium',
    duration: '1-2 giờ',
    tips: [
      'Mang theo GPS để định vị chính xác',
      'Chụp ảnh với cột mốc làm điểm nhấn',
      'Cẩn thận khi di chuyển trên địa hình núi cao',
      'Mang áo ấm vì thời tiết thay đổi nhanh'
    ],
    coordinates: { lat: 21.3200, lng: 104.4200 },
    category: 'viewpoint'
  },
  'MỎM CÁ HEO': {
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
    coordinates: { lat: 21.3150, lng: 104.4150 },
    category: 'viewpoint'
  },
  'MỎM ĐẦU RÙA': {
    name: 'Mỏm Đầu Rùa',
    description: 'Mỏm đá có hình dáng giống đầu rùa khổng lồ nhô ra từ vách núi, tạo nên một cảnh quan độc đáo và hùng vĩ giữa núi rừng Tà Xùa.',
    shortDescription: 'Mỏm đá hình đầu rùa khổng lồ với cảnh quan kỳ vĩ',
    location: 'Khu vực núi cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Hình dáng độc đáo như đầu rùa khổng lồ',
      'Cảnh quan núi rừng hùng vĩ xung quanh',
      'Điểm ngắm cảnh và chụp ảnh tuyệt đẹp',
      'Trải nghiệm cảm giác đứng trên "đầu rùa" giữa trời'
    ],
    bestTime: 'Tháng 10 - tháng 4, tránh mùa mưa',
    difficulty: 'medium',
    duration: '2-3 giờ',
    tips: [
      'Đi giày leo núi có độ bám tốt',
      'Cẩn thận khi tiếp cận mép mỏm đá',
      'Mang theo nước uống và đồ ăn nhẹ',
      'Kiểm tra thời tiết trước khi đi'
    ],
    coordinates: { lat: 21.3120, lng: 104.4120 },
    category: 'viewpoint'
  },
  'RỪNG NGUYÊN SINH': {
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
    coordinates: { lat: 21.3100, lng: 104.4100 },
    category: 'forest'
  },
  'SỐNG LƯNG KHỦNG LONG': {
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
    coordinates: { lat: 21.3080, lng: 104.4080 },
    category: 'mountain'
  },
  'THÁC HÁNG ĐỀ CHƠ': {
    name: 'Thác Háng Đề Chơ',
    description: 'Thác nước hùng vĩ ẩn mình trong rừng nguyên sinh Tà Xùa, với dòng nước trong vắt đổ từ độ cao lớn tạo nên âm thanh du dương giữa núi rừng.',
    shortDescription: 'Thác nước hùng vĩ ẩn mình trong rừng nguyên sinh',
    location: 'Rừng nguyên sinh Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Thác nước hùng vĩ với độ cao ấn tượng',
      'Dòng nước trong vắt giữa rừng nguyên sinh',
      'Âm thanh du dương của nước đổ tạo cảm giác thư giãn',
      'Không khí trong lành, mát mẻ quanh năm'
    ],
    bestTime: 'Tháng 5 - tháng 10 (mùa mưa) để thác có nhiều nước',
    difficulty: 'medium',
    duration: '3-4 giờ',
    tips: [
      'Mang giày chống trượt vì đường đi ẩm ướt',
      'Chuẩn bị áo mưa và túi chống nước cho đồ đạc',
      'Không tắm dưới thác vì dòng nước mạnh',
      'Mang theo đồ ăn và nước uống đầy đủ'
    ],
    coordinates: { lat: 21.3060, lng: 104.4060 },
    category: 'forest'
  },
  'ĐỈNH GIÓ TÀ XÙA': {
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
    coordinates: { lat: 21.3200, lng: 104.4200 },
    category: 'viewpoint'
  },
  'ĐỒI CHÈ SHAN TUYẾT TÀ XÙA': {
    name: 'Đồi Chè Shan Tuyết Tà Xùa',
    description: 'Những đồi chè Shan Tuyết cổ thụ trải dài trên sườn núi, với những cây chè hàng trăm năm tuổi tạo nên cảnh quan độc đáo và thơ mộng.',
    shortDescription: 'Đồi chè Shan Tuyết cổ thụ với cảnh quan thơ mộng',
    location: 'Các sườn núi cao xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La',
    highlights: [
      'Cây chè Shan Tuyết cổ thụ hàng trăm năm tuổi',
      'Cảnh quan đồi chè xanh mướt trải dài',
      'Trải nghiệm hái chè và pha trà truyền thống',
      'Tìm hiểu văn hóa trà của người Mông'
    ],
    bestTime: 'Tháng 3 - tháng 5 và tháng 9 - tháng 11 (mùa hái chè)',
    difficulty: 'easy',
    duration: '2-3 giờ',
    tips: [
      'Tham gia hoạt động hái chè cùng người dân địa phương',
      'Thưởng thức trà Shan Tuyết tươi ngon',
      'Tìm hiểu quy trình chế biến trà truyền thống',
      'Mua trà Shan Tuyết làm quà lưu niệm'
    ],
    coordinates: { lat: 21.3140, lng: 104.4140 },
    category: 'cultural'
  }
};

// Hàm chuẩn hóa tên thư mục thành ID
function normalizeLocationId(locationName) {
  return locationName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// Hàm chuẩn hóa tên để so khớp với mapping
function normalizeLocationName(locationName) {
  return locationName.normalize('NFC').trim();
}

// Hàm tạo danh sách ảnh từ thư mục
function getImageList(locationId) {
  const locationDir = path.join(ATTRACTIONS_DIR, locationId);
  if (!fs.existsSync(locationDir)) {
    return [];
  }
  
  const files = fs.readdirSync(locationDir);
  return files
    .filter(file => file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg'))
    .sort()
    .map(file => `/Attractions/${locationId}/${file}`);
}

// Hàm tạo dữ liệu attraction
function createAttractionData(locationName, locationId) {
  const normalizedName = normalizeLocationName(locationName);
  const info = LOCATION_INFO[normalizedName];
  if (!info) {
    console.warn(`⚠️  Không tìm thấy thông tin cho địa điểm: "${locationName}" (normalized: "${normalizedName}")`);
    return null;
  }
  
  const images = getImageList(locationId);
  
  return {
    id: locationId.replace(/_/g, '-'),
    name: info.name,
    description: info.description,
    shortDescription: info.shortDescription,
    location: info.location,
    highlights: info.highlights,
    bestTime: info.bestTime,
    difficulty: info.difficulty,
    duration: info.duration,
    tips: info.tips,
    images: images,
    coordinates: info.coordinates,
    category: info.category
  };
}

// Hàm tạo file TypeScript
function generateAttractionsDataFile(attractions) {
  const template = `export interface Attraction {
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

export const ATTRACTIONS_DATA: Attraction[] = ${JSON.stringify(attractions, null, 2)};

export const getAttractionById = (id: string): Attraction | undefined => {
  return ATTRACTIONS_DATA.find(attraction => attraction.id === id);
};

export const getAttractionsByCategory = (category: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.category === category);
};

export const getAttractionsByDifficulty = (difficulty: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.difficulty === difficulty);
};
`;
  
  return template;
}

// Main function
function main() {
  console.log('🚀 Bắt đầu cập nhật dữ liệu attractions...');
  
  // Đọc danh sách thư mục locations
  const locationDirs = fs.readdirSync(LOCATIONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !name.startsWith('.'));
  
  console.log(`📍 Tìm thấy ${locationDirs.length} địa điểm:`);
  locationDirs.forEach(dir => console.log(`   - ${dir}`));
  
  // Tạo dữ liệu attractions
  const attractions = [];
  let processedCount = 0;
  let skippedCount = 0;
  
  for (const locationName of locationDirs) {
    const locationId = normalizeLocationId(locationName);
    console.log(`\n🔄 Xử lý: ${locationName} -> ${locationId}`);
    
    const attractionData = createAttractionData(locationName, locationId);
    if (attractionData) {
      attractions.push(attractionData);
      console.log(`   ✅ Thành công: ${attractionData.images.length} ảnh`);
      processedCount++;
    } else {
      console.log(`   ❌ Bỏ qua: Không có thông tin`);
      skippedCount++;
    }
  }
  
  // Sắp xếp theo tên
  attractions.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  
  // Tạo file TypeScript
  const fileContent = generateAttractionsDataFile(attractions);
  
  // Backup file cũ
  if (fs.existsSync(ATTRACTIONS_DATA_FILE)) {
    const backupFile = ATTRACTIONS_DATA_FILE + '.backup.' + Date.now();
    fs.copyFileSync(ATTRACTIONS_DATA_FILE, backupFile);
    console.log(`\n💾 Đã backup file cũ: ${path.basename(backupFile)}`);
  }
  
  // Ghi file mới
  fs.writeFileSync(ATTRACTIONS_DATA_FILE, fileContent, 'utf8');
  
  // Tóm tắt kết quả
  console.log('\n📊 TỔNG KẾT:');
  console.log(`✅ Xử lý thành công: ${processedCount} địa điểm`);
  console.log(`❌ Bỏ qua: ${skippedCount} địa điểm`);
  console.log(`📄 File đã được cập nhật: ${path.basename(ATTRACTIONS_DATA_FILE)}`);
  console.log(`🖼️  Tổng số ảnh: ${attractions.reduce((sum, attr) => sum + attr.images.length, 0)}`);
  
  console.log('\n🎉 Hoàn thành cập nhật dữ liệu attractions!');
}

// Chạy script
if (require.main === module) {
  main();
}

module.exports = { main, normalizeLocationId, createAttractionData };