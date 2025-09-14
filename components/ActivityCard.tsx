
import React, { useState } from 'react';
import type { Activity } from '../types';
import { CATEGORY_COLORS } from '../utils/constants';
import { MOODS } from '../utils/constants';
import type { Mood } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onDragStart: (activity: Activity) => void;
  onRemove: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onDragStart, onRemove }) => {
    const [currentMood, setCurrentMood] = useState(activity.mood);
    const colors = CATEGORY_COLORS[activity.category];

    const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMood(e.target.value as Mood);
    };

    return (
        <div
            draggable
            onDragStart={() => onDragStart(activity)}
            className={`p-3 rounded-lg border-l-4 cursor-grab bg-white shadow-md hover:shadow-lg transition-all ${colors.border}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                        <activity.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold text-brand-text">{activity.name}</h3>
                        <p className="text-sm text-brand-subtle">{activity.description}</p>
                    </div>
                </div>
                <button
                    onClick={onRemove}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
            <div className="mt-3 flex justify-between items-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                    {activity.category}
                </span>
                <div className="relative">
                    <select
                        value={currentMood}
                        onChange={handleMoodChange}
                        className="text-lg bg-gray-100 rounded-md appearance-none cursor-pointer py-1 pl-2 pr-8"
                        style={{backgroundPosition: 'right 0.2rem center'}}
                    >
                        {MOODS.map(mood => (
                            <option key={mood} value={mood}>{mood}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
