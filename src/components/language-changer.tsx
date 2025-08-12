'use client';

import { useState } from 'react';

interface LanguageChangerProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageChanger({ className, onLanguageChange }: LanguageChangerProps) {
  const [currentLanguage, setCurrentLanguage] = useState('id');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setCurrentLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="appearance-none bg-transparent border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="id">🇮🇩 ID</option>
        <option value="en">🇺🇸 EN</option>
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
