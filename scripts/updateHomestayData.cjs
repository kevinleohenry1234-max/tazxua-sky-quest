const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục cơ sở lưu trú
const accommodationDir = 'public/cơ sở lưu trú';

// Hàm đọc file Markdown và trích xuất thông tin
function parseMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Trích xuất tên homestay - tìm tên trong dòng có số thứ tự hoặc tên trong **
    let name = '';
    
    console.log(`Đang xử lý file: ${filePath}`);
    
    // Tìm tên trong dòng có số thứ tự (ví dụ: **1. 1941M Homestay Tà Xùa**)
    // Sử dụng regex linh hoạt hơn để bắt được cả dấu \ trước số
    const nameMatches = content.match(/\*\*\\?\d+\\\?\.\s*(.*?)\*\*/);
    if (nameMatches) {
      name = nameMatches[1].trim();
      console.log(`Tìm thấy tên từ pattern số thứ tự: "${name}"`);
    } else {
      console.log(`Không tìm thấy pattern số thứ tự, tìm pattern khác...`);
      // Tìm tên trong dòng đầu tiên có ** 
      const lines = content.split('\n');
      for (let line of lines) {
        line = line.trim();
        // Tìm dòng có ** ở đầu và cuối, có thể có khoảng trắng hoặc ký tự khác ở cuối
        const match = line.match(/^\*\*(.*?)\*\*(.*)$/);
        if (match) {
          const potentialName = match[1].trim();
          console.log(`Đang kiểm tra tên tiềm năng: "${potentialName}" từ dòng: "${line}"`);
          
          // Loại bỏ các dòng không phải tên homestay
          if (!potentialName.includes('THÔNG TIN CHI TIẾT') && 
              !potentialName.includes('Giá từ') &&
              !potentialName.includes('đ/') &&
              !potentialName.includes('Combo & giá') &&
              !potentialName.includes('Liên hệ') &&
              !potentialName.includes('Vị trí') &&
              !potentialName.includes('Không gian') &&
              !potentialName.includes('Trải nghiệm') &&
              !potentialName.match(/^\d+\\\?\.\s/) && // Loại bỏ pattern số thứ tự có dấu \
              potentialName.length > 0 &&
              potentialName.length < 100) { // Tên homestay không quá dài
            name = potentialName;
            console.log(`Đã tìm thấy tên homestay: "${name}"`);
            break;
          }
        }
      }
    }
    
    // Nếu tên có chứa dấu \ và số thứ tự, loại bỏ phần đó
    if (name.match(/^\d+\\\?\.\s/)) {
      name = name.replace(/^\d+\\\?\.\s*/, '').trim();
      console.log(`Đã làm sạch tên homestay: "${name}"`);
    }
    
    // Trích xuất giá
    const priceMatch = content.match(/Giá từ:\s*\*\*(.*?)\*\*/);
    const price = priceMatch ? priceMatch[1].trim() : '';
    
    // Trích xuất số điện thoại
    const phoneMatch = content.match(/Sđt:\s*(\d+)/);
    const phone = phoneMatch ? phoneMatch[1] : '';
    
    // Trích xuất đánh giá
    const ratingMatch = content.match(/Đánh giá:\s*([\d,\.]+)\/10/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 0;
    
    // Trích xuất tiện nghi
    const amenitiesSection = content.match(/Tiện nghi:(.*?)(?=- Điểm nổi bật:|$)/s);
    const amenities = [];
    if (amenitiesSection) {
      const amenityMatches = amenitiesSection[1].match(/\+ ([^\n]+)/g);
      if (amenityMatches) {
        amenityMatches.forEach(match => {
          amenities.push(match.replace('+ ', '').trim());
        });
      }
    }
    
    // Trích xuất điểm nổi bật
    const featuresSection = content.match(/Điểm nổi bật:(.*?)(?=- Đánh giá:|$)/s);
    const features = [];
    if (featuresSection) {
      const featureMatches = featuresSection[1].match(/\+ ([^\n]+)/g);
      if (featureMatches) {
        featureMatches.forEach(match => {
          features.push(match.replace('+ ', '').trim());
        });
      }
    }
    
    return {
      name,
      price,
      phone,
      rating,
      amenities,
      features,
      description: content.substring(0, 200) + '...' // Mô tả ngắn
    };
  } catch (error) {
    console.error(`Lỗi đọc file ${filePath}:`, error.message);
    return null;
  }
}

// Hàm lấy danh sách hình ảnh (PNG, JPG, JPEG, WEBP)
function getImageList(imageDir) {
  try {
    const files = fs.readdirSync(imageDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .sort() // Sắp xếp theo tên file
      .map(file => {
        const folderName = path.basename(path.dirname(imageDir));
        // Kiểm tra tên thư mục HÌNH ẢNH có khoảng trắng cuối không
        const imageFolderName = path.basename(imageDir);
        return `/cơ%20sở%20lưu%20trú/${encodeURIComponent(folderName)}/${encodeURIComponent(imageFolderName)}/${encodeURIComponent(file)}`;
      });
    
    console.log(`Tìm thấy ${imageFiles.length} hình ảnh trong ${imageDir}`);
    return imageFiles;
  } catch (error) {
    console.error(`Lỗi đọc thư mục hình ảnh ${imageDir}:`, error.message);
    return [];
  }
}

// Hàm chính để xử lý tất cả homestay
function processAllHomestays() {
  const homestayData = [];
  
  try {
    const folders = fs.readdirSync(accommodationDir);
    console.log(`Tìm thấy ${folders.length} items trong thư mục`);
    
    folders.forEach((folder, index) => {
      // Bỏ qua file .DS_Store và chỉ xử lý thư mục
      if (folder.startsWith('.') || !fs.statSync(path.join(accommodationDir, folder)).isDirectory()) {
        console.log(`Bỏ qua: ${folder}`);
        return;
      }
      
      console.log(`Xử lý thư mục ${index + 1}: ${folder}`);
      
      const folderPath = path.join(accommodationDir, folder);
      const detailDir = path.join(folderPath, 'Thông tin chi tiết');
      const imageDir = path.join(folderPath, 'HÌNH ẢNH');
      
      // Kiểm tra với tên có khoảng trắng ở cuối
      const imageDirWithSpace = path.join(folderPath, 'HÌNH ẢNH ');
      const finalImageDir = fs.existsSync(imageDir) ? imageDir : imageDirWithSpace;
      
      if (fs.existsSync(detailDir) && fs.existsSync(finalImageDir)) {
        // Tìm file markdown
        const detailFiles = fs.readdirSync(detailDir);
        const markdownFile = detailFiles.find(file => file.endsWith('.md'));
        
        if (markdownFile) {
          console.log(`Tìm thấy file markdown: ${markdownFile}`);
          const markdownPath = path.join(detailDir, markdownFile);
          const homestayInfo = parseMarkdownFile(markdownPath);
          
          if (homestayInfo) {
            const images = getImageList(finalImageDir);
            console.log(`Tìm thấy ${images.length} hình ảnh`);
            
            homestayData.push({
              id: (homestayData.length + 1).toString(),
              name: homestayInfo.name,
              description: `${homestayInfo.name} - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.`,
              location: 'Tà Xùa, Sơn La',
              rating: homestayInfo.rating,
              price: homestayInfo.price,
              images: images,
              amenities: homestayInfo.amenities,
              contact: {
                phone: homestayInfo.phone || undefined
              },
              features: homestayInfo.features,
              folder: folder
            });
            console.log(`Đã thêm homestay: ${homestayInfo.name}`);
          } else {
            console.log(`Không thể parse thông tin từ ${markdownFile}`);
          }
        } else {
          console.log(`Không tìm thấy file markdown trong ${detailDir}`);
        }
      } else {
        console.log(`Thiếu thư mục con trong ${folder}`);
      }
    });
    
    return homestayData;
  } catch (error) {
    console.error('Lỗi xử lý dữ liệu homestay:', error.message);
    return [];
  }
}

// Chạy script và xuất kết quả
const homestayData = processAllHomestays();
console.log('Dữ liệu homestay đã được xử lý:');
console.log(JSON.stringify(homestayData, null, 2));

// Ghi vào file TypeScript
const tsContent = `export interface HomestayReal {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: string;
  images: string[];
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
  folder: string;
}

export const homestayRealData: HomestayReal[] = ${JSON.stringify(homestayData, null, 2)};
`;

fs.writeFileSync('src/data/homestayRealData.ts', tsContent, 'utf8');
console.log('Đã cập nhật file homestayRealData.ts');