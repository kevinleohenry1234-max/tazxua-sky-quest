import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  Wand2,
  Mountain,
  Camera,
  Navigation,
  Route
} from 'lucide-react';
import { ATTRACTIONS_DATA, Attraction } from '@/data/attractionsData';
import LazyImage from '@/components/LazyImage';

interface DayItinerary {
  id: string;
  day: number;
  date?: string;
  attractions: Attraction[];
  totalDuration: number;
  totalDistance: number;
}

interface ItineraryPlan {
  id: string;
  name: string;
  days: DayItinerary[];
  createdAt: Date;
}

const ItineraryPlanner: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryPlan>({
    id: 'default',
    name: 'Lịch Trình Tà Xùa',
    days: [
      {
        id: 'day-1',
        day: 1,
        attractions: [],
        totalDuration: 0,
        totalDistance: 0
      }
    ],
    createdAt: new Date()
  });

  const [availableAttractions, setAvailableAttractions] = useState<Attraction[]>(ATTRACTIONS_DATA);
  const [tripDays, setTripDays] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ta-xua-itinerary');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItinerary(parsed);
        setTripDays(parsed.days.length);
      } catch (error) {
        console.error('Error loading itinerary:', error);
      }
    }
  }, []);

  // Save to localStorage whenever itinerary changes
  useEffect(() => {
    localStorage.setItem('ta-xua-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const calculateDistance = (attraction1: Attraction, attraction2: Attraction): number => {
    if (!attraction1.coordinates || !attraction2.coordinates) return 0;
    
    const R = 6371; // Earth's radius in km
    const dLat = (attraction2.coordinates.lat - attraction1.coordinates.lat) * Math.PI / 180;
    const dLon = (attraction2.coordinates.lng - attraction1.coordinates.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(attraction1.coordinates.lat * Math.PI / 180) * Math.cos(attraction2.coordinates.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const updateDayStats = (dayId: string, attractions: Attraction[]) => {
    const totalDuration = attractions.reduce((sum, attraction) => 
      sum + parseDuration(attraction.duration), 0
    );
    
    let totalDistance = 0;
    for (let i = 0; i < attractions.length - 1; i++) {
      totalDistance += calculateDistance(attractions[i], attractions[i + 1]);
    }

    setItinerary(prev => ({
      ...prev,
      days: prev.days.map(day => 
        day.id === dayId 
          ? { ...day, attractions, totalDuration, totalDistance }
          : day
      )
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Moving from available attractions to a day
    if (source.droppableId === 'available-attractions' && destination.droppableId.startsWith('day-')) {
      const attraction = availableAttractions.find(a => a.id === draggableId);
      if (!attraction) return;

      const dayId = destination.droppableId;
      const day = itinerary.days.find(d => d.id === dayId);
      if (!day) return;

      const newAttractions = [...day.attractions];
      newAttractions.splice(destination.index, 0, attraction);
      
      updateDayStats(dayId, newAttractions);
      setAvailableAttractions(prev => prev.filter(a => a.id !== draggableId));
    }

    // Moving from a day back to available attractions
    else if (source.droppableId.startsWith('day-') && destination.droppableId === 'available-attractions') {
      const dayId = source.droppableId;
      const day = itinerary.days.find(d => d.id === dayId);
      if (!day) return;

      const attraction = day.attractions[source.index];
      const newAttractions = day.attractions.filter((_, index) => index !== source.index);
      
      updateDayStats(dayId, newAttractions);
      setAvailableAttractions(prev => {
        const newAvailable = [...prev, attraction];
        return newAvailable.sort((a, b) => a.name.localeCompare(b.name));
      });
    }

    // Moving between days
    else if (source.droppableId.startsWith('day-') && destination.droppableId.startsWith('day-')) {
      const sourceDayId = source.droppableId;
      const destDayId = destination.droppableId;
      
      const sourceDay = itinerary.days.find(d => d.id === sourceDayId);
      const destDay = itinerary.days.find(d => d.id === destDayId);
      
      if (!sourceDay || !destDay) return;

      const attraction = sourceDay.attractions[source.index];

      // Remove from source
      const newSourceAttractions = sourceDay.attractions.filter((_, index) => index !== source.index);
      updateDayStats(sourceDayId, newSourceAttractions);

      // Add to destination
      const newDestAttractions = [...destDay.attractions];
      newDestAttractions.splice(destination.index, 0, attraction);
      updateDayStats(destDayId, newDestAttractions);
    }

    // Reordering within the same day
    else if (source.droppableId === destination.droppableId && source.droppableId.startsWith('day-')) {
      const dayId = source.droppableId;
      const day = itinerary.days.find(d => d.id === dayId);
      if (!day) return;

      const newAttractions = [...day.attractions];
      const [removed] = newAttractions.splice(source.index, 1);
      newAttractions.splice(destination.index, 0, removed);
      
      updateDayStats(dayId, newAttractions);
    }
  };

  const addDay = () => {
    const newDay: DayItinerary = {
      id: `day-${itinerary.days.length + 1}`,
      day: itinerary.days.length + 1,
      attractions: [],
      totalDuration: 0,
      totalDistance: 0
    };

    setItinerary(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }));
    setTripDays(prev => prev + 1);
  };

  const removeDay = (dayId: string) => {
    const day = itinerary.days.find(d => d.id === dayId);
    if (!day || itinerary.days.length <= 1) return;

    // Return attractions to available list
    setAvailableAttractions(prev => {
      const newAvailable = [...prev, ...day.attractions];
      return newAvailable.sort((a, b) => a.name.localeCompare(b.name));
    });

    setItinerary(prev => ({
      ...prev,
      days: prev.days.filter(d => d.id !== dayId).map((d, index) => ({
        ...d,
        day: index + 1,
        id: `day-${index + 1}`
      }))
    }));
    setTripDays(prev => prev - 1);
  };

  const generateAutoItinerary = () => {
    // Reset current itinerary
    const allAttractions = [...availableAttractions];
    itinerary.days.forEach(day => {
      allAttractions.push(...day.attractions);
    });

    // Sort attractions by difficulty and popularity
    const sortedAttractions = allAttractions.sort((a, b) => {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
             difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
    });

    // Distribute attractions across days
    const attractionsPerDay = Math.ceil(sortedAttractions.length / tripDays);
    const newDays: DayItinerary[] = [];

    for (let i = 0; i < tripDays; i++) {
      const dayAttractions = sortedAttractions.slice(
        i * attractionsPerDay, 
        (i + 1) * attractionsPerDay
      );

      const totalDuration = dayAttractions.reduce((sum, attraction) => 
        sum + parseDuration(attraction.duration), 0
      );
      
      let totalDistance = 0;
      for (let j = 0; j < dayAttractions.length - 1; j++) {
        totalDistance += calculateDistance(dayAttractions[j], dayAttractions[j + 1]);
      }

      newDays.push({
        id: `day-${i + 1}`,
        day: i + 1,
        attractions: dayAttractions,
        totalDuration,
        totalDistance
      });
    }

    setItinerary(prev => ({
      ...prev,
      days: newDays
    }));
    setAvailableAttractions([]);
  };

  const clearItinerary = () => {
    const allAttractions = [...availableAttractions];
    itinerary.days.forEach(day => {
      allAttractions.push(...day.attractions);
    });

    setItinerary(prev => ({
      ...prev,
      days: [{
        id: 'day-1',
        day: 1,
        attractions: [],
        totalDuration: 0,
        totalDistance: 0
      }]
    }));
    setAvailableAttractions(allAttractions.sort((a, b) => a.name.localeCompare(b.name)));
    setTripDays(1);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mountain':
        return <Mountain className="w-4 h-4" />;
      case 'forest':
        return <Camera className="w-4 h-4" />;
      case 'viewpoint':
        return <Navigation className="w-4 h-4" />;
      case 'cultural':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
          Lập Lịch Trình Du Lịch Tà Xùa
        </h3>
        <p className="font-inter text-muted-foreground">
          Tạo lịch trình cá nhân hóa bằng cách kéo thả các điểm tham quan vào từng ngày.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Thiết Lập Chuyến Đi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="trip-name">Tên chuyến đi</Label>
              <Input
                id="trip-name"
                value={itinerary.name}
                onChange={(e) => setItinerary(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Lịch Trình Tà Xùa"
              />
            </div>
            <div>
              <Label htmlFor="start-date">Ngày bắt đầu</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="trip-days">Số ngày</Label>
              <div className="flex gap-2">
                <Input
                  id="trip-days"
                  type="number"
                  min="1"
                  max="7"
                  value={tripDays}
                  onChange={(e) => setTripDays(parseInt(e.target.value) || 1)}
                />
                <Button onClick={addDay} size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={generateAutoItinerary} className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Tạo Tự Động
            </Button>
            <Button onClick={clearItinerary} variant="outline" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Xóa Tất Cả
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Xuất PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Chia Sẻ
            </Button>
          </div>
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Attractions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điểm Tham Quan</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Kéo thả vào lịch trình
                </p>
              </CardHeader>
              <CardContent>
                <Droppable droppableId="available-attractions">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-2 min-h-[200px] p-2 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted'
                      }`}
                    >
                      {availableAttractions.map((attraction, index) => (
                        <Draggable
                          key={attraction.id}
                          draggableId={attraction.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-card border rounded-lg cursor-move transition-all ${
                                snapshot.isDragging 
                                  ? 'shadow-lg rotate-2 scale-105' 
                                  : 'hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {attraction.images && attraction.images[0] && (
                                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                    <LazyImage
                                      src={attraction.images[0]}
                                      alt={attraction.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1 mb-1">
                                    {getCategoryIcon(attraction.category)}
                                    <h4 className="font-medium text-sm truncate">
                                      {attraction.name}
                                    </h4>
                                  </div>
                                  <div className="flex gap-1 flex-wrap">
                                    <Badge 
                                      className={getDifficultyColor(attraction.difficulty)}
                                    >
                                      {attraction.difficulty === 'easy' ? 'Dễ' : 
                                       attraction.difficulty === 'medium' ? 'TB' : 'Khó'}
                                    </Badge>
                                    <Badge variant="secondary">
                                      {attraction.duration}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {availableAttractions.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Tất cả điểm đã được thêm vào lịch trình</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          {/* Itinerary Days */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {itinerary.days.map((day, dayIndex) => (
                <Card key={day.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Ngày {day.day}
                        {startDate && (
                          <span className="text-sm font-normal text-muted-foreground">
                            ({new Date(new Date(startDate).getTime() + dayIndex * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')})
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {day.totalDuration}h
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Route className="w-4 h-4" />
                            {day.totalDistance.toFixed(1)}km
                          </span>
                        </div>
                        {itinerary.days.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeDay(day.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId={day.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[120px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                            snapshot.isDraggingOver 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted'
                          }`}
                        >
                          {day.attractions.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Kéo thả điểm tham quan vào đây</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {day.attractions.map((attraction, index) => (
                                <Draggable
                                  key={attraction.id}
                                  draggableId={attraction.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-4 bg-card border rounded-lg cursor-move transition-all ${
                                        snapshot.isDragging 
                                          ? 'shadow-lg rotate-1 scale-105' 
                                          : 'hover:shadow-md'
                                      }`}
                                    >
                                      <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                          {index + 1}
                                        </div>
                                        {attraction.images && attraction.images[0] && (
                                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <LazyImage
                                              src={attraction.images[0]}
                                              alt={attraction.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-2">
                                            {getCategoryIcon(attraction.category)}
                                            <h4 className="font-medium text-lg">
                                              {attraction.name}
                                            </h4>
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                            {attraction.shortDescription}
                                          </p>
                                          <div className="flex gap-2 flex-wrap">
                                            <Badge className={getDifficultyColor(attraction.difficulty)}>
                                              {attraction.difficulty === 'easy' ? 'Dễ' : 
                                               attraction.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                                            </Badge>
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                              <Clock className="w-3 h-3" />
                                              {attraction.duration}
                                            </Badge>
                                            <Badge variant="outline">
                                              {attraction.bestTime}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng Quan Lịch Trình</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {itinerary.days.length}
              </div>
              <div className="text-sm text-muted-foreground">Ngày</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {itinerary.days.reduce((sum, day) => sum + day.attractions.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Điểm tham quan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {itinerary.days.reduce((sum, day) => sum + day.totalDuration, 0)}h
              </div>
              <div className="text-sm text-muted-foreground">Tổng thời gian</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {itinerary.days.reduce((sum, day) => sum + day.totalDistance, 0).toFixed(1)}km
              </div>
              <div className="text-sm text-muted-foreground">Tổng quãng đường</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryPlanner;