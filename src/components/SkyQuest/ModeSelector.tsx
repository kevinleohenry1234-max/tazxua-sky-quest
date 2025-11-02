import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, Zap, ArrowRight } from 'lucide-react';

const ModeSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode: 'maysuong' | 'hangsay') => {
    navigate(`/skyquest/${mode}`);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Chọn phong cách trải nghiệm của bạn
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hai hành trình độc đáo, mỗi cách đều mang lại trải nghiệm ý nghĩa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mây Mây Sương Sương Card */}
          <div className="group bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cloud className="w-8 h-8 text-sky-600 mx-auto" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Mây Mây Sương Sương
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Trải nghiệm nhẹ nhàng, thư giãn cùng thiên nhiên. Tận hưởng những khoảnh khắc yên bình và kết nối sâu sắc với vẻ đẹp Tà Xùa.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                <span>Ngắm mây và bình minh</span>
              </div>
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                <span>Thiền định trong thiên nhiên</span>
              </div>
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                <span>Ghi lại cảm xúc và trải nghiệm</span>
              </div>
            </div>

            <button
              onClick={() => handleModeSelect('maysuong')}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:from-sky-400 group-hover:to-blue-400 flex items-center justify-center gap-2"
            >
              Khám phá
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Hăng Say Săn Thưởng Card */}
          <div className="group bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-emerald-600 mx-auto" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Hăng Say Săn Thưởng
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Hành trình đầy thử thách và tạo tác động tích cực. Hoàn thành nhiệm vụ, bảo vệ môi trường và nhận phần thưởng xứng đáng.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Thử thách bảo vệ môi trường</span>
              </div>
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Tương tác với cộng đồng địa phương</span>
              </div>
              <div className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>Nhận phần thưởng thực sự</span>
              </div>
            </div>

            <button
              onClick={() => handleModeSelect('hangsay')}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:from-emerald-400 group-hover:to-green-400 flex items-center justify-center gap-2"
            >
              Khám phá
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModeSelector;