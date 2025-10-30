#!/bin/bash

# SYSTEM INTEGRITY CHECK SCRIPT
# Kiểm tra toàn bộ hệ thống sau khi cập nhật ảnh

set -e

# Cấu hình
PROJECT_ROOT="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh"
IMAGES_DIR="$PROJECT_ROOT/public/images"
SRC_DIR="$PROJECT_ROOT/src"

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Hàm hiển thị header
show_header() {
    echo -e "${BLUE}"
    echo "=================================================="
    echo "    SYSTEM INTEGRITY CHECK"
    echo "    Kiểm tra toàn bộ hệ thống sau khi cập nhật ảnh"
    echo "=================================================="
    echo -e "${NC}"
}

# Hàm log kết quả
log_result() {
    local test_name="$1"
    local status="$2"
    local message="$3"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [ "$status" = "PASS" ]; then
        echo -e "${GREEN}✅ $test_name: $message${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ $test_name: $message${NC}"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
}

# Kiểm tra file tồn tại
check_file_exists() {
    local file_path="$1"
    local test_name="$2"
    
    if [ -f "$file_path" ]; then
        log_result "$test_name" "PASS" "File tồn tại"
        return 0
    else
        log_result "$test_name" "FAIL" "File không tồn tại: $file_path"
        return 1
    fi
}

# Kiểm tra chất lượng ảnh
check_image_quality() {
    local image_path="$1"
    local test_name="$2"
    local min_width="$3"
    local min_height="$4"
    local max_size="$5"
    
    if [ ! -f "$image_path" ]; then
        log_result "$test_name" "FAIL" "File không tồn tại"
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
        log_result "$test_name" "FAIL" "File quá lớn: $((file_size/1024/1024))MB"
        return 1
    fi
    
    # Kiểm tra độ phân giải
    local dimensions
    dimensions=$(magick identify -format "%wx%h" "$image_path" 2>/dev/null)
    local width height
    width=$(echo "$dimensions" | cut -d'x' -f1)
    height=$(echo "$dimensions" | cut -d'x' -f2)
    
    if [ "$width" -lt "$min_width" ] || [ "$height" -lt "$min_height" ]; then
        log_result "$test_name" "FAIL" "Độ phân giải thấp: ${width}x${height}"
        return 1
    fi
    
    log_result "$test_name" "PASS" "${width}x${height}, $((file_size/1024))KB"
    return 0
}

