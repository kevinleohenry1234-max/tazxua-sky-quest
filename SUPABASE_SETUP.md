# Hướng dẫn cấu hình Supabase cho Google OAuth

## Bước 1: Tạo dự án Supabase

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng ký/Đăng nhập tài khoản
3. Tạo dự án mới (New Project)
4. Chọn tổ chức và đặt tên dự án
5. Chọn region gần nhất (Singapore cho Việt Nam)
6. Đặt mật khẩu database
7. Chờ dự án được tạo (khoảng 2-3 phút)

## Bước 2: Lấy thông tin API

1. Vào Settings > API
2. Copy **Project URL** và **anon public** key
3. Cập nhật file `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Bước 3: Cấu hình Google OAuth

1. Vào Settings > Authentication > Providers
2. Tìm và bật **Google** provider
3. Cần có Google OAuth credentials:

### Tạo Google OAuth App:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào APIs & Services > Credentials
4. Tạo OAuth 2.0 Client ID
5. Chọn Application type: Web application
6. Thêm Authorized redirect URIs:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
7. Copy Client ID và Client Secret

### Cấu hình trong Supabase:
1. Paste Client ID và Client Secret vào Supabase
2. Thêm redirect URL cho development:
   ```
   http://localhost:8080
   ```
3. Save configuration

## Bước 4: Cấu hình Database (Tùy chọn)

Nếu muốn lưu thông tin user profile:

```sql
-- Tạo bảng profiles
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable RLS
alter table profiles enable row level security;

-- Tạo policy cho users
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
```

## Bước 5: Test

1. Restart development server: `npm run dev`
2. Thử đăng ký/đăng nhập với Google
3. Kiểm tra console để xem có lỗi không

## Troubleshooting

### Lỗi thường gặp:

1. **"Invalid provider"**: Google OAuth chưa được bật trong Supabase
2. **"redirect_uri_mismatch"**: URL redirect không khớp với cấu hình Google OAuth
3. **"Supabase chưa được cấu hình"**: Chưa cập nhật đúng thông tin trong file .env

### Kiểm tra:
- File `.env` có đúng thông tin không
- Google OAuth có được bật trong Supabase không  
- Redirect URL có khớp không
- Development server có restart sau khi thay đổi .env không