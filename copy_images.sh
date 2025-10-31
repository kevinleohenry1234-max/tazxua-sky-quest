#!/bin/bash

# Script để copy ảnh từ thư mục Locations sang Attractions

BASE_PATH="/Users/phuoctrinhgia/Desktop/2. PROJECT VIVIET/Ta Xua Mua Xanh/public"

# Đỉnh Gió Tà Xùa
echo "Copying Đỉnh Gió Tà Xùa images..."
cd "$BASE_PATH/Locations/ĐỈNH GIÓ TÀ XÙA "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/i_nh_gio_ta_xu_a/i_nh_gio_ta_xu_a_${padded_num}.webp"
    echo "Copied: $file -> i_nh_gio_ta_xu_a_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 9 ]; then break; fi
  fi
done

# Mỏm Cá Heo
echo "Copying Mỏm Cá Heo images..."
mkdir -p "$BASE_PATH/Attractions/mo_m_ca_heo"
cd "$BASE_PATH/Locations/MỎM CÁ HEO "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/mo_m_ca_heo/mo_m_ca_heo_${padded_num}.webp"
    echo "Copied: $file -> mo_m_ca_heo_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 7 ]; then break; fi
  fi
done

# Mỏm Đầu Rùa
echo "Copying Mỏm Đầu Rùa images..."
mkdir -p "$BASE_PATH/Attractions/mo_m_a_u_ru_a"
cd "$BASE_PATH/Locations/MỎM ĐẦU RÙA "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/mo_m_a_u_ru_a/mo_m_a_u_ru_a_${padded_num}.webp"
    echo "Copied: $file -> mo_m_a_u_ru_a_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 4 ]; then break; fi
  fi
done

# Rừng Nguyên Sinh
echo "Copying Rừng Nguyên Sinh images..."
mkdir -p "$BASE_PATH/Attractions/ru_ng_nguye_n_sinh"
cd "$BASE_PATH/Locations/RỪNG NGUYÊN SINH "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/ru_ng_nguye_n_sinh/ru_ng_nguye_n_sinh_${padded_num}.webp"
    echo "Copied: $file -> ru_ng_nguye_n_sinh_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 5 ]; then break; fi
  fi
done

# Sống Lưng Khủng Long
echo "Copying Sống Lưng Khủng Long images..."
mkdir -p "$BASE_PATH/Attractions/so_ng_lu_ng_khu_ng_long"
cd "$BASE_PATH/Locations/SỐNG LƯNG KHỦNG LONG "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/so_ng_lu_ng_khu_ng_long/so_ng_lu_ng_khu_ng_long_${padded_num}.webp"
    echo "Copied: $file -> so_ng_lu_ng_khu_ng_long_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 17 ]; then break; fi
  fi
done

# Thác Háng Đề Chơ
echo "Copying Thác Háng Đề Chơ images..."
mkdir -p "$BASE_PATH/Attractions/tha_c_ha_ng_e_cho"
cd "$BASE_PATH/Locations/THÁC HÁNG ĐỀ CHƠ "
counter=1
for file in *.png; do
  if [ "$file" != "*.png" ]; then
    printf -v padded_num "%02d" $counter
    cp "$file" "$BASE_PATH/Attractions/tha_c_ha_ng_e_cho/tha_c_ha_ng_e_cho_${padded_num}.webp"
    echo "Copied: $file -> tha_c_ha_ng_e_cho_${padded_num}.webp"
    ((counter++))
    if [ $counter -gt 7 ]; then break; fi
  fi
done

echo "All images copied successfully!"