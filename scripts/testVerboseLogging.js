#!/usr/bin/env node

/**
 * Script test để kiểm tra verbose logging của syncHomestayToMongoDB.js
 * Chỉ test phần xử lý hình ảnh với logging chi tiết
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const ROOT_PATH = path.join(dirname(__dirname), 'public', 'Hotel:Homestay');

/**
 * Đọc tất cả file ảnh PNG từ thư mục accommodation image (với verbose logging)
 * @param {string} accommodationPath - Đường dẫn đến thư mục homestay
 * @param {string} folderName - Tên thư mục homestay
 * @returns {Promise<string[]>} - Mảng URL ảnh
 */
async function getImageUrlsWithLogging(accommodationPath, folderName) {
  const imagePath = path.join(accommodationPath, 'accomodation image');
  console.log("Đường dẫn thư mục ảnh được xây dựng:", imagePath);
  
  // Kiểm tra sự tồn tại của thư mục ảnh
  const imagePathExists = fs.existsSync(imagePath);
  console.log("Thư mục ảnh có tồn tại không?:", imagePathExists);
  
  if (!imagePathExists) {
    console.warn("⚠️  CẢNH BÁO: Thư mục ảnh không tồn tại, bỏ qua xử lý ảnh cho:", folderName);
    return [];
  }
  
  try {
    // Đọc nội dung thư mục ảnh
    const files = fs.readdirSync(imagePath);
    console.log("Các file tìm thấy (trước khi lọc):", files);
    
    // Lọc file .png (bao gồm cả .PNG)
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
    console.log("Các file .png tìm thấy (sau khi lọc):", pngFiles);
    
    // Tạo mảng image URLs
    const imageUrls = pngFiles.map(file => 
        `/Hotel:Homestay/${folderName}/accomodation image/${file}`
      );
    console.log("Mảng imageUrls cuối cùng được tạo ra:", imageUrls);
    
    return imageUrls;
  } catch (error) {
    console.error("LỖI: Không thể đọc thư mục ảnh:", error);
    throw new Error(`Không thể đọc thư mục ảnh: ${error.message}`);
  }
}

/**
 * Test verbose logging với một vài homestay
 */
async function testVerboseLogging() {
  console.log('🧪 BẮT ĐẦU TEST VERBOSE LOGGING\n');
  
  try {
    // Đọc danh sách thư mục homestay
    const folders = fs.readdirSync(ROOT_PATH);
    const homestayFolders = folders.filter(folder => {
      const folderPath = path.join(ROOT_PATH, folder);
      return fs.statSync(folderPath).isDirectory();
    });
    
    console.log(`📊 Tìm thấy ${homestayFolders.length} thư mục homestay\n`);
    
    // Test với 3 thư mục đầu tiên
    const testFolders = homestayFolders.slice(0, 3);
    
    for (const folderName of testFolders) {
      console.log("--- Đang xử lý thư mục:", folderName, "---");
      
      const accommodationPath = path.join(ROOT_PATH, folderName);
      
      try {
        const imageUrls = await getImageUrlsWithLogging(accommodationPath, folderName);
        console.log(`✅ Thành công! Tìm thấy ${imageUrls.length} ảnh cho ${folderName}`);
        console.log("Chuẩn bị cập nhật database với mảng imageUrls:", imageUrls);
      } catch (error) {
        console.error(`❌ Lỗi xử lý ${folderName}:`, error.message);
      }
      
      console.log(''); // Dòng trống
    }
    
  } catch (error) {
    console.error('💥 Lỗi nghiêm trọng:', error.message);
  }
  
  console.log('🎉 Test verbose logging hoàn thành!');
}

// Chạy test
testVerboseLogging();