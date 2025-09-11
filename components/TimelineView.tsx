import React, { useState, useEffect } from 'react';
import type { Schedule, DragData, TimeSlot, WeatherData } from '../types';
import { TimeSlotColumn } from './TimeSlotColumn';
import { formatDateForDisplay } from '../utils/dateUtils';

interface TimelineViewProps {
  schedule: Schedule;
  selectedDays: string[];
  onDrop: (date: string, timeSlot: TimeSlot) => void;
  onDragStart: (item: DragData) => void;
  onRemove: (activityId: string, date: string, timeSlot: TimeSlot) => void;
  isDragging: boolean;
}

const timeSlotInfo = {
  morning: { title: 'Morning', icon: '☀️' },
  afternoon: { title: 'Afternoon', icon: '🏙️' },
  evening: { title: 'Evening', icon: '🌙' },
};

const dayColors = [
  'border-brand-primary',
  'border-brand-secondary',
  'border-green-500',
  'border-yellow-500',
]

export const TimelineView: React.FC<TimelineViewProps> = ({ schedule, selectedDays, onDrop, onDragStart, onRemove, isDragging }) => {



  
  if (selectedDays.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-brand-text">Your schedule is empty!</h2>
        <p className="text-brand-subtle mt-2">Use the calendar above to select days for your plan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-6">
      {selectedDays.map((dateString, index) => {
        const daySchedule = schedule[dateString] || { morning: [], afternoon: [], evening: [] };
        const borderColor = dayColors[index % dayColors.length];

        return (
          <div key={dateString}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-3xl font-bold text-brand-text border-b-2 ${borderColor} pb-2`}>
                  {formatDateForDisplay(dateString)}
                </h2>
                <div className="flex items-center" style={{minWidth: '150px'}}>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(timeSlotInfo).map(([slotKey, { title, icon }]) => (
                <TimeSlotColumn
                  key={`${dateString}-${slotKey}`}
                  date={dateString}
                  timeSlot={slotKey as TimeSlot}
                  title={title}
                  icon={icon}
                  activities={daySchedule[slotKey as TimeSlot]}
                  onDrop={onDrop}
                  onDragStart={onDragStart}
                  onRemove={onRemove}
                  isDragging={isDragging}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
};
