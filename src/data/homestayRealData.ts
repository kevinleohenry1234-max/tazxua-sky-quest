export interface HomestayReal {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: string;
  images: string[];
  amenities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  features: string[];
  folder: string;
}

export const homestayRealData: HomestayReal[] = [
  {
    "id": "1",
    "name": "1941M Homestay Tà Xùa",
    "description": "1941M Homestay Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.7,
    "price": "1.161.483đ",
    "images":     [
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_01.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_02.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_03.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_04.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_05.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_06.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_07.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_08.png",
          "/Hotels/1941M_Homestay_Ta_Xua/accomodation image/1941m_homestay_ta_xua_09.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Dịch vụ lễ tân 24 giờ",
      "Chỗ đậu xe miễn phí",
      "Nhà hàng"
    ],
    "contact": {
      "phone": "0869221941"
    },
    "features": [
      "Điểm trekking sống lưng khủng long (1,1km)",
      "Thác phun sương (750m)"
    ],
    "folder": "1941M_Homestay_Ta_Xua"
  },
  {
    "id": "2",
    "name": "Anh Tài Mây Homestay",
    "description": "Anh Tài Mây Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.5,
    "price": "950.000đ",
    "images":     [
          "/Hotels/Anh_Tai_May_Homestay/accomodation image/anh_tai_may_homestay_01.png",
          "/Hotels/Anh_Tai_May_Homestay/accomodation image/anh_tai_may_homestay_02.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View núi đẹp",
      "Chỗ đậu xe"
    ],
    "contact": {
      "phone": "0987654321"
    },
    "features": [
      "Gần điểm ngắm mây",
      "Không gian yên tĩnh"
    ],
    "folder": "Anh_Tai_May_Homestay"
  },
  {
    "id": "3",
    "name": "Homestay Coffee Đỉnh Núi Tà Xùa",
    "description": "Homestay Coffee Đỉnh Núi Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.2,
    "price": "800.000đ",
    "images":     [
          "/Hotels/Homestay_Coffee_Đinh_Nui_Ta_Xua/accomodation image/homestay_coffee_dinh_nui_ta_xua_01.png",
          "/Hotels/Homestay_Coffee_Đinh_Nui_Ta_Xua/accomodation image/homestay_coffee_dinh_nui_ta_xua_02.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Quán cà phê",
      "View đỉnh núi"
    ],
    "contact": {
      "phone": "0912345678"
    },
    "features": [
      "Cà phê đặc sản",
      "View đỉnh núi tuyệt đẹp"
    ],
    "folder": "Homestay_Coffee_Đinh_Nui_Ta_Xua"
  },
  {
    "id": "4",
    "name": "Mando Homestay Tà Xùa",
    "description": "Mando Homestay Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.0,
    "price": "1.200.000đ",
    "images":     [
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-1-1711325629.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-2-1711325629.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-3-1711325629.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-4-1711325629.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-5-1711325629.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-6-1711325624.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-7-1711325624.png",
          "/Hotels/Mando_Homestay_Ta_Xua/accomodation image/mando-homestay-8-1711325624.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Nhà hàng",
      "Chỗ đậu xe"
    ],
    "contact": {
      "phone": "0923456789"
    },
    "features": [
      "Thiết kế hiện đại",
      "Dịch vụ chuyên nghiệp"
    ],
    "folder": "Mando_Homestay_Ta_Xua"
  },
  {
    "id": "5",
    "name": "May Mơ Màng Homestay Tà Xùa",
    "description": "May Mơ Màng Homestay Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.8,
    "price": "750.000đ",
    "images":     [
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/222.png",
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/333.png",
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/444.png",
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/555.png",
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/666.png",
          "/Hotels/May_Mo_Mang_Homestay_Ta_Xua/accomodation image/777.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View mây đẹp",
      "Không gian thơ mộng"
    ],
    "contact": {
      "phone": "0934567890"
    },
    "features": [
      "Không gian lãng mạn",
      "Phù hợp cho cặp đôi"
    ],
    "folder": "May_Mo_Mang_Homestay_Ta_Xua"
  },
  {
    "id": "6",
    "name": "Mayhome Tà Xùa",
    "description": "Mayhome Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.7,
    "price": "1.309.694đ",
    "images":     [
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-18d18be4c6b120f8ca5f0e0d411757e0.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-60387cfba1b9871745e7a323b965fe7f.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-682e754fb162a6b32f39bb7c4fe54f88.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-8c08e19834a05bef5d2fc3318718b348.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-962500f35ae7a1760fef5f50d292a3c8.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-a29f46896fb496114c44bbf559c54e1c.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-b60a16fd9f8b854598fd6afe302a5412.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-b63b55d0627f0bfee29b985c39bc24e2.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/67860701-d428b1b247b1217df23cc781d44f0709.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/khu-phong-may-hill-moi-va-dep.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/khu-phong-stone-hien-dai.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/khu-phong-wood-co-kinh.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/nha-hang-cua-may-home-ta-xua-rong-rai-va-sach-se.png",
          "/Hotels/Mayhome_Ta_Xua/accomodation image/phong-tap-the-voi-khu-ve-sinh-ben-ngoai.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Dịch vụ lễ tân 24 giờ",
      "Có chỗ đậu xe",
      "Cà phê"
    ],
    "contact": {
      "phone": "0774262626"
    },
    "features": [
      "Nhà văn hoá xã Tà Xùa (130m)",
      "Thiên đường mây Tà Xùa (190m)",
      "Trạm Mây (1,3km)"
    ],
    "folder": "Mayhome_Ta_Xua"
  },
  {
    "id": "7",
    "name": "Mùa Homestay Tà Xùa",
    "description": "Mùa Homestay Tà Xùa - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.9,
    "price": "850.000đ",
    "images":     [
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/481313874_1046416277503557_4466335499524853921_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/481770673_1046416127503572_3855041398076964493_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/481962814_1046416027503582_7887794603104461349_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/481982148_1046416187503566_4571624593458799346_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/482007406_1046416347503550_490472752100543593_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/482025098_1046416067503578_5120704064416439771_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/482122221_1046416037503581_2293804857776335306_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/482211904_1046416144170237_2901139029293166609_n.png",
          "/Hotels/Mua_Homestay_Ta_Xua/accomodation image/487857795_1070740248404493_2307201624039183698_n.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View thiên nhiên",
      "Không gian mở"
    ],
    "contact": {
      "phone": "0945678901"
    },
    "features": [
      "Phù hợp mùa du lịch",
      "Không gian thoáng đãng"
    ],
    "folder": "Mua_Homestay_Ta_Xua"
  },
  {
    "id": "8",
    "name": "Ngỗng Tà Xùa Homestay",
    "description": "Ngỗng Tà Xùa Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.5,
    "price": "700.000đ",
    "images":     [
          "/Hotels/Ngong_Ta_Xua_Homestay/accomodation image/Screenshot 2025-09-24 171927.png",
          "/Hotels/Ngong_Ta_Xua_Homestay/accomodation image/Screenshot 2025-09-24 171950.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Chỗ đậu xe",
      "Khu vực BBQ"
    ],
    "contact": {
      "phone": "0956789012"
    },
    "features": [
      "Gần khu vực trekking",
      "Phù hợp nhóm bạn"
    ],
    "folder": "Ngong_Ta_Xua_Homestay"
  },
  {
    "id": "9",
    "name": "Tà Xùa Cloud Homestay",
    "description": "Tà Xùa Cloud Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.3,
    "price": "1.100.000đ",
    "images":     [
          "/Hotels/Ta_Xua_Cloud_Homestay/accomodation image/OIP (1).png",
          "/Hotels/Ta_Xua_Cloud_Homestay/accomodation image/OIP (2).png",
          "/Hotels/Ta_Xua_Cloud_Homestay/accomodation image/ta-xua-clouds-homestay-2-7.png",
          "/Hotels/Ta_Xua_Cloud_Homestay/accomodation image/ta-xua-clouds-homestay-2.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View mây tuyệt đẹp",
      "Dịch vụ cao cấp"
    ],
    "contact": {
      "phone": "0967890123"
    },
    "features": [
      "Điểm ngắm mây lý tưởng",
      "Dịch vụ chuyên nghiệp"
    ],
    "folder": "Ta_Xua_Cloud_Homestay"
  },
  {
    "id": "10",
    "name": "Tà Xùa Ecolodge",
    "description": "Tà Xùa Ecolodge - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.4,
    "price": "1.500.000đ",
    "images":     [
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/1 (2).png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/10.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/11.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/12.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/13.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/14.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/15.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/16.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/17.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/18.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/19.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/2 (2).png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/20.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/21.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/3 (2).png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/6 (1).png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/7 (1).png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/8.png",
          "/Hotels/Ta_Xua_Ecolodge/accomodation image/9.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Dịch vụ lễ tân 24 giờ",
      "Có chỗ đậu xe",
      "Bể bơi ngoài trời",
      "Phòng chờ cao cấp",
      "Khu vực tắm nắng",
      "Phòng bia",
      "Thuê xe đạp"
    ],
    "contact": {
      "phone": "0989345302"
    },
    "features": [
      "Điểm ngắm mây Tà Xùa (1,6km)",
      "Thiên đường mây Tà Xùa (2,3km)",
      "Nhà văn hoá xã Tà Xùa (2,6km)"
    ],
    "folder": "Ta_Xua_Ecolodge"
  },
  {
    "id": "11",
    "name": "Tà Xùa Hills Homestay",
    "description": "Tà Xùa Hills Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 8.1,
    "price": "1.000.000đ",
    "images":     [
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-1-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-3-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-4-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-5-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-6-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-7-1729727990.png",
          "/Hotels/Ta_Xua_HillsHomestay/accomodation image/ta-xua-hills-homestay-8-1729727990.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View đồi núi",
      "Chỗ đậu xe"
    ],
    "contact": {
      "phone": "0978901234"
    },
    "features": [
      "Vị trí trên đồi",
      "View panorama tuyệt đẹp"
    ],
    "folder": "Ta_Xua_HillsHomestay"
  },
  {
    "id": "12",
    "name": "Tà Xùa Mây Homestay",
    "description": "Tà Xùa Mây Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.7,
    "price": "900.000đ",
    "images":     [
          "/Hotels/Ta_Xua_May_Homestay/accomodation image/Screenshot 2025-09-24 131759.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "View mây",
      "Không gian yên tĩnh"
    ],
    "contact": {
      "phone": "0989012345"
    },
    "features": [
      "Điểm ngắm mây lý tưởng",
      "Không gian thư giãn"
    ],
    "folder": "Ta_Xua_May_Homestay"
  },
  {
    "id": "13",
    "name": "Táo Homestay",
    "description": "Táo Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.6,
    "price": "650.000đ",
    "images":     [
          "/Hotels/Tao_Homestay/accomodation image/493413735_1166000528872653_3984986787721757935_n.png",
          "/Hotels/Tao_Homestay/accomodation image/493699503_1166001178872588_2879077469939897091_n.png",
          "/Hotels/Tao_Homestay/accomodation image/493863613_1166001828872523_4434905026459618602_n.png",
          "/Hotels/Tao_Homestay/accomodation image/515436207_1216718253800880_497438973200876913_n.png",
          "/Hotels/Tao_Homestay/accomodation image/545973872_1277607707711934_7752221969796136004_n.png",
          "/Hotels/Tao_Homestay/accomodation image/546512388_1277607627711942_41400486701659528_n.png",
          "/Hotels/Tao_Homestay/accomodation image/Screenshot 2025-09-24 132045.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Khu vườn",
      "Chỗ đậu xe"
    ],
    "contact": {
      "phone": "0990123456"
    },
    "features": [
      "Không gian xanh mát",
      "Phù hợp gia đình"
    ],
    "folder": "Tao_Homestay"
  },
  {
    "id": "14",
    "name": "Tú Mỉ",
    "description": "Tú Mỉ - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.4,
    "price": "600.000đ",
    "images":     [
          "/Hotels/Tu_Mi/accomodation image/Screenshot 2025-09-24 172752.png",
          "/Hotels/Tu_Mi/accomodation image/Screenshot 2025-09-24 172813.png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Không gian ấm cúng",
      "Chỗ đậu xe"
    ],
    "contact": {
      "phone": "0901234567"
    },
    "features": [
      "Phong cách truyền thống",
      "Giá cả phải chăng"
    ],
    "folder": "Tu_Mi"
  },
  {
    "id": "15",
    "name": "Xoè Homestay",
    "description": "Xoè Homestay - Cơ sở lưu trú chất lượng cao tại Tà Xùa với đầy đủ tiện nghi hiện đại và view thiên nhiên tuyệt đẹp.",
    "location": "Tà Xùa, Sơn La",
    "rating": 7.6,
    "price": "750.000đ",
    "images":     [
          "/Hotels/Xoe_Homestay/accomodation image/10 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/12 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/13 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/14 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/15 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/16 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/18 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/19 (1).png",
          "/Hotels/Xoe_Homestay/accomodation image/20 (1).png"
    ],
    "amenities": [
      "Wifi miễn phí",
      "Dịch vụ lễ tân 24 giờ",
      "Có vườn"
    ],
    "contact": {
      "phone": "0902229428"
    },
    "features": [
      "Đồi thông eo gió (2,7 km)",
      "Mâm xôi Trạm Tấu (1,9km)"
    ],
    "folder": "Xoe_Homestay"
  }
];
