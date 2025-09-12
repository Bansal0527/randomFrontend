
import React, { useState, useRef, useEffect } from 'react';
import type { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  onSelectTheme: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    onSelectTheme(theme);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg cursor-pointer flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>✨</span>
        <span>{selectedTheme?.name || 'Apply a Theme'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </button>

      {isOpen && (
        <div 
          className="absolute z-10 mt-2 w-56 origin-top-right rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none right-0" 
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby="menu-button"
          style={{
            background: 'rgba(41, 37, 78, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="py-2" role="none">
            <div className="flex items-center px-4 pb-2 text-base text-gray-200 font-semibold">
                <span className="w-4">{selectedTheme ? '✓' : ''}</span>
                <span className="ml-2">✨ Apply a Theme</span>
            </div>
            <div className="border-t border-white/10 my-1"></div>
            {themes.map(theme => (
              <button
                key={theme.name}
                onClick={() => handleSelect(theme)}
                className={`text-gray-100 block w-full text-left px-5 py-2 text-base hover:bg-white/10 transition-colors rounded-md mx-1 ${selectedTheme?.name === theme.name ? 'font-bold bg-white/5' : ''}`}
                role="menuitem"
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
