import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import GoogleMapSection from '@/components/GoogleMapSection';
import { AttractionGrid } from '@/components/AttractionGrid';
import { Attraction } from '@/data/attractionsData';
import { useState } from 'react';

const Explore = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    // Có thể mở modal hoặc navigate đến trang chi tiết
    console.log('Selected attraction:', attraction);
  };

  return (
    <Layout>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Khám Phá Tà Xùa
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Tìm hiểu sâu về vùng đất Tà Xùa qua từng câu chuyện và địa điểm nổi bật
            </p>
          </div>
        </section>

        {/* Attractions Grid Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AttractionGrid onAttractionClick={handleAttractionClick} />
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bản Đồ Các Địa Điểm
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Xem vị trí chính xác của các địa điểm du lịch trên bản đồ để lên kế hoạch hành trình của bạn
              </p>
            </div>
            <GoogleMapSection />
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default Explore;