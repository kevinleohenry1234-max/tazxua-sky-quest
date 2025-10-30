#!/bin/bash

# IMAGE REPLACEMENT HELPER SCRIPT
# Hỗ trợ tự động hóa việc thay thế ảnh không đạt chuẩn

set -e

# Cấu hình
PROJECT_ROOT="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh"
IMAGES_DIR="$PROJECT_ROOT/public/images"
BACKUP_DIR="$PROJECT_ROOT/public/images/backup/$(date +%Y%m%d_%H%M%S)"
TARGET_WIDTH=1920
TARGET_HEIGHT=1080
MAX_FILE_SIZE=2097152  # 2MB
QUALITY=85

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Hàm hiển thị header
show_header() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "    IMAGE REPLACEMENT HELPER SCRIPT"
    echo "    Tự động hóa việc thay thế ảnh không đạt chuẩn"
    echo "=================================================="
    echo -e "${NC}"
}

# Hàm kiểm tra dependencies
check_dependencies() {
    echo -e "${YELLOW}Kiểm tra dependencies...${NC}"
    
    if ! command -v magick &> /dev/null; then
        echo -e "${RED}❌ ImageMagick chưa được cài đặt${NC}"
        echo "Cài đặt bằng: brew install imagemagick"
        exit 1
    fi
    
    if ! command -v cwebp &> /dev/null; then
        echo -e "${YELLOW}⚠️  WebP tools chưa được cài đặt (tùy chọn)${NC}"
        echo "Cài đặt bằng: brew install webp"
    fi
    
    echo -e "${GREEN}✅ Dependencies OK${NC}"
}

# Hàm tạo backup
create_backup() {
    echo -e "${YELLOW}Tạo backup...${NC}"
    mkdir -p "$BACKUP_DIR"
    
    # Backup các thư mục quan trọng
    cp -r "$IMAGES_DIR/skyquest" "$BACKUP_DIR/" 2>/dev/null || true
    cp -r "$IMAGES_DIR/service" "$BACKUP_DIR/" 2>/dev/null || true
    cp -r "$IMAGES_DIR/explore" "$BACKUP_DIR/" 2>/dev/null || true
    cp -r "$IMAGES_DIR/viviet" "$BACKUP_DIR/" 2>/dev/null || true
    
    echo -e "${GREEN}✅ Backup tạo tại: $BACKUP_DIR${NC}"
}

# Hàm validate ảnh
validate_image() {
    local image_path="$1"
    local min_width="$2"
    local min_height="$3"
    local max_size="$4"
    
    if [ ! -f "$image_path" ]; then
        echo -e "${RED}❌ File không tồn tại: $image_path${NC}"
        return 1
    fi
    
    # Kiểm tra kích thước file
    local file_size
    if [[ "$OSTYPE" == "darwin"* ]]; then
        file_size=$(stat -f%z "$image_path")
    else
        file_size=$(stat -c%s "$image_path")
    fi
    
    if [ "$file_size" -gt "$max_size" ]; then
        echo -e "${RED}❌ File quá lớn: $((file_size/1024/1024))MB > $((max_size/1024/1024))MB${NC}"
        return 1
    fi
    
    # Kiểm tra độ phân giải
    local dimensions
    dimensions=$(magick identify -format "%wx%h" "$image_path" 2>/dev/null)
    local width height
    width=$(echo "$dimensions" | cut -d'x' -f1)
    height=$(echo "$dimensions" | cut -d'x' -f2)
    
    if [ "$width" -lt "$min_width" ] || [ "$height" -lt "$min_height" ]; then
        echo -e "${RED}❌ Độ phân giải thấp: ${width}x${height} < ${min_width}x${min_height}${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ Ảnh đạt chuẩn: ${width}x${height}, $((file_size/1024))KB${NC}"
    return 0
}

# Hàm tối ưu hóa ảnh
optimize_image() {
    local input_path="$1"
    local output_path="$2"
    local target_width="$3"
    local target_height="$4"
    local quality="$5"
    
    echo -e "${YELLOW}Tối ưu hóa: $(basename "$input_path")${NC}"
    
    # Tạo thư mục output nếu chưa có
    mkdir -p "$(dirname "$output_path")"
    
    # Resize và optimize
    magick "$input_path" \
        -resize "${target_width}x${target_height}^" \
        -gravity center \
        -extent "${target_width}x${target_height}" \
        -quality "$quality" \
        "$output_path"
    
    # Validate ảnh đã tối ưu
    if validate_image "$output_path" "$target_width" "$target_height" "$MAX_FILE_SIZE"; then
        echo -e "${GREEN}✅ Tối ưu hóa thành công: $(basename "$output_path")${NC}"
        return 0
    else
        echo -e "${RED}❌ Tối ưu hóa thất bại: $(basename "$output_path")${NC}"
        return 1
    fi
}

