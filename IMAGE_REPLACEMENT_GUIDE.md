# HƯỚNG DẪN THAY THẾ ẢNH KHÔNG ĐẠT CHUẨN

## Danh sách ảnh cần thay thế ưu tiên cao

### 1. Hero Section Images (Cần thay thế ngay lập tức)

#### `/public/images/skyquest/herosection.png`
- **Vấn đề**: Độ phân giải 1024x1024 (không đạt chuẩn 1920x1080)
- **Yêu cầu mới**: 1920x1080, dưới 2MB, định dạng WebP hoặc PNG
- **Sử dụng tại**: SkyQuest hero section
- **Tỷ lệ khung hình**: 16:9 (landscape)

#### `/public/images/service/` (Các ảnh hero services)
- **Vấn đề**: Hầu hết có độ phân giải 1024x1024
- **Yêu cầu mới**: 1920x1080, dưới 2MB
- **Danh sách cần thay thế**:
  - `CUISINE.png` (1024x1024 → 1920x1080)
  - `MUSIC.png` (1024x1024 → 1920x1080)
  - `AI.png` (1024x1024 → 1920x1080)
  - `GALLERY.png` (1024x1024 → 1920x1080)
  - `VIDEOS.png` (1024x1024 → 1920x1080)

### 2. Activity Images (Cần thay thế toàn bộ)

#### `/public/images/explore/các hoạt động/`
- **Vấn đề**: Tất cả 9 ảnh đều 1024x1024
- **Yêu cầu mới**: 1920x1080, dưới 2MB, tỷ lệ 16:9
- **Danh sách**:
  - `1.png` → `activity-1-1920x1080.webp`
  - `2.png` → `activity-2-1920x1080.webp`
  - `3.png` → `activity-3-1920x1080.webp`
  - `4.png` → `activity-4-1920x1080.webp`
  - `5.png` → `activity-5-1920x1080.webp`
  - `6.png` → `activity-6-1920x1080.webp`
  - `7.png` → `activity-7-1920x1080.webp`
  - `8.png` → `activity-8-1920x1080.webp`
  - `9.png` → `activity-9-1920x1080.webp`

### 3. Viviet Collection Images (Tối ưu hóa dung lượng)

#### Ảnh dung lượng quá lớn cần nén:
- `taxua-trekking-adventure.jpg`: 6.4MB → <2MB
- `taxua-ancient-forest.jpg`: 3.5MB → <2MB  
- `taxua-sky-view.jpg`: 2.7MB → <2MB
- `taxua-panoramic-view.jpg`: 2.6MB → <2MB

#### Ảnh độ phân giải thấp cần nâng cấp:
- `taxua-hero-cinematic.jpg`: 900x600 → 1920x1080
- `taxua-misty-morning.jpg`: 825x600 → 1920x1080
- `taxua-mountain-range.jpg`: 1024x618 → 1920x1080
- `taxua-services-overview.jpg`: 1000x667 → 1920x1080

## Quy trình thay thế từng bước

### Bước 1: Chuẩn bị
```bash
# Tạo thư mục backup
mkdir -p /public/images/backup/$(date +%Y%m%d)

# Backup ảnh hiện tại
cp -r /public/images/* /public/images/backup/$(date +%Y%m%d)/
```

### Bước 2: Tạo ảnh mới theo chuẩn

#### Sử dụng ImageMagick (Command Line)
```bash
# Resize và optimize ảnh
magick input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 output.jpg

# Chuyển đổi sang WebP
magick input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 output.webp

# Kiểm tra kích thước file
ls -lh output.*
```

#### Sử dụng cwebp cho WebP
```bash
# Chuyển đổi sang WebP với chất lượng cao
cwebp -q 85 -resize 1920 1080 input.jpg -o output.webp

# Kiểm tra dung lượng
du -h output.webp
```

### Bước 3: Validation ảnh mới

#### Script kiểm tra chất lượng
```bash
#!/bin/bash
# validate_image.sh

IMAGE_PATH=$1
MIN_WIDTH=1920
MIN_HEIGHT=1080
MAX_SIZE=2097152  # 2MB in bytes

# Kiểm tra kích thước file
FILE_SIZE=$(stat -f%z "$IMAGE_PATH" 2>/dev/null || stat -c%s "$IMAGE_PATH" 2>/dev/null)
if [ $FILE_SIZE -gt $MAX_SIZE ]; then
    echo "❌ File quá lớn: $(($FILE_SIZE/1024/1024))MB > 2MB"
    exit 1
fi

# Kiểm tra độ phân giải
DIMENSIONS=$(identify -format "%wx%h" "$IMAGE_PATH" 2>/dev/null)
WIDTH=$(echo $DIMENSIONS | cut -d'x' -f1)
HEIGHT=$(echo $DIMENSIONS | cut -d'x' -f2)

if [ $WIDTH -lt $MIN_WIDTH ] || [ $HEIGHT -lt $MIN_HEIGHT ]; then
    echo "❌ Độ phân giải thấp: ${WIDTH}x${HEIGHT} < ${MIN_WIDTH}x${MIN_HEIGHT}"
    exit 1
fi

echo "✅ Ảnh đạt chuẩn: ${WIDTH}x${HEIGHT}, $(($FILE_SIZE/1024))KB"
```

