const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Đường dẫn
const LOCATIONS_DIR = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Locations';
const ATTRACTIONS_DIR = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Attractions';
const UPDATE_SCRIPT = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/update_attractions_data.cjs';
const OPTIMIZE_SCRIPT = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/optimize_attractions_images.sh';

// File để lưu trạng thái
const STATE_FILE = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/.attractions_state.json';

// Hàm đọc trạng thái
function readState() {
  if (fs.existsSync(STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (error) {
      console.warn('⚠️  Không thể đọc file trạng thái, tạo mới');
    }
  }
  return { lastScan: 0, processedDirs: [] };
}

// Hàm ghi trạng thái
function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

// Hàm chuẩn hóa tên thư mục
function normalizeLocationName(locationName) {
  return locationName.normalize('NFC').trim();
}

// Hàm kiểm tra thư mục mới
function detectNewDirectories() {
  console.log('🔍 Đang quét thư mục Locations...');
  
  const currentDirs = fs.readdirSync(LOCATIONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => normalizeLocationName(dirent.name))
    .filter(name => !name.startsWith('.'));
  
  const state = readState();
  const newDirs = currentDirs.filter(dir => !state.processedDirs.includes(dir));
  
  return { currentDirs, newDirs, state };
}

// Hàm xử lý thư mục mới
function processNewDirectories(newDirs) {
  if (newDirs.length === 0) {
    console.log('✅ Không có thư mục mới nào cần xử lý');
    return false;
  }
  
  console.log(`🆕 Phát hiện ${newDirs.length} thư mục mới:`);
  newDirs.forEach(dir => console.log(`   - ${dir}`));
  
  // Chạy script tối ưu hóa ảnh
  console.log('\n🖼️  Đang tối ưu hóa ảnh...');
  try {
    execSync(`bash "${OPTIMIZE_SCRIPT}"`, { 
      stdio: 'inherit',
      cwd: path.dirname(OPTIMIZE_SCRIPT)
    });
    console.log('✅ Tối ưu hóa ảnh hoàn thành');
  } catch (error) {
    console.error('❌ Lỗi khi tối ưu hóa ảnh:', error.message);
    return false;
  }
  
  // Chạy script cập nhật dữ liệu
  console.log('\n📝 Đang cập nhật dữ liệu attractions...');
  try {
    execSync(`node "${UPDATE_SCRIPT}"`, { 
      stdio: 'inherit',
      cwd: path.dirname(UPDATE_SCRIPT)
    });
    console.log('✅ Cập nhật dữ liệu hoàn thành');
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật dữ liệu:', error.message);
    return false;
  }
  
  return true;
}

// Hàm tạo log chi tiết
function createProcessLog(currentDirs, newDirs, success) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    totalDirectories: currentDirs.length,
    newDirectories: newDirs.length,
    newDirectoryNames: newDirs,
    processSuccess: success,
    allDirectories: currentDirs
  };
  
  const logFile = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/attractions_auto_update.log';
  const logLine = `[${timestamp}] Processed: ${newDirs.length} new dirs, Total: ${currentDirs.length} dirs, Success: ${success}\n`;
  
  fs.appendFileSync(logFile, logLine, 'utf8');
  
  // Tạo file JSON log chi tiết
  const jsonLogFile = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/attractions_process_log.json';
  let logs = [];
  if (fs.existsSync(jsonLogFile)) {
    try {
      logs = JSON.parse(fs.readFileSync(jsonLogFile, 'utf8'));
    } catch (error) {
      logs = [];
    }
  }
  
  logs.push(logEntry);
  
  // Giữ chỉ 50 log gần nhất
  if (logs.length > 50) {
    logs = logs.slice(-50);
  }
  
  fs.writeFileSync(jsonLogFile, JSON.stringify(logs, null, 2), 'utf8');
  
  console.log(`📋 Log đã được ghi vào: ${path.basename(logFile)}`);
}

// Hàm chính
function main() {
  console.log('🚀 Bắt đầu quét tự động attractions...');
  console.log(`⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
  
  const { currentDirs, newDirs, state } = detectNewDirectories();
  
  console.log(`📊 Tổng số thư mục: ${currentDirs.length}`);
  console.log(`🆕 Thư mục mới: ${newDirs.length}`);
  
  const success = processNewDirectories(newDirs);
  
  // Cập nhật trạng thái
  if (success || newDirs.length === 0) {
    state.lastScan = Date.now();
    state.processedDirs = currentDirs;
    writeState(state);
    console.log('💾 Trạng thái đã được cập nhật');
  }
  
  // Tạo log
  createProcessLog(currentDirs, newDirs, success);
  
  if (success && newDirs.length > 0) {
    console.log('\n🎉 Hoàn thành xử lý thư mục mới!');
    console.log('💡 Khuyến nghị: Kiểm tra trang /attractions để xác nhận hiển thị');
  } else if (newDirs.length === 0) {
    console.log('\n✅ Hệ thống đã cập nhật, không có thay đổi mới');
  } else {
    console.log('\n❌ Có lỗi xảy ra trong quá trình xử lý');
    process.exit(1);
  }
}

// Hàm hiển thị trạng thái
function showStatus() {
  const state = readState();
  const { currentDirs } = detectNewDirectories();
  
  console.log('📊 TRẠNG THÁI HỆ THỐNG ATTRACTIONS:');
  console.log(`⏰ Lần quét cuối: ${state.lastScan ? new Date(state.lastScan).toLocaleString('vi-VN') : 'Chưa có'}`);
  console.log(`📁 Tổng số thư mục hiện tại: ${currentDirs.length}`);
  console.log(`✅ Thư mục đã xử lý: ${state.processedDirs.length}`);
  
  const newDirs = currentDirs.filter(dir => !state.processedDirs.includes(dir));
  if (newDirs.length > 0) {
    console.log(`🆕 Thư mục chưa xử lý: ${newDirs.length}`);
    newDirs.forEach(dir => console.log(`   - ${dir}`));
  } else {
    console.log('✅ Tất cả thư mục đã được xử lý');
  }
}

// Xử lý command line arguments
const command = process.argv[2];

switch (command) {
  case 'status':
    showStatus();
    break;
  case 'scan':
  default:
    main();
    break;
}

module.exports = { main, detectNewDirectories, processNewDirectories };