#!/usr/bin/env node

/**
 * Script đồng bộ dữ liệu homestay từ thư mục local vào MongoDB Staging
 * 
 * Chức năng:
 * - Quét tất cả thư mục homestay trong public/Hotel:Homestay
 * - Đọc thông tin ảnh và mô tả từ mỗi thư mục
 * - Upsert dữ liệu vào MongoDB collection 'accommodations'
 * - Xử lý lỗi và báo cáo kết quả
 */

import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const STAGING_MONGO_URI = process.env.STAGING_MONGO_URI || 'mongodb://localhost:27017/taxua_staging';
const DB_NAME = 'taxua_staging';
const COLLECTION_NAME = 'accommodations';

// Paths
const ROOT_PATH = path.join(dirname(__dirname), 'public', 'Hotel:Homestay');

// Statistics tracking
const stats = {
  totalScanned: 0,
  created: 0,
  updated: 0,
  errors: []
};

/**
 * Tạo slug từ tên homestay
 * @param {string} name - Tên homestay
 * @returns {string} - Slug URL-friendly
 */
function createSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/[\s_-]+/g, '-') // Thay thế khoảng trắng và _ bằng -
    .replace(/^-+|-+$/g, ''); // Loại bỏ - ở đầu và cuối
}

/**
 * Đọc tất cả file ảnh PNG từ thư mục accommodation image
 * @param {string} accommodationPath - Đường dẫn đến thư mục homestay
 * @param {string} folderName - Tên thư mục homestay
 * @returns {Promise<string[]>} - Mảng URL ảnh
 */
async function getImageUrls(accommodationPath, folderName) {
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
 * Đọc nội dung file markdown từ thư mục information
 * @param {string} accommodationPath - Đường dẫn đến thư mục homestay
 * @returns {Promise<string>} - Nội dung mô tả
 */
async function getDescription(accommodationPath) {
  const infoPath = path.join(accommodationPath, 'information');
  
  try {
    const files = await fs.promises.readdir(infoPath);
    const mdFile = files.find(file => file.toLowerCase().endsWith('.md'));
    
    if (!mdFile) {
      throw new Error('Không tìm thấy file .md trong thư mục information');
    }
    
    const filePath = path.join(infoPath, mdFile);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    
    return content.trim();
  } catch (error) {
    throw new Error(`Không thể đọc file mô tả: ${error.message}`);
  }
}

/**
 * Xử lý dữ liệu từ một thư mục homestay
 * @param {string} folderName - Tên thư mục homestay
 * @returns {Promise<Object|null>} - Dữ liệu homestay hoặc null nếu lỗi
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
    
    // Tạo tên và slug
    const name = folderName.replace(/_/g, ' ');
    const slug = createSlug(name);
    
    // Đọc ảnh và mô tả
    const imageUrls = await getImageUrls(accommodationPath, folderName);
    const description = await getDescription(accommodationPath);
    
    // Kiểm tra dữ liệu hợp lệ
    if (imageUrls.length === 0) {
      throw new Error('Không tìm thấy file ảnh PNG nào');
    }
    
    if (!description) {
      throw new Error('Nội dung mô tả trống');
    }
    
    return {
      name,
      slug,
      folderName,
      imageUrls,
      description,
      updatedAt: new Date()
    };
    
  } catch (error) {
    stats.errors.push({
      folder: folderName,
      error: error.message
    });
    console.warn(`⚠️  Lỗi xử lý thư mục "${folderName}": ${error.message}`);
    return null;
  }
}

/**
 * Upsert dữ liệu vào MongoDB
 * @param {Object} collection - MongoDB collection
 * @param {Object} homestayData - Dữ liệu homestay
 * @returns {Promise<boolean>} - true nếu tạo mới, false nếu cập nhật
 */
async function upsertHomestay(collection, homestayData) {
  const filter = { folderName: homestayData.folderName };
  
  const result = await collection.replaceOne(
    filter,
    homestayData,
    { upsert: true }
  );
  
  return result.upsertedCount > 0; // true nếu tạo mới
}

/**
 * Hàm chính
 */
async function main() {
  console.log('🚀 Bắt đầu đồng bộ dữ liệu homestay...\n');
  
  let client;
  
  try {
    // Kết nối MongoDB
    console.log('📡 Đang kết nối MongoDB...');
    client = new MongoClient(STAGING_MONGO_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    console.log('✅ Kết nối MongoDB thành công\n');
    
    // Đọc tất cả thư mục homestay
    console.log('📂 Đang quét thư mục homestay...');
    const folders = await fs.promises.readdir(ROOT_PATH);
    const homestayFolders = [];
    
    // Lọc chỉ lấy thư mục
    for (const folder of folders) {
      const folderPath = path.join(ROOT_PATH, folder);
      const stat = await fs.promises.stat(folderPath);
      if (stat.isDirectory()) {
        homestayFolders.push(folder);
      }
    }
    
    console.log(`📊 Tìm thấy ${homestayFolders.length} thư mục homestay\n`);
    
    // Xử lý từng thư mục
    for (const folderName of homestayFolders) {
      console.log("--- Đang xử lý thư mục:", folderName, "---");
      stats.totalScanned++;
      console.log(`🏠 Đang xử lý: ${folderName}`);
      
      const homestayData = await processHomestayFolder(folderName);
      
      if (homestayData) {
        try {
          console.log("Chuẩn bị cập nhật database với mảng imageUrls:", homestayData.imageUrls);
          const isNew = await upsertHomestay(collection, homestayData);
          
          if (isNew) {
            stats.created++;
            console.log(`   ✅ Tạo mới thành công`);
          } else {
            stats.updated++;
            console.log(`   🔄 Cập nhật thành công`);
          }
        } catch (dbError) {
          stats.errors.push({
            folder: folderName,
            error: `Lỗi database: ${dbError.message}`
          });
          console.error(`   ❌ Lỗi lưu database: ${dbError.message}`);
        }
      }
      
      console.log(''); // Dòng trống
    }
    
  } catch (error) {
    console.error('💥 Lỗi nghiêm trọng:', error.message);
    process.exit(1);
  } finally {
    // Đóng kết nối
    if (client) {
      await client.close();
      console.log('🔌 Đã đóng kết nối MongoDB');
    }
  }
  
  // In báo cáo tổng kết
  console.log('\n' + '='.repeat(50));
  console.log('📋 BÁO CÁO TỔNG KẾT');
  console.log('='.repeat(50));
  console.log(`📊 Tổng số homestay đã quét: ${stats.totalScanned}`);
  console.log(`🆕 Số lượng tạo mới: ${stats.created}`);
  console.log(`🔄 Số lượng cập nhật: ${stats.updated}`);
  console.log(`❌ Số lượng lỗi: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\n🚨 DANH SÁCH LỖI:');
    stats.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.folder}: ${error.error}`);
    });
  }
  
  console.log('\n✨ Hoàn thành đồng bộ dữ liệu!');
}

// Main execution - ES modules way
main().catch(error => {
  console.error('💥 Lỗi không xử lý được:', error);
  process.exit(1);
});

export {
  main,
  createSlug,
  getImageUrls,
  getDescription,
  processHomestayFolder,
  upsertHomestay
};