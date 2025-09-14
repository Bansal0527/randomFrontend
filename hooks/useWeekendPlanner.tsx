import { useState, useEffect, useCallback } from 'react';
import type { Schedule, Activity, TimeSlot, DayScheduleData } from '../types';
import { PREDEFINED_ACTIVITIES } from '../utils/constants';
import { formatDateForId, getNextSaturday } from '../utils/dateUtils';
import { Sparkles } from '../constants';
import { fetchAISuggestions } from '../services/geminiService';
import type { Theme } from '../types';
import { Mood, TimeSlot as TimeSlotEnum } from '../types';

const LOCAL_STORAGE_KEY = 'weekendly-plan-v3';

const createEmptyDay = (): DayScheduleData => ({
  morning: [],
  afternoon: [],
  evening: [],
});

const createActivity = (activity: Omit<Activity, 'id' | 'mood'>): Activity => ({
  ...activity,
  id: `${Date.now()}-${Math.random()}`,
  mood: Mood.Happy,

});

const getInitialSelectedDays = (): string[] => {
    const saturday = getNextSaturday();
    const sunday = new Date(saturday);
    sunday.setDate(sunday.getDate() + 1);
    return [formatDateForId(saturday), formatDateForId(sunday)];
}

export const useWeekendPlanner = () => {
  // Load from localStorage on first render
  // Helper: get icon for activity name/category
  const getIconForActivity = (name: string, category: string): React.ComponentType<{ className?: string }> => {
    const found = PREDEFINED_ACTIVITIES.find(a => a.name === name && a.category === category);
    return found ? found.icon : Sparkles;
  };

  const rehydrateScheduleIcons = (schedule: Schedule): Schedule => {
    const newSchedule: Schedule = {};
    for (const date in schedule) {
      const day = schedule[date];
      const newDay: DayScheduleData = { morning: [], afternoon: [], evening: [] };
      (Object.keys(day) as Array<keyof DayScheduleData>).forEach(slot => {
        newDay[slot] = day[slot].map((activity: Activity) => ({
          ...activity,
          icon: getIconForActivity(activity.name, activity.category)
        }));
      });
      newSchedule[date] = newDay;
    }
    return newSchedule;
  };

  const getInitialState = () => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const { schedule: savedSchedule, selectedDays: savedDays } = JSON.parse(savedData);
        if (savedSchedule && savedDays) {
          return {
            schedule: rehydrateScheduleIcons(savedSchedule),
            selectedDays: savedDays,
          };
        }
      }
    } catch (error) {
      console.error("Failed to load plan from localStorage", error);
    }
    // Fallback to default
    return {
      schedule: {},
      selectedDays: getInitialSelectedDays(),
    };
  };

  const initialState = getInitialState();
  const [schedule, setSchedule] = useState<Schedule>(initialState.schedule);
  const [selectedDays, setSelectedDays] = useState<string[]>(initialState.selectedDays);
  const [availableActivities, setAvailableActivities] = useState<Activity[]>(
    () => PREDEFINED_ACTIVITIES.map(createActivity)
  );
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Removed: loading from localStorage in useEffect (now handled in lazy state init)

  useEffect(() => {
    try {
      const dataToSave = JSON.stringify({ schedule, selectedDays });
      localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error("Failed to save plan to localStorage", error);
    }
  }, [schedule, selectedDays]);

  const addActivity = useCallback((activity: Activity, date: string, timeSlot: TimeSlot) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      const newActivity = { ...activity, id: `${Date.now()}-${Math.random()}` };
      const daySchedule = newSchedule[date] ? { ...newSchedule[date] } : createEmptyDay();
      daySchedule[timeSlot] = [...daySchedule[timeSlot], newActivity];
      newSchedule[date] = daySchedule;
      return newSchedule;
    });
  }, []);

  const removeActivity = useCallback((activityId: string, date: string, timeSlot: TimeSlot) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      if (!newSchedule[date]) return prev;
      const daySchedule = { ...newSchedule[date] };
      daySchedule[timeSlot] = daySchedule[timeSlot].filter(a => a.id !== activityId);
      newSchedule[date] = daySchedule;
      return newSchedule;
    });
  }, []);

  const moveActivity = useCallback((
    source: { date: string, timeSlot: TimeSlot, index: number },
    destination: { date: string, timeSlot: TimeSlot }
  ) => {
    setSchedule(prev => {
      const activityToMove = prev[source.date]?.[source.timeSlot]?.[source.index];

      // If for any reason the activity to move isn't found, abort.
      if (!activityToMove) {
        return prev;
      }

      const newSchedule = { ...prev };

      // --- Step 1: Remove activity from source location ---
      const sourceDaySchedule = { ...newSchedule[source.date] };
      const sourceActivities = [...sourceDaySchedule[source.timeSlot]];
      sourceActivities.splice(source.index, 1);
      sourceDaySchedule[source.timeSlot] = sourceActivities;
      newSchedule[source.date] = sourceDaySchedule;

      // --- Step 2: Add activity to destination location ---
      // Important to read from newSchedule in case source and destination days are the same.
      const destinationDaySchedule = newSchedule[destination.date] 
        ? { ...newSchedule[destination.date] } 
        : createEmptyDay();
      const destinationActivities = destinationDaySchedule[destination.timeSlot] 
        ? [...destinationDaySchedule[destination.timeSlot]]
        : [];
      destinationActivities.push(activityToMove);
      destinationDaySchedule[destination.timeSlot] = destinationActivities;
      newSchedule[destination.date] = destinationDaySchedule;

      return newSchedule;
    });
  }, []);

  const applyTheme = useCallback((theme: Theme) => {
    const activities = theme.activities.map(createActivity);
    const newSchedule: Schedule = {};
    
    selectedDays.forEach(day => {
        newSchedule[day] = createEmptyDay();
    });

    // Distribute activities across selected days and timeslots
    const timeSlots: TimeSlot[] = [TimeSlotEnum.Morning, TimeSlotEnum.Afternoon, TimeSlotEnum.Evening];
    let dayIndex = 0;
    let timeSlotIndex = 0;

    activities.forEach(activity => {
        if (dayIndex < selectedDays.length) {
            const currentDay = selectedDays[dayIndex];
            const currentTimeSlot = timeSlots[timeSlotIndex];
            newSchedule[currentDay][currentTimeSlot].push(activity);
            
            timeSlotIndex++;
            if (timeSlotIndex >= timeSlots.length) {
                timeSlotIndex = 0;
                dayIndex++;
            }
        }
    });

    setSchedule(newSchedule);
  }, [selectedDays]);
  
  const addSuggestedActivities = useCallback(async (themeName: string) => {
    setIsLoadingAI(true);
    try {
      const suggestions = await fetchAISuggestions(themeName);
      if (suggestions.length > 0) {
        const newActivities = suggestions.map(s => createActivity(s as Omit<Activity, 'id' | 'mood'>));
        setAvailableActivities(prev => [...newActivities, ...prev]);
      }
    } finally {
      setIsLoadingAI(false);
    }
  }, []);
  
  return {
    schedule,
    selectedDays,
    setSelectedDays,
    availableActivities,
    addActivity,
    moveActivity,
    removeActivity,
    applyTheme,
    addSuggestedActivities,
    isLoadingAI
  };
};