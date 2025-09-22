import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, MapPin, Clock, Star, Filter } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'location' | 'category' | 'activity';
  description?: string;
  rating?: number;
  category?: string;
}

interface SearchAutocompleteProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  suggestions?: SearchSuggestion[];
  className?: string;
  showFilters?: boolean;
  filters?: Array<{
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
  }>;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder = "Tìm kiếm địa điểm, hoạt động...",
  onSearch,
  onSuggestionSelect,
  suggestions = [],
  className = "",
  showFilters = false,
  filters = []
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default suggestions for popular searches
  const defaultSuggestions: SearchSuggestion[] = [
    { id: '1', name: 'Đỉnh Phu Sang', type: 'location', description: 'Đỉnh núi cao nhất Tà Xùa', rating: 4.9, category: 'mountain' },
    { id: '2', name: 'Sống Lưng Khủng Long', type: 'location', description: 'Cung đường trekking nổi tiếng', rating: 4.8, category: 'trekking' },
    { id: '3', name: 'Săn mây', type: 'activity', description: 'Hoạt động phổ biến tại Tà Xùa', category: 'activity' },
    { id: '4', name: 'Homestay', type: 'category', description: 'Lưu trú tại nhà dân', category: 'accommodation' },
    { id: '5', name: 'Bản Tà Xùa', type: 'location', description: 'Làng bản H\'Mông truyền thống', rating: 4.6, category: 'village' },
    { id: '6', name: 'Cafe Săn Mây', type: 'location', description: 'Quán cà phê view đẹp', rating: 4.8, category: 'cafe' },
    { id: '7', name: 'Trekking', type: 'activity', description: 'Đi bộ đường dài', category: 'activity' },
    { id: '8', name: 'Chụp ảnh', type: 'activity', description: 'Nhiếp ảnh phong cảnh', category: 'photography' }
  ];

  const allSuggestions = [...suggestions, ...defaultSuggestions];

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions(allSuggestions.slice(0, 6)); // Show top 6 popular suggestions
    } else {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
        (suggestion.description && suggestion.description.toLowerCase().includes(query.toLowerCase())) ||
        (suggestion.category && suggestion.category.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8); // Limit to 8 results
      setFilteredSuggestions(filtered);
    }
    setSelectedIndex(-1);
  }, [query, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name);
    setIsOpen(false);
    onSuggestionSelect?.(suggestion);
    onSearch(suggestion.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        } else {
          setIsOpen(false);
          onSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    onSearch('');
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'activity':
        return <Clock className="w-4 h-4" />;
      case 'category':
        return <Filter className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'location':
        return 'bg-blue-100 text-blue-800';
      case 'activity':
        return 'bg-green-100 text-green-800';
      case 'category':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.map((filter) => (
            <select
              key={filter.id}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="px-3 py-1 text-sm border rounded-md bg-background"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border"
        >
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {query.trim() === '' && (
                <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                  Tìm kiếm phổ biến
                </div>
              )}
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-b-0 ${
                    index === selectedIndex ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-muted-foreground">
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{suggestion.name}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getTypeBadgeColor(suggestion.type)}`}
                          >
                            {suggestion.type === 'location' ? 'Địa điểm' : 
                             suggestion.type === 'activity' ? 'Hoạt động' : 'Danh mục'}
                          </Badge>
                        </div>
                        {suggestion.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {suggestion.rating && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{suggestion.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchAutocomplete;