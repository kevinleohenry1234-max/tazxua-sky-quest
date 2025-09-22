import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SafetyCenter from '@/components/SafetyCenter';

const Safety = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-64 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              An Toàn Tà Xùa
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-2xl mx-auto">
              Thông tin và hướng dẫn để đảm bảo chuyến khám phá của bạn an toàn và trọn vẹn
            </p>
          </div>
        </section>

        {/* Safety Center Content */}
        <section className="py-16 container mx-auto px-4">
          <SafetyCenter />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Safety;