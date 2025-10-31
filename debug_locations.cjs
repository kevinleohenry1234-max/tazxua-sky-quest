const fs = require('fs');
const path = require('path');

const LOCATIONS_DIR = '/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Locations';

console.log('🔍 Debug tên thư mục locations:');

const locationDirs = fs.readdirSync(LOCATIONS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => !name.startsWith('.'));

locationDirs.forEach((name, index) => {
  console.log(`${index + 1}. "${name}"`);
  console.log(`   Length: ${name.length}`);
  console.log(`   Normalized: "${name.normalize('NFC').trim()}"`);
  console.log(`   Hex: ${Buffer.from(name, 'utf8').toString('hex')}`);
  console.log('');
});

// Tạo mapping object
console.log('📝 Mapping object:');
console.log('const LOCATION_MAPPING = {');
locationDirs.forEach(name => {
  const normalized = name.normalize('NFC').trim();
  console.log(`  '${normalized}': '${normalized}',`);
});
console.log('};');