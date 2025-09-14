
import React from 'react';
import type { Theme } from '../types';
import { ThemeSelector } from './ThemeSelector';
import { WEEKEND_THEMES } from '../utils/constants';

interface HeaderProps {
  onApplyTheme: (theme: Theme) => void;
  onShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApplyTheme, onShare }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-brand-surface p-4 rounded-xl shadow-sm">
      <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-4xl text-brand-primary mb-4 md:mb-0">
        Weekendly
      </h1>
      <div className="flex items-center space-x-2">
        <ThemeSelector themes={WEEKEND_THEMES} onSelectTheme={onApplyTheme} />
        <button
          onClick={onShare}
          className="bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          Share
        </button>
      </div>
    </header>
  );
};
