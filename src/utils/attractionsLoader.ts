export interface AttractionData {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  rating?: number;
  reviews?: number;
  duration?: string;
  price?: string;
  tags: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  duration?: string;
  price?: string;
  tags: string[];
  location: string;
}

// Mock data for attractions
const mockAttractionsData: AttractionData[] = [
  {
    id: '1',
    name: 'Sống Lưng Khủng Long',
    description: 'Chinh phục đỉnh cao hùng vĩ với view 360 độ tuyệt đẹp, nơi có hình dáng độc đáo như sống lưng khủng long cổ đại',
    images: ['/Attractions/Song_lung_khung_long/images/song_lung_khung_long_01.png'],
    category: 'destinations',
    rating: 4.9,
    reviews: 524,
    duration: '1-2 ngày',
    tags: ['Trekking', 'Săn mây', 'Sunrise', 'Cảnh quan'],
    location: 'Tà Xùa, Sơn La',
    coordinates: { lat: 21.3167, lng: 103.6833 }
  },
  {
    id: '2',
    name: 'Rừng Nguyên Sinh Tà Xùa',
    description: 'Khám phá hệ sinh thái đa dạng trong rừng cổ thụ nguyên sinh với không khí trong lành',
    images: ['/Attractions/Rung_Nguyen_Sinh/images/rung_nguyen_sinh_01.png'],
    category: 'destinations',
    rating: 4.8,
    reviews: 356,
    duration: '3-4 giờ',
    tags: ['Trekking', 'Sinh thái', 'Photography', 'Rừng nguyên sinh'],
    location: 'Tà Xùa, Sơn La',
    coordinates: { lat: 21.3200, lng: 103.6900 }
  }
];

export const loadAttractionsData = async (): Promise<AttractionData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockAttractionsData;
};

export const convertToExploreItems = (attractions: AttractionData[]): ExploreItem[] => {
  return attractions.map(attraction => ({
    id: attraction.id,
    title: attraction.name,
    description: attraction.description,
    image: attraction.images[0] || '',
    category: attraction.category,
    rating: attraction.rating || 0,
    reviews: attraction.reviews || 0,
    duration: attraction.duration,
    price: attraction.price,
    tags: attraction.tags,
    location: attraction.location
  }));
};

export const getAttractionById = async (id: string): Promise<AttractionData | null> => {
  const attractions = await loadAttractionsData();
  return attractions.find(attraction => attraction.id === id) || null;
};

export const getAttractionsByCategory = async (category: string): Promise<AttractionData[]> => {
  const attractions = await loadAttractionsData();
  if (category === 'all') return attractions;
  return attractions.filter(attraction => attraction.category === category);
};