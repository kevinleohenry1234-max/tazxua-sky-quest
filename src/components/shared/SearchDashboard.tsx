import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchDashboardProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  placeholder?: string;
  children?: React.ReactNode; // For custom filters
}

const SearchDashboard: React.FC<SearchDashboardProps> = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  placeholder = "Tìm kiếm dịch vụ...",
  children
}) => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={onToggleFilters}
            variant="outline"
            className="px-4 py-3 border-gray-200 hover:bg-gray-50 rounded-full"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Custom Filters */}
        {showFilters && children && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDashboard;