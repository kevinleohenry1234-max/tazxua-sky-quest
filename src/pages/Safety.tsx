import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import SafetyCenter from '@/components/SafetyCenter';

const Safety = () => {
  return (
    <Layout>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-64 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
              An Toàn Tà Xùa
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
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
    </Layout>
  );
};

export default Safety;