# Hàm xử lý hero images
process_hero_images() {
    echo -e "${BLUE}=== XỬ LÝ HERO IMAGES ===${NC}"
    
    local hero_images=(
        "$IMAGES_DIR/skyquest/herosection.png"
        "$IMAGES_DIR/service/CUISINE.png"
        "$IMAGES_DIR/service/MUSIC.png"
        "$IMAGES_DIR/service/AI.png"
        "$IMAGES_DIR/service/GALLERY.png"
        "$IMAGES_DIR/service/VIDEOS.png"
    )
    
    for img in "${hero_images[@]}"; do
        if [ -f "$img" ]; then
            echo -e "${YELLOW}Kiểm tra: $(basename "$img")${NC}"
            
            if ! validate_image "$img" "$TARGET_WIDTH" "$TARGET_HEIGHT" "$MAX_FILE_SIZE"; then
                echo -e "${YELLOW}Cần tối ưu hóa: $(basename "$img")${NC}"
                
                # Tạo temporary optimized version
                local temp_file="${img}.optimized"
                if optimize_image "$img" "$temp_file" "$TARGET_WIDTH" "$TARGET_HEIGHT" "$QUALITY"; then
                    mv "$temp_file" "$img"
                    echo -e "${GREEN}✅ Đã thay thế: $(basename "$img")${NC}"
                else
                    rm -f "$temp_file"
                    echo -e "${RED}❌ Không thể tối ưu hóa: $(basename "$img")${NC}"
                fi
            fi
        else
            echo -e "${YELLOW}⚠️  File không tồn tại: $(basename "$img")${NC}"
        fi
    done
}

# Hàm xử lý activity images
process_activity_images() {
    echo -e "${BLUE}=== XỬ LÝ ACTIVITY IMAGES ===${NC}"
    
    local activity_dir="$IMAGES_DIR/explore/các hoạt động"
    
    if [ -d "$activity_dir" ]; then
        for i in {1..9}; do
            local img="$activity_dir/${i}.png"
            if [ -f "$img" ]; then
                echo -e "${YELLOW}Kiểm tra: $(basename "$img")${NC}"
                
                if ! validate_image "$img" "$TARGET_WIDTH" "$TARGET_HEIGHT" "$MAX_FILE_SIZE"; then
                    echo -e "${YELLOW}Cần tối ưu hóa: $(basename "$img")${NC}"
                    
                    # Tạo temporary optimized version
                    local temp_file="${img}.optimized"
                    if optimize_image "$img" "$temp_file" "$TARGET_WIDTH" "$TARGET_HEIGHT" "$QUALITY"; then
                        mv "$temp_file" "$img"
                        echo -e "${GREEN}✅ Đã thay thế: $(basename "$img")${NC}"
                    else
                        rm -f "$temp_file"
                        echo -e "${RED}❌ Không thể tối ưu hóa: $(basename "$img")${NC}"
                    fi
                fi
            else
                echo -e "${YELLOW}⚠️  File không tồn tại: $(basename "$img")${NC}"
            fi
        done
    else
        echo -e "${RED}❌ Thư mục không tồn tại: $activity_dir${NC}"
    fi
}

# Hàm xử lý viviet images
process_viviet_images() {
    echo -e "${BLUE}=== XỬ LÝ VIVIET IMAGES ===${NC}"
    
    local viviet_dir="$IMAGES_DIR/viviet"
    local large_images=(
        "taxua-trekking-adventure.jpg"
        "taxua-ancient-forest.jpg"
        "taxua-sky-view.jpg"
        "taxua-panoramic-view.jpg"
    )
    
    local low_res_images=(
        "taxua-hero-cinematic.jpg"
        "taxua-misty-morning.jpg"
        "taxua-mountain-range.jpg"
        "taxua-services-overview.jpg"
    )
    
    # Xử lý ảnh dung lượng lớn
    echo -e "${YELLOW}Xử lý ảnh dung lượng lớn...${NC}"
    for img_name in "${large_images[@]}"; do
        local img="$viviet_dir/$img_name"
        if [ -f "$img" ]; then
            echo -e "${YELLOW}Kiểm tra: $img_name${NC}"
            
            # Kiểm tra chỉ kích thước file (giữ nguyên độ phân giải cao)
            local file_size
            if [[ "$OSTYPE" == "darwin"* ]]; then
                file_size=$(stat -f%z "$img")
            else
                file_size=$(stat -c%s "$img")
            fi
            
            if [ "$file_size" -gt "$MAX_FILE_SIZE" ]; then
                echo -e "${YELLOW}Nén ảnh: $img_name ($(($file_size/1024/1024))MB)${NC}"
                
                local temp_file="${img}.compressed"
                magick "$img" -quality 80 "$temp_file"
                
                local new_size
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    new_size=$(stat -f%z "$temp_file")
                else
                    new_size=$(stat -c%s "$temp_file")
                fi
                
                if [ "$new_size" -le "$MAX_FILE_SIZE" ]; then
                    mv "$temp_file" "$img"
                    echo -e "${GREEN}✅ Đã nén: $img_name ($(($new_size/1024/1024))MB)${NC}"
                else
                    rm -f "$temp_file"
                    echo -e "${RED}❌ Không thể nén đủ: $img_name${NC}"
                fi
            fi
        fi
    done
    
    # Xử lý ảnh độ phân giải thấp
    echo -e "${YELLOW}Xử lý ảnh độ phân giải thấp...${NC}"
    for img_name in "${low_res_images[@]}"; do
        local img="$viviet_dir/$img_name"
        if [ -f "$img" ]; then
            echo -e "${YELLOW}Kiểm tra: $img_name${NC}"
            
            if ! validate_image "$img" "$TARGET_WIDTH" "$TARGET_HEIGHT" "$MAX_FILE_SIZE"; then
                echo -e "${YELLOW}Cần nâng cấp độ phân giải: $img_name${NC}"
                echo -e "${RED}⚠️  Cần ảnh nguồn chất lượng cao để thay thế${NC}"
            fi
        fi
    done
}

