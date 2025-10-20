import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Mountain, Leaf, Heart, Trophy, Gift, Users, ArrowRight, Play, Sparkles, Target, ChevronRight, Cloud, Zap } from 'lucide-react';
import { questModes } from '@/data/skyquest-challenges';

const SkyQuest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'calm' | 'energetic' | null>(null);

  const handleModeSelect = (mode: 'calm' | 'energetic') => {
    setSelectedMode(mode);
    // Điều hướng đến trang chi tiết mode
    navigate(`/sky-quest/${mode}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-float mb-8">
              <Mountain className="w-16 h-16 mx-auto text-green-600 mb-4" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              🌿 Sky Quest
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Hành trình du lịch xanh tại Tà Xùa
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 mb-12">
              <p className="text-lg text-slate-700 leading-relaxed">
                Chọn phong cách trải nghiệm của bạn. Cả hai mode đều chia sẻ hệ thống điểm thưởng 
                và tiến trình, nhưng mang đến cảm xúc và trải nghiệm khác nhau.
              </p>
            </div>
          </div>
        </section>

        {/* Mode Selection */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              Chọn Phong Cách Trải Nghiệm
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calm Mode */}
              <div 
                className="group relative bg-gradient-to-br from-sky-100 to-violet-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleModeSelect('calm')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200/20 to-violet-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white/80 rounded-full p-4 shadow-md">
                      <Cloud className="w-12 h-12 text-sky-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Mây Mây Sương Sương
                  </h3>
                  
                  <p className="text-slate-600 mb-6 text-center leading-relaxed">
                    Trải nghiệm nhẹ nhàng và cảm xúc cùng thiên nhiên Tà Xùa. 
                    Tập trung vào sự bình yên và kết nối tâm hồn.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mr-3"></div>
                      <span className="text-sm">Không yêu cầu xác thực phức tạp</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                      <span className="text-sm">Tông màu nhẹ nhàng, thư giãn</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mr-3"></div>
                      <span className="text-sm">Animation mềm mại, âm thanh thiên nhiên</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Bắt đầu hành trình bình yên
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Energetic Mode */}
              <div 
                className="group relative bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleModeSelect('energetic')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-yellow-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white/80 rounded-full p-4 shadow-md">
                      <Zap className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                    Hăng Say Săn Thưởng
                  </h3>
                  
                  <p className="text-slate-600 mb-6 text-center leading-relaxed">
                    Hành động tích cực để bảo vệ môi trường Tà Xùa. 
                    Tập trung vào thành tựu và đóng góp cụ thể.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">Yêu cầu xác thực bằng ảnh, GPS</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm">Điểm số rõ ràng, thành tựu cụ thể</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">Animation năng động, màu sắc tươi sáng</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  >
                    Bắt đầu hành trình năng động
                    <Trophy className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              Hệ Thống Chung Sky Quest
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Điểm Thưởng Chung
                </h3>
                <p className="text-slate-600">
                  Điểm từ cả hai mode cộng dồn vào tài khoản chung
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <Gift className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Phần Thưởng Đa Dạng
                </h3>
                <p className="text-slate-600">
                  Huy hiệu, voucher và thành tựu mở khóa theo cấp độ
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Chuyển Đổi Linh Hoạt
                </h3>
                <p className="text-slate-600">
                  Đổi phong cách bất cứ lúc nào mà không mất tiến độ
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </Layout>
  );
};

export default SkyQuest;