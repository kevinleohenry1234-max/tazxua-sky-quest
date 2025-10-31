const fs = require('fs');
const path = require('path');

// Mapping từ tên địa điểm đến folder tương ứng
const locationMapping = {
  'Bản Bẹ Tà Xùa': 'BẢN BẸ TÀ XÙA ',
  'Cây Cô Đơn': 'CÂY CÔ ĐƠN',
  'Cột Mốc Tà Xùa': 'CỘT MỐC TÀ XÙA ',
  'Đỉnh Gió Tà Xùa': 'ĐỈNH GIÓ TÀ XÙA ',
  'Mỏm Cá Heo': 'MỎM CÁ HEO ',
  'Mỏm Đầu Rùa': 'MỎM ĐẦU RÙA ',
  'Rừng Nguyên Sinh Tà Xùa': 'RỪNG NGUYÊN SINH ',
  'Sống Lưng Khủng Long': 'SỐNG LƯNG KHỦNG LONG ',
  'Thác Háng Đề Chơ': 'THÁC HÁNG ĐỀ CHƠ '
};

// Đường dẫn đến thư mục Locations
const locationsDir = path.join(__dirname, 'public', 'Locations');

// Hàm lấy danh sách file ảnh từ folder
function getImagesFromFolder(folderName) {
  const folderPath = path.join(locationsDir, folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder không tồn tại: ${folderPath}`);
    return [];
  }
  
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });
  
  // Tạo đường dẫn tương đối từ public
  const imagePaths = imageFiles.map(file => `/Locations/${folderName}/${file}`);
  
  console.log(`✅ ${folderName}: Tìm thấy ${imageFiles.length} ảnh`);
  imageFiles.forEach(file => console.log(`   - ${file}`));
  
  return imagePaths;
}

// Cập nhật dữ liệu attractions
function updateAttractionsData() {
  const attractionsFilePath = path.join(__dirname, 'src', 'data', 'attractionsData.ts');
  
  if (!fs.existsSync(attractionsFilePath)) {
    console.log('❌ File attractionsData.ts không tồn tại');
    return;
  }
  
  let content = fs.readFileSync(attractionsFilePath, 'utf8');
  
  // Tạo dữ liệu hình ảnh mới cho từng địa điểm
  const imageUpdates = {};
  
  Object.entries(locationMapping).forEach(([attractionName, folderName]) => {
    const images = getImagesFromFolder(folderName);
    imageUpdates[attractionName] = images;
  });
  
  // Cập nhật từng địa điểm trong file
  Object.entries(imageUpdates).forEach(([attractionName, images]) => {
    if (images.length > 0) {
      // Tìm pattern để thay thế images array
      const namePattern = new RegExp(`"name":\\s*"${attractionName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}"[\\s\\S]*?"images":\\s*\\[[\\s\\S]*?\\]`, 'g');
      
      const replacement = content.match(namePattern);
      if (replacement) {
        const newImagesArray = `"images": [
      ${images.map(img => `"${img}"`).join(',\n      ')}
    ]`;
        
        const updatedReplacement = replacement[0].replace(/"images":\s*\[[^\]]*\]/, newImagesArray);
        content = content.replace(replacement[0], updatedReplacement);
        
        console.log(`✅ Cập nhật ${images.length} ảnh cho "${attractionName}"`);
      } else {
        console.log(`⚠️  Không tìm thấy địa điểm "${attractionName}" trong file`);
      }
    }
  });
  
  // Ghi lại file
  fs.writeFileSync(attractionsFilePath, content, 'utf8');
  console.log('🎉 Hoàn thành cập nhật attractionsData.ts');
}

// Chạy script
console.log('🚀 Bắt đầu cập nhật hình ảnh attractions...\n');

// Kiểm tra thư mục Locations
if (!fs.existsSync(locationsDir)) {
  console.log('❌ Thư mục Locations không tồn tại');
  process.exit(1);
}

console.log('📁 Danh sách folder trong Locations:');
const folders = fs.readdirSync(locationsDir).filter(item => {
  return fs.statSync(path.join(locationsDir, item)).isDirectory();
});
folders.forEach(folder => console.log(`   - ${folder}`));

console.log('\n🔍 Kiểm tra hình ảnh trong từng folder:\n');

updateAttractionsData();