import React from 'react';
import { Star, Gift, RefreshCw, Sparkles } from 'lucide-react';
import CinematicBackground from './CinematicBackground';

interface SystemOverviewProps {
  className?: string;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ className = '' }) => {
  const features = [
    {
      icon: Star,
      title: 'Điểm Thưởng Chung',
      description: 'Tích lũy điểm qua mọi hoạt động, từ check-in đến hoàn thành thử thách.',
      // Natural Tây Bắc colors - warm sunrise
      iconGradient: 'from-amber-400 to-orange-500',
      glowColor: 'shadow-amber-500/30',
      lightReflection: 'from-amber-100/20 via-orange-100/15 to-transparent'
    },
    {
      icon: Gift,
      title: 'Phần Thưởng Đa Dạng',
      description: 'Đổi điểm lấy voucher, sản phẩm địa phương, hoặc trải nghiệm độc quyền.',
      // Natural Tây Bắc colors - lavender mountain
      iconGradient: 'from-purple-400 to-indigo-500',
      glowColor: 'shadow-purple-500/30',
      lightReflection: 'from-purple-100/20 via-indigo-100/15 to-transparent'
    },
    {
      icon: RefreshCw,
      title: 'Chuyển Đổi Linh Hoạt',
      description: 'Tự do chuyển giữa chế độ Mây Sương và Hăng Say theo tâm trạng.',
      // Natural Tây Bắc colors - emerald forest
      iconGradient: 'from-emerald-400 to-teal-500',
      glowColor: 'shadow-emerald-500/30',
      lightReflection: 'from-emerald-100/20 via-teal-100/15 to-transparent'
    }
  ];

  return (
    <CinematicBackground variant="mist" className={`py-32 px-4 ${className}`}>
      <section className="relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with cinematic depth */}
        <div className="text-center mb-20">
          <h3 className="font-['Manrope'] text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-emerald-200 via-white to-blue-200 bg-clip-text text-transparent">
              Hệ Thống Chung Sky Quest
            </span>
          </h3>
          <p className="font-['Inter'] text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Một hệ sinh thái hoàn chỉnh kết nối mọi trải nghiệm tại Tà Xùa
          </p>
          
          {/* Decorative elements */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
            <Sparkles className="w-6 h-6 text-white/70" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
          </div>
        </div>

        {/* Feature Cards with Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-visible rounded-2xl transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] cursor-pointer"
              >
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl" />
                
                {/* Light reflection from top */}
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br ${feature.lightReflection} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 ${feature.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon with enhanced glow */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      {/* Icon background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.iconGradient} rounded-2xl blur-lg opacity-60 scale-125 group-hover:opacity-80 group-hover:scale-150 transition-all duration-500`} />
                      
                      {/* Main icon container */}
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/30`}>
                        <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-['Manrope'] text-2xl font-bold text-white mb-6 text-center tracking-tight drop-shadow-lg group-hover:text-white/95 transition-colors duration-300">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="font-['Inter'] text-white/80 leading-relaxed text-center flex-grow drop-shadow-md group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Decorative gradient line */}
                  <div className="mt-8 flex justify-center">
                    <div className={`h-1 w-16 bg-gradient-to-r ${feature.iconGradient} rounded-full group-hover:w-24 transition-all duration-500 shadow-lg`} />
                  </div>
                </div>

                {/* Floating particles inside card */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                  <div className={`absolute top-6 right-6 w-2 h-2 bg-gradient-to-br ${feature.iconGradient} rounded-full opacity-60 animate-float-particle-1`} />
                  <div className={`absolute bottom-8 left-8 w-1.5 h-1.5 bg-gradient-to-br ${feature.iconGradient} rounded-full opacity-40 animate-float-particle-3`} />
                </div>

                {/* Border enhancement */}
                <div className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA with cinematic styling */}
        <div className="text-center mt-20">
          <div className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500/80 via-blue-500/80 to-teal-500/80 backdrop-blur-md text-white rounded-full font-['Manrope'] font-bold text-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-500 cursor-pointer border border-white/30 cta-button-safe">
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
            
            <Star className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10 drop-shadow-lg">Khám Phá Ngay</span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast" />
          </div>
          
          {/* Subtitle */}
          <p className="mt-6 font-['Inter'] text-white/70 text-lg italic drop-shadow-md">
            Bắt đầu hành trình khám phá hệ sinh thái Sky Quest
          </p>
        </div>
      </div>

      {/* Bottom atmospheric fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </section>
    </CinematicBackground>
  );
};

export default SystemOverview;