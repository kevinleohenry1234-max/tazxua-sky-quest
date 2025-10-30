#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping tên thư mục với tên homestay
const folderToHomestayMapping = {
  '1941M_Homestay_Ta_Xua': '1941M Homestay Tà Xùa',
  'Anh_Tai_May_Homestay': 'Anh Tài Mây Homestay',
  'Homestay_Coffee_Đinh_Nui_Ta_Xua': 'Homestay Coffee Đỉnh Núi Tà Xùa',
  'Mando_Homestay_Ta_Xua': 'Mando Homestay Tà Xùa',
  'May_Mo_Mang_Homestay_Ta_Xua': 'May Mơ Màng Homestay Tà Xùa',
  'Mayhome_Ta_Xua': 'Mayhome Tà Xùa',
  'Mua_Homestay_Ta_Xua': 'Mùa Homestay Tà Xùa',
  'Ngong_Ta_Xua_Homestay': 'Ngỗng Tà Xùa Homestay',
  'Ta_Xua_Cloud_Homestay': 'Tà Xùa Cloud Homestay',
  'Ta_Xua_Ecolodge': 'Tà Xùa Ecolodge',
  'Ta_Xua_HillsHomestay': 'Tà Xùa Hills Homestay',
  'Ta_Xua_May_Homestay': 'Tà Xùa Mây Homestay',
  'Tao_Homestay': 'Táo Homestay',
  'Tu_Mi': 'Tú Mỉ',
  'Xoe_Homestay': 'Xoè Homestay'
};

function getAllPngFiles(hotelsDir) {
  const result = {};
  
  // Đọc tất cả thư mục trong Hotels
  const homestayFolders = fs.readdirSync(hotelsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  homestayFolders.forEach(folderName => {
    const folderPath = path.join(hotelsDir, folderName);
    const accommodationImagePath = path.join(folderPath, 'accomodation image');
    
    if (fs.existsSync(accommodationImagePath)) {
      const pngFiles = fs.readdirSync(accommodationImagePath)
        .filter(file => file.toLowerCase().endsWith('.png'))
        .map(file => `/Hotels/${folderName}/accomodation image/${file}`);
      
      if (pngFiles.length > 0) {
        result[folderName] = pngFiles;
      }
    }
  });
  
  return result;
}

function updateHomestayData() {
  const hotelsDir = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Hotels';
  const homestayDataPath = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/src/data/homestayRealData.ts';
  
  // Lấy tất cả file PNG
  const pngFilesByFolder = getAllPngFiles(hotelsDir);
  
  console.log('Tìm thấy các file PNG:');
  Object.entries(pngFilesByFolder).forEach(([folder, files]) => {
    console.log(`${folder}: ${files.length} files`);
    files.forEach(file => console.log(`  - ${file}`));
  });
  
  // Đọc file homestayRealData.ts hiện tại
  let homestayDataContent = fs.readFileSync(homestayDataPath, 'utf8');
  
  // Tạo backup
  fs.writeFileSync(homestayDataPath + '.backup', homestayDataContent);
  
  // Cập nhật images cho từng homestay
  Object.entries(pngFilesByFolder).forEach(([folderName, pngFiles]) => {
    const homestayName = folderToHomestayMapping[folderName];
    if (!homestayName) {
      console.log(`Không tìm thấy mapping cho thư mục: ${folderName}`);
      return;
    }
    
    // Tìm và thay thế mảng images
    const namePattern = new RegExp(`"name":\\s*"${homestayName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const nameMatch = homestayDataContent.match(namePattern);
    
    if (nameMatch) {
      // Tìm vị trí của homestay này
      const nameIndex = homestayDataContent.indexOf(nameMatch[0]);
      const homestayStart = homestayDataContent.lastIndexOf('{', nameIndex);
      const homestayEnd = homestayDataContent.indexOf('},', homestayStart) + 1;
      
      if (homestayStart !== -1 && homestayEnd !== -1) {
        const homestaySection = homestayDataContent.substring(homestayStart, homestayEnd);
        
        // Thay thế mảng images
        const imagesArrayString = JSON.stringify(pngFiles, null, 6).replace(/^/gm, '    ');
        const updatedSection = homestaySection.replace(
          /"images":\s*\[[^\]]*\]/s,
          `"images": ${imagesArrayString}`
        );
        
        homestayDataContent = homestayDataContent.substring(0, homestayStart) + 
                             updatedSection + 
                             homestayDataContent.substring(homestayEnd);
        
        console.log(`✅ Cập nhật ${pngFiles.length} ảnh cho ${homestayName}`);
      }
    } else {
      console.log(`❌ Không tìm thấy homestay: ${homestayName}`);
    }
  });
  
  // Ghi file mới
  fs.writeFileSync(homestayDataPath, homestayDataContent);
  console.log('\n✅ Hoàn thành cập nhật homestayRealData.ts');
  console.log('📁 Backup được lưu tại: homestayRealData.ts.backup');
}

// Chạy script
updateHomestayData();