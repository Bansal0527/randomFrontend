export enum TimeSlot {
  Morning = 'morning',
  Afternoon = 'afternoon',
  Evening = 'evening',
}

export enum ActivityCategory {
  Food = 'Food',
  Outdoor = 'Outdoor',
  Entertainment = 'Entertainment',
  Relaxation = 'Relaxation',
  Creative = 'Creative',
  Social = 'Social',
  AI = 'AI Generated'
}

export enum Mood {
  Happy = '😄',
  Relaxed = '😌',
  Energetic = '⚡️',
  Cozy = '☕️',
  Adventurous = '🚀',
}

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  mood: Mood;
}

export type DayScheduleData = {
  [key in TimeSlot]: Activity[];
};

export type Schedule = Record<string, DayScheduleData>;

export interface Theme {
  name: string;
  description: string;
  activities: Omit<Activity, 'id' | 'mood'>[];
}

export interface DragData {
    activity: Activity;
    source: {
        date: string;
        timeSlot: TimeSlot;
        index: number;
    } | {
        day: 'picker';
        index: number;
    };
}

export interface Holiday {
  date: string;
  name: string;
  isLongWeekend?: boolean;
  days?: string[];
}

export interface WeatherInfo {
  high: number;
  low: number;
  description: string;
  icon: string; // Emoji
}

export type WeatherData = Record<string, WeatherInfo>;
