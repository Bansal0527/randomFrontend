
import React from 'react';
import type { Activity, Theme } from './types';
import { ActivityCategory, Mood } from './types';

// Icon Components
export const Utensils = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/></svg>
);
export const Mountain = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
);
export const Clapperboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.6 3.1 3.9"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>
);
export const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
export const Palette = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.668 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.5-2.449 5.5-5.5S17.051 2 12 2z"/></svg>
);
export const Users = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.93 2.25 12 7.31l2.07-5.06M12 21.75l-2.07-5.06L12 11.62l2.07 5.07Z"/><path d="M2.25 9.93 7.31 12l-5.06 2.07M21.75 12l-5.06-2.07L11.62 12l5.07 2.07Z"/></svg>
);
export const Dumbbell = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.4 14.4 9.6 9.6"/><path d="M18 7.5h1.5a2.5 2.5 0 0 1 0 5H18"/><path d="M6 16.5H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="m21 21-1.5-1.5"/><path d="m3 3 1.5 1.5"/><path d="M18.5 18.5 17 17"/><path d="m7 7-1.5-1.5"/><path d="m14.4 9.6 4.1 4.1"/><path d="m9.6 14.4-4.1-4.1"/></svg>
);


export const PREDEFINED_ACTIVITIES: Omit<Activity, 'id' | 'mood'>[] = [
  { name: 'Brunch with Friends', category: ActivityCategory.Food, description: 'Enjoy a delicious mid-morning meal.', icon: Utensils },
  { name: 'Go for a Hike', category: ActivityCategory.Outdoor, description: 'Explore a scenic trail.', icon: Mountain },
  { name: 'Movie Night', category: ActivityCategory.Entertainment, description: 'Watch a new blockbuster or an old classic.', icon: Clapperboard },
  { name: 'Read a Book', category: ActivityCategory.Relaxation, description: 'Get lost in a good story.', icon: BookOpen },
  { name: 'Paint or Draw', category: ActivityCategory.Creative, description: 'Unleash your inner artist.', icon: Palette },
  { name: 'Visit a Museum', category: ActivityCategory.Entertainment, description: 'Soak in some culture and history.', icon: Clapperboard },
  { name: 'Board Game Cafe', category: ActivityCategory.Social, description: 'Challenge friends to a friendly competition.', icon: Users },
  { name: 'Workout Session', category: ActivityCategory.Outdoor, description: 'Get the blood pumping.', icon: Dumbbell },
  { name: 'Farmers Market', category: ActivityCategory.Food, description: 'Shop for fresh, local produce.', icon: Utensils },
  { name: 'Yoga & Meditation', category: ActivityCategory.Relaxation, description: 'Find your inner peace.', icon: BookOpen },
];

export const WEEKEND_THEMES: Theme[] = [
  {
    name: 'Relax & Recharge',
    description: 'A slow-paced weekend to de-stress.',
    activities: [
      { name: 'Sleep In', category: ActivityCategory.Relaxation, description: 'No alarms, just rest.', icon: BookOpen },
      { name: 'Cozy Brunch at Home', category: ActivityCategory.Food, description: 'Pancakes and coffee.', icon: Utensils },
      { name: 'Read in the Park', category: ActivityCategory.Relaxation, description: 'Enjoy a book under a tree.', icon: BookOpen },
      { name: 'Binge-watch a Series', category: ActivityCategory.Entertainment, description: 'Catch up on your favorite show.', icon: Clapperboard },
    ],
  },
  {
    name: 'Adventure Time',
    description: 'An active weekend full of exploration.',
    activities: [
      { name: 'Morning Hike', category: ActivityCategory.Outdoor, description: 'Conquer a nearby peak.', icon: Mountain },
      { name: 'Try a New Restaurant', category: ActivityCategory.Food, description: 'Explore new culinary horizons.', icon: Utensils },
      { name: 'Kayaking or Canoeing', category: ActivityCategory.Outdoor, description: 'Get out on the water.', icon: Mountain },
      { name: 'Explore a New Neighborhood', category: ActivityCategory.Social, description: 'Discover hidden gems in your city.', icon: Users },
    ],
  },
  {
    name: 'Foodie Fiesta',
    description: 'A weekend dedicated to delicious food.',
    activities: [
      { name: 'Visit a Farmers Market', category: ActivityCategory.Food, description: 'Gather fresh ingredients.', icon: Utensils },
      { name: 'Take a Cooking Class', category: ActivityCategory.Creative, description: 'Learn a new recipe.', icon: Palette },
      { name: 'Dinner at a Fancy Restaurant', category: ActivityCategory.Food, description: 'Indulge in a gourmet meal.', icon: Utensils },
      { name: 'Bake Cookies at Home', category: ActivityCategory.Food, description: 'Fill your home with sweet smells.', icon: Utensils },
    ],
  },
];

export const CATEGORY_COLORS: Record<ActivityCategory, { bg: string; text: string; border: string }> = {
  [ActivityCategory.Food]: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  [ActivityCategory.Outdoor]: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  [ActivityCategory.Entertainment]: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  [ActivityCategory.Relaxation]: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  [ActivityCategory.Creative]: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
  [ActivityCategory.Social]: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  [ActivityCategory.AI]: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
};
