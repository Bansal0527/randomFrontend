import React, { useState, useMemo, useRef, useEffect } from 'react';
import { formatDateForId, getWeekDates, addDays } from '../utils/dateUtils';
// import { getUpcomingHolidays, getHolidaysForDates } from '../services/holidayService';

interface CalendarControlProps {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

const CalendarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

interface MonthPickerProps {
    currentDate: Date;
    selectedDays: string[];
    onDateSelect: (date: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ currentDate, selectedDays, onDateSelect }) => {
    const [pickerDate, setPickerDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

    const navigateMonth = (direction: 'prev' | 'next') => {
        const increment = direction === 'prev' ? -1 : 1;
        setPickerDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + increment);
            return newDate;
        });
    };

    const daysInMonth = new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), 1).getDay();
    const today = new Date();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-brand-surface p-3 rounded-xl shadow-2xl z-20 border border-gray-200 w-80">
            <div className="flex justify-between items-center mb-3 px-2">
                <button onClick={() => navigateMonth('prev')} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-subtle"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <span className="font-semibold text-brand-text">
                    {pickerDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => navigateMonth('next')} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-subtle"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center place-items-center">
                {weekDays.map(day => <div key={day} className="text-xs font-bold text-brand-subtle py-1 w-9 h-9 flex items-center justify-center">{day}</div>)}
                {paddingDays.map(p => <div key={`pad-${p}`}></div>)}
                {days.map(day => {
                    const thisDate = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day);
                    const dateString = formatDateForId(thisDate);
                    const isSelected = selectedDays.includes(dateString);
                    const isToday = today.toDateString() === thisDate.toDateString();

                    return (
                        <button
                            key={day}
                            onClick={() => onDateSelect(thisDate)}
                            className={`w-9 h-9 rounded-full font-semibold text-sm transition-colors flex items-center justify-center
                                ${isSelected ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : ''}
                                ${!isSelected && isToday ? 'bg-indigo-100 text-brand-primary' : ''}
                                ${!isSelected && !isToday ? 'hover:bg-gray-100 text-brand-text' : ''}
                            `}
                        >
                           {day}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export const CalendarControl: React.FC<CalendarControlProps> = ({ selectedDays, setSelectedDays }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const pickerContainerRef = useRef<HTMLDivElement>(null);
  
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
  // const weekDateStrings = useMemo(() => weekDates.map(formatDateForId), [weekDates]);
  
  // const holidaysInView = useMemo(() => getHolidaysForDates(weekDateStrings), [weekDateStrings]);
  // const longWeekendSuggestions = useMemo(() => getUpcomingHolidays().filter(h => h.isLongWeekend).slice(0, 2), []);

  const handleDayClick = (dateString: string) => {
    const newSelectedDays = selectedDays.includes(dateString)
      ? selectedDays.filter(d => d !== dateString)
      : [...selectedDays, dateString].sort();
    setSelectedDays(newSelectedDays);
  };
  
  // const selectLongWeekend = (weekend: Holiday) => {
  //   if (weekend.days) {
  //     setSelectedDays(weekend.days);
  //     // Navigate calendar to the start of the long weekend
  //     setCurrentDate(new Date(weekend.days[0].replace(/-/g, '/')));
  //   }
  // }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const increment = direction === 'prev' ? -7 : 7;
    setCurrentDate(prev => addDays(prev, increment));
  };
  
  const handleMonthPickerSelect = (date: Date) => {
    setCurrentDate(date);
    setIsMonthPickerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerContainerRef.current && !pickerContainerRef.current.contains(event.target as Node)) {
        setIsMonthPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
            <div className="flex items-center">
                <button onClick={() => navigateWeek('prev')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-subtle"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                 <div className="relative" ref={pickerContainerRef}>
                    <button 
                        onClick={() => setIsMonthPickerOpen(p => !p)} 
                        className="flex items-center text-lg font-semibold w-52 justify-center px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                        aria-haspopup="true"
                        aria-expanded={isMonthPickerOpen}
                    >
                        <span>{weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        <CalendarIcon className="w-5 h-5 ml-2 text-brand-subtle" />
                    </button>
                    {isMonthPickerOpen && (
                        <MonthPicker
                          currentDate={currentDate}
                          selectedDays={selectedDays}
                          onDateSelect={handleMonthPickerSelect}
                        />
                    )}
                </div>
                 <button onClick={() => navigateWeek('next')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-subtle"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
             <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-sm font-semibold text-brand-subtle">Plan a long weekend:</span>
            </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
            {weekDates.map(date => {
                const dateString = formatDateForId(date);
                const isSelected = selectedDays.includes(dateString);
                return (
                    <div key={dateString}>
                         <div className="text-xs text-brand-subtle font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                         <button
                            onClick={() => handleDayClick(dateString)}
                            className={`mt-1 w-10 h-10 rounded-full font-semibold transition-colors relative
                                ${isSelected ? 'bg-brand-primary text-white' : 'hover:bg-gray-100'}
                               
                            `}
                         >
                            {date.getDate()}
                         </button>
                    </div>
                )
            })}
        </div>
    </div>
  );
};