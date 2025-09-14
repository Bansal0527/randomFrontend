import type { Activity, Theme } from '../types';
import { Utensils, Mountain, Clapperboard, BookOpen, Palette, Users, Dumbbell } from '../constants';
import { ActivityCategory, Mood } from '../types';

export const MOODS = Object.values(Mood);

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