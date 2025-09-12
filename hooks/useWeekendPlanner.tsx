import { useState, useEffect, useCallback } from 'react';
import { TimeSlot, Mood } from '../types';
import type { Schedule, Activity, Theme, DayScheduleData } from '../types';
import { PREDEFINED_ACTIVITIES } from '../constants';
// import { fetchAISuggestions } from '../services/geminiService';
import { formatDateForId, getNextSaturday } from '../utils/dateUtils';

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
  const [schedule, setSchedule] = useState<Schedule>({});
  const [selectedDays, setSelectedDays] = useState<string[]>(getInitialSelectedDays);
  const [availableActivities, setAvailableActivities] = useState<Activity[]>(
    () => PREDEFINED_ACTIVITIES.map(createActivity)
  );
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const { schedule: savedSchedule, selectedDays: savedDays } = JSON.parse(savedData);
        if (savedSchedule && savedDays) {
            setSchedule(savedSchedule);
            setSelectedDays(savedDays);
        }
      }
    } catch (error) {
      console.error("Failed to load plan from localStorage", error);
    }
  }, []);

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
    const timeSlots: TimeSlot[] = [TimeSlot.Morning, TimeSlot.Afternoon, TimeSlot.Evening];
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
  
//   const addSuggestedActivities = useCallback(async (themeName: string) => {
//     setIsLoadingAI(true);
//     try {
//       const suggestions = await fetchAISuggestions(themeName);
//       if (suggestions.length > 0) {
//         const newActivities = suggestions.map(s => createActivity(s as Omit<Activity, 'id' | 'mood'>));
//         setAvailableActivities(prev => [...newActivities, ...prev]);
//       }
//     } finally {
//       setIsLoadingAI(false);
//     }
//   }, []);
  
  return {
    schedule,
    selectedDays,
    setSelectedDays,
    availableActivities,
    addActivity,
    moveActivity,
    removeActivity,
    applyTheme,
    // addSuggestedActivities,
    isLoadingAI
  };
};
