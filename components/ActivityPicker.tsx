import React, { useState, useRef, useEffect } from 'react';
import type { Activity, DragData } from '../types';
import { Sparkles } from '../constants';
import { CATEGORY_COLORS } from '../utils/constants';

interface ActivityPickerProps {
  activities: Activity[];
  onDragStart: (item: DragData) => void;
  addSuggestedActivities: (themeName: string) => void;
  isLoadingAI: boolean;
}

export const ActivityPicker: React.FC<ActivityPickerProps> = ({ activities, onDragStart, addSuggestedActivities, isLoadingAI }) => {
  const [selectedThemeForAI, setSelectedThemeForAI] = useState('Anything');
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const aiDropdownRef = useRef<HTMLDivElement>(null);
  
  const aiThemeOptions = ['Anything', 'Relax & Recharge', 'Adventure Time', 'Foodie Fiesta'];

  const handleAiThemeSelect = (theme: string) => {
    setSelectedThemeForAI(theme);
    setIsAiDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target as Node)) {
        setIsAiDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDragStart = (activity: Activity, index: number) => {
    onDragStart({ activity, source: { day: 'picker', index } });
  };

  return (
    <div className="bg-brand-surface p-4 rounded-xl shadow-sm h-full">
      <h2 className="text-xl font-bold text-brand-text mb-4">Choose Activities</h2>
      
      <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg mb-4">
        <p className="text-sm font-semibold text-indigo-800 mb-2">Get AI Suggestions!</p>
        <div className="flex space-x-2">
            <div className="relative flex-grow" ref={aiDropdownRef}>
              <button
                onClick={() => setIsAiDropdownOpen(!isAiDropdownOpen)}
                className="w-full bg-white border border-gray-300 rounded-md py-1 px-2 text-sm text-left flex justify-between items-center"
                aria-haspopup="true"
                aria-expanded={isAiDropdownOpen}
              >
                <span>{selectedThemeForAI}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform text-gray-500 ${isAiDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {isAiDropdownOpen && (
                <div 
                  className="absolute z-10 mt-1 w-full bg-slate-800 rounded-lg shadow-lg" 
                  role="menu" 
                  aria-orientation="vertical" 
                >
                  <div className="py-1" role="none">
                    {aiThemeOptions.map(theme => (
                      <button
                        key={theme}
                        onClick={() => handleAiThemeSelect(theme)}
                        className="text-slate-100 block w-full text-left px-3 py-2 text-sm hover:bg-slate-700 transition-colors flex items-center rounded-md mx-1"
                        role="menuitem"
                      >
                        <span className="w-5 mr-1 font-semibold">{selectedThemeForAI === theme ? '✓' : ''}</span>
                        <span>{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button 
                onClick={() => addSuggestedActivities(selectedThemeForAI)}
                disabled={isLoadingAI}
                className="bg-brand-primary text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoadingAI ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                    <Sparkles className="w-4 h-4" />
                )}
            </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            draggable
            onDragStart={() => handleDragStart(activity, index)}
            className="flex items-center bg-gray-50 p-2 rounded-lg cursor-grab border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`p-2 rounded-md ${CATEGORY_COLORS[activity.category].bg} ${CATEGORY_COLORS[activity.category].text}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <span className="ml-3 font-medium text-brand-text">{activity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};