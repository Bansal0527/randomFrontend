import React from 'react';
import type { Schedule, DragData, TimeSlot } from '../types';
import { TimeSlotColumn } from './TimeSlotColumn';
import { formatDateForDisplay } from '../utils/dateUtils';

interface TimelineViewProps {
  schedule: Schedule;
  selectedDays: string[];
  onDrop: (date: string, timeSlot: TimeSlot) => void;
  onDragStart: (item: DragData) => void;
  onRemove: (activityId: string, date: string, timeSlot: TimeSlot) => void;
  onRemoveDay: (date: string) => void; // Add this new prop
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

export const TimelineView: React.FC<TimelineViewProps> = ({ schedule, selectedDays, onDrop, onDragStart, onRemove, onRemoveDay, isDragging }) => {
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
                  <button 
                    onClick={() => onRemoveDay(dateString)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                    aria-label={`Remove ${formatDateForDisplay(dateString)}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" x2="10" y1="11" y2="17"/>
                      <line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                  </button>
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