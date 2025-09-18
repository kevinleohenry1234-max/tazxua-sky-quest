import { useState, useEffect } from 'react';

// Supported languages
export const LANGUAGES = {
  vi: { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

// Translation keys and their values for each language
export const translations = {
  vi: {
    // Header
    'header.home': 'Trang Chủ',
    'header.discover': 'Khám Phá',
    'header.experience': 'Trải Nghiệm',
    'header.culture': 'Văn Hóa',
    'header.login': 'Đăng Nhập',
    'header.register': 'Đăng Ký',
    'header.profile': 'Hồ sơ cá nhân',
    'header.logout': 'Đăng xuất',
    'header.welcome': 'Chào',
    
    // Hero Section
    'hero.title': 'Khám Phá Vẻ Đẹp Huyền Bí Của Tà Xùa',
    'hero.subtitle': 'Nơi mây trời hòa quyện cùng núi rừng, tạo nên một bức tranh thiên nhiên tuyệt vời',
    'hero.cta': 'Bắt Đầu Hành Trình',
    'hero.learn_more': 'Tìm Hiểu Thêm',
    
    // Story Section
    'story.title': 'Câu Chuyện Về Tà Xùa',
    'story.subtitle': 'Hành trình khám phá vùng đất huyền bí',
    
    // Map Section
    'map.title': 'Bản Đồ Tương Tác',
    'map.subtitle': 'Khám phá các địa điểm nổi bật tại Tà Xùa',
    'map.token_placeholder': 'Nhập Mapbox Access Token',
    'map.token_submit': 'Xác Nhận',
    'map.token_required': 'Vui lòng nhập Mapbox Access Token để xem bản đồ',
    
    // Categories
    'categories.accommodation': 'Nơi Lưu Trú',
    'categories.attractions': 'Điểm Tham Quan',
    'categories.culture': 'Văn Hóa',
    'categories.cuisine': 'Ẩm Thực',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.confirm_password': 'Xác nhận mật khẩu',
    'auth.full_name': 'Họ và tên',
    'auth.phone': 'Số điện thoại',
    'auth.login_title': 'Đăng Nhập',
    'auth.register_title': 'Đăng Ký',
    'auth.login_button': 'Đăng Nhập',
    'auth.register_button': 'Đăng Ký',
    'auth.cancel': 'Hủy',
    'auth.have_account': 'Đã có tài khoản?',
    'auth.no_account': 'Chưa có tài khoản?',
    'auth.login_now': 'Đăng nhập ngay',
    'auth.register_now': 'Đăng ký ngay',
    
    // Footer
    'footer.about': 'Về Chúng Tôi',
    'footer.contact': 'Liên Hệ',
    'footer.privacy': 'Chính Sách Bảo Mật',
    'footer.terms': 'Điều Khoản Sử Dụng',
  },
  
  en: {
    // Header
    'header.home': 'Home',
    'header.discover': 'Discover',
    'header.experience': 'Experience',
    'header.culture': 'Culture',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.profile': 'Profile',
    'header.logout': 'Logout',
    'header.welcome': 'Hello',
    
    // Hero Section
    'hero.title': 'Discover the Mystical Beauty of Ta Xua',
    'hero.subtitle': 'Where clouds and mountains blend together, creating a magnificent natural painting',
    'hero.cta': 'Start Your Journey',
    'hero.learn_more': 'Learn More',
    
    // Story Section
    'story.title': 'The Story of Ta Xua',
    'story.subtitle': 'A journey to explore the mystical land',
    
    // Map Section
    'map.title': 'Interactive Map',
    'map.subtitle': 'Explore featured locations in Ta Xua',
    'map.token_placeholder': 'Enter Mapbox Access Token',
    'map.token_submit': 'Confirm',
    'map.token_required': 'Please enter Mapbox Access Token to view the map',
    
    // Categories
    'categories.accommodation': 'Accommodation',
    'categories.attractions': 'Attractions',
    'categories.culture': 'Culture',
    'categories.cuisine': 'Cuisine',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.full_name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.login_title': 'Login',
    'auth.register_title': 'Register',
    'auth.login_button': 'Login',
    'auth.register_button': 'Register',
    'auth.cancel': 'Cancel',
    'auth.have_account': 'Already have an account?',
    'auth.no_account': "Don't have an account?",
    'auth.login_now': 'Login now',
    'auth.register_now': 'Register now',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  
  zh: {
    // Header
    'header.home': '首页',
    'header.discover': '探索',
    'header.experience': '体验',
    'header.culture': '文化',
    'header.login': '登录',
    'header.register': '注册',
    'header.profile': '个人资料',
    'header.logout': '退出',
    'header.welcome': '你好',
    
    // Hero Section
    'hero.title': '探索塔许的神秘之美',
    'hero.subtitle': '云雾与山峦交融，绘就壮丽的自然画卷',
    'hero.cta': '开始您的旅程',
    'hero.learn_more': '了解更多',
    
    // Story Section
    'story.title': '塔许的故事',
    'story.subtitle': '探索神秘土地的旅程',
    
    // Map Section
    'map.title': '互动地图',
    'map.subtitle': '探索塔许的特色地点',
    'map.token_placeholder': '输入 Mapbox 访问令牌',
    'map.token_submit': '确认',
    'map.token_required': '请输入 Mapbox 访问令牌以查看地图',
    
    // Categories
    'categories.accommodation': '住宿',
    'categories.attractions': '景点',
    'categories.culture': '文化',
    'categories.cuisine': '美食',
    
    // Auth
    'auth.email': '邮箱',
    'auth.password': '密码',
    'auth.confirm_password': '确认密码',
    'auth.full_name': '姓名',
    'auth.phone': '电话号码',
    'auth.login_title': '登录',
    'auth.register_title': '注册',
    'auth.login_button': '登录',
    'auth.register_button': '注册',
    'auth.cancel': '取消',
    'auth.have_account': '已有账户？',
    'auth.no_account': '没有账户？',
    'auth.login_now': '立即登录',
    'auth.register_now': '立即注册',
    
    // Footer
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
  },
  
  ja: {
    // Header
    'header.home': 'ホーム',
    'header.discover': '発見',
    'header.experience': '体験',
    'header.culture': '文化',
    'header.login': 'ログイン',
    'header.register': '登録',
    'header.profile': 'プロフィール',
    'header.logout': 'ログアウト',
    'header.welcome': 'こんにちは',
    
    // Hero Section
    'hero.title': 'タスアの神秘的な美しさを発見',
    'hero.subtitle': '雲と山が調和し、壮大な自然の絵画を創り出す',
    'hero.cta': '旅を始める',
    'hero.learn_more': 'もっと詳しく',
    
    // Story Section
    'story.title': 'タスアの物語',
    'story.subtitle': '神秘的な土地を探索する旅',
    
    // Map Section
    'map.title': 'インタラクティブマップ',
    'map.subtitle': 'タスアの注目スポットを探索',
    'map.token_placeholder': 'Mapbox アクセストークンを入力',
    'map.token_submit': '確認',
    'map.token_required': 'マップを表示するには Mapbox アクセストークンを入力してください',
    
    // Categories
    'categories.accommodation': '宿泊',
    'categories.attractions': '観光地',
    'categories.culture': '文化',
    'categories.cuisine': '料理',
    
    // Auth
    'auth.email': 'メール',
    'auth.password': 'パスワード',
    'auth.confirm_password': 'パスワード確認',
    'auth.full_name': '氏名',
    'auth.phone': '電話番号',
    'auth.login_title': 'ログイン',
    'auth.register_title': '登録',
    'auth.login_button': 'ログイン',
    'auth.register_button': '登録',
    'auth.cancel': 'キャンセル',
    'auth.have_account': 'アカウントをお持ちですか？',
    'auth.no_account': 'アカウントをお持ちでない方',
    'auth.login_now': '今すぐログイン',
    'auth.register_now': '今すぐ登録',
    
    // Footer
    'footer.about': '私たちについて',
    'footer.contact': 'お問い合わせ',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
  },
  
  ko: {
    // Header
    'header.home': '홈',
    'header.discover': '탐색',
    'header.experience': '체험',
    'header.culture': '문화',
    'header.login': '로그인',
    'header.register': '회원가입',
    'header.profile': '프로필',
    'header.logout': '로그아웃',
    'header.welcome': '안녕하세요',
    
    // Hero Section
    'hero.title': '타수아의 신비로운 아름다움을 발견하세요',
    'hero.subtitle': '구름과 산이 어우러져 장엄한 자연의 그림을 만들어냅니다',
    'hero.cta': '여행 시작하기',
    'hero.learn_more': '더 알아보기',
    
    // Story Section
    'story.title': '타수아의 이야기',
    'story.subtitle': '신비로운 땅을 탐험하는 여행',
    
    // Map Section
    'map.title': '인터랙티브 지도',
    'map.subtitle': '타수아의 주요 명소 탐색',
    'map.token_placeholder': 'Mapbox 액세스 토큰 입력',
    'map.token_submit': '확인',
    'map.token_required': '지도를 보려면 Mapbox 액세스 토큰을 입력하세요',
    
    // Categories
    'categories.accommodation': '숙박',
    'categories.attractions': '관광지',
    'categories.culture': '문화',
    'categories.cuisine': '요리',
    
    // Auth
    'auth.email': '이메일',
    'auth.password': '비밀번호',
    'auth.confirm_password': '비밀번호 확인',
    'auth.full_name': '성명',
    'auth.phone': '전화번호',
    'auth.login_title': '로그인',
    'auth.register_title': '회원가입',
    'auth.login_button': '로그인',
    'auth.register_button': '회원가입',
    'auth.cancel': '취소',
    'auth.have_account': '이미 계정이 있으신가요?',
    'auth.no_account': '계정이 없으신가요?',
    'auth.login_now': '지금 로그인',
    'auth.register_now': '지금 회원가입',
    
    // Footer
    'footer.about': '회사 소개',
    'footer.contact': '연락처',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
  }
};

// Custom hook for internationalization
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('language');
    return (saved as LanguageCode) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[typeof currentLanguage]] || key;
  };

  const changeLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES
  };
}