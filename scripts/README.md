# Homestay Data Synchronization Scripts

Bộ script để đồng bộ dữ liệu homestay từ hệ thống file local lên MongoDB staging environment.

## 📁 Cấu trúc Files

- `syncHomestayToMongoDB.js` - Script chính để đồng bộ dữ liệu lên MongoDB
- `testSyncHomestay.js` - Script test để kiểm tra logic mà không cần MongoDB
- `README.md` - Documentation này

## 🚀 Cài đặt và Cấu hình

### 1. Cài đặt Dependencies

```bash
npm install mongodb
```

### 2. Cấu hình Environment Variables

Thêm vào file `.env`:

```env
# MongoDB Staging (for homestay sync script)
STAGING_MONGO_URI=mongodb://localhost:27017/taxua_staging
```

### 3. Cấu trúc Dữ liệu Yêu cầu

Script yêu cầu cấu trúc thư mục như sau:

```
public/Hotel:Homestay/
├── Homestay_Name_1/
│   ├── accomodation image/
│   │   ├── image1.png
│   │   ├── image2.png
│   │   └── ...
│   └── information/
│       └── description.md
├── Homestay_Name_2/
│   ├── accomodation image/
│   └── information/
└── ...
```

## 🔧 Sử dụng Scripts

### Test Script (Không cần MongoDB)

Để kiểm tra logic và dữ liệu mà không cần kết nối MongoDB:

```bash
node scripts/testSyncHomestay.js
```

**Kết quả mẫu:**
```
🧪 TEST SCRIPT - ĐỒNG BỘ HOMESTAY DATA
==================================================
🔍 Bắt đầu quét thư mục homestay...
📁 Đường dẫn: /path/to/public/Hotel:Homestay
📂 Tìm thấy 15 thư mục

✅ Xử lý thành công: Anh_Tai_May_Homestay
   - Tên: Anh Tai May Homestay
   - Slug: anh-tai-may-homestay
   - Số ảnh: 2
   - Mô tả: 532 ký tự

📊 BÁO CÁO TỔNG KẾT
==================================================
📁 Tổng số thư mục đã quét: 15
✅ Số lượng xử lý thành công: 15
❌ Số lượng lỗi: 0
==================================================
```

### Production Script (Với MongoDB)

Để đồng bộ dữ liệu lên MongoDB staging:

```bash
npm run sync-homestay
```

Hoặc:

```bash
node scripts/syncHomestayToMongoDB.js
```

## 📊 Dữ liệu Output

### Schema MongoDB

Script sẽ tạo collection `accommodations` với schema:

```javascript
{
  _id: ObjectId,
  name: String,           // "Anh Tai May Homestay"
  slug: String,           // "anh-tai-may-homestay"
  folderName: String,     // "Anh_Tai_May_Homestay" (unique identifier)
  imageUrls: [String],    // ["/Hotel:Homestay/Anh_Tai_May_Homestay/accomodation image/image1.png"]
  description: String,    // Nội dung từ file .md
  createdAt: Date,
  updatedAt: Date
}
```

### Upsert Logic

- **Unique Identifier**: `folderName`
- **Tạo mới**: Nếu `folderName` chưa tồn tại
- **Cập nhật**: Nếu `folderName` đã tồn tại, cập nhật tất cả fields khác

## 🛠️ Xử lý Lỗi

Script có khả năng xử lý các lỗi phổ biến:

### Lỗi Thường Gặp

1. **Thiếu thư mục `accomodation image`**
   ```
   ⚠️ Lỗi xử lý Homestay_Name: Thiếu thư mục: accomodation image
   ```

2. **Thiếu thư mục `information`**
   ```
   ⚠️ Lỗi xử lý Homestay_Name: Thiếu thư mục: information
   ```

3. **Không tìm thấy file .md**
   ```
   ⚠️ Lỗi xử lý Homestay_Name: Không thể đọc file mô tả: No .md file found
   ```

4. **Lỗi kết nối MongoDB**
   ```
   💥 Lỗi nghiêm trọng: connect ECONNREFUSED ::1:27017
   ```

### Khắc phục

- Đảm bảo cấu trúc thư mục đúng format
- Kiểm tra MongoDB đang chạy (nếu dùng script chính)
- Kiểm tra quyền đọc file/thư mục

## 📈 Monitoring và Logging

Script cung cấp logging chi tiết:

- ✅ **Thành công**: Hiển thị thông tin homestay đã xử lý
- ⚠️ **Cảnh báo**: Lỗi xử lý từng homestay (tiếp tục với homestay khác)
- 💥 **Lỗi nghiêm trọng**: Lỗi hệ thống (dừng script)
- 📊 **Báo cáo tổng kết**: Thống kê cuối cùng

## 🔍 Troubleshooting

### 1. Script không tìm thấy thư mục

**Lỗi**: `ENOENT: no such file or directory, access '/path/to/public/Hotel:Homestay'`

**Giải pháp**: Kiểm tra đường dẫn trong script, đảm bảo thư mục `public/Hotel:Homestay` tồn tại.

### 2. MongoDB connection failed

**Lỗi**: `connect ECONNREFUSED ::1:27017`

**Giải pháp**: 
- Khởi động MongoDB service
- Kiểm tra `STAGING_MONGO_URI` trong file `.env`
- Sử dụng test script để kiểm tra logic trước

### 3. ES Modules errors

**Lỗi**: `require is not defined in ES module scope`

**Giải pháp**: Script đã được cấu hình cho ES modules, đảm bảo `package.json` có `"type": "module"`

## 🎯 Best Practices

1. **Luôn chạy test script trước** để kiểm tra dữ liệu
2. **Backup MongoDB** trước khi chạy script production
3. **Kiểm tra logs** để đảm bảo không có lỗi
4. **Chạy script trong môi trường staging** trước khi production

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Cấu trúc thư mục homestay
2. File `.env` configuration  
3. MongoDB connection
4. Logs chi tiết từ script