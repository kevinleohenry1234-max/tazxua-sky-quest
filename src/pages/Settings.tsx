import { useTranslation } from '@/lib/i18n';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Globe, Moon, Shield, User, Volume2 } from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
            <p className="text-gray-600 mt-2">Quản lý tùy chọn và cài đặt tài khoản của bạn</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Danh mục cài đặt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Thông tin cá nhân
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Thông báo
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Ngôn ngữ & Khu vực
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Moon className="h-4 w-4 mr-2" />
                    Giao diện
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Bảo mật
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Thông tin tài khoản
                  </CardTitle>
                  <CardDescription>
                    Quản lý thông tin cá nhân và tài khoản của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Họ và tên</Label>
                      <input
                        id="name"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <input
                        id="email"
                        type="email"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Cập nhật thông tin
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Cài đặt thông báo
                  </CardTitle>
                  <CardDescription>
                    Quản lý các loại thông báo bạn muốn nhận
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Thông báo qua Email</Label>
                      <p className="text-sm text-gray-500">Nhận thông báo về cập nhật và ưu đãi</p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Thông báo đẩy</Label>
                      <p className="text-sm text-gray-500">Nhận thông báo trực tiếp trên thiết bị</p>
                    </div>
                    <Switch id="push-notifications" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-notifications">Thông báo marketing</Label>
                      <p className="text-sm text-gray-500">Nhận thông tin về chương trình khuyến mãi</p>
                    </div>
                    <Switch id="marketing-notifications" />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Ngôn ngữ & Khu vực
                  </CardTitle>
                  <CardDescription>
                    Tùy chỉnh ngôn ngữ và múi giờ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Ngôn ngữ</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Múi giờ</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Chọn múi giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia/ho_chi_minh">GMT+7 (Việt Nam)</SelectItem>
                          <SelectItem value="asia/bangkok">GMT+7 (Bangkok)</SelectItem>
                          <SelectItem value="asia/singapore">GMT+8 (Singapore)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Giao diện
                  </CardTitle>
                  <CardDescription>
                    Tùy chỉnh giao diện và hiển thị
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Chế độ tối</Label>
                      <p className="text-sm text-gray-500">Sử dụng giao diện tối để bảo vệ mắt</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound-effects">Hiệu ứng âm thanh</Label>
                      <p className="text-sm text-gray-500">Bật/tắt âm thanh trong ứng dụng</p>
                    </div>
                    <Switch id="sound-effects" />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Bảo mật & Quyền riêng tư
                  </CardTitle>
                  <CardDescription>
                    Quản lý cài đặt bảo mật tài khoản
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Đổi mật khẩu
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Xác thực hai yếu tố
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Quản lý thiết bị đăng nhập
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Xóa tài khoản
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;