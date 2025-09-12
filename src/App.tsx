import React, { useState, useCallback } from 'react';
import { Header } from '../components/header';
import { ActivityPicker } from '../components/ActivityPicker';
import { TimelineView } from '../components/TimelineView';
import { ShareModal } from '../components/ShareModal';
import { useWeekendPlanner } from '../hooks/useWeekendPlanner';
import { CalendarControl } from '../components/CalenderControl';
import type { DragData, TimeSlot } from '../types';

export default function App() {
  const {
    schedule,
    selectedDays,
    setSelectedDays,
    availableActivities,
    addActivity,
    moveActivity,
    removeActivity,
    applyTheme,
    addSuggestedActivities,
    isLoadingAI,
  } = useWeekendPlanner();
  
  const [dragData, setDragData] = useState<DragData | null>(null);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleDragStart = useCallback((item: DragData) => {
    setDragData(item);
  }, []);

  const handleDrop = useCallback((targetDate: string, targetTimeSlot: TimeSlot) => {
    if (!dragData) return;

    const { activity, source } = dragData;
    
    if ('day' in source && source.day === 'picker') {
        addActivity(activity, targetDate, targetTimeSlot);
    } else if ('date' in source) {
        moveActivity(source, { date: targetDate, timeSlot: targetTimeSlot });
    }

    setDragData(null);
  }, [dragData, addActivity, moveActivity]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <Header onApplyTheme={applyTheme} onShare={() => setShareModalOpen(true)} />

        <main className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ActivityPicker 
              activities={availableActivities} 
              onDragStart={handleDragStart}
              addSuggestedActivities={addSuggestedActivities}
              isLoadingAI={isLoadingAI}
            />
          </div>

          <div className="lg:col-span-3 bg-brand-surface p-4 rounded-xl shadow-sm">
            <CalendarControl 
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
            <TimelineView
              schedule={schedule}
              selectedDays={selectedDays}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onRemove={removeActivity}
              isDragging={!!dragData}
            />
          </div>
        </main>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        schedule={schedule}
        selectedDays={selectedDays}
      />
    </div>
  );
}