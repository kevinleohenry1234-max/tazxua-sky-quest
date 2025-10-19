import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Activity, 
  Home,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  onExploreClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onExploreClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'Tất cả', icon: Search },
    { id: 'destinations', label: 'Điểm đến', icon: MapPin },
    { id: 'activities', label: 'Hoạt động trải nghiệm', icon: Activity },
    { id: 'accommodation', label: 'Lưu trú', icon: Home },
  ];

  const handleSearch = () => {
    if (searchQuery.trim() || selectedCategory !== 'all') {
      onSearch(searchQuery, selectedCategory);
    } else {
      onExploreClick();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];
  const CategoryIcon = selectedCategoryData.icon;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 flex flex-col md:flex-row gap-2">
        {/* Category Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 px-6 py-4 h-14 rounded-xl hover:bg-primary/5 transition-all duration-300 min-w-[200px] justify-start"
            >
              <CategoryIcon className="w-5 h-5 text-primary" />
              <span className="font-inter font-medium text-foreground">
                {selectedCategoryData.label}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-white/95 backdrop-blur-xl border border-white/20">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="font-inter">{category.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Bạn muốn khám phá điều gì ở Tà Xùa?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-14 pl-12 pr-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-base font-inter placeholder:text-muted-foreground/70"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-inter font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 min-w-[160px]"
        >
          <span>Khám phá ngay</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {[
          { text: 'Đỉnh Tà Xùa', category: 'destinations' },
          { text: 'Homestay truyền thống', category: 'accommodation' },
          { text: 'Chè Shan Tuyết', category: 'activities' },
          { text: 'Văn hóa H\'Mông', category: 'activities' },
          { text: 'Sống lưng khủng long', category: 'destinations' }
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => {
              navigate(`/explore?q=${encodeURIComponent(suggestion.text)}&category=${suggestion.category}`);
            }}
            className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white/90 text-sm font-inter hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;