import React, { useRef } from 'react';
import type { Schedule, Activity, DayScheduleData } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { formatDateForDisplay } from '../utils/dateUtils';

// A lightweight, self-contained html2canvas-like function
const captureElementAsDataURL = async (element: HTMLElement): Promise<string> => {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(element, { 
        backgroundColor: '#F8F7F4',
        scale: 2 
    });
    return canvas.toDataURL('image/png');
};


interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
  selectedDays: string[];
}

const MiniActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const colors = CATEGORY_COLORS[activity.category];
  return (
    <div className={`flex items-center p-2 rounded-md ${colors.bg} mb-2`}>
      <div className={`${colors.text}`}><activity.icon className="w-5 h-5" /></div>
      <p className={`ml-2 font-medium text-sm ${colors.text}`}>{activity.name}</p>
      <span className="ml-auto text-lg">{activity.mood}</span>
    </div>
  );
};

const DayShareView: React.FC<{ title: string, data: DayScheduleData | undefined }> = ({ title, data }) => (
    <div>
        <h3 className="text-2xl font-bold text-brand-text mb-3">{title}</h3>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-brand-subtle mb-1">☀️ Morning</h4>
                {data?.morning && data.morning.length > 0 ? data.morning.map(act => <MiniActivityCard key={act.id} activity={act} />) : <p className="text-brand-subtle text-sm italic">Nothing planned.</p>}
            </div>
            <div>
                <h4 className="font-semibold text-brand-subtle mb-1">🏙️ Afternoon</h4>
                {data?.afternoon && data.afternoon.length > 0 ? data.afternoon.map(act => <MiniActivityCard key={act.id} activity={act} />) : <p className="text-brand-subtle text-sm italic">Nothing planned.</p>}
            </div>
            <div>
                <h4 className="font-semibold text-brand-subtle mb-1">🌙 Evening</h4>
                {data?.evening && data.evening.length > 0 ? data.evening.map(act => <MiniActivityCard key={act.id} activity={act} />) : <p className="text-brand-subtle text-sm italic">Nothing planned.</p>}
            </div>
        </div>
    </div>
);


export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, schedule, selectedDays }) => {
  const planRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (planRef.current) {
      try {
        const dataUrl = await captureElementAsDataURL(planRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'my-weekend-plan.png';
        link.click();
      } catch (error) {
        console.error('Failed to capture plan:', error);
        alert('Could not generate image. Please try screenshotting the plan.');
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-text">Your Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </div>

        <div ref={planRef} className="p-6 bg-brand-bg rounded-xl">
          <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-5xl text-center text-brand-primary mb-6">
            My Perfect Getaway
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedDays.map(dateString => (
              <DayShareView 
                key={dateString}
                title={formatDateForDisplay(dateString, { weekday: 'long' })} 
                data={schedule[dateString]} 
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-sm text-brand-subtle mb-2">Click to download your plan as an image.</p>
            <button
            onClick={handleDownload}
            className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
            Download as Image
            </button>
        </div>

      </div>
    </div>
  );
};