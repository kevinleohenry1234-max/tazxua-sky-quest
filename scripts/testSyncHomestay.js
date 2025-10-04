/**
 * Test script để kiểm tra logic đồng bộ homestay mà không cần MongoDB
 * Chạy: node scripts/testSyncHomestay.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ROOT_PATH = path.join(dirname(__dirname), 'public', 'Hotel:Homestay');

// Statistics tracking
const stats = {
  scanned: 0,
  created: 0,
  updated: 0,
  errors: []
};

/**
 * Tạo slug từ tên
 */
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Trích xuất URLs của ảnh từ thư mục
 */
async function extractImageUrls(folderName) {
  const imagePath = path.join(ROOT_PATH, folderName, 'accomodation image');
  
  try {
    const files = await fs.promises.readdir(imagePath);
    const imageFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
    
    return imageFiles.map(file => 
      `/Hotel:Homestay/${folderName}/accomodation image/${file}`
    );
  } catch (error) {
    throw new Error(`Không thể đọc thư mục ảnh: ${error.message}`);
  }
}

/**
 * Trích xuất mô tả từ file .md
 */
async function extractDescription(folderName) {
  const infoPath = path.join(ROOT_PATH, folderName, 'information');
  
  try {
    const files = await fs.promises.readdir(infoPath);
    const mdFile = files.find(file => file.toLowerCase().endsWith('.md'));
    
    if (!mdFile) {
      throw new Error('No .md file found');
    }
    
    const filePath = path.join(infoPath, mdFile);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    
    return content.trim();
  } catch (error) {
    throw new Error(`Không thể đọc file mô tả: ${error.message}`);
  }
}

/**
 * Xử lý một thư mục homestay
 */
async function processHomestayFolder(folderName) {
  const accommodationPath = path.join(ROOT_PATH, folderName);
  
  try {
    // Check if both required directories exist
    const imagePath = path.join(accommodationPath, 'accomodation image');
    const infoPath = path.join(accommodationPath, 'information');
    
    const imageExists = await fs.promises.access(imagePath).then(() => true).catch(() => false);
    const infoExists = await fs.promises.access(infoPath).then(() => true).catch(() => false);
    
    // Kiểm tra xem thư mục có tồn tại không
    const stat = await fs.promises.stat(accommodationPath);
    if (!stat.isDirectory()) {
      throw new Error('Không phải là thư mục');
    }
    
    if (!imageExists || !infoExists) {
      const missingDirs = [];
      if (!imageExists) missingDirs.push('accomodation image');
      if (!infoExists) missingDirs.push('information');
      
      throw new Error(`Thiếu thư mục: ${missingDirs.join(', ')}`);
    }
    
    // Trích xuất dữ liệu
    const name = folderName.replace(/_/g, ' ');
    const slug = createSlug(name);
    const imageUrls = await extractImageUrls(folderName);
    const description = await extractDescription(folderName);
    
    const homestayData = {
      name,
      slug,
      folderName,
      imageUrls,
      description: description.substring(0, 200) + '...', // Truncate for display
      updatedAt: new Date()
    };
    
    console.log(`✅ Xử lý thành công: ${folderName}`);
    console.log(`   - Tên: ${name}`);
    console.log(`   - Slug: ${slug}`);
    console.log(`   - Số ảnh: ${imageUrls.length}`);
    console.log(`   - Mô tả: ${description.length} ký tự`);
    console.log('');
    
    stats.created++; // Giả sử tất cả đều là tạo mới
    
    return homestayData;
    
  } catch (error) {
    console.log(`⚠️  Lỗi xử lý ${folderName}: ${error.message}`);
    stats.errors.push({
      folder: folderName,
      error: error.message
    });
    return null;
  }
}

/**
 * Quét và xử lý tất cả homestay
 */
async function scanHomestayData() {
  console.log('🔍 Bắt đầu quét thư mục homestay...');
  console.log(`📁 Đường dẫn: ${ROOT_PATH}`);
  console.log('');
  
  try {
    const folders = await fs.promises.readdir(ROOT_PATH);
    console.log(`📂 Tìm thấy ${folders.length} thư mục`);
    console.log('');
    
    const results = [];
    
    for (const folder of folders) {
      const folderPath = path.join(ROOT_PATH, folder);
      const stat = await fs.promises.stat(folderPath);
      
      if (stat.isDirectory()) {
        stats.scanned++;
        const result = await processHomestayFolder(folder);
        if (result) {
          results.push(result);
        }
      }
    }
    
    return results;
    
  } catch (error) {
    console.error(`💥 Lỗi quét thư mục: ${error.message}`);
    throw error;
  }
}

/**
 * In báo cáo tổng kết
 */
function printSummary() {
  console.log('📊 BÁO CÁO TỔNG KẾT');
  console.log('='.repeat(50));
  console.log(`📁 Tổng số thư mục đã quét: ${stats.scanned}`);
  console.log(`✅ Số lượng xử lý thành công: ${stats.created}`);
  console.log(`❌ Số lượng lỗi: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('');
    console.log('🚨 DANH SÁCH LỖI:');
    stats.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.folder}: ${error.error}`);
    });
  }
  
  console.log('='.repeat(50));
}

/**
 * Main function
 */
async function main() {
  console.log('🧪 TEST SCRIPT - ĐỒNG BỘ HOMESTAY DATA');
  console.log('='.repeat(50));
  
  try {
    // Kiểm tra thư mục tồn tại
    await fs.promises.access(ROOT_PATH);
    
    // Quét và xử lý dữ liệu
    const results = await scanHomestayData();
    
    // In báo cáo
    printSummary();
    
    console.log('');
    console.log('🎉 Test hoàn thành!');
    
  } catch (error) {
    console.error('💥 Lỗi nghiêm trọng:', error.message);
    process.exit(1);
  }
}

// Chạy test
main().catch(error => {
  console.error('💥 Lỗi không xử lý được:', error);
  process.exit(1);
});