# Hàm tạo báo cáo
generate_report() {
    echo -e "${BLUE}=== TẠO BÁO CÁO ===${NC}"
    
    local report_file="$PROJECT_ROOT/image_replacement_report_$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "BÁO CÁO THAY THẾ ẢNH - $(date)"
        echo "=================================="
        echo ""
        echo "Backup location: $BACKUP_DIR"
        echo ""
        echo "Tiêu chuẩn áp dụng:"
        echo "- Độ phân giải tối thiểu: ${TARGET_WIDTH}x${TARGET_HEIGHT}"
        echo "- Kích thước file tối đa: $((MAX_FILE_SIZE/1024/1024))MB"
        echo "- Chất lượng: ${QUALITY}%"
        echo ""
        echo "Kết quả xử lý:"
        
        # Kiểm tra từng loại ảnh
        echo ""
        echo "HERO IMAGES:"
        local hero_images=(
            "$IMAGES_DIR/skyquest/herosection.png"
            "$IMAGES_DIR/service/CUISINE.png"
            "$IMAGES_DIR/service/MUSIC.png"
            "$IMAGES_DIR/service/AI.png"
            "$IMAGES_DIR/service/GALLERY.png"
            "$IMAGES_DIR/service/VIDEOS.png"
        )
        
        for img in "${hero_images[@]}"; do
            if [ -f "$img" ]; then
                local dimensions file_size
                dimensions=$(magick identify -format "%wx%h" "$img" 2>/dev/null)
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    file_size=$(stat -f%z "$img")
                else
                    file_size=$(stat -c%s "$img")
                fi
                echo "- $(basename "$img"): ${dimensions}, $((file_size/1024))KB"
            fi
        done
        
        echo ""
        echo "ACTIVITY IMAGES:"
        for i in {1..9}; do
            local img="$IMAGES_DIR/explore/các hoạt động/${i}.png"
            if [ -f "$img" ]; then
                local dimensions file_size
                dimensions=$(magick identify -format "%wx%h" "$img" 2>/dev/null)
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    file_size=$(stat -f%z "$img")
                else
                    file_size=$(stat -c%s "$img")
                fi
                echo "- ${i}.png: ${dimensions}, $((file_size/1024))KB"
            fi
        done
        
    } > "$report_file"
    
    echo -e "${GREEN}✅ Báo cáo tạo tại: $report_file${NC}"
}

# Hàm main
main() {
    show_header
    
    echo -e "${YELLOW}Bắt đầu quá trình thay thế ảnh...${NC}"
    echo ""
    
    # Kiểm tra dependencies
    check_dependencies
    echo ""
    
    # Tạo backup
    create_backup
    echo ""
    
    # Xử lý từng loại ảnh
    process_hero_images
    echo ""
    
    process_activity_images
    echo ""
    
    process_viviet_images
    echo ""
    
    # Tạo báo cáo
    generate_report
    echo ""
    
    echo -e "${GREEN}🎉 Hoàn thành quá trình thay thế ảnh!${NC}"
    echo -e "${YELLOW}Lưu ý: Hãy kiểm tra website để đảm bảo ảnh hiển thị đúng${NC}"
    echo -e "${YELLOW}Chạy: npm run dev để kiểm tra${NC}"
}

# Chạy script
main "$@"