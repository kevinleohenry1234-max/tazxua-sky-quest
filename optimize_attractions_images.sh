#!/bin/bash

# Script tự động tối ưu hóa hình ảnh địa điểm tham quan
# Yêu cầu: 1920x1080px, <2MB, định dạng WebP

set -e

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Thư mục nguồn và đích
SOURCE_DIR="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Locations"
DEST_DIR="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Attractions"
LOG_FILE="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/attractions_optimization.log"

# Khởi tạo log file
echo "=== ATTRACTIONS IMAGE OPTIMIZATION LOG ===" > "$LOG_FILE"
echo "Bắt đầu: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Hàm log
log_message() {
    echo "$1" | tee -a "$LOG_FILE"
}

# Hàm tối ưu hóa hình ảnh
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local location_name="$3"
    
    # Kiểm tra file tồn tại
    if [[ ! -f "$input_file" ]]; then
        log_message "${RED}❌ File không tồn tại: $input_file${NC}"
        return 1
    fi
    
    # Tạo thư mục đích nếu chưa có
    mkdir -p "$(dirname "$output_file")"
    
    # Lấy thông tin ảnh gốc
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || echo "0")
    local original_dimensions=$(sips -g pixelWidth -g pixelHeight "$input_file" 2>/dev/null | grep -E "pixelWidth|pixelHeight" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
    
    log_message "${BLUE}📸 Xử lý: $(basename "$input_file")${NC}"
    log_message "   Kích thước gốc: ${original_dimensions} ($(numfmt --to=iec-i --suffix=B $original_size))"
    
    # Tối ưu hóa với sips (macOS built-in)
    # Resize về 1920x1080 (maintain aspect ratio)
    sips -Z 1920 "$input_file" --out "$output_file" >/dev/null 2>&1
    
    # Chuyển đổi sang WebP với chất lượng 85%
    local webp_file="${output_file%.*}.webp"
    if command -v cwebp >/dev/null 2>&1; then
        cwebp -q 85 -resize 1920 1080 "$output_file" -o "$webp_file" >/dev/null 2>&1
        rm "$output_file" # Xóa file PNG/JPG tạm
        output_file="$webp_file"
    else
        # Fallback: Giữ định dạng gốc nhưng tối ưu chất lượng
        sips -s formatOptions 85 "$output_file" >/dev/null 2>&1
    fi
    
    # Kiểm tra kết quả
    if [[ -f "$output_file" ]]; then
        local new_size=$(stat -f%z "$output_file" 2>/dev/null || echo "0")
        local new_dimensions=$(sips -g pixelWidth -g pixelHeight "$output_file" 2>/dev/null | grep -E "pixelWidth|pixelHeight" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        
        # Kiểm tra kích thước file (<2MB)
        if [[ $new_size -gt 2097152 ]]; then
            log_message "${YELLOW}⚠️  Cảnh báo: File vẫn lớn hơn 2MB ($(numfmt --to=iec-i --suffix=B $new_size))${NC}"
            # Giảm chất lượng thêm
            if [[ "$output_file" == *.webp ]]; then
                cwebp -q 70 -resize 1920 1080 "$input_file" -o "$output_file" >/dev/null 2>&1
            else
                sips -s formatOptions 70 "$output_file" >/dev/null 2>&1
            fi
            new_size=$(stat -f%z "$output_file" 2>/dev/null || echo "0")
        fi
        
        log_message "   ${GREEN}✅ Hoàn thành: ${new_dimensions} ($(numfmt --to=iec-i --suffix=B $new_size))${NC}"
        log_message "   Tiết kiệm: $(echo "scale=1; ($original_size - $new_size) * 100 / $original_size" | bc)%"
        return 0
    else
        log_message "${RED}❌ Lỗi tối ưu hóa: $input_file${NC}"
        return 1
    fi
}

# Hàm chuẩn hóa tên file
normalize_filename() {
    local filename="$1"
    # Chuyển về lowercase, thay thế khoảng trắng và ký tự đặc biệt
    echo "$filename" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9.]/_/g' | sed 's/__*/_/g' | sed 's/^_//;s/_$//'
}

# Hàm chuẩn hóa tên thư mục thành ID
normalize_location_id() {
    local location_name="$1"
    echo "$location_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_//;s/_$//'
}

log_message "${BLUE}🚀 Bắt đầu tối ưu hóa hình ảnh địa điểm tham quan${NC}"
log_message "Nguồn: $SOURCE_DIR"
log_message "Đích: $DEST_DIR"
log_message ""

# Đếm số lượng
total_locations=0
total_images=0
processed_images=0
failed_images=0

# Xử lý từng địa điểm
for location_dir in "$SOURCE_DIR"/*; do
    if [[ -d "$location_dir" ]]; then
        location_name=$(basename "$location_dir")
        location_id=$(normalize_location_id "$location_name")
        
        log_message "${YELLOW}📍 Xử lý địa điểm: $location_name${NC}"
        log_message "   ID: $location_id"
        
        # Tạo thư mục đích
        dest_location_dir="$DEST_DIR/$location_id"
        mkdir -p "$dest_location_dir"
        
        # Đếm ảnh trong thư mục
        image_count=0
        location_processed=0
        location_failed=0
        
        # Xử lý từng ảnh
        for image_file in "$location_dir"/*.png "$location_dir"/*.jpg "$location_dir"/*.jpeg "$location_dir"/*.PNG "$location_dir"/*.JPG "$location_dir"/*.JPEG; do
            if [[ -f "$image_file" ]]; then
                ((image_count++))
                ((total_images++))
                
                # Tạo tên file đích
                original_filename=$(basename "$image_file")
                extension="${original_filename##*.}"
                filename_without_ext="${original_filename%.*}"
                normalized_filename=$(normalize_filename "$filename_without_ext")
                
                # Đặt tên file theo pattern: location_id_01.webp
                output_filename="${location_id}_$(printf "%02d" $image_count).webp"
                output_file="$dest_location_dir/$output_filename"
                
                # Tối ưu hóa ảnh
                if optimize_image "$image_file" "$output_file" "$location_name"; then
                    ((location_processed++))
                    ((processed_images++))
                else
                    ((location_failed++))
                    ((failed_images++))
                fi
            fi
        done
        
        log_message "   ${GREEN}✅ Hoàn thành: $location_processed/$image_count ảnh${NC}"
        if [[ $location_failed -gt 0 ]]; then
            log_message "   ${RED}❌ Thất bại: $location_failed ảnh${NC}"
        fi
        log_message ""
        
        ((total_locations++))
    fi
done

# Tóm tắt kết quả
log_message "${BLUE}📊 TỔNG KẾT${NC}"
log_message "Địa điểm xử lý: $total_locations"
log_message "Tổng số ảnh: $total_images"
log_message "${GREEN}✅ Thành công: $processed_images${NC}"
if [[ $failed_images -gt 0 ]]; then
    log_message "${RED}❌ Thất bại: $failed_images${NC}"
fi
log_message ""
log_message "Hoàn thành: $(date)"

# Kiểm tra cài đặt WebP
if ! command -v cwebp >/dev/null 2>&1; then
    log_message ""
    log_message "${YELLOW}⚠️  Lưu ý: WebP không được cài đặt${NC}"
    log_message "Để cài đặt WebP trên macOS:"
    log_message "brew install webp"
    log_message ""
fi

log_message "${GREEN}🎉 Hoàn thành tối ưu hóa hình ảnh!${NC}"