### Bước 4: Thay thế ảnh trong hệ thống

#### Hero Section Images
```bash
# SkyQuest hero
cp new-skyquest-hero-1920x1080.webp /public/images/skyquest/herosection.png

# Service heroes
cp new-cuisine-hero-1920x1080.webp /public/images/service/CUISINE.png
cp new-music-hero-1920x1080.webp /public/images/service/MUSIC.png
cp new-ai-hero-1920x1080.webp /public/images/service/AI.png
cp new-gallery-hero-1920x1080.webp /public/images/service/GALLERY.png
cp new-videos-hero-1920x1080.webp /public/images/service/VIDEOS.png
```

#### Activity Images
```bash
# Thay thế activity images
for i in {1..9}; do
    cp "new-activity-${i}-1920x1080.webp" "/public/images/explore/các hoạt động/${i}.png"
done
```

### Bước 5: Cập nhật code nếu cần thiết

#### Kiểm tra các file sử dụng ảnh đã thay thế
```bash
# Tìm các file sử dụng ảnh cũ
grep -r "herosection.png" src/
grep -r "CUISINE.png" src/
grep -r "các hoạt động" src/
```

#### Cập nhật import paths nếu đổi tên file
```typescript
// Trước
import heroImage from '/images/skyquest/herosection.png';

// Sau (nếu đổi sang WebP)
import heroImage from '/images/skyquest/herosection.webp';
```

### Bước 6: Testing và Validation

#### Kiểm tra hiển thị trên các thiết bị
```bash
# Chạy dev server
npm run dev

# Kiểm tra các trang:
# - http://localhost:3000/skyquest (hero section)
# - http://localhost:3000/services (service heroes)
# - http://localhost:3000/explore (activity images)
```

#### Performance Testing
```bash
# Kiểm tra Lighthouse score
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json

# Kiểm tra Core Web Vitals
# - LCP (Largest Contentful Paint)
# - CLS (Cumulative Layout Shift)
# - FID (First Input Delay)
```

## Checklist hoàn thành

### Ảnh Hero Sections
- [ ] `/skyquest/herosection.png` → 1920x1080, <2MB
- [ ] `/service/CUISINE.png` → 1920x1080, <2MB
- [ ] `/service/MUSIC.png` → 1920x1080, <2MB
- [ ] `/service/AI.png` → 1920x1080, <2MB
- [ ] `/service/GALLERY.png` → 1920x1080, <2MB
- [ ] `/service/VIDEOS.png` → 1920x1080, <2MB

### Activity Images
- [ ] `/explore/các hoạt động/1.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/2.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/3.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/4.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/5.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/6.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/7.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/8.png` → 1920x1080, <2MB
- [ ] `/explore/các hoạt động/9.png` → 1920x1080, <2MB

### Viviet Collection
- [ ] Tối ưu hóa 4 ảnh dung lượng lớn
- [ ] Nâng cấp 4 ảnh độ phân giải thấp

### System Testing
- [ ] Kiểm tra hiển thị trên desktop
- [ ] Kiểm tra hiển thị trên mobile
- [ ] Kiểm tra hiển thị trên tablet
- [ ] Chạy Lighthouse performance test
- [ ] Kiểm tra Core Web Vitals
- [ ] Kiểm tra loading speed

## Công cụ hỗ trợ

### Online Tools
- **TinyPNG**: https://tinypng.com/ (nén PNG/JPEG)
- **Squoosh**: https://squoosh.app/ (tối ưu hóa và chuyển đổi format)
- **Canva**: https://canva.com/ (tạo ảnh mới nếu cần)

### Command Line Tools
```bash
# Cài đặt ImageMagick
brew install imagemagick

# Cài đặt WebP tools
brew install webp

# Cài đặt Lighthouse
npm install -g lighthouse
```

### Batch Processing Script
```bash
#!/bin/bash
# batch_optimize.sh

INPUT_DIR="./original_images"
OUTPUT_DIR="./optimized_images"
TARGET_WIDTH=1920
TARGET_HEIGHT=1080
QUALITY=85

mkdir -p "$OUTPUT_DIR"

for img in "$INPUT_DIR"/*.{jpg,jpeg,png}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        
        # Tạo WebP version
        magick "$img" -resize "${TARGET_WIDTH}x${TARGET_HEIGHT}^" \
               -gravity center -extent "${TARGET_WIDTH}x${TARGET_HEIGHT}" \
               -quality $QUALITY "$OUTPUT_DIR/${name}.webp"
        
        echo "✅ Processed: $filename → ${name}.webp"
    fi
done
```

## Lưu ý quan trọng

1. **Backup trước khi thay thế**: Luôn tạo backup đầy đủ
2. **Kiểm tra responsive**: Đảm bảo ảnh hiển thị tốt trên mọi thiết bị
3. **Tối ưu hóa loading**: Sử dụng lazy loading cho ảnh không critical
4. **SEO friendly**: Đặt tên file có ý nghĩa, thêm alt text
5. **Performance monitoring**: Theo dõi Core Web Vitals sau khi thay thế

**Thời gian ước tính**: 1-2 ngày làm việc cho toàn bộ quy trình