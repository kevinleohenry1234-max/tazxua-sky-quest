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
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Tà Xùa morning clouds"
              className="w-full h-full object-cover"
            />
            {/* Transparent overlay for text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Content */}
          <div className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Trung tâm An toàn
            </h1>
            <p className="font-inter text-lg md:text-xl leading-relaxed drop-shadow-md">
              Cập nhật thời tiết, hướng dẫn an toàn và thông tin cứu hộ – tất cả trong một nơi, để bạn an tâm trải nghiệm Tà Xùa.
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