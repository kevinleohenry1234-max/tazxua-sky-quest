export interface Attraction {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  highlights: string[];
  bestTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  tips: string[];
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  category: 'mountain' | 'forest' | 'viewpoint' | 'cultural';
}

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    "id": "ba-n-be-ta-xu-a",
    "name": "Bản Bẹ Tà Xùa",
    "description": "Bản làng của người Mông nằm giữa núi rừng Tà Xùa, nơi du khách có thể trải nghiệm văn hóa bản địa độc đáo và thưởng thức cảnh quan thiên nhiên hùng vĩ.",
    "shortDescription": "Bản làng Mông truyền thống với văn hóa bản địa độc đáo",
    "location": "Xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Trải nghiệm văn hóa người Mông truyền thống",
      "Kiến trúc nhà sàn đặc trưng vùng núi cao",
      "Cảnh quan thiên nhiên hùng vĩ xung quanh bản làng",
      "Thưởng thức ẩm thực địa phương đặc sắc"
    ],
    "bestTime": "Quanh năm, tốt nhất từ tháng 10 - tháng 4",
    "difficulty": "easy",
    "duration": "2-3 giờ",
    "tips": [
      "Tôn trọng văn hóa và phong tục địa phương",
      "Mang theo quà nhỏ cho trẻ em bản địa",
      "Học vài câu chào hỏi bằng tiếng Mông",
      "Không chụp ảnh người dân mà không xin phép"
    ],
    "images": [
      "/Locations/BẢN BẸ TÀ XÙA /IMG_0316.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_20230416_141427.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5197.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5234.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5237 (1).png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5294.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5297 (1).png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_5326.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_9856.png",
      "/Locations/BẢN BẸ TÀ XÙA /IMG_9859.png",
      "/Locations/BẢN BẸ TÀ XÙA /classicu 2025-07-19 153118.313.png",
      "/Locations/BẢN BẸ TÀ XÙA /classicu 2025-07-19 153311.686.png",
      "/Locations/BẢN BẸ TÀ XÙA /classicu 2025-07-19 154432.903.png",
      "/Locations/BẢN BẸ TÀ XÙA /classicu 2025-07-19 160248.566.png",
      "/Locations/BẢN BẸ TÀ XÙA /classicu 2025-07-19 160747.244.png"
    ],
    "coordinates": {
      "lat": 21.318,
      "lng": 104.418
    },
    "category": "cultural"
  },
  {
    "id": "ca-y-co-o-n",
    "name": "Cây Cô Đơn",
    "description": "Một cây đứng lẻ loi giữa khoảng đất trống, xung quanh là mây núi mênh mông. Hình ảnh cây nhỏ bé giữa không gian rộng lớn tạo cảm giác vừa hùng vĩ vừa trữ tình.",
    "shortDescription": "Biểu tượng săn mây nổi tiếng với góc check-in huyền thoại",
    "location": "Sườn núi cao thuộc ngã 3 Xím Vàng xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Biểu tượng \"săn mây\" nổi tiếng",
      "Góc check-in huyền thoại với nền biển mây trắng xóa",
      "Cảnh sắc thay đổi theo mùa",
      "Điểm chụp ảnh cưới, ảnh kỷ niệm lý tưởng"
    ],
    "bestTime": "Tháng 11 - tháng 4 (mùa khô), sáng sớm 5h30-7h và chiều muộn 16h30-17h30",
    "difficulty": "medium",
    "duration": "2-3 giờ",
    "tips": [
      "Chuẩn bị áo khoác vì sáng sớm trời lạnh",
      "Đi giày bám tốt khi leo lên sườn dốc",
      "Tránh chen lấn, đứng quá sát mép vực để an toàn",
      "Giữ vệ sinh, không khắc tên lên thân cây"
    ],
    "images": [
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-1.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-3.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-4.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-5.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-6.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-check-in-1699831558.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-hoang-hon-1699831558.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-le-loi-1699831558.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-san-may-1699831582.png",
      "/Locations/CÂY CÔ ĐƠN/cay-co-don-ta-xua-tho-mong-1699831582.png",
      "/Locations/CÂY CÔ ĐƠN/kham-pha-cay-co-don-ta-xua-1699831582.png"
    ],
    "coordinates": {
      "lat": 21.3167,
      "lng": 104.4167
    },
    "category": "viewpoint"
  },
  {
    "id": "co-t-mo-c-ta-xu-a",
    "name": "Cột Mốc Tà Xùa",
    "description": "Cột mốc đánh dấu ranh giới địa lý quan trọng của vùng Tà Xùa, nơi du khách có thể chụp ảnh lưu niệm và ngắm nhìn cảnh quan núi non hùng vĩ xung quanh.",
    "shortDescription": "Cột mốc địa lý quan trọng với tầm nhìn panorama tuyệt đẹp",
    "location": "Khu vực đỉnh cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Điểm đánh dấu địa lý quan trọng của Tà Xùa",
      "Tầm nhìn panorama 360 độ ra núi non",
      "Điểm check-in với ý nghĩa đặc biệt",
      "Cảnh quan núi rừng hùng vĩ xung quanh"
    ],
    "bestTime": "Tháng 10 - tháng 4, sáng sớm để tránh sương mù",
    "difficulty": "medium",
    "duration": "1-2 giờ",
    "tips": [
      "Mang theo GPS để định vị chính xác",
      "Chụp ảnh với cột mốc làm điểm nhấn",
      "Cẩn thận khi di chuyển trên địa hình núi cao",
      "Mang áo ấm vì thời tiết thay đổi nhanh"
    ],
    "images": [
      "/Locations/CỘT MỐC TÀ XÙA /CỘT MỐC TÀ XÙA .png",
      "/Locations/CỘT MỐC TÀ XÙA /Cột mốc Tà Xùa.png"
    ],
    "coordinates": {
      "lat": 21.32,
      "lng": 104.42
    },
    "category": "viewpoint"
  },
  {
    "id": "i-nh-gio-ta-xu-a",
    "name": "Đỉnh Gió Tà Xùa",
    "description": "Một điểm cao giữa núi rừng, nơi gió lộng thổi quanh năm. Từ đây có thể phóng tầm mắt ngắm nhìn biển mây bồng bềnh cuồn cuộn dưới thung lũng, đặc biệt vào sáng sớm.",
    "shortDescription": "Cửa ngõ săn mây của Tà Xùa với khung cảnh núi non trùng điệp",
    "location": "Trên đường đi vào trung tâm xã Tà Xùa, cách thị trấn Bắc Yên khoảng 10km",
    "highlights": [
      "Điểm ngắm biển mây lý tưởng",
      "Khung cảnh núi non trùng điệp, bầu trời trong xanh",
      "Gió thổi lồng lộng tạo cảm giác tự do và hùng vĩ",
      "Điểm dừng chân đầu tiên trước khi chinh phục các địa điểm khác"
    ],
    "bestTime": "Tháng 10 - tháng 4, sáng sớm để săn mây",
    "difficulty": "easy",
    "duration": "1-2 giờ",
    "tips": [
      "Dừng lại uống trà, cà phê tại các quán nhỏ ven đường",
      "Chụp ảnh với background tự nhiên tuyệt đẹp",
      "Mùa hoa (tháng 12-3) có thêm sắc hồng của hoa đào, hoa mận",
      "Mang áo ấm vì trên núi khá lạnh"
    ],
    "images": [
      "/Locations/ĐỈNH GIÓ TÀ XÙA /065127cce66edb405cbeaff03a3a23cb.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /1753765285.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /585f1a8ed209574c1ddbe1546376d356.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /8091de567e214f83dd98f3c8e4e8f5e2.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /Dinh-gio-Ta-Xua-1 2.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /Dinh-gio-Ta-Xua-2 2.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /HAHAHAH.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /c44b265cec7ffe9e588fe3d0020a8e2a.png",
      "/Locations/ĐỈNH GIÓ TÀ XÙA /d622a0e03db15f29883c8d837b90f2ba.png"
    ],
    "coordinates": {
      "lat": 21.32,
      "lng": 104.42
    },
    "category": "viewpoint"
  },
  {
    "id": "o-i-che-shan-tuye-t-ta-xu-a",
    "name": "Đồi Chè Shan Tuyết Tà Xùa",
    "description": "Những đồi chè Shan Tuyết cổ thụ trải dài trên sườn núi, với những cây chè hàng trăm năm tuổi tạo nên cảnh quan độc đáo và thơ mộng.",
    "shortDescription": "Đồi chè Shan Tuyết cổ thụ với cảnh quan thơ mộng",
    "location": "Các sườn núi cao xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Cây chè Shan Tuyết cổ thụ hàng trăm năm tuổi",
      "Cảnh quan đồi chè xanh mướt trải dài",
      "Trải nghiệm hái chè và pha trà truyền thống",
      "Tìm hiểu văn hóa trà của người Mông"
    ],
    "bestTime": "Tháng 3 - tháng 5 và tháng 9 - tháng 11 (mùa hái chè)",
    "difficulty": "easy",
    "duration": "2-3 giờ",
    "tips": [
      "Tham gia hoạt động hái chè cùng người dân địa phương",
      "Thưởng thức trà Shan Tuyết tươi ngon",
      "Tìm hiểu quy trình chế biến trà truyền thống",
      "Mua trà Shan Tuyết làm quà lưu niệm"
    ],
    "images": [
      "/Attractions/o_i_che_shan_tuye_t_ta_xu_a/o_i_che_shan_tuye_t_ta_xu_a_01.webp",
      "/Attractions/o_i_che_shan_tuye_t_ta_xu_a/o_i_che_shan_tuye_t_ta_xu_a_02.webp",
      "/Attractions/o_i_che_shan_tuye_t_ta_xu_a/o_i_che_shan_tuye_t_ta_xu_a_03.webp",
      "/Attractions/o_i_che_shan_tuye_t_ta_xu_a/o_i_che_shan_tuye_t_ta_xu_a_04.webp",
      "/Attractions/o_i_che_shan_tuye_t_ta_xu_a/o_i_che_shan_tuye_t_ta_xu_a_05.webp"
    ],
    "coordinates": {
      "lat": 21.314,
      "lng": 104.414
    },
    "category": "cultural"
  },
  {
    "id": "mo-m-ca-heo",
    "name": "Mỏm Cá Heo",
    "description": "Một mỏm đá nhô ra khỏi vách núi, hình dáng giống đầu cá heo. Nổi bật trên vùng núi cao, tạo cảm giác \"lơ lửng giữa trời\" khi đứng trên mỏm đá.",
    "shortDescription": "Mỏm đá hình cá heo độc đáo, điểm check-in nổi tiếng của giới trẻ",
    "location": "Xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Hình dáng tự nhiên kỳ thú như \"cá heo vươn mình giữa biển mây\"",
      "Cảnh quan xung quanh hùng vĩ với nhiều mây vào buổi sáng",
      "Điểm check-in được giới trẻ yêu thích",
      "Cảm giác \"lơ lửng giữa trời\" khi đứng trên mỏm đá"
    ],
    "bestTime": "Tháng 11 - tháng 4, sáng sớm 5h30-7h để săn mây",
    "difficulty": "medium",
    "duration": "2-3 giờ",
    "tips": [
      "Mang giày thể thao đế bám tốt, trang phục gọn nhẹ",
      "Mang áo ấm vì sáng sớm trên núi lạnh",
      "Cẩn thận khi chụp ảnh ở mép mỏm đá, không tạo dáng mạo hiểm",
      "Mang theo đồ ăn nhẹ, nước uống",
      "Giữ vệ sinh, không xả rác"
    ],
    "images": [
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155507.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155532.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155618.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155644.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155707.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155733.png",
      "/Locations/MỎM CÁ HEO /Screenshot 2025-09-29 155755.png"
    ],
    "coordinates": {
      "lat": 21.315,
      "lng": 104.415
    },
    "category": "viewpoint"
  },
  {
    "id": "mo-m-a-u-ru-a",
    "name": "Mỏm Đầu Rùa",
    "description": "Mỏm đá có hình dáng giống đầu rùa khổng lồ nhô ra từ vách núi, tạo nên một cảnh quan độc đáo và hùng vĩ giữa núi rừng Tà Xùa.",
    "shortDescription": "Mỏm đá hình đầu rùa khổng lồ với cảnh quan kỳ vĩ",
    "location": "Khu vực núi cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Hình dáng độc đáo như đầu rùa khổng lồ",
      "Cảnh quan núi rừng hùng vĩ xung quanh",
      "Điểm ngắm cảnh và chụp ảnh tuyệt đẹp",
      "Trải nghiệm cảm giác đứng trên \"đầu rùa\" giữa trời"
    ],
    "bestTime": "Tháng 10 - tháng 4, tránh mùa mưa",
    "difficulty": "medium",
    "duration": "2-3 giờ",
    "tips": [
      "Đi giày leo núi có độ bám tốt",
      "Cẩn thận khi tiếp cận mép mỏm đá",
      "Mang theo nước uống và đồ ăn nhẹ",
      "Kiểm tra thời tiết trước khi đi"
    ],
    "images": [
      "/Locations/MỎM ĐẦU RÙA /1753340038.png",
      "/Locations/MỎM ĐẦU RÙA /611b19caea1b9402f2ada4eb3a7277f0.png",
      "/Locations/MỎM ĐẦU RÙA /bfea4c89bb9375b9cb62a3c685324ccd.png",
      "/Locations/MỎM ĐẦU RÙA /e5a0ed1f4d14a879dad9114b1125f122.png"
    ],
    "coordinates": {
      "lat": 21.312,
      "lng": 104.412
    },
    "category": "viewpoint"
  },
  {
    "id": "ru-ng-nguye-n-sinh",
    "name": "Rừng Nguyên Sinh Tà Xùa",
    "description": "Khu rừng nguyên sinh với hệ sinh thái đa dạng, nhiều loài gỗ quý, cây dương xỉ, phong lan rừng. Được mệnh danh là \"vương quốc rêu xanh\" với thảm rêu phủ kín thân cây.",
    "shortDescription": "Vương quốc rêu xanh với hệ sinh thái nguyên sinh độc đáo",
    "location": "Khu vực núi cao Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Hệ sinh thái nguyên sinh đa dạng với nhiều loài gỗ quý",
      "Vương quốc rêu xanh độc đáo hiếm thấy ở Việt Nam",
      "Khí hậu mát mẻ 18-25°C, nhiều sương mù huyền bí",
      "Trải nghiệm trekking và cắm trại giữa núi rừng"
    ],
    "bestTime": "Tháng 9 - tháng 3 (mùa khô) để hạn chế mưa trơn trượt",
    "difficulty": "hard",
    "duration": "1-2 ngày",
    "tips": [
      "Bắt buộc có người dẫn đường bản địa (người Mông)",
      "Chuẩn bị giày leo núi chống trơn, áo mưa, găng tay",
      "Mang đèn pin, thuốc chống côn trùng",
      "Giữ gìn môi trường, tuyệt đối không xả rác hay phá cây rừng"
    ],
    "images": [
      "/Locations/RỪNG NGUYÊN SINH /rung-ta-xua-1.png",
      "/Locations/RỪNG NGUYÊN SINH /rung-ta-xua-2.png",
      "/Locations/RỪNG NGUYÊN SINH /rung-ta-xua-3.png",
      "/Locations/RỪNG NGUYÊN SINH /rung-ta-xua-4.png",
      "/Locations/RỪNG NGUYÊN SINH /rung-ta-xua.png"
    ],
    "coordinates": {
      "lat": 21.31,
      "lng": 104.41
    },
    "category": "forest"
  },
  {
    "id": "so-ng-lu-ng-khu-ng-long",
    "name": "Sống Lưng Khủng Long",
    "description": "Dải núi nhọn kéo dài với hình dáng giống sống lưng khủng long khổng lồ. Hai bên là vực sâu hun hút, đi trên cảm giác như đang bước trên lưng khủng long.",
    "shortDescription": "Dải núi hình sống lưng khủng long với trải nghiệm mạo hiểm",
    "location": "Khu vực xã Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Hình dáng độc đáo như sống lưng khủng long khổng lồ",
      "Cảnh quan kỳ vĩ với biển mây bao quanh buổi sáng",
      "Trải nghiệm thử thách với con đường hẹp chỉ đủ một người đi",
      "Điểm check-in nổi tiếng của phượt thủ và dân trekking"
    ],
    "bestTime": "Tháng 11 - tháng 4, sáng sớm để săn mây và chiều muộn ngắm hoàng hôn",
    "difficulty": "hard",
    "duration": "3-4 giờ",
    "tips": [
      "Trang phục thoải mái, gọn nhẹ với giày leo núi có độ bám tốt",
      "Chuẩn bị gậy trekking để giữ thăng bằng",
      "Không nên đi vào ngày mưa to vì dễ trơn trượt",
      "Cẩn trọng khi chụp ảnh vì hai bên là vực sâu",
      "Mang theo áo khoác, nước uống, đồ ăn nhẹ"
    ],
    "images": [
      "/Locations/SỐNG LƯNG KHỦNG LONG /0cb8876c721ea240fb0f5.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /164b376e3b27d2798b36.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /3d432566292fc071993e.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /5fd77bf277bb9ee5c7aa.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /6fc9c7051a77ca2993661.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /9b218f04834d6a13335c.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /IMG-6630.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /IMG_20230416_141427.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /ace384c6888f61d1389e.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /b581a9a4a5ed4cb315fc.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /be59ac7ca035496b1024.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-02-1662440259.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-03-1662440259 (1).png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-03-1662440259.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-04-1662440259 (1).png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-04-1662440259.png",
      "/Locations/SỐNG LƯNG KHỦNG LONG /song-lung-khung-long-mu-cang-chai-dep-me-man-giua-dat-troi-yen-bai-06-1662440259.png"
    ],
    "coordinates": {
      "lat": 21.308,
      "lng": 104.408
    },
    "category": "mountain"
  },
  {
    "id": "tha-c-ha-ng-e-cho",
    "name": "Thác Háng Đề Chơ",
    "description": "Thác nước hùng vĩ ẩn mình trong rừng nguyên sinh Tà Xùa, với dòng nước trong vắt đổ từ độ cao lớn tạo nên âm thanh du dương giữa núi rừng.",
    "shortDescription": "Thác nước hùng vĩ ẩn mình trong rừng nguyên sinh",
    "location": "Rừng nguyên sinh Tà Xùa, huyện Bắc Yên, tỉnh Sơn La",
    "highlights": [
      "Thác nước hùng vĩ với độ cao ấn tượng",
      "Dòng nước trong vắt giữa rừng nguyên sinh",
      "Âm thanh du dương của nước đổ tạo cảm giác thư giãn",
      "Không khí trong lành, mát mẻ quanh năm"
    ],
    "bestTime": "Tháng 5 - tháng 10 (mùa mưa) để thác có nhiều nước",
    "difficulty": "medium",
    "duration": "3-4 giờ",
    "tips": [
      "Mang giày chống trượt vì đường đi ẩm ướt",
      "Chuẩn bị áo mưa và túi chống nước cho đồ đạc",
      "Không tắm dưới thác vì dòng nước mạnh",
      "Mang theo đồ ăn và nước uống đầy đủ"
    ],
    "images": [
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-1.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-2.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-5.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-6.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-7.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-8.png",
      "/Locations/THÁC HÁNG ĐỀ CHƠ /thac-ta-xua-9.png"
    ],
    "coordinates": {
      "lat": 21.306,
      "lng": 104.406
    },
    "category": "forest"
  }
];

export const getAttractionById = (id: string): Attraction | undefined => {
  return ATTRACTIONS_DATA.find(attraction => attraction.id === id);
};

export const getAttractionsByCategory = (category: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.category === category);
};

export const getAttractionsByDifficulty = (difficulty: string): Attraction[] => {
  return ATTRACTIONS_DATA.filter(attraction => attraction.difficulty === difficulty);
};
