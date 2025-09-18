import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause, Quote, Star } from 'lucide-react';

const TaXuaStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonialSlides = [
    {
      id: 1,
      backgroundImage: 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600',
      title: 'Bình Minh Trên Biển Mây',
      story: 'Khoảnh khắc mặt trời ló dạng từ biển mây Tà Xùa là điều kỳ diệu nhất tôi từng chứng kiến. Cảm giác như đang đứng trên thiên đường.',
      author: 'Nguyễn Minh Anh',
      location: 'Hà Nội',
      rating: 5,
      date: 'Tháng 12, 2023',
      avatar: 'bg-gradient-to-r from-blue-400 to-purple-500'
    },
    {
      id: 2,
      backgroundImage: 'bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600',
      title: 'Chinh Phục Sống Lưng Khủng Long',
      story: 'Đường trekking khó khăn nhưng cảnh quan tuyệt đẹp. Khi đứng trên đỉnh Sống Lưng Khủng Long, tôi cảm thấy mình thật nhỏ bé trước thiên nhiên hùng vĩ.',
      author: 'Trần Văn Hùng',
      location: 'TP. Hồ Chí Minh',
      rating: 5,
      date: 'Tháng 11, 2023',
      avatar: 'bg-gradient-to-r from-green-400 to-teal-500'
    },
    {
      id: 3,
      backgroundImage: 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600',
      title: 'Hương Vị Trà Shan Tuyết',
      story: 'Trà Shan Tuyết ở đây có hương vị đặc biệt, ngọt thanh và thơm lâu. Ngồi nhâm nhi tách trà giữa núi rừng là trải nghiệm không thể quên.',
      author: 'Lê Thị Hoa',
      location: 'Đà Nẵng',
      rating: 5,
      date: 'Tháng 10, 2023',
      avatar: 'bg-gradient-to-r from-emerald-400 to-cyan-500'
    },
    {
      id: 4,
      backgroundImage: 'bg-gradient-to-r from-amber-400 via-red-500 to-pink-600',
      title: 'Đêm Văn Hóa Bản Làng',
      story: 'Được tham gia đêm văn hóa với đồng bào H\'Mông, nghe tiếng khèn, xem múa dân gian. Tôi cảm nhận được sự ấm áp và hiếu khách của người dân nơi đây.',
      author: 'Phạm Quốc Việt',
      location: 'Hải Phòng',
      rating: 5,
      date: 'Tháng 9, 2023',
      avatar: 'bg-gradient-to-r from-amber-400 to-red-500'
    },
    {
      id: 5,
      backgroundImage: 'bg-gradient-to-r from-purple-400 via-pink-500 to-rose-600',
      title: 'Cắm Trại Dưới Bầu Trời Sao',
      story: 'Đêm cắm trại trên núi với bầu trời đầy sao là trải nghiệm tuyệt vời. Không khí trong lành, yên tĩnh giúp tôi thư giãn hoàn toàn sau những ngày làm việc căng thẳng.',
      author: 'Hoàng Thị Mai',
      location: 'Cần Thơ',
      rating: 5,
      date: 'Tháng 8, 2023',
      avatar: 'bg-gradient-to-r from-purple-400 to-pink-500'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonialSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialSlides.length) % testimonialSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Câu Chuyện Về Tà Xùa
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Những trải nghiệm thực tế và cảm nhận chân thật từ các du khách đã đến với Tà Xùa
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {testimonialSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < currentSlide 
                      ? 'opacity-0 transform -translate-x-full'
                      : 'opacity-0 transform translate-x-full'
                }`}
              >
                {/* Background */}
                <div className={`absolute inset-0 ${slide.backgroundImage}`} />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                  <div className="text-center text-white max-w-4xl">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 mx-auto mb-6 opacity-80" />
                    
                    {/* Title */}
                    <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                      {slide.title}
                    </h3>
                    
                    {/* Story */}
                    <blockquote className="font-inter text-lg md:text-xl leading-relaxed mb-8 italic">
                      "{slide.story}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${slide.avatar} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {slide.author.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">{slide.author}</div>
                        <div className="text-sm opacity-80">{slide.location} • {slide.date}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(slide.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Auto-play Control */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={toggleAutoPlay}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonialSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-4 mt-8 overflow-x-auto pb-4">
          {testimonialSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentSlide 
                  ? 'ring-4 ring-primary scale-110' 
                  : 'opacity-60 hover:opacity-80'
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className={`w-full h-full ${slide.backgroundImage} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold text-center px-1">
                  {slide.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Du khách hài lòng</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Đánh giá trung bình</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Tỷ lệ quay lại</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TaXuaStory;