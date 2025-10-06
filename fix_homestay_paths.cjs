const fs = require('fs');
const path = require('path');

// Đọc file homestayRealData.ts
const filePath = './src/data/homestayRealData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Mapping từ tên folder trong data sang tên thư mục thực tế
const folderMapping = {
  '1._1941M_Homestay_Tà_Xùa': '1941M_Homestay_Ta_Xua',
  '2._Mayhome_Tà_Xùa': 'Mayhome_Ta_Xua',
  '3._Tà_Xùa_Ecolodge': 'Ta_Xua_Ecolodge',
  '4._Xoè_Homestay': 'Xoe_Homestay',
  '5._Tà_Xùa_Cloud_Homestay': 'Ta_Xua_Cloud_Homestay',
  '6._Mùa_Homestay_Tà_Xùa': 'Mua_Homestay_Ta_Xua',
  '7._Mando_Homestay_Tà_Xùa': 'Mando_Homestay_Ta_Xua',
  '8._Tà_Xùa_Mây_Homestay': 'Ta_Xua_May_Homestay',
  '9._Mây_Mơ_Màng_Homestay_Tà_Xùa': 'May_Mo_Mang_Homestay_Ta_Xua',
  '10._Tà_Xùa_HillsHomestay': 'Ta_Xua_HillsHomestay',
  '11._Táo_Homestay': 'Tao_Homestay',
  '12._Ngỗng_Tà_Xùa_Homestay': 'Ngong_Ta_Xua_Homestay',
  '13._Tú_Mỉ': 'Tu_Mi',
  '14._Homestay_Coffee_Đỉnh_Núi_Tà_Xùa': 'Homestay_Coffee_Đinh_Nui_Ta_Xua',
  '15._Anh_Tài_Mây_Homestay': 'Anh_Tai_May_Homestay'
};

console.log('🔧 Bắt đầu sửa đường dẫn ảnh homestay...');

// Thay thế đường dẫn cũ bằng đường dẫn mới
Object.entries(folderMapping).forEach(([oldFolder, newFolder]) => {
  // Pattern để tìm đường dẫn cũ
  const oldPattern = new RegExp(`/cơ%20sở%20lưu%20trú/${oldFolder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/H%C3%8CNH%20%E1%BA%A2NH%20/`, 'g');
  const newPath = `/Hotel:Homestay/${newFolder}/accomodation image/`;
  
  const matches = content.match(oldPattern);
  if (matches) {
    console.log(`✅ Tìm thấy ${matches.length} đường dẫn cho ${oldFolder}`);
    content = content.replace(oldPattern, newPath);
  }
});

// Xử lý các trường hợp đặc biệt với tên thư mục khác
const specialCases = [
  {
    old: '/cơ%20sở%20lưu%20trú/8._Ta%CC%80_Xu%CC%80a_Ma%CC%82y_Homestay/H%C3%8CNH%20%E1%BA%A2NH/',
    new: '/Hotel:Homestay/Ta_Xua_May_Homestay/accomodation image/'
  }
];

specialCases.forEach(({old, new: newPath}) => {
  if (content.includes(old)) {
    console.log(`✅ Xử lý trường hợp đặc biệt: ${old}`);
    content = content.replaceAll(old, newPath);
  }
});

// Ghi lại file
fs.writeFileSync(filePath, content);
console.log('✅ Hoàn thành sửa đường dẫn ảnh homestay!');