# Kiểm tra broken image links trong code
check_broken_image_links() {
    echo -e "${BLUE}=== KIỂM TRA BROKEN IMAGE LINKS ===${NC}"
    
    local broken_links=0
    
    # Tìm tất cả các file sử dụng ảnh
    local image_references
    image_references=$(grep -r -E "\.(png|jpg|jpeg|webp|gif)" "$SRC_DIR" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" 2>/dev/null || true)
    
    if [ -n "$image_references" ]; then
        while IFS= read -r line; do
            # Extract image path từ line
            local file_path image_path
            file_path=$(echo "$line" | cut -d':' -f1)
            image_path=$(echo "$line" | grep -oE "['\"][^'\"]*\.(png|jpg|jpeg|webp|gif)['\"]" | tr -d "\"'" | head -1)
            
            if [ -n "$image_path" ]; then
                # Chuyển đổi relative path thành absolute path
                local full_image_path
                if [[ "$image_path" == /* ]]; then
                    full_image_path="$PROJECT_ROOT/public$image_path"
                elif [[ "$image_path" == ./public/* ]]; then
                    full_image_path="$PROJECT_ROOT/${image_path#./}"
                elif [[ "$image_path" == /images/* ]]; then
                    full_image_path="$PROJECT_ROOT/public$image_path"
                else
                    full_image_path="$PROJECT_ROOT/public/images/$image_path"
                fi
                
                if [ ! -f "$full_image_path" ]; then
                    log_result "BROKEN_LINK" "FAIL" "$image_path in $(basename "$file_path")"
                    broken_links=$((broken_links + 1))
                fi
            fi
        done <<< "$image_references"
    fi
    
    if [ "$broken_links" -eq 0 ]; then
        log_result "IMAGE_LINKS" "PASS" "Không có broken image links"
    else
        log_result "IMAGE_LINKS" "FAIL" "$broken_links broken links tìm thấy"
    fi
}

# Kiểm tra hero images
check_hero_images() {
    echo -e "${BLUE}=== KIỂM TRA HERO IMAGES ===${NC}"
    
    local hero_images=(
        "$IMAGES_DIR/skyquest/herosection.png:SkyQuest Hero"
        "$IMAGES_DIR/service/CUISINE.png:Cuisine Hero"
        "$IMAGES_DIR/service/MUSIC.png:Music Hero"
        "$IMAGES_DIR/service/AI.png:AI Hero"
        "$IMAGES_DIR/service/GALLERY.png:Gallery Hero"
        "$IMAGES_DIR/service/VIDEOS.png:Videos Hero"
        "$IMAGES_DIR/safety/Hero Section Safety.png:Safety Hero"
    )
    
    for item in "${hero_images[@]}"; do
        local img_path test_name
        img_path=$(echo "$item" | cut -d':' -f1)
        test_name=$(echo "$item" | cut -d':' -f2)
        
        check_image_quality "$img_path" "$test_name" 1920 1080 2097152
    done
}

# Kiểm tra activity images
check_activity_images() {
    echo -e "${BLUE}=== KIỂM TRA ACTIVITY IMAGES ===${NC}"
    
    local activity_dir="$IMAGES_DIR/explore/các hoạt động"
    
    for i in {1..9}; do
        local img="$activity_dir/${i}.png"
        check_image_quality "$img" "Activity $i" 1920 1080 2097152
    done
}

# Kiểm tra viviet images
check_viviet_images() {
    echo -e "${BLUE}=== KIỂM TRA VIVIET IMAGES ===${NC}"
    
    local viviet_dir="$IMAGES_DIR/viviet"
    local important_images=(
        "taxua-hero-cinematic.jpg:Hero Cinematic"
        "taxua-ancient-forest.jpg:Ancient Forest"
        "taxua-sky-view.jpg:Sky View"
        "taxua-panoramic-view.jpg:Panoramic View"
        "taxua-trekking-adventure.jpg:Trekking Adventure"
        "taxua-misty-morning.jpg:Misty Morning"
        "taxua-mountain-range.jpg:Mountain Range"
        "taxua-services-overview.jpg:Services Overview"
    )
    
    for item in "${important_images[@]}"; do
        local img_name test_name
        img_name=$(echo "$item" | cut -d':' -f1)
        test_name=$(echo "$item" | cut -d':' -f2)
        local img_path="$viviet_dir/$img_name"
        
        # Kiểm tra với yêu cầu linh hoạt hơn cho viviet images
        if [ -f "$img_path" ]; then
            local file_size
            if [[ "$OSTYPE" == "darwin"* ]]; then
                file_size=$(stat -f%z "$img_path")
            else
                file_size=$(stat -c%s "$img_path")
            fi
            
            local dimensions
            dimensions=$(magick identify -format "%wx%h" "$img_path" 2>/dev/null)
            
            if [ "$file_size" -le 2097152 ]; then
                log_result "Viviet $test_name" "PASS" "${dimensions}, $((file_size/1024))KB"
            else
                log_result "Viviet $test_name" "FAIL" "File quá lớn: $((file_size/1024/1024))MB"
            fi
        else
            log_result "Viviet $test_name" "FAIL" "File không tồn tại"
        fi
    done
}

# Kiểm tra LazyImage component
check_lazy_image_component() {
    echo -e "${BLUE}=== KIỂM TRA LAZYIMAGE COMPONENT ===${NC}"
    
    local lazy_image_file="$SRC_DIR/components/LazyImage.tsx"
    
    if check_file_exists "$lazy_image_file" "LazyImage Component"; then
        # Kiểm tra các import cần thiết
        if grep -q "getOptimizedImageUrl" "$lazy_image_file"; then
            log_result "LazyImage Imports" "PASS" "getOptimizedImageUrl import OK"
        else
            log_result "LazyImage Imports" "FAIL" "Missing getOptimizedImageUrl import"
        fi
        
        if grep -q "preloadImage" "$lazy_image_file"; then
            log_result "LazyImage Preload" "PASS" "preloadImage import OK"
        else
            log_result "LazyImage Preload" "FAIL" "Missing preloadImage import"
        fi
    fi
}

# Kiểm tra image optimizer utilities
check_image_optimizer() {
    echo -e "${BLUE}=== KIỂM TRA IMAGE OPTIMIZER ===${NC}"
    
    local optimizer_file="$SRC_DIR/utils/imageOptimizer.ts"
    
    if check_file_exists "$optimizer_file" "Image Optimizer"; then
        # Kiểm tra các function cần thiết
        if grep -q "getOptimizedImageUrl" "$optimizer_file"; then
            log_result "Optimizer Functions" "PASS" "getOptimizedImageUrl function OK"
        else
            log_result "Optimizer Functions" "FAIL" "Missing getOptimizedImageUrl function"
        fi
        
        if grep -q "preloadImage" "$optimizer_file"; then
            log_result "Preload Function" "PASS" "preloadImage function OK"
        else
            log_result "Preload Function" "FAIL" "Missing preloadImage function"
        fi
    fi
}

# Kiểm tra build process
check_build_process() {
    echo -e "${BLUE}=== KIỂM TRA BUILD PROCESS ===${NC}"
    
    cd "$PROJECT_ROOT"
    
    # Kiểm tra TypeScript compilation
    if command -v npx &> /dev/null; then
        echo -e "${YELLOW}Kiểm tra TypeScript compilation...${NC}"
        if npx tsc --noEmit --skipLibCheck > /dev/null 2>&1; then
            log_result "TypeScript Check" "PASS" "No TypeScript errors"
        else
            log_result "TypeScript Check" "FAIL" "TypeScript compilation errors"
        fi
    else
        log_result "TypeScript Check" "SKIP" "npx not available"
    fi
    
    # Kiểm tra package.json scripts
    if [ -f "package.json" ]; then
        if grep -q "\"build\":" package.json; then
            log_result "Build Script" "PASS" "Build script exists"
        else
            log_result "Build Script" "FAIL" "Build script missing"
        fi
        
        if grep -q "\"dev\":" package.json; then
            log_result "Dev Script" "PASS" "Dev script exists"
        else
            log_result "Dev Script" "FAIL" "Dev script missing"
        fi
    else
        log_result "Package.json" "FAIL" "package.json not found"
    fi
}

# Kiểm tra responsive images
check_responsive_images() {
    echo -e "${BLUE}=== KIỂM TRA RESPONSIVE IMAGES ===${NC}"
    
    # Kiểm tra srcSet usage trong code
    local srcset_usage
    srcset_usage=$(grep -r "srcSet\|sizes=" "$SRC_DIR" --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
    
    if [ "$srcset_usage" -gt 0 ]; then
        log_result "Responsive Images" "PASS" "$srcset_usage responsive image implementations found"
    else
        log_result "Responsive Images" "WARN" "No responsive image implementations found"
    fi
    
    # Kiểm tra createResponsiveSrcSet function
    if grep -r "createResponsiveSrcSet" "$SRC_DIR" --include="*.ts" --include="*.tsx" > /dev/null 2>&1; then
        log_result "Responsive SrcSet" "PASS" "createResponsiveSrcSet function found"
    else
        log_result "Responsive SrcSet" "WARN" "createResponsiveSrcSet function not found"
    fi
}

# Tạo báo cáo tổng hợp
generate_summary_report() {
    echo -e "${BLUE}=== BÁO CÁO TỔNG HỢP ===${NC}"
    
    local report_file="$PROJECT_ROOT/system_integrity_report_$(date +%Y%m%d_%H%M%S).txt"
    local success_rate=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))
    
    {
        echo "BÁO CÁO KIỂM TRA TÍNH TOÀN VẸN HỆ THỐNG"
        echo "========================================"
        echo "Ngày kiểm tra: $(date)"
        echo ""
        echo "TỔNG QUAN:"
        echo "- Tổng số kiểm tra: $TOTAL_CHECKS"
        echo "- Kiểm tra thành công: $PASSED_CHECKS"
        echo "- Kiểm tra thất bại: $FAILED_CHECKS"
        echo "- Tỷ lệ thành công: $success_rate%"
        echo ""
        
        if [ "$success_rate" -ge 90 ]; then
            echo "ĐÁNH GIÁ: XUẤT SẮC ✅"
            echo "Hệ thống hoạt động tốt, chất lượng ảnh đạt chuẩn."
        elif [ "$success_rate" -ge 75 ]; then
            echo "ĐÁNH GIÁ: TỐT ⚠️"
            echo "Hệ thống hoạt động ổn định, một số vấn đề nhỏ cần khắc phục."
        elif [ "$success_rate" -ge 50 ]; then
            echo "ĐÁNH GIÁ: TRUNG BÌNH ⚠️"
            echo "Hệ thống có một số vấn đề cần được khắc phục."
        else
            echo "ĐÁNH GIÁ: CẦN CẢI THIỆN ❌"
            echo "Hệ thống có nhiều vấn đề nghiêm trọng cần được khắc phục ngay."
        fi
        
        echo ""
        echo "KHUYẾN NGHỊ:"
        if [ "$FAILED_CHECKS" -gt 0 ]; then
            echo "- Khắc phục $FAILED_CHECKS vấn đề đã được xác định"
            echo "- Chạy lại script kiểm tra sau khi khắc phục"
        fi
        echo "- Kiểm tra hiển thị trên các thiết bị khác nhau"
        echo "- Chạy performance test với Lighthouse"
        echo "- Theo dõi Core Web Vitals"
        
    } > "$report_file"
    
    echo -e "${GREEN}📊 Báo cáo chi tiết tạo tại: $report_file${NC}"
    
    # Hiển thị kết quả tổng hợp
    echo ""
    echo -e "${BLUE}TỔNG KẾT:${NC}"
    echo -e "Tổng số kiểm tra: ${BLUE}$TOTAL_CHECKS${NC}"
    echo -e "Thành công: ${GREEN}$PASSED_CHECKS${NC}"
    echo -e "Thất bại: ${RED}$FAILED_CHECKS${NC}"
    echo -e "Tỷ lệ thành công: ${BLUE}$success_rate%${NC}"
    
    if [ "$success_rate" -ge 90 ]; then
        echo -e "${GREEN}🎉 Hệ thống hoạt động xuất sắc!${NC}"
    elif [ "$success_rate" -ge 75 ]; then
        echo -e "${YELLOW}⚠️  Hệ thống hoạt động tốt, cần khắc phục một số vấn đề nhỏ${NC}"
    else
        echo -e "${RED}❌ Hệ thống cần được cải thiện${NC}"
    fi
}

# Hàm main
main() {
    show_header
    
    echo -e "${YELLOW}Bắt đầu kiểm tra tính toàn vẹn hệ thống...${NC}"
    echo ""
    
    # Kiểm tra dependencies
    if ! command -v magick &> /dev/null; then
        echo -e "${RED}❌ ImageMagick chưa được cài đặt${NC}"
        echo "Cài đặt bằng: brew install imagemagick"
        exit 1
    fi
    
    # Chạy các kiểm tra
    check_hero_images
    echo ""
    
    check_activity_images
    echo ""
    
    check_viviet_images
    echo ""
    
    check_lazy_image_component
    echo ""
    
    check_image_optimizer
    echo ""
    
    check_broken_image_links
    echo ""
    
    check_responsive_images
    echo ""
    
    check_build_process
    echo ""
    
    # Tạo báo cáo tổng hợp
    generate_summary_report
}

# Chạy script
main "$@"