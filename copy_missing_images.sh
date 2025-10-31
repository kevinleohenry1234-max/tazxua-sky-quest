#!/bin/bash

# Script để copy và đổi tên hình ảnh từ thư mục con images
echo "Bắt đầu copy hình ảnh từ thư mục con images..."

# Cây Cô Đơn (11 hình)
echo "Processing Cây Cô Đơn..."
cd "public/Attractions/Cay_Co_Don/images"
count=1
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        new_name=$(printf "ca_y_co_o_n_%02d.webp" $count)
        cp "$file" "../../ca_y_co_o_n/$new_name"
        echo "Copied $file -> $new_name"
        ((count++))
    fi
done
cd ../../../..

# Đỉnh Gió Tà Xùa (8 hình)
echo "Processing Đỉnh Gió Tà Xùa..."
cd "public/Attractions/Dinh_Gio_Ta_Xua/images"
count=1
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        new_name=$(printf "i_nh_gio_ta_xu_a_%02d.webp" $count)
        cp "$file" "../../i_nh_gio_ta_xu_a/$new_name"
        echo "Copied $file -> $new_name"
        ((count++))
    fi
done
cd ../../../..

# Mỏm Cá Heo (7 hình)
echo "Processing Mỏm Cá Heo..."
cd "public/Attractions/Mom_Ca_Heo/images"
count=1
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        new_name=$(printf "mo_m_ca_heo_%02d.webp" $count)
        cp "$file" "../../mo_m_ca_heo/$new_name"
        echo "Copied $file -> $new_name"
        ((count++))
    fi
done
cd ../../../..

# Rừng Nguyên Sinh (5 hình)
echo "Processing Rừng Nguyên Sinh..."
cd "public/Attractions/Rung_Nguyen_Sinh/images"
count=1
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        new_name=$(printf "ru_ng_nguye_n_sinh_%02d.webp" $count)
        cp "$file" "../../ru_ng_nguye_n_sinh/$new_name"
        echo "Copied $file -> $new_name"
        ((count++))
    fi
done
cd ../../../..

# Sống Lưng Khủng Long (15 hình)
echo "Processing Sống Lưng Khủng Long..."
cd "public/Attractions/Song_lung_khung_long/images"
count=1
for file in *.png *.jpg *.jpeg; do
    if [ -f "$file" ]; then
        new_name=$(printf "so_ng_lu_ng_khu_ng_long_%02d.webp" $count)
        cp "$file" "../../so_ng_lu_ng_khu_ng_long/$new_name"
        echo "Copied $file -> $new_name"
        ((count++))
    fi
done
cd ../../../..

echo "Hoàn thành copy hình ảnh từ thư mục con!"