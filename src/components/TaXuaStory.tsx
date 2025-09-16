import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sunrise, Mountain, Coffee, Users } from 'lucide-react';

const TaXuaStory = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storySteps = [
    {
      icon: Sunrise,
      time: '5:00 AM',
      title: 'Bình Minh Trên Mây',
      description: 'Thức dậy cùng ánh bình minh đầu tiên, khi màn sương mỏng dần tan đi, để lộ biển mây bạt ngàn trải dưới chân núi.',
      image: 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600',
    },
    {
      icon: Mountain,
      time: '8:00 AM',
      title: 'Trekking Sống Lưng Khủng Long',
      description: 'Chinh phục những con đường mòn dẫn đến Sống Lưng Khủng Long - biểu tượng hùng vĩ của Tà Xùa.',
      image: 'bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600',
    },
    {
      icon: Coffee,
      time: '2:00 PM',
      title: 'Trà Shan Tuyết Cổ Thụ',
      description: 'Thưởng thức tách trà Shan Tuyết thơm ngọt, được hái từ những cây chè cổ thụ hàng trăm năm tuổi.',
      image: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600',
    },
    {
      icon: Users,
      time: '7:00 PM',
      title: 'Đêm Văn Hóa Bản Làng',
      description: 'Hòa mình vào điệu múa, tiếng hát của đồng bào H\'Mông quanh ánh lửa ấm áp.',
      image: 'bg-gradient-to-r from-amber-400 via-red-500 to-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            Câu Chuyện Về Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hãy cùng chúng tôi trải qua một ngày đầy cảm xúc tại Tà Xùa, nơi thiên nhiên và con người hòa quyện tạo nên những kỷ niệm khó quên.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-20" />
          
          {storySteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative flex items-center mb-20 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ 
                  transform: `translateX(${scrollY * (isEven ? 0.05 : -0.05)}px)`,
                  opacity: Math.max(0, 1 - Math.abs(scrollY - (1000 + index * 300)) / 800)
                }}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                  <Card className="group hover:shadow-large transition-all duration-500 border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className={`flex items-center mb-4 ${isEven ? '' : 'flex-row-reverse'}`}>
                        <div className={`w-12 h-12 rounded-full ${step.image} flex items-center justify-center ${isEven ? 'mr-4' : 'ml-4'}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={isEven ? '' : 'text-right'}>
                          <div className="text-sm font-inter font-medium text-primary">
                            {step.time}
                          </div>
                          <h3 className="text-xl font-playfair font-bold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`font-inter text-muted-foreground leading-relaxed ${isEven ? '' : 'text-right'}`}>
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-medium z-10" />

                {/* Spacer for the other side */}
                <div className="w-full md:w-5/12" />
              </div>
            );
          })}
        </div>

        {/* Closing Quote */}
        <div className="text-center mt-20">
          <blockquote className="font-playfair text-2xl md:text-3xl font-medium text-foreground/80 italic max-w-4xl mx-auto leading-relaxed">
            "Tà Xùa không chỉ là một điểm đến, mà là nơi tâm hồn tìm thấy sự bình yên và tái tạo năng lượng giữa thiên nhiên hùng vĩ."
          </blockquote>
          <div className="mt-6 text-muted-foreground font-inter">
            — Lời tâm sự của du khách yêu Tà Xùa
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaXuaStory;