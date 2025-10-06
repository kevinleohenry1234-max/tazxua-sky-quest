const fs = require('fs');
const path = require('path');

// Đọc file homestayRealData.ts
const homestayDataPath = path.join(__dirname, '../src/data/homestayRealData.ts');
const publicPath = path.join(__dirname, '../public/Hotel:Homestay');

// Mapping từ tên homestay trong data sang tên thư mục thực tế
const homestayMapping = {
  '1941M Homestay Ta Xua': '1941M_Homestay_Ta_Xua',
  'Anh Tai May Homestay': 'Anh_Tai_May_Homestay',
  'Homestay Coffee Đinh Nui Ta Xua': 'Homestay_Coffee_Đinh_Nui_Ta_Xua',
  'Mando Homestay Ta Xua': 'Mando_Homestay_Ta_Xua',
  'May Mo Mang Homestay Ta Xua': 'May_Mo_Mang_Homestay_Ta_Xua',
  'Mayhome Ta Xua': 'Mayhome_Ta_Xua',
  'Mua Homestay Ta Xua': 'Mua_Homestay_Ta_Xua',
  'Ngong Ta Xua Homestay': 'Ngong_Ta_Xua_Homestay',
  'Ta Xua Cloud Homestay': 'Ta_Xua_Cloud_Homestay',
  'Ta Xua Ecolodge': 'Ta_Xua_Ecolodge',
  'Ta Xua HillsHomestay': 'Ta_Xua_HillsHomestay',
  'Ta Xua May Homestay': 'Ta_Xua_May_Homestay',
  'Tao Homestay': 'Tao_Homestay',
  'Tu Mi': 'Tu_Mi',
  'Xoe Homestay': 'Xoe_Homestay'
};

function getActualImagePaths(homestayName) {
  const folderName = homestayMapping[homestayName];
  if (!folderName) {
    console.log(`Warning: No mapping found for homestay: ${homestayName}`);
    return [];
  }

  const imageFolderPath = path.join(publicPath, folderName, 'accomodation image');
  
  try {
    if (!fs.existsSync(imageFolderPath)) {
      console.log(`Warning: Image folder not found: ${imageFolderPath}`);
      return [];
    }

    const files = fs.readdirSync(imageFolderPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );

    return imageFiles.map(file => 
      `/Hotel:Homestay/${folderName}/accomodation image/${file}`
    );
  } catch (error) {
    console.error(`Error reading images for ${homestayName}:`, error);
    return [];
  }
}

function fixHomestayData() {
  try {
    let content = fs.readFileSync(homestayDataPath, 'utf8');
    
    // Backup original file
    fs.writeFileSync(homestayDataPath + '.backup', content);
    
    // Parse the content to extract homestay objects
    const homestayRegex = /{\s*id:\s*(\d+),\s*name:\s*["']([^"']+)["'],[\s\S]*?images:\s*\[([\s\S]*?)\]/g;
    
    let match;
    const updates = [];
    
    while ((match = homestayRegex.exec(content)) !== null) {
      const [fullMatch, id, name, imagesSection] = match;
      const actualImages = getActualImagePaths(name);
      
      if (actualImages.length > 0) {
        const newImagesSection = actualImages
          .map(img => `    "${img}"`)
          .join(',\n');
        
        updates.push({
          original: fullMatch,
          replacement: fullMatch.replace(
            /images:\s*\[([\s\S]*?)\]/,
            `images: [\n${newImagesSection}\n  ]`
          )
        });
        
        console.log(`Updated ${name}: ${actualImages.length} images found`);
      } else {
        console.log(`No images found for ${name}`);
      }
    }
    
    // Apply updates
    let updatedContent = content;
    updates.forEach(update => {
      updatedContent = updatedContent.replace(update.original, update.replacement);
    });
    
    // Write updated content
    fs.writeFileSync(homestayDataPath, updatedContent);
    
    console.log('✅ Homestay image paths have been fixed successfully!');
    console.log(`📁 Backup saved as: ${homestayDataPath}.backup`);
    
  } catch (error) {
    console.error('❌ Error fixing homestay data:', error);
  }
}

// Run the fix
fixHomestayData();