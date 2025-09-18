import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book,
  Users, 
  Music,
  Camera,
  Heart,
  Calendar,
  Globe,
  Scroll,
  Home,
  Utensils,
  Palette,
  Volume2
} from 'lucide-react';

const Culture = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center text-white z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Văn Hóa Tà Xùa
            </h1>
            <p className="font-inter text-xl md:text-2xl max-w-3xl mx-auto">
              Khám phá và tôn vinh nét đẹp văn hóa đặc sắc của người H'Mông Tà Xùa
            </p>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Book className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
                Trang Văn Hóa Sẽ Ra Mắt Sớm
              </h2>
              <p className="font-inter text-muted-foreground mb-6">
                Chúng tôi đang sưu tầm và biên soạn những câu chuyện văn hóa đặc sắc nhất
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Thông Báo Khi Ra Mắt
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;