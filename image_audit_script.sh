#!/bin/bash

# Image Quality Audit Script for Ta Xua Mua Xanh
# This script checks all images against quality standards

echo "=== KIỂM TRA CHẤT LƯỢNG HÌNH ẢNH HỆ THỐNG ==="
echo "Bắt đầu kiểm tra tại: $(date)"
echo ""

# Define quality standards
MIN_RESOLUTION_WIDTH=1920
MIN_RESOLUTION_HEIGHT=1080
MAX_FILE_SIZE_MB=2
PREFERRED_FORMATS=("png" "jpg" "jpeg" "webp")

# Counters
total_images=0
compliant_images=0
non_compliant_images=0

# Output files
REPORT_FILE="image_audit_report.txt"
NON_COMPLIANT_FILE="non_compliant_images.txt"

# Clear previous reports
> "$REPORT_FILE"
> "$NON_COMPLIANT_FILE"

echo "=== BÁO CÁO KIỂM TRA CHẤT LƯỢNG HÌNH ẢNH ===" >> "$REPORT_FILE"
echo "Thời gian: $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== DANH SÁCH ẢNH KHÔNG ĐẠT CHUẨN ===" >> "$NON_COMPLIANT_FILE"
echo "Thời gian: $(date)" >> "$NON_COMPLIANT_FILE"
echo "" >> "$NON_COMPLIANT_FILE"

# Function to check image quality
check_image_quality() {
    local file_path="$1"
    local file_name=$(basename "$file_path")
    local file_size_bytes=$(stat -f%z "$file_path" 2>/dev/null || echo "0")
    local file_size_mb=$((file_size_bytes / 1024 / 1024))
    
    # Get image dimensions using file command
    local image_info=$(file "$file_path" 2>/dev/null)
    local width=$(echo "$image_info" | grep -o '[0-9]\+ x [0-9]\+' | cut -d' ' -f1)
    local height=$(echo "$image_info" | grep -o '[0-9]\+ x [0-9]\+' | cut -d' ' -f3)
    
    # Default values if extraction fails
    width=${width:-0}
    height=${height:-0}
    
    local issues=()
    local is_compliant=true
    
    # Check file format
    local extension="${file_name##*.}"
    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
    
    if [[ ! " ${PREFERRED_FORMATS[@]} " =~ " ${extension} " ]]; then
        issues+=("Định dạng không được khuyến nghị: $extension")
        is_compliant=false
    fi
    
    # Check file size
    if [ "$file_size_mb" -gt "$MAX_FILE_SIZE_MB" ]; then
        issues+=("Kích thước file quá lớn: ${file_size_mb}MB (tối đa ${MAX_FILE_SIZE_MB}MB)")
        is_compliant=false
    fi
    
    # Check resolution (only for images with detectable dimensions)
    if [ "$width" -gt 0 ] && [ "$height" -gt 0 ]; then
        if [ "$width" -lt "$MIN_RESOLUTION_WIDTH" ] || [ "$height" -lt "$MIN_RESOLUTION_HEIGHT" ]; then
            issues+=("Độ phân giải thấp: ${width}x${height} (tối thiểu ${MIN_RESOLUTION_WIDTH}x${MIN_RESOLUTION_HEIGHT})")
            is_compliant=false
        fi
    else
        issues+=("Không thể xác định kích thước ảnh")
        is_compliant=false
    fi
    
    # Report results
    echo "Kiểm tra: $file_path"
    echo "  - Kích thước file: ${file_size_mb}MB"
    echo "  - Độ phân giải: ${width}x${height}"
    echo "  - Định dạng: $extension"
    
    if [ "$is_compliant" = true ]; then
        echo "  ✅ ĐẠT CHUẨN"
        ((compliant_images++))
        echo "✅ $file_path - ${width}x${height}, ${file_size_mb}MB, $extension" >> "$REPORT_FILE"
    else
        echo "  ❌ KHÔNG ĐẠT CHUẨN"
        ((non_compliant_images++))
        echo "❌ $file_path" >> "$REPORT_FILE"
        echo "   Vấn đề: ${issues[*]}" >> "$REPORT_FILE"
        
        echo "❌ $file_path" >> "$NON_COMPLIANT_FILE"
        echo "   Kích thước: ${width}x${height}" >> "$NON_COMPLIANT_FILE"
        echo "   Dung lượng: ${file_size_mb}MB" >> "$NON_COMPLIANT_FILE"
        echo "   Định dạng: $extension" >> "$NON_COMPLIANT_FILE"
        echo "   Vấn đề: ${issues[*]}" >> "$NON_COMPLIANT_FILE"
        echo "" >> "$NON_COMPLIANT_FILE"
    fi
    echo ""
    
    ((total_images++))
}

# Find and check all images
echo "Đang tìm kiếm tất cả hình ảnh trong hệ thống..."
echo ""

cd "public/images" || exit 1

# Check images in all subdirectories
while IFS= read -r -d '' file; do
    check_image_quality "$file"
done < <(find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" \) -print0)

# Generate summary
echo "=== TỔNG KẾT ===" | tee -a "$REPORT_FILE"
echo "Tổng số ảnh kiểm tra: $total_images" | tee -a "$REPORT_FILE"
echo "Ảnh đạt chuẩn: $compliant_images" | tee -a "$REPORT_FILE"
echo "Ảnh không đạt chuẩn: $non_compliant_images" | tee -a "$REPORT_FILE"

if [ "$total_images" -gt 0 ]; then
    compliance_rate=$((compliant_images * 100 / total_images))
    echo "Tỷ lệ đạt chuẩn: ${compliance_rate}%" | tee -a "$REPORT_FILE"
else
    echo "Không tìm thấy ảnh nào để kiểm tra" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Báo cáo chi tiết được lưu tại: $REPORT_FILE"
echo "Danh sách ảnh không đạt chuẩn: $NON_COMPLIANT_FILE"
echo ""
echo "Hoàn thành kiểm tra tại: $(date)"