#!/bin/bash

# Script tối ưu hóa hình ảnh homestay/hotel
# Đảm bảo tất cả hình ảnh có kích thước dưới 500KB

HOTELS_DIR="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public/Hotels"
MAX_SIZE_KB=500
BACKUP_DIR="${HOTELS_DIR}_backup_$(date +%Y%m%d_%H%M%S)"

echo "🔧 Bắt đầu tối ưu hóa hình ảnh homestay/hotel..."
echo "📁 Thư mục: $HOTELS_DIR"
echo "📏 Kích thước tối đa: ${MAX_SIZE_KB}KB"

# Kiểm tra ImageMagick
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick không được cài đặt. Vui lòng cài đặt:"
    echo "   brew install imagemagick"
    exit 1
fi

# Tạo backup
echo "💾 Tạo backup tại: $BACKUP_DIR"
cp -r "$HOTELS_DIR" "$BACKUP_DIR"

# Hàm tối ưu hóa hình ảnh
optimize_image() {
    local file="$1"
    local size_kb=$(du -k "$file" | cut -f1)
    
    if [ $size_kb -gt $MAX_SIZE_KB ]; then
        echo "🔄 Tối ưu: $(basename "$file") (${size_kb}KB -> "
        
        # Thử giảm chất lượng từ 85% xuống 60%
        for quality in 85 75 65 60; do
            temp_file="${file}.temp"
            
            if command -v magick &> /dev/null; then
                magick "$file" -quality $quality -strip "$temp_file"
            else
                convert "$file" -quality $quality -strip "$temp_file"
            fi
            
            new_size_kb=$(du -k "$temp_file" | cut -f1)
            
            if [ $new_size_kb -le $MAX_SIZE_KB ]; then
                mv "$temp_file" "$file"
                echo "${new_size_kb}KB) ✅"
                return 0
            fi
        done
        
        # Nếu vẫn quá lớn, thử resize
        for scale in 90 80 70; do
            temp_file="${file}.temp"
            
            if command -v magick &> /dev/null; then
                magick "$file" -resize ${scale}% -quality 70 -strip "$temp_file"
            else
                convert "$file" -resize ${scale}% -quality 70 -strip "$temp_file"
            fi
            
            new_size_kb=$(du -k "$temp_file" | cut -f1)
            
            if [ $new_size_kb -le $MAX_SIZE_KB ]; then
                mv "$temp_file" "$file"
                echo "${new_size_kb}KB) ✅"
                return 0
            fi
        done
        
        # Cleanup temp file nếu không thành công
        rm -f "$temp_file"
        echo "❌ Không thể tối ưu xuống dưới ${MAX_SIZE_KB}KB"
    else
        echo "✅ OK: $(basename "$file") (${size_kb}KB)"
    fi
}

# Đếm tổng số file
total_files=0
optimized_files=0
total_size_before=0
total_size_after=0

echo ""
echo "📊 Quét và tối ưu hóa hình ảnh..."

# Duyệt qua tất cả file .png trong thư mục Hotels
while IFS= read -r -d '' file; do
    if [[ -f "$file" ]]; then
        size_before=$(du -k "$file" | cut -f1)
        total_size_before=$((total_size_before + size_before))
        
        optimize_image "$file"
        
        size_after=$(du -k "$file" | cut -f1)
        total_size_after=$((total_size_after + size_after))
        
        if [ $size_before -gt $size_after ]; then
            optimized_files=$((optimized_files + 1))
        fi
        
        total_files=$((total_files + 1))
    fi
done < <(find "$HOTELS_DIR" -name "*.png" -print0)

echo ""
echo "📈 Báo cáo tối ưu hóa:"
echo "   📁 Tổng số file: $total_files"
echo "   🔧 File được tối ưu: $optimized_files"
echo "   📏 Kích thước trước: ${total_size_before}KB"
echo "   📏 Kích thước sau: ${total_size_after}KB"

if [ $total_size_before -gt 0 ]; then
    saved_kb=$((total_size_before - total_size_after))
    saved_percent=$((saved_kb * 100 / total_size_before))
    echo "   💾 Tiết kiệm: ${saved_kb}KB (${saved_percent}%)"
fi

echo ""
echo "✅ Hoàn thành tối ưu hóa hình ảnh!"
echo "💾 Backup được lưu tại: $BACKUP_DIR"

# Kiểm tra file lớn hơn 500KB còn lại
echo ""
echo "🔍 Kiểm tra file còn lại lớn hơn ${MAX_SIZE_KB}KB:"
large_files=0
while IFS= read -r -d '' file; do
    size_kb=$(du -k "$file" | cut -f1)
    if [ $size_kb -gt $MAX_SIZE_KB ]; then
        echo "   ⚠️  $(basename "$file"): ${size_kb}KB"
        large_files=$((large_files + 1))
    fi
done < <(find "$HOTELS_DIR" -name "*.png" -print0)

if [ $large_files -eq 0 ]; then
    echo "   ✅ Tất cả file đều dưới ${MAX_SIZE_KB}KB"
else
    echo "   ⚠️  Còn $large_files file lớn hơn ${MAX_SIZE_KB}KB"
fi