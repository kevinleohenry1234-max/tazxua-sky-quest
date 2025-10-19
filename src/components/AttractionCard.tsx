import React from 'react';
import { Attraction } from '../data/attractionsData';
import { MapPin, Clock, Star, Users } from 'lucide-react';
import LazyImage from './LazyImage';

interface AttractionCardProps {
  attraction: Attraction;
  onClick?: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'Dễ';
    case 'medium':
      return 'Trung bình';
    case 'hard':
      return 'Khó';
    default:
      return difficulty;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'mountain':
      return '🏔️';
    case 'forest':
      return '🌲';
    case 'viewpoint':
      return '🌄';
    case 'cultural':
      return '🏛️';
    default:
      return '📍';
  }
};

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={attraction.images[0]}
          alt={`${attraction.name} - Điểm tham quan tại Tà Xùa`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
            {getCategoryIcon(attraction.category)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(attraction.difficulty)}`}>
            {getDifficultyText(attraction.difficulty)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {attraction.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {attraction.shortDescription}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{attraction.location}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{attraction.duration}</span>
        </div>

        {/* Highlights */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {attraction.highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                {highlight.length > 30 ? `${highlight.substring(0, 30)}...` : highlight}
              </span>
            ))}
            {attraction.highlights.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                +{attraction.highlights.length - 2} khác
              </span>
            )}
          </div>
        </div>

        {/* Best Time */}
        <div className="text-xs text-gray-500 mb-3">
          <strong>Thời gian tốt nhất:</strong> {attraction.bestTime}
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center">
          <span>Xem chi tiết</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};