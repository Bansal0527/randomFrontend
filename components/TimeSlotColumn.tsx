import React, { useState } from 'react';
import type { Activity, TimeSlot, DragData } from '../types';
import { ActivityCard } from './ActivityCard';

interface TimeSlotColumnProps {
  date: string;
  timeSlot: TimeSlot;
  title: string;
  icon: React.ReactNode;
  activities: Activity[];
  onDrop: (date: string, timeSlot: TimeSlot) => void;
  onDragStart: (item: DragData) => void;
  onRemove: (activityId: string, date: string, timeSlot: TimeSlot) => void;
  isDragging: boolean;
}

export const TimeSlotColumn: React.FC<TimeSlotColumnProps> = ({ 
  date, timeSlot, title, icon, activities, onDrop, onDragStart, onRemove, isDragging 
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };
  
  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(date, timeSlot);
    setIsOver(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`bg-gray-50/50 p-3 rounded-xl h-full transition-all duration-300 min-h-[400px] flex flex-col ${isOver && isDragging ? 'bg-green-100 ring-2 ring-green-400' : ''}`}
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-lg font-bold text-brand-text capitalize">{title}</h3>
      </div>
      <div className="space-y-3 flex-grow">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDragStart={(act) => onDragStart({ 
                activity: act, 
                source: { date, timeSlot, index }
              })}
              onRemove={() => onRemove(activity.id, date, timeSlot)}
            />
          ))
        ) : (
          isOver && isDragging ? null : (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-brand-subtle text-sm">Drop